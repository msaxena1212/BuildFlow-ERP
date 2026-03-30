import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TimelineItem {
  name: string;
  color: string;
  completion?: number;
  width?: string;
  left: string;
  critical?: boolean;
  isMilestone?: boolean;
  milestoneTitle?: string;
  status?: string;
}

interface TimelinePhase {
  title: string;
  tasks: TimelineItem[];
}

@Component({
  selector: 'app-project-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-timeline.html',
  styleUrls: ['./project-timeline.css']
})
export class ProjectTimeline implements OnInit {
  phases: TimelinePhase[] = [
    {
      title: '01. SITE PREPARATION',
      tasks: [
        { name: 'Land Clearing', color: 'bg-primary', completion: 100, width: '48%', left: '10%' },
        { name: 'Soil Testing', color: 'bg-primary', completion: 100, width: '24%', left: '48%' },
        { name: 'Utility Markout', color: 'bg-primary', completion: 85, width: '32%', left: '64%' }
      ]
    },
    {
      title: '02. FOUNDATION',
      tasks: [
        { name: 'Excavation', color: 'bg-secondary', completion: 40, width: '56%', left: '28%', critical: true },
        { name: 'Concrete Pouring', color: 'bg-secondary', isMilestone: true, left: '44%', milestoneTitle: 'Inspection Milestone' },
        { name: 'Curing Period', color: 'bg-slate-200', completion: 0, width: '40%', left: '48%' }
      ]
    },
    {
      title: '03. STRUCTURAL',
      tasks: [
        { name: 'Steel Framing', color: 'bg-slate-200', status: 'Pending', width: '80%', left: '56%' }
      ]
    }
  ];

  resources = [
    { name: 'James Wilson', role: 'Lead Engineer', utilization: 85, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtGFAFvuDTZowiKMN-_86PVlfoW0s1Y1t2wIesJt_aUWgPzfdeDsBI62JTUgxDWTq1m-Ym9UTDzUgPdykM1NQMrfIACLf6ELlG-TFDXx0bY0i_pEacXyHWhO2hkaeoTxzFixMpxv19qT44QctQNTUZJIcUIdbYcNqhsodpWPPJ7sk33kwcSVJEXH4-Vw1iFudWnbRysUDa4wlBKgguYjpVnU4sisOx6--P1vua992aHyR4-yzZcdvfY2oGUCGKt7PKua6O7aWnX-He' },
    { name: 'Sarah Chen', role: 'Logistics', utilization: 110, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNzfoyCh9T5jGXyS1Z_oulE0qwVUs24lt_XGAkXFQSRqaWNCKxded51i1BCZ7dfp-pGHnok3QVO3dgouAGxmqT3qEbjdB3JWGLULu5QhLo2_g1Ypr5J3YmNDL67WiHAt0xRnjKXt0-Wvr61mKsmkea12mawD58a6haqRp3roTP4ozbi8Nts8AGacuP2xj84hy-YMnppdLzUQWRMoC5W26Nao_ycj91iOCEE5K6VFvm0nsNGnn5Uf459l4Dnx69QzvNITq3QrutFSpc', overAllocated: true }
  ];

  constructor() {}

  ngOnInit(): void {}
}
