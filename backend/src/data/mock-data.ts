import { Project, Task, SiteUpdate, Material, Vendor, Quote, Contract, ContractHistory, Role, TeamMember, ContractorMetric, LaborStats, ReportVaultItem, PurchaseRequisition, StockTransfer, Equipment, SafetyIncident, ProjectTemplate, MaterialReturn, InventoryRequest, InventoryReturn, Branch, Expense, GuaranteeTracking, BillingDocument, BranchSettlement, Lead, Sale, Tender, PurchaseOrder, Invoice, InvoiceApproval, CreditDebitNote, CollectionTracking, EmailAlert, MilestoneBilling } from '../models/models';

export const leads: Lead[] = [
  {
    id: 'L1',
    projectCode: 'BF-P1-BLR',
    source: 'Referral',
    title: 'High‑rise office tower',
    value: 200000000,
    status: 'New',
    createdAt: new Date().toISOString()
  }
];

export const sales: Sale[] = [
  {
    id: 'S1',
    projectCode: 'BF-P1-BLR',
    type: 'Private',
    customerName: 'Acme Corp',
    amount: 150000000,
    contractId: 'c123',
    status: 'Pending',
    createdAt: new Date().toISOString()
  }
];

export const tenders: Tender[] = [
  {
    id: 'T1',
    projectCode: 'BF-P2-MUM',
    description: 'Bridge construction tender',
    estimatedValue: 80000000,
    submissionDate: '2026-03-15',
    status: 'Open'
  }
];

export const purchaseOrders: PurchaseOrder[] = [
  {
    id: 'PO1',
    projectCode: 'BF-P1-BLR',
    vendorId: 'v1',
    quantity: 500,
    unit: 'MT',
    tenureMonths: 12,
    createdAt: new Date().toISOString(),
    status: 'Draft'
  }
];

export const invoices: Invoice[] = [];
export const invoiceApprovals: InvoiceApproval[] = [];
export const creditDebitNotes: CreditDebitNote[] = [];
export const collectionTrackings: CollectionTracking[] = [];
export const emailAlerts: EmailAlert[] = [];
export const milestoneBillings: MilestoneBilling[] = [];

export const projects: Project[] = [
  {
    id: 'p1',
    projectCode: 'BF-P1-BLR',
    branchId: 'BR-BLR',
    name: 'Prestige Tech Park, Bangalore',
    location: 'Outer Ring Road, Kadubeesanahalli',
    description: 'A 45-story commercial tower with sustainable architecture.',
    status: 'On Track',
    progress: 45,
    type: 'Commercial',
    budget: { total: 120000000, used: 45000000, provisioned: 110000000 },
    pocDetails: {
      contractValue: 150000000,
      estimatedTotalCost: 120000000,
      actualCost: 24785450,
      costBreakdown: {
        labor: 5510070,
        materials: 15769040,
        subcontractors: 1250000,
        other: 2256340
      },
      completionPercentage: { calculated: 20.65, isManual: false },
      revenueRecognized: 30975000,
      invoicedAmount: 50000000,
      unbilledRevenue: 0,
      deferredRevenue: 19025000,
      recognizedProfit: 6189550,
      periodClosing: { lastCalculatedPeriod: '2024-05', approvalStatus: 'Approved' },
      historicalMetrics: [
        { period: 'Jan', budget: 5000000, actual: 4800000, revenue: 6000000 },
        { period: 'Feb', budget: 12000000, actual: 11500000, revenue: 15000000 },
        { period: 'Mar', budget: 18000000, actual: 19000000, revenue: 22000000 },
        { period: 'Apr', budget: 24000000, actual: 24785450, revenue: 30975000 },
        { period: 'May', budget: 30000000, actual: 24785450, revenue: 30975000 }
      ]
    },
    team: [
      { name: 'Arjun Mehra', role: 'Project Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' },
      { name: 'Priya Sharma', role: 'Construction Lead', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' }
    ],
    milestones: [
      { 
        id: 'm1', name: 'Phase 1: Excavation & Foundation', order: 1, progress: 100, color: 'blue-500', startDate: '2026-01-01', endDate: '2026-03-31', subProjectIds: ['sp1'],
        subMilestones: [
          { id: 'sm1', name: 'Site Setup', order: 1, progress: 100, status: 'Completed', startDate: '2026-01-01', endDate: '2026-01-15' },
          { id: 'sm2', name: 'Deep Excavation', order: 2, progress: 100, status: 'Completed', startDate: '2026-01-16', endDate: '2026-02-28' }
        ]
      },
      { 
        id: 'm2', name: 'Phase 2: Structural Core', order: 2, progress: 30, color: 'indigo-500', startDate: '2026-04-01', endDate: '2026-08-31', subProjectIds: ['sp2'],
        subMilestones: [
          { id: 'sm3', name: 'L1-L5 Columns', order: 1, progress: 80, status: 'In Progress', startDate: '2026-04-01', endDate: '2026-05-15' },
          { id: 'sm4', name: 'L6-L10 Framing', order: 2, progress: 0, status: 'Pending', startDate: '2026-05-16', endDate: '2026-06-30' }
        ]
      }
    ],
    subProjects: [
      { id: 'sp1', projectId: 'p1', name: 'Site Clearing & Grading', description: 'Initial site prep and leveling.', status: 'Completed', startDate: '2026-01-01', endDate: '2026-02-15', progress: 100 },
      { id: 'sp2', projectId: 'p1', name: 'Steel Framework Level 1-10', description: 'Core steel structure installation.', status: 'In Progress', startDate: '2026-04-05', endDate: '2026-06-30', progress: 45 }
    ],
    lastUpdate: '1 day ago',
    estimatedCompletion: '2027-12-15',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'p2',
    projectCode: 'BF-P2-MUM',
    branchId: 'BR-MUM',
    name: 'Coastal Road Project, Mumbai',
    location: 'Worli-Marine Drive Stretch',
    description: 'Major infrastructure development connecting Worli to Marine Drive.',
    status: 'At Risk',
    progress: 32,
    type: 'Industrial',
    budget: { total: 80000000, used: 55000000, provisioned: 75000000 },
    pocDetails: {
      contractValue: 100000000,
      estimatedTotalCost: 80000000,
      actualCost: 55000000,
      costBreakdown: {
        labor: 30000000,
        materials: 15000000,
        subcontractors: 8000000,
        other: 2000000
      },
      completionPercentage: { calculated: 68.75, isManual: false },
      revenueRecognized: 68750000,
      invoicedAmount: 70000000,
      unbilledRevenue: 0,
      deferredRevenue: 1250000,
      recognizedProfit: 13750000,
      periodClosing: { lastCalculatedPeriod: '2026-03', approvalStatus: 'Approved' },
      historicalMetrics: [
        { period: 'Jan', budget: 10000000, actual: 12000000, revenue: 12500000 },
        { period: 'Feb', budget: 30000000, actual: 35000000, revenue: 37500000 },
        { period: 'Mar', budget: 50000000, actual: 55000000, revenue: 62500000 }
      ]
    },
    team: [
      { name: 'Rahul Deshmukh', role: 'Senior Manager', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop' }
    ],
    milestones: [
      { id: 'm3', name: 'Land Reclamation', order: 1, progress: 100, color: 'primary', startDate: '2026-02-01', endDate: '2026-03-15' },
      { id: 'm4', name: 'Bridge Piling', order: 2, progress: 15, color: 'secondary', startDate: '2026-03-16', endDate: '2026-05-30' }
    ],
    lastUpdate: '5 hours ago',
    estimatedCompletion: 'Apr 25, 2026',
    thumbnail: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'p3',
    projectCode: 'BF-P3-MUM',
    branchId: 'BR-MUM',
    name: 'South Bombay Apartment Rework',
    location: 'Colaba, Mumbai',
    description: 'High-end interior renovation and structural restoration.',
    status: 'On Track',
    progress: 12,
    type: 'Renovation',
    budget: { total: 4500000, used: 550000 },
    team: [
      { name: 'Priya Verma', role: 'Interior Designer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' },
      { name: 'Anthony G.', role: 'Carpenter', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop' }
    ],
    milestones: [
      { 
        id: 'r-m1', name: 'Milestone 1: Inspection & Demolition', order: 1, progress: 80, color: 'rose-500', startDate: '2026-05-01', endDate: '2026-05-15',
        subMilestones: [
          { id: 'r-sm1', name: 'Site Inspection', order: 1, progress: 100, status: 'Completed', startDate: '2026-05-01', endDate: '2026-05-05' },
          { id: 'r-sm2', name: 'Kitchen Demolition', order: 2, progress: 60, status: 'In Progress', startDate: '2026-05-06', endDate: '2026-05-15' }
        ]
      }
    ],
    lastUpdate: 'Active Now',
    estimatedCompletion: 'Aug 15, 2026',
    thumbnail: 'https://images.unsplash.com/photo-1581850518616-bcb8077fa2aa?q=80&w=1000&auto=format&fit=crop'
  }
];

export const updates: SiteUpdate[] = [
  {
    id: 'u1',
    projectId: 'p1',
    time: '2 hours ago',
    title: 'Safety Check Passed',
    description: 'Skyline Tower Phase II - All protocols cleared by inspector Dave.',
    author: 'Dave',
    type: 'Safety',
    photoUrl: 'https://images.unsplash.com/photo-1589939705384-5185138a027d?q=80&w=500',
    geotag: { lat: 12.9235, lng: 77.6712, timestamp: '2026-05-05T09:12:00Z' }
  },

  {
    id: 'u2',
    projectId: 'p2',
    time: '5 hours ago',
    title: 'Material Delivery Delay',
    description: 'Concrete batch delayed by 4 hours for Harbor Bridge site.',
    author: 'Logistics',
    type: 'Material',
    photoUrl: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=500',
    geotag: { lat: 18.9220, lng: 72.8347, timestamp: '2026-05-05T06:45:00Z' }
  }

];

export const materials: Material[] = [
  { 
    name: 'Concrete Mix Grade-A', sku: 'CON-442-B', category: 'Concrete', icon: 'texture', bg: 'bg-slate-100', text: 'text-slate-400', unit: 'Cum',
    siteInventory: [
      { projectId: 'p1', projectName: 'Prestige Tech Park, Bangalore', stock: 250 },
      { projectId: 'p2', projectName: 'Coastal Road Project, Mumbai', stock: 170 }
    ],
    stock: { current: 420, total: 500, percent: 84 }, cost: '₹14,500', supplier: 'UltraTech Cement Ltd.', status: 'Optimal' 
  },
  { 
    name: 'Rebar Steel 12mm', sku: 'STL-12-REB', category: 'Steel', icon: 'grid_4x4', bg: 'bg-amber-50', text: 'text-secondary-container', border: 'border-amber-100', unit: 'MT',
    siteInventory: [
      { projectId: 'p1', projectName: 'Prestige Tech Park, Bangalore', stock: 15 },
      { projectId: 'p2', projectName: 'Coastal Road Project, Mumbai', stock: 30 }
    ],
    stock: { current: 45, total: 300, percent: 15 }, cost: '₹65,000', supplier: 'JSW Steel', status: 'Critical' 
  },
  { 
    name: 'Copper Wiring 2.5mm', sku: 'ELEC-WR-25', category: 'Electrical', icon: 'bolt', bg: 'bg-slate-100', text: 'text-slate-400', unit: 'Meters',
    siteInventory: [
      { projectId: 'p1', projectName: 'Prestige Tech Park, Bangalore', stock: 800 },
      { projectId: 'p2', projectName: 'Coastal Road Project, Mumbai', stock: 400 }
    ],
    stock: { current: 1200, total: 2000, percent: 60 }, cost: '₹120', supplier: 'Tata Power Solutions', status: 'Adequate' 
  },
  { 
    name: 'Structural Lumber 2x4', sku: 'LUM-24-12', category: 'Lumber', icon: 'forest', bg: 'bg-slate-100', text: 'text-slate-400', unit: 'Units',
    siteInventory: [
      { projectId: 'p1', projectName: 'Prestige Tech Park, Bangalore', stock: 50 },
      { projectId: 'p2', projectName: 'Coastal Road Project, Mumbai', stock: 100 }
    ],
    stock: { current: 150, total: 800, percent: 18.75 }, cost: '₹412', supplier: 'Timber India', status: 'Critical' 
  }
];

export const purchaseRequisitions: PurchaseRequisition[] = [
  {
    id: 'PR-001',
    materialSku: 'STL-12-REB',
    materialName: 'Rebar Steel 12mm',
    quantity: 50,
    unit: 'MT',
    projectId: 'p1',
    projectName: 'Prestige Tech Park, Bangalore',
    requestor: 'Priya Sharma',
    date: '2026-05-04',
    priority: 'High',
    status: 'Pending',
    notes: 'Urgent requirement for L6-L10 Framing phase.'
  },
  {
    id: 'PR-002',
    materialSku: 'LUM-24-12',
    materialName: 'Structural Lumber 2x4',
    quantity: 200,
    unit: 'Units',
    projectId: 'p2',
    projectName: 'Coastal Road Project, Mumbai',
    requestor: 'Rajesh Khanna',
    date: '2026-05-03',
    priority: 'Medium',
    status: 'Approved',
    notes: 'Periodic restock for site scaffolding.'
  }
];

export const stockTransfers: StockTransfer[] = [
  {
    id: 'TR-101',
    materialSku: 'CON-442-B',
    materialName: 'Concrete Mix Grade-A',
    fromProjectId: 'p1',
    fromProjectName: 'Prestige Tech Park, Bangalore',
    toProjectId: 'p2',
    toProjectName: 'Coastal Road Project, Mumbai',
    quantity: 30,
    unit: 'Cum',
    date: '2026-05-04',
    status: 'Sent',
    requestedBy: 'Arjun Mehra'
  }
];

export const materialReturns: MaterialReturn[] = [
  {
    id: 'RET-001',
    materialSku: 'STL-12-REB',
    materialName: 'Rebar Steel 12mm',
    projectId: 'p2',
    projectName: 'Coastal Road Project, Mumbai',
    quantity: 5,
    unit: 'MT',
    reason: 'Surplus',
    status: 'Approved',
    requestDate: '2026-05-04',
    requestedBy: 'Rajesh Khanna'
  }
];

export const tasks: Task[] = [
  { 
    id: 't1', 
    projectId: 'p1', 
    title: 'Foundation Pour', 
    order: 1,
    description: 'Complete the main foundation pour for the North Wing.', 
    status: 'Completed', 
    priority: 'High', 
    deadline: '2026-04-05',
    startDate: '2026-04-01',
    endDate: '2026-04-05',
    duration: 5,
    dependencies: [],
    earlyStart: '2026-04-01',
    earlyFinish: '2026-04-05',
    lateStart: '2026-04-01',
    lateFinish: '2026-04-05',
    totalFloat: 0,
    freeFloat: 0,
    isCritical: true
  },
  { 
    id: 't2', 
    projectId: 'p1', 
    title: 'Steel Reinforcement', 
    order: 2,
    description: 'Install rebar for level 1-4 columns.', 
    status: 'In Progress', 
    priority: 'Critical', 
    deadline: '2026-04-12',
    startDate: '2026-04-06',
    endDate: '2026-04-12',
    duration: 7,
    dependencies: [
      { predecessorId: 't1', type: 'FS', lag: 1 }
    ],
    earlyStart: '2026-04-06',
    earlyFinish: '2026-04-12',
    lateStart: '2026-04-06',
    lateFinish: '2026-04-12',
    totalFloat: 0,
    freeFloat: 0,
    isCritical: true
  },
  { 
    id: 't3', 
    projectId: 'p2', 
    title: 'Scaffolding Safety Audit', 
    order: 3, 
    description: 'Inspect all suspended scaffolds on the West Pier.', 
    status: 'Pending', 
    priority: 'Medium', 
    deadline: '2026-04-18',
    startDate: '2026-04-15',
    endDate: '2026-04-18',
    duration: 3,
    dependencies: []
  }
];

export const vendors: Vendor[] = [
  { 
    id: 1, name: 'Tata Power Solutions', type: 'Subcontractor', email: 'contact@tatapower.com', phone: '+91 22 6665 8282',
    spoc: { name: 'Vikram Singh', role: 'Ops Lead', phone: '+91 98200 12345', email: 'vikram.s@tatapower.com' },
    kyc: { gst: '27AAAAA0000A1Z5', pan: 'ABCDE1234F' },
    address: { street: 'Carnac Bunder', city: 'Mumbai', pincode: '400001' },
    projects: ['Prestige Tech Park, Bangalore', 'Coastal Road Project, Mumbai'], balance: '₹5,052,500.00', budget: '₹50,000,000', status: 'Due', 
    statusColor: 'bg-red-100 text-red-700', icon: 'electric_bolt', assignee: 'Priya Sharma',
    services: ['Electrical Wiring', 'Substation Setup', 'HVAC Controls'],
    tasks: [
      { title: 'Wiring Phase 1 - 4th Floor', status: 'Completed', date: 'Apr 05, 2026' },
      { title: 'External Transformer Installation', status: 'In Progress', date: 'Apr 12, 2026' }
    ],
    audits: [{ date: 'Apr 02, 2026', score: 98, notes: 'Excellent compliance' }],
    logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=100&auto=format&fit=crop',
    location: 'Mumbai, MH',
    invoices: [
      { number: 'SET-BATCH-001', amount: '₹5,052,500.00', status: 'Pending', date: 'Apr 14, 2026' },
      { number: 'INV-1029', amount: '₹1,250,000.00', status: 'Paid', date: 'Apr 08, 2026' }
    ],
    settlementRequests: [
      {
        id: 'sr1',
        vendorId: 1,
        projectId: 'p1',
        requestDate: '2026-04-14',
        basis: 'POC',
        amount: 5052500,
        workPercentage: 20.65,
        justification: 'Based on current Project POC of 20.65%. Total Earned: ₹17,552,500. Already Invoiced: ₹12,500,000.',
        status: 'Pending'
      }
    ]
  },
  { 
    id: 2, name: 'UltraTech Cement Ltd.', type: 'Supplier', email: 'billing@ultratech.com', phone: '+91 22 6691 7000',
    spoc: { name: 'Sanjay Dutt', role: 'Sales Head', phone: '+91 99300 54321', email: 'sanjay.d@ultratech.com' },
    kyc: { gst: '27BBBBB1111B2Z6', pan: 'FGHIJ5678K' },
    address: { street: 'Ahura Centre', city: 'Mumbai', pincode: '400093' },
    projects: ['Prestige Tech Park, Bangalore'], balance: '₹2,450,000.00', budget: '₹25,000,000', status: 'Pending', 
    statusColor: 'bg-secondary-container/20 text-secondary', icon: 'foundation', assignee: 'Arjun Mehra',
    services: ['Ready-mix Concrete', 'Aggregate Supply'],
    tasks: [{ title: 'Foundation Pour - Block A', status: 'Scheduled', date: 'Apr 15, 2026' }],
    audits: [{ date: 'Apr 05, 2026', score: 92, notes: 'Good turnaround time' }],
    logo: 'https://images.unsplash.com/photo-1581094288338-2314dddb7903?q=80&w=100&auto=format&fit=crop',
    location: 'Mumbai, MH',
    invoices: [
      { number: 'SET-BATCH-002', amount: '₹2,450,000.00', status: 'Pending', date: 'Apr 14, 2026' },
      { number: 'INV-SR-9012', amount: '₹1,250,000.00', status: 'Pending', date: 'Apr 10, 2026' }
    ],
    settlementRequests: [
      {
        id: 'sr2',
        vendorId: 2,
        projectId: 'p1',
        requestDate: '2026-04-14',
        basis: 'LumpSum',
        amount: 2450000,
        workPercentage: 0,
        justification: 'Standard 10% Lump Sum payment request for this project phase.',
        status: 'Pending'
      }
    ]
  }
];

export const quotes: Quote[] = [];

export const contracts: Contract[] = [
  {
    id: 'c1',
    vendor: 'Titan Structural Steel, LLC',
    value: 1420000,
    utilized: 68,
    status: 'Active',
    effectiveDate: 'Apr 01, 2026',
    expiryDate: 'Apr 30, 2026',
    expiryDays: 9,
    location: 'Seattle, WA',
    owner: 'Marcus Thorne',
    type: 'Master Service Agreement',
    signatory: 'Robert Titan',
    contactEmail: 'r.titan@titansteel.com',
    contactPhone: '(206) 555-0122'
  },
  {
    id: 'c2',
    vendor: 'VoltStream Electrical',
    value: 850000,
    utilized: 45,
    status: 'Active',
    effectiveDate: 'Apr 02, 2026',
    expiryDate: 'Apr 20, 2026',
    expiryDays: 0,
    location: 'Bellevue, WA',
    owner: 'Sarah Chen',
    type: 'Subcontractor Agreement',
    signatory: 'Leo Volt',
    contactEmail: 'l.volt@voltstream.net',
    contactPhone: '(425) 555-0198'
  },
  {
    id: 'c3',
    vendor: 'Apex Concrete Co.',
    value: 2300000,
    utilized: 90,
    status: 'Expiring Soon',
    effectiveDate: 'Apr 05, 2026',
    expiryDate: 'Apr 15, 2026',
    expiryDays: 0,
    location: 'Seattle, WA',
    owner: 'James Wilson',
    type: 'Material Supply Contract',
    signatory: 'Sarah Jenkins',
    contactEmail: 's.jenkins@apexconcrete.com',
    contactPhone: '(206) 555-0144'
  }
];

export const contractHistory: ContractHistory[] = [
  { id: 'h1', contractId: 'c1', event: 'MSA Renewal Signed', description: 'Legally binding signature collected via DocuSign.', date: 'APR 01, 2026 • 14:32 PM', active: true },
  { id: 'h2', contractId: 'c1', event: 'Project Scope Amendment #03', description: 'Revised structural load requirements for Sky-Deck A.', date: 'APR 05, 2026', active: false },
  { id: 'h3', contractId: 'c2', event: 'Initial Partnership Onboarding', description: 'Vendor vetting and initial compliance certification.', date: 'APR 02, 2026', active: true },
  { id: 'h4', contractId: 'c3', event: 'Price Adjustment Clause Triggered', description: 'Material cost index hit 5% threshold, adjusting unit rates.', date: 'APR 10, 2026', active: true },
  { id: 'h5', contractId: 'c3', event: 'Initial Partnership Onboarding', description: 'Onboarded for foundation reinforcement phase.', date: 'APR 05, 2026', active: false }
];

export const roles: Role[] = [
  {
    id: 'r1',
    name: 'Administrator',
    description: 'Full access to all modules and system settings.',
    isSystem: true,
    permissions: [
      'Dashboard:CREATE', 'Dashboard:READ', 'Dashboard:UPDATE', 'Dashboard:DELETE',
      'Projects:CREATE', 'Projects:READ', 'Projects:UPDATE', 'Projects:DELETE',
      'Team:CREATE', 'Team:READ', 'Team:UPDATE', 'Team:DELETE',
      'Contracts:CREATE', 'Contracts:READ', 'Contracts:UPDATE', 'Contracts:DELETE',
      'Tasks:CREATE', 'Tasks:READ', 'Tasks:UPDATE', 'Tasks:DELETE',
      'Materials:CREATE', 'Materials:READ', 'Materials:UPDATE', 'Materials:DELETE',
      'Quotes:CREATE', 'Quotes:READ', 'Quotes:UPDATE', 'Quotes:DELETE',
      'Reports:CREATE', 'Reports:READ', 'Reports:UPDATE', 'Reports:DELETE',
      'Settings:CREATE', 'Settings:READ', 'Settings:UPDATE', 'Settings:DELETE'
    ]
  },
  {
    id: 'r2',
    name: 'Project Manager',
    description: 'Manage projects, tasks, and vendor contracts.',
    permissions: [
      'Dashboard:READ',
      'Projects:CREATE', 'Projects:READ', 'Projects:UPDATE', 'Projects:DELETE',
      'Team:READ',
      'Contracts:CREATE', 'Contracts:READ', 'Contracts:UPDATE', 'Contracts:DELETE',
      'Tasks:CREATE', 'Tasks:READ', 'Tasks:UPDATE', 'Tasks:DELETE',
      'Materials:READ',
      'Quotes:READ', 'Quotes:UPDATE',
      'Reports:READ', 'Reports:UPDATE'
    ]
  },
  {
    id: 'r3',
    name: 'Site Engineer',
    description: 'Manage site tasks and daily progress reporting.',
    permissions: [
      'Dashboard:READ',
      'Projects:READ',
      'Tasks:CREATE', 'Tasks:READ', 'Tasks:UPDATE', 'Tasks:DELETE',
      'Materials:READ',
      'Reports:CREATE', 'Reports:READ', 'Reports:UPDATE'
    ]
  },
  {
    id: 'r4',
    name: 'Accountant',
    description: 'Manage financial records, quotes, and contract billing.',
    permissions: [
      'Dashboard:READ',
      'Projects:READ',
      'Contracts:READ', 'Contracts:UPDATE',
      'Materials:READ',
      'Quotes:CREATE', 'Quotes:READ', 'Quotes:UPDATE', 'Quotes:DELETE',
      'Reports:READ'
    ]
  },
  {
    id: 'r5',
    name: 'Viewer',
    description: 'Read-only access to the entire platform.',
    permissions: [
      'Dashboard:READ', 'Projects:READ', 'Team:READ', 'Contracts:READ',
      'Tasks:READ', 'Materials:READ', 'Quotes:READ', 'Reports:READ'
    ]
  },
  {
    id: 'r6',
    name: 'Process Engineer',
    description: 'Specialized in process design and engineering for industrial projects.',
    permissions: ['Dashboard:READ', 'Projects:READ', 'Tasks:READ', 'Tasks:UPDATE', 'Reports:CREATE', 'Reports:READ']
  },
  {
    id: 'r7',
    name: 'Mechanical Engineer',
    description: 'Responsible for mechanical systems and equipment engineering.',
    permissions: ['Dashboard:READ', 'Projects:READ', 'Tasks:READ', 'Tasks:UPDATE', 'Reports:CREATE', 'Reports:READ']
  },
  {
    id: 'r8',
    name: 'Electrical Engineer',
    description: 'Manages electrical systems, load calculations, and routing.',
    permissions: ['Dashboard:READ', 'Projects:READ', 'Tasks:READ', 'Tasks:UPDATE', 'Reports:CREATE', 'Reports:READ']
  },
  {
    id: 'r9',
    name: 'Safety Officer',
    description: 'Ensures compliance with safety protocols and manages risk assessments.',
    permissions: ['Dashboard:READ', 'Projects:READ', 'Tasks:READ', 'Tasks:UPDATE', 'Reports:CREATE', 'Reports:READ', 'Safety:FULL']
  },
  {
    id: 'r10',
    name: 'QA/QC Engineer',
    description: 'Handles quality assurance and quality control across project phases.',
    permissions: ['Dashboard:READ', 'Projects:READ', 'Tasks:READ', 'Tasks:UPDATE', 'Reports:CREATE', 'Reports:READ']
  },
  {
    id: 'r11',
    name: 'Surveyor',
    description: 'Expert in land surveying, topographical mapping, and boundary marking.',
    permissions: ['Dashboard:READ', 'Projects:READ', 'Tasks:READ', 'Tasks:UPDATE', 'Reports:CREATE', 'Reports:READ']
  },
  {
    id: 'r12',
    name: 'Civil Engineer',
    description: 'Specialized in infrastructure, road work, and structural civil design.',
    permissions: ['Dashboard:READ', 'Projects:READ', 'Tasks:READ', 'Tasks:UPDATE', 'Reports:CREATE', 'Reports:READ']
  },
  {
    id: 'r13',
    name: 'Compliance Officer',
    description: 'Expert in regulatory approvals, government permissions, and safety certifications.',
    permissions: ['Dashboard:READ', 'Projects:READ', 'Tasks:READ', 'Tasks:UPDATE', 'Reports:CREATE', 'Reports:READ', 'Approvals:FULL']
  },
  {
    id: 'r14',
    name: 'Interior Designer',
    description: 'Specialized in space planning, aesthetics, and material selection.',
    permissions: ['Dashboard:READ', 'Projects:READ', 'Tasks:READ', 'Tasks:UPDATE']
  },
  {
    id: 'r15',
    name: 'Electrician',
    description: 'Handles electrical wiring, rework, and fixture installation.',
    permissions: ['Dashboard:READ', 'Tasks:READ', 'Tasks:UPDATE']
  },
  {
    id: 'r16',
    name: 'Plumber',
    description: 'Handles plumbing modifications and leak testing.',
    permissions: ['Dashboard:READ', 'Tasks:READ', 'Tasks:UPDATE']
  },
  {
    id: 'r17',
    name: 'Carpenter',
    description: 'Specialized in modular furniture and woodwork.',
    permissions: ['Dashboard:READ', 'Tasks:READ', 'Tasks:UPDATE']
  },
  {
    id: 'r18',
    name: 'Painter',
    description: 'Handles wall finishes, putty, and painting.',
    permissions: ['Dashboard:READ', 'Tasks:READ', 'Tasks:UPDATE']
  }
];

export const teamMembers: TeamMember[] = [
  { 
    id: 'm1', name: 'Arjun Mehra', email: 'arjun.mehra@buildflow.in', roleId: 'r1', status: 'Active', 
    department: 'Executive Management', lastLogin: '10 mins ago', assignedProjects: ['Prestige Tech Park, Bangalore', 'Coastal Road Project, Mumbai'], performance: 98,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' 
  },
  { 
    id: 'm2', name: 'Priya Sharma', email: 'priya.s@buildflow.in', roleId: 'r2', status: 'Active', 
    department: 'Architecture & Design', lastLogin: '2 hours ago', assignedProjects: ['Prestige Tech Park, Bangalore'], performance: 94,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' 
  },
  { 
    id: 'm3', name: 'Rajesh Khanna', email: 'rajesh.k@buildflow.in', roleId: 'r1', status: 'Active', 
    department: 'Operations', lastLogin: 'Yesterday', assignedProjects: ['Coastal Road Project, Mumbai'], performance: 92,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop' 
  },
  { id: 'm4', name: 'Vikram Singh', email: 'vikram.s@tatapower.com', roleId: 'r5', status: 'Pending', department: 'External Consultants', lastLogin: 'N/A', assignedProjects: [], performance: 0 },
  { id: 'm5', name: 'Sanjay Gupta', email: 'sanjay.g@buildflow.in', roleId: 'r3', status: 'Active', department: 'Civil Engineering', lastLogin: '3 hours ago', assignedProjects: ['Prestige Tech Park, Bangalore'], performance: 88 },
  { id: 'm6', name: 'Amit Verma', email: 'amit.v@buildflow.in', roleId: 'r4', status: 'Active', department: 'Finance', lastLogin: 'Active Now', assignedProjects: ['Corporate Audit'], performance: 96 }
];

export const contractorMetrics: ContractorMetric[] = [
  { id: 'c1', name: 'UltraTech Cement Ltd.', efficiency: 94.8, safetyScore: 98.2, retentionRate: 92, adherenceToSchedule: 96, personnel: 112, tasks: '28/30', logo: 'https://images.unsplash.com/photo-1581094288338-2314dddb7903?q=80&w=100&auto=format&fit=crop', trend: 'up' },
  { id: 'c2', name: 'Tata Power Solutions', efficiency: 88.2, safetyScore: 95.0, retentionRate: 85, adherenceToSchedule: 82, personnel: 45, tasks: '15/17', logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=100&auto=format&fit=crop', trend: 'stable' },
  { id: 'c3', name: 'JSW Steel', efficiency: 76.5, safetyScore: 82.4, retentionRate: 70, adherenceToSchedule: 65, personnel: 240, tasks: '42/55', logo: 'https://ui-avatars.com/api/?name=JSW+Steel&background=0D47A1&color=fff', trend: 'down' },
  { id: 'c4', name: 'Hindware Bathware', efficiency: 91.0, safetyScore: 99.0, retentionRate: 95, adherenceToSchedule: 92, personnel: 32, tasks: '12/12', logo: 'https://ui-avatars.com/api/?name=Hindware&background=E65100&color=fff', trend: 'up' }
];

export const laborStats: LaborStats = {
  activeCrews: 42,
  totalPersonnel: 156,
  skillCompliance: 94.5,
  overtimeAlerts: 3,
  skillsDistribution: [
    { name: 'Masonry', count: 45, color: '#3b82f6' },
    { name: 'Electrical', count: 28, color: '#f59e0b' },
    { name: 'Structural Steel', count: 35, color: '#ef4444' },
    { name: 'Plumbing', count: 22, color: '#10b981' },
    { name: 'Foremen', count: 12, color: '#6366f1' },
    { name: 'Safety Officers', count: 14, color: '#ec4899' }
  ],
  financials: {
    earnedValue: 845000,
    actualCost: 912000,
    cpi: 0.93
  }
};

export const reportVault: ReportVaultItem[] = [
  { id: 'r1', title: 'Site Safety Audit - Week 31', type: 'Safety', date: 'Apr 05, 2026', author: 'Sanjay Gupta', status: 'Published', fileSize: '2.4 MB' },
  { id: 'r2', title: 'Q1 Financial Performance', type: 'Financial', date: 'Apr 02, 2026', author: 'Amit Verma', status: 'Published', fileSize: '4.1 MB' },
  { id: 'r3', title: 'North Wing Structural Review', type: 'Technical', date: 'Mar 28, 2026', author: 'Priya Sharma', status: 'Archived', fileSize: '12.8 MB' },
  { id: 'r4', title: 'Monthly Progress Summary - March', type: 'Milestone', date: 'Mar 31, 2026', author: 'Arjun Mehra', status: 'Published', fileSize: '1.2 MB' },
  { id: 'r5', title: 'Weekly Material Audit - W32', type: 'Technical', date: 'Apr 12, 2026', author: 'Logistics Team', status: 'Draft', fileSize: '850 KB' }
];

export const equipment: Equipment[] = [
  { id: 'e1', name: 'Tower Crane - TC01', type: 'Crane', status: 'Active', health: 92, lastService: '2024-03-15', nextService: '2024-06-15', assignedProject: 'Prestige Tech Park', fuelLevel: 85, runtimeHours: 1240 },
  { id: 'e2', name: 'Excavator - EX04', type: 'Earthmover', status: 'Under Maintenance', health: 45, lastService: '2024-01-10', nextService: '2024-05-10', assignedProject: 'Harbor Bridge', runtimeHours: 3500 },
  { id: 'e3', name: 'Concrete Mixer - MX12', type: 'Mixer', status: 'Idle', health: 78, lastService: '2024-04-01', nextService: '2024-07-01', runtimeHours: 850 }
];

export const projectTemplates: ProjectTemplate[] = [
  {
    id: 'res-001',
    name: 'Residential Building Master Template',
    type: 'Residential',
    version: '2.0',
    milestones: [
      {
        id: 'm1', name: 'Planning & Approvals', order: 1, durationDays: 45, color: 'blue', progress: 0,
        subMilestones: [
          { 
            id: 'sm1-1', name: 'Requirement Gathering', order: 1, durationDays: 7, progress: 0, status: 'Pending',
            tasks: [
              { 
                id: 't1-1-1', title: 'Client Discussion', order: 1, durationDays: 7, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Project Lead',
                subtasks: [
                  { id: 'st1-1-1-1', name: 'Understand budget', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'st1-1-1-2', name: 'Capture requirements', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'st1-1-1-3', name: 'Finalize scope', order: 3, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          },
          {
            id: 'sm1-2', name: 'Design Phase', order: 2, durationDays: 21, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 't1-2-1', title: 'Architectural Design', order: 1, durationDays: 14, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Architect',
                subtasks: [
                  { id: 'st1-2-1-1', name: 'Floor plan creation', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'st1-2-1-2', name: 'Elevation design', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'st1-2-1-3', name: '3D visualization', order: 3, isCompleted: false, isChecklist: true }
                ]
              },
              {
                id: 't1-2-2', title: 'Structural Design', order: 2, durationDays: 7, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Structural Engineer',
                subtasks: [
                  { id: 'st1-2-2-1', name: 'Load calculations', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'st1-2-2-2', name: 'Column layout', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'st1-2-2-3', name: 'Beam design', order: 3, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          },
          {
            id: 'sm1-3', name: 'Government Approvals', order: 3, durationDays: 17, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 't1-3-1', title: 'Permit Application', order: 1, durationDays: 17, projectId: '', status: 'Pending', priority: 'Critical', deadline: '', role: 'Compliance Officer',
                subtasks: [
                  { id: 'st1-3-1-1', name: 'Prepare documents', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'st1-3-1-2', name: 'Submit application', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'st1-3-1-3', name: 'Follow-up with Authorities', order: 3, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'm2', name: 'Site Preparation & Foundation', order: 2, durationDays: 35, color: 'orange', progress: 0,
        subMilestones: [
          {
            id: 'sm2-1', name: 'Site Clearing', order: 1, durationDays: 5, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 't2-1-1', title: 'Cleaning Site', order: 1, durationDays: 5, projectId: '', status: 'Pending', priority: 'Medium', deadline: '', role: 'Site Engineer',
                subtasks: [
                  { id: 'st2-1-1-1', name: 'Remove debris', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'st2-1-1-2', name: 'Level ground', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          },
          {
            id: 'sm2-2', name: 'Soil Testing', order: 2, durationDays: 5, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 't2-2-1', title: 'Soil Analysis', order: 1, durationDays: 5, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Geotechnical Engineer',
                subtasks: [
                  { id: 'st2-2-1-1', name: 'Collect samples', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'st2-2-1-2', name: 'Lab testing', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'st2-2-1-3', name: 'Report generation', order: 3, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          },
          {
            id: 'sm2-3', name: 'Foundation Work', order: 3, durationDays: 25, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 't2-3-1', title: 'Excavation', order: 1, durationDays: 10, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Site Engineer',
                subtasks: [
                  { id: 'st2-3-1-1', name: 'Mark layout', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'st2-3-1-2', name: 'Excavation work', order: 2, isCompleted: false, isChecklist: true }
                ]
              },
              {
                id: 't2-3-2', title: 'Footing Construction', order: 2, durationDays: 15, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Site Engineer',
                subtasks: [
                  { id: 'st2-3-2-1', name: 'Reinforcement setup', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'st2-3-2-2', name: 'Concrete pouring', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'm3', name: 'Structural Masonry', order: 3, durationDays: 60, color: 'indigo', progress: 0,
        subMilestones: [
          {
            id: 'sm3-1', name: 'Columns & Slabs', order: 1, durationDays: 30, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 't3-1-1', title: 'Column Casting', order: 1, durationDays: 15, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Site Engineer',
                subtasks: [
                  { id: 'st3-1-1-1', name: 'Steel binding', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'st3-1-1-2', name: 'Shuttering', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'st3-1-1-3', name: 'Concrete pouring', order: 3, isCompleted: false, isChecklist: true }
                ]
              },
              {
                id: 't3-1-2', title: 'Slab Work', order: 2, durationDays: 15, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Site Engineer',
                subtasks: [
                  { id: 'st3-1-2-1', name: 'Centering work', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'st3-1-2-2', name: 'Reinforcement', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'st3-1-2-3', name: 'Concrete pour', order: 3, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          },
          {
            id: 'sm3-2', name: 'Brickwork & Plastering', order: 2, durationDays: 30, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 't3-2-1', title: 'Wall Construction', order: 1, durationDays: 15, projectId: '', status: 'Pending', priority: 'Medium', deadline: '', role: 'Contractor',
                subtasks: [
                  { id: 'st3-2-1-1', name: 'Material setup', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'st3-2-1-2', name: 'Brick laying', order: 2, isCompleted: false, isChecklist: true }
                ]
              },
              {
                id: 't3-2-2', title: 'Plastering Work', order: 2, durationDays: 15, projectId: '', status: 'Pending', priority: 'Medium', deadline: '', role: 'Contractor',
                subtasks: [
                  { id: 'st3-2-2-1', name: 'Internal Plaster', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'st3-2-2-2', name: 'External Plaster', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'm4', name: 'MEP & Finishing', order: 4, durationDays: 50, color: 'green', progress: 0,
        subMilestones: [
          {
            id: 'sm4-1', name: 'Electrical & Plumbing', order: 1, durationDays: 20, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 't4-1-1', title: 'Electrical Wiring', order: 1, durationDays: 10, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Electrician',
                subtasks: [
                  { id: 'st4-1-1-1', name: 'Layout planning', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'st4-1-1-2', name: 'Wire installation', order: 2, isCompleted: false, isChecklist: true }
                ]
              },
              {
                id: 't4-1-2', title: 'Pipe Installation', order: 2, durationDays: 10, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Plumber',
                subtasks: [
                  { id: 'st4-1-2-1', name: 'Water line setup', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'st4-1-2-2', name: 'Drainage setup', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          },
          {
            id: 'sm4-2', name: 'Finishing Work', order: 2, durationDays: 30, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 't4-2-1', title: 'Flooring & Painting', order: 1, durationDays: 20, projectId: '', status: 'Pending', priority: 'Medium', deadline: '', role: 'Finishing Lead',
                subtasks: [
                  { id: 'st4-2-1-1', name: 'Tile installation', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'st4-2-1-2', name: 'Interior Painting', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'st4-2-1-3', name: 'Exterior Painting', order: 3, isCompleted: false, isChecklist: true }
                ]
              },
              {
                id: 't4-2-2', title: 'Fixtures & Handover', order: 2, durationDays: 10, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Project Lead',
                subtasks: [
                  { id: 'st4-2-2-1', name: 'Install Fixtures', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'st4-2-2-2', name: 'Quality Check', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'st4-2-2-3', name: 'Final Handover', order: 3, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'comm-001',
    name: 'Commercial Complex Master Template',
    type: 'Commercial',
    version: '1.5',
    milestones: [
      {
        id: 'c-m1', name: 'Pre-Construction & Planning', order: 1, durationDays: 60, color: 'blue', progress: 0,
        subMilestones: [
          {
            id: 'c-sm1-1', name: 'Feasibility Study', order: 1, durationDays: 15, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'c-t1-1-1', title: 'Market Analysis', order: 1, durationDays: 10, projectId: '', status: 'Pending', priority: 'Medium', deadline: '', role: 'Market Analyst',
                subtasks: [
                  { id: 'c-st1-1-1-1', name: 'Location analysis', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'c-st1-1-1-2', name: 'Demand estimation', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          },
          {
            id: 'c-sm1-2', name: 'Design & Engineering', order: 2, durationDays: 30, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'c-t1-2-1', title: 'Architectural Design', order: 1, durationDays: 20, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Lead Architect',
                subtasks: [
                  { id: 'c-st1-2-1-1', name: 'Concept design', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'c-st1-2-1-2', name: 'Layout planning', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'c-st1-2-1-3', name: 'Client approval', order: 3, isCompleted: false, isChecklist: true }
                ]
              },
              {
                id: 'c-t1-2-2', title: 'MEP Design', order: 2, durationDays: 15, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'MEP Engineer',
                subtasks: [
                  { id: 'c-st1-2-2-1', name: 'HVAC planning', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'c-st1-2-2-2', name: 'Electrical layout', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'c-m2', name: 'Procurement & Site Setup', order: 2, durationDays: 40, color: 'orange', progress: 0,
        subMilestones: [
          {
            id: 'c-sm2-1', name: 'Vendor Finalization', order: 1, durationDays: 20, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'c-t2-1-1', title: 'Contractor Selection', order: 1, durationDays: 20, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Procurement Manager',
                subtasks: [
                  { id: 'c-st2-1-1-1', name: 'Tender floating', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'c-st2-1-1-2', name: 'Bid evaluation', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'c-m3', name: 'Substructure Work', order: 3, durationDays: 45, color: 'indigo', progress: 0,
        subMilestones: [
          {
            id: 'c-sm3-1', name: 'Excavation & Piling', order: 1, durationDays: 25, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'c-t3-1-1', title: 'Excavation Work', order: 1, durationDays: 15, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Site Engineer',
                subtasks: [
                  { id: 'c-st3-1-1-1', name: 'Machinery deployment', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'c-st3-1-1-2', name: 'Soil removal', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'c-m4', name: 'Superstructure Work', order: 4, durationDays: 90, color: 'emerald', progress: 0,
        subMilestones: [
          {
            id: 'c-sm4-1', name: 'Structural Frame', order: 1, durationDays: 60, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'c-t4-1-1', title: 'Slab Casting', order: 1, durationDays: 20, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Structural Engineer',
                subtasks: [
                  { id: 'c-st4-1-1-1', name: 'Centering work', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'c-st4-1-1-2', name: 'Reinforcement', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'c-st4-1-1-3', name: 'Concrete pouring', order: 3, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'c-m5', name: 'MEP & Facade', order: 5, durationDays: 70, color: 'cyan', progress: 0,
        subMilestones: [
          {
            id: 'c-sm5-1', name: 'External Facade', order: 1, durationDays: 40, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'c-t5-1-1', title: 'Exterior Cladding', order: 1, durationDays: 30, projectId: '', status: 'Pending', priority: 'Medium', deadline: '', role: 'Facade Specialist',
                subtasks: [
                  { id: 'c-st5-1-1-1', name: 'Material installation', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'c-st5-1-1-2', name: 'Finishing', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'c-m6', name: 'Testing & Commissioning', order: 6, durationDays: 30, color: 'amber', progress: 0,
        subMilestones: [
          {
            id: 'c-sm6-1', name: 'System Testing', order: 1, durationDays: 20, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'c-t6-1-1', title: 'HVAC Testing', order: 1, durationDays: 10, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'MEP Engineer',
                subtasks: [
                  { id: 'c-st6-1-1-1', name: 'Performance testing', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'c-st6-1-1-2', name: 'Calibration', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          },
          {
            id: 'c-sm6-2', name: 'Compliance Check', order: 2, durationDays: 10, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'c-t6-2-1', title: 'Safety Inspection', order: 1, durationDays: 10, projectId: '', status: 'Pending', priority: 'Critical', deadline: '', role: 'QA/QC Engineer',
                subtasks: [
                  { id: 'c-st6-2-1-1', name: 'Fire safety check', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'c-st6-2-1-2', name: 'Regulatory compliance', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'ind-001',
    name: 'Industrial Facility Construction Master Template',
    type: 'Industrial',
    version: '1.0',
    milestones: [
      {
        id: 'i-m1', name: 'Feasibility & Concept Planning', order: 1, durationDays: 30, color: 'blue', progress: 0,
        subMilestones: [
          {
            id: 'i-sm1-1', name: 'Feasibility Study', order: 1, durationDays: 15, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'i-t1-1-1', title: 'Technical Feasibility', order: 1, durationDays: 7, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Process Engineer',
                subtasks: [
                  { id: 'i-st1-1-1-1', name: 'Site suitability analysis', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'i-st1-1-1-2', name: 'Utility availability check', order: 2, isCompleted: false, isChecklist: true }
                ]
              },
              {
                id: 'i-t1-1-2', title: 'Financial Feasibility', order: 2, durationDays: 8, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Project Manager',
                subtasks: [
                  { id: 'i-st1-1-2-1', name: 'Cost estimation', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'i-st1-1-2-2', name: 'ROI analysis', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          },
          {
            id: 'i-sm1-2', name: 'Concept Design', order: 2, durationDays: 15, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'i-t1-2-1', title: 'Process Planning', order: 1, durationDays: 10, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Process Engineer',
                subtasks: [
                  { id: 'i-st1-2-1-1', name: 'Define production flow', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'i-st1-2-1-2', name: 'Equipment requirement', order: 2, isCompleted: false, isChecklist: true }
                ]
              },
              {
                id: 'i-t1-2-2', title: 'Layout Planning', order: 2, durationDays: 5, projectId: '', status: 'Pending', priority: 'Medium', deadline: '', role: 'Mechanical Engineer',
                subtasks: [
                  { id: 'i-st1-2-2-1', name: 'Plant layout design', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'i-st1-2-2-2', name: 'Material flow mapping', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'i-m2', name: 'Detailed Engineering', order: 2, durationDays: 60, color: 'indigo', progress: 0,
        subMilestones: [
          {
            id: 'i-sm2-1', name: 'Basic Engineering', order: 1, durationDays: 20, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'i-t2-1-1', title: 'Process Design', order: 1, durationDays: 20, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Process Engineer',
                subtasks: [
                  { id: 'i-st2-1-1-1', name: 'PFD (Process Flow Diagram)', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'i-st2-1-1-2', name: 'Mass balance', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'i-t1-2-1', type: 'FS', lag: 0 }]
              }
            ]
          },
          {
            id: 'i-sm2-2', name: 'Detailed Engineering', order: 2, durationDays: 40, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'i-t2-2-1', title: 'Structural Engineering', order: 1, durationDays: 10, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Structural Engineer',
                subtasks: [
                  { id: 'i-st2-2-1-1', name: 'Load calculations', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'i-st2-2-1-2', name: 'Steel structure design', order: 2, isCompleted: false, isChecklist: true }
                ]
              },
              {
                id: 'i-t2-2-2', title: 'Mechanical Engineering', order: 2, durationDays: 10, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Mechanical Engineer',
                subtasks: [
                  { id: 'i-st2-2-2-1', name: 'Equipment specification', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'i-st2-2-2-2', name: 'Vendor drawings', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'i-t2-1-1', type: 'FS', lag: 0 }]
              },
              {
                id: 'i-t2-2-3', title: 'Electrical Engineering', order: 3, durationDays: 10, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Electrical Engineer',
                subtasks: [
                  { id: 'i-st2-2-3-1', name: 'Load calculations', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'i-st2-2-3-2', name: 'Cable routing', order: 2, isCompleted: false, isChecklist: true }
                ]
              },
              {
                id: 'i-t2-2-4', title: 'Instrumentation', order: 4, durationDays: 10, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Process Engineer',
                subtasks: [
                  { id: 'i-st2-2-4-1', name: 'Control system design', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'i-st2-2-4-2', name: 'Sensor selection', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'i-m3', name: 'Approvals & Compliance', order: 3, durationDays: 45, color: 'amber', progress: 0,
        subMilestones: [
          {
            id: 'i-sm3-1', name: 'Regulatory Approvals', order: 1, durationDays: 25, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'i-t3-1-1', title: 'Government Permits', order: 1, durationDays: 25, projectId: '', status: 'Pending', priority: 'Critical', deadline: '', role: 'Project Manager',
                subtasks: [
                  { id: 'i-st3-1-1-1', name: 'Documentation', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'i-st3-1-1-2', name: 'Submission', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'i-st3-1-1-3', name: 'Follow-up', order: 3, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          },
          {
            id: 'i-sm3-2', name: 'Safety & Environmental', order: 2, durationDays: 20, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'i-t3-2-1', title: 'Environmental Clearance', order: 1, durationDays: 10, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Safety Officer',
                subtasks: [
                  { id: 'i-st3-2-1-1', name: 'Impact assessment', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'i-st3-2-1-2', name: 'Approval', order: 2, isCompleted: false, isChecklist: true }
                ]
              },
              {
                id: 'i-t3-2-2', title: 'Safety Planning', order: 2, durationDays: 10, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Safety Officer',
                subtasks: [
                  { id: 'i-st3-2-2-1', name: 'Risk assessment', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'i-st3-2-2-2', name: 'Safety plan approval', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'i-m4', name: 'Procurement', order: 4, durationDays: 90, color: 'orange', progress: 0,
        subMilestones: [
          {
            id: 'i-sm4-1', name: 'Vendor Finalization', order: 1, durationDays: 45, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'i-t4-1-1', title: 'Equipment Procurement', order: 1, durationDays: 45, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Project Manager',
                subtasks: [
                  { id: 'i-st4-1-1-1', name: 'RFQ preparation', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'i-st4-1-1-2', name: 'Vendor evaluation', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'i-st4-1-1-3', name: 'Purchase order', order: 3, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'i-t2-2-2', type: 'FS', lag: 5 }]
              }
            ]
          },
          {
            id: 'i-sm4-2', name: 'Material Procurement', order: 2, durationDays: 45, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'i-t4-2-1', title: 'Bulk Material Purchase', order: 1, durationDays: 45, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Project Manager',
                subtasks: [
                  { id: 'i-st4-2-1-1', name: 'Cement & steel procurement', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'i-st4-2-1-2', name: 'Inventory planning', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'i-m5', name: 'Site Preparation & Civil Work', order: 5, durationDays: 60, color: 'teal', progress: 0,
        subMilestones: [
          {
            id: 'i-sm5-1', name: 'Site Development', order: 1, durationDays: 20, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'i-t5-1-1', title: 'Land Preparation', order: 1, durationDays: 20, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Site Engineer',
                subtasks: [
                  { id: 'i-st5-1-1-1', name: 'Clearing & leveling', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'i-st5-1-1-2', name: 'Boundary setup', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          },
          {
            id: 'i-sm5-2', name: 'Foundation Work', order: 2, durationDays: 40, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'i-t5-2-1', title: 'Heavy Foundation', order: 1, durationDays: 40, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Site Engineer',
                subtasks: [
                  { id: 'i-st5-2-1-1', name: 'Excavation', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'i-st5-2-1-2', name: 'Reinforcement', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'i-st5-2-1-3', name: 'Concrete pouring', order: 3, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'i-t4-2-1', type: 'FS', lag: 0 }]
              }
            ]
          }
        ]
      },
      {
        id: 'i-m6', name: 'Structural & Building Work', order: 6, durationDays: 75, color: 'emerald', progress: 0,
        subMilestones: [
          {
            id: 'i-sm6-1', name: 'Steel Structure', order: 1, durationDays: 45, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'i-t6-1-1', title: 'Fabrication', order: 1, durationDays: 20, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Mechanical Engineer',
                subtasks: [
                  { id: 'i-st6-1-1-1', name: 'Steel cutting', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'i-st6-1-1-2', name: 'Welding', order: 2, isCompleted: false, isChecklist: true }
                ]
              },
              {
                id: 'i-t6-1-2', title: 'Erection', order: 2, durationDays: 25, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Mechanical Engineer',
                subtasks: [
                  { id: 'i-st6-1-2-1', name: 'Column erection', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'i-st6-1-2-2', name: 'Beam installation', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'i-t6-1-1', type: 'FS', lag: 0 }, { predecessorId: 'i-t5-2-1', type: 'FS', lag: 0 }]
              }
            ]
          },
          {
            id: 'i-sm6-2', name: 'Building Construction', order: 2, durationDays: 30, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'i-t6-2-1', title: 'Industrial Shed', order: 1, durationDays: 30, projectId: '', status: 'Pending', priority: 'Medium', deadline: '', role: 'Site Engineer',
                subtasks: [
                  { id: 'i-st6-2-1-1', name: 'Roofing', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'i-st6-2-1-2', name: 'Cladding', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'i-t6-1-2', type: 'FS', lag: 0 }]
              }
            ]
          }
        ]
      },
      {
        id: 'i-m7', name: 'Equipment Installation', order: 7, durationDays: 60, color: 'cyan', progress: 0,
        subMilestones: [
          {
            id: 'i-sm7-1', name: 'Machinery Installation', order: 1, durationDays: 40, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'i-t7-1-1', title: 'Equipment Setup', order: 1, durationDays: 40, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Mechanical Engineer',
                subtasks: [
                  { id: 'i-st7-1-1-1', name: 'Equipment positioning', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'i-st7-1-1-2', name: 'Alignment', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'i-t6-1-2', type: 'FS', lag: 0 }, { predecessorId: 'i-t4-1-1', type: 'FS', lag: 10 }]
              }
            ]
          },
          {
            id: 'i-sm7-2', name: 'Utility Systems', order: 2, durationDays: 20, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'i-t7-2-1', title: 'Utility Installation', order: 1, durationDays: 20, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Mechanical Engineer',
                subtasks: [
                  { id: 'i-st7-2-1-1', name: 'Boiler setup', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'i-st7-2-1-2', name: 'Compressor installation', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'i-m8', name: 'MEP & Instrumentation', order: 8, durationDays: 50, color: 'sky', progress: 0,
        subMilestones: [
          {
            id: 'i-sm8-1', name: 'Electrical Systems', order: 1, durationDays: 20, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'i-t8-1-1', title: 'Electrical Installation', order: 1, durationDays: 20, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Electrical Engineer',
                subtasks: [
                  { id: 'i-st8-1-1-1', name: 'Cable laying', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'i-st8-1-1-2', name: 'Panel installation', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'i-t6-2-1', type: 'FS', lag: 0 }]
              }
            ]
          },
          {
            id: 'i-sm8-2', name: 'Instrumentation', order: 2, durationDays: 15, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'i-t8-2-1', title: 'Control Systems', order: 1, durationDays: 15, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Electrical Engineer',
                subtasks: [
                  { id: 'i-st8-2-1-1', name: 'Sensor installation', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'i-st8-2-1-2', name: 'PLC setup', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'i-t8-1-1', type: 'FS', lag: 0 }]
              }
            ]
          },
          {
            id: 'i-sm8-3', name: 'Piping Systems', order: 3, durationDays: 15, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'i-t8-3-1', title: 'Piping Installation', order: 1, durationDays: 15, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Mechanical Engineer',
                subtasks: [
                  { id: 'i-st8-3-1-1', name: 'Pipe fitting', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'i-st8-3-1-2', name: 'Pressure testing', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'i-t7-1-1', type: 'FS', lag: 0 }]
              }
            ]
          }
        ]
      },
      {
        id: 'i-m9', name: 'Testing & Commissioning', order: 9, durationDays: 40, color: 'rose', progress: 0,
        subMilestones: [
          {
            id: 'i-sm9-1', name: 'Pre-Commissioning', order: 1, durationDays: 20, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'i-t9-1-1', title: 'System Checks', order: 1, durationDays: 20, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'QA/QC Engineer',
                subtasks: [
                  { id: 'i-st9-1-1-1', name: 'Equipment inspection', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'i-st9-1-1-2', name: 'Trial runs', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'i-t8-2-1', type: 'FS', lag: 0 }, { predecessorId: 'i-t8-3-1', type: 'FS', lag: 0 }]
              }
            ]
          },
          {
            id: 'i-sm9-2', name: 'Commissioning', order: 2, durationDays: 20, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'i-t9-2-1', title: 'Plant Commissioning', order: 1, durationDays: 20, projectId: '', status: 'Pending', priority: 'Critical', deadline: '', role: 'Process Engineer',
                subtasks: [
                  { id: 'i-st9-2-1-1', name: 'Dry run', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'i-st9-2-1-2', name: 'Load testing', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'i-t9-1-1', type: 'FS', lag: 0 }]
              }
            ]
          }
        ]
      },
      {
        id: 'i-m10', name: 'Handover & Operations', order: 10, durationDays: 20, color: 'violet', progress: 0,
        subMilestones: [
          {
            id: 'i-sm10-1', name: 'Documentation', order: 1, durationDays: 10, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'i-t10-1-1', title: 'Project Documentation', order: 1, durationDays: 10, projectId: '', status: 'Pending', priority: 'Medium', deadline: '', role: 'Project Manager',
                subtasks: [
                  { id: 'i-st10-1-1-1', name: 'As-built drawings', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'i-st10-1-1-2', name: 'Manuals', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'i-t9-2-1', type: 'FS', lag: 0 }]
              }
            ]
          },
          {
            id: 'i-sm10-2', name: 'Final Handover', order: 2, durationDays: 10, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'i-t10-2-1', title: 'Client Handover', order: 1, durationDays: 10, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Project Manager',
                subtasks: [
                  { id: 'i-st10-2-1-1', name: 'Training', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'i-st10-2-1-2', name: 'Final sign-off', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'i-t10-1-1', type: 'FS', lag: 0 }]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'infra-001',
    name: 'Infrastructure / Civil Construction Master Template',
    type: 'Infrastructure',
    version: '1.0',
    milestones: [
      {
        id: 'inf-m1', name: 'Feasibility & Survey', order: 1, durationDays: 30, color: 'blue', progress: 0,
        subMilestones: [
          {
            id: 'inf-sm1-1', name: 'Feasibility Study', order: 1, durationDays: 10, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inf-t1-1-1', title: 'Project Assessment', order: 1, durationDays: 10, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Project Manager',
                subtasks: [
                  { id: 'inf-st1-1-1-1', name: 'Site feasibility', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inf-st1-1-1-2', name: 'Traffic / usage analysis', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'inf-st1-1-1-3', name: 'Cost estimation', order: 3, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          },
          {
            id: 'inf-sm1-2', name: 'Survey & Investigation', order: 2, durationDays: 20, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inf-t1-2-1', title: 'Land Survey', order: 1, durationDays: 10, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Surveyor',
                subtasks: [
                  { id: 'inf-st1-2-1-1', name: 'Topographical survey', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inf-st1-2-1-2', name: 'Boundary marking', order: 2, isCompleted: false, isChecklist: true }
                ]
              },
              {
                id: 'inf-t1-2-2', title: 'Soil Investigation', order: 2, durationDays: 10, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Civil Engineer',
                subtasks: [
                  { id: 'inf-st1-2-2-1', name: 'Borehole drilling', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inf-st1-2-2-2', name: 'Soil testing', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'inf-st1-2-2-3', name: 'Report preparation', order: 3, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'inf-m2', name: 'Design & Approvals', order: 2, durationDays: 45, color: 'indigo', progress: 0,
        subMilestones: [
          {
            id: 'inf-sm2-1', name: 'Engineering Design', order: 1, durationDays: 30, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inf-t2-1-1', title: 'Civil Design', order: 1, durationDays: 20, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Civil Engineer',
                subtasks: [
                  { id: 'inf-st2-1-1-1', name: 'Alignment design', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inf-st2-1-1-2', name: 'Structural drawings', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'inf-t1-2-1', type: 'FS', lag: 0 }]
              },
              {
                id: 'inf-t2-1-2', title: 'Drainage Design', order: 2, durationDays: 10, projectId: '', status: 'Pending', priority: 'Medium', deadline: '', role: 'Civil Engineer',
                subtasks: [
                  { id: 'inf-st2-1-2-1', name: 'Water flow analysis', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inf-st2-1-2-2', name: 'Drain layout', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          },
          {
            id: 'inf-sm2-2', name: 'Approvals', order: 2, durationDays: 15, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inf-t2-2-1', title: 'Government Approvals', order: 1, durationDays: 15, projectId: '', status: 'Pending', priority: 'Critical', deadline: '', role: 'Project Manager',
                subtasks: [
                  { id: 'inf-st2-2-1-1', name: 'Documentation', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inf-st2-2-1-2', name: 'Submission', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'inf-st2-2-1-3', name: 'Approval follow-up', order: 3, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'inf-t2-1-1', type: 'FS', lag: 0 }]
              },
              {
                id: 'inf-t2-2-2', title: 'Environmental Clearance', order: 2, durationDays: 15, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Safety Officer',
                subtasks: [
                  { id: 'inf-st2-2-2-1', name: 'Impact study', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inf-st2-2-2-2', name: 'Compliance approval', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'inf-m3', name: 'Land Acquisition & Mobilization', order: 3, durationDays: 40, color: 'amber', progress: 0,
        subMilestones: [
          {
            id: 'inf-sm3-1', name: 'Land Acquisition', order: 1, durationDays: 30, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inf-t3-1-1', title: 'Land Clearance', order: 1, durationDays: 30, projectId: '', status: 'Pending', priority: 'Critical', deadline: '', role: 'Project Manager',
                subtasks: [
                  { id: 'inf-st3-1-1-1', name: 'Legal verification', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inf-st3-1-1-2', name: 'Compensation processing', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          },
          {
            id: 'inf-sm3-2', name: 'Site Mobilization', order: 2, durationDays: 10, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inf-t3-2-1', title: 'Resource Deployment', order: 1, durationDays: 10, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Site Engineer',
                subtasks: [
                  { id: 'inf-st3-2-1-1', name: 'Machinery mobilization', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inf-st3-2-1-2', name: 'Workforce setup', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'inf-t3-1-1', type: 'FS', lag: 0 }]
              }
            ]
          }
        ]
      },
      {
        id: 'inf-m4', name: 'Earthwork & Subgrade', order: 4, durationDays: 90, color: 'orange', progress: 0,
        subMilestones: [
          {
            id: 'inf-sm4-1', name: 'Clearing & Grubbing', order: 1, durationDays: 15, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inf-t4-1-1', title: 'Site Clearing', order: 1, durationDays: 15, projectId: '', status: 'Pending', priority: 'Medium', deadline: '', role: 'Site Engineer',
                subtasks: [
                  { id: 'inf-st4-1-1-1', name: 'Vegetation removal', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inf-st4-1-1-2', name: 'Debris disposal', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'inf-t3-2-1', type: 'FS', lag: 0 }]
              }
            ]
          },
          {
            id: 'inf-sm4-2', name: 'Earthwork', order: 2, durationDays: 45, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inf-t4-2-1', title: 'Excavation & Filling', order: 1, durationDays: 45, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Site Engineer',
                subtasks: [
                  { id: 'inf-st4-2-1-1', name: 'Cutting', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inf-st4-2-1-2', name: 'Filling', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'inf-st4-2-1-3', name: 'Compaction', order: 3, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'inf-t4-1-1', type: 'FS', lag: 0 }]
              }
            ]
          },
          {
            id: 'inf-sm4-3', name: 'Subgrade Preparation', order: 3, durationDays: 30, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inf-t4-3-1', title: 'Subgrade Work', order: 1, durationDays: 30, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Site Engineer',
                subtasks: [
                  { id: 'inf-st4-3-1-1', name: 'Leveling', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inf-st4-3-1-2', name: 'Compaction testing', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'inf-t4-2-1', type: 'FS', lag: 0 }]
              }
            ]
          }
        ]
      },
      {
        id: 'inf-m5', name: 'Structures (Bridge / Culvert / Drain)', order: 5, durationDays: 100, color: 'teal', progress: 0,
        subMilestones: [
          {
            id: 'inf-sm5-1', name: 'Foundation Work', order: 1, durationDays: 40, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inf-t5-1-1', title: 'Foundation Construction', order: 1, durationDays: 40, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Civil Engineer',
                subtasks: [
                  { id: 'inf-st5-1-1-1', name: 'Excavation', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inf-st5-1-1-2', name: 'Reinforcement', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'inf-st5-1-1-3', name: 'Concrete pouring', order: 3, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'inf-t4-1-1', type: 'FS', lag: 0 }]
              }
            ]
          },
          {
            id: 'inf-sm5-2', name: 'Superstructure', order: 2, durationDays: 60, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inf-t5-2-1', title: 'Structure Construction', order: 1, durationDays: 60, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Civil Engineer',
                subtasks: [
                  { id: 'inf-st5-2-1-1', name: 'Pier construction', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inf-st5-2-1-2', name: 'Deck slab', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'inf-t5-1-1', type: 'FS', lag: 0 }]
              }
            ]
          }
        ]
      },
      {
        id: 'inf-m6', name: 'Pavement / Road Work', order: 6, durationDays: 80, color: 'emerald', progress: 0,
        subMilestones: [
          {
            id: 'inf-sm6-1', name: 'Base Layer', order: 1, durationDays: 30, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inf-t6-1-1', title: 'Sub-base Construction', order: 1, durationDays: 30, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Site Engineer',
                subtasks: [
                  { id: 'inf-st6-1-1-1', name: 'Material spreading', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inf-st6-1-1-2', name: 'Compaction', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'inf-t4-3-1', type: 'FS', lag: 0 }]
              }
            ]
          },
          {
            id: 'inf-sm6-2', name: 'Surface Layer', order: 2, durationDays: 50, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inf-t6-2-1', title: 'Asphalt / Concrete Work', order: 1, durationDays: 50, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Site Engineer',
                subtasks: [
                  { id: 'inf-st6-2-1-1', name: 'Bitumen laying', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inf-st6-2-1-2', name: 'Rolling', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'inf-t6-1-1', type: 'FS', lag: 0 }]
              }
            ]
          }
        ]
      },
      {
        id: 'inf-m7', name: 'Utilities & Drainage', order: 7, durationDays: 40, color: 'cyan', progress: 0,
        subMilestones: [
          {
            id: 'inf-sm7-1', name: 'Utility Installation', order: 1, durationDays: 20, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inf-t7-1-1', title: 'Utility Work', order: 1, durationDays: 20, projectId: '', status: 'Pending', priority: 'Medium', deadline: '', role: 'Electrical Engineer',
                subtasks: [
                  { id: 'inf-st7-1-1-1', name: 'Water pipeline', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inf-st7-1-1-2', name: 'Electrical ducting', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          },
          {
            id: 'inf-sm7-2', name: 'Drainage', order: 2, durationDays: 20, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inf-t7-2-1', title: 'Drain Construction', order: 1, durationDays: 20, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Civil Engineer',
                subtasks: [
                  { id: 'inf-st7-2-1-1', name: 'Excavation', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inf-st7-2-1-2', name: 'Concrete lining', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'inf-t6-2-1', type: 'SS', lag: 5 }]
              }
            ]
          }
        ]
      },
      {
        id: 'inf-m8', name: 'Finishing Works', order: 8, durationDays: 30, color: 'sky', progress: 0,
        subMilestones: [
          {
            id: 'inf-sm8-1', name: 'Road Furniture', order: 1, durationDays: 15, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inf-t8-1-1', title: 'Safety Installations', order: 1, durationDays: 15, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Site Engineer',
                subtasks: [
                  { id: 'inf-st8-1-1-1', name: 'Signboards', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inf-st8-1-1-2', name: 'Guardrails', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'inf-t6-2-1', type: 'FS', lag: 0 }]
              }
            ]
          },
          {
            id: 'inf-sm8-2', name: 'Marking', order: 2, durationDays: 15, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inf-t8-2-1', title: 'Road Marking', order: 1, durationDays: 15, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Site Engineer',
                subtasks: [
                  { id: 'inf-st8-2-1-1', name: 'Lane marking', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inf-st8-2-1-2', name: 'Reflectors', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'inf-t8-1-1', type: 'FS', lag: 0 }]
              }
            ]
          }
        ]
      },
      {
        id: 'inf-m9', name: 'Testing & Quality Control', order: 9, durationDays: 30, color: 'rose', progress: 0,
        subMilestones: [
          {
            id: 'inf-sm9-1', name: 'Material Testing', order: 1, durationDays: 15, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inf-t9-1-1', title: 'Quality Testing', order: 1, durationDays: 15, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'QA/QC Engineer',
                subtasks: [
                  { id: 'inf-st9-1-1-1', name: 'Soil testing', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inf-st9-1-1-2', name: 'Concrete testing', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          },
          {
            id: 'inf-sm9-2', name: 'Inspection', order: 2, durationDays: 15, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inf-t9-2-1', title: 'Final Inspection', order: 1, durationDays: 15, projectId: '', status: 'Pending', priority: 'Critical', deadline: '', role: 'QA/QC Engineer',
                subtasks: [
                  { id: 'inf-st9-2-1-1', name: 'Safety audit', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inf-st9-2-1-2', name: 'Compliance check', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'inf-t8-2-1', type: 'FS', lag: 0 }]
              }
            ]
          }
        ]
      },
      {
        id: 'inf-m10', name: 'Handover & Maintenance', order: 10, durationDays: 20, color: 'violet', progress: 0,
        subMilestones: [
          {
            id: 'inf-sm10-1', name: 'Project Handover', order: 1, durationDays: 10, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inf-t10-1-1', title: 'Handover', order: 1, durationDays: 10, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Project Manager',
                subtasks: [
                  { id: 'inf-st10-1-1-1', name: 'Documentation', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inf-st10-1-1-2', name: 'Authority approval', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'inf-t9-2-1', type: 'FS', lag: 0 }]
              }
            ]
          },
          {
            id: 'inf-sm10-2', name: 'Maintenance Setup', order: 2, durationDays: 10, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inf-t10-2-1', title: 'Maintenance Planning', order: 1, durationDays: 10, projectId: '', status: 'Pending', priority: 'Medium', deadline: '', role: 'Project Manager',
                subtasks: [
                  { id: 'inf-st10-2-1-1', name: 'Routine schedule', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inf-st10-2-1-2', name: 'Issue tracking', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'inst-001',
    name: 'Institutional Construction Master Template',
    type: 'Institutional',
    version: '1.0',
    milestones: [
      {
        id: 'inst-m1', name: 'Planning & Requirement Finalization', order: 1, durationDays: 20, color: 'blue', progress: 0,
        subMilestones: [
          {
            id: 'inst-sm1-1', name: 'Requirement Gathering', order: 1, durationDays: 10, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inst-t1-1-1', title: 'Stakeholder Consultation', order: 1, durationDays: 10, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Project Manager',
                subtasks: [
                  { id: 'inst-st1-1-1-1', name: 'Identify stakeholders', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inst-st1-1-1-2', name: 'Collect requirements', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'inst-st1-1-1-3', name: 'Finalize scope', order: 3, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          },
          {
            id: 'inst-sm1-2', name: 'Feasibility Study', order: 2, durationDays: 10, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inst-t1-2-1', title: 'Project Feasibility', order: 1, durationDays: 10, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Project Manager',
                subtasks: [
                  { id: 'inst-st1-2-1-1', name: 'Site analysis', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inst-st1-2-1-2', name: 'Budget estimation', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'inst-st1-2-1-3', name: 'Risk assessment', order: 3, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'inst-m2', name: 'Design & Engineering', order: 2, durationDays: 60, color: 'indigo', progress: 0,
        subMilestones: [
          {
            id: 'inst-sm2-1', name: 'Architectural Design', order: 1, durationDays: 20, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inst-t2-1-1', title: 'Concept Design', order: 1, durationDays: 10, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Architect',
                subtasks: [
                  { id: 'inst-st2-1-1-1', name: 'Layout planning', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inst-st2-1-1-2', name: 'Space utilization', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'inst-t1-1-1', type: 'FS', lag: 0 }]
              },
              {
                id: 'inst-t2-1-2', title: 'Detailed Design', order: 2, durationDays: 10, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Architect',
                subtasks: [
                  { id: 'inst-st2-1-2-1', name: 'Floor plans', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inst-st2-1-2-2', name: 'Elevations', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'inst-t2-1-1', type: 'FS', lag: 0 }]
              }
            ]
          },
          {
            id: 'inst-sm2-2', name: 'Engineering Design', order: 2, durationDays: 20, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inst-t2-2-1', title: 'Structural Design', order: 1, durationDays: 10, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Civil Engineer',
                subtasks: [
                  { id: 'inst-st2-2-1-1', name: 'Load calculation', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inst-st2-2-1-2', name: 'Structural drawings', order: 2, isCompleted: false, isChecklist: true }
                ]
              },
              {
                id: 'inst-t2-2-2', title: 'MEP Design', order: 2, durationDays: 10, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'MEP Engineer',
                subtasks: [
                  { id: 'inst-st2-2-2-1', name: 'Electrical layout', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inst-st2-2-2-2', name: 'Plumbing layout', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'inst-st2-2-2-3', name: 'HVAC planning', order: 3, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          },
          {
            id: 'inst-sm2-3', name: 'Specialized Design (Critical)', order: 3, durationDays: 20, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inst-t2-3-1', title: 'Compliance Design', order: 1, durationDays: 20, projectId: '', status: 'Pending', priority: 'Critical', deadline: '', role: 'Compliance Officer',
                subtasks: [
                  { id: 'inst-st2-3-1-1', name: 'Fire safety design', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inst-st2-3-1-2', name: 'Accessibility (PWD norms)', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'inst-st2-3-1-3', name: 'Healthcare norms (if hospital)', order: 3, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'inst-m3', name: 'Approvals & Compliance', order: 3, durationDays: 45, color: 'amber', progress: 0,
        subMilestones: [
          {
            id: 'inst-sm3-1', name: 'Regulatory Approvals', order: 1, durationDays: 30, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inst-t3-1-1', title: 'Government Permissions', order: 1, durationDays: 30, projectId: '', status: 'Pending', priority: 'Critical', deadline: '', role: 'Compliance Officer',
                subtasks: [
                  { id: 'inst-st3-1-1-1', name: 'Documentation preparation', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inst-st3-1-1-2', name: 'Submission', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'inst-st3-1-1-3', name: 'Follow-up', order: 3, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'inst-t2-1-2', type: 'FS', lag: 0 }]
              }
            ]
          },
          {
            id: 'inst-sm3-2', name: 'Safety & Certification', order: 2, durationDays: 15, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inst-t3-2-1', title: 'Fire Approval', order: 1, durationDays: 15, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Compliance Officer',
                subtasks: [
                  { id: 'inst-st3-2-1-1', name: 'Fire NOC application', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inst-st3-2-1-2', name: 'Inspection', order: 2, isCompleted: false, isChecklist: true }
                ]
              },
              {
                id: 'inst-t3-2-2', title: 'Environmental Clearance', order: 2, durationDays: 15, projectId: '', status: 'Pending', priority: 'Medium', deadline: '', role: 'Safety Officer',
                subtasks: [
                  { id: 'inst-st3-2-2-1', name: 'Impact study', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inst-st3-2-2-2', name: 'Approval', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'inst-m4', name: 'Procurement & Tendering', order: 4, durationDays: 40, color: 'orange', progress: 0,
        subMilestones: [
          {
            id: 'inst-sm4-1', name: 'Tender Process', order: 1, durationDays: 20, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inst-t4-1-1', title: 'Tender Management', order: 1, durationDays: 20, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Accountant',
                subtasks: [
                  { id: 'inst-st4-1-1-1', name: 'Tender document creation', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inst-st4-1-1-2', name: 'Bid invitation', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'inst-st4-1-1-3', name: 'Bid evaluation', order: 3, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'inst-t3-1-1', type: 'FS', lag: 0 }]
              }
            ]
          },
          {
            id: 'inst-sm4-2', name: 'Contractor Finalization', order: 2, durationDays: 20, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inst-t4-2-1', title: 'Vendor Selection', order: 1, durationDays: 20, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Project Manager',
                subtasks: [
                  { id: 'inst-st4-2-1-1', name: 'Technical evaluation', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inst-st4-2-1-2', name: 'Financial evaluation', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'inst-st4-2-1-3', name: 'Contract signing', order: 3, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'inst-t4-1-1', type: 'FS', lag: 0 }]
              }
            ]
          }
        ]
      },
      {
        id: 'inst-m5', name: 'Site Preparation', order: 5, durationDays: 20, color: 'teal', progress: 0,
        subMilestones: [
          {
            id: 'inst-sm5-1', name: 'Site Setup', order: 1, durationDays: 10, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inst-t5-1-1', title: 'Mobilization', order: 1, durationDays: 10, projectId: '', status: 'Pending', priority: 'Medium', deadline: '', role: 'Site Engineer',
                subtasks: [
                  { id: 'inst-st5-1-1-1', name: 'Site office setup', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inst-st5-1-1-2', name: 'Workforce mobilization', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'inst-t4-2-1', type: 'FS', lag: 0 }]
              }
            ]
          },
          {
            id: 'inst-sm5-2', name: 'Land Preparation', order: 2, durationDays: 10, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inst-t5-2-1', title: 'Site Clearing', order: 1, durationDays: 10, projectId: '', status: 'Pending', priority: 'Medium', deadline: '', role: 'Site Engineer',
                subtasks: [
                  { id: 'inst-st5-2-1-1', name: 'Debris removal', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inst-st5-2-1-2', name: 'Leveling', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'inst-m6', name: 'Civil & Structural Work', order: 6, durationDays: 120, color: 'emerald', progress: 0,
        subMilestones: [
          {
            id: 'inst-sm6-1', name: 'Foundation Work', order: 1, durationDays: 40, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inst-t6-1-1', title: 'Foundation Construction', order: 1, durationDays: 40, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Civil Engineer',
                subtasks: [
                  { id: 'inst-st6-1-1-1', name: 'Excavation', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inst-st6-1-1-2', name: 'Reinforcement', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'inst-st6-1-1-3', name: 'Concrete pouring', order: 3, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'inst-t5-2-1', type: 'FS', lag: 0 }]
              }
            ]
          },
          {
            id: 'inst-sm6-2', name: 'Superstructure', order: 2, durationDays: 80, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inst-t6-2-1', title: 'Structural Work', order: 1, durationDays: 80, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Civil Engineer',
                subtasks: [
                  { id: 'inst-st6-2-1-1', name: 'Columns & beams', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inst-st6-2-1-2', name: 'Slab casting', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'inst-t6-1-1', type: 'FS', lag: 0 }]
              }
            ]
          }
        ]
      },
      {
        id: 'inst-m7', name: 'MEP & Specialized Systems', order: 7, durationDays: 60, color: 'cyan', progress: 0,
        subMilestones: [
          {
            id: 'inst-sm7-1', name: 'Electrical Systems', order: 1, durationDays: 20, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inst-t7-1-1', title: 'Electrical Installation', order: 1, durationDays: 20, projectId: '', status: 'Pending', priority: 'Medium', deadline: '', role: 'Electrical Engineer',
                subtasks: [
                  { id: 'inst-st7-1-1-1', name: 'Wiring', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inst-st7-1-1-2', name: 'Panel setup', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          },
          {
            id: 'inst-sm7-2', name: 'Plumbing Systems', order: 2, durationDays: 20, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inst-t7-2-1', title: 'Plumbing Work', order: 1, durationDays: 20, projectId: '', status: 'Pending', priority: 'Medium', deadline: '', role: 'Civil Engineer',
                subtasks: [
                  { id: 'inst-st7-2-1-1', name: 'Water supply', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inst-st7-2-1-2', name: 'Drainage', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          },
          {
            id: 'inst-sm7-3', name: 'Specialized Systems (Important)', order: 3, durationDays: 20, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inst-t7-3-1', title: 'Fire Safety System', order: 1, durationDays: 20, projectId: '', status: 'Pending', priority: 'Critical', deadline: '', role: 'Safety Officer',
                subtasks: [
                  { id: 'inst-st7-3-1-1', name: 'Sprinkler installation', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inst-st7-3-1-2', name: 'Alarm system', order: 2, isCompleted: false, isChecklist: true }
                ]
              },
              {
                id: 'inst-t7-3-2', title: 'Medical Systems (if hospital)', order: 2, durationDays: 20, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'MEP Engineer',
                subtasks: [
                  { id: 'inst-st7-3-2-1', name: 'Oxygen pipeline', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inst-st7-3-2-2', name: 'Equipment setup', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'inst-m8', name: 'Interior & Finishing', order: 8, durationDays: 45, color: 'sky', progress: 0,
        subMilestones: [
          {
            id: 'inst-sm8-1', name: 'Interior Work', order: 1, durationDays: 25, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inst-t8-1-1', title: 'Partition & Fixtures', order: 1, durationDays: 25, projectId: '', status: 'Pending', priority: 'Medium', deadline: '', role: 'Site Engineer',
                subtasks: [
                  { id: 'inst-st8-1-1-1', name: 'Partition installation', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inst-st8-1-1-2', name: 'Furniture setup', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          },
          {
            id: 'inst-sm8-2', name: 'Finishing', order: 2, durationDays: 20, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inst-t8-2-1', title: 'Painting & Flooring', order: 1, durationDays: 20, projectId: '', status: 'Pending', priority: 'Medium', deadline: '', role: 'Site Engineer',
                subtasks: [
                  { id: 'inst-st8-2-1-1', name: 'Painting', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inst-st8-2-1-2', name: 'Flooring', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'inst-t8-1-1', type: 'FS', lag: 0 }]
              }
            ]
          }
        ]
      },
      {
        id: 'inst-m9', name: 'Testing, Inspection & Certification', order: 9, durationDays: 40, color: 'rose', progress: 0,
        subMilestones: [
          {
            id: 'inst-sm9-1', name: 'System Testing', order: 1, durationDays: 15, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inst-t9-1-1', title: 'Functional Testing', order: 1, durationDays: 15, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'QA/QC Engineer',
                subtasks: [
                  { id: 'inst-st9-1-1-1', name: 'Electrical testing', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inst-st9-1-1-2', name: 'Plumbing testing', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          },
          {
            id: 'inst-sm9-2', name: 'Compliance Inspection', order: 2, durationDays: 15, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inst-t9-2-1', title: 'Regulatory Inspection', order: 1, durationDays: 15, projectId: '', status: 'Pending', priority: 'Critical', deadline: '', role: 'Compliance Officer',
                subtasks: [
                  { id: 'inst-st9-2-1-1', name: 'Safety audit', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inst-st9-2-1-2', name: 'Government inspection', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'inst-t9-1-1', type: 'FS', lag: 0 }]
              }
            ]
          },
          {
            id: 'inst-sm9-3', name: 'Certification', order: 3, durationDays: 10, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inst-t9-3-1', title: 'Certification Process', order: 1, durationDays: 10, projectId: '', status: 'Pending', priority: 'Critical', deadline: '', role: 'Compliance Officer',
                subtasks: [
                  { id: 'inst-st9-3-1-1', name: 'Fire NOC approval', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inst-st9-3-1-2', name: 'Occupancy certificate', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'inst-t9-2-1', type: 'FS', lag: 0 }]
              }
            ]
          }
        ]
      },
      {
        id: 'inst-m10', name: 'Handover & Post-Construction', order: 10, durationDays: 30, color: 'violet', progress: 0,
        subMilestones: [
          {
            id: 'inst-sm10-1', name: 'Handover', order: 1, durationDays: 15, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inst-t10-1-1', title: 'Project Delivery', order: 1, durationDays: 15, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Project Manager',
                subtasks: [
                  { id: 'inst-st10-1-1-1', name: 'Documentation handover', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inst-st10-1-1-2', name: 'Authority sign-off', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'inst-t9-3-1', type: 'FS', lag: 0 }]
              }
            ]
          },
          {
            id: 'inst-sm10-2', name: 'Training & Maintenance', order: 2, durationDays: 15, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'inst-t10-2-1', title: 'Facility Training', order: 1, durationDays: 15, projectId: '', status: 'Pending', priority: 'Medium', deadline: '', role: 'Project Manager',
                subtasks: [
                  { id: 'inst-st10-2-1-1', name: 'Staff training', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'inst-st10-2-1-2', name: 'Maintenance guidelines', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'reno-001',
    name: 'Renovation / Remodeling Master Template',
    type: 'Renovation',
    version: '1.0',
    milestones: [
      {
        id: 'reno-m1', name: 'Inspection & Planning', order: 1, durationDays: 15, color: 'rose', progress: 0,
        subMilestones: [
          {
            id: 'reno-sm1-1', name: 'Site Inspection (Critical)', order: 1, durationDays: 5, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'reno-t1-1-1', title: 'Existing Condition Assessment', order: 1, durationDays: 5, projectId: '', status: 'Pending', priority: 'Critical', deadline: '', role: 'Project Manager',
                subtasks: [
                  { id: 'reno-st1-1-1-1', name: 'Structural condition check', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'reno-st1-1-1-2', name: 'Electrical system inspection', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'reno-st1-1-1-3', name: 'Plumbing inspection', order: 3, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          },
          {
            id: 'reno-sm1-2', name: 'Requirement Gathering', order: 2, durationDays: 5, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'reno-t1-2-1', title: 'Client Discussion', order: 1, durationDays: 5, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Interior Designer',
                subtasks: [
                  { id: 'reno-st1-2-1-1', name: 'Understand requirements', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'reno-st1-2-1-2', name: 'Budget discussion', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'reno-st1-2-1-3', name: 'Scope finalization', order: 3, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          },
          {
            id: 'reno-sm1-3', name: 'Design Planning', order: 3, durationDays: 5, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'reno-t1-3-1', title: 'Interior Design', order: 1, durationDays: 5, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Interior Designer',
                subtasks: [
                  { id: 'reno-st1-3-1-1', name: 'Layout design', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'reno-st1-3-1-2', name: 'Material selection', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'reno-st1-3-1-3', name: 'Client approval', order: 3, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'reno-m2', name: 'Approvals', order: 2, durationDays: 10, color: 'blue', progress: 0,
        subMilestones: [
          {
            id: 'reno-sm2-1', name: 'Permissions', order: 1, durationDays: 10, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'reno-t2-1-1', title: 'Local Approvals', order: 1, durationDays: 10, projectId: '', status: 'Pending', priority: 'Medium', deadline: '', role: 'Project Manager',
                subtasks: [
                  { id: 'reno-st2-1-1-1', name: 'Society approval', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'reno-st2-1-1-2', name: 'Municipal permission', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'reno-t1-3-1', type: 'FS', lag: 0 }]
              }
            ]
          }
        ]
      },
      {
        id: 'reno-m3', name: 'Demolition & Preparation', order: 3, durationDays: 15, color: 'orange', progress: 0,
        subMilestones: [
          {
            id: 'reno-sm3-1', name: 'Demolition', order: 1, durationDays: 10, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'reno-t3-1-1', title: 'Removal Work', order: 1, durationDays: 10, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Contractor',
                subtasks: [
                  { id: 'reno-st3-1-1-1', name: 'Wall removal', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'reno-st3-1-1-2', name: 'Fixture removal', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'reno-st3-1-1-3', name: 'Debris disposal', order: 3, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'reno-t2-1-1', type: 'FS', lag: 0 }]
              }
            ]
          },
          {
            id: 'reno-sm3-2', name: 'Site Preparation', order: 2, durationDays: 5, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'reno-t3-2-1', title: 'Surface Preparation', order: 1, durationDays: 5, projectId: '', status: 'Pending', priority: 'Medium', deadline: '', role: 'Contractor',
                subtasks: [
                  { id: 'reno-st3-2-1-1', name: 'Cleaning', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'reno-st3-2-1-2', name: 'Leveling', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'reno-m4', name: 'Structural & Civil Changes', order: 4, durationDays: 20, color: 'emerald', progress: 0,
        subMilestones: [
          {
            id: 'reno-sm4-1', name: 'Structural Work', order: 1, durationDays: 10, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'reno-t4-1-1', title: 'Modification Work', order: 1, durationDays: 10, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Contractor',
                subtasks: [
                  { id: 'reno-st4-1-1-1', name: 'Wall construction', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'reno-st4-1-1-2', name: 'Beam support (if needed)', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'reno-t3-1-1', type: 'FS', lag: 0 }]
              }
            ]
          },
          {
            id: 'reno-sm4-2', name: 'Flooring Base', order: 2, durationDays: 10, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'reno-t4-2-1', title: 'Base Preparation', order: 1, durationDays: 10, projectId: '', status: 'Pending', priority: 'Medium', deadline: '', role: 'Contractor',
                subtasks: [
                  { id: 'reno-st4-2-1-1', name: 'Leveling', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'reno-st4-2-1-2', name: 'Waterproofing', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'reno-m5', name: 'MEP Adjustments', order: 5, durationDays: 15, color: 'cyan', progress: 0,
        subMilestones: [
          {
            id: 'reno-sm5-1', name: 'Electrical', order: 1, durationDays: 7, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'reno-t5-1-1', title: 'Electrical Rework', order: 1, durationDays: 7, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Electrician',
                subtasks: [
                  { id: 'reno-st5-1-1-1', name: 'Old wiring removal', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'reno-st5-1-1-2', name: 'New wiring installation', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          },
          {
            id: 'reno-sm5-2', name: 'Plumbing', order: 2, durationDays: 8, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'reno-t5-2-1', title: 'Plumbing Changes', order: 1, durationDays: 8, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Plumber',
                subtasks: [
                  { id: 'reno-st5-2-1-1', name: 'Pipe relocation', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'reno-st5-2-1-2', name: 'Leak testing', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'reno-m6', name: 'Interior Works', order: 6, durationDays: 30, color: 'indigo', progress: 0,
        subMilestones: [
          {
            id: 'reno-sm6-1', name: 'Carpentry', order: 1, durationDays: 15, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'reno-t6-1-1', title: 'Furniture Work', order: 1, durationDays: 15, projectId: '', status: 'Pending', priority: 'Medium', deadline: '', role: 'Carpenter',
                subtasks: [
                  { id: 'reno-st6-1-1-1', name: 'Modular furniture', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'reno-st6-1-1-2', name: 'Wardrobes', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          },
          {
            id: 'reno-sm6-2', name: 'False Ceiling', order: 2, durationDays: 7, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'reno-t6-2-1', title: 'Ceiling Work', order: 1, durationDays: 7, projectId: '', status: 'Pending', priority: 'Medium', deadline: '', role: 'Contractor',
                subtasks: [
                  { id: 'reno-st6-2-1-1', name: 'Framework', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'reno-st6-2-1-2', name: 'Panel installation', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          },
          {
            id: 'reno-sm6-3', name: 'Wall Finishes', order: 3, durationDays: 8, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'reno-t6-3-1', title: 'Wall Work', order: 1, durationDays: 8, projectId: '', status: 'Pending', priority: 'Medium', deadline: '', role: 'Painter',
                subtasks: [
                  { id: 'reno-st6-3-1-1', name: 'Putty', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'reno-st6-3-1-2', name: 'Painting / wallpaper', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'reno-m7', name: 'Flooring & Finishing', order: 7, durationDays: 20, color: 'sky', progress: 0,
        subMilestones: [
          {
            id: 'reno-sm7-1', name: 'Flooring', order: 1, durationDays: 10, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'reno-t7-1-1', title: 'Floor Installation', order: 1, durationDays: 10, projectId: '', status: 'Pending', priority: 'Medium', deadline: '', role: 'Contractor',
                subtasks: [
                  { id: 'reno-st7-1-1-1', name: 'Tile / wood flooring', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'reno-st7-1-1-2', name: 'Finishing', order: 2, isCompleted: false, isChecklist: true }
                ],
                dependencies: [{ predecessorId: 'reno-t4-2-1', type: 'FS', lag: 0 }]
              }
            ]
          },
          {
            id: 'reno-sm7-2', name: 'Fixtures', order: 2, durationDays: 10, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'reno-t7-2-1', title: 'Fixture Installation', order: 1, durationDays: 10, projectId: '', status: 'Pending', priority: 'Medium', deadline: '', role: 'Contractor',
                subtasks: [
                  { id: 'reno-st7-2-1-1', name: 'Lights', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'reno-st7-2-1-2', name: 'Bathroom fittings', order: 2, isCompleted: false, isChecklist: true },
                  { id: 'reno-st7-2-1-3', name: 'Switchboards', order: 3, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'reno-m8', name: 'Final Touches', order: 8, durationDays: 10, color: 'slate', progress: 0,
        subMilestones: [
          {
            id: 'reno-sm8-1', name: 'Cleaning', order: 1, durationDays: 5, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'reno-t8-1-1', title: 'Deep Cleaning', order: 1, durationDays: 5, projectId: '', status: 'Pending', priority: 'Low', deadline: '', role: 'Contractor',
                subtasks: [
                  { id: 'reno-st8-1-1-1', name: 'Dust removal', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'reno-st8-1-1-2', name: 'Polishing', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          },
          {
            id: 'reno-sm8-2', name: 'Snag Resolution', order: 2, durationDays: 5, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'reno-t8-2-1', title: 'Issue Fixing', order: 1, durationDays: 5, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Contractor',
                subtasks: [
                  { id: 'reno-st8-2-1-1', name: 'Identify defects', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'reno-st8-2-1-2', name: 'Rectification', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'reno-m9', name: 'Handover', order: 9, durationDays: 5, color: 'violet', progress: 0,
        subMilestones: [
          {
            id: 'reno-sm9-1', name: 'Final Inspection', order: 1, durationDays: 2, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'reno-t9-1-1', title: 'Quality Check', order: 1, durationDays: 2, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Project Manager',
                subtasks: [
                  { id: 'reno-st9-1-1-1', name: 'Client walkthrough', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'reno-st9-1-1-2', name: 'Approval', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          },
          {
            id: 'reno-sm9-2', name: 'Project Closure', order: 2, durationDays: 3, progress: 0, status: 'Pending',
            tasks: [
              {
                id: 'reno-t9-2-1', title: 'Handover', order: 1, durationDays: 3, projectId: '', status: 'Pending', priority: 'High', deadline: '', role: 'Project Manager',
                subtasks: [
                  { id: 'reno-st9-2-1-1', name: 'Key handover', order: 1, isCompleted: false, isChecklist: true },
                  { id: 'reno-st9-2-1-2', name: 'Final documentation', order: 2, isCompleted: false, isChecklist: true }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

export const inventoryRequests: InventoryRequest[] = [
  {
    id: 'IR-001',
    projectId: 'p1',
    taskId: 't1',
    subTaskId: 'st1',
    requestedBy: 'm1',
    requestedRole: 'Site Engineer',
    siteId: 'S-01',
    items: [
      { itemId: 'mat-001', itemName: 'Cement (OPC)', quantityRequested: 100, quantityApproved: 100, quantityIssued: 100, unit: 'Bags' },
      { itemId: 'mat-002', itemName: 'TMT Steel Bars (12mm)', quantityRequested: 500, quantityApproved: 500, quantityIssued: 400, unit: 'kg' }
    ],
    status: 'Issued',
    approvalLevel: 2,
    approvals: [
      { level: 1, role: 'Site Engineer', userId: 'm1', status: 'Approved', remarks: 'Initial request for foundation work', timestamp: '2026-05-01T09:00:00Z' },
      { level: 2, role: 'Project Manager', userId: 'm2', status: 'Approved', remarks: 'Approved for phase 1', timestamp: '2026-05-01T14:30:00Z' }
    ],
    warehouseId: 'W-MAIN',
    createdAt: '2026-05-01T08:45:00Z',
    updatedAt: '2026-05-01T16:00:00Z'
  },
  {
    id: 'IR-002',
    projectId: 'p1',
    taskId: 't2',
    subTaskId: 'st3',
    requestedBy: 'm1',
    requestedRole: 'Site Engineer',
    siteId: 'S-01',
    items: [
      { itemId: 'mat-003', itemName: 'Bricks (Red)', quantityRequested: 5000, unit: 'Units' }
    ],
    status: 'Submitted',
    approvalLevel: 0,
    approvals: [],
    warehouseId: 'W-MAIN',
    createdAt: '2026-05-04T10:15:00Z',
    updatedAt: '2026-05-04T10:15:00Z'
  }
];

export const inventoryReturns: InventoryReturn[] = [
  {
    id: 'IRN-001',
    projectId: 'p1',
    taskId: 't1',
    subTaskId: 'st1',
    warehouseId: 'W-MAIN',
    referenceRequestId: 'IR-001',
    returnType: 'Excess',
    items: [
      {
        itemId: 'mat-002',
        quantityIssued: 400,
        quantityUsed: 350,
        quantityReturned: 50,
        quantityDamaged: 0,
        remarks: 'Surplus after slab completion'
      }
    ],
    requestedBy: 'm1',
    approvals: [],
    status: 'Submitted',
    createdAt: '2026-05-05T11:00:00Z'
  }
];

export const branches: Branch[] = [
  {
    id: 'BR-HO',
    name: 'Bangalore Head Office',
    code: 'BLR-01',
    location: 'Bangalore',
    gstNumber: '29AAAAA0000A1Z5',
    isHeadquarters: true,
    bankAccounts: [
      { id: 'ACC-COL', accountNumber: '1234567890', bankName: 'HDFC Bank', ifsc: 'HDFC0001', balance: 15000000, type: 'Collection' },
      { id: 'ACC-SET', accountNumber: '9876543210', bankName: 'ICICI Bank', ifsc: 'ICIC0002', balance: 5000000, type: 'Settlement' }
    ]
  },
  {
    id: 'BR-MUM',
    name: 'Mumbai Branch',
    code: 'MUM-02',
    location: 'Worli, Mumbai',
    gstNumber: '27BBBBB0000B1Z5',
    isHeadquarters: false,
    bankAccounts: [
      { id: 'ACC-OPS-MUM', accountNumber: '1122334455', bankName: 'SBI', ifsc: 'SBIN0003', balance: 2000000, type: 'Operational' },
      { id: 'ACC-SET-MUM', accountNumber: '2233445566', bankName: 'Axis Bank', ifsc: 'AXIS0004', balance: 1000000, type: 'Settlement' }
    ]
  },
  {
    id: 'BR-DEL',
    name: 'Delhi Branch',
    code: 'DEL-03',
    location: 'Gurgaon',
    gstNumber: '06CCCCC0000C1Z5',
    isHeadquarters: false,
    bankAccounts: [
      { id: 'ACC-SET-DEL', accountNumber: '3344556677', bankName: 'Kotak Bank', ifsc: 'KKBK0005', balance: 800000, type: 'Settlement' }
    ]
  }
];

export const expenses: Expense[] = [
  { id: 'EXP-001', projectCode: 'BF-P1-BLR', category: 'Labor', amount: 50000, date: '2026-05-01', description: 'Weekly labor payment', status: 'Paid' },
  { id: 'EXP-002', projectCode: 'BF-P1-BLR', category: 'Materials', amount: 120000, date: '2026-05-02', description: 'Emergency cement procurement', status: 'Approved' }
];

export const guaranteeTracking: GuaranteeTracking[] = [
  { id: 'BG-001', type: 'BG', referenceNumber: 'BG12345', amount: 1000000, bankName: 'HDFC', issueDate: '2026-01-01', expiryDate: '2027-01-01', projectCode: 'BF-P1-BLR', status: 'Active' }
];

export const billingDocuments: BillingDocument[] = [
  {
    id: 'INV-001',
    documentType: 'Invoice',
    documentNumber: 'INV/2026/001',
    projectCode: 'BF-P1-BLR',
    customerId: 'CUST-01',
    date: '2026-05-01',
    items: [
      { description: 'Concrete Slab Work', quantity: 1, unit: 'LS', rate: 500000, gstRate: 18, total: 590000 }
    ],
    subTotal: 500000,
    gstAmount: 90000,
    totalAmount: 590000,
    status: 'Approved'
  }
];

export const branchSettlements: BranchSettlement[] = [
  { id: 'SET-001', fromBranchId: 'BR-BLR', toBranchId: 'BR-MUM', amount: 500000, date: '2026-05-01', status: 'Completed', referenceType: 'InterBranchTransfer' }
];
