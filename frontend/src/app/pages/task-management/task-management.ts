import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskDetail } from '../../components/task-detail/task-detail';

interface TaskItem {
  priority: string;
  priorityClass: string;
  title: string;
  description?: string;
  date?: string;
  assignee?: string;
  assignees?: string[];
  progress?: number;
  status?: string;
  file?: string;
  fileSize?: string;
  completed?: boolean;
}

interface TaskColumn {
  title: string;
  color: string;
  count: number;
  tasks: TaskItem[];
}

@Component({
  selector: 'app-task-management',
  standalone: true,
  imports: [CommonModule, TaskDetail],
  templateUrl: './task-management.html',
  styleUrls: ['./task-management.css']
})
export class TaskManagement implements OnInit {
  selectedTask: any = null;
  columns: TaskColumn[] = [
    {
      title: 'To Do',
      color: 'bg-slate-400',
      count: 4,
      tasks: [
        {
          priority: 'High Priority',
          priorityClass: 'bg-red-100 text-red-700',
          title: 'Foundational Reinforcement Review',
          description: 'Audit the steel rebar placement for Sector B-4 following the heavy rain inspection reports.',
          date: 'Oct 24, 2023',
          assignee: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoRMWgVC4z1Ua54NyduAyjaqUcpMABUCt4ymY7Pfze2n-lHdB9xejwHxBqWzXf1MnHt-PYbTmKhK7rkxBq6T6jQy-9ry53QiJWObXaTxUdsS9-1PjJ7MVlH497ZmKanP3mWVRWo1fiPmg5g7t07IR7Ur8fSxtaEiGPUHGbWPyjDkUL9ZllEX3Qh9zjND377JfowkMwBfEK7GtNG5QzKRZwOwVByMgaJJY0b1fxKo1KU3ppFfyO9gSUN8VHM4erWo2T1b3fnM0aeKgE'
        },
        {
          priority: 'Medium Priority',
          priorityClass: 'bg-blue-100 text-blue-700',
          title: 'Material Delivery: Floor Tiles',
          description: 'Coordinate unloading of 400 pallets of Grade A ceramic tiles for the lobby area.',
          date: 'Oct 26, 2023',
          assignee: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAudk_c82wiM2MBWr7OTYj48W1CdiunBxuq780hcF8c0FR_xNiZD7b74yss6NA1haasX-d83uY4yfXbZ17M1EMJbaj4nB8OONUEz9fkJmrEVqLeKSimK04TbRyX7xRwouyUYAAH8G1JriFjc2HLcPWtOMnaIOpIQ_c1vQ67hBMGuLN3JTNwXf_7Ms3R4B-NJSHwD3EdlzwZrZWl8u0MDZqdkDK4-0h4cHczxpo73uWDlnzLpEbNbvQyW8CoYXlBDD5Vv8YmEHPXYyUV'
        }
      ]
    },
    {
      title: 'In Progress',
      color: 'bg-amber-500',
      count: 2,
      tasks: [
        {
          priority: 'Low Priority',
          priorityClass: 'bg-amber-100 text-amber-700',
          title: 'Electrical Conduit Installation',
          progress: 65,
          status: 'In Progress',
          assignee: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKm5P5NhrF5J7Dp0IwYlyOA0lRaYzLodVkuCShEp3I-fUxMCFkjvqP4KKnzMxPMSeO5aaHOaNkCrnFyPF9pkzRzVgsaxCXQEBjdb4j0uDsW_jTOkmVVoFTvg8xKMumaQdgrPnGJ8APU9CKo2yhoaxZbTe6dB3mklD0YtGUdYR0Xt3a3a8QKp8nRxkhShpKzsjqK9qVzohZOfZWDtMq6CGR1iZ_l4gNggbA-2n3Q-qN94jWZsoYpxPSrCFTvbN5a0CXhE5kC6nQ9g6o'
        }
      ]
    },
    {
      title: 'Review',
      color: 'bg-blue-600',
      count: 1,
      tasks: [
        {
          priority: 'High Priority',
          priorityClass: 'bg-red-100 text-red-700',
          title: 'Structural Load Testing Report',
          description: 'Review final stress test results for the cantilevered terrace on Floor 12.',
          file: 'stress_test_v4.pdf',
          fileSize: '4.2 MB',
          status: 'Awaiting Approval',
          assignees: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBlzv382bQdBaspnd36QkLXo11nB579Hpv89hNV3TeHwFpafe7hZcM9F4hwi-QRJ_RRP-eMw0Pxo0Prl_QtK1pkQNxHbFk_2Zji8x8R4XKW6v4eqKw-fdGlLn85gbwFPWV95lMCHJiDGo8ubYq_p10cPXNeGdiKTrD2d4SRYxFDmKOROTQ2QnATLVPPlCNKooRk5HrUMNFuyiRPJUsEFVnRXEwNnjWXB7kceeqE-oKw5DjsTCP02iELJfnEHkcS418JPj-HxGodFbHl',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDCmAzMNPcrHEosxP83ZhZTbeAMcr579CBK2uRXchFewP4_T9n3A8y_6o4ZR7fy9QT3plAq31PxLkuGX2jmpvQMqEe_BjcBMQiCe7nXVc5S1pjlZA3-cnicOslYI7FdfOkbjFTkRUFIUZrhrkEDVlMrrSzKW2hlZjL65N0vkDPhLoCZLmOU2Ud5cuAkmsh3vAZvHoH8HnHuRqJMH5QkXAZGOcSdsywEzKwT2tDTDxA8f4xMs6gkge18qzHaH9NKV0Fimt4V0ChfSyAK'
          ]
        }
      ]
    },
    {
      title: 'Completed',
      color: 'bg-green-500',
      count: 12,
      tasks: [
        {
          priority: 'Archived',
          priorityClass: 'bg-slate-100 text-slate-500',
          title: 'Demolition Sector A-1',
          status: 'Verified Complete',
          completed: true
        }
      ]
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  openTaskDetail(task: any) {
    this.selectedTask = task;
  }

  closeTaskDetail() {
    this.selectedTask = null;
  }
}
