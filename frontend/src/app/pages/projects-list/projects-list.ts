import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project.service';

interface Project {
  id: string;
  name: string;
  location: string;
  description: string;
  status: string;
  progress: number;
  type: string;
  budget: { total: number, used: number };
  team: { name: string, role: string, avatar: string }[];
  milestones: { name: string, progress: number, color: string }[];
  lastUpdate: string;
  estimatedCompletion: string;
  thumbnail: string;
}

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './projects-list.html',
  styleUrls: ['./projects-list.css']
})
export class ProjectsList implements OnInit {
  projects: Project[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.loading = true;
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load projects. Please try again.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'On Track': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'At Risk': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'Delayed': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
    }
  }
}
