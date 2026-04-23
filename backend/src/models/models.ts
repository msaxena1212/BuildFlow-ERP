export interface Milestone {
  id: string;
  name: string;
  progress: number;
  color: string;
  startDate?: string;
  endDate?: string;
  subProjectIds?: string[]; // Linking to sub-projects
  tasks?: Task[];
}

export interface SubProject {
  id: string;
  projectId: string;
  name: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Delayed';
  startDate: string;
  endDate: string;
  progress: number;
  budget?: number;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  description: string;
  status: 'On Track' | 'At Risk' | 'Delayed' | 'Completed';
  progress: number;
  type: 'Commercial' | 'Residential' | 'Industrial';
  budget: {
    total: number;
    used: number;
  };
  team: {
    name: string;
    role: string;
    avatar: string;
  }[];
  milestones: Milestone[];
  subProjects?: SubProject[];
  lastUpdate: string;
  estimatedCompletion: string;
  thumbnail: string;
}

export type DependencyType = 'FS' | 'SS' | 'FF' | 'SF';

export interface TaskDependency {
  predecessorId: string;
  type: DependencyType;
  lag: number; // in days
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Delayed';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  deadline: string; 
  startDate?: string;
  endDate?: string;
  duration?: number;
  dependencies?: TaskDependency[];
  // Advanced Scheduling Fields
  earlyStart?: string;
  earlyFinish?: string;
  lateStart?: string;
  lateFinish?: string;
  totalFloat?: number; // in days
  freeFloat?: number;  // in days
  isCritical?: boolean;
}

export interface SiteUpdate {
  id: string;
  projectId: string;
  time: string;
  title: string;
  description: string;
  author: string;
  type: 'Safety' | 'Material' | 'Progress' | 'Archive';
}

export interface Material {
  name: string;
  sku: string;
  category: string;
  icon: string;
  bg: string;
  text: string;
  border?: string;
  stock: {
    current: number;
    total: number;
    percent: number;
  };
  cost: string;
  supplier: string;
  status: 'Optimal' | 'Adequate' | 'Critical';
}

export interface Vendor {
  id: number | string;
  name: string;
  type: string;
  email: string;
  phone: string;
  spoc: {
    name: string;
    role: string;
    phone: string;
    email: string;
  };
  kyc: {
    gst: string;
    pan: string;
  };
  address: {
    street: string;
    city: string;
    pincode: string;
  };
  projects: string[];
  balance: string;
  budget: string;
  status: 'Paid' | 'Pending' | 'Due' | 'Approved' | 'Onboarding';
  statusColor: string;
  icon: string;
  assignee: string;
  services: string[];
  contract?: {
    uploaded: boolean;
    fileName?: string;
    expiryDate?: string;
  };
  tasks: { title: string; status: string; date: string }[];
  audits: { date: string; score: number; notes: string }[];
  invoices: { number: string; amount: string; status: string; date: string }[];
}

export interface QuoteItem {
  materialSku: string;
  materialName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  vendorId: string | number;
  vendorName: string;
}

export interface Quote {
  id: string;
  quoteNumber: string;
  date: string;
  salesPerson: string;
  items: QuoteItem[];
  totalAmount: number;
  status: 'Draft' | 'Sent' | 'Negotiating' | 'Approved' | 'Rejected';
  vendorFeedback?: string;
  lastUpdated?: string;
}

export interface Contract {
  id: string;
  vendor: string;
  value: number;
  utilized: number;
  status: 'Active' | 'Expiring Soon' | 'Expired' | 'Terminated';
  effectiveDate: string;
  expiryDate: string;
  expiryDays: number;
  location: string;
  owner: string;
  type: string;
  signatory: string;
  contactEmail: string;
  contactPhone: string;
}

export interface ContractHistory {
  id: string;
  contractId: string;
  event: string;
  description: string;
  date: string;
  active: boolean;
}

export type PermissionAction = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'FULL';

export type AppModule = 'Dashboard' | 'Projects' | 'Team' | 'Contracts' | 'Tasks' | 'Materials' | 'Quotes' | 'Reports' | 'Settings';

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[]; // Format: "Module:Action" e.g., "Projects:CREATE"
  isSystem?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  roleId: string;
  status: 'Active' | 'Pending' | 'Deactivated';
  avatar?: string;
  department?: string;
  lastLogin?: string;
  assignedProjects?: string[];
  performance?: number; // 0-100
}

export interface ContractorMetric {
  id: string;
  name: string;
  efficiency: number;
  safetyScore: number;
  retentionRate: number;
  adherenceToSchedule: number;
  personnel: number;
  tasks: string; 
  logo?: string;
  trend: 'up' | 'down' | 'stable';
}

export interface LaborStats {
  activeCrews: number;
  totalPersonnel: number;
  skillCompliance: number;
  overtimeAlerts: number;
  skillsDistribution: { name: string; count: number; color: string }[];
  financials: {
    earnedValue: number;
    actualCost: number;
    cpi: number;
  };
}

export interface ReportVaultItem {
  id: string;
  title: string;
  type: 'Technical' | 'Financial' | 'Safety' | 'Quality' | 'Milestone';
  date: string;
  author: string;
  status: 'Published' | 'Draft' | 'Archived';
  fileSize: string;
}
