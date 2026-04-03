import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quick-actions.html',
  styleUrls: ['./quick-actions.css']
})
export class QuickActions {
  isOpen = false;
  projectName = 'Skyline Plaza - Phase 1'; // Global Context

  // Modal Visibility
  showPhotoModal = false;
  showNoteModal = false;
  showSafetyModal = false;
  showReportModal = false;

  // Form States
  noteForm = { content: '', category: 'General' };
  safetyForm = { severity: 'Minor', desc: '', location: 'Site A' };
  reportForm = { progress: 75, blockers: '' };

  actions = [
    { icon: 'add_a_photo', label: 'Site Photo', color: 'bg-emerald-500', id: 'photo' },
    { icon: 'edit_note', label: 'Field Note', color: 'bg-blue-500', id: 'note' },
    { icon: 'engineering', label: 'Safety Log', color: 'bg-amber-500', id: 'safety' },
    { icon: 'assessment', label: 'Daily Report', color: 'bg-purple-500', id: 'report' }
  ];

  toggle() {
    this.isOpen = !this.isOpen;
  }

  openAction(id: string) {
    this.isOpen = false;
    if (id === 'photo') this.showPhotoModal = true;
    if (id === 'note') this.showNoteModal = true;
    if (id === 'safety') this.showSafetyModal = true;
    if (id === 'report') this.showReportModal = true;
  }

  submitAction(type: string) {
    alert(`${type} synchronized to global project feed.`);
    this.closeAllModals();
  }

  closeAllModals() {
    this.showPhotoModal = false;
    this.showNoteModal = false;
    this.showSafetyModal = false;
    this.showReportModal = false;
  }
}
