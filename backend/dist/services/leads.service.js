"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsService = void 0;
const mock_data_1 = require("../data/mock-data");
class LeadsService {
    static getAllLeads() {
        return mock_data_1.leads;
    }
    static getLeadById(id) {
        return mock_data_1.leads.find(l => l.id === id);
    }
    static createLead(lead) {
        mock_data_1.leads.push(lead);
        return lead;
    }
    static updateLeadStatus(leadId, status) {
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
    static convertToSale(leadId, customerName, contractId, type = 'Private') {
        const lead = this.getLeadById(leadId);
        if (!lead || lead.status === 'Converted')
            return null;
        lead.status = 'Converted';
        const newSale = {
            id: 'S' + Date.now(),
            projectCode: lead.projectCode,
            type: type,
            customerName: customerName,
            amount: lead.value,
            contractId: contractId,
            status: 'Pending',
            createdAt: new Date().toISOString()
        };
        mock_data_1.sales.push(newSale);
        this.triggerEmailAlert(`New Sale Generated from Lead ${leadId}.`, lead.projectCode);
        return newSale;
    }
    // Private & Public Sales Handling
    static getAllSales() {
        return mock_data_1.sales;
    }
    static approveSale(saleId) {
        const sale = mock_data_1.sales.find(s => s.id === saleId);
        if (sale) {
            sale.status = 'Approved';
            this.triggerEmailAlert(`Sale ${saleId} has been approved.`, sale.projectCode);
        }
        return sale;
    }
    // Tender Tracking
    static getAllTenders() {
        return mock_data_1.tenders;
    }
    static submitTender(tender) {
        mock_data_1.tenders.push(tender);
        return tender;
    }
    static updateTenderStatus(tenderId, status) {
        const tender = mock_data_1.tenders.find(t => t.id === tenderId);
        if (tender) {
            tender.status = status;
            this.triggerEmailAlert(`Tender ${tenderId} status changed to ${status}.`, tender.projectCode);
        }
        return tender;
    }
    static triggerEmailAlert(message, projectCode) {
        const alert = {
            id: 'EA' + Date.now(),
            projectCode,
            recipientId: 'sales-manager@buildflow.com',
            subject: 'Sales Module Notification',
            body: message,
            triggeredAt: new Date().toISOString(),
            read: false
        };
        mock_data_1.emailAlerts.push(alert);
    }
}
exports.LeadsService = LeadsService;
