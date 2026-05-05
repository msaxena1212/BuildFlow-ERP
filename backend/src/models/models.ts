export interface ProjectDocument {
  id: string;
  name: string;
  type: 'Blueprint' | 'Permit' | 'Photo' | 'Invoice' | 'Safety' | 'General';
  url: string;
  uploadDate: string;
  uploadedBy: string;
  size?: string;
}

export interface SubTask {
  id: string;
  name: string;
  order: number;
  isCompleted: boolean;
  isChecklist: boolean;
  attachments?: ProjectDocument[];
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
  durationDays?: number; // For templates
  order: number;
  role?: string; // Assigned Role (e.g., 'Site Engineer')
  assignee?: string; // Actual User (mapped at instance level)
  subtasks?: SubTask[];
  dependencies?: TaskDependency[];
  attachments?: ProjectDocument[];
  // Advanced Scheduling Fields
  earlyStart?: string;
  earlyFinish?: string;
  lateStart?: string;
  lateFinish?: string;
  totalFloat?: number; // in days
  freeFloat?: number;  // in days
  isCritical?: boolean;
}

export interface SubMilestone {
  id: string;
  name: string;
  progress: number;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Delayed';
  startDate?: string;
  endDate?: string;
  durationDays?: number;
  order: number;
  tasks?: Task[];
  attachments?: ProjectDocument[];
}

export interface Milestone {
  id: string;
  name: string;
  progress: number;
  color: string;
  startDate?: string;
  endDate?: string;
  durationDays?: number;
  order: number;
  subProjectIds?: string[];
  subMilestones?: SubMilestone[];
  attachments?: ProjectDocument[];
}

export interface ProjectTemplate {
  id: string;
  name: string;
  type: 'Residential' | 'Commercial' | 'Industrial' | 'Infrastructure' | 'Institutional' | 'Renovation';
  version: string;
  milestones: Milestone[];
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

export interface CostBreakdown {
  labor: number;
  materials: number;
  subcontractors: number;
  other: number;
}

export interface POCMetric {
  period: string;
  budget: number;
  actual: number;
  revenue: number;
}

export interface POCFinancials {
  contractValue: number;
  estimatedTotalCost: number;
  actualCost: number;
  costBreakdown: CostBreakdown;
  completionPercentage: {
    calculated: number;
    manualOverride?: number;
    isManual: boolean;
  };
  revenueRecognized: number;
  invoicedAmount: number;
  unbilledRevenue: number;
  deferredRevenue: number;
  recognizedProfit: number;
  periodClosing: {
    lastCalculatedPeriod: string;
    approvalStatus: 'Pending' | 'Approved' | 'Rejected';
    approvedBy?: string;
  };
  historicalMetrics: POCMetric[];
}

export interface Project {
  id: string;
  name: string;
  location: string;
  description: string;
  status: 'On Track' | 'At Risk' | 'Delayed' | 'Completed';
  progress: number;
  type: 'Commercial' | 'Residential' | 'Industrial' | 'Infrastructure';
  budget: {
    total: number;
    used: number;
  };
  pocDetails?: POCFinancials;
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

export interface SiteUpdate {
  id: string;
  projectId: string;
  time: string;
  title: string;
  description: string;
  author: string;
  type: 'Safety' | 'Material' | 'Progress' | 'Archive';
  photoUrl?: string;
  geotag?: { lat: number; lng: number; timestamp: string };
}

export interface SiteInventory {
  projectId: string;
  projectName: string;
  stock: number;
}

export interface Material {
  name: string;
  sku: string;
  category: string;
  icon: string;
  bg: string;
  text: string;
  border?: string;
  unit: string;
  siteInventory: SiteInventory[];
  stock: {
    current: number;
    total: number;
    percent: number;
  };
  cost: string;
  supplier: string;
  status: 'Optimal' | 'Adequate' | 'Critical';
  // Intelligence Fields
  burnRate?: number; // Average units consumed per day
  safetyStock?: number; // Threshold to trigger reorder alert
  leadTime?: number; // Days from order to delivery
  daysToStockout?: number; // Calculated: current / burnRate
  autoReorderEnabled?: boolean;
}

export interface PurchaseRequisition {
  id: string;
  materialSku: string;
  materialName: string;
  quantity: number;
  unit: string;
  projectId: string;
  projectName: string;
  requestor: string;
  date: string;
  priority: 'Low' | 'Medium' | 'High' | 'Emergency';
  status: 'Pending' | 'Approved' | 'Ordered' | 'Received' | 'Rejected';
  notes?: string;
}

export interface StockTransfer {
  id: string;
  materialSku: string;
  materialName: string;
  fromProjectId: string;
  fromProjectName: string;
  toProjectId: string;
  toProjectName: string;
  quantity: number;
  unit: string;
  date: string;
  status: 'Draft' | 'Sent' | 'Received' | 'Cancelled';
  requestedBy: string;
}

export interface SettlementRequest {
  id: string;
  vendorId: number | string;
  projectId: string;
  requestDate: string;
  basis: 'POC' | 'Milestone' | 'LumpSum' | 'Retention';
  amount: number;
  workPercentage: number;
  milestoneId?: string;
  justification: string;
  status: 'Draft' | 'Pending' | 'Approved' | 'Paid';
}

export interface Vendor {
  id: number | string;
  name: string;
  type: string;
  email: string;
  phone: string;
  whatsapp?: string;

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
  logo?: string;
  location?: string;
  invoices: { number: string; amount: string; status: string; date: string }[];
  settlementRequests?: SettlementRequest[];
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

export interface Equipment {
  id: string;
  name: string;
  type: string;
  status: 'Active' | 'Under Maintenance' | 'Idle' | 'Damaged';
  health: number;
  lastService: string;
  nextService: string;
  assignedProject?: string;
  fuelLevel?: number;
  runtimeHours: number;
}

export interface SafetyIncident {
  id: string;
  title: string;
  date: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Reported' | 'Investigating' | 'Resolved' | 'Closed';
  reporter: string;
  description: string;
  category: 'Near Miss' | 'Injury' | 'Property Damage' | 'Environmental';
  correctiveAction?: string;
}
