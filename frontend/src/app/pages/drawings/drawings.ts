import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Drawing {
  id: string;
  number: string;
  title: string;
  discipline: 'Architectural' | 'Structural' | 'MEP' | 'Civil';
  version: number;
  status: 'Approved' | 'In Review' | 'Superseded';
  uploadDate: string;
  author: string;
  fileSize: string;
}

@Component({
  selector: 'app-drawing-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './drawings.html',
  styleUrls: ['./drawings.css']
})
export class DrawingManagement implements OnInit {
  drawings: Drawing[] = [
    { id: 'd1', number: 'A-101', title: 'Ground Floor Plan', discipline: 'Architectural', version: 4, status: 'Approved', uploadDate: '2024-04-01', author: 'Studio Alpha', fileSize: '12.4 MB' },
    { id: 'd2', number: 'S-204', title: 'Column Reinforcement Detail', discipline: 'Structural', version: 2, status: 'In Review', uploadDate: '2024-04-12', author: 'Vertex Engineering', fileSize: '8.1 MB' },
    { id: 'd3', number: 'M-105', title: 'HVAC Layout - Level 5', discipline: 'MEP', version: 1, status: 'Approved', uploadDate: '2024-03-25', author: 'MEP Solutions', fileSize: '15.2 MB' },
    { id: 'd4', number: 'A-101', title: 'Ground Floor Plan (Old)', discipline: 'Architectural', version: 3, status: 'Superseded', uploadDate: '2024-02-15', author: 'Studio Alpha', fileSize: '11.8 MB' }
  ];

  ngOnInit(): void {}

  getStatusClass(status: string): string {
    switch (status) {
      case 'Approved': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'In Review': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'Superseded': return 'text-slate-400 bg-slate-50 border-slate-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  }

  getDisciplineIcon(discipline: string): string {
    switch (discipline) {
      case 'Architectural': return 'architecture';
      case 'Structural': return 'foundation';
      case 'MEP': return 'electrical_services';
      case 'Civil': return 'edit_road';
      default: return 'description';
    }
  }
}
