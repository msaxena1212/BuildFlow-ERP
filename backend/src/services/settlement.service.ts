import { SettlementRequest, Vendor, Project } from '../models/models';
import { projects, vendors, contracts } from '../data/mock-data';

export class SettlementService {
  static generateSuggestedSettlement(vendorId: string | number, projectId: string, basis: 'POC' | 'Milestone' | 'LumpSum'): SettlementRequest {
    console.log(`[SettlementService] Generating request for Vendor: ${vendorId}, Project: ${projectId}, Basis: ${basis}`);
    const project = projects.find(p => p.id === projectId);
    const vendor = vendors.find(v => v.id == vendorId);
    
    if (!project || !vendor) {
      console.error(`[SettlementService] Project (${!!project}) or Vendor (${!!vendor}) not found`);
      throw new Error('Project or Vendor not found');
    }

    // Find the contract for this vendor and project
    const vendorContract = contracts.find(c => c.vendor === vendor.name);
    const contractValue = vendorContract ? vendorContract.value : parseFloat(vendor.budget.replace(/[^0-9.-]+/g,""));
    
    let amount = 0;
    let workPercentage = 0;
    let justification = '';

    if (basis === 'POC') {
      workPercentage = project.pocDetails?.completionPercentage.isManual 
        ? project.pocDetails.completionPercentage.manualOverride || 0 
        : project.pocDetails?.completionPercentage.calculated || 0;
      
      const earnedValue = (contractValue * workPercentage) / 100;
      const alreadyInvoiced = vendor.invoices.reduce((acc, inv) => acc + parseFloat(inv.amount.replace(/[^0-9.-]+/g,"")), 0);
      
      amount = earnedValue - alreadyInvoiced;
      justification = `Based on current Project POC of ${workPercentage}%. Total Earned: ₹${earnedValue.toLocaleString()}. Already Invoiced: ₹${alreadyInvoiced.toLocaleString()}.`;
    } else if (basis === 'Milestone') {
      // Find completed milestones for this project
      const completedMilestones = project.milestones.filter(m => m.progress === 100);
      
      if (completedMilestones.length === 0) {
        throw new Error('No completed milestones found. Payment hold active.');
      }

      // Calculate amount based on specific milestones (simplified: 10% per milestone)
      amount = contractValue * (completedMilestones.length * 0.10);
      workPercentage = (completedMilestones.length / project.milestones.length) * 100;
      justification = `Generated based on completion of ${completedMilestones.length} project milestones (${completedMilestones.map(m => m.name).join(', ')}).`;
    } else if (basis === 'LumpSum') {
      amount = contractValue * 0.10; // Suggest 10% as a standard lump sum
      workPercentage = 0; 
      justification = `Standard 10% Lump Sum payment request for this project phase.`;
    } else if (basis === 'Retention') {
      // Only release retention if project is 90%+ done
      const totalProgress = project.pocDetails?.completionPercentage.calculated || 0;
      if (totalProgress < 90) {
        throw new Error(`Retention release restricted. Project progress (${totalProgress}%) must be at least 90%.`);
      }
      amount = contractValue * 0.05; // 5% retention release
      workPercentage = 100;
      justification = `Release of 5% project retention amount following 90% structural completion.`;
    }

    return {
      id: Math.random().toString(36).substr(2, 9),
      vendorId,
      projectId,
      requestDate: new Date().toISOString().split('T')[0],
      basis,
      amount: Math.max(0, amount),
      workPercentage,
      justification,
      status: 'Draft'
    };
  }

  static saveSettlementRequest(request: SettlementRequest) {
    const vendor = vendors.find(v => v.id == request.vendorId);
    if (vendor) {
      if (!vendor.settlementRequests) vendor.settlementRequests = [];
      vendor.settlementRequests.push(request);

      // Create a pending invoice entry for the vendor
      if (!vendor.invoices) vendor.invoices = [];
      vendor.invoices.unshift({
        number: `SET-${request.id.toUpperCase()}`,
        amount: `₹${request.amount.toLocaleString()}`,
        status: 'Pending',
        date: new Date().toISOString().split('T')[0]
      });

      // Update vendor balance (simplified logic for POC)
      const currentBalance = parseFloat(vendor.balance.replace(/[^0-9.-]+/g,"")) || 0;
      vendor.balance = `₹${(currentBalance + request.amount).toLocaleString()}`;
      vendor.status = 'Due';
      vendor.statusColor = 'bg-red-100 text-red-700';

      return request;
    }
  }

  // --- Retention Release Intelligence ---

  static getRetentionAlerts(projectId: string): any[] {
    const project = projects.find(p => p.id === projectId);
    if (!project) return [];

    const totalProgress = project.progress; // Using the new rollup progress
    const alerts: any[] = [];

    if (totalProgress >= 90) {
      // Find all vendors active on this project
      const projectVendors = vendors.filter(v => v.projects.includes(project.name));

      projectVendors.forEach(vendor => {
        // Check if retention hasn't already been requested
        const alreadyRequested = vendor.settlementRequests?.some(r => r.projectId === projectId && r.basis === 'Retention');
        
        if (!alreadyRequested) {
          const contract = contracts.find(c => c.vendor === vendor.name);
          const retentionAmount = contract ? contract.value * 0.05 : 0;

          if (retentionAmount > 0) {
            alerts.push({
              id: `alert-${vendor.id}`,
              vendorName: vendor.name,
              vendorId: vendor.id,
              type: 'Retention Release Eligible',
              message: `Vendor ${vendor.name} is eligible for 5% retention release (₹${retentionAmount.toLocaleString()}) as project hits ${totalProgress}% POC.`,
              amount: retentionAmount,
              severity: 'High'
            });
          }
        }
      });
    }

    return alerts;
  }
}
