import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contract-management',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './contracts.html',
  styleUrls: ['./contracts.css']
})
export class ContractManagement implements OnInit {
  contracts = [
    {
      id: 'c1',
      vendor: 'Titan Structural Steel, LLC',
      value: 1420000,
      utilized: 68,
      status: 'Active',
      effectiveDate: 'Jan 12, 2024',
      expiryDays: 34,
      location: 'Seattle, WA'
    }
  ];

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
