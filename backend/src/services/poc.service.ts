import { projects, laborStats, vendors } from '../data/mock-data';
import { Project, CostBreakdown } from '../models/models';

export class PocService {
  /**
   * Aggregates actual costs from various modules: labor, materials, subcontractor invoices.
   */
  static aggregateActualCost(projectId: string): { total: number, breakdown: CostBreakdown } {
    let labor = 0;
    let materials = 0;
    let subcontractors = 0;
    let other = 0;
    
    const project = projects.find(p => p.id === projectId);
    if (!project) return { total: 0, breakdown: { labor: 0, materials: 0, subcontractors: 0, other: 0 } };

    // 1. Labor Cost Integration (Real-time from payroll)
    if (projectId === 'p1') {
      labor = laborStats.financials.actualCost * 0.6;
    } else if (projectId === 'p2') {
      labor = laborStats.financials.actualCost * 0.4;
    }

    // 2. Subcontractor Bills Integration (Approved and Paid Invoices)
    vendors.forEach(v => {
      if (v.projects.includes(project.name)) {
        v.invoices.forEach(inv => {
          if (inv.status === 'Paid') {
            const amount = parseFloat(inv.amount.replace(/[^0-9.-]+/g, ''));
            subcontractors += amount;
          }
        });
      }
    });

    // 3. Material Consumption (Simulated from inventory usage)
    materials = project.budget.used * 0.35;

    // 4. Other Direct Costs (Simulated overhead)
    other = project.budget.used * 0.05;

    const total = labor + materials + subcontractors + other;
    return { total, breakdown: { labor, materials, subcontractors, other } };
  }

  /**
   * Runs the period-end consolidation logic to update the POC metrics.
   */
  static runConsolidation(projectId: string): Project | null {
    const project = projects.find(p => p.id === projectId);
    if (!project || !project.pocDetails) return null;

    // 1. Calculate Actual Cost and Breakdown from sub-ledgers
    const { total, breakdown } = this.aggregateActualCost(projectId);
    
    // Add simulated variance for demo
    const randomVariance = Math.floor(Math.random() * 20000) - 10000;
    project.pocDetails.actualCost = total + randomVariance;
    project.pocDetails.costBreakdown = {
      labor: breakdown.labor + (randomVariance * 0.6),
      materials: breakdown.materials + (randomVariance * 0.3),
      subcontractors: breakdown.subcontractors,
      other: breakdown.other + (randomVariance * 0.1)
    };

    // 2. Calculate Completion Percentage (Cost-to-Cost Method)
    if (!project.pocDetails.completionPercentage.isManual) {
      project.pocDetails.completionPercentage.calculated = 
        parseFloat(((project.pocDetails.actualCost / project.pocDetails.estimatedTotalCost) * 100).toFixed(2));
    }

    // 3. Calculate Revenue Recognized
    const percentage = project.pocDetails.completionPercentage.isManual 
      ? project.pocDetails.completionPercentage.manualOverride 
      : project.pocDetails.completionPercentage.calculated;
      
    project.pocDetails.revenueRecognized = 
      parseFloat(((percentage! / 100) * project.pocDetails.contractValue).toFixed(2));

    // 4. Determine Unbilled (Asset) or Deferred (Liability) Revenue
    const recognized = project.pocDetails.revenueRecognized;
    const invoiced = project.pocDetails.invoicedAmount;
    
    if (recognized > invoiced) {
      project.pocDetails.unbilledRevenue = recognized - invoiced;
      project.pocDetails.deferredRevenue = 0;
    } else {
      project.pocDetails.unbilledRevenue = 0;
      project.pocDetails.deferredRevenue = invoiced - recognized;
    }

    // 5. Update Profit
    project.pocDetails.recognizedProfit = recognized - project.pocDetails.actualCost;

    // 6. Update Period
    const now = new Date();
    project.pocDetails.periodClosing.lastCalculatedPeriod = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    return project;
  }
}
