import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { InventoryRequest, InventoryReturn, InventoryApproval } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  private requestsSubject = new BehaviorSubject<InventoryRequest[]>([]);
  private returnsSubject = new BehaviorSubject<InventoryReturn[]>([]);

  requests$ = this.requestsSubject.asObservable();
  returns$ = this.returnsSubject.asObservable();

  constructor() {
    this.refreshRequests();
    this.refreshReturns();
  }

  refreshRequests() {
    this.http.get<InventoryRequest[]>(`${this.apiUrl}/inventory/requests`)
      .subscribe(r => this.requestsSubject.next(r));
  }

  refreshReturns() {
    this.http.get<InventoryReturn[]>(`${this.apiUrl}/inventory/returns`)
      .subscribe(r => this.returnsSubject.next(r));
  }

  createRequest(request: Partial<InventoryRequest>): Observable<InventoryRequest> {
    return this.http.post<InventoryRequest>(`${this.apiUrl}/inventory/requests`, request).pipe(
      tap(() => this.refreshRequests())
    );
  }

  approveRequest(requestId: string, approval: Partial<InventoryApproval>): Observable<InventoryRequest> {
    return this.http.post<InventoryRequest>(`${this.apiUrl}/inventory/requests/${requestId}/approve`, approval).pipe(
      tap(() => this.refreshRequests())
    );
  }

  issueMaterials(requestId: string, items: { itemId: string, quantityIssued: number }[]): Observable<InventoryRequest> {
    return this.http.post<InventoryRequest>(`${this.apiUrl}/inventory/requests/${requestId}/issue`, { items }).pipe(
      tap(() => this.refreshRequests())
    );
  }

  createReturn(returnRequest: Partial<InventoryReturn>): Observable<InventoryReturn> {
    return this.http.post<InventoryReturn>(`${this.apiUrl}/inventory/returns`, returnRequest).pipe(
      tap(() => this.refreshReturns())
    );
  }
}
