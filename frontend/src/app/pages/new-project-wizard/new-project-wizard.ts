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

  projectForm = {
    name: 'BuildFlow HQ Modernization',
    type: 'Commercial Renovation',
    completionDate: '',
    address: '',
    team: [
      { name: 'Sarah Jenkins', role: 'Project Lead', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADifZFnzI5-5J6bjvzpwRRz4H7HkafoCfutiB40cPuViYxDi2aOSS2CI19EYSQ5MZZc8va9hfDXtDHP2jx-SvfArNsaZ-G2kSE1gR5Elv6Lh4J8H1XNPStDmpIX9rgeNF6mY6pKq5JY6wVMBuY2kLYn_PumPlqTt9nh9aVeVVL8ftiQUOfOwK79GIRk3SSdfH_nkEzRitswvj8havlIqaiCyQ7_ZN4qfYtoZlQLeh3c9lYdtk4U-rVub4P0s4lgVKhG7q27VTGEMBi' },
      { name: 'Marcus Chen', role: 'Site Supervisor', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTFxkRfStB-dKClUhLwe29S3vdKVYbtIT2NbLt3Mdh9Uk4MZORXBdHRNFsXLpVaiu4rJoD9mD-akO3Ix6DbZuLub2TXm0tfzXEefAInKXfncAd_mq99BSWJZE9nAj-bVCnv0lsueKGwasIF-zHtsHHm2uulR3oyqegZ8gqYvV9ENmTsOC2IP34E_sTlUYIOHWe1USn8AbdCrGrWuvTsQX3xLm9bDwtumBj-VfHx8xbxgArPhJkHqAZPAAhtXVxGYpoF4_w6CqvtiGv' }
    ]
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
}
