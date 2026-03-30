import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quick-actions.html',
  styleUrls: ['./quick-actions.css']
})
export class QuickActions {
  isOpen = false;

  actions = [
    { icon: 'add_a_photo', label: 'Site Photo', color: 'bg-emerald-500' },
    { icon: 'edit_note', label: 'Field Note', color: 'bg-blue-500' },
    { icon: 'engineering', label: 'Safety Log', color: 'bg-amber-500' },
    { icon: 'assessment', label: 'Daily Report', color: 'bg-purple-500' }
  ];

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
