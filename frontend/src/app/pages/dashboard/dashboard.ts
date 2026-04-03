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
  
  team = [
    { name: 'All Members', avatar: '' },
    { name: 'Marcus Thorne', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4CZeaYB7fJXEtjKFkVujKuYnqc32Vz4RirffP91HCE-igMSlf58IRegCTvDiO-n6vn8GSii3hmQCT9wn7MZCO7LYC87Mix-nc0uOD0_dHzMdyYmVbfUFLAGo6sFmnu6r5xb66CI_FUi6YCEqOcUKyBiL2helT79G1OiGR1inPdCcO87KgZ9ygFt4Q9GbiYVVfSvdkQ-o38syvfzzZJtPCCht9KpCLNPH4NAfNB_nmM9iLmnFOQ8z1D6W3w9caWMwVul6E7XtJszA-' },
    { name: 'Sarah Chen', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1RmRziofMuKPCOGKlk1YnapBSbLaEfo01m3q_4lcO8xWYBy9DKhbId94OYnRLdh0YKtETgTw4OBQS76xCwa3GI8lqHXQEh4qQQyAWfHCmwY_elYYp6wMji5eXHwrqZcUD4iEoGkyYIRyKMxXR2lEAw34APWS_Omi6iwEz2PTn97envSoQbpymAyVXp1E00dhY0AgRi3UNTNPZdT8tKT6Oe6M4gpGCg1r2U1-D3cACjbZQSMZS2qrf08cBFkc50Xkbgk1epsoox4yv' },
    { name: 'David Miller', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8baYgQ3t4oMOHGPKXfFarqNItNIVVIfHOd53B1k7u3hLEDI1NYxbXwlB4obDhV4NFcKoh8XmJmz--LGSGjwi-6_5tek1bR_4g0zR8sP-PKdjXkmPZWQPWYZ_WxA4kNCyBSgF7hIdr8RLZJs4XGSqYbw-_kXxfo-jZFLySHpFqmRgQ_aH6iI-s-i2NZhe1wBHjRb3yN5siRJVrfnA1aetRFHVhFPPyPAuU9CJDj0_GJxvMIbyHt4DkCEkTrU9YIyXXMafDVs-F6tao' }
  ];
  selectedMember = 'All Members';

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
    if (this.selectedMember === 'All Members') return this.updates;
    return this.updates.filter(u => u.title.toLowerCase().includes(this.selectedMember.toLowerCase()) || u.description.toLowerCase().includes(this.selectedMember.toLowerCase()));
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
