import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface RFI {
  id: string;
  title: string;
  status: 'Open' | 'Closed' | 'Draft' | 'Late';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  dueDate: string;
  assignedTo: string;
  projectId: string;
  description: string;
  rfiNumber: string;
}

@Component({
  selector: 'app-rfi-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rfi.html',
  styleUrls: ['./rfi.css']
})
export class RfiManagement implements OnInit {
  rfis: RFI[] = [
    { id: 'r1', rfiNumber: 'RFI-001', title: 'Curtain Wall Bracket Detail', status: 'Open', priority: 'High', dueDate: '2024-05-15', assignedTo: 'Studio Alpha', projectId: 'p1', description: 'Requesting clarification on the bracket orientation for Level 12-15.' },
    { id: 'r2', rfiNumber: 'RFI-002', title: 'Electrical Load Variance', status: 'Late', priority: 'Critical', dueDate: '2024-04-25', assignedTo: 'MEP Solutions', projectId: 'p1', description: 'Variance detected between structural slab capacity and main transformer weight.' },
    { id: 'r3', rfiNumber: 'RFI-003', title: 'Paint Shade Selection', status: 'Closed', priority: 'Low', dueDate: '2024-05-01', assignedTo: 'Interior Design', projectId: 'p2', description: 'Confirming final RAL shade for the lobby feature wall.' }
  ];

  ngOnInit(): void {}

  getStatusClass(status: string): string {
    switch (status) {
      case 'Open': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'Closed': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'Late': return 'text-rose-600 bg-rose-50 border-rose-100';
      case 'Draft': return 'text-slate-400 bg-slate-50 border-slate-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'Critical': return 'text-rose-600 font-black underline';
      case 'High': return 'text-orange-600 font-bold';
      case 'Medium': return 'text-amber-600';
      default: return 'text-slate-500';
    }
  }
}
