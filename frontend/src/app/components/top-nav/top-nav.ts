import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalSearch } from '../global-search/global-search';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [CommonModule, GlobalSearch],
  templateUrl: './top-nav.html',
  styleUrls: ['./top-nav.css']
})
export class TopNav implements OnInit {
  showSearch = false;
  isDarkMode = false;

  ngOnInit() {
    this.isDarkMode = document.documentElement.classList.contains('dark');
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      this.showSearch = true;
    }
  }
}
