import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialService, Material } from '../../services/material.service';
import { VendorService, Vendor } from '../../services/vendor.service';
import { QuotationService, Quote, QuoteItem } from '../../services/quotation.service';

@Component({
  selector: 'app-new-quote-wizard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './new-quote-wizard.html'
})
export class NewQuoteWizard implements OnInit {
  private materialService = inject(MaterialService);
  private vendorService = inject(VendorService);
  private quotationService = inject(QuotationService);
  private router = inject(Router);

  currentStep = 1;
  materials: Material[] = [];
  vendors: Vendor[] = [];
  today = new Date();
  
  searchQuery = '';
  selectedMaterials = new Set<string>();

  // For Step 2
  quoteItems: QuoteItem[] = [];

  ngOnInit() {
    this.materialService.materials$.subscribe(m => this.materials = m);
    this.vendorService.vendors$.subscribe(v => this.vendors = v);
  }

  get filteredMaterials() {
    if (!this.searchQuery) return this.materials;
    const query = this.searchQuery.toLowerCase();
    return this.materials.filter(m => 
      m.name.toLowerCase().includes(query) || 
      m.category.toLowerCase().includes(query)
    );
  }

  toggleMaterial(sku: string) {
    if (this.selectedMaterials.has(sku)) {
      this.selectedMaterials.delete(sku);
    } else {
      this.selectedMaterials.add(sku);
    }
  }

  nextStep() {
    if (this.currentStep === 1) {
      this.prepareQuoteItems();
    }
    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }

  prepareQuoteItems() {
    this.quoteItems = Array.from(this.selectedMaterials).map(sku => {
      const mat = this.materials.find(m => m.sku === sku);
      // Try to find a default vendor based on material.supplier
      const defaultVendor = this.vendors.find(v => v.name === mat?.supplier);
      
      return {
        materialSku: sku,
        materialName: mat?.name || '',
        quantity: 1,
        unitPrice: parseFloat((mat?.cost || '0').replace('₹', '').replace(',', '')),
        totalPrice: parseFloat((mat?.cost || '0').replace('₹', '').replace(',', '')),
        vendorId: defaultVendor?.id || '',
        vendorName: defaultVendor?.name || ''
      };
    });
  }

  updateLineTotal(item: QuoteItem) {
    item.totalPrice = item.quantity * item.unitPrice;
  }

  get totalAmount() {
    return this.quoteItems.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  onVendorChange(item: QuoteItem, event: any) {
    const vendorId = event.target.value;
    const vendor = this.vendors.find(v => v.id.toString() === vendorId.toString());
    if (vendor) {
      item.vendorId = vendor.id;
      item.vendorName = vendor.name;
    }
  }

  submitQuote() {
    const newQuote: Quote = {
      id: Date.now().toString(),
      quoteNumber: 'QT-' + Math.floor(Math.random() * 90000 + 10000),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      salesPerson: 'Marcus Thorne',
      items: this.quoteItems,
      totalAmount: this.totalAmount,
      status: 'Draft'
    };

    this.quotationService.addQuote(newQuote).subscribe(() => {
      this.router.navigate(['/quotations']);
    });
  }
}
