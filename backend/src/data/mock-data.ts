import { Project, Task, SiteUpdate, Material, Vendor, Quote, Contract, ContractHistory, Role, TeamMember, ContractorMetric, LaborStats, ReportVaultItem, PurchaseRequisition, StockTransfer, Equipment, SafetyIncident } from '../models/models';

export const projects: Project[] = [
  {
    id: 'p1',
    name: 'Prestige Tech Park, Bangalore',
    location: 'Outer Ring Road, Kadubeesanahalli',
    description: 'A 45-story commercial tower with sustainable architecture.',
    status: 'On Track',
    progress: 45,
    type: 'Commercial',
    budget: { total: 120000000, used: 45000000 },
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
        id: 'm1', name: 'Phase 1: Excavation & Foundation', progress: 100, color: 'blue-500', startDate: '2026-01-01', endDate: '2026-03-31', subProjectIds: ['sp1'],
        subMilestones: [
          { id: 'sm1', name: 'Site Setup', progress: 100, status: 'Completed', startDate: '2026-01-01', endDate: '2026-01-15' },
          { id: 'sm2', name: 'Deep Excavation', progress: 100, status: 'Completed', startDate: '2026-01-16', endDate: '2026-02-28' }
        ]
      },
      { 
        id: 'm2', name: 'Phase 2: Structural Core', progress: 30, color: 'indigo-500', startDate: '2026-04-01', endDate: '2026-08-31', subProjectIds: ['sp2'],
        subMilestones: [
          { id: 'sm3', name: 'L1-L5 Columns', progress: 80, status: 'In Progress', startDate: '2026-04-01', endDate: '2026-05-15' },
          { id: 'sm4', name: 'L6-L10 Framing', progress: 0, status: 'Pending', startDate: '2026-05-16', endDate: '2026-06-30' }
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
    name: 'Coastal Road Project, Mumbai',
    location: 'Worli-Marine Drive Stretch',
    description: 'Major infrastructure development connecting Worli to Marine Drive.',
    status: 'At Risk',
    progress: 32,
    type: 'Industrial',
    budget: { total: 80000000, used: 55000000 },
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
      { id: 'm3', name: 'Land Reclamation', progress: 100, color: 'primary', startDate: '2026-02-01', endDate: '2026-03-15' },
      { id: 'm4', name: 'Bridge Piling', progress: 15, color: 'secondary', startDate: '2026-03-16', endDate: '2026-05-30' }
    ],
    lastUpdate: '5 hours ago',
    estimatedCompletion: 'Apr 25, 2026',
    thumbnail: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=1000&auto=format&fit=crop'
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

export const tasks: Task[] = [
  { 
    id: 't1', 
    projectId: 'p1', 
    title: 'Foundation Pour', 
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

export const incidents: SafetyIncident[] = [
  { id: 'i1', title: 'Near Miss: Crane Swing', date: '2024-04-12', severity: 'Medium', status: 'Closed', reporter: 'Dave Safety', category: 'Near Miss', description: 'Crane TC01 swing radius overlapped with active loading zone.', correctiveAction: 'Revised swing radius protocols.' },
  { id: 'i2', title: 'Minor Injury: Hand Laceration', date: '2024-04-20', severity: 'Low', status: 'Resolved', reporter: 'Sanjay Gupta', category: 'Injury', description: 'Worker sustained minor cut during rebar handling.', correctiveAction: 'Mandatory glove inspection and training.' }
];
