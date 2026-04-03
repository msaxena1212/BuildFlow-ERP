import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contract-management',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './contracts.html',
  styleUrls: ['./contracts.css']
})
export class ContractManagement implements OnInit {
  team = [
    { name: 'All Members' },
    { name: 'Marcus Thorne' },
    { name: 'Sarah Chen' }
  ];
  selectedMember = 'All Members';
  contracts = [
    {
      id: 'c1',
      vendor: 'Titan Structural Steel, LLC',
      value: 1420000,
      utilized: 68,
      status: 'Active',
      effectiveDate: 'Jan 12, 2024',
      expiryDays: 34,
      location: 'Seattle, WA',
      owner: 'Marcus Thorne'
    },
    {
      id: 'c2',
      vendor: 'VoltStream Electrical',
      value: 850000,
      utilized: 45,
      status: 'Active',
      effectiveDate: 'Feb 05, 2024',
      expiryDays: 120,
      location: 'Bellevue, WA',
      owner: 'Sarah Chen'
    }
  ];

  get filteredContracts() {
    if (this.selectedMember === 'All Members') return this.contracts;
    return this.contracts.filter(c => c.owner === this.selectedMember);
  }

  documents = [
    { name: 'Titan_Structural_MSA_2024.pdf', type: 'Master Agreement', size: '2.4 MB', date: 'Sep 02', icon: 'picture_as_pdf', color: 'text-red-500', bg: 'bg-red-50' },
    { name: 'Change_Order_004_Skyline.docx', type: 'Amendment', size: '45 KB', date: 'Aug 28', icon: 'description', color: 'text-blue-500', bg: 'bg-blue-50' },
    { name: 'OSHA_Compliance_Certificate_2024.pdf', type: 'Compliance', size: '1.1 MB', date: 'Aug 15', icon: 'policy', color: 'text-amber-600', bg: 'bg-amber-50' },
    { name: 'Site_Safety_Plan_v2.zip', type: 'Operational', size: '12.8 MB', date: 'Jul 30', icon: 'folder_shared', color: 'text-slate-500', bg: 'bg-slate-50' }
  ];

  history = [
    { event: 'MSA Renewal Signed', description: 'Legally binding signature collected via DocuSign.', date: 'JAN 12, 2024 • 14:32 PM', active: true },
    { event: 'Project Scope Amendment #03', description: 'Revised structural load requirements for Sky-Deck A.', date: 'OCT 14, 2023', active: false },
    { event: 'Project Scope Amendment #02', description: 'Foundation reinforcement phase completion approval.', date: 'AUG 05, 2023', active: false },
    { event: 'Initial Partnership Onboarding', description: 'Vendor vetting and initial compliance certification.', date: 'MAY 21, 2023', active: false }
  ];

  constructor() {}

  ngOnInit(): void {}
}
