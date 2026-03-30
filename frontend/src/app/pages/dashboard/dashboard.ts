import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { AddSiteNoteModal } from '../../components/add-site-note/add-site-note';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule, AddSiteNoteModal],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  projects: any[] = [];
  updates: any[] = [];
  overallBudgetUsage = 0;
  showAddUpdateModal = false;

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
