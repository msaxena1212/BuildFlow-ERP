import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialService, Material } from '../../services/material.service';

@Component({
  selector: 'app-material-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './material-detail.html'
})
export class MaterialDetailView implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private materialService = inject(MaterialService);

  Math = Math;

  materialId: string | null = '';
  material: Material | undefined;

  showScheduleModal = false;
  showAdjustModal = false;
  activeActionMenu: string | null = null;
  
  newDelivery = {
    date: '',
    qty: '',
    site: 'Site 102 - Skyline Plaza',
    inspector: 'James Wilson'
  };

  adjustStockValue = 0;

  deliveries = [
    { date: 'May 12, 2024', qty: '2,500 kg', batch: '#BTC-882-A', inspector: 'M. Henderson', status: 'Approved', statusColor: 'bg-green-600', dotColor: 'bg-green-600', textStatus: 'Approved' },
    { date: 'May 05, 2024', qty: '2,500 kg', batch: '#BTC-741-A', inspector: 'S. Petrov', status: 'Approved', statusColor: 'bg-green-600', dotColor: 'bg-green-600', textStatus: 'Approved' },
    { date: 'Apr 28, 2024', qty: '1,200 kg', batch: '#BTC-612-B', inspector: 'M. Henderson', status: 'Pending QC', statusColor: 'text-amber-600', dotColor: 'bg-amber-600', textStatus: 'Pending QC' }
  ];

  ngOnInit() {
    this.materialId = this.route.snapshot.paramMap.get('id');
    if (this.materialId) {
      this.material = this.materialService.getMaterialBySku(this.materialId);
      if (this.material) {
        this.adjustStockValue = this.material.stock.current;
      }
    }
  }

  openAdjustModal() {
    if (this.material) {
      this.adjustStockValue = this.material.stock.current;
      this.showAdjustModal = true;
    }
  }

  updateStock() {
    if (this.material) {
      this.materialService.updateMaterial(this.material.sku, {
        stock: {
          current: this.adjustStockValue,
          total: this.material.stock.total,
          percent: Math.round((this.adjustStockValue / this.material.stock.total) * 100)
        }
      });
      // Refresh local reference
      this.material = this.materialService.getMaterialBySku(this.material.sku);
      this.showAdjustModal = false;
      alert('Stock updated successfully!');
    }
  }

  openScheduleModal() {
    const today = new Date();
    this.newDelivery.date = today.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    this.showScheduleModal = true;
  }

  scheduleDelivery() {
    const newEntry = {
      date: this.newDelivery.date,
      qty: this.newDelivery.qty,
      batch: '#GEN-' + Math.floor(Math.random() * 1000) + '-X',
      inspector: this.newDelivery.inspector,
      status: 'Scheduled',
      statusColor: 'bg-slate-400',
      dotColor: 'bg-slate-400',
      textStatus: 'In Transit'
    };
    this.deliveries = [newEntry, ...this.deliveries];
    this.showScheduleModal = false;
    alert('Delivery Scheduled successfully!');
  }

  deleteMaterial() {
    if (this.material && confirm('Are you sure you want to delete this material?')) {
      this.materialService.deleteMaterial(this.material.sku);
      this.router.navigate(['/materials']);
    }
  }

  goBack() {
    this.router.navigate(['/materials']);
  }

  updateDeliveryStatus(batch: string, status: string) {
    const delivery = this.deliveries.find(d => d.batch === batch);
    if (delivery) {
      delivery.status = status;
      delivery.textStatus = status;
      delivery.dotColor = status === 'Approved' ? 'bg-green-600' : 'bg-red-600';
      alert(`Batch ${batch} updated to ${status}`);
    }
  }

  viewLogs(batch?: string) {
    if (batch) {
      this.showAlert(`Viewing detailed logs for Batch: ${batch}\n- Quality Pass: Yes\n- Transit Time: 1.2 days\n- Inspection: Verified`);
    } else {
      this.showAlert('Opening Full Logistics Audit Trail...');
    }
  }

  showAlert(message: string) {
    alert(message);
  }
}
