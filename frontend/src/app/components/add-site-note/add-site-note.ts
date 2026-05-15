import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-site-note',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-site-note.html',
  styleUrls: ['./add-site-note.css']
})
export class AddSiteNoteModal {
  @Output() close = new EventEmitter<void>();

  projects = [
    'Oakwood Estate • Sector 7',
    'Skyline Tower • Phase II',
    'Metro Hub • Terminal 4',
    'Harbor Heights • West Wing'
  ];
  selectedProject = 'Oakwood Estate • Sector 7';

  statuses = ['In Progress', 'On Hold', 'Completed', 'Delayed', 'Under Review'];
  selectedStatus = 'In Progress';

  closeModal() {
    this.close.emit();
  }
}
