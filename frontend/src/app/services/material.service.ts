import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface SiteInventory {
  projectId: string;
  projectName: string;
  stock: number;
}

export interface Material {
  name: string;
  sku: string;
  category: string;
  icon: string;
  bg: string;
  text: string;
  border?: string;
  unit: string;
  siteInventory: SiteInventory[];
  stock: {
    current: number;
    total: number;
    percent: number;
  };
  cost: string;
  supplier: string;
  status: 'Optimal' | 'Adequate' | 'Critical';
  // Intelligence Fields
  burnRate?: number; 
  safetyStock?: number;
  leadTime?: number;
  daysToStockout?: number;
  autoReorderEnabled?: boolean;
}

export interface PurchaseRequisition {
  id: string;
  materialSku: string;
  materialName: string;
  quantity: number;
  unit: string;
  projectId: string;
  projectName: string;
  requestor: string;
  date: string;
  priority: 'Low' | 'Medium' | 'High' | 'Emergency';
  status: 'Pending' | 'Approved' | 'Ordered' | 'Received' | 'Rejected';
  notes?: string;
}

export interface StockTransfer {
  id: string;
  materialSku: string;
  materialName: string;
  fromProjectId: string;
  fromProjectName: string;
  toProjectId: string;
  toProjectName: string;
  quantity: number;
  unit: string;
  date: string;
  status: 'Draft' | 'Sent' | 'Received' | 'Cancelled';
  requestedBy: string;
}

export interface MaterialReturn {
  id: string;
  materialSku: string;
  materialName: string;
  projectId: string;
  projectName: string;
  quantity: number;
  unit: string;
  reason: 'Surplus' | 'Defective' | 'Wrong Item' | 'Project Cancelled';
  status: 'Pending' | 'Approved' | 'In Transit' | 'Restocked' | 'Rejected';
  requestDate: string;
  processedDate?: string;
  requestedBy: string;
}

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private apiUrl = `${environment.apiUrl}/materials`;
  private prUrl = `${environment.apiUrl}/purchase-requisitions`;
  private transferUrl = `${environment.apiUrl}/stock-transfers`;
  private returnUrl = `${environment.apiUrl}/material-returns`;

  private materialsSubject = new BehaviorSubject<Material[]>([]);
  private prSubject = new BehaviorSubject<PurchaseRequisition[]>([]);
  private transferSubject = new BehaviorSubject<StockTransfer[]>([]);
  private returnSubject = new BehaviorSubject<MaterialReturn[]>([]);

  materials$ = this.materialsSubject.asObservable();
  purchaseRequisitions$ = this.prSubject.asObservable();
  stockTransfers$ = this.transferSubject.asObservable();
  materialReturns$ = this.returnSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadMaterials();
    this.loadPurchaseRequisitions();
    this.loadStockTransfers();
    this.loadMaterialReturns();
  }

  loadMaterials() {
    this.http.get<Material[]>(this.apiUrl).subscribe(data => {
      this.materialsSubject.next(data);
    });
  }

  loadPurchaseRequisitions() {
    this.http.get<PurchaseRequisition[]>(this.prUrl).subscribe(data => {
      this.prSubject.next(data);
    });
  }

  loadStockTransfers() {
    this.http.get<StockTransfer[]>(this.transferUrl).subscribe(data => {
      this.transferSubject.next(data);
    });
  }

  loadMaterialReturns() {
    this.http.get<MaterialReturn[]>(this.returnUrl).subscribe(data => {
      this.returnSubject.next(data);
    });
  }

  getMaterials() {
    return this.materialsSubject.value;
  }

  addMaterial(material: Material) {
    this.http.post<Material>(this.apiUrl, material).subscribe(() => this.loadMaterials());
  }

  updateMaterial(sku: string, updated: Partial<Material>) {
    this.http.patch<Material>(`${this.apiUrl}/${sku}`, updated).subscribe(() => this.loadMaterials());
  }

  deleteMaterial(sku: string) {
    this.http.delete(`${this.apiUrl}/${sku}`).subscribe(() => this.loadMaterials());
  }

  createPurchaseRequisition(pr: Partial<PurchaseRequisition>) {
    return this.http.post<PurchaseRequisition>(this.prUrl, pr).pipe(
      tap(() => this.loadPurchaseRequisitions())
    );
  }

  createStockTransfer(transfer: Partial<StockTransfer>) {
    return this.http.post<StockTransfer>(this.transferUrl, transfer).pipe(
      tap(() => this.loadStockTransfers())
    );
  }

  createMaterialReturn(ret: Partial<MaterialReturn>) {
    return this.http.post<MaterialReturn>(this.returnUrl, ret).pipe(
      tap(() => this.loadMaterialReturns())
    );
  }

  getMaterialBySku(sku: string) {
    return this.materialsSubject.value.find((m: Material) => m.sku === sku);
  }

  // --- Material Intelligence ---

  getInventoryAnalysis(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/analysis`);
  }

  triggerAutoReorder(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auto-reorder`, {});
  }
}
