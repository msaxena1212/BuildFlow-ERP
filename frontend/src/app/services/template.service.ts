import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project, Milestone, SubMilestone, Task, ProjectTemplate } from '../../../../backend/src/models/models';
import { CpmService } from './cpm.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private cpmService = inject(CpmService);
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

  getTemplates(): Observable<ProjectTemplate[]> {
    return this.http.get<ProjectTemplate[]>(`${this.apiUrl}/templates`);
  }
  generateProjectFromTemplate(template: ProjectTemplate, startDate: string, projectName: string, userMapping: { [role: string]: string }, excludedIds: string[] = []): Project {
    const start = new Date(startDate);
    
    const project: Project = {
      id: `p-${Math.random().toString(36).substr(2, 9)}`,
      projectCode: `BF-P-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      branchId: 'BR-BLR',
      name: projectName,
      location: 'TBD',
      description: `Generated from ${template.name} template`,
      status: 'On Track',
      progress: 0,
      type: template.type as any,
      budget: { total: 0, used: 0 },
      team: Object.entries(userMapping).map(([role, name]) => ({
        name,
        role,
        avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}`
      })),
      milestones: this.mapMilestones(template.milestones, start, userMapping, excludedIds),
      lastUpdate: new Date().toISOString(),
      estimatedCompletion: '',
      thumbnail: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=1024&auto=format&fit=crop'
    };

    // Flatten tasks for CPM calculation
    const allTasks: Task[] = [];
    project.milestones.forEach(m => {
      m.subMilestones?.forEach(sm => {
        sm.tasks?.forEach(t => allTasks.push(t));
      });
    });

    // Run CPM Schedule
    const scheduledTasks = this.cpmService.calculateSchedule(allTasks, start);
    
    // Map scheduled tasks back to hierarchy
    scheduledTasks.forEach((st: any) => {
      const found = allTasks.find(t => t.id === st.id);
      if (found) {
        Object.assign(found, st);
      }
    });

    // Calculate project-level completion date
    const lastMilestone = [...project.milestones].sort((a, b) => 
      new Date(b.endDate || '').getTime() - new Date(a.endDate || '').getTime()
    )[0];
    project.estimatedCompletion = lastMilestone?.endDate || '';

    return project;
  }

  private mapMilestones(milestones: Milestone[], projectStart: Date, userMapping: { [role: string]: string }, excludedIds: string[]): Milestone[] {
    let currentOffset = 0;
    
    return milestones
      .filter(m => !excludedIds.includes(m.id))
      .sort((a, b) => a.order - b.order)
      .map(m => {
      const start = new Date(projectStart);
      start.setDate(start.getDate() + currentOffset);
      
      const end = new Date(start);
      end.setDate(end.getDate() + (m.durationDays || 0));

      const milestone: Milestone = {
        ...m,
        progress: 0,
        endDate: end.toISOString().split('T')[0],
        subMilestones: this.mapSubMilestones(m.subMilestones || [], start, userMapping, excludedIds)
      };

      currentOffset += (m.durationDays || 0);
      return milestone;
    });
  }

  private mapSubMilestones(subMilestones: SubMilestone[], milestoneStart: Date, userMapping: { [role: string]: string }, excludedIds: string[]): SubMilestone[] {
    let currentOffset = 0;

    return subMilestones
      .filter(sm => !excludedIds.includes(sm.id))
      .sort((a, b) => a.order - b.order)
      .map(sm => {
      const start = new Date(milestoneStart);
      start.setDate(start.getDate() + currentOffset);
      
      const end = new Date(start);
      end.setDate(end.getDate() + (sm.durationDays || 0));

      const subMilestone: SubMilestone = {
        ...sm,
        progress: 0,
        status: 'Pending',
        endDate: end.toISOString().split('T')[0],
        tasks: this.mapTasks(sm.tasks || [], start, userMapping, excludedIds)
      };

      currentOffset += (sm.durationDays || 0);
      return subMilestone;
    });
  }

  private mapTasks(tasks: Task[], parentStart: Date, userMapping: { [role: string]: string }, excludedIds: string[]): Task[] {
    let currentOffset = 0;

    return tasks
      .filter(t => !excludedIds.includes(t.id))
      .sort((a, b) => a.order - b.order)
      .map(t => {
      const start = new Date(parentStart);
      start.setDate(start.getDate() + currentOffset);
      
      const end = new Date(start);
      end.setDate(end.getDate() + (t.durationDays || 0));

      const task: Task = {
        ...t,
        status: 'Pending',
        startDate: start.toISOString().split('T')[0],
        deadline: end.toISOString().split('T')[0],
        assignee: t.role ? userMapping[t.role] : undefined
      };

      currentOffset += (t.durationDays || 0);
      return task;
    });
  }
}
