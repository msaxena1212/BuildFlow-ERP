import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-report.html',
  styleUrls: ['./progress-report.css']
})
export class ProgressReport implements OnInit {
  milestones = [
    { date: 'May 12, 2024', title: 'Foundation Pour', status: 'Completed', statusClass: 'bg-primary', icon: 'check', ringClass: 'ring-primary/10' },
    { date: 'July 28, 2024', title: 'Topping Out', status: 'In Progress (92%)', statusClass: 'bg-secondary', icon: 'play_arrow', ringClass: 'ring-secondary/10', current: true },
    { date: 'Sept 15, 2024', title: 'Façade Sealed', status: 'Scheduled', statusClass: 'bg-slate-200 text-slate-500', icon: 'upcoming', upcoming: true },
    { date: 'Nov 30, 2024', title: 'Handover', status: 'Scheduled', statusClass: 'bg-slate-200 text-slate-500', icon: 'key', upcoming: true }
  ];

  phases = [
    { name: 'FOUNDATION', completion: 100 },
    { name: 'CORE STRUCTURE', completion: 88 },
    { name: 'MEP SYSTEMS', completion: 42 }
  ];

  achievements = [
    { num: '01', title: 'North Wing Topping', desc: 'Final concrete pour for level 24 completed 3 days ahead of schedule.' },
    { num: '02', title: 'HVAC Main Installation', desc: 'Main risers installed through the central core up to level 18.' },
    { num: '03', title: 'Safety Milestone', desc: '200 consecutive days without a lost-time incident recorded.' },
    { num: '04', title: 'Permit Approval', desc: 'Façade installation permits for Phase 05 granted by city council.' }
  ];

  blockers = [
    { icon: 'schedule', title: 'Supply Chain Delay', desc: 'Glass panel shipment from Germany delayed by 1 week due to port congestion.', mitigation: 'Mitigation: Rerouting via air freight' },
    { icon: 'thunderstorm', title: 'Weather Impact', desc: 'Exterior landscaping on East Plaza paused due to heavy rainfall forecasted for Tues-Wed.', mitigation: 'Impact: Low (Buffer active)' }
  ];

  constructor() {}
  ngOnInit(): void {}
}
