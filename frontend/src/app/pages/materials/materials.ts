import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-materials-management',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './materials.html'
})
export class MaterialsManagement implements OnInit {
  materials = [
    { name: 'Concrete Mix Grade-A', sku: 'CON-442-B', category: 'Concrete', icon: 'texture', bg: 'bg-slate-100', text: 'text-slate-400', stock: { current: 420, total: 500, percent: 84 }, cost: '$14.50', supplier: 'Titan Aggregates Ltd.', status: 'Optimal' },
    { name: 'Rebar Steel 12mm', sku: 'STL-12-REB', category: 'Steel', icon: 'grid_4x4', bg: 'bg-amber-50', text: 'text-secondary-container', border: 'border-amber-100', stock: { current: 45, total: 300, percent: 15 }, cost: '$228.00', supplier: 'Foundry Steel Corp.', status: 'Critical' },
    { name: 'Copper Wiring 2.5mm', sku: 'ELEC-WR-25', category: 'Electrical', icon: 'bolt', bg: 'bg-slate-100', text: 'text-slate-400', stock: { current: 1200, total: 2000, percent: 60 }, cost: '$1.20', supplier: 'VoltStream Supplies', status: 'Adequate' },
    { name: 'Ceramic Floor Tiles', sku: 'FIN-CER-60', category: 'Finishing', icon: 'square', bg: 'bg-slate-100', text: 'text-slate-400', stock: { current: 850, total: 1000, percent: 85 }, cost: '$45.00', supplier: 'Modern Surfaces Int.', status: 'Optimal' },
    { name: 'Waterproof Sealant', sku: 'CHM-SEA-L', category: 'Chemicals', icon: 'water_drop', bg: 'bg-red-50', border: 'border-red-100', text: 'text-error', stock: { current: 12, total: 250, percent: 4.8 }, cost: '$82.00', supplier: 'BuildSafe Chemicals', status: 'Critical' }
  ];

  deliveries = [
    { time: '09:00', period: 'AM', item: 'Lumber Pine Planks (400 Units)', location: 'Site A - Skyline Towers', status: 'In Transit', statusColor: 'bg-blue-50 text-blue-600' },
    { time: '14:30', period: 'PM', item: 'HVAC Ducting Components', location: 'Site C - Riverside Mall', status: 'Confirmed', statusColor: 'bg-surface-container text-outline' }
  ];

  constructor() {}

  ngOnInit() {}
}
