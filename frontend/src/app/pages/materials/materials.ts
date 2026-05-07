import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialService, Material, PurchaseRequisition, StockTransfer, MaterialReturn } from '../../services/material.service';
import { VendorService, Vendor } from '../../services/vendor.service';
import { RbacService } from '../../services/rbac.service';
import { PermissionDirective } from '../../directives/permission.directive';
import { ProjectService, Project } from '../../services/project.service';

@Component({
  selector: 'app-materials-management',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, PermissionDirective],
  templateUrl: './materials.html'
})
export class MaterialsManagement implements OnInit {
  private materialService = inject(MaterialService);
  private vendorService = inject(VendorService);
  private projectService = inject(ProjectService);
  private router = inject(Router);
  public rbac = inject(RbacService);
  
  team = [
    { name: 'All Members' },
    { name: 'Rajesh Khanna' },
    { name: 'Priya Sharma' }
  ];
  selectedMember = 'All Members';
  selectedTab = 'All Materials';
  tabs = ['All Materials', 'Low Stock', 'Concrete', 'Steel', 'Electrical', 'Lumber'];

  // Modal States
  showAddModal = false;
  showEditModal = false;
  showDeleteModal = false;
  showFilters = false;
  showPRModal = false;
  showTransferModal = false;
  showReturnModal = false;

  materialToEdit: Material | null = null;
  materialToDelete: Material | null = null;

  newMaterial: Material = this.getDefaultMaterial();
  
  newPR: Partial<PurchaseRequisition> = {
    priority: 'Medium',
    quantity: 0,
    status: 'Pending'
  };

  newTransfer: Partial<StockTransfer> = {
    quantity: 0,
    status: 'Draft'
  };

  newReturn: Partial<MaterialReturn> = {
    quantity: 0,
    reason: 'Surplus',
    status: 'Pending'
  };

  materials: Material[] = [];
  vendors: Vendor[] = [];
  projects: Project[] = [];
  purchaseRequisitions: PurchaseRequisition[] = [];
  stockTransfers: StockTransfer[] = [];
  materialReturns: MaterialReturn[] = [];
  inventoryAnalysis: any[] = [];
  isAnalyzing = false;

  ngOnInit() {
    this.materialService.materials$.subscribe(m => {
      this.materials = m;
      this.runAnalysis(); // Run analysis whenever materials update
    });
    this.vendorService.vendors$.subscribe(v => this.vendors = v);
    this.projectService.projects$.subscribe(p => this.projects = p);
    this.materialService.purchaseRequisitions$.subscribe(pr => this.purchaseRequisitions = pr);
    this.materialService.stockTransfers$.subscribe(st => this.stockTransfers = st);
    this.materialService.materialReturns$.subscribe(mr => this.materialReturns = mr);
  }

  runAnalysis() {
    this.isAnalyzing = true;
    this.materialService.getInventoryAnalysis().subscribe(analysis => {
      this.inventoryAnalysis = analysis;
      this.isAnalyzing = false;
    });
  }

  triggerAIReorder() {
    this.materialService.triggerAutoReorder().subscribe(newPRs => {
      if (newPRs && newPRs.length > 0) {
        alert(`AI Agent triggered ${newPRs.length} auto-requisitions based on burn rate forecasts.`);
      } else {
        alert('Inventory levels within safety thresholds. No auto-reorders required.');
      }
    });
  }

  onSupplierChange() {
    if (this.newMaterial.supplier === 'ADD_NEW') {
      this.showAddModal = false;
      this.router.navigate(['/vendors']);
    }
  }

  get filteredMaterials() {
    let filtered = this.materials;
    
    if (this.selectedTab === 'Low Stock') {
      filtered = filtered.filter(m => m.status === 'Critical' || m.stock.percent < 20);
    } else if (this.selectedTab !== 'All Materials') {
      filtered = filtered.filter(m => m.category.toLowerCase() === this.selectedTab.toLowerCase());
    }

    return filtered;
  }

  getDefaultMaterial(): Material {
    return {
      name: '',
      sku: '',
      category: 'Concrete',
      icon: 'inventory_2',
      bg: 'bg-slate-100',
      text: 'text-slate-400',
      unit: 'Units',
      siteInventory: [],
      stock: { current: 0, total: 100, percent: 0 },
      cost: '₹0.00',
      supplier: '',
      status: 'Optimal'
    };
  }

  openAddModal() {
    this.newMaterial = this.getDefaultMaterial();
    this.showAddModal = true;
  }

  addMaterial() {
    this.newMaterial.stock.percent = Math.round((this.newMaterial.stock.current / this.newMaterial.stock.total) * 100);
    this.newMaterial.status = this.calculateStatus(this.newMaterial.stock.percent);
    this.materialService.addMaterial({ ...this.newMaterial } as Material);
    this.showAddModal = false;
  }

  openEditModal(event: Event, material: Material) {
    event.stopPropagation();
    this.materialToEdit = { ...material };
    this.showEditModal = true;
  }

  updateMaterial() {
    if (this.materialToEdit) {
      this.materialToEdit.stock.percent = Math.round((this.materialToEdit.stock.current / this.materialToEdit.stock.total) * 100);
      this.materialToEdit.status = this.calculateStatus(this.materialToEdit.stock.percent);
      this.materialService.updateMaterial(this.materialToEdit.sku, this.materialToEdit);
      this.showEditModal = false;
    }
  }

  openDeleteModal(event: Event, material: Material) {
    event.stopPropagation();
    this.materialToDelete = material;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.materialToDelete) {
      this.materialService.deleteMaterial(this.materialToDelete.sku);
      this.showDeleteModal = false;
    }
  }

  // PR & Transfer Methods
  openPRModal(material: Material) {
    this.newPR = {
      materialSku: material.sku,
      materialName: material.name,
      unit: material.unit,
      quantity: 0,
      priority: 'Medium',
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      requestor: this.rbac.getCurrentUser()?.name || 'System'
    };
    this.showPRModal = true;
  }

  submitPR() {
    const project = this.projects.find(p => p.id === this.newPR.projectId);
    if (project) {
      this.newPR.projectName = project.name;
    }

    // Hierarchical Approval Logic for Demo
    const qty = this.newPR.quantity || 0;
    if (qty <= 100) {
      this.newPR.status = 'Approved'; // Site Manager authority
    } else if (qty <= 500) {
      this.newPR.status = 'Pending'; // Warehouse Manager approval required
    } else {
      this.newPR.status = 'Pending'; // Management approval required (1000+)
    }

    this.materialService.createPurchaseRequisition(this.newPR).subscribe(() => {
      const msg = qty <= 100 ? 'PR Auto-Approved (Site Manager Authority)' : 
                  qty <= 500 ? 'PR Submitted for Warehouse Manager Approval' : 
                  'PR Submitted for Executive Management Approval';
      alert(msg);
      this.showPRModal = false;
    });
  }

  openTransferModal(material: Material) {
    this.newTransfer = {
      materialSku: material.sku,
      materialName: material.name,
      unit: material.unit,
      quantity: 0,
      date: new Date().toISOString().split('T')[0],
      status: 'Draft',
      requestedBy: this.rbac.getCurrentUser()?.name || 'System'
    };
    this.showTransferModal = true;
  }

  submitTransfer() {
    const fromP = this.projects.find(p => p.id === this.newTransfer.fromProjectId);
    const toP = this.projects.find(p => p.id === this.newTransfer.toProjectId);
    if (fromP) this.newTransfer.fromProjectName = fromP.name;
    if (toP) this.newTransfer.toProjectName = toP.name;

    this.materialService.createStockTransfer(this.newTransfer).subscribe(() => {
      this.showTransferModal = false;
    });
  }

  openReturnModal(material: Material) {
    this.newReturn = {
      materialSku: material.sku,
      materialName: material.name,
      unit: material.unit,
      quantity: 0,
      reason: 'Surplus',
      requestDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      requestedBy: this.rbac.getCurrentUser()?.name || 'System'
    };
    this.showReturnModal = true;
  }

  submitReturn() {
    const project = this.projects.find(p => p.id === this.newReturn.projectId);
    if (project) {
      this.newReturn.projectName = project.name;
    }
    
    this.materialService.createMaterialReturn(this.newReturn).subscribe(() => {
      alert('Reverse Logistics: Material return request submitted to warehouse.');
      this.showReturnModal = false;
    });
  }

  calculateStatus(percent: number): 'Optimal' | 'Adequate' | 'Critical' {
    if (percent < 20) return 'Critical';
    if (percent < 60) return 'Adequate';
    return 'Optimal';
  }

  exportReport() {
    console.log('Exporting materials report...');
    alert('Materials report exported successfully (Simulated)');
  }

  deliveries = [
    { time: '09:00', period: 'AM', item: 'Lumber Pine Planks (400 Units)', location: 'Prestige Tech Park, Bangalore', status: 'In Transit', statusColor: 'bg-blue-50 text-blue-600', assignee: 'Rajesh Khanna' },
    { time: '14:30', period: 'PM', item: 'HVAC Ducting Components', location: 'Coastal Road Project, Mumbai', status: 'Confirmed', statusColor: 'bg-surface-container text-outline', assignee: 'Priya Sharma' }
  ];

  get filteredDeliveries() {
    if (this.selectedMember === 'All Members') return this.deliveries;
    return this.deliveries.filter(d => d.assignee === this.selectedMember);
  }
}
