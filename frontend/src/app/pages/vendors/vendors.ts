import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vendors',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './vendors.html'
})
export class VendorManagement {
  vendors = [
    { id: 1, name: 'VoltStream Electrical', type: 'Primary Subcontractor', email: 'contact@voltstream.com', phone: '+1 (555) 012-3456', projects: ['Skyline Plaza', 'Harbor Heights'], balance: '$0.00', status: 'Paid', statusColor: 'bg-green-100 text-green-700', icon: 'electric_bolt', wide: false },
    { id: 2, name: 'SolidRock Concrete', type: 'Material Supplier', email: 'billing@solidrock.io', phone: '+1 (555) 987-6543', projects: ['Metro Hub'], balance: '$24,500.00', status: 'Pending', statusColor: 'bg-secondary-container/20 text-secondary', icon: 'foundation', wide: false },
    { id: 3, name: 'Elite Finishes Co.', type: 'Finishing & Painting', email: 'ops@elitefinishes.com', phone: '+1 (555) 456-7890', projects: ['The Ridge Condos', 'Westside Loft'], balance: '$12,400.00', status: 'Due', statusColor: 'bg-red-100 text-error', icon: 'imagesearch_roller', wide: false },
    { id: 4, name: 'FlowMasters HVAC', type: 'Subcontractor', email: 'support@flowmasters.net', phone: '+1 (555) 123-0000', projects: ['Skyline Plaza'], balance: '$0.00', status: 'Paid', statusColor: 'bg-green-100 text-green-700', icon: 'plumbing', wide: false }
  ];

  activities = [
    { icon: 'receipt_long', iconColor: 'text-secondary', title: 'New Invoice Uploaded', desc: 'SolidRock Concrete submitted invoice #SR-9012 for $12,500.00', time: '2 hours ago' },
    { icon: 'task_alt', iconColor: 'text-primary', title: 'Certification Renewed', desc: 'VoltStream Electrical updated their Liability Insurance documentation.', time: 'Yesterday' },
    { icon: 'domain_add', iconColor: 'text-on-tertiary-fixed-variant', title: 'New Assignment', desc: "Elite Finishes Co. assigned to 'Westside Loft' Interior painting phase.", time: '3 days ago' }
  ];
}
