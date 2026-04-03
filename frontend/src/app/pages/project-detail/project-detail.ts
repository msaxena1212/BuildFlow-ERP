import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, TaskManagement, ProjectTimeline, ProjectBudget, ProjectFiles, AddSiteNoteModal, SiteGallery, FormsModule],
  templateUrl: './project-detail.html',
  styleUrls: ['./project-detail.css']
})
export class ProjectDetail implements OnInit {
  teamMembers = [
    { name: 'All Members' },
    { name: 'Marcus Thorne' },
    { name: 'Sarah Chen' },
    { name: 'David Miller' }
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
    { id: 'a1', type: 'Project', action: 'Project Created', detail: 'Harbor Bridge Renovation project initialized with a budget of ₹8M. Director: James Wilson.', user: 'James Wilson', time: 'Jan 5, 2024 · 09:00 AM', icon: 'rocket_launch', color: 'text-blue-600 bg-blue-100' },
    { id: 'a2', type: 'Team', action: 'Team Assembled', detail: 'Core team assigned: Sarah Jenkins (Lead), Marcus Chen (Supervisor), David Miller (Safety).', user: 'James Wilson', time: 'Jan 5, 2024 · 09:30 AM', icon: 'group_add', color: 'text-indigo-600 bg-indigo-100' },
    { id: 'a3', type: 'Milestone', action: 'Phase 1 — Scaffolding Started', detail: 'Site preparation and scaffolding work commenced. Milestone marked In Progress.', user: 'Marcus Chen', time: 'Jan 8, 2024 · 07:45 AM', icon: 'flag', color: 'text-amber-600 bg-amber-100' },
    { id: 'a4', type: 'Document', action: 'Blueprint Uploaded', detail: 'Ground_Floor_Structural_V3.cad uploaded by James W. Version 3.0 approved.', user: 'James Wilson', time: 'Jan 12, 2024 · 11:10 AM', icon: 'upload_file', color: 'text-cyan-600 bg-cyan-100' },
    { id: 'a5', type: 'Signature', action: 'Document Signed', detail: 'Foundations_Rev_B.pdf signed by David Chen (Lead Eng.) and Sarah Jenkins (Site Mgr.).', user: 'David Chen', time: 'Jan 15, 2024 · 02:15 PM', icon: 'draw', color: 'text-green-600 bg-green-100' },
    { id: 'a6', type: 'Task', action: 'Task Assigned', detail: 'Rebar Inspection task added and assigned to Sarah Jenkins with HIGH priority.', user: 'Marcus Chen', time: 'Jan 18, 2024 · 10:00 AM', icon: 'assignment_ind', color: 'text-violet-600 bg-violet-100' },
    { id: 'a7', type: 'Safety', action: 'Safety Alert Raised', detail: 'Safety flag issued for NE scaffolding section. Required immediate inspection before work resumed.', user: 'David Miller', time: 'Jan 22, 2024 · 08:30 AM', icon: 'health_and_safety', color: 'text-red-600 bg-red-100' },
    { id: 'a8', type: 'Task', action: 'Checklist Updated', detail: 'Sub-task "Verify rebar spacing against blueprint v4.2" marked complete. Progress: 50%.', user: 'Sarah Jenkins', time: 'Jan 23, 2024 · 03:40 PM', icon: 'check_box', color: 'text-emerald-600 bg-emerald-100' },
    { id: 'a9', type: 'Milestone', action: 'Phase 1 Completed — 100%', detail: 'Scaffolding milestone completed. Phase 2 (Painting) set to begin immediately.', user: 'James Wilson', time: 'Feb 1, 2024 · 05:00 PM', icon: 'flag', color: 'text-amber-600 bg-amber-100' },
    { id: 'a10', type: 'Budget', action: 'Budget Update', detail: '₹5.5M of ₹8M used. Contingency fund of 5% activated for Phase 2.', user: 'James Wilson', time: 'Feb 5, 2024 · 09:00 AM', icon: 'account_balance', color: 'text-orange-600 bg-orange-100' },
    { id: 'a11', type: 'Comment', action: 'Comment Posted', detail: 'Sarah Jenkins: "Weld points in the NE corner need re-documentation before sign-off."', user: 'Sarah Jenkins', time: 'Feb 8, 2024 · 11:20 AM', icon: 'comment', color: 'text-slate-600 bg-slate-100' },
    { id: 'a12', type: 'Document', action: 'File Deleted', detail: 'Old_Draft_V1.pdf permanently deleted from the Blueprints folder.', user: 'James Wilson', time: 'Feb 10, 2024 · 04:00 PM', icon: 'delete', color: 'text-red-600 bg-red-100' },
    { id: 'a13', type: 'RFI', action: 'RFI Sent via Email', detail: 'RFI emailed to client regarding structural load specifications for the bridge deck section.', user: 'Marcus Chen', time: 'Feb 14, 2024 · 10:00 AM', icon: 'mail', color: 'text-blue-600 bg-blue-100' },
    { id: 'a14', type: 'Milestone', action: 'Phase 2 — Painting Started', detail: 'Painting phase commenced. Current progress: 15%. Est. completion: Dec 15, 2024.', user: 'Marcus Chen', time: 'Mar 1, 2024 · 08:00 AM', icon: 'format_paint', color: 'text-pink-600 bg-pink-100' }
  ];

  get filteredAudit() {
    if (this.auditFilter === 'All') return this.auditTrail;
    return this.auditTrail.filter(a => a.type === this.auditFilter);
  }

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.fetchProjectDetails(id);
      }
    });

    this.projectService.getUpdates().subscribe(data => {
      // Enrichment: add mock assignees to updates for filtering
      this.updates = data.map((u, i) => ({
        ...u,
        assignee: i % 2 === 0 ? 'Marcus Thorne' : 'Sarah Chen'
      }));
    });
  }

  get filteredUpdates() {
    if (this.selectedMember === 'All Members') return this.updates;
    return this.updates.filter(u => u.assignee === this.selectedMember);
  }

  showRFIComposer = false;
  showDrawingUpload = false;
  rfiForm = { to: '', cc: '', bcc: '', subject: '', content: '' };
  uploadedDrawings: any[] = [];

  openRFIComposer() {
    this.showRFIComposer = true;
  }

  sendRFI() {
    if (this.rfiForm.to && this.rfiForm.subject) {
      console.log('Sending RFI...', this.rfiForm);
      this.rfiForm = { to: '', cc: '', bcc: '', subject: '', content: '' };
      this.showRFIComposer = false;
    }
  }

  openDrawingUpload() {
    this.showDrawingUpload = true;
  }

  submitDrawing() {
    const fileName = `drawing_submission_${this.uploadedDrawings.length + 1}.pdf`;
    this.uploadedDrawings.push({
      name: fileName,
      date: new Date().toLocaleDateString()
    });
    this.showDrawingUpload = false;
  }

  fetchProjectDetails(id: string) {
    this.projectService.getProjectById(id).pipe(
      catchError(() => of(this.getMockProject(id)))
    ).subscribe(data => {
      this.project = data;
    });
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
}
