import { Component,OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule ,FormBuilder, Validators,FormGroup   } from '@angular/forms';
import { AuthServiceTsService } from '../auth.service.ts.service';
import { RouterLink ,Router} from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private AuthServiceTsService: AuthServiceTsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(12),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{12,}$/)
      ]],
    });
  }

  async onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    try {
      const res:any = await this.AuthServiceTsService.login(this.loginForm.value);
      console.log('Logged in:', res);
      this.router.navigate(['/home']);
      localStorage.setItem('token', res.token);
    } catch (err) {
      console.error('Login failed:', err);
    }
  }
}
