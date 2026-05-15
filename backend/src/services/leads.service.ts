import { leads, sales, tenders, emailAlerts } from '../data/mock-data';
import { Lead, Sale, Tender, EmailAlert } from '../models/models';

export class LeadsService {
  static getAllLeads() {
    return leads;
  }

  static getLeadById(id: string) {
    return leads.find(l => l.id === id);
  }

  static createLead(lead: Lead) {
    leads.push(lead);
    return lead;
  }

  static updateLeadStatus(leadId: string, status: Lead['status']) {
    const lead = this.getLeadById(leadId);
    if (lead) {
      lead.status = status;
      if (status === 'Converted') {
        // Trigger automated email alert
        this.triggerEmailAlert(`Lead ${leadId} has been successfully converted.`, lead.projectCode);
      }
    }
    return lead;
  }

  // Converts a Lead into a Sale (Lead-to-sale lifecycle)
  static convertToSale(leadId: string, customerName: string, contractId: string, type: 'Private' | 'Public' = 'Private') {
    const lead = this.getLeadById(leadId);
    if (!lead || lead.status === 'Converted') return null;

    lead.status = 'Converted';
    
    const newSale: Sale = {
      id: 'S' + Date.now(),
      projectCode: lead.projectCode,
      type: type,
      customerName: customerName,
      amount: lead.value,
      contractId: contractId,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    sales.push(newSale);
    
    this.triggerEmailAlert(`New Sale Generated from Lead ${leadId}.`, lead.projectCode);
    return newSale;
  }

  // Private & Public Sales Handling
  static getAllSales() {
    return sales;
  }

  static approveSale(saleId: string) {
    const sale = sales.find(s => s.id === saleId);
    if (sale) {
      sale.status = 'Approved';
      this.triggerEmailAlert(`Sale ${saleId} has been approved.`, sale.projectCode);
    }
    return sale;
  }

  // Tender Tracking
  static getAllTenders() {
    return tenders;
  }

  static submitTender(tender: Tender) {
    tenders.push(tender);
    return tender;
  }

  static updateTenderStatus(tenderId: string, status: Tender['status']) {
    const tender = tenders.find(t => t.id === tenderId);
    if (tender) {
      tender.status = status;
      this.triggerEmailAlert(`Tender ${tenderId} status changed to ${status}.`, tender.projectCode);
    }
    return tender;
  }

  private static triggerEmailAlert(message: string, projectCode: string) {
    const alert: EmailAlert = {
      id: 'EA' + Date.now(),
      projectCode,
      recipientId: 'sales-manager@buildflow.com',
      subject: 'Sales Module Notification',
      body: message,
      triggeredAt: new Date().toISOString(),
      read: false
    };
    emailAlerts.push(alert);
  }
}
