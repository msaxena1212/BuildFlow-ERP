import { Component, OnInit, Input, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-budget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-budget.html',
  styleUrls: ['./project-budget.css']
})
export class ProjectBudget implements OnInit {
  private _project: any;
  @Input() set project(value: any) {
    this._project = value;
    if (value) {
      this.overrideForm.percentage = value.pocDetails?.completionPercentage.calculated || 0;
      this.calculateChartMax();
      this.loadVendors();
    }
  }
  get project() { return this._project; }

  @Output() projectUpdated = new EventEmitter<any>();

  private projectService = inject(ProjectService);
  isConsolidating = false;
  consolidationMessage = '';

  showOverrideModal = false;
  showSettlementModal = false;
  showDecisionModal = false;
  isBatchProcessing = false;
  
  vendors: any[] = [];
  activeSettlement: any = null;
  activeDecisionRequest: any = null;
  decisionType: 'Approve' | 'Reject' = 'Approve';
  decisionJustification: string = '';
  selectedBasis: string = 'POC';

  overrideForm = {
    percentage: 0,
    justification: ''
  };

  chartMaxVal: number = 0;

  constructor() {}

  ngOnInit() {
    // Initialization handled by project setter
  }

  loadVendors() {
    if (!this.project?.name) {
      console.warn('[ProjectBudget] Cannot load vendors: Project name is missing', this.project);
      return;
    }
    const targetProjectName = this.project.name.trim();
    console.log('[ProjectBudget] Loading vendors for:', targetProjectName);
    
    this.projectService.getVendors().subscribe({
      next: (allVendors) => {
        this.vendors = allVendors.filter((v: any) => 
          v.projects.some((p: string) => p.trim() === targetProjectName)
        );
        console.log(`[ProjectBudget] Found ${this.vendors.length} vendors for project:`, targetProjectName);
        if (this.vendors.length === 0) {
          console.log('[ProjectBudget] Available vendors and their projects:', allVendors.map(v => ({ name: v.name, projects: v.projects })));
        }
      },
      error: (err) => console.error('[ProjectBudget] Error loading vendors:', err)
    });
  }

  openSettlementModal(vendor: any) {
    if (!this.project?.id) {
      console.error('Project ID missing');
      return;
    }
    console.log('[ProjectBudget] Requesting Settlement Generation:', {
      vendorId: vendor.id,
      projectId: this.project.id,
      basis: this.selectedBasis
    });
    this.projectService.generateSettlement(vendor.id, this.project.id, this.selectedBasis).subscribe({
      next: (request) => {
        console.log('Generated request successfully:', request);
        this.activeSettlement = { ...request, vendorName: vendor.name };
        this.showSettlementModal = true;
      },
      error: (err) => {
        console.error('Error generating settlement:', err);
        alert('Failed to generate settlement request. Check console for details.');
      }
    });
  }

  openDecisionModal(request: any, type: 'Approve' | 'Reject') {
    this.activeDecisionRequest = request;
    this.decisionType = type;
    this.decisionJustification = type === 'Approve' ? 'Work verified against site POC. Values consolidated.' : '';
    this.showDecisionModal = true;
  }

  submitDecision() {
    if (!this.activeDecisionRequest) return;
    
    const updatedStatus = this.decisionType === 'Approve' ? 'Approved' : 'Rejected';
    const payload = { 
      ...this.activeDecisionRequest, 
      status: updatedStatus,
      approverJustification: this.decisionJustification 
    };

    this.projectService.saveSettlement(this.activeDecisionRequest.vendorId, payload).subscribe({
      next: (res) => {
        console.log(`Settlement ${this.decisionType}ed:`, res);
        this.showDecisionModal = false;
        this.activeDecisionRequest = null;
        this.loadVendors();
      },
      error: (err) => alert(`Error ${this.decisionType}ing settlement: ` + err.message)
    });
  }

  approveSettlement(request: any) {
    this.openDecisionModal(request, 'Approve');
  }

  rejectSettlement(request: any) {
    this.openDecisionModal(request, 'Reject');
  }

  getVendorLogo(vendorId: any): string | null {
    const vendor = this.vendors.find(v => v.id == vendorId);
    return vendor ? vendor.logo : null;
  }

  getPendingSettlements() {
    const allRequests: any[] = [];
    this.vendors.forEach(v => {
      if (v.settlementRequests) {
        v.settlementRequests.forEach((r: any) => {
          if (r.status === 'Pending' && r.projectId === this.project.id) {
            allRequests.push({ ...r, vendorName: v.name });
          }
        });
      }
    });
    return allRequests.sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime());
  }



  hasSettlements(vendor: any): boolean {
    return !!(vendor.settlementRequests && vendor.settlementRequests.length > 0);
  }

  updateSettlementBasis(basis: string) {
    if (this.activeSettlement) {
      this.selectedBasis = basis;
      this.projectService.generateSettlement(this.activeSettlement.vendorId, this.project.id, basis).subscribe(request => {
        this.activeSettlement = { ...request, vendorName: this.activeSettlement.vendorName };
      });
    }
  }

  // rejectSettlement now calls openDecisionModal directly from template
  // or via the helper above.

  submitSettlement() {
    console.log('Submitting settlement:', this.activeSettlement);
    this.projectService.saveSettlement(this.activeSettlement.vendorId, this.activeSettlement).subscribe({
      next: () => {
        this.showSettlementModal = false;
        this.activeSettlement = null;
        this.loadVendors();
        alert('Settlement Request Submitted Successfully');
      },
      error: (err) => {
        console.error('Error submitting settlement:', err);
        alert('Submission failed: ' + err.message);
      }
    });
  }

  private calculateChartMax() {
    if (!this.project?.pocDetails?.historicalMetrics?.length) return;
    const data = this.project.pocDetails.historicalMetrics;
    this.chartMaxVal = Math.max(...data.map((m: any) => Math.max(m.budget, m.actual))) * 1.2; // 20% padding
  }

  getBudgetPath(): string {
    if (!this.project?.pocDetails?.historicalMetrics?.length || this.chartMaxVal === 0) return '';
    const data = this.project.pocDetails.historicalMetrics;
    const points = data.map((m: any, i: number) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - (m.budget / this.chartMaxVal) * 90;
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  }

  getActualPath(): string {
    if (!this.project?.pocDetails?.historicalMetrics?.length || this.chartMaxVal === 0) return '';
    const data = this.project.pocDetails.historicalMetrics;
    const points = data.map((m: any, i: number) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - (m.actual / this.chartMaxVal) * 90;
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  }

  getActualAreaPath(): string {
    const path = this.getActualPath();
    if (!path) return '';
    return `${path} L 100,100 L 0,100 Z`;
  }

  getBudgetAreaPath(): string {
    const path = this.getBudgetPath();
    if (!path) return '';
    return `${path} L 100,100 L 0,100 Z`;
  }

  openOverrideModal() {
    if (this.project?.pocDetails) {
      this.overrideForm.percentage = this.project.pocDetails.completionPercentage.manualOverride || this.project.pocDetails.completionPercentage.calculated;
    }
    this.showOverrideModal = true;
  }

  submitOverride() {
    if (this.project?.pocDetails) {
      this.project.pocDetails.completionPercentage.manualOverride = this.overrideForm.percentage;
      this.project.pocDetails.completionPercentage.isManual = true;
      this.project.pocDetails.periodClosing.approvalStatus = 'Pending';
      this.projectUpdated.emit(this.project);
    }
    this.showOverrideModal = false;
  }

  runConsolidation() {
    if (!this.project || !this.project.id) return;
    this.isConsolidating = true;
    this.consolidationMessage = 'Syncing ledgers...';

    this.projectService.consolidatePoc(this.project.id).subscribe({
      next: (updatedProject) => {
        this.project = updatedProject;
        this.projectUpdated.emit(this.project);
        this.isConsolidating = false;
        this.consolidationMessage = 'Consolidation complete';
        setTimeout(() => this.consolidationMessage = '', 3000);
      },
      error: (err) => {
        console.error('Failed to consolidate POC:', err);
        this.consolidationMessage = 'Sync failed';
        setTimeout(() => {
          this.project.pocDetails.actualCost += 25000;
          this.project.pocDetails.completionPercentage.calculated = parseFloat(((this.project.pocDetails.actualCost / this.project.pocDetails.estimatedTotalCost) * 100).toFixed(2));
          if (!this.project.pocDetails.completionPercentage.isManual) {
            this.project.pocDetails.revenueRecognized = parseFloat(((this.project.pocDetails.completionPercentage.calculated / 100) * this.project.pocDetails.contractValue).toFixed(2));
          }
          this.isConsolidating = false;
          this.consolidationMessage = 'Manual fallback applied';
          this.projectUpdated.emit(this.project);
          setTimeout(() => this.consolidationMessage = '', 3000);
        }, 1000);
      }
    });
  }
}
