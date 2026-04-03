import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Vendor {
  id: number | string;
  name: string;
  type: string;
  email: string;
  phone: string;
  spoc: {
    name: string;
    role: string;
    phone: string;
    email: string;
  };
  kyc: {
    gst: string;
    pan: string;
  };
  address: {
    street: string;
    city: string;
    pincode: string;
  };
  projects: string[];
  balance: string;
  budget: string;
  status: 'Paid' | 'Pending' | 'Due' | 'Approved' | 'Onboarding';
  statusColor: string;
  icon: string;
  assignee: string;
  services: string[];
  contract?: {
    uploaded: boolean;
    fileName?: string;
    expiryDate?: string;
  };
  tasks: { title: string; status: string; date: string }[];
  audits: { date: string; score: number; notes: string }[];
  invoices: { number: string; amount: string; status: string; date: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private initialVendors: Vendor[] = [
    { 
      id: 1, name: 'VoltStream Electrical', type: 'Primary Subcontractor', email: 'contact@voltstream.com', phone: '+1 (555) 012-3456',
      spoc: { name: 'Kevin Drake', role: 'Ops Lead', phone: '+1 555-1029', email: 'k.drake@voltstream.com' },
      kyc: { gst: '22AAAAA0000A1Z5', pan: 'ABCDE1234F' },
      address: { street: '12-A Newton St', city: 'Metropolis', pincode: '560001' },
      projects: ['Skyline Plaza', 'Harbor Heights'], balance: '₹0.00', budget: '₹5,000,000', status: 'Paid', 
      statusColor: 'bg-green-100 text-green-700', icon: 'electric_bolt', assignee: 'Marcus Thorne',
      services: ['Electrical Wiring', 'Substation Setup', 'HVAC Controls'],
      tasks: [
        { title: 'Wiring Phase 1 - 4th Floor', status: 'Completed', date: 'May 10, 2024' },
        { title: 'External Transformer Installation', status: 'In Progress', date: 'May 20, 2024' }
      ],
      audits: [{ date: 'May 01, 2024', score: 98, notes: 'Excellent compliance' }],
      invoices: [{ number: 'INV-1029', amount: '₹125,000.00', status: 'Paid', date: 'May 05, 2024' }]
    },
    { 
      id: 2, name: 'SolidRock Concrete', type: 'Material Supplier', email: 'billing@solidrock.io', phone: '+1 (555) 987-6543',
      spoc: { name: 'Sarah Miller', role: 'Sales Head', phone: '+1 555-9087', email: 's.miller@solidrock.io' },
      kyc: { gst: '29BBBBB1111B2Z6', pan: 'FGHIJ5678K' },
      address: { street: 'Industrial Area Phase 2', city: 'Metropolis', pincode: '560048' },
      projects: ['Metro Hub'], balance: '₹24,500.00', budget: '₹2,500,000', status: 'Pending', 
      statusColor: 'bg-secondary-container/20 text-secondary', icon: 'foundation', assignee: 'Sarah Chen',
      services: ['Ready-mix Concrete', 'Aggregate Supply'],
      tasks: [{ title: 'Foundation Pour - Block A', status: 'Scheduled', date: 'May 25, 2024' }],
      audits: [{ date: 'Apr 15, 2024', score: 92, notes: 'Good turnaround time' }],
      invoices: [{ number: 'INV-SR-9012', amount: '₹12,500.00', status: 'Pending', date: 'May 12, 2024' }]
    }
  ];

  private vendorsSubject = new BehaviorSubject<Vendor[]>(this.initialVendors);
  vendors$ = this.vendorsSubject.asObservable();

  getVendors() {
    return this.vendorsSubject.value;
  }

  addVendor(vendor: Vendor) {
    const current = this.vendorsSubject.value;
    this.vendorsSubject.next([...current, vendor]);
  }

  updateVendor(id: number | string, updated: Partial<Vendor>) {
    const current = this.vendorsSubject.value;
    const index = current.findIndex(v => v.id == id);
    if (index !== -1) {
      current[index] = { ...current[index], ...updated } as Vendor;
      this.vendorsSubject.next([...current]);
    }
  }

  getVendorById(id: number | string) {
    return this.vendorsSubject.value.find(v => v.id == id);
  }
}
