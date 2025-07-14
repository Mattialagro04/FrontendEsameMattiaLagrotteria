import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private isDark: boolean;
  private themeSubject = new BehaviorSubject<'light' | 'dark'>('light');

  theme$ = this.themeSubject.asObservable();

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    this.isDark = savedTheme === 'dark';
    this.applyTheme();
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    this.applyTheme();
    localStorage.setItem('theme', this.currentTheme);
  }

  private applyTheme() {
    if (this.isDark) {
      document.body.classList.add('dark-theme');
      this.themeSubject.next('dark');
    } else {
      document.body.classList.remove('dark-theme');
      this.themeSubject.next('light');
    }
  }

  get currentTheme(): 'light' | 'dark' {
    return this.isDark ? 'dark' : 'light';
  }
}
