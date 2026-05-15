import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css']
})
export class Settings implements OnInit {
  team = [
    { name: 'All Members' },
    { name: 'Marcus Thorne' },
    { name: 'Sarah Chen' }
  ];
  selectedMember = 'All Members';
  activeTab: string = 'general';

  notificationSettings = [
    { id: 'n1', title: 'Task Assignments', description: 'When someone assigns a new construction task to you.', enabled: true },
    { id: 'n2', title: 'Project Updates', description: 'Real-time site updates and daily progress reports.', enabled: true },
    { id: 'n3', title: 'Financial Alerts', description: 'Budget overruns, invoice approvals, and contract changes.', enabled: false },
    { id: 'n4', title: 'Team Activity', description: 'When members join or leave your project workspace.', enabled: true }
  ];

  constructor() {}

  ngOnInit(): void {}

  setTab(tab: string) {
    this.activeTab = tab;
  }
}
