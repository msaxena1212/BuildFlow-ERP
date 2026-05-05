import { Material, PurchaseRequisition } from '../models/models';
import { materials, purchaseRequisitions } from '../data/mock-data';

export class MaterialIntelligenceService {
  
  static analyzeInventory(): any[] {
    console.log('[MaterialIntelligenceService] Analyzing inventory burn rates...');
    
    return materials.map(m => {
      // Inject dummy burn rates for the demo if not present
      const burnRate = m.burnRate || this.getMockBurnRate(m.category);
      const safetyStock = m.safetyStock || this.getMockSafetyStock(m.category);
      const leadTime = m.leadTime || 7; // Standard 1 week

      const daysToStockout = Math.round(m.stock.current / burnRate);
      const isReorderRequired = daysToStockout <= leadTime || m.stock.current <= safetyStock;

      return {
        ...m,
        burnRate,
        safetyStock,
        leadTime,
        daysToStockout,
        isReorderRequired,
        recommendation: isReorderRequired ? `Order ${burnRate * 14} units immediately to cover 14-day lead time.` : 'Stock levels optimal.'
      };
    });
  }

  static triggerAutoReorder() {
    const analysis = this.analyzeInventory();
    const criticalItems = analysis.filter(i => i.isReorderRequired);
    const newPRs: PurchaseRequisition[] = [];

    criticalItems.forEach(item => {
      // Check if there's already a pending PR for this SKU
      const existingPR = purchaseRequisitions.find(pr => pr.materialSku === item.sku && pr.status === 'Pending');
      
      if (!existingPR && item.autoReorderEnabled !== false) {
        const reorderQty = item.burnRate * 21; // Order for 3 weeks
        
        const pr: PurchaseRequisition = {
          id: `AUTO-PR-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          materialSku: item.sku,
          materialName: item.name,
          quantity: Math.round(reorderQty),
          unit: item.unit,
          projectId: item.siteInventory[0]?.projectId || 'Global',
          projectName: item.siteInventory[0]?.projectName || 'Global Warehouse',
          requestor: 'AI Inventory Agent',
          date: new Date().toISOString().split('T')[0],
          priority: 'High',
          status: 'Pending',
          notes: `Automated reorder triggered by Intelligence Service. Current burn rate: ${item.burnRate} ${item.unit}/day. Days to stockout: ${item.daysToStockout}.`
        };

        purchaseRequisitions.push(pr);
        newPRs.push(pr);
        console.log(`[MaterialIntelligenceService] Auto-reorder triggered for ${item.name}: ${pr.id}`);
      }
    });

    return newPRs;
  }

  private static getMockBurnRate(category: string): number {
    const rates: any = {
      'Concrete': 15, // Cum/day
      'Steel': 2,    // MT/day
      'Electrical': 50, // Meters/day
      'Lumber': 10    // Units/day
    };
    return rates[category] || 5;
  }

  private static getMockSafetyStock(category: string): number {
    const stocks: any = {
      'Concrete': 50,
      'Steel': 10,
      'Electrical': 200,
      'Lumber': 40
    };
    return stocks[category] || 20;
  }
}
