import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth.service';
// Assumendo che tu abbia un ThemeService, altrimenti rimuovi le parti relative al tema
import { ThemeService } from '../../../core/services/theme.service'; 

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  // Esponiamo l'Observable dell'utente corrente al template  
  currentUser$: Observable<IUser | null>;

  constructor(
    private authService: AuthService,
    // public themeService: ThemeService // Rendi pubblico per usarlo nel template, o rimuovi
  ) {
    // Inizializziamo l'Observable prendendolo dal servizio
    this.currentUser$ = this.authService.currentUser$;
  }

  // Il metodo per il logout chiama il servizio
  logout(): void {
    this.authService.logout();
  }

  // Metodo per cambiare il tema, se lo stai usando
  // toggleTheme(): void {
  //   this.themeService.toggleTheme();
  // }
}