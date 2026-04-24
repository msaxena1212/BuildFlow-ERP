import { Component, EventEmitter, Output, Input, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.html',
  styleUrls: ['./add-task.css']
})
export class AddTaskModal implements OnInit {
  @Input() initialStatus: string = 'To Do';
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  private projectService = inject(ProjectService);

  task = {
    title: '',
    description: '',
    priority: 'Medium Priority',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    startDate: new Date().toISOString().split('T')[0],
    duration: 5,
    status: '',
    assigneeName: '',
    assignee: '',
    checklist: [] as { title: string, completed: boolean }[],
    dependencies: [] as any[],
    attachments: [] as any[],
    initialComment: ''
  };

  newSubTaskTitle = '';
  selectedPredecessorId = '';
  selectedDepType = 'FS';
  depLag = 0;
  allTasks: any[] = [];

  priorities = [
    { label: 'High Priority', class: 'bg-red-100 text-red-700' },
    { label: 'Medium Priority', class: 'bg-blue-100 text-blue-700' },
    { label: 'Low Priority', class: 'bg-amber-100 text-amber-700' }
  ];

  dependencyTypes = [
    { id: 'FS', name: 'Finish-to-Start (FS)', desc: 'Predecessor must finish before Successor can start' },
    { id: 'SS', name: 'Start-to-Start (SS)', desc: 'Predecessor must start before Successor can start' },
    { id: 'FF', name: 'Finish-to-Finish (FF)', desc: 'Predecessor must finish before Successor can finish' },
    { id: 'SF', name: 'Start-to-Finish (SF)', desc: 'Predecessor must start before Successor can finish' }
  ];

  teamMembers = [
    { name: 'Elena Rodriguez', avatar: 'https://images.unsplash.com/photo-1537724326059-2ea20251b9c8?q=80&w=256&auto=format&fit=crop' },
    { name: 'Marcus Thorne', avatar: 'https://initials.io/avatar/MT/256' },
    { name: 'Sarah Chen', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy6kguFDpbdu22RXyzkZYEhqX6zZEB61_rkYQakGSdDaKyicjFqwYwX-xV5AeD4JAF9upktLl2kbkNOl3sxreIDp_iEcEWUdbCVjEz9nEXXpojx3wKwjlZF92kfgLYHm5oSnZe9N6e1e2YfXckf7J2h87fMzxNpkEyhzpr3Xf1vGcvdgdN7DSMD0iPxAN7SB3qZK_Q68q__M_ytxq4yEtFU89urVWQwwb00q9zAV-1Fegc3uv9XKviFvE0GKZzh7pIyTXBVUF2Pjd0' }
  ];

  ngOnInit() {
    this.task.status = this.initialStatus;
    this.projectService.getTasks().subscribe(tasks => {
      this.allTasks = tasks;
    });
  }

  onAssigneeSelect(event: any) {
    const selected = this.teamMembers.find(m => m.name === event.target.value);
    if (selected) {
      this.task.assigneeName = selected.name;
      this.task.assignee = selected.avatar;
    }
  }

  addSubTask() {
    if (this.newSubTaskTitle.trim()) {
      this.task.checklist.push({ title: this.newSubTaskTitle.trim(), completed: false });
      this.newSubTaskTitle = '';
    }
  }

  removeSubTask(index: number) {
    this.task.checklist.splice(index, 1);
  }

  addDependency() {
    if (this.selectedPredecessorId) {
      const pred = this.allTasks.find(t => t.id === this.selectedPredecessorId);
      const typeObj = this.dependencyTypes.find(t => t.id === this.selectedDepType);
      this.task.dependencies.push({
        predecessorId: this.selectedPredecessorId,
        predecessorTitle: pred?.title,
        type: this.selectedDepType,
        typeName: typeObj?.name,
        lag: this.depLag
      });
      this.selectedPredecessorId = '';
    }
  }

  getSelectedDepDesc() {
    return this.dependencyTypes.find(t => t.id === this.selectedDepType)?.desc || '';
  }

  removeDependency(index: number) {
    this.task.dependencies.splice(index, 1);
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      this.task.attachments.push({
        name: files[i].name,
        size: (files[i].size / 1024).toFixed(1) + ' KB',
        icon: 'description',
        color: 'blue'
      });
    }
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
