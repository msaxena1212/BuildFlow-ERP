import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-site-note',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-site-note.html',
  styleUrls: ['./add-site-note.css']
})
export class AddSiteNoteModal {
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
