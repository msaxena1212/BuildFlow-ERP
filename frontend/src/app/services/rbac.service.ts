import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap, of } from 'rxjs';
import { environment } from '../../environments/environment';

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
    name: 'Arjun Mehra',
    email: 'a.mehra@buildflow.in',
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
    this.http.get<Role[]>(`${environment.apiUrl}/roles`).subscribe(r => this.rolesSubject.next(r));
  }

  refreshTeam() {
    this.http.get<TeamMember[]>(`${environment.apiUrl}/team`).subscribe(t => this.teamSubject.next(t));
  }

  getRoles(): Observable<Role[]> {
    return this.roles$;
  }

  addRole(role: Partial<Role>) {
    return this.http.post<Role>(`${environment.apiUrl}/roles`, role).pipe(
      tap(() => this.refreshRoles())
    );
  }

  updateRole(id: string, role: Partial<Role>) {
    return this.http.patch<Role>(`${environment.apiUrl}/rbac/roles/${id}`, role).pipe(
      tap(() => this.refreshRoles())
    );
  }

  deleteRole(id: string) {
    return this.http.delete(`${environment.apiUrl}/rbac/roles/${id}`).pipe(
      tap(() => this.refreshRoles())
    );
  }

  // Permission Checking Logic
  can(module: AppModule, action: PermissionAction): boolean {
    return true; // RBAC Disabled
  }

  hasRole(roleName: string): boolean {
    return true; // RBAC Disabled
  }

  // Switch user for testing/demo purposes
  impersonate(memberEmail: string) {
    const member = this.teamSubject.value.find(m => m.email === memberEmail);
    if (member) {
      this.currentUserSubject.next(member);
    }
  }

  getCurrentUser(): TeamMember | null {
    return this.currentUserSubject.value;
  }
}
