


import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmployeecomponentService } from '../employeecomponent.service';
import { Router } from '@angular/router';
// import { MatSnackBarModule, MatSnackBar } from '@angular/material';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-modelforupdate',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,MatSnackBarModule],
  templateUrl: './modelforupdate.component.html',
  styleUrls: ['./modelforupdate.component.scss']
})
export class ModelforupdateComponent implements OnInit, OnChanges {
  @Input() _id!: string;
  @Output() updated = new EventEmitter<void>();
  update!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeecomponentService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.update = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      experience: ['', [Validators.required]],
      dateofbirth: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['_id'] && this._id) {
      console.log('ID changed:', this._id);
      this.loadEmployeeData();
    }
  }

  private async loadEmployeeData() {
    try {
      const employee: any = await this.employeeService.getemployeebyid(this._id);
      // console.log('Employee data:', employee);
      const emp = employee;
      if (emp) {
        console.log('Employee data:', emp);
                this.update.patchValue({
                  name: emp.employee.name,
                  experience: emp.employee.experience,
                  dateofbirth: this.formatDateForInput(emp.employee.dateofbirth),
                  role: emp.employee.role
                });
                console.log('Form patched with:', this.update.value);
              }
    } catch (err) {
      console.error('Failed to fetch employee:', err);
    }
  }
  formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); 
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  

  async onupdate() {
    if (this.update.invalid) {
      this.update.markAllAsTouched();
      return;
    }

    try {
      await this.employeeService.updateEmployee(this._id, this.update.value);
      this.updated.emit();
      this.showMessage()
    } catch (err) {
      console.error('Update failed:', err);
    }
  }
  showMessage() {
    this.snackBar.open('Employee Updated!', 'Close', {
      duration: 3000,
             horizontalPosition: 'right',
  verticalPosition: 'top'
    });
  }
  
}
