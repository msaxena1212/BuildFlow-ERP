import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Material {
  name: string;
  sku: string;
  category: string;
  icon: string;
  bg: string;
  text: string;
  border?: string;
  stock: {
    current: number;
    total: number;
    percent: number;
  };
  cost: string;
  supplier: string;
  status: 'Optimal' | 'Adequate' | 'Critical';
}

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private initialMaterials: Material[] = [
    { name: 'Concrete Mix Grade-A', sku: 'CON-442-B', category: 'Concrete', icon: 'texture', bg: 'bg-slate-100', text: 'text-slate-400', stock: { current: 420, total: 500, percent: 84 }, cost: '₹14.50', supplier: 'Titan Aggregates Ltd.', status: 'Optimal' },
    { name: 'Rebar Steel 12mm', sku: 'STL-12-REB', category: 'Steel', icon: 'grid_4x4', bg: 'bg-amber-50', text: 'text-secondary-container', border: 'border-amber-100', stock: { current: 45, total: 300, percent: 15 }, cost: '₹228.00', supplier: 'Foundry Steel Corp.', status: 'Critical' },
    { name: 'Copper Wiring 2.5mm', sku: 'ELEC-WR-25', category: 'Electrical', icon: 'bolt', bg: 'bg-slate-100', text: 'text-slate-400', stock: { current: 1200, total: 2000, percent: 60 }, cost: '₹1.20', supplier: 'VoltStream Supplies', status: 'Adequate' },
    { name: 'Ceramic Floor Tiles', sku: 'FIN-CER-60', category: 'Finishing', icon: 'square', bg: 'bg-slate-100', text: 'text-slate-400', stock: { current: 850, total: 1000, percent: 85 }, cost: '₹45.00', supplier: 'Modern Surfaces Int.', status: 'Optimal' },
    { name: 'Waterproof Sealant', sku: 'CHM-SEA-L', category: 'Chemicals', icon: 'water_drop', bg: 'bg-red-50', border: 'border-red-100', text: 'text-error', stock: { current: 12, total: 250, percent: 4.8 }, cost: '₹82.00', supplier: 'BuildSafe Chemicals', status: 'Critical' },
    { name: 'Structural Lumber 2x4', sku: 'LUM-24-12', category: 'Lumber', icon: 'forest', bg: 'bg-slate-100', text: 'text-slate-400', stock: { current: 150, total: 800, percent: 18.75 }, cost: '₹412.00', supplier: 'Westside Timber Co.', status: 'Critical' }
  ];

  private materialsSubject = new BehaviorSubject<Material[]>(this.initialMaterials);
  materials$ = this.materialsSubject.asObservable();

  getMaterials() {
    return this.materialsSubject.value;
  }

  addMaterial(material: Material) {
    const current = this.materialsSubject.value;
    this.materialsSubject.next([...current, material]);
  }

  updateMaterial(sku: string, updated: Partial<Material>) {
    const current = this.materialsSubject.value;
    const index = current.findIndex(m => m.sku === sku);
    if (index !== -1) {
      current[index] = { ...current[index], ...updated } as Material;
      this.materialsSubject.next([...current]);
    }
  }

  deleteMaterial(sku: string) {
    const current = this.materialsSubject.value;
    this.materialsSubject.next(current.filter(m => m.sku !== sku));
  }

  getMaterialBySku(sku: string) {
    return this.materialsSubject.value.find(m => m.sku === sku);
  }
}
