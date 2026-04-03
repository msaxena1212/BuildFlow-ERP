import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { AddSiteNoteModal } from '../../components/add-site-note/add-site-note';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule, AddSiteNoteModal, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  projects: any[] = [];
  updates: any[] = [];
  overallBudgetUsage = 0;
  showAddUpdateModal = false;
  
  loggedInUser = {
    name: 'James Wilson',
    role: 'Project Director',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ6NqbeyzXdDdcKy8rA12bnb-D1XcFS2rr8zDl-BPEQQPcKodHtE3lG-MeVtaXdaulKwMjvYGMWDgMz7L1bQywZjuRsjgcfxQn9iVDDjn-S9c-U0mM0KIKQF0_U3aXqMPM9QZTt7m8khqSuD08ogwyCw24ghRW9YUe2bwt0s3THMMrL1xo9qBGM2z9kv1ZFUv238GeBHrkyEjR7jq4de8FvFuAzlnEaAF35yr9AkBXXUF3tIkIsYaqfofbVxV6-BNl4CPa95StjdLi'
  };


  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
      this.calculateMetrics();
    });

    this.projectService.getUpdates().subscribe(data => {
      this.updates = data;
    });
  }

  get filteredUpdates() {
    return this.updates;
  }


  calculateMetrics() {
    if (this.projects.length === 0) return;
    let totalBudget = 0;
    let usedBudget = 0;
    this.projects.forEach(p => {
        totalBudget += p.budget.total;
        usedBudget += p.budget.used;
    });
    this.overallBudgetUsage = Math.round((usedBudget / totalBudget) * 100);
  }
}
