import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-billing-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './billing.html',
  styleUrls: ['./billing.css']
})
export class BillingDetail implements OnInit {
  invoices = [
    { date: 'Oct 12, 2023', id: 'BF-INV-2023-10-001', amount: 1250, status: 'Paid', bg: 'bg-emerald-50', color: 'text-emerald-700', dot: 'bg-emerald-500' },
    { date: 'Sep 12, 2023', id: 'BF-INV-2023-09-082', amount: 1250, status: 'Paid', bg: 'bg-emerald-50', color: 'text-emerald-700', dot: 'bg-emerald-500' },
    { date: 'Aug 12, 2023', id: 'BF-INV-2023-08-041', amount: 1250, status: 'Paid', bg: 'bg-emerald-50', color: 'text-emerald-700', dot: 'bg-emerald-500' },
    { date: 'Jul 12, 2023', id: 'BF-INV-2023-07-003', amount: 1100, status: 'Paid', bg: 'bg-emerald-50', color: 'text-emerald-700', dot: 'bg-emerald-500' }
  ];

  metrics = [
    { label: 'Active Projects', current: 42, total: 50, percent: 84, color: 'bg-primary' },
    { label: 'Cloud Storage', current: 1.2, total: 2.0, percent: 60, color: 'bg-secondary', unit: 'TB' },
    { label: 'Team Seats', current: 18, total: 25, percent: 72, color: 'bg-primary-container' }
  ];

  constructor() {}

  ngOnInit(): void {}
}
