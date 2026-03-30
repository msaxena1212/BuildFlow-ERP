import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.css']
})
export class CalendarView {
  daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // Simplified calendar for demonstration (October 2023 map)
  days = Array.from({length: 31}, (_, i) => i + 1);
  events = [
    { day: 5, time: '09:00 AM', title: 'Site Inspection' },
    { day: 12, time: '02:00 PM', title: 'Concrete Pouring' },
    { day: 15, time: '10:00 AM', title: 'Client Walkthrough' },
    { day: 22, time: '08:00 AM', title: 'Safety Audit' },
  ];

  getEventsForDay(day: number) {
    return this.events.filter(e => e.day === day);
  }
}
