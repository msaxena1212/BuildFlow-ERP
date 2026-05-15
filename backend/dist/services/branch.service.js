"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchService = void 0;
const mock_data_1 = require("../data/mock-data");
class BranchService {
    static getAllBranches() {
        return mock_data_1.branches;
    }
    static getBranchById(id) {
        return mock_data_1.branches.find(b => b.id === id);
    }
    // 1. Initiate Settlement (Inter-Branch Settlements)
    static initiateSettlement(fromBranchId, toBranchId, amount, referenceType) {
        const fromBranch = this.getBranchById(fromBranchId);
        const toBranch = this.getBranchById(toBranchId);
        if (!fromBranch || !toBranch)
            throw new Error('Invalid Branch ID');
        // Check if "from" branch has enough balance in Settlement account
        const fromAccount = fromBranch.bankAccounts.find(a => a.type === 'Settlement');
        if (!fromAccount || fromAccount.balance < amount) {
            throw new Error('Insufficient balance in settlement account');
        }
        const settlement = {
            id: 'SET' + Date.now(),
            fromBranchId,
            toBranchId,
            amount,
            date: new Date().toISOString(),
            status: 'Pending',
            referenceType
        };
        mock_data_1.branchSettlements.push(settlement);
        this.triggerEmailAlert(`New Inter-Branch Settlement initiated from ${fromBranch.name} to ${toBranch.name} for ₹${amount}.`, fromBranch.code);
        return settlement;
    }
    // 2. Complete Settlement (Fund Transfer)
    static completeSettlement(settlementId) {
        const settlement = mock_data_1.branchSettlements.find(s => s.id === settlementId);
        if (!settlement || settlement.status === 'Completed')
            return null;
        const fromBranch = this.getBranchById(settlement.fromBranchId);
        const toBranch = this.getBranchById(settlement.toBranchId);
        if (fromBranch && toBranch) {
            const fromAccount = fromBranch.bankAccounts.find(a => a.type === 'Settlement');
            const toAccount = toBranch.bankAccounts.find(a => a.type === 'Settlement');
            if (fromAccount && toAccount) {
                fromAccount.balance -= settlement.amount;
                toAccount.balance += settlement.amount;
                settlement.status = 'Completed';
                this.triggerEmailAlert(`Settlement ${settlementId} completed. Funds transferred.`, fromBranch.code);
            }
        }
        return settlement;
    }
    // 3. Automated Cost Sharing
    static runAutoCostSharing(commonExpenseAmount, branchIds) {
        const share = commonExpenseAmount / branchIds.length;
        branchIds.forEach(id => {
            if (id === 'BR-HO')
                return; // HO doesn't pay itself in this mock
            this.initiateSettlement(id, 'BR-HO', share, 'CommonCostSharing');
        });
    }
    static triggerEmailAlert(message, branchCode) {
        const alert = {
            id: 'EA' + Date.now(),
            recipientId: 'finance-admin@buildflow.com',
            subject: `Branch Operations: ${branchCode}`,
            body: message,
            triggeredAt: new Date().toISOString(),
            read: false
        };
        mock_data_1.emailAlerts.push(alert);
    }
}
exports.BranchService = BranchService;
