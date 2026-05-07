import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Branch, Expense, GuaranteeTracking, BillingDocument, BranchSettlement } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(`${this.apiUrl}branches`);
  }

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}expenses`);
  }

  getGuaranteeTracking(): Observable<GuaranteeTracking[]> {
    return this.http.get<GuaranteeTracking[]>(`${this.apiUrl}guarantee-tracking`);
  }

  getBillingDocuments(): Observable<BillingDocument[]> {
    return this.http.get<BillingDocument[]>(`${this.apiUrl}billing-documents`);
  }

  getBranchSettlements(): Observable<BranchSettlement[]> {
    return this.http.get<BranchSettlement[]>(`${this.apiUrl}branch-settlements`);
  }
}
