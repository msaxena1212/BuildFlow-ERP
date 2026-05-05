import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { TaskManagement } from '../task-management/task-management';
import { ProjectTimeline } from '../project-timeline/project-timeline';
import { ProjectBudget } from '../project-budget/project-budget';
import { ProjectFiles } from '../project-files/project-files';
import { AddSiteNoteModal } from '../../components/add-site-note/add-site-note';
import { SiteGallery } from '../../components/site-gallery/site-gallery';
import { FormsModule } from '@angular/forms';
import { CpmService } from '../../services/cpm.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, TaskManagement, ProjectTimeline, ProjectBudget, ProjectFiles, AddSiteNoteModal, SiteGallery, FormsModule],
  templateUrl: './project-detail.html',
  styleUrls: ['./project-detail.css']
})
export class ProjectDetail implements OnInit {
  private cpmService = inject(CpmService);
  private projectService = inject(ProjectService);
  private route = inject(ActivatedRoute);

  isEditingProject = false;
  projectForm: any = {};
  
  tasks: any[] = [];
  criticalTasksCount = 0;
  totalFloat = 0;
  scheduleRisk = 'Low';
  
  teamMembers = [
    { name: 'All Members' },
    { name: 'Vikram Singh' },
    { name: 'Priya Sharma' },
    { name: 'Rajesh Khanna' }
  ];
  selectedMember = 'All Members';
  project: any = null;
  showAddUpdateModal = false;
  updates: any[] = [];
  activeTab = 'Overview';
  tabs = ['Overview', 'Tasks', 'Timeline', 'Budget', 'Gallery', 'Files', 'Updates'];

  weatherData = {
    temp: 24,
    condition: 'Partly Cloudy',
    humidity: 42,
    wind: 12,
    icon: 'partly_cloudy_day',
    isSafeForConcrete: true
  };

  auditFilter = 'All';
  auditFilterOptions = ['All', 'Project', 'Task', 'Milestone', 'Document', 'Safety', 'Budget', 'Team', 'Comment', 'RFI', 'Signature'];

  auditTrail = [
    { id: 'a1', type: 'Project', action: 'Project Created', detail: 'Prestige Tech Park Phase 2 project initialized with a budget of ₹85 Cr. Director: Arjun Mehra.', user: 'Arjun Mehra', time: 'Jan 5, 2026 · 09:00 AM', icon: 'rocket_launch', color: 'text-blue-600 bg-blue-100' },
    { id: 'a2', type: 'Team', action: 'Team Assembled', detail: 'Core team assigned: Priya Sharma (Lead), Sanjay Gupta (Supervisor), Rajesh Khanna (Safety).', user: 'Arjun Mehra', time: 'Jan 5, 2026 · 09:30 AM', icon: 'group_add', color: 'text-indigo-600 bg-indigo-100' },
    { id: 'a3', type: 'Milestone', action: 'Phase 1 — Site Prep Started', detail: 'Site preparation and utility relocation commenced. Milestone marked In Progress.', user: 'Sanjay Gupta', time: 'Jan 8, 2026 · 07:45 AM', icon: 'flag', color: 'text-amber-600 bg-amber-100' },
    { id: 'a4', type: 'Document', action: 'Blueprint Uploaded', detail: 'Floor_Structural_V3.cad uploaded by Arjun M. Version 3.0 approved.', user: 'Arjun Mehra', time: 'Jan 12, 2026 · 11:10 AM', icon: 'upload_file', color: 'text-cyan-600 bg-cyan-100' },
    { id: 'a5', type: 'Signature', action: 'Document Signed', detail: 'Foundations_Rev_B.pdf signed by Ananya Iyer (Lead Eng.) and Priya Sharma (Site Mgr.).', user: 'Ananya Iyer', time: 'Jan 15, 2026 · 02:15 PM', icon: 'draw', color: 'text-green-600 bg-green-100' },
    { id: 'a6', type: 'Task', action: 'Task Assigned', detail: 'Rebar Inspection task added and assigned to Priya Sharma with HIGH priority.', user: 'Sanjay Gupta', time: 'Jan 18, 2026 · 10:00 AM', icon: 'assignment_ind', color: 'text-violet-600 bg-violet-100' },
    { id: 'a7', type: 'Safety', action: 'Safety Alert Raised', detail: 'Safety flag issued for South Zone excavation section. Required immediate inspection.', user: 'Rajesh Khanna', time: 'Jan 22, 2026 · 08:30 AM', icon: 'health_and_safety', color: 'text-red-600 bg-red-100' },
    { id: 'a8', type: 'Task', action: 'Checklist Updated', detail: 'Sub-task "Verify rebar spacing against blueprint v4.2" marked complete. Progress: 50%.', user: 'Priya Sharma', time: 'Jan 23, 2026 · 03:40 PM', icon: 'check_box', color: 'text-emerald-600 bg-emerald-100' },
    { id: 'a9', type: 'Milestone', action: 'Phase 1 Completed — 100%', detail: 'Foundation work completed. Phase 2 (Superstructure) set to begin.', user: 'Arjun Mehra', time: 'Feb 1, 2026 · 05:00 PM', icon: 'flag', color: 'text-amber-600 bg-amber-100' },
    { id: 'a10', type: 'Budget', action: 'Budget Update', detail: '₹12 Cr of ₹85 Cr used. Contingency fund of 5% activated for Phase 2.', user: 'Arjun Mehra', time: 'Feb 5, 2026 · 09:00 AM', icon: 'account_balance', color: 'text-orange-600 bg-orange-100' },
    { id: 'a11', type: 'Comment', action: 'Comment Posted', detail: 'Priya Sharma: "Weld points in the South Zone need re-documentation before sign-off."', user: 'Priya Sharma', time: 'Feb 8, 2026 · 11:20 AM', icon: 'comment', color: 'text-slate-600 bg-slate-100' },
    { id: 'a12', type: 'Document', action: 'File Deleted', detail: 'Old_Draft_V1.pdf permanently deleted from the Blueprints folder.', user: 'Arjun Mehra', time: 'Feb 10, 2026 · 04:00 PM', icon: 'delete', color: 'text-red-600 bg-red-100' },
    { id: 'a13', type: 'RFI', action: 'RFI Sent via Email', detail: 'RFI emailed to client regarding structural load specifications for the deck section.', user: 'Sanjay Gupta', time: 'Feb 14, 2026 · 10:00 AM', icon: 'mail', color: 'text-blue-600 bg-blue-100' },
    { id: 'a14', type: 'Milestone', action: 'Phase 2 — Structural Started', detail: 'Structural phase commenced. Current progress: 15%. Est. completion: Dec 15, 2026.', user: 'Sanjay Gupta', time: 'Mar 1, 2026 · 08:00 AM', icon: 'format_paint', color: 'text-pink-600 bg-pink-100' }
  ];

  get filteredAudit() {
    if (this.auditFilter === 'All') return this.auditTrail;
    return this.auditTrail.filter(a => a.type === this.auditFilter);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.fetchProjectDetails(id);
      }
    });

    this.projectService.getUpdates().subscribe(data => {
      this.updates = data.map((u, i) => ({
        ...u,
        assignee: i % 2 === 0 ? 'Marcus Thorne' : 'Sarah Chen'
      }));
    });
  }

  fetchProjectDetails(id: string) {
    this.projectService.getProjectById(id).pipe(
      catchError(() => of(this.getMockProject(id)))
    ).subscribe(data => {
      this.project = data;
      this.projectForm = { ...data };
      this.fetchTasks();
    });
  }

  fetchTasks() {
    this.projectService.getTasks().subscribe(tasks => {
      const projectTasks = tasks.filter(t => t.projectId === this.project.id);
      this.tasks = this.cpmService.calculateSchedule(projectTasks);
      this.updateProjectHealth();
    });
  }

  updateProjectHealth() {
    this.criticalTasksCount = this.tasks.filter(t => t.isCritical).length;
    this.totalFloat = this.tasks.reduce((acc, t) => acc + (t.totalFloat || 0), 0);
    this.scheduleRisk = this.criticalTasksCount > 5 ? 'High' : (this.criticalTasksCount > 2 ? 'Medium' : 'Low');
  }

  toggleEditProject() {
    this.isEditingProject = !this.isEditingProject;
  }

  saveProject() {
    this.project = { ...this.projectForm };
    this.isEditingProject = false;
    // In a real app, call projectService.updateProject(this.project)
  }

  getMockProject(id: string) {
    return {
      id,
      name: 'Skyline Tower Phase II',
      location: 'Downtown Metropolis Area',
      description: 'Visualizing structural progress and resource allocation across 12 active construction sites.',
      status: 'On Track',
      progress: 64,
      type: 'Commercial',
      budget: { total: 4500000, used: 1200000 },
      pocDetails: {
        contractValue: 15000000,
        estimatedTotalCost: 12000000,
        actualCost: 4500000,
        completionPercentage: { calculated: 37.5, isManual: false },
        revenueRecognized: 5625000,
        invoicedAmount: 5000000,
        unbilledRevenue: 625000,
        deferredRevenue: 0,
        recognizedProfit: 1125000,
        periodClosing: { lastCalculatedPeriod: '2026-03', approvalStatus: 'Approved' }
      },
      team: [
        { name: 'James Wilson', role: 'Project Director', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ6NqbeyzXdDdcKy8rA12bnb-D1XcFS2rr8zDl-BPEQQPcKodHtE3lG-MeVtaXdaulKwMjvYGMWDgMz7L1bQywZjuRsjgcfxQn9iVDDjn-S9c-U0mM0KIKQF0_U3aXqMPM9QZTt7m8khqSuD08ogwyCw24ghRW9YUe2bwt0s3THMMrL1xo9qBGM2z9kv1ZFUv238GeBHrkyEjR7jq4de8FvFuAzlnEaAF35yr9AkBXXUF3tIkIsYaqfofbVxV6-BNl4CPa95StjdLi' },
        { name: 'Sarah Miller', role: 'Lead Architect', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHUV8rEr4oiC6_1MYI1kgW0ggZSnSrnAzZ-k9VQi1UGsqN13HuH0LyClUWlj-5NEiuTZuG5iwAPh3UiqAYERUA01RZgAF5tzSCnfJzgxYe6rsXk3nKj33OWlSq03mwGCkbNsdEJLjjWEgtiAzDmPSc9zGNnptJ96YiaNWCJuGE2_sDehkpznp3KkI62BRNheEw0PEgmnfRYFiBE4KuBSffkJwD4s3iXK2Mgt7IIOM7NbvCU0WNWw3260PRfTykQyJNjZOFCXL9NoMP' }
      ],
      milestones: [
        { name: 'Foundations', progress: 100, color: 'primary' },
        { name: 'Structural Framing', progress: 42, color: 'secondary' },
        { name: 'Mechanical & Elec.', progress: 12, color: 'outline' }
      ],
      lastUpdate: '2 hours ago',
      estimatedCompletion: 'Oct 24, 2024',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy4VSdkv6U8BtqZ6hyasfIDNpx-i808f9yWboZSUj5QY7VoQcXDQfJFoOHnBZ52ZcqnbdZQkTTffm2Ssn5grM20FAir2zJciQ3TaqKdU3GDyFia3p7j0BHkaz316xlh2PaXTQtdTPluF2dQruB3QQ0WV3GzveL5--UUvkSWIMkR1WmUE6V8hHwdGk2vtDoXMX560B0049U7JsM8xCfOTN_tZKF4jnjFL-4hP5gKpGOq8f5K9Zw8fVOQMqWc7Poik05KR6kWHOTCaa1'
    };
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  showLinkModal = false;
  selectedMilestone: any;
  allSubProjects: any[] = [];

  showSubMilestoneModal = false;
  selectedParentMilestoneId: string | null = null;
  subMilestoneForm: any = { id: '', name: '', progress: 0, status: 'Pending', startDate: '', endDate: '' };
  isEditingSubMilestone = false;

  openAddSubMilestoneModal(milestoneId: string) {
    this.selectedParentMilestoneId = milestoneId;
    this.isEditingSubMilestone = false;
    this.subMilestoneForm = { id: 'sm' + Date.now(), name: '', progress: 0, status: 'Pending', startDate: '', endDate: '' };
    this.showSubMilestoneModal = true;
  }

  openEditSubMilestoneModal(milestoneId: string, sm: any) {
    this.selectedParentMilestoneId = milestoneId;
    this.isEditingSubMilestone = true;
    this.subMilestoneForm = { ...sm };
    this.showSubMilestoneModal = true;
  }

  saveSubMilestone() {
    if (!this.selectedParentMilestoneId) return;
    const ms = this.project.milestones.find((m: any) => m.id === this.selectedParentMilestoneId);
    if (ms) {
      if (!ms.subMilestones) ms.subMilestones = [];
      
      if (this.isEditingSubMilestone) {
        const idx = ms.subMilestones.findIndex((s: any) => s.id === this.subMilestoneForm.id);
        if (idx !== -1) ms.subMilestones[idx] = { ...this.subMilestoneForm };
      } else {
        ms.subMilestones.push({ ...this.subMilestoneForm });
      }
    }
    this.showSubMilestoneModal = false;
  }

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

  openEditMilestoneModal(ms: any) {
    this.isEditingMilestone = true;
    this.milestoneForm = { ...ms };
    this.showMilestoneModal = true;
  }

  saveMilestone() {
    if (this.isEditingMilestone) {
      const idx = this.project.milestones.findIndex((m: any) => m.id === this.milestoneForm.id);
      if (idx !== -1) {
        this.project.milestones[idx] = { ...this.milestoneForm };
      }
    } else {
      if (!this.project.milestones) this.project.milestones = [];
      this.project.milestones.push({ ...this.milestoneForm });
    }
    this.showMilestoneModal = false;
  }

  openAddSubProjectModal(ms: any) {
    this.selectedMilestoneForSubProject = ms;
    this.isEditingSubProject = false;
    this.subProjectForm = { id: 'sp' + Date.now(), name: '', progress: 0, status: 'In Progress', startDate: '', endDate: '', description: '' };
    this.showSubProjectModal = true;
  }

  openEditSubProjectModal(sp: any) {
    this.isEditingSubProject = true;
    this.subProjectForm = { ...sp };
    this.showSubProjectModal = true;
  }

  saveSubProject() {
    if (this.isEditingSubProject) {
      const idx = this.project.subProjects.findIndex((sp: any) => sp.id === this.subProjectForm.id);
      if (idx !== -1) {
        this.project.subProjects[idx] = { ...this.subProjectForm };
      }
    } else {
      if (!this.project.subProjects) this.project.subProjects = [];
      const newSubProject = { ...this.subProjectForm, projectId: this.project.id };
      this.project.subProjects.push(newSubProject);
      
      // Link it to the milestone
      if (this.selectedMilestoneForSubProject) {
        if (!this.selectedMilestoneForSubProject.subProjectIds) {
          this.selectedMilestoneForSubProject.subProjectIds = [];
        }
        this.selectedMilestoneForSubProject.subProjectIds.push(newSubProject.id);
      }
    }
    this.showSubProjectModal = false;
  }

  openLinkSubProjectModal(ms: any) {
    this.selectedMilestone = ms;
    this.allSubProjects = this.project.subProjects || [];
    this.showLinkModal = true;
  }

  linkSubProject(subProjectId: string) {
    if (!this.selectedMilestone.subProjectIds) {
      this.selectedMilestone.subProjectIds = [];
    }
    if (!this.selectedMilestone.subProjectIds.includes(subProjectId)) {
      this.selectedMilestone.subProjectIds.push(subProjectId);
      // In a real app, persistent save here
    }
    this.showLinkModal = false;
  }

  isSubProjectLinked(subProjectId: string): boolean {
    return (this.selectedMilestone?.subProjectIds || []).includes(subProjectId);
  }

  // RFI Mock logic
  showRFIComposer = false;
  rfiForm = { to: '', cc: '', bcc: '', subject: '', content: '' };
  sendRFI() {
    this.showRFIComposer = false;
    alert('RFI Sent Successfully');
  }

  // Drawing Upload Mock
  showDrawingUpload = false;
  uploadedDrawings: any[] = [];
  openDrawingUpload() {
    this.showDrawingUpload = true;
  }
  submitDrawing() {
    this.showDrawingUpload = false;
    this.uploadedDrawings.push({ name: 'New Drawing.pdf', date: new Date().toLocaleDateString() });
  }
}
