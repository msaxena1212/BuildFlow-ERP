import { Directive, Input, TemplateRef, ViewContainerRef, inject, OnDestroy } from '@angular/core';
import { RbacService, AppModule, PermissionAction } from '../services/rbac.service';
import { Subscription, combineLatest } from 'rxjs';

@Directive({
  selector: '[appPermission]',
  standalone: true
})
export class PermissionDirective implements OnDestroy {
  private rbacService = inject(RbacService);
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);
  private sub?: Subscription;

  @Input() set appPermission(permission: string) {
    const [module, action] = permission.split(':') as [AppModule, PermissionAction];
    
    this.sub?.unsubscribe();
    this.sub = combineLatest([
      this.rbacService.currentUser$,
      this.rbacService.roles$
    ]).subscribe(() => {
      this.viewContainer.clear();
      if (this.rbacService.can(module, action)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
