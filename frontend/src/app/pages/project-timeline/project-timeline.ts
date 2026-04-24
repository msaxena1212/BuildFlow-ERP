import { Component, OnInit, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { CpmService } from '../../services/cpm.service';

interface TimelineItem {
  id: string;
  name: string;
  color: string;
  completion?: number;
  width?: string;
  left: string;
  critical?: boolean;
  isMilestone?: boolean;
  milestoneTitle?: string;
  status?: string;
  assignee?: string;
  dependencies?: { predecessorId: string, type: string, lag: number }[];
  earlyStart?: string;
  earlyFinish?: string;
  totalFloat?: number;
}

interface TimelinePhase {
  title: string;
  milestoneId: string;
  tasks: TimelineItem[];
  subProjects: any[];
}

@Component({
  selector: 'app-project-timeline',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './project-timeline.html',
  styleUrls: ['./project-timeline.css']
})
export class ProjectTimeline implements OnInit {
  @Input() projectId = 'p1';
  @Input() selectedMember = 'All Members';
  private projectService = inject(ProjectService);
  private cpmService = inject(CpmService);

  viewType: 'day' | 'week' | 'month' = 'week';
  showCriticalPath = false;
  showTeamView = false;
  currentMonthIndex = 0;
  months = ['January 2026', 'February 2026', 'March 2026', 'April 2026', 'May 2026'];
  selectedProject = 'Skyline Plaza';
  
  project: any;
  projects: any[] = [];
  tasks: any[] = [];
  phases: TimelinePhase[] = [];
  allSubProjects: any[] = [];
  showLinkModal = false;
  selectedMilestone: any;
  
  showMilestoneModal = false;
  milestoneForm: any = { id: '', name: '', progress: 0, color: 'blue-500', startDate: '', endDate: '' };
  isEditingMilestone = false;

  showSubProjectModal = false;
  subProjectForm: any = { id: '', name: '', progress: 0, status: 'In Progress', startDate: '', endDate: '', description: '' };
  isEditingSubProject = false;
  selectedMilestoneForSubProject: any = null;

  openAddMilestoneModal() {
    this.isEditingMilestone = false;
    this.milestoneForm = { id: 'm' + Date.now(), name: '', progress: 0, color: 'blue-500', startDate: '', endDate: '' };
    this.showMilestoneModal = true;
  }

  saveMilestone() {
    if (!this.project.milestones) this.project.milestones = [];
    this.project.milestones.push({ ...this.milestoneForm });
    this.loadTimeline();
    this.showMilestoneModal = false;
  }

  openAddSubProjectModal(ms: any) {
    this.selectedMilestoneForSubProject = ms;
    this.isEditingSubProject = false;
    this.subProjectForm = { id: 'sp' + Date.now(), name: '', progress: 0, status: 'In Progress', startDate: '', endDate: '', description: '' };
    this.showSubProjectModal = true;
  }

  saveSubProject() {
    if (!this.project.subProjects) this.project.subProjects = [];
    const newSubProject = { ...this.subProjectForm, projectId: this.project.id };
    this.project.subProjects.push(newSubProject);
    
    if (this.selectedMilestoneForSubProject) {
      if (!this.selectedMilestoneForSubProject.subProjectIds) {
        this.selectedMilestoneForSubProject.subProjectIds = [];
      }
      this.selectedMilestoneForSubProject.subProjectIds.push(newSubProject.id);
    }
    this.loadTimeline();
    this.showSubProjectModal = false;
  }

  team = [
    { name: 'All Members', avatar: '' },
    { name: 'James Wilson', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtGFAFvuDTZowiKMN-_86PVlfoW0s1Y1t2wIesJt_aUWgPzfdeDsBI62JTUgxDWTq1m-Ym9UTDzUgPdykM1NQMrfIACLf6ELlG-TFDXx0bY0i_pEacXyHWhO2hkaeoTxzFixMpxv19qT44QctQNTUZJIcUIdbYcNqhsodpWPPJ7sk33kwcSVJEXH4-Vw1iFudWnbRysUDa4wlBKgguYjpVnU4sisOx6--P1vua992aHyR4-yzZcdvfY2oGUCGKt7PKua6O7aWnX-He' },
    { name: 'Sarah Chen', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNzfoyCh9T5jGXyS1Z_oulE0qwVUs24lt_XGAkXFQSRqaWNCKxded51i1BCZ7dfp-pGHnok3QVO3dgouAGxmqT3qEbjdB3JWGLULu5QhLo2_g1Ypr5J3YmNDL67WiHAt0xRnjKXt0-Wvr61mKsmkea12mawD58a6haqRp3roTP4ozbi8Nts8AGacuP2xj84hy-YMnppdLzUQWRMoC5W26Nao_ycj91iOCEE5K6VFvm0nsNGnn5Uf459l4Dnx69QzvNITq3QrutFSpc' }
  ];

  resources = [
    { name: 'James Wilson', role: 'Lead Engineer', utilization: 85, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtGFAFvuDTZowiKMN-_86PVlfoW0s1Y1t2wIesJt_aUWgPzfdeDsBI62JTUgxDWTq1m-Ym9UTDzUgPdykM1NQMrfIACLf6ELlG-TFDXx0bY0i_pEacXyHWhO2hkaeoTxzFixMpxv19qT44QctQNTUZJIcUIdbYcNqhsodpWPPJ7sk33kwcSVJEXH4-Vw1iFudWnbRysUDa4wlBKgguYjpVnU4sisOx6--P1vua992aHyR4-yzZcdvfY2oGUCGKt7PKua6O7aWnX-He' },
    { name: 'Sarah Chen', role: 'Logistics', utilization: 110, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNzfoyCh9T5jGXyS1Z_oulE0qwVUs24lt_XGAkXFQSRqaWNCKxded51i1BCZ7dfp-pGHnok3QVO3dgouAGxmqT3qEbjdB3JWGLULu5QhLo2_g1Ypr5J3YmNDL67WiHAt0xRnjKXt0-Wvr61mKsmkea12mawD58a6haqRp3roTP4ozbi8Nts8AGacuP2xj84hy-YMnppdLzUQWRMoC5W26Nao_ycj91iOCEE5K6VFvm0nsNGnn5Uf459l4Dnx69QzvNITq3QrutFSpc', overAllocated: true }
  ];

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
      const current = projects.find(p => p.id === this.projectId);
      if (current) this.selectedProject = current.name;
      this.loadTimeline();
    });
  }

  onProjectChange() {
    const p = this.projects.find(proj => proj.name === this.selectedProject);
    if (p) {
      this.projectId = p.id;
      this.loadTimeline();
    }
  }

  loadTimeline() {
    this.projectService.getProjectById(this.projectId).subscribe(project => {
      this.project = project;
      this.allSubProjects = project.subProjects || [];
      
      this.projectService.getTasks().subscribe(allTasks => {
        const projectTasks = allTasks.filter(t => t.projectId === project.id);
        const schedule = this.cpmService.calculateSchedule(projectTasks);
        
        this.phases = project.milestones.map((m: any) => ({
          title: m.name,
          milestoneId: m.id,
          subProjects: (m.subProjectIds || []).map((spId: string) => 
            this.allSubProjects.find(sp => sp.id === spId)
          ).filter((sp: any) => sp),
          tasks: schedule.filter(t => {
            // Simulated grouping logic for demo
            if (m.name.toLowerCase().includes('foundation') || m.name.toLowerCase().includes('phase 1')) {
               return ['t1', 't2'].includes(t.id);
            }
            return false;
          }).map(t => ({
            id: t.id,
            name: t.title,
            color: t.isCritical ? 'bg-red-500' : 'bg-primary',
            completion: t.status === 'Completed' ? 100 : (t.status === 'In Progress' ? 50 : 0),
            width: (t.duration * 2) + '%',
            left: (new Date(t.startDate || '').getDate() * 2) + '%',
            critical: t.isCritical,
            earlyStart: t.earlyStart,
            earlyFinish: t.earlyFinish,
            totalFloat: t.totalFloat,
            assignee: this.team[1].avatar
          }))
        }));
      });
    });
  }

  openLinkSubProjectModal(phase: any) {
    this.selectedMilestone = this.project.milestones.find((m: any) => m.name === phase.title);
    this.showLinkModal = true;
  }

  linkSubProject(subProjectId: string) {
    if (!this.selectedMilestone.subProjectIds) {
      this.selectedMilestone.subProjectIds = [];
    }
    if (!this.selectedMilestone.subProjectIds.includes(subProjectId)) {
      this.selectedMilestone.subProjectIds.push(subProjectId);
      this.loadTimeline();
    }
    this.showLinkModal = false;
  }

  isSubProjectLinked(subProjectId: string, phaseOrMilestone: any): boolean {
    if (!this.project || !phaseOrMilestone) return false;
    const name = phaseOrMilestone.title || phaseOrMilestone.name;
    const milestone = this.project.milestones.find((m: any) => m.name === name);
    return (milestone?.subProjectIds || []).includes(subProjectId);
  }

  get filteredPhases(): TimelinePhase[] {
    if (this.selectedMember === 'All Members') return this.phases;
    const member = this.team.find(m => m.name === this.selectedMember);
    return this.phases.map(p => ({
      ...p,
      tasks: p.tasks.filter(t => t.assignee === member?.avatar || t.isMilestone)
    })).filter(p => p.tasks.length > 0);
  }

  setViewType(type: 'day' | 'week' | 'month') {
    this.viewType = type;
  }

  toggleCriticalPath() {
    this.showCriticalPath = !this.showCriticalPath;
  }

  toggleTeamView() {
    this.showTeamView = !this.showTeamView;
  }

  navigate(direction: 'next' | 'prev') {
    if (direction === 'next') {
      this.currentMonthIndex = (this.currentMonthIndex + 1) % this.months.length;
    } else {
      this.currentMonthIndex = (this.currentMonthIndex - 1 + this.months.length) % this.months.length;
    }
  }
}
