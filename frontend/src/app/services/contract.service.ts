import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

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
  signatory: string;
  contactEmail: string;
  contactPhone: string;
}

export interface ContractHistory {
  id: string;
  contractId: string;
  event: string;
  description: string;
  date: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/contracts`;
  private historyUrl = `${environment.apiUrl}/contract-history`;

  private contractsSubject = new BehaviorSubject<Contract[]>([]);
  contracts$ = this.contractsSubject.asObservable();

  private historySubject = new BehaviorSubject<ContractHistory[]>([]);
  history$ = this.historySubject.asObservable();

  constructor() {
    this.loadContracts();
    this.loadHistory();
  }

  loadContracts() {
    this.http.get<Contract[]>(this.apiUrl).subscribe(data => {
      this.contractsSubject.next(data);
    });
  }

  loadHistory() {
    this.http.get<ContractHistory[]>(this.historyUrl).subscribe(data => {
      this.historySubject.next(data);
    });
  }

  terminateContract(id: string) {
    const contracts = this.contractsSubject.value;
    const contract = contracts.find(c => c.id === id);
    if (contract) {
      const updateData = { status: 'Terminated' as const, expiryDays: 0 };
      this.http.patch<Contract>(`${this.apiUrl}/${id}`, updateData).subscribe(() => {
        // Add to history
        this.addHistoryEvent({
          id: 'h' + Date.now(),
          contractId: id,
          event: 'Contract Terminated',
          description: `Agreement with ${contract.vendor} has been legally terminated by ${contract.owner}.`,
          date: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase(),
          active: true
        });
        this.loadContracts();
      });
    }
  }

  renewContract(id: string, newExpiry: string, newValue: number) {
    const contracts = this.contractsSubject.value;
    const contract = contracts.find(c => c.id === id);
    if (contract) {
      const updateData = { 
        expiryDate: newExpiry, 
        value: newValue,
        status: 'Active' as const,
        expiryDays: 365 
      };
      this.http.patch<Contract>(`${this.apiUrl}/${id}`, updateData).subscribe(() => {
        // Add to history
        this.addHistoryEvent({
          id: 'h' + Date.now(),
          contractId: id,
          event: 'Contract Renewed',
          description: `Contract terms extended to ${newExpiry}. Value updated to $${newValue.toLocaleString()}.`,
          date: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase(),
          active: true
        });
        this.loadContracts();
      });
    }
  }

  addContract(contract: Contract) {
    this.http.post<Contract>(this.apiUrl, contract).subscribe(() => {
      this.addHistoryEvent({
        id: 'h' + Date.now(),
        contractId: contract.id,
        event: 'New Contract Registered',
        description: `${contract.type} established with ${contract.vendor}. Initial value: $${contract.value.toLocaleString()}.`,
        date: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase(),
        active: true
      });
      this.loadContracts();
    });
  }

  private addHistoryEvent(event: ContractHistory) {
    this.http.post<ContractHistory>(this.historyUrl, event).subscribe(() => {
      this.loadHistory();
    });
  }
}
