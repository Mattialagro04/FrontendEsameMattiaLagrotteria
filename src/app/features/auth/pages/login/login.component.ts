import { Component, OnInit } from '@angular/core';
// Importa NonNullableFormBuilder e FormGroup
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../../core/services/auth.service';
import { finalize } from 'rxjs/operators';
import { ILoginUser } from '../../../../core/models/user.model';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // 1. Dichiara la proprietà del form
  loginForm!: FormGroup;

  loading = false;
  hidePassword = true;


  // 2. Inietta i servizi necessari, incluso NonNullableFormBuilder e MatSnackBar
  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  // 3. Inizializza il form in ngOnInit
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    // 4. Usa getRawValue() per ottenere il valore fortemente tipizzato del form
    const formValue = this.loginForm.getRawValue() as ILoginUser;

    this.authService.login(formValue).pipe(
      finalize(() => this.loading = false)
    ).subscribe({
      next: () => {
        // Nessun messaggio di successo qui, il reindirizzamento è sufficiente
        this.router.navigate(['/home']);
      },
      error: err => {
        const errorMessage = err.error?.message || 'Credenziali non valide. Riprova.';
        this.snackBar.open(errorMessage, 'Chiudi', { duration: 5000, panelClass: ['error-snackbar'] });
      }
    });
  }
}