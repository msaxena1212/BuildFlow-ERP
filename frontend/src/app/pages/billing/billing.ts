import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-billing-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './billing.html',
  styleUrls: ['./billing.css']
})
export class BillingDetail implements OnInit {
  team = [
    { name: 'All Members' },
    { name: 'Marcus Thorne' },
    { name: 'Sarah Chen' }
  ];
  selectedMember = 'All Members';
  invoices = [
    { date: 'Oct 12, 2023', id: 'BF-INV-2023-10-001', amount: 1250, status: 'Paid', bg: 'bg-emerald-50', color: 'text-emerald-700', dot: 'bg-emerald-500', processor: 'Marcus Thorne' },
    { date: 'Sep 12, 2023', id: 'BF-INV-2023-09-082', amount: 1250, status: 'Paid', bg: 'bg-emerald-50', color: 'text-emerald-700', dot: 'bg-emerald-500', processor: 'Marcus Thorne' },
    { date: 'Aug 12, 2023', id: 'BF-INV-2023-08-041', amount: 1250, status: 'Paid', bg: 'bg-emerald-50', color: 'text-emerald-700', dot: 'bg-emerald-500', processor: 'Sarah Chen' },
    { date: 'Jul 12, 2023', id: 'BF-INV-2023-07-003', amount: 1100, status: 'Paid', bg: 'bg-emerald-50', color: 'text-emerald-700', dot: 'bg-emerald-500', processor: 'Sarah Chen' }
  ];

  get filteredInvoices() {
    if (this.selectedMember === 'All Members') return this.invoices;
    return this.invoices.filter(i => i.processor === this.selectedMember);
  }

  metrics = [
    { label: 'Active Projects', current: 42, total: 50, percent: 84, color: 'bg-primary' },
    { label: 'Cloud Storage', current: 1.2, total: 2.0, percent: 60, color: 'bg-secondary', unit: 'TB' },
    { label: 'Team Seats', current: 18, total: 25, percent: 72, color: 'bg-primary-container' }
  ];

  constructor() {}

  ngOnInit(): void {}
}
