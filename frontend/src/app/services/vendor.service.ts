import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
  private apiUrl = `${environment.apiUrl}/vendors`;
  private vendorsSubject = new BehaviorSubject<Vendor[]>([]);
  vendors$ = this.vendorsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadVendors();
  }

  loadVendors() {
    this.http.get<Vendor[]>(this.apiUrl).subscribe(data => {
      this.vendorsSubject.next(data);
    });
  }

  getVendors() {
    return this.vendorsSubject.value;
  }

  addVendor(vendor: Vendor) {
    // In a real app, this would be a POST call
    const current = this.vendorsSubject.value;
    this.vendorsSubject.next([...current, vendor]);
  }

  updateVendor(id: number | string, updated: Partial<Vendor>) {
    // In a real app, this would be a PUT/PATCH call
    const current = this.vendorsSubject.value;
    const index = current.findIndex((v: Vendor) => v.id == id);
    if (index !== -1) {
      current[index] = { ...current[index], ...updated } as Vendor;
      this.vendorsSubject.next([...current]);
    }
  }

  getVendorById(id: number | string) {
    return this.vendorsSubject.value.find((v: Vendor) => v.id == id);
  }
}
