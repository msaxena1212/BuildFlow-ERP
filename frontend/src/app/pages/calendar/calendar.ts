import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.css']
})
export class CalendarView {
  daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // Simplified calendar for demonstration (October 2023 map)
  days = Array.from({length: 31}, (_, i) => i + 1);
  
  team = [
    { name: 'All Members', avatar: '' },
    { name: 'Marcus Thorne', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4CZeaYB7fJXEtjKFkVujKuYnqc32Vz4RirffP91HCE-igMSlf58IRegCTvDiO-n6vn8GSii3hmQCT9wn7MZCO7LYC87Mix-nc0uOD0_dHzMdyYmVbfUFLAGo6sFmnu6r5xb66CI_FUi6YCEqOcUKyBiL2helT79G1OiGR1inPdCcO87KgZ9ygFt4Q9GbiYVVfSvdkQ-o38syvfzzZJtPCCht9KpCLNPH4NAfNB_nmM9iLmnFOQ8z1D6W3w9caWMwVul6E7XtJszA-' },
    { name: 'Sarah Chen', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1RmRziofMuKPCOGKlk1YnapBSbLaEfo01m3q_4lcO8xWYBy9DKhbId94OYnRLdh0YKtETgTw4OBQS76xCwa3GI8lqHXQEh4qQQyAWfHCmwY_elYYp6wMji5eXHwrqZcUD4iEoGkyYIRyKMxXR2lEAw34APWS_Omi6iwEz2PTn97envSoQbpymAyVXp1E00dhY0AgRi3UNTNPZdT8tKT6Oe6M4gpGCg1r2U1-D3cACjbZQSMZS2qrf08cBFkc50Xkbgk1epsoox4yv' }
  ];
  selectedMember = 'All Members';

  events = [
    { day: 5, time: '09:00 AM', title: 'Site Inspection', assignee: 'Marcus Thorne' },
    { day: 12, time: '02:00 PM', title: 'Concrete Pouring', assignee: 'Sarah Chen' },
    { day: 15, time: '10:00 AM', title: 'Client Walkthrough', assignee: 'Marcus Thorne' },
    { day: 22, time: '08:00 AM', title: 'Safety Audit', assignee: 'Sarah Chen' },
  ];

  getEventsForDay(day: number) {
    return this.events.filter(e => 
      e.day === day && 
      (this.selectedMember === 'All Members' || e.assignee === this.selectedMember)
    );
  }
}
