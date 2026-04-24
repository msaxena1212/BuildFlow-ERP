import { Project, Task, SiteUpdate, Material, Vendor, Quote, Contract, ContractHistory, Role, TeamMember, ContractorMetric, LaborStats, ReportVaultItem } from '../models/models';

export const projects: Project[] = [
  {
    id: 'p1',
    name: 'Skyline Plaza',
    location: 'Central Business District',
    description: 'A 45-story commercial tower with sustainable architecture.',
    status: 'On Track',
    progress: 45,
    type: 'Commercial',
    budget: { total: 12000000, used: 4500000 },
    team: [
      { name: 'James Wilson', role: 'Project Director', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ6NqbeyzXdDdcKy8rA12bnb-D1XcFS2rr8zDl-BPEQQPcKodHtE3lG-MeVtaXdaulKwMjvYGMWDgMz7L1bQywZjuRsjgcfxQn9iVDDjn-S9c-U0mM0KIKQF0_U3aXqMPM9QZTt7m8khqSuD08ogwyCw24ghRW9YUe2bwt0s3THMMrL1xo9qBGM2z9kv1ZFUv238GeBHrkyEjR7jq4de8FvFuAzlnEaAF35yr9AkBXXUF3tIkIsYaqfofbVxV6-BNl4CPa95StjdLi' },
      { name: 'Marcus Thorne', role: 'Construction Lead', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4CZeaYB7fJXEtjKFkVujKuYnqc32Vz4RirffP91HCE-igMSlf58IRegCTvDiO-n6vn8GSii3hmQCT9wn7MZCO7LYC87Mix-nc0uOD0_dHzMdyYmVbfUFLAGo6sFmnu6r5xb66CI_FUi6YCEqOcUKyBiL2helT79G1OiGR1inPdCcO87KgZ9ygFt4Q9GbiYVVfSvdkQ-o38syvfzzZJtPCCht9KpCLNPH4NAfNB_nmM9iLmnFOQ8z1D6W3w9caWMwVul6E7XtJszA-' }
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
    name: 'Harbor Bridge Renovation',
    location: 'East Quay Development',
    description: 'Industrial harbor bridge renovation site with scaffolding and maritime equipment.',
    status: 'At Risk',
    progress: 32,
    type: 'Industrial',
    budget: { total: 8000000, used: 5500000 },
    team: [
      { name: 'Robert Chen', role: 'Senior Manager', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIjvYCMkYFFPLlfVHaqQHuvLMVHF7_kpGw97Z1CaSzxA5XxGZG8DnGiPShjWeY9cmE1_mX6kxNCOPG7Ob30onvGP1XkBT6lcsbSwrFLoOOyXUKQEN8znwmLsVkobRFY_MCmQTrxoo9-10ydY-6Q4o881pCplPU17HnzQTaZfXkHyAv_mXeALUCj3EYdGrQf1rb99oD6PVMv1lzRsseK4POrhxRMIHqp2h7LbJSNqkt5FaPbx8BiQ_Tsdd8QVWpwBQWNEnH7nU0nTxC' }
    ],
    milestones: [
      { id: 'm3', name: 'Scaffolding & Access', progress: 100, color: 'primary', startDate: '2026-02-01', endDate: '2026-03-15' },
      { id: 'm4', name: 'Surface Preparation', progress: 15, color: 'secondary', startDate: '2026-03-16', endDate: '2026-05-30' }
    ],
    lastUpdate: '5 hours ago',
    estimatedCompletion: 'Apr 25, 2026',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5Vo6lZWbWcszXdp8USG9sl7XtfA0pJICbKwVH9Ml74TZI2YyCFvoMTE1kU5Y0P9Q2MTIgTFaOq9ZGKJJ2GO7T0CEIdy9Dsj3dXR2uZQnyxYe2BjdzcbksvvVPtW8PC9-tXo7nG371xTIR9gwrFDwECwKfF8knLa-6PnCcin_1FfL8fNfpSl8pEaF9H4A135QIP7R4EXUlWwy5Qh7IHFURQ9sG62SW9vh8m5OauF0kdmkGx0t8BXCEWNW08EfWgIiEDMP5YANC5bNk'
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
    type: 'Safety'
  },
  {
    id: 'u2',
    projectId: 'p2',
    time: '5 hours ago',
    title: 'Material Delivery Delay',
    description: 'Concrete batch delayed by 4 hours for Harbor Bridge site.',
    author: 'Logistics',
    type: 'Material'
  }
];

export const materials: Material[] = [
  { name: 'Concrete Mix Grade-A', sku: 'CON-442-B', category: 'Concrete', icon: 'texture', bg: 'bg-slate-100', text: 'text-slate-400', stock: { current: 420, total: 500, percent: 84 }, cost: '₹14.50', supplier: 'Titan Aggregates Ltd.', status: 'Optimal' },
  { name: 'Rebar Steel 12mm', sku: 'STL-12-REB', category: 'Steel', icon: 'grid_4x4', bg: 'bg-amber-50', text: 'text-secondary-container', border: 'border-amber-100', stock: { current: 45, total: 300, percent: 15 }, cost: '₹228.00', supplier: 'Foundry Steel Corp.', status: 'Critical' },
  { name: 'Copper Wiring 2.5mm', sku: 'ELEC-WR-25', category: 'Electrical', icon: 'bolt', bg: 'bg-slate-100', text: 'text-slate-400', stock: { current: 1200, total: 2000, percent: 60 }, cost: '₹1.20', supplier: 'VoltStream Supplies', status: 'Adequate' },
  { name: 'Ceramic Floor Tiles', sku: 'FIN-CER-60', category: 'Finishing', icon: 'square', bg: 'bg-slate-100', text: 'text-slate-400', stock: { current: 850, total: 1000, percent: 85 }, cost: '₹45.00', supplier: 'Modern Surfaces Int.', status: 'Optimal' },
  { name: 'Waterproof Sealant', sku: 'CHM-SEA-L', category: 'Chemicals', icon: 'water_drop', bg: 'bg-red-50', border: 'border-red-100', text: 'text-error', stock: { current: 12, total: 250, percent: 4.8 }, cost: '₹82.00', supplier: 'BuildSafe Chemicals', status: 'Critical' },
  { name: 'Structural Lumber 2x4', sku: 'LUM-24-12', category: 'Lumber', icon: 'forest', bg: 'bg-slate-100', text: 'text-slate-400', stock: { current: 150, total: 800, percent: 18.75 }, cost: '₹412.00', supplier: 'Westside Timber Co.', status: 'Critical' },
  { name: 'White Carrera Marble', sku: 'FIN-MAR-W', category: 'Finishing', icon: 'view_quilt', bg: 'bg-slate-100', text: 'text-slate-400', stock: { current: 40, total: 100, percent: 40 }, cost: '₹850.00', supplier: 'Modern Surfaces Int.', status: 'Adequate' },
  { name: 'Teak Wood Planks', sku: 'LUM-TK-1', category: 'Lumber', icon: 'forest', bg: 'bg-slate-100', text: 'text-slate-400', stock: { current: 85, total: 200, percent: 42.5 }, cost: '₹1250.00', supplier: 'Westside Timber Co.', status: 'Adequate' },
  { name: 'H-Beam Structural Steel', sku: 'STL-HB-10', category: 'Steel', icon: 'grid_4x4', bg: 'bg-slate-100', text: 'text-slate-400', stock: { current: 20, total: 50, percent: 40 }, cost: '₹4500.00', supplier: 'Foundry Steel Corp.', status: 'Adequate' }
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
    id: 1, name: 'VoltStream Electrical', type: 'Subcontractor', email: 'contact@voltstream.com', phone: '+1 (555) 012-3456',
    spoc: { name: 'Kevin Drake', role: 'Ops Lead', phone: '+1 555-1029', email: 'k.drake@voltstream.com' },
    kyc: { gst: '22AAAAA0000A1Z5', pan: 'ABCDE1234F' },
    address: { street: '12-A Newton St', city: 'Metropolis', pincode: '560001' },
    projects: ['Skyline Plaza', 'Harbor Heights'], balance: '₹0.00', budget: '₹5,000,000', status: 'Paid', 
    statusColor: 'bg-green-100 text-green-700', icon: 'electric_bolt', assignee: 'Marcus Thorne',
    services: ['Electrical Wiring', 'Substation Setup', 'HVAC Controls'],
    tasks: [
      { title: 'Wiring Phase 1 - 4th Floor', status: 'Completed', date: 'Apr 05, 2026' },
      { title: 'External Transformer Installation', status: 'In Progress', date: 'Apr 12, 2026' }
    ],
    audits: [{ date: 'Apr 02, 2026', score: 98, notes: 'Excellent compliance' }],
    invoices: [{ number: 'INV-1029', amount: '₹125,000.00', status: 'Paid', date: 'Apr 08, 2026' }]
  },
  { 
    id: 2, name: 'SolidRock Concrete', type: 'Supplier', email: 'billing@solidrock.io', phone: '+1 (555) 987-6543',
    spoc: { name: 'Sarah Miller', role: 'Sales Head', phone: '+1 555-9087', email: 's.miller@solidrock.io' },
    kyc: { gst: '29BBBBB1111B2Z6', pan: 'FGHIJ5678K' },
    address: { street: 'Industrial Area Phase 2', city: 'Metropolis', pincode: '560048' },
    projects: ['Metro Hub'], balance: '₹24,500.00', budget: '₹2,500,000', status: 'Pending', 
    statusColor: 'bg-secondary-container/20 text-secondary', icon: 'foundation', assignee: 'Sarah Chen',
    services: ['Ready-mix Concrete', 'Aggregate Supply'],
    tasks: [{ title: 'Foundation Pour - Block A', status: 'Scheduled', date: 'Apr 15, 2026' }],
    audits: [{ date: 'Apr 05, 2026', score: 92, notes: 'Good turnaround time' }],
    invoices: [{ number: 'INV-SR-9012', amount: '₹12,500.00', status: 'Pending', date: 'Apr 10, 2026' }]
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
    id: 'm1', name: 'James Wilson', email: 'j.wilson@buildflow.co', roleId: 'r1', status: 'Active', 
    department: 'Executive Management', lastLogin: '10 mins ago', assignedProjects: ['Skyline Plaza', 'Harbor Bridge'], performance: 98,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ6NqbeyzXdDdcKy8rA12bnb-D1XcFS2rr8zDl-BPEQQPcKodHtE3lG-MeVtaXdaulKwMjvYGMWDgMz7L1bQywZjuRsjgcfxQn9iVDDjn-S9c-U0mM0KIKQF0_U3aXqMPM9QZTt7m8khqSuD08ogwyCw24ghRW9YUe2bwt0s3THMMrL1xo9qBGM2z9kv1ZFUv238GeBHrkyEjR7jq4de8FvFuAzlnEaAF35yr9AkBXXUF3tIkIsYaqfofbVxV6-BNl4CPa95StjdLi' 
  },
  { 
    id: 'm2', name: 'Sarah Miller', email: 's.miller@buildflow.co', roleId: 'r2', status: 'Active', 
    department: 'Architecture & Design', lastLogin: '2 hours ago', assignedProjects: ['Skyline Plaza'], performance: 94,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHUV8rEr4oiC6_1MYI1kgW0ggZSnSrnAzZ-k9VQi1UGsqN13HuH0LyClUWlj-5NEiuTZuG5iwAPh3UiqAYERUA01RZgAF5tzSCnfJzgxYe6rsXk3nKj33OWlSq03mwGCkbNsdEJLjjWEgtiAzDmPSc9zGNnptJ96YiaNWCJuGE2_sDehkpznp3KkI62BRNheEw0PEgmnfRYFiBE4KuBSffkJwD4s3iXK2Mgt7IIOM7NbvCU0WNWw3260PRfTykQyJNjZOFCXL9NoMP' 
  },
  { 
    id: 'm3', name: 'David Miller', email: 'david.m@buildflow.co', roleId: 'r1', status: 'Active', 
    department: 'Operations', lastLogin: 'Yesterday', assignedProjects: ['Site B', 'Logistics Hub'], performance: 92,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPAONKTFXfNFAFRRCG77D7RtfG2-5qauZoyBKNC1x0SRt2H8iJPvCXp7AM1P89q3l7Qq_WyVlxe-FCeO2w_TrrsWe3ipppdbXy4eAZ7Hkh2lrwVptC5XQPxN9HBETRqIpg4-uNcEjsntXscqTil-e0AN3GQuq9mZVq9ZMIAM6L4OvALlJ4xFyyfFpm60RTggfLM-l5B3BFZHl1L_LR2HS8xHl6Qmm8Xp6A7xkIfXh7bvDiIFsG7NNYD4lN-9MWVG_ASp6Rtje5zuGq' 
  },
  { id: 'm4', name: 'Marcus Thorne', email: 'm.thorne@partner-arch.com', roleId: 'r5', status: 'Pending', department: 'External Consultants', lastLogin: 'N/A', assignedProjects: [], performance: 0 },
  { id: 'm5', name: 'Alex Rivera', email: 'alex.r@buildflow.co', roleId: 'r3', status: 'Active', department: 'Civil Engineering', lastLogin: '3 hours ago', assignedProjects: ['Skyline Plaza'], performance: 88 },
  { id: 'm6', name: 'Michael Park', email: 'm.park@buildflow.co', roleId: 'r4', status: 'Active', department: 'Finance', lastLogin: 'Active Now', assignedProjects: ['Global Budgeting'], performance: 96 }
];

export const contractorMetrics: ContractorMetric[] = [
  { id: 'c1', name: 'Apex Concrete Solutions', efficiency: 94.8, safetyScore: 98.2, retentionRate: 92, adherenceToSchedule: 96, personnel: 12, tasks: '28/30', logo: 'https://ui-avatars.com/api/?name=Apex+Concrete', trend: 'up' },
  { id: 'c2', name: 'Vanguard Electrical', efficiency: 88.2, safetyScore: 95.0, retentionRate: 85, adherenceToSchedule: 82, personnel: 8, tasks: '15/17', logo: 'https://ui-avatars.com/api/?name=Vanguard+Electrical', trend: 'stable' },
  { id: 'c3', name: 'Horizon Steelworks', efficiency: 76.5, safetyScore: 82.4, retentionRate: 70, adherenceToSchedule: 65, personnel: 24, tasks: '42/55', logo: 'https://ui-avatars.com/api/?name=Horizon+Steel', trend: 'down' },
  { id: 'c4', name: 'Pure Water Plumbing', efficiency: 91.0, safetyScore: 99.0, retentionRate: 95, adherenceToSchedule: 92, personnel: 6, tasks: '12/12', logo: 'https://ui-avatars.com/api/?name=Pure+Water', trend: 'up' }
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
  { id: 'r1', title: 'Site Safety Audit - Week 31', type: 'Safety', date: 'Apr 05, 2026', author: 'Dave Safety', status: 'Published', fileSize: '2.4 MB' },
  { id: 'r2', title: 'Q1 Financial Performance', type: 'Financial', date: 'Apr 02, 2026', author: 'Michael Park', status: 'Published', fileSize: '4.1 MB' },
  { id: 'r3', title: 'North Wing Structural Review', type: 'Technical', date: 'Mar 28, 2026', author: 'Sarah Miller', status: 'Archived', fileSize: '12.8 MB' },
  { id: 'r4', title: 'Monthly Progress Summary - March', type: 'Milestone', date: 'Mar 31, 2026', author: 'James Wilson', status: 'Published', fileSize: '1.2 MB' },
  { id: 'r5', title: 'Weekly Material Audit - W32', type: 'Technical', date: 'Apr 12, 2026', author: 'Logistics Team', status: 'Draft', fileSize: '850 KB' }
];
