import { Project, Task, SiteUpdate } from '../models/models';

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
