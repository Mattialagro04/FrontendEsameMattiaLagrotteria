import { Component, OnInit } from '@angular/core';
// Importa NonNullableFormBuilder invece di FormBuilder e FormGroup invece di solo Validators
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { finalize } from 'rxjs/operators';
import { IRegisterUser } from '../../../../core/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // 1. Dichiarazione della proprietà del form, senza inizializzazione
  registerForm!: FormGroup; // L'operatore '!' dice a TypeScript che la inizializzeremo nel costruttore

  loading = false;
  hidePassword = true;


  // 2. Inietta NonNullableFormBuilder e gli altri servizi
  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  
  // 3. Inizializza il form in ngOnInit (o nel costruttore, ngOnInit è una prassi comune)
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      // Usando NonNullableFormBuilder, i valori non saranno mai null
      nome: ['', [Validators.required]],
      cognome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      ruolo: ['user' as const] // Valore di default
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      // Potresti voler marcare i campi come "touched" per mostrare gli errori
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    
    // 4. Ora this.registerForm.getRawValue() è di tipo IRegisterUser
    // getRawValue() include anche i campi disabilitati, per i form semplici è intercambiabile con .value
    const formValue = this.registerForm.getRawValue() as IRegisterUser;

    this.authService.register(formValue).pipe(
      finalize(() => this.loading = false)
    ).subscribe({
      next: () => {
        this.snackBar.open('Registrazione avvenuta con successo!', 'OK', { duration: 3000 });
        this.router.navigate(['/home']);
      },
      error: err => {
        const errorMessage = err.error?.message || 'Registrazione fallita. Riprova.';
        this.snackBar.open(errorMessage, 'Chiudi', { duration: 5000, panelClass: ['error-snackbar'] });
      }
    });
  }
}