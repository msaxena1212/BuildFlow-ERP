import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/projects`);
  }

  getProjectById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/projects/${id}`);
  }

  consolidatePoc(projectId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/projects/${projectId}/poc/consolidate`, {});
  }

  getUpdates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/updates`);
  }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tasks`);
  }

  getContractorMetrics(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/contractor-metrics`);
  }

  getLaborStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/labor-stats`);
  }

  getReports(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reports`);
  }

  getContracts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/contracts`);
  }

  getVendors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vendors`);
  }

  generateSettlement(vendorId: string | number, projectId: string, basis: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/vendors/${vendorId}/settlements/generate`, { projectId, basis });
  }

  saveSettlement(vendorId: string | number, request: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/vendors/${vendorId}/settlements`, request);
  }

  // --- Progress Rollup Logic ---

  calculateRollup(project: any) {
    if (!project.milestones) return;

    project.milestones.forEach((m: any) => {
      if (m.subMilestones) {
        m.subMilestones.forEach((sm: any) => {
          if (sm.tasks) {
            sm.tasks.forEach((t: any) => {
              if (t.subtasks && t.subtasks.length > 0) {
                const completed = t.subtasks.filter((st: any) => st.isCompleted).length;
                t.progress = Math.round((completed / t.subtasks.length) * 100);
                t.status = t.progress === 100 ? 'Completed' : (t.progress > 0 ? 'In Progress' : 'Pending');
              }
            });
            const taskProgressSum = sm.tasks.reduce((acc: number, t: any) => acc + (t.progress || 0), 0);
            sm.progress = Math.round(taskProgressSum / sm.tasks.length);
            sm.status = sm.progress === 100 ? 'Completed' : (sm.progress > 0 ? 'In Progress' : 'Pending');
          }
        });
        const smProgressSum = m.subMilestones.reduce((acc: number, sm: any) => acc + (sm.progress || 0), 0);
        m.progress = Math.round(smProgressSum / m.subMilestones.length);
      }
    });

    const milestoneProgressSum = project.milestones.reduce((acc: number, m: any) => acc + (m.progress || 0), 0);
    project.progress = Math.round(milestoneProgressSum / project.milestones.length);
    project.status = project.progress === 100 ? 'Completed' : (project.progress > 80 ? 'On Track' : 'At Risk');
  }
}
