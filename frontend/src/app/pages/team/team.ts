import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RbacService, Role, TeamMember } from '../../services/rbac.service';
import { PermissionDirective } from '../../directives/permission.directive';

@Component({
  selector: 'app-team-management',
  standalone: true,
  imports: [CommonModule, FormsModule, PermissionDirective],
  templateUrl: './team.html',
  styleUrls: ['./team.css']
})
export class TeamManagement implements OnInit {
  private rbacService = inject(RbacService);
  Math = Math;

  searchTerm = '';
  pageSize = 8;
  currentPage = 1;

  // Modals
  showAddModal = false;
  showEditModal = false;
  selectedMember: TeamMember | null = null;
  
  // Data
  roles: Role[] = [];
  members: TeamMember[] = [];
  currentUser: TeamMember | null = null;

  editingMember: any = null;
  newMember = { name: '', email: '', roleId: 'r5', status: 'Active', department: '', assignedProjects: [] };
  
  stats = [
    { label: 'Core Team', value: 0, icon: 'groups', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Engineering', value: 0, icon: 'engineering', color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Operations', value: 0, icon: 'rocket_launch', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Performance Avg', value: '92%', icon: 'bolt', color: 'text-green-600', bg: 'bg-green-50' }
  ];

  ngOnInit() {
    this.rbacService.roles$.subscribe(r => this.roles = r);
    this.rbacService.team$.subscribe(t => {
      this.members = t;
      this.updateStats();
    });
    this.rbacService.currentUser$.subscribe(u => this.currentUser = u);
  }

  updateStats() {
    this.stats[0].value = this.members.length;
    this.stats[1].value = this.members.filter(m => m.department?.includes('Engineering') || m.department?.includes('Architecture')).length;
    this.stats[2].value = this.members.filter(m => m.department === 'Operations').length;
    
    const totalPerf = this.members.reduce((acc, current) => acc + (current.performance || 0), 0);
    const avg = this.members.length > 0 ? Math.round(totalPerf / this.members.filter(m => m.performance! > 0).length) : 0;
    this.stats[3].value = `${avg}%`;
  }

  getRoleName(roleId: string) {
    return this.roles.find(r => r.id === roleId)?.name || 'Guest';
  }

  getRoleClass(roleId: string) {
    const role = this.roles.find(r => r.id === roleId);
    if (role?.name === 'Administrator') return 'bg-blue-500/10 text-blue-600 border-blue-200';
    if (role?.name === 'Project Manager') return 'bg-amber-500/10 text-amber-600 border-amber-200';
    if (role?.name === 'Site Engineer') return 'bg-green-500/10 text-green-600 border-green-200';
    if (role?.name === 'Accountant') return 'bg-purple-500/10 text-purple-600 border-purple-200';
    return 'bg-slate-500/10 text-slate-600 border-slate-200';
  }

  get searchedMembers() {
    return this.members.filter(m =>
      m.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      m.department?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get totalPages() {
    return Math.ceil(this.searchedMembers.length / this.pageSize);
  }

  get paginatedMembers() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.searchedMembers.slice(start, start + this.pageSize);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }

  openAddModal() {
    this.newMember = { name: '', email: '', roleId: 'r5', status: 'Active', department: '', assignedProjects: [] };
    this.showAddModal = true;
  }

  addMember() {
    if (!this.newMember.name || !this.newMember.email) return;
    this.rbacService.refreshTeam();
    this.showAddModal = false;
  }

  openEditModal(member: TeamMember) {
    this.editingMember = { ...member };
    this.showEditModal = true;
  }

  saveEdit() {
    this.showEditModal = false;
  }

  deleteMember(member: TeamMember) {
    if (confirm(`Remove ${member.name} from the team?`)) {
    }
  }

  impersonate(member: TeamMember) {
    this.rbacService.impersonate(member.email);
  }
}


