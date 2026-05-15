"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const mock_data_1 = require("../data/mock-data");
class InventoryService {
    static getRequests() {
        return mock_data_1.inventoryRequests;
    }
    static getReturns() {
        return mock_data_1.inventoryReturns;
    }
    static createRequest(request) {
        const newRequest = Object.assign({ id: 'IR-' + Date.now(), projectId: request.projectId || '', taskId: request.taskId || '', subTaskId: request.subTaskId || '', requestedBy: request.requestedBy || '', requestedRole: request.requestedRole || '', siteId: request.siteId || '', items: request.items || [], status: 'Submitted', approvalLevel: 0, approvals: [], warehouseId: request.warehouseId || 'W-MAIN', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }, request);
        mock_data_1.inventoryRequests.unshift(newRequest);
        return newRequest;
    }
    static approveRequest(requestId, approval) {
        const request = mock_data_1.inventoryRequests.find(r => r.id === requestId);
        if (!request)
            return null;
        request.approvals.push(Object.assign(Object.assign({}, approval), { timestamp: new Date().toISOString() }));
        if (approval.status === 'Approved') {
            request.approvalLevel += 1;
            // For demo, let's say 2 levels are enough
            if (request.approvalLevel >= 2) {
                request.status = 'Approved';
            }
            else {
                request.status = 'Partially Approved';
            }
        }
        else {
            request.status = 'Closed'; // Rejected/Closed
        }
        request.updatedAt = new Date().toISOString();
        return request;
    }
    static issueMaterials(requestId, issuedItems) {
        const request = mock_data_1.inventoryRequests.find(r => r.id === requestId);
        if (!request)
            return null;
        issuedItems.forEach(issued => {
            const item = request.items.find(i => i.itemId === issued.itemId);
            if (item) {
                item.quantityIssued = issued.quantityIssued;
            }
        });
        request.status = 'Issued';
        request.updatedAt = new Date().toISOString();
        return request;
    }
    static createReturn(returnRequest) {
        const newReturn = Object.assign({ id: 'IRN-' + Date.now(), projectId: returnRequest.projectId || '', taskId: returnRequest.taskId || '', subTaskId: returnRequest.subTaskId || '', warehouseId: returnRequest.warehouseId || 'W-MAIN', referenceRequestId: returnRequest.referenceRequestId || '', returnType: returnRequest.returnType || 'Excess', items: returnRequest.items || [], requestedBy: returnRequest.requestedBy || '', approvals: [], status: 'Submitted', createdAt: new Date().toISOString() }, returnRequest);
        mock_data_1.inventoryReturns.unshift(newReturn);
        return newReturn;
    }
}
exports.InventoryService = InventoryService;
