import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { ProjectDetail } from './pages/project-detail/project-detail';
import { TaskManagement } from './pages/task-management/task-management';
import { ProjectTimeline } from './pages/project-timeline/project-timeline';
import { LaborEfficiency } from './pages/labor-efficiency/labor-efficiency';
import { ProgressReport } from './pages/progress-report/progress-report';
import { NewProjectWizard } from './pages/new-project-wizard/new-project-wizard';
import { CalendarView } from './pages/calendar/calendar';
import { MaterialsManagement } from './pages/materials/materials';
import { MaterialDetailView } from './pages/material-detail/material-detail';
import { VendorManagement } from './pages/vendors/vendors';
import { Quotations } from './pages/quotations/quotations';
import { NewQuoteWizard } from './pages/new-quote-wizard/new-quote-wizard';
import { NotFoundPage } from './pages/not-found/not-found';

import { ContractManagement } from './pages/contracts/contracts';
import { BillingDetail } from './pages/billing/billing';
import { TeamManagement } from './pages/team/team';
import { Settings } from './pages/settings/settings';
import { ProjectsList } from './pages/projects-list/projects-list';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'projects', component: ProjectsList },
  { path: 'project/:id', component: ProjectDetail },
  { path: 'tasks', component: TaskManagement },
  { path: 'calendar', component: CalendarView },
  { path: 'timeline', component: ProjectTimeline },
  { path: 'labor', component: LaborEfficiency },
  { path: 'reports', component: ProgressReport },
  { path: 'new-project', component: NewProjectWizard },
  { path: 'materials', component: MaterialsManagement },
  { path: 'materials/:id', component: MaterialDetailView },
  { path: 'vendors', component: VendorManagement },
  { path: 'vendors/:id', component: VendorManagement },
  { path: 'quotations', component: Quotations },
  { path: 'quotations/new', component: NewQuoteWizard },
  { path: 'contracts', component: ContractManagement },
  { path: 'billing', component: BillingDetail },
  { path: 'team', component: TeamManagement },
  { path: 'settings', component: Settings },
  { path: 'not-found', component: NotFoundPage },
  { path: '**', component: NotFoundPage }
];
