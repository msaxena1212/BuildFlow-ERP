import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SafetyIncident } from '../../../../../backend/src/models/models';

@Component({
  selector: 'app-safety-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './safety.html',
  styleUrls: ['./safety.css']
})
export class SafetyManagement implements OnInit {
  
  incidents: SafetyIncident[] = [
    { id: 'i1', title: 'Near Miss: Crane Swing', date: '2024-04-12', severity: 'Medium', status: 'Closed', reporter: 'Dave Safety', category: 'Near Miss', description: 'Crane TC01 swing radius overlapped with active loading zone.', correctiveAction: 'Revised swing radius protocols.' },
    { id: 'i2', title: 'Minor Injury: Hand Laceration', date: '2024-04-20', severity: 'Low', status: 'Resolved', reporter: 'Sanjay Gupta', category: 'Injury', description: 'Worker sustained minor cut during rebar handling.', correctiveAction: 'Mandatory glove inspection and training.' }
  ];

  stats = {
    incidentFreeDays: 242,
    safeManHours: 125000,
    ltiRate: 0.12,
    totalAudits: 45
  };

  ngOnInit(): void {}

  getSeverityColor(severity: string): string {
    const colors: any = {
      'Low': 'text-blue-600 bg-blue-50 border-blue-100',
      'Medium': 'text-amber-600 bg-amber-50 border-amber-100',
      'High': 'text-orange-600 bg-orange-50 border-orange-100',
      'Critical': 'text-rose-600 bg-rose-50 border-rose-100'
    };
    return colors[severity] || 'text-slate-600 bg-slate-50 border-slate-100';
  }

  getStatusColor(status: string): string {
    const colors: any = {
      'Reported': 'text-slate-600 bg-slate-50 border-slate-100',
      'Investigating': 'text-amber-600 bg-amber-50 border-amber-100',
      'Resolved': 'text-emerald-600 bg-emerald-50 border-emerald-100',
      'Closed': 'text-blue-600 bg-blue-50 border-blue-100'
    };
    return colors[status] || 'text-slate-600 bg-slate-50 border-slate-100';
  }
}
