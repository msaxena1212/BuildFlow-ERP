import { inventoryRequests, inventoryReturns } from '../data/mock-data';
import { InventoryRequest, InventoryReturn, InventoryApproval, InventoryItem } from '../models/models';

export class InventoryService {
  
  static getRequests(): InventoryRequest[] {
    return inventoryRequests;
  }

  static getReturns(): InventoryReturn[] {
    return inventoryReturns;
  }

  static createRequest(request: Partial<InventoryRequest>): InventoryRequest {
    const newRequest: InventoryRequest = {
      id: 'IR-' + Date.now(),
      projectId: request.projectId || '',
      taskId: request.taskId || '',
      subTaskId: request.subTaskId || '',
      requestedBy: request.requestedBy || '',
      requestedRole: request.requestedRole || '',
      siteId: request.siteId || '',
      items: request.items || [],
      status: 'Submitted',
      approvalLevel: 0,
      approvals: [],
      warehouseId: request.warehouseId || 'W-MAIN',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...request
    };
    inventoryRequests.unshift(newRequest);
    return newRequest;
  }

  static approveRequest(requestId: string, approval: InventoryApproval): InventoryRequest | null {
    const request = inventoryRequests.find(r => r.id === requestId);
    if (!request) return null;

    request.approvals.push({
      ...approval,
      timestamp: new Date().toISOString()
    });

    if (approval.status === 'Approved') {
      request.approvalLevel += 1;
      // For demo, let's say 2 levels are enough
      if (request.approvalLevel >= 2) {
        request.status = 'Approved';
      } else {
        request.status = 'Partially Approved';
      }
    } else {
      request.status = 'Closed'; // Rejected/Closed
    }

    request.updatedAt = new Date().toISOString();
    return request;
  }

  static issueMaterials(requestId: string, issuedItems: { itemId: string, quantityIssued: number }[]): InventoryRequest | null {
    const request = inventoryRequests.find(r => r.id === requestId);
    if (!request) return null;

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

  static createReturn(returnRequest: Partial<InventoryReturn>): InventoryReturn {
    const newReturn: InventoryReturn = {
      id: 'IRN-' + Date.now(),
      projectId: returnRequest.projectId || '',
      taskId: returnRequest.taskId || '',
      subTaskId: returnRequest.subTaskId || '',
      warehouseId: returnRequest.warehouseId || 'W-MAIN',
      referenceRequestId: returnRequest.referenceRequestId || '',
      returnType: returnRequest.returnType || 'Excess',
      items: returnRequest.items || [],
      requestedBy: returnRequest.requestedBy || '',
      approvals: [],
      status: 'Submitted',
      createdAt: new Date().toISOString(),
      ...returnRequest
    };
    inventoryReturns.unshift(newReturn);
    return newReturn;
  }
}
