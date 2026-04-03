import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.html',
  styleUrls: ['./add-task.css']
})
export class AddTaskModal {
  @Input() initialStatus: string = 'To Do';
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  task = {
    title: '',
    description: '',
    priority: 'Medium Priority',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    status: ''
  };

  priorities = [
    { label: 'High Priority', class: 'bg-red-100 text-red-700' },
    { label: 'Medium Priority', class: 'bg-blue-100 text-blue-700' },
    { label: 'Low Priority', class: 'bg-amber-100 text-amber-700' }
  ];

  constructor() {}

  ngOnInit() {
    this.task.status = this.initialStatus;
  }

  onSubmit() {
    if (this.task.title.trim()) {
      const priorityObj = this.priorities.find(p => p.label === this.task.priority);
      this.save.emit({
        ...this.task,
        priorityClass: priorityObj?.class || 'bg-slate-100 text-slate-700'
      });
      this.close.emit();
    }
  }
}
