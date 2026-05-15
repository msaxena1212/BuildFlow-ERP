import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RbacService, Role, TeamMember, AppModule, PermissionAction } from '../../services/rbac.service';
import { PermissionDirective } from '../../directives/permission.directive';

@Component({
  selector: 'app-rbac-management',
  standalone: true,
  imports: [CommonModule, FormsModule, PermissionDirective],
  templateUrl: './rbac.html',
  styleUrls: ['./rbac.css']
})
export class RbacManagement implements OnInit {
  private rbacService = inject(RbacService);
  Math = Math;

  roles: Role[] = [];
  members: TeamMember[] = [];
  selectedRole: Role | null = null;
  roleMembers: TeamMember[] = [];

  // Modals
  showAddRoleModal = false;
  newRole = { name: '', description: '', permissions: [] };

  modules: AppModule[] = ['Dashboard', 'Projects', 'Team', 'Contracts', 'Tasks', 'Materials', 'Quotes', 'Reports', 'Settings'];
  actions: PermissionAction[] = ['CREATE', 'READ', 'UPDATE', 'DELETE'];

  ngOnInit() {
    this.rbacService.roles$.subscribe(r => {
      this.roles = r;
      if (!this.selectedRole && r.length > 0) {
        this.selectRole(r[0]);
      } else if (this.selectedRole) {
        // Refresh the selected role in case permissions changed
        const updated = r.find(role => role.id === this.selectedRole?.id);
        if (updated) this.selectedRole = { ...updated, permissions: [...updated.permissions] };
      }
    });

    this.rbacService.team$.subscribe(t => {
      this.members = t;
      this.updateRoleMembers();
    });
  }

  selectRole(role: Role) {
    this.selectedRole = { ...role, permissions: [...role.permissions] };
    this.updateRoleMembers();
  }

  updateRoleMembers() {
    if (!this.selectedRole) {
      this.roleMembers = [];
      return;
    }
    this.roleMembers = this.members.filter(m => m.roleId === this.selectedRole?.id);
  }

  getRoleMemberCount(roleId: string): number {
    return this.members.filter(m => m.roleId === roleId).length;
  }

  hasPermission(role: Role, module: string, action: string): boolean {
    return role.permissions.includes(`${module}:${action}`);
  }

  togglePermission(module: string, action: string) {
    if (!this.selectedRole || this.selectedRole.isSystem) return;
    
    const perm = `${module}:${action}`;
    const idx = this.selectedRole.permissions.indexOf(perm);
    
    if (idx > -1) {
      this.selectedRole.permissions.splice(idx, 1);
    } else {
      this.selectedRole.permissions.push(perm);
    }
    
    this.rbacService.updateRole(this.selectedRole.id, { permissions: this.selectedRole.permissions }).subscribe();
  }

  toggleAllModulePermissions(module: string, checked: boolean) {
    if (!this.selectedRole || this.selectedRole.isSystem) return;

    this.actions.forEach(action => {
      const perm = `${module}:${action}`;
      const idx = this.selectedRole!.permissions.indexOf(perm);
      if (checked && idx === -1) {
        this.selectedRole!.permissions.push(perm);
      } else if (!checked && idx > -1) {
        this.selectedRole!.permissions.splice(idx, 1);
      }
    });

    this.rbacService.updateRole(this.selectedRole.id, { permissions: this.selectedRole.permissions }).subscribe();
  }

  isModuleFullyPermitted(module: string): boolean {
    if (!this.selectedRole) return false;
    return this.actions.every(action => this.selectedRole!.permissions.includes(`${module}:${action}`));
  }

  openAddRoleModal() {
    this.newRole = { name: '', description: '', permissions: [] };
    this.showAddRoleModal = true;
  }

  addRole() {
    if (!this.newRole.name) return;
    this.rbacService.addRole(this.newRole).subscribe(() => {
      this.showAddRoleModal = false;
    });
  }

  deleteRole(role: Role) {
    if (role.isSystem) return;
    if (confirm(`Are you sure you want to delete the "${role.name}" role? This action cannot be undone.`)) {
      this.rbacService.deleteRole(role.id).subscribe();
    }
  }

  getModuleIcon(module: string): string {
    const icons: Record<string, string> = {
      'Dashboard': 'dashboard',
      'Projects': 'architecture',
      'Team': 'group',
      'Contracts': 'description',
      'Tasks': 'assignment',
      'Materials': 'inventory_2',
      'Quotes': 'request_quote',
      'Reports': 'analytics',
      'Settings': 'settings'
    };
    return icons[module] || 'extension';
  }
}
