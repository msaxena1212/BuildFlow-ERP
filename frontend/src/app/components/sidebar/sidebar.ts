import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RbacService } from '../../services/rbac.service';
import { PermissionDirective } from '../../directives/permission.directive';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, PermissionDirective],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar {
  private rbacService = inject(RbacService);

  can(module: any, action: any) {
    return this.rbacService.can(module, action);
  }
}
