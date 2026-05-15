import { Project } from '../models/models';
import { projects } from '../data/mock-data';

export interface ComplianceSubmission {
  id: string;
  projectId: string;
  projectName: string;
  authority: 'RERA' | 'Municipal' | 'Environmental' | 'Safety Board';
  documentType: 'POC Certificate' | 'Safety Audit' | 'Structural Integrity' | 'Environmental Impact';
  status: 'Pending' | 'Submitted' | 'Verified' | 'Rejected';
  submissionDate: string;
  verificationDate?: string;
  referenceNumber?: string;
}

export class ComplianceService {
  private static submissions: ComplianceSubmission[] = [];

  static getProjectSubmissions(projectId: string): ComplianceSubmission[] {
    return this.submissions.filter(s => s.projectId === projectId);
  }

  static submitToRegulatory(projectId: string, type: ComplianceSubmission['documentType']): ComplianceSubmission {
    const project = projects.find(p => p.id === projectId);
    if (!project) throw new Error('Project not found');

    const authorityMapping: Record<ComplianceSubmission['documentType'], ComplianceSubmission['authority']> = {
      'POC Certificate': 'RERA',
      'Safety Audit': 'Safety Board',
      'Structural Integrity': 'Municipal',
      'Environmental Impact': 'Environmental'
    };

    const submission: ComplianceSubmission = {
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

  static getComplianceHealth(projectId: string): { score: number; status: string; pendingSubmissions: number } {
    const subs = this.getProjectSubmissions(projectId);
    const verified = subs.filter(s => s.status === 'Verified').length;
    const pending = subs.filter(s => s.status === 'Submitted' || s.status === 'Pending').length;
    
    let score = 0;
    if (subs.length > 0) {
      score = Math.round((verified / subs.length) * 100);
    } else {
      score = 0; // No submissions yet
    }

    return {
      score,
      status: score > 80 ? 'Compliant' : (score > 50 ? 'Partial' : 'Non-Compliant'),
      pendingSubmissions: pending
    };
  }
}
