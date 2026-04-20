import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface QuoteItem {
  materialSku: string;
  materialName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  vendorId: string | number;
  vendorName: string;
}

export interface Quote {
  id: string;
  quoteNumber: string;
  date: string;
  salesPerson: string;
  items: QuoteItem[];
  totalAmount: number;
  status: 'Draft' | 'Sent' | 'Negotiating' | 'Approved' | 'Rejected';
  vendorFeedback?: string;
  lastUpdated?: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  private apiUrl = `${environment.apiUrl}/quotes`;
  private quotesSubject = new BehaviorSubject<Quote[]>([]);
  quotes$ = this.quotesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadQuotes();
  }

  loadQuotes() {
    this.http.get<Quote[]>(this.apiUrl).subscribe(data => {
      this.quotesSubject.next(data);
    });
  }

  getQuotes() {
    return this.quotesSubject.value;
  }

  addQuote(quote: Quote): Observable<Quote> {
    return this.http.post<Quote>(this.apiUrl, quote).pipe(
      tap(() => this.loadQuotes())
    );
  }

  getQuoteById(id: string) {
    return this.quotesSubject.value.find(q => q.id === id);
  }

  updateQuoteStatus(id: string, status: Quote['status'], feedback?: string) {
    const quotes = this.quotesSubject.value;
    const index = quotes.findIndex(q => q.id === id);
    if (index !== -1) {
      quotes[index] = { 
        ...quotes[index], 
        status, 
        vendorFeedback: feedback,
        lastUpdated: new Date().toLocaleDateString()
      };
      this.quotesSubject.next([...quotes]);
    }
  }

  deleteQuote(id: string) {
    const quotes = this.quotesSubject.value.filter(q => q.id !== id);
    this.quotesSubject.next([...quotes]);
  }
}
