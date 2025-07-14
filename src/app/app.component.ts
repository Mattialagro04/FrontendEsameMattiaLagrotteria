import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FrontendGestioneUtenti';
  appReady = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.checkTokenOnLoad().then(() => {
      this.appReady = true;
    });
  }

}
