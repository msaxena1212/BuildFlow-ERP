import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-files',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-files.html',
  styleUrls: ['./project-files.css']
})
export class ProjectFiles implements OnInit {
  constructor() {}

  ngOnInit() {}
}
