import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { IUser } from '../../core/models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: IUser | null = null;
  isAdmin = false;
  users: IUser[] = [];

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
      this.isAdmin = user?.ruolo === 'admin';

      if (this.isAdmin) {
        this.loadUsers();
      }
    });
  }

  private loadUsers(): void {
    this.http.get<IUser[]>(`${environment.apiUrl}/utenti`).subscribe({
      next: users => this.users = users,
      error: err => console.error('Errore caricando utenti:', err)
    });
  }
}
