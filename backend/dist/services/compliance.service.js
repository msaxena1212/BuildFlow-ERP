"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplianceService = void 0;
const mock_data_1 = require("../data/mock-data");
class ComplianceService {
    static getProjectSubmissions(projectId) {
        return this.submissions.filter(s => s.projectId === projectId);
    }
    static submitToRegulatory(projectId, type) {
        const project = mock_data_1.projects.find(p => p.id === projectId);
        if (!project)
            throw new Error('Project not found');
        const authorityMapping = {
            'POC Certificate': 'RERA',
            'Safety Audit': 'Safety Board',
            'Structural Integrity': 'Municipal',
            'Environmental Impact': 'Environmental'
        };
        const submission = {
            id: `SUB-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
            projectId,
            projectName: project.name,
            authority: authorityMapping[type],
            documentType: type,
            status: 'Submitted',
            submissionDate: new Date().toISOString().split('T')[0],
            referenceNumber: `REF-${Math.floor(Math.random() * 1000000)}`
        };
        this.submissions.push(submission);
        // Simulate async verification
        setTimeout(() => {
            submission.status = 'Verified';
            submission.verificationDate = new Date().toISOString().split('T')[0];
            console.log(`[ComplianceService] Submission ${submission.id} verified by ${submission.authority}`);
        }, 5000);
        return submission;
    }
    static getComplianceHealth(projectId) {
        const subs = this.getProjectSubmissions(projectId);
        const verified = subs.filter(s => s.status === 'Verified').length;
        const pending = subs.filter(s => s.status === 'Submitted' || s.status === 'Pending').length;
        let score = 0;
        if (subs.length > 0) {
            score = Math.round((verified / subs.length) * 100);
        }
        else {
            score = 0; // No submissions yet
        }
        return {
            score,
            status: score > 80 ? 'Compliant' : (score > 50 ? 'Partial' : 'Non-Compliant'),
            pendingSubmissions: pending
        };
    }
}
exports.ComplianceService = ComplianceService;
ComplianceService.submissions = [];
