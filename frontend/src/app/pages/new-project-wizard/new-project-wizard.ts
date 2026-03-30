import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-project-wizard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './new-project-wizard.html',
  styleUrls: ['./new-project-wizard.css']
})
export class NewProjectWizard {
}
