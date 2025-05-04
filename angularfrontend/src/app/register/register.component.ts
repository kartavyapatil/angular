import { Component , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormsModule } from '@angular/forms';
import { AuthServiceTsService } from '../auth.service.ts.service';
import { ReactiveFormsModule ,FormGroup,FormBuilder,Validators ,AbstractControl, ValidationErrors  } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit{
 registerForm!: FormGroup;

  constructor( private fb:FormBuilder,
    private AuthServiceTsService: AuthServiceTsService,private router: Router) {}

  ngOnInit(): void {
    this.registerForm= this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(12),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{12,}$/)
      ]],
      passwordConfirm: ['', [Validators.required]],
    },{
      validators: this.passwordMatchValidator,
    });
  }
  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirm = form.get('passwordConfirm')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }
  async onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const formData = {
      name: this.registerForm.value.username,

      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };
    try {
      const res:any = await this.AuthServiceTsService.register(formData);
      console.log('Registered:', res);
      this.router.navigate(['/login']);
      // localStorage.setItem('token', res.token);
    } catch (err) {
      console.error('Registration failed:', err);
    }
  }
}
