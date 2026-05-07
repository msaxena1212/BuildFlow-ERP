import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TemplateService } from '../../services/template.service';
import { ProjectTemplate } from '../../../../../backend/src/models/models';

@Component({
  selector: 'app-new-project-wizard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './new-project-wizard.html',
  styleUrls: ['./new-project-wizard.css']
})
export class NewProjectWizard {
  private templateService = inject(TemplateService);
  
  currentStep: number = 1;
  creationMode: 'Manual' | 'Template' = 'Manual';
  selectedTemplateId: string | null = null;
  startDate: string = new Date().toISOString().split('T')[0];
  excludedIds = new Set<string>();
  uploadedFiles: any[] = [];

  get selectedTemplate(): ProjectTemplate | undefined {
    return this.templates.find(t => t.id === this.selectedTemplateId);
  }

  availableMembers = [
    { name: 'Ananya Iyer', role: 'Lead Structural Eng.', trade: 'Civil', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop' },
    { name: 'Karan Malhotra', role: 'Safety Inspector', trade: 'Safety', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=crop' },
    { name: 'Dr. Sameer Rao', role: 'Process Engineer', trade: 'Industrial', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop' },
    { name: 'Vikram Sethi', role: 'Mechanical Lead', trade: 'Mechanical', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop' },
    { name: 'Elena Gilbert', role: 'Electrical Specialist', trade: 'Electrical', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop' },
    { name: 'Rohan Deshmukh', role: 'Senior Surveyor', trade: 'Civil', avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=256&auto=format&fit=crop' },
    { name: 'Meera Nair', role: 'Infrastructure Lead', trade: 'Civil', avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=256&auto=format&fit=crop' },
    { name: 'Abhishek Vats', role: 'Contract Specialist', trade: 'Management', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=256&auto=format&fit=crop' },
    { name: 'Sarah Chen', role: 'Compliance Officer', trade: 'Compliance', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&auto=format&fit=crop' },
    { name: 'Priya Verma', role: 'Interior Designer', trade: 'Renovation', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop' },
    { name: 'Sunil Gupta', role: 'Plumber', trade: 'Renovation', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop' },
    { name: 'Anthony G.', role: 'Carpenter', trade: 'Renovation', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=256&auto=format&fit=crop' },
    { name: 'Hussain D.', role: 'Painter', trade: 'Renovation', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=256&auto=format&fit=crop' }
  ];

  showAssignDropdown = false;
  newMilestoneName = '';

  projectTypes = ['Commercial', 'Residential', 'Industrial', 'Infrastructure', 'Institutional', 'Renovation'];
  templates: ProjectTemplate[] = [];

  roleMapping: { [role: string]: string } = {};
  templateRoles: string[] = [];

  projectForm = {
    name: 'Prestige Tech Park Phase 2',
    type: 'Infrastructure',
    budget: 0,
    contingency: 5,
    completionDate: '',
    address: 'Varthur Hobli, Bangalore, KA',
    team: [
      { name: 'Priya Sharma', role: 'Project Lead', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop' },
      { name: 'Sanjay Gupta', role: 'Site Supervisor', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop' }
    ],
    milestones: [
      { name: 'Site Preparation & Foundations', phase: 'Phase 1', color: 'primary' },
      { name: 'Structural Framing', phase: 'Phase 2', color: 'outline' }
    ],
    documents: [] as any[],
    boq: [
      { item: 'Cement Grade-A', quantity: 500, unit: 'Bags' },
      { item: 'Reinforcement Steel', quantity: 15, unit: 'MT' }
    ]
  };

  get filteredMembers() {
    if (this.projectForm.type === 'Renovation') {
      return this.availableMembers.filter(m => m.trade === 'Renovation' || m.trade === 'Management' || m.trade === 'Electrical');
    }
    if (this.projectForm.type === 'Industrial') {
      return this.availableMembers.filter(m => m.trade === 'Industrial' || m.trade === 'Mechanical' || m.trade === 'Electrical' || m.trade === 'Management');
    }
    return this.availableMembers;
  }

  nextStep() {
    if (this.currentStep < 5) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  setStep(step: number) {
    this.currentStep = step;
  }

  addMember(member: any) {
    if (!this.projectForm.team.find(m => m.name === member.name)) {
      this.projectForm.team.push(member);
    }
    this.showAssignDropdown = false;
  }

  addMilestone() {
    if (this.newMilestoneName.trim()) {
      this.projectForm.milestones.push({
        name: this.newMilestoneName.trim(),
        phase: `Phase ${this.projectForm.milestones.length + 1}`,
        color: 'secondary'
      });
      this.newMilestoneName = '';
    }
  }

  ngOnInit() {
    this.templateService.getTemplates().subscribe(t => {
      this.templates = t;
    });
  }

  simulateUpload() {
    this.projectForm.documents.push({
      name: `document_v${this.projectForm.documents.length + 1}.pdf`,
      size: '2.4 MB'
    });
  }

  onTemplateSelect(templateId: string) {
    this.selectedTemplateId = templateId;
    const template = this.templates.find(t => t.id === templateId);
    if (template) {
      this.projectForm.type = template.type as any;
      this.extractRoles(template);
    }
  }

  extractRoles(template: ProjectTemplate) {
    const roles = new Set<string>();
    template.milestones.forEach(m => {
      m.subMilestones?.forEach(sm => {
        sm.tasks?.forEach(t => {
          if (t.role) roles.add(t.role);
        });
      });
    });
    this.templateRoles = Array.from(roles);
  }

  initializeFromTemplate() {
    const template = this.templates.find(t => t.id === this.selectedTemplateId);
    if (template) {
      const project = this.templateService.generateProjectFromTemplate(
        template, 
        this.startDate, 
        this.projectForm.name, 
        this.roleMapping,
        Array.from(this.excludedIds)
      );
      console.log('Project Initialized:', project);
      alert(`Project "${project.name}" initialized with ${project.milestones.length} milestones.`);
    }
  }

  toggleExclusion(id: string) {
    if (this.excludedIds.has(id)) {
      this.excludedIds.delete(id);
    } else {
      this.excludedIds.add(id);
    }
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    for (let file of files) {
      this.uploadedFiles.push({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        date: new Date().toLocaleDateString()
      });
    }
  }
}
