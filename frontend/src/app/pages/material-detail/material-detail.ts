import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-material-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './material-detail.html'
})
export class MaterialDetailView implements OnInit {
  materialId: string | null = '';

  deliveries = [
    { date: 'May 12, 2024', qty: '2,500 kg', batch: '#BTC-882-A', inspector: 'M. Henderson', status: 'Approved', statusColor: 'bg-green-600', dotColor: 'bg-green-600', textStatus: 'Approved' },
    { date: 'May 05, 2024', qty: '2,500 kg', batch: '#BTC-741-A', inspector: 'S. Petrov', status: 'Approved', statusColor: 'bg-green-600', dotColor: 'bg-green-600', textStatus: 'Approved' },
    { date: 'Apr 28, 2024', qty: '1,200 kg', batch: '#BTC-612-B', inspector: 'M. Henderson', status: 'Pending QC', statusColor: 'text-amber-600', dotColor: 'bg-amber-600', textStatus: 'Pending QC' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.materialId = this.route.snapshot.paramMap.get('id');
  }
}
