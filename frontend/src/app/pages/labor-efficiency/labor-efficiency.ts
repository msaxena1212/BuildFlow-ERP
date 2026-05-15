import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnalyticsService, ContractorMetric, LaborStats } from '../../services/analytics.service';

@Component({
  selector: 'app-labor-efficiency',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './labor-efficiency.html',
  styleUrls: ['./labor-efficiency.css']
})
export class LaborEfficiency implements OnInit {
  private analyticsService = inject(AnalyticsService);
  Math = Math;

  contractors: ContractorMetric[] = [];
  stats: LaborStats | null = null;
  
  team = [
    { name: 'All Members' },
    { name: 'Priya Sharma' },
    { name: 'Sanjay Gupta' }
  ];
  selectedMember = 'All Members';

  shiftActivity = [
    { name: 'Priya Sharma', role: 'Foreman', status: 'On Site', statusClass: 'bg-green-100 text-green-700', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop', activities: [{ label: 'Site Supervision: North Wing', left: '10%', width: '60%', type: 'primary' }, { label: 'Safety Audit', left: '75%', width: '15%', type: 'secondary' }] },
    { name: 'Sanjay Gupta', role: 'Specialist', status: 'Active', statusClass: 'bg-blue-100 text-blue-700', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop', activities: [{ label: 'HVAC Installation & Testing', left: '5%', width: '80%', type: 'solid' }] }
  ];

  heatmap = Array(3).fill(0).map(() => Array(7).fill(0).map(() => Math.floor(Math.random() * 5)));

  profitabilityLeaks = [
    { zone: 'North Wing - Level 4', contractor: 'Tata Power Solutions', delta: -4200, trend: 'increasing', resolution: 'Investigate overtime logs' },
    { zone: 'East Plaza - Civil', contractor: 'UltraTech Cement', delta: -1850, trend: 'stable', resolution: 'Material delay incurred holding costs' }
  ];

  ngOnInit(): void {
    this.analyticsService.contractors$.subscribe(c => this.contractors = c);
    this.analyticsService.laborStats$.subscribe(s => this.stats = s);
  }

  get filteredShiftActivity() {
    if (this.selectedMember === 'All Members') return this.shiftActivity;
    return this.shiftActivity.filter(w => w.name === this.selectedMember);
  }

  getEfficiencyColor(efficiency: number): string {
    if (efficiency > 90) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (efficiency > 75) return 'text-amber-600 bg-amber-50 border-amber-100';
    return 'text-rose-600 bg-rose-50 border-rose-100';
  }
}
