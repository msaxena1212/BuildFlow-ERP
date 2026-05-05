import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ComplianceHealth {
  score: number;
  status: 'Compliant' | 'Partial' | 'Non-Compliant';
  pendingSubmissions: number;
}

@Injectable({
  providedIn: 'root'
})
export class ComplianceService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getComplianceHealth(projectId: string): Observable<ComplianceHealth> {
    // Simulated API call
    return of({
      score: 75,
      status: 'Partial',
      pendingSubmissions: 2
    });
  }

  submitRegulatory(projectId: string, type: string): Observable<any> {
    console.log(`[ComplianceService] Submitting ${type} for Project: ${projectId}`);
    return of({ success: true, submissionId: `SUB-${Math.random().toString(36).substr(2, 6).toUpperCase()}` });
  }

  getRetentionAlerts(projectId: string): Observable<any[]> {
    // Simulated API call based on new backend logic
    return of([
      {
        id: 'alert-v1',
        vendorName: 'Steel Structure Solutions',
        type: 'Retention Release Eligible',
        message: 'Eligible for 5% retention release (₹1,250,000) as project hits 92% POC.',
        severity: 'High'
      }
    ]);
  }
}
