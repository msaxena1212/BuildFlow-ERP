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
  milestones: {
    name: string;
    progress: number;
    color: string;
  }[];
  lastUpdate: string;
  estimatedCompletion: string;
  thumbnail: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Delayed';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  deadline: string;
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

