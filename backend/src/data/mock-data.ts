import { Project, Task, SiteUpdate, Material, Vendor, Quote, Contract, ContractHistory } from '../models/models';

export const projects: Project[] = [
  {
    id: 'p1',
    name: 'Skyline Tower Phase II',
    location: 'Downtown Metropolis Area',
    description: 'Visualizing structural progress and resource allocation across 12 active construction sites.',
    status: 'On Track',
    progress: 64,
    type: 'Commercial',
    budget: { total: 4500000, used: 1200000 },
    team: [
      { name: 'James Wilson', role: 'Project Director', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ6NqbeyzXdDdcKy8rA12bnb-D1XcFS2rr8zDl-BPEQQPcKodHtE3lG-MeVtaXdaulKwMjvYGMWDgMz7L1bQywZjuRsjgcfxQn9iVDDjn-S9c-U0mM0KIKQF0_U3aXqMPM9QZTt7m8khqSuD08ogwyCw24ghRW9YUe2bwt0s3THMMrL1xo9qBGM2z9kv1ZFUv238GeBHrkyEjR7jq4de8FvFuAzlnEaAF35yr9AkBXXUF3tIkIsYaqfofbVxV6-BNl4CPa95StjdLi' },
      { name: 'Sarah Miller', role: 'Lead Architect', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHUV8rEr4oiC6_1MYI1kgW0ggZSnSrnAzZ-k9VQi1UGsqN13HuH0LyClUWlj-5NEiuTZuG5iwAPh3UiqAYERUA01RZgAF5tzSCnfJzgxYe6rsXk3nKj33OWlSq03mwGCkbNsdEJLjjWEgtiAzDmPSc9zGNnptJ96YiaNWCJuGE2_sDehkpznp3KkI62BRNheEw0PEgmnfRYFiBE4KuBSffkJwD4s3iXK2Mgt7IIOM7NbvCU0WNWw3260PRfTykQyJNjZOFCXL9NoMP' }
    ],
    milestones: [
      { name: 'Foundations', progress: 100, color: 'primary' },
      { name: 'Structural Framing', progress: 42, color: 'secondary' },
      { name: 'Mechanical & Elec.', progress: 12, color: 'outline' }
    ],
    lastUpdate: '2 hours ago',
    estimatedCompletion: 'Oct 24, 2024',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy4VSdkv6U8BtqZ6hyasfIDNpx-i808f9yWboZSUj5QY7VoQcXDQfJFoOHnBZ52ZcqnbdZQkTTffm2Ssn5grM20FAir2zJciQ3TaqKdU3GDyFia3p7j0BHkaz316xlh2PaXTQtdTPluF2dQruB3QQ0WV3GzveL5--UUvkSWIMkR1WmUE6V8hHwdGk2vtDoXMX560B0049U7JsM8xCfOTN_tZKF4jnjFL-4hP5gKpGOq8f5K9Zw8fVOQMqWc7Poik05KR6kWHOTCaa1'
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
      { name: 'Scaffolding', progress: 100, color: 'primary' },
      { name: 'Painting', progress: 15, color: 'secondary' }
    ],
    lastUpdate: '5 hours ago',
    estimatedCompletion: 'Dec 15, 2024',
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
  { id: 't1', projectId: 'p1', title: 'Foundation Pour', description: 'Complete the main foundation pour for the North Wing.', status: 'Completed', priority: 'High', deadline: '2024-05-12' },
  { id: 't2', projectId: 'p1', title: 'Steel Reinforcement', description: 'Install rebar for level 1-4 columns.', status: 'In Progress', priority: 'Critical', deadline: '2024-06-01' },
  { id: 't3', projectId: 'p2', title: 'Scaffolding Safety Audit', description: 'Inspect all suspended scaffolds on the West Pier.', status: 'Pending', priority: 'Medium', deadline: '2024-06-15' }
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
      { title: 'Wiring Phase 1 - 4th Floor', status: 'Completed', date: 'May 10, 2024' },
      { title: 'External Transformer Installation', status: 'In Progress', date: 'May 20, 2024' }
    ],
    audits: [{ date: 'May 01, 2024', score: 98, notes: 'Excellent compliance' }],
    invoices: [{ number: 'INV-1029', amount: '₹125,000.00', status: 'Paid', date: 'May 05, 2024' }]
  },
  { 
    id: 2, name: 'SolidRock Concrete', type: 'Supplier', email: 'billing@solidrock.io', phone: '+1 (555) 987-6543',
    spoc: { name: 'Sarah Miller', role: 'Sales Head', phone: '+1 555-9087', email: 's.miller@solidrock.io' },
    kyc: { gst: '29BBBBB1111B2Z6', pan: 'FGHIJ5678K' },
    address: { street: 'Industrial Area Phase 2', city: 'Metropolis', pincode: '560048' },
    projects: ['Metro Hub'], balance: '₹24,500.00', budget: '₹2,500,000', status: 'Pending', 
    statusColor: 'bg-secondary-container/20 text-secondary', icon: 'foundation', assignee: 'Sarah Chen',
    services: ['Ready-mix Concrete', 'Aggregate Supply'],
    tasks: [{ title: 'Foundation Pour - Block A', status: 'Scheduled', date: 'May 25, 2024' }],
    audits: [{ date: 'Apr 15, 2024', score: 92, notes: 'Good turnaround time' }],
    invoices: [{ number: 'INV-SR-9012', amount: '₹12,500.00', status: 'Pending', date: 'May 12, 2024' }]
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
    effectiveDate: 'Jan 12, 2024',
    expiryDate: 'Dec 31, 2024',
    expiryDays: 34,
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
    effectiveDate: 'Feb 05, 2024',
    expiryDate: 'Jul 15, 2025',
    expiryDays: 120,
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
    effectiveDate: 'Mar 10, 2023',
    expiryDate: 'Apr 10, 2024',
    expiryDays: 15,
    location: 'Seattle, WA',
    owner: 'James Wilson',
    type: 'Material Supply Contract',
    signatory: 'Sarah Jenkins',
    contactEmail: 's.jenkins@apexconcrete.com',
    contactPhone: '(206) 555-0144'
  }
];

export const contractHistory: ContractHistory[] = [
  { id: 'h1', contractId: 'c1', event: 'MSA Renewal Signed', description: 'Legally binding signature collected via DocuSign.', date: 'JAN 12, 2024 • 14:32 PM', active: true },
  { id: 'h2', contractId: 'c1', event: 'Project Scope Amendment #03', description: 'Revised structural load requirements for Sky-Deck A.', date: 'OCT 14, 2023', active: false },
  { id: 'h3', contractId: 'c2', event: 'Initial Partnership Onboarding', description: 'Vendor vetting and initial compliance certification.', date: 'FEB 05, 2024', active: true },
  { id: 'h4', contractId: 'c3', event: 'Price Adjustment Clause Triggered', description: 'Material cost index hit 5% threshold, adjusting unit rates.', date: 'MAR 20, 2024', active: true },
  { id: 'h5', contractId: 'c3', event: 'Initial Partnership Onboarding', description: 'Onboarded for foundation reinforcement phase.', date: 'MAR 10, 2023', active: false }
];
