"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialIntelligenceService = void 0;
const mock_data_1 = require("../data/mock-data");
class MaterialIntelligenceService {
    static analyzeInventory() {
        console.log('[MaterialIntelligenceService] Analyzing inventory burn rates...');
        return mock_data_1.materials.map(m => {
            // Inject dummy burn rates for the demo if not present
            const burnRate = m.burnRate || this.getMockBurnRate(m.category);
            const safetyStock = m.safetyStock || this.getMockSafetyStock(m.category);
            const leadTime = m.leadTime || 7; // Standard 1 week
            const daysToStockout = Math.round(m.stock.current / burnRate);
            const isReorderRequired = daysToStockout <= leadTime || m.stock.current <= safetyStock;
            return Object.assign(Object.assign({}, m), { burnRate,
                safetyStock,
                leadTime,
                daysToStockout,
                isReorderRequired, recommendation: isReorderRequired ? `Order ${burnRate * 14} units immediately to cover 14-day lead time.` : 'Stock levels optimal.' });
        });
    }
    static triggerAutoReorder() {
        const analysis = this.analyzeInventory();
        const criticalItems = analysis.filter(i => i.isReorderRequired);
        const newPRs = [];
        criticalItems.forEach(item => {
            var _a, _b;
            // Check if there's already a pending PR for this SKU
            const existingPR = mock_data_1.purchaseRequisitions.find(pr => pr.materialSku === item.sku && pr.status === 'Pending');
            if (!existingPR && item.autoReorderEnabled !== false) {
                const reorderQty = item.burnRate * 21; // Order for 3 weeks
                const pr = {
                    id: `AUTO-PR-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
                    materialSku: item.sku,
                    materialName: item.name,
                    quantity: Math.round(reorderQty),
                    unit: item.unit,
                    projectId: ((_a = item.siteInventory[0]) === null || _a === void 0 ? void 0 : _a.projectId) || 'Global',
                    projectName: ((_b = item.siteInventory[0]) === null || _b === void 0 ? void 0 : _b.projectName) || 'Global Warehouse',
                    requestor: 'AI Inventory Agent',
                    date: new Date().toISOString().split('T')[0],
                    priority: 'High',
                    status: 'Pending',
                    notes: `Automated reorder triggered by Intelligence Service. Current burn rate: ${item.burnRate} ${item.unit}/day. Days to stockout: ${item.daysToStockout}.`
                };
                mock_data_1.purchaseRequisitions.push(pr);
                newPRs.push(pr);
                console.log(`[MaterialIntelligenceService] Auto-reorder triggered for ${item.name}: ${pr.id}`);
            }
        });
        return newPRs;
    }
    static getMockBurnRate(category) {
        const rates = {
            'Concrete': 15, // Cum/day
            'Steel': 2, // MT/day
            'Electrical': 50, // Meters/day
            'Lumber': 10 // Units/day
        };
        return rates[category] || 5;
    }
    static getMockSafetyStock(category) {
        const stocks = {
            'Concrete': 50,
            'Steel': 10,
            'Electrical': 200,
            'Lumber': 40
        };
        return stocks[category] || 20;
    }
}
exports.MaterialIntelligenceService = MaterialIntelligenceService;
