import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-budget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-budget.html',
  styleUrls: ['./project-budget.css']
})
export class ProjectBudget implements OnInit {
  constructor() {}

  ngOnInit() {}
}
