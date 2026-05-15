import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnalyticsService } from '../../services/analytics.service';
import { Equipment } from '../../../../../backend/src/models/models';

@Component({
  selector: 'app-equipment-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './equipment.html',
  styleUrls: ['./equipment.css']
})
export class EquipmentManagement implements OnInit {
  private analyticsService = inject(AnalyticsService);
  
  equipment: Equipment[] = [
    { id: 'e1', name: 'Tower Crane - TC01', type: 'Crane', status: 'Active', health: 92, lastService: '2024-03-15', nextService: '2024-06-15', assignedProject: 'Prestige Tech Park', fuelLevel: 85, runtimeHours: 1240 },
    { id: 'e2', name: 'Excavator - EX04', type: 'Earthmover', status: 'Under Maintenance', health: 45, lastService: '2024-01-10', nextService: '2024-05-10', assignedProject: 'Harbor Bridge', runtimeHours: 3500 },
    { id: 'e3', name: 'Concrete Mixer - MX12', type: 'Mixer', status: 'Idle', health: 78, lastService: '2024-04-01', nextService: '2024-07-01', runtimeHours: 850 }
  ];

  ngOnInit(): void {
    // In a real app, fetch from service
  }

  getStatusColor(status: string): string {
    const colors: any = {
      'Active': 'text-emerald-600 bg-emerald-50 border-emerald-100',
      'Under Maintenance': 'text-amber-600 bg-amber-50 border-amber-100',
      'Idle': 'text-slate-600 bg-slate-50 border-slate-100',
      'Damaged': 'text-rose-600 bg-rose-50 border-rose-100'
    };
    return colors[status] || 'text-slate-600 bg-slate-50 border-slate-100';
  }

  getHealthColor(health: number): string {
    if (health > 80) return 'bg-emerald-500';
    if (health > 50) return 'bg-amber-500';
    return 'bg-rose-500';
  }
}
