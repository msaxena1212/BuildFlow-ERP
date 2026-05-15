import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnterpriseService } from '../../services/enterprise.service';
import { ProjectService } from '../../services/project.service';
import { Branch, Expense, GuaranteeTracking, BillingDocument, BranchSettlement, Project } from '../../models/models';

@Component({
  selector: 'app-enterprise-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enterprise.html',
  styleUrls: ['./enterprise.css']
})
export class EnterpriseDashboard implements OnInit {
  private enterpriseService = inject(EnterpriseService);
  private projectService = inject(ProjectService);

  branches: Branch[] = [];
  expenses: Expense[] = [];
  guarantees: GuaranteeTracking[] = [];
  billing: BillingDocument[] = [];
  settlements: BranchSettlement[] = [];
  projects: Project[] = [];

  activeTab: 'branches' | 'financials' | 'guarantees' | 'billing' = 'branches';

  ngOnInit() {
    this.enterpriseService.getBranches().subscribe(data => this.branches = data);
    this.enterpriseService.getExpenses().subscribe(data => this.expenses = data);
    this.enterpriseService.getGuaranteeTracking().subscribe(data => this.guarantees = data);
    this.enterpriseService.getBillingDocuments().subscribe(data => this.billing = data);
    this.enterpriseService.getBranchSettlements().subscribe(data => this.settlements = data);
    this.projectService.getProjects().subscribe(data => this.projects = data);
  }

  setTab(tab: 'branches' | 'financials' | 'guarantees' | 'billing') {
    this.activeTab = tab;
  }

  getProjectName(code: string): string {
    const proj = this.projects.find(p => p.projectCode === code);
    return proj ? proj.name : code;
  }

  getTotalBranchBalance(branch: Branch): number {
    return branch.bankAccounts.reduce((sum, acc) => sum + acc.balance, 0);
  }

  getProjectExpenses(code: string): number {
    return this.expenses.filter(e => e.projectCode === code).reduce((sum, e) => sum + e.amount, 0);
  }
}
