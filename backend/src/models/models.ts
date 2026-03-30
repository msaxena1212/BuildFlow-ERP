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
