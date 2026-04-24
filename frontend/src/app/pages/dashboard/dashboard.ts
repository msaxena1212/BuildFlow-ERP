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
  laborStats: any = null;
  contractorMetrics: any[] = [];
  contracts: any[] = [];
  
  overallBudgetUsage = 0;
  totalPortfolioValue = 0;
  totalUsedBudget = 0;
  totalCommittedValue = 0;
  activePersonnel = 0;
  avgSafetyScore = 0;

  // Pagination for Projects
  // Pagination for Projects
  projectPage = 1;
  projectsPerPage = 5;

  // Pagination for Financial Table
  financialPage = 1;
  financialPerPage = 5;

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

    this.projectService.getLaborStats().subscribe(data => {
      this.laborStats = data;
      this.activePersonnel = data.totalPersonnel;
    });

    this.projectService.getContractorMetrics().subscribe(data => {
      this.contractorMetrics = data;
      if (data.length > 0) {
        this.avgSafetyScore = Math.round(data.reduce((acc: number, curr: any) => acc + curr.safetyScore, 0) / data.length);
      }
    });

    this.projectService.getContracts().subscribe(data => {
      this.contracts = data;
      this.totalCommittedValue = data.reduce((acc: number, curr: any) => acc + curr.value, 0);
    });
  }

  get filteredUpdates() {
    return this.updates;
  }

  get paginatedProjects() {
    const start = (this.projectPage - 1) * this.projectsPerPage;
    return this.projects.slice(start, start + this.projectsPerPage);
  }

  get totalProjectPages() {
    return Math.ceil(this.projects.length / this.projectsPerPage);
  }

  get paginatedFinancialProjects() {
    const start = (this.financialPage - 1) * this.financialPerPage;
    return this.projects.slice(start, start + this.financialPerPage);
  }

  get totalFinancialPages() {
    return Math.ceil(this.projects.length / this.financialPerPage);
  }


  calculateMetrics() {
    if (this.projects.length === 0) return;
    this.totalPortfolioValue = 0;
    this.totalUsedBudget = 0;
    this.projects.forEach(p => {
        this.totalPortfolioValue += p.budget.total;
        this.totalUsedBudget += p.budget.used;
    });
    this.overallBudgetUsage = Math.round((this.totalUsedBudget / this.totalPortfolioValue) * 100);
  }
}
