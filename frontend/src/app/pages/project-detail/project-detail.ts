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

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, TaskManagement, ProjectTimeline, ProjectBudget, ProjectFiles, AddSiteNoteModal, SiteGallery],
  templateUrl: './project-detail.html',
  styleUrls: ['./project-detail.css']
})
export class ProjectDetail implements OnInit {
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
      this.updates = data;
    });
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
