import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContractService, Contract, ContractHistory } from '../../services/contract.service';
import { VendorService, Vendor } from '../../services/vendor.service';

@Component({
  selector: 'app-contract-management',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './contracts.html',
  styleUrls: ['./contracts.css']
})
export class ContractManagement implements OnInit {
  private contractService = inject(ContractService);
  private vendorService = inject(VendorService);
  private router = inject(Router);

  selectedVendor = 'All Vendors';
  vendors = ['All Vendors', 'Titan Structural Steel, LLC', 'VoltStream Electrical', 'Apex Concrete Co.'];
  allVendors: Vendor[] = [];

  contracts: Contract[] = [];
  activeDropdownId: string | null = null;
  documents = [
    { name: 'Titan_Structural_MSA_2024.pdf', type: 'Master Agreement', size: '2.4 MB', date: 'Sep 02', icon: 'picture_as_pdf', color: 'text-red-500', bg: 'bg-red-50' },
    { name: 'Change_Order_004_Skyline.docx', type: 'Amendment', size: '45 KB', date: 'Aug 28', icon: 'description', color: 'text-blue-500', bg: 'bg-blue-50' },
    { name: 'OSHA_Compliance_Certificate_2024.pdf', type: 'Compliance', size: '1.1 MB', date: 'Aug 15', icon: 'policy', color: 'text-amber-600', bg: 'bg-amber-50' },
    { name: 'Site_Safety_Plan_v2.zip', type: 'Operational', size: '12.8 MB', date: 'Jul 30', icon: 'folder_shared', color: 'text-slate-500', bg: 'bg-slate-50' }
  ];
  history: ContractHistory[] = [];

  // Modal State
  showRenewalModal = false;
  showNewContractModal = false;
  showDetailsModal = false;
  showHistoryModal = false;
  showTerminateModal = false;
  selectedContract: Contract | null = null;
  renewalForm = {
    newExpiry: '',
    newValue: 0
  };
  newContractForm: Partial<Contract> = {
    vendor: '',
    type: 'Master Service Agreement',
    value: 0,
    effectiveDate: '',
    expiryDate: '',
    location: '',
    owner: 'James Wilson'
  };

  ngOnInit() {
    this.contractService.contracts$.subscribe(c => this.contracts = c);
    this.contractService.history$.subscribe(h => this.history = h);
    this.vendorService.vendors$.subscribe(v => {
      this.allVendors = v;
      // Map vendor names to the selection list if needed, or just use allVendors for the dropdown
    });
  }

  get filteredContracts() {
    if (this.selectedVendor === 'All Vendors') return this.contracts;
    return this.contracts.filter(c => c.vendor === this.selectedVendor);
  }

  openRenewalModal(contract: Contract) {
    this.selectedContract = contract;
    this.renewalForm.newExpiry = contract.expiryDate;
    this.renewalForm.newValue = contract.value;
    this.showRenewalModal = true;
  }

  closeRenewalModal() {
    this.showRenewalModal = false;
    this.selectedContract = null;
  }

  submitRenewal() {
    if (this.selectedContract) {
      this.contractService.renewContract(
        this.selectedContract.id,
        this.renewalForm.newExpiry,
        this.renewalForm.newValue
      );
      this.closeRenewalModal();
    }
  }

  // Details flow
  openDetailsModal(contract: Contract) {
    this.selectedContract = contract;
    this.showDetailsModal = true;
    this.activeDropdownId = null;
  }

  closeDetailsModal() {
    this.showDetailsModal = false;
    this.selectedContract = null;
  }

  // History flow
  openHistoryModal(contract: Contract) {
    this.selectedContract = contract;
    this.showHistoryModal = true;
    this.activeDropdownId = null;
  }

  closeHistoryModal() {
    this.showHistoryModal = false;
    this.selectedContract = null;
  }

  // Terminate flow
  openTerminateModal(contract: Contract) {
    this.selectedContract = contract;
    this.showTerminateModal = true;
    this.activeDropdownId = null;
  }

  closeTerminateModal() {
    this.showTerminateModal = false;
    this.selectedContract = null;
  }

  confirmTermination() {
    if (this.selectedContract) {
      this.contractService.terminateContract(this.selectedContract.id);
      this.closeTerminateModal();
    }
  }

  // Date Logic for New Contract
  onDateChange() {
    if (this.newContractForm.effectiveDate && this.newContractForm.expiryDate) {
      const start = new Date(this.newContractForm.effectiveDate);
      const end = new Date(this.newContractForm.expiryDate);
      
      if (end > start) {
        const diffTime = Math.abs(end.getTime() - new Date().getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        // Update days remaining and status placeholder
        this.newContractForm.expiryDays = end < new Date() ? 0 : diffDays;
        
        if (end < new Date()) {
          this.newContractForm.status = 'Expired';
        } else if (diffDays <= 30) {
          this.newContractForm.status = 'Expiring Soon';
        } else {
          this.newContractForm.status = 'Active';
        }
      }
    }
  }

  openNewContractModal() {
    this.newContractForm = {
      vendor: '',
      type: 'Master Service Agreement',
      value: 0,
      effectiveDate: '',
      expiryDate: '',
      location: '',
      owner: 'James Wilson'
    };
    this.showNewContractModal = true;
  }

  closeNewContractModal() {
    this.showNewContractModal = false;
  }

  submitNewContract() {
    if (this.newContractForm.vendor && this.newContractForm.value) {
      // Re-run date validation/calc just in case
      this.onDateChange();

      const newContract: Contract = {
        id: 'c' + (this.contracts.length + 1),
        vendor: this.newContractForm.vendor,
        type: this.newContractForm.type || 'Master Service Agreement',
        value: this.newContractForm.value,
        utilized: 0,
        status: this.newContractForm.status as any || 'Active',
        effectiveDate: this.newContractForm.effectiveDate || '',
        expiryDate: this.newContractForm.expiryDate || '',
        expiryDays: this.newContractForm.expiryDays || 365,
        location: this.newContractForm.location || 'N/A',
        owner: this.newContractForm.owner || 'James Wilson'
      };
      this.contractService.addContract(newContract);
      
      // Add vendor to the dropdown list if it's new
      if (!this.vendors.includes(newContract.vendor)) {
        this.vendors = [...this.vendors, newContract.vendor];
      }
      
      this.closeNewContractModal();
    }
  }

  toggleDropdown(contractId: string, event: Event) {
    event.stopPropagation();
    this.activeDropdownId = this.activeDropdownId === contractId ? null : contractId;
  }

  closeDropdown() {
    this.activeDropdownId = null;
  }

  redirectToVendors() {
    this.router.navigate(['/vendors']);
  }
}
