import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { VendorService, Vendor } from '../../services/vendor.service';

@Component({
  selector: 'app-vendors',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './vendors.html'
})
export class VendorManagement implements OnInit {
  private vendorService = inject(VendorService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  team = [
    { name: 'All Members' },
    { name: 'Marcus Thorne' },
    { name: 'Sarah Chen' }
  ];
  selectedMember = 'All Members';

  // Modal States
  showAddModal = false;
  showInvoiceModal = false;
  showAuditModal = false;
  showBillingModal = false;

  // View States
  viewingVendorId: string | null = null;
  selectedVendor: Vendor | undefined = undefined;

  // Form States
  newVendor: any = this.getDefaultVendor();

  invoiceForm: any = {
    number: '',
    amount: '',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
  };

  auditForm: any = {
    quality: 5,
    timeliness: 5,
    safety: 5,
    observations: ''
  };

  vendors: Vendor[] = [];
  activities: any[] = [];

  ngOnInit() {
    this.vendorService.vendors$.subscribe(v => {
      this.vendors = v;
      this.updateSelectedVendor();
    });

    this.route.paramMap.subscribe(params => {
      this.viewingVendorId = params.get('id');
      this.updateSelectedVendor();
    });

    this.activities = [
      { icon: 'receipt_long', iconColor: 'text-secondary', title: 'New Invoice Uploaded', desc: 'SolidRock Concrete submitted invoice #SR-9012 for ₹12,500.00', time: '2 hours ago' },
      { icon: 'task_alt', iconColor: 'text-primary', title: 'Certification Renewed', desc: 'VoltStream Electrical updated their Liability Insurance documentation.', time: 'Yesterday' },
      { icon: 'domain_add', iconColor: 'text-on-tertiary-fixed-variant', title: 'New Assignment', desc: "Elite Finishes Co. assigned to 'Westside Loft' Interior painting phase.", time: '3 days ago' }
    ];
  }

  updateSelectedVendor() {
    if (this.viewingVendorId) {
      this.selectedVendor = this.vendorService.getVendorById(this.viewingVendorId);
    } else {
      this.selectedVendor = undefined;
    }
  }

  get filteredVendors() {
    if (this.selectedMember === 'All Members') return this.vendors;
    return this.vendors.filter(v => v.assignee === this.selectedMember);
  }

  getDefaultVendor() {
    return {
      name: '',
      type: 'Subcontractor',
      email: '',
      phone: '',
      spoc: { name: '', role: '', phone: '', email: '' },
      kyc: { gst: '', pan: '' },
      address: { street: '', city: '', pincode: '' },
      budget: '',
      services: '',
      projects: [],
      status: 'Onboarding',
      icon: 'business',
      assignee: 'Marcus Thorne'
    };
  }

  openAddModal() {
    this.newVendor = this.getDefaultVendor();
    this.showAddModal = true;
  }

  addVendor() {
    const freshVendor: Vendor = {
      ...this.newVendor,
      id: Date.now(), // Real ID in a real app
      balance: '₹0.00',
      statusColor: 'bg-amber-100 text-amber-700',
      services: this.newVendor.services.split(','),
      tasks: [],
      audits: [],
      invoices: []
    };
    this.vendorService.addVendor(freshVendor);
    this.showAddModal = false;
  }

  approveVendor() {
    if (this.selectedVendor) {
      this.vendorService.updateVendor(this.selectedVendor.id, { status: 'Approved', statusColor: 'bg-green-100 text-green-700' });
    }
  }

  closeDetail() {
    this.router.navigate(['/vendors']);
  }

  // --- Operational Actions ---

  openSubmission() {
    this.invoiceForm.number = 'INV-' + Math.floor(Math.random() * 9000 + 1000);
    this.showInvoiceModal = true;
  }

  submitInvoice() {
    if (this.selectedVendor) {
      const newInv = {
        number: this.invoiceForm.number,
        amount: this.invoiceForm.amount,
        date: this.invoiceForm.date,
        status: 'Pending'
      };
      this.selectedVendor.invoices = [newInv, ...(this.selectedVendor.invoices || [])];
      this.showInvoiceModal = false;
      alert(`Invoice ${newInv.number} submitted for review.`);
      this.invoiceForm.amount = '';
    }
  }

  openAudit() {
    this.showAuditModal = true;
  }

  submitAudit() {
    if (this.selectedVendor) {
      alert(`Audit recorded for ${this.selectedVendor.name}. Overall Score: ${Math.round((this.auditForm.quality + this.auditForm.timeliness + this.auditForm.safety) / 15 * 100)}%`);
      this.showAuditModal = false;
    }
  }

  openBilling() {
    this.showBillingModal = true;
  }

  createInvoice() {
    alert('Invoice creation workflow started for ' + this.selectedVendor?.name);
  }
}
