import { Component } from '@angular/core';

@Component({
  selector: 'app-access-denied',
  template: `
    <div class="access-denied-container">
      <h1>Accesso Negato</h1>
      <p>Non hai i permessi necessari per visualizzare questa pagina.</p>
      <a routerLink="/home">Torna alla Home</a>
    </div>
  `,
  styles: [`
    .access-denied-container {
      margin: 2rem;
      text-align: center;
    }
  `]
})
export class AccessDeniedComponent {}
