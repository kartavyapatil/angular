// import { Component,OnInit  } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule ,FormBuilder, Validators,FormGroup   } from '@angular/forms';
// import { AuthServiceTsService } from '../auth.service.ts.service';
// import { EmployeecomponentService } from '../employeecomponent.service';
// import { RouterLink ,Router} from '@angular/router';
// @Component({
//   selector: 'app-modelcomponent',
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './modelcomponent.component.html',
//   styleUrl: './modelcomponent.component.scss'
// })
// export class ModelcomponentComponent {
  
//   register!:FormGroup;
//   constructor( private fb:FormBuilder,
//     private EmployeecomponentService: EmployeecomponentService,private router: Router) {}

//   ngOnInit(): void {
//     this.register= this.fb.group({
//       name: ['', [Validators.required, Validators.minLength(3)]],
//       experience: ['', [Validators.required, Validators.min(1)]],
//       dateofbirth: ['', [Validators.required]],
//       role: ['', [Validators.required]],
//     });
//   }
//   async oncreate() {
//     if (this.register.invalid) {
//       this.register.markAllAsTouched();
//       return;
//     }
//     const formData = {
//       name: this.register.value.name,
//       experience: this.register.value.experience,
//       dateofbirth: this.register.value.dateofbirth,
//       role: this.register.value.role,

//     };
//     try {
//       const res:any = await this.EmployeecomponentService.register(formData);
//       console.log('Registered:', res);
//       this.router.navigate(['/home']);
//     } catch (err) {
//       console.error('Registration failed:', err);
//     }
//   }
  
  
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { AuthServiceTsService } from '../auth.service.ts.service';
import { EmployeecomponentService } from '../employeecomponent.service';
import { RouterLink, Router } from '@angular/router';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modelcomponent',
  imports: [CommonModule, ReactiveFormsModule, RouterLink,MatSnackBarModule],
  templateUrl: './modelcomponent.component.html',
  styleUrl: './modelcomponent.component.scss',
  standalone: true,
})
export class ModelcomponentComponent implements OnInit {
  register!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private EmployeecomponentService: EmployeecomponentService,
    private router: Router,
    private snackBar: MatSnackBar

  ) {}

  ngOnInit(): void {
    this.register = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      experience: ['', [Validators.required, Validators.min(1)]],
      dateofbirth: ['', [Validators.required, this.dateLessThanTodayValidator()]],
      role: ['', [Validators.required]],
    });
  }

  // Custom Validator for date of birth
  dateLessThanTodayValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const inputDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize today's date
      if (control.value && inputDate >= today) {
        return { dateNotInPast: true };
      }
      return null;
    };
  }

  async oncreate() {
    if (this.register.invalid) {
      this.register.markAllAsTouched();
      return;
    }

    const formData = {
      name: this.register.value.name,
      experience: this.register.value.experience,
      dateofbirth: this.register.value.dateofbirth,
      role: this.register.value.role,
    };

    try {
      const res: any = await this.EmployeecomponentService.register(formData);
      console.log('Registered:', res);
      this.router.navigate(['/home']);
      this.showMessage()
    } catch (err) {
      console.error('Registration failed:', err);
    }
  }

  showMessage() {
    this.snackBar.open('Employee register!', 'Close', {
      duration: 3000,
       horizontalPosition: 'right',
  verticalPosition: 'top'
    });
  }
}
