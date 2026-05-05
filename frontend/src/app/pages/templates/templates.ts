import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectTemplate } from '../../../../../backend/src/models/models';

@Component({
  selector: 'app-project-templates',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './templates.html',
  styleUrls: ['./templates.css']
})
export class ProjectTemplates implements OnInit {
  templates: ProjectTemplate[] = [
    {
      id: 't1',
      name: 'Standard Residential House',
      type: 'Residential',
      version: '1.2',
      milestones: [
        { 
          id: 'm1', name: 'Planning & Design', order: 1, durationDays: 30, color: 'blue', progress: 0,
          subMilestones: [
            { id: 'sm1', name: 'Design Approval', order: 1, durationDays: 15, progress: 0, status: 'Pending', tasks: [
              { id: 'tk1', title: 'Architectural Design', order: 1, durationDays: 10, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Lead Architect' },
              { id: 'tk2', title: 'Structural Engineering', order: 2, durationDays: 5, projectId: '', status: 'Pending', priority: 'Medium', deadline: '', role: 'Structural Engineer' }
            ]}
          ]
        },
        { id: 'm2', name: 'Foundation', order: 2, durationDays: 45, color: 'amber', progress: 0 }
      ]
    },
    {
      id: 't2',
      name: 'Commercial Office Shell',
      type: 'Commercial',
      version: '2.0',
      milestones: []
    }
  ];

  selectedTemplate: ProjectTemplate | null = null;

  ngOnInit(): void {
    this.selectedTemplate = this.templates[0];
  }

  selectTemplate(template: ProjectTemplate) {
    this.selectedTemplate = template;
  }
}
