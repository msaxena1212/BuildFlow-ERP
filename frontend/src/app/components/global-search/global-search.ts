import { Component, HostListener, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-global-search',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './global-search.html'
})
export class GlobalSearch {
  @Output() close = new EventEmitter<void>();

  query = '';

  projects = [
    { name: 'Harbor View Apartments', subtitle: 'Active · Phase 3: Finishing', icon: 'apartment', route: '/project/1' },
    { name: 'Oakwood Heights Renovation', subtitle: 'Active · Phase 1: Demolition', icon: 'construction', route: '/project/2' }
  ];

  tasks = [
    { name: 'Review Concrete Pour Quality', subtitle: 'Harbor View · High Priority', icon: 'priority_high', iconColor: 'text-amber-500', badge: 'Today' },
    { name: 'Approve Electrical Schematics', subtitle: 'Oakwood Heights · Completed', icon: 'check_circle', iconColor: 'text-green-500', badge: '' },
    { name: 'Finalize Flooring Selection', subtitle: 'Harbor View · Pending', icon: 'circle', iconColor: 'text-slate-300', badge: '' }
  ];

  files = [
    { name: 'Blueprint_Level_02_Final.pdf', subtitle: '24 MB · Updated 2h ago by Sarah', iconBg: 'bg-red-50 text-red-500', icon: 'picture_as_pdf' },
    { name: 'Safety_Compliance_Report_Q3.docx', subtitle: '1.2 MB · 1 day ago', iconBg: 'bg-blue-50 text-blue-500', icon: 'description' }
  ];

  recentSearches = ['HVAC Inspection', 'Vendor Invoices', 'Q4 Planning'];

  quickActions = [
    { label: 'New Task', icon: 'add_task', color: 'text-primary bg-primary/10', route: null },
    { label: 'Upload Plan', icon: 'upload_file', color: 'text-secondary bg-secondary/10', route: null },
    { label: 'Add Vendor', icon: 'person_add', color: 'text-blue-600 bg-blue-50', route: '/vendors' },
    { label: 'Print Report', icon: 'print', color: 'text-slate-700 bg-slate-100', route: '/reports' }
  ];

  aiSuggestions = [
    '"Show me the overdue tasks"',
    '"Find the HVAC permit for Harbor View"'
  ];

  @HostListener('keydown.escape')
  onEsc() { this.close.emit(); }
}
