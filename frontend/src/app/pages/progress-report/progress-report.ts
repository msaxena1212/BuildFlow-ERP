import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnalyticsService, ReportVaultItem } from '../../services/analytics.service';

@Component({
  selector: 'app-progress-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './progress-report.html',
  styleUrls: ['./progress-report.css']
})
export class ProgressReport implements OnInit {
  @Input() projectId = 'p1';
  private analyticsService = inject(AnalyticsService);
  private projectService = inject(ProjectService);
  Math = Math;

  project: any;
  reportVault: ReportVaultItem[] = [];
  
  team = [
    { name: 'All Members' },
    { name: 'Sarah Jenkins' },
    { name: 'Mark Thompson' }
  ];
  selectedMember = 'All Members';

  milestones = [
    { date: 'May 12, 2024', title: 'Foundation Pour', status: 'Completed', statusClass: 'bg-indigo-600', icon: 'check', ringClass: 'ring-indigo-100' },
    { date: 'July 28, 2024', title: 'Topping Out', status: 'In Progress (92%)', statusClass: 'bg-amber-500', icon: 'play_arrow', ringClass: 'ring-amber-50', current: true },
    { date: 'Sept 15, 2024', title: 'Façade Sealed', status: 'Scheduled', statusClass: 'bg-slate-200 text-slate-500', icon: 'upcoming', upcoming: true },
    { date: 'Nov 30, 2024', title: 'Handover', status: 'Scheduled', statusClass: 'bg-slate-200 text-slate-500', icon: 'key', upcoming: true }
  ];

  phases = [
    { name: 'FOUNDATION', completion: 100, owner: 'Mark Thompson' },
    { name: 'CORE STRUCTURE', completion: 88, owner: 'Sarah Jenkins' },
    { name: 'MEP SYSTEMS', completion: 42, owner: 'Mark Thompson' }
  ];

  achievements = [
    { num: '01', title: 'North Wing Topping', desc: 'Final concrete pour for level 24 completed 3 days ahead of schedule.', owner: 'Sarah Jenkins' },
    { num: '02', title: 'HVAC Main Installation', desc: 'Main risers installed through the central core up to level 18.', owner: 'Mark Thompson' },
    { num: '03', title: 'Safety Milestone', desc: '200 consecutive days without a lost-time incident recorded.', owner: 'Sarah Jenkins' },
    { num: '04', title: 'Permit Approval', desc: 'Façade installation permits for Phase 05 granted by city council.', owner: 'Mark Thompson' }
  ];

  blockers = [
    { icon: 'schedule', title: 'Supply Chain Delay', desc: 'Glass panel shipment from Germany delayed by 1 week due to port congestion.', mitigation: 'Mitigation: Rerouting via air freight' },
    { icon: 'thunderstorm', title: 'Weather Impact', desc: 'Exterior landscaping on East Plaza paused due to heavy rainfall forecasted for Tues-Wed.', mitigation: 'Impact: Low (Buffer active)' }
  ];

  crossModuleData = {
    totalTasksCompleted: 145,
    totalTasks: 180,
    materialsConsumed: 8200,
    materialsTotal: 10500,
    capitalBurned: 1250000,
    budgetAllocated: 1500000
  };

  trendForecasting = {
    scheduleVariance: '+4 Days Ahead',
    costVariance: '$12,500 Under Budget',
    projectedCompletion: 'Nov 18, 2024',
    riskLevel: 'Low'
  };

  ngOnInit(): void {
    this.analyticsService.reportVault$.subscribe(v => this.reportVault = v);
    this.projectService.getProjectById(this.projectId).subscribe(p => this.project = p);
  }

  get filteredPhases() {
    if (this.selectedMember === 'All Members') return this.phases;
    return this.phases.filter(p => p.owner === this.selectedMember);
  }

  get filteredAchievements() {
    if (this.selectedMember === 'All Members') return this.achievements;
    return this.achievements.filter(a => a.owner === this.selectedMember);
  }

  getReportIcon(type: string): string {
    const icons: any = {
      'Safety': 'security',
      'Financial': 'payments',
      'Technical': 'architecture',
      'Milestone': 'event_available',
      'Quality': 'verified'
    };
    return icons[type] || 'description';
  }

  getReportColor(type: string): string {
    const colors: any = {
      'Safety': 'text-amber-600 bg-amber-50',
      'Financial': 'text-emerald-600 bg-emerald-50',
      'Technical': 'text-indigo-600 bg-indigo-50',
      'Milestone': 'text-purple-600 bg-purple-50',
      'Quality': 'text-blue-600 bg-blue-50'
    };
    return colors[type] || 'text-slate-600 bg-slate-50';
  }

  generateNewReport() {
    this.analyticsService.generateReport('New Weekly Progress Report', 'Technical').subscribe();
  }
}
