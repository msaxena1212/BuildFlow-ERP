import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-project-wizard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './new-project-wizard.html',
  styleUrls: ['./new-project-wizard.css']
})
export class NewProjectWizard {
  currentStep: number = 1;

  availableMembers = [
    { name: 'Elena Rodriguez', role: 'Lead Structural Eng.', avatar: 'https://images.unsplash.com/photo-1537724326059-2ea20251b9c8?q=80&w=256&auto=format&fit=crop' },
    { name: 'David Miller', role: 'Safety Inspector', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8baYgQ3t4oMOHGPKXfFarqNItNIVVIfHOd53B1k7u3hLEDI1NYxbXwlB4obDhV4NFcKoh8XmJmz--LGSGjwi-6_5tek1bR_4g0zR8sP-PKdjXkmPZWQPWYZ_WxA4kNCyBSgF7hIdr8RLZJs4XGSqYbw-_kXxfo-jZFLySHpFqmRgQ_aH6iI-s-i2NZhe1wBHjRb3yN5siRJVrfnA1aetRFHVhFPPyPAuU9CJDj0_GJxvMIbyHt4DkCEkTrU9YIyXXMafDVs-F6tao' }
  ];

  showAssignDropdown = false;
  newMilestoneName = '';

  projectForm = {
    name: 'ZYNO HQ Modernization',
    type: 'Commercial Renovation',
    completionDate: '',
    address: '',
    team: [
      { name: 'Sarah Jenkins', role: 'Project Lead', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADifZFnzI5-5J6bjvzpwRRz4H7HkafoCfutiB40cPuViYxDi2aOSS2CI19EYSQ5MZZc8va9hfDXtDHP2jx-SvfArNsaZ-G2kSE1gR5Elv6Lh4J8H1XNPStDmpIX9rgeNF6mY6pKq5JY6wVMBuY2kLYn_PumPlqTt9nh9aVeVVL8ftiQUOfOwK79GIRk3SSdfH_nkEzRitswvj8havlIqaiCyQ7_ZN4qfYtoZlQLeh3c9lYdtk4U-rVub4P0s4lgVKhG7q27VTGEMBi' },
      { name: 'Marcus Chen', role: 'Site Supervisor', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTFxkRfStB-dKClUhLwe29S3vdKVYbtIT2NbLt3Mdh9Uk4MZORXBdHRNFsXLpVaiu4rJoD9mD-akO3Ix6DbZuLub2TXm0tfzXEefAInKXfncAd_mq99BSWJZE9nAj-bVCnv0lsueKGwasIF-zHtsHHm2uulR3oyqegZ8gqYvV9ENmTsOC2IP34E_sTlUYIOHWe1USn8AbdCrGrWuvTsQX3xLm9bDwtumBj-VfHx8xbxgArPhJkHqAZPAAhtXVxGYpoF4_w6CqvtiGv' }
    ],
    milestones: [
      { name: 'Site Preparation & Foundations', phase: 'Phase 1', color: 'primary' },
      { name: 'Structural Framing', phase: 'Phase 2', color: 'outline' }
    ],
    documents: [] as any[]
  };

  nextStep() {
    if (this.currentStep < 4) {
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

  simulateUpload() {
    this.projectForm.documents.push({
      name: `document_v${this.projectForm.documents.length + 1}.pdf`,
      size: '2.4 MB'
    });
  }
}
