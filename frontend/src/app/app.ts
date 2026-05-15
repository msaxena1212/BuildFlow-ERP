import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { TopNav } from './components/top-nav/top-nav';
import { AiAssistant } from './components/ai-assistant/ai-assistant';
import { QuickActions } from './components/quick-actions/quick-actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Sidebar, TopNav, AiAssistant, QuickActions],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  ngOnInit() {
    console.log('ZYNO Site Initialization Complete.');
  }
}
