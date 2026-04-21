import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Contract {
  id: string;
  vendor: string;
  value: number;
  utilized: number;
  status: 'Active' | 'Expiring Soon' | 'Expired' | 'Terminated';
  effectiveDate: string;
  expiryDate: string;
  expiryDays: number;
  location: string;
  owner: string;
  type: string;
}

export interface ContractHistory {
  event: string;
  description: string;
  date: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private initialContracts: Contract[] = [
    {
      id: 'c1',
      vendor: 'Titan Structural Steel, LLC',
      value: 1420000,
      utilized: 68,
      status: 'Active',
      effectiveDate: 'Jan 12, 2024',
      expiryDate: 'Dec 31, 2024',
      expiryDays: 34,
      location: 'Seattle, WA',
      owner: 'Marcus Thorne',
      type: 'Master Service Agreement'
    },
    {
      id: 'c2',
      vendor: 'VoltStream Electrical',
      value: 850000,
      utilized: 45,
      status: 'Active',
      effectiveDate: 'Feb 05, 2024',
      expiryDate: 'Jul 15, 2025',
      expiryDays: 120,
      location: 'Bellevue, WA',
      owner: 'Sarah Chen',
      type: 'Subcontractor Agreement'
    },
    {
      id: 'c3',
      vendor: 'Apex Concrete Co.',
      value: 2300000,
      utilized: 90,
      status: 'Expiring Soon',
      effectiveDate: 'Mar 10, 2023',
      expiryDate: 'Apr 10, 2024',
      expiryDays: 15,
      location: 'Seattle, WA',
      owner: 'James Wilson',
      type: 'Material Supply Contract'
    }
  ];

  private initialHistory: ContractHistory[] = [
    { event: 'MSA Renewal Signed', description: 'Legally binding signature collected via DocuSign.', date: 'JAN 12, 2024 • 14:32 PM', active: true },
    { event: 'Project Scope Amendment #03', description: 'Revised structural load requirements for Sky-Deck A.', date: 'OCT 14, 2023', active: false },
    { event: 'Project Scope Amendment #02', description: 'Foundation reinforcement phase completion approval.', date: 'AUG 05, 2023', active: false },
    { event: 'Initial Partnership Onboarding', description: 'Vendor vetting and initial compliance certification.', date: 'MAY 21, 2023', active: false }
  ];

  private contractsSubject = new BehaviorSubject<Contract[]>(this.initialContracts);
  contracts$ = this.contractsSubject.asObservable();

  private historySubject = new BehaviorSubject<ContractHistory[]>(this.initialHistory);
  history$ = this.historySubject.asObservable();

  getContracts(): Contract[] {
    return this.contractsSubject.value;
  }

  terminateContract(id: string) {
    const contracts = this.contractsSubject.value;
    const index = contracts.findIndex(c => c.id === id);
    if (index !== -1) {
      const updatedContract = { 
        ...contracts[index], 
        status: 'Terminated' as const,
        expiryDays: 0
      };
      contracts[index] = updatedContract;
      this.contractsSubject.next([...contracts]);

      // Add to history
      const newEvent: ContractHistory = {
        event: 'Contract Terminated',
        description: `Agreement with ${contracts[index].vendor} has been legally terminated by ${contracts[index].owner}.`,
        date: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase(),
        active: true
      };
      
      const history = this.historySubject.value.map(h => ({ ...h, active: false }));
      this.historySubject.next([newEvent, ...history]);
    }
  }

  renewContract(id: string, newExpiry: string, newValue: number) {
    const contracts = this.contractsSubject.value;
    const index = contracts.findIndex(c => c.id === id);
    if (index !== -1) {
      const updatedContract = { 
        ...contracts[index], 
        expiryDate: newExpiry, 
        value: newValue,
        status: 'Active' as const,
        expiryDays: 365 // Simulation: Resetting days left
      };
      contracts[index] = updatedContract;
      this.contractsSubject.next([...contracts]);

      // Add to history
      const newEvent: ContractHistory = {
        event: 'Contract Renewed',
        description: `Contract terms extended to ${newExpiry}. Value updated to $${newValue.toLocaleString()}.`,
        date: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase(),
        active: true
      };
      
      const history = this.historySubject.value.map(h => ({ ...h, active: false }));
      this.historySubject.next([newEvent, ...history]);
    }
  }

  addContract(contract: Contract) {
    const contracts = this.contractsSubject.value;
    this.contractsSubject.next([...contracts, contract]);
    
    // Add history
    const newEvent: ContractHistory = {
      event: 'New Contract Registered',
      description: `${contract.type} established with ${contract.vendor}. Initial value: $${contract.value.toLocaleString()}.`,
      date: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase(),
      active: true
    };
    const history = this.historySubject.value.map(h => ({ ...h, active: false }));
    this.historySubject.next([newEvent, ...history]);
  }
}
