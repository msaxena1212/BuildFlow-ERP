import { invoices, invoiceApprovals, creditDebitNotes, collectionTrackings, emailAlerts, milestoneBillings, projects, purchaseOrders } from '../data/mock-data';
import { Invoice, InvoiceApproval, CreditDebitNote, CollectionTracking, EmailAlert, MilestoneBilling, Project, PurchaseOrder } from '../models/models';

export class InvoicingService {
  
  // 1. Automated Invoice Generation based on Milestones
  static generateMilestoneInvoice(projectCode: string, milestoneId: string, amount: number) {
    const project = projects.find(p => p.projectCode === projectCode);
    if (!project) return null;

    const newInvoice: Invoice = {
      id: 'INV' + Date.now(),
      projectCode,
      milestoneId,
      amount,
      generatedAt: new Date().toISOString(),
      status: 'Draft'
    };
    invoices.push(newInvoice);

    const milestoneBilling: MilestoneBilling = {
      id: 'MB' + Date.now(),
      projectCode,
      milestoneId,
      invoiceId: newInvoice.id,
      amount,
      generatedAt: new Date().toISOString()
    };
    milestoneBillings.push(milestoneBilling);

    this.triggerEmailAlert(`Automated Invoice ${newInvoice.id} generated for milestone ${milestoneId}.`, projectCode);
    return newInvoice;
  }

  // 2. Invoice Approval Workflow (WCC + PO Validation)
  static approveInvoice(invoiceId: string, approverId: string, wccValidated: boolean, poId?: string) {
    const invoice = invoices.find(i => i.id === invoiceId);
    if (!invoice) return null;

    // Validate PO if provided
    if (poId) {
      const po = purchaseOrders.find(p => p.id === poId);
      if (!po || po.projectCode !== invoice.projectCode) {
        throw new Error('PO Validation Failed: PO does not match project.');
      }
    }

    if (!wccValidated) {
      throw new Error('WCC Validation Failed: Work Completion Certificate required.');
    }

    const approval: InvoiceApproval = {
      id: 'IA' + Date.now(),
      invoiceId,
      approverId,
      approved: true,
      timestamp: new Date().toISOString(),
      comment: 'WCC and PO validated successfully.'
    };
    invoiceApprovals.push(approval);
    invoice.status = 'Approved';

    // Start Collection Tracking
    this.initiateCollection(invoiceId, invoice.amount);

    this.triggerEmailAlert(`Invoice ${invoiceId} has been approved after WCC/PO validation.`, invoice.projectCode);
    return invoice;
  }

  // 3. Collection Tracking (A1, A2, A3 aging)
  static initiateCollection(invoiceId: string, amount: number) {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30); // 30 days credit term

    const collection: CollectionTracking = {
      id: 'CT' + Date.now(),
      invoiceId,
      agingStage: 'A1',
      amountDue: amount,
      dueDate: dueDate.toISOString(),
      status: 'Pending'
    };
    collectionTrackings.push(collection);
  }

  static runAgingUpdate() {
    const now = new Date();
    collectionTrackings.forEach(c => {
      if (c.status !== 'Pending') return;

      const due = new Date(c.dueDate);
      const diffDays = Math.floor((now.getTime() - due.getTime()) / (1000 * 3600 * 24));

      if (diffDays > 60) {
        c.agingStage = 'A3';
      } else if (diffDays > 30) {
        c.agingStage = 'A2';
      } else {
        c.agingStage = 'A1';
      }
    });
  }

  // 4. Credit/Debit Note Linked with Billing
  static createCreditDebitNote(invoiceId: string, type: 'Credit' | 'Debit', amount: number, reason: string) {
    const invoice = invoices.find(i => i.id === invoiceId);
    if (!invoice) return null;

    const note: CreditDebitNote = {
      id: 'CN' + Date.now(),
      invoiceId,
      type,
      amount,
      reason,
      status: 'Draft',
      createdAt: new Date().toISOString()
    };
    creditDebitNotes.push(note);
    return note;
  }

  // 5. NFA Process for Excess Billing Removal
  static processNFARemoval(invoiceId: string, amountToRemove: number, justification: string) {
    const invoice = invoices.find(i => i.id === invoiceId);
    if (!invoice) return null;

    // Simulate NFA logic
    if (amountToRemove > invoice.amount) throw new Error('Cannot remove more than invoice amount.');

    invoice.amount -= amountToRemove;
    this.createCreditDebitNote(invoiceId, 'Credit', amountToRemove, `NFA Excess Billing Removal: ${justification}`);
    
    this.triggerEmailAlert(`NFA processed: ${amountToRemove} removed from Invoice ${invoiceId}.`, invoice.projectCode);
    return invoice;
  }

  private static triggerEmailAlert(message: string, projectCode: string) {
    const alert: EmailAlert = {
      id: 'EA' + Date.now(),
      recipientId: 'finance-manager@buildflow.com',
      subject: 'Financial Module Notification',
      body: message,
      triggeredAt: new Date().toISOString(),
      read: false
    };
    emailAlerts.push(alert);
  }
}
