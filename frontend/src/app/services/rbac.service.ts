import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap, of } from 'rxjs';

export type PermissionAction = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';
export type AppModule = 'Dashboard' | 'Projects' | 'Team' | 'Contracts' | 'Tasks' | 'Materials' | 'Quotes' | 'Reports' | 'Settings';

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isSystem?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  roleId: string;
  status: string;
  avatar?: string;
  department?: string;
  lastLogin?: string;
  assignedProjects?: string[];
  performance?: number;
}

@Injectable({
  providedIn: 'root'
})
export class RbacService {
  private http = inject(HttpClient);
  private rolesSubject = new BehaviorSubject<Role[]>([]);
  private teamSubject = new BehaviorSubject<TeamMember[]>([]);
  
  // Mock current user for demo - James Wilson (Admin)
  private currentUserSubject = new BehaviorSubject<TeamMember | null>({
    id: 'm1',
    name: 'James Wilson',
    email: 'j.wilson@buildflow.co',
    roleId: 'r1',
    status: 'Active',
    department: 'Executive Management',
    lastLogin: '10 mins ago',
    performance: 98
  });

  roles$ = this.rolesSubject.asObservable();
  team$ = this.teamSubject.asObservable();
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.refreshRoles();
    this.refreshTeam();
  }

  refreshRoles() {
    this.http.get<Role[]>('http://localhost:3000/api/roles').subscribe(r => this.rolesSubject.next(r));
  }

  refreshTeam() {
    this.http.get<TeamMember[]>('http://localhost:3000/api/team').subscribe(t => this.teamSubject.next(t));
  }

  getRoles(): Observable<Role[]> {
    return this.roles$;
  }

  addRole(role: Partial<Role>) {
    return this.http.post<Role>('http://localhost:3000/api/roles', role).pipe(
      tap(() => this.refreshRoles())
    );
  }

  updateRole(id: string, role: Partial<Role>) {
    return this.http.patch<Role>(`http://localhost:3000/api/roles/${id}`, role).pipe(
      tap(() => this.refreshRoles())
    );
  }

  deleteRole(id: string) {
    return this.http.delete(`http://localhost:3000/api/roles/${id}`).pipe(
      tap(() => this.refreshRoles())
    );
  }

  // Permission Checking Logic
  can(module: AppModule, action: PermissionAction): boolean {
    const user = this.currentUserSubject.value;
    if (!user) return false;

    const role = this.rolesSubject.value.find(r => r.id === user.roleId);
    if (!role) return false;

    // Admin has full access
    if (role.name === 'Administrator') return true;

    const permission = `${module}:${action}`;
    return role.permissions.includes(permission);
  }

  hasRole(roleName: string): boolean {
    const user = this.currentUserSubject.value;
    if (!user) return false;
    const role = this.rolesSubject.value.find(r => r.id === user.roleId);
    return role?.name === roleName;
  }

  // Switch user for testing/demo purposes
  impersonate(memberEmail: string) {
    const member = this.teamSubject.value.find(m => m.email === memberEmail);
    if (member) {
      this.currentUserSubject.next(member);
    }
  }
}
