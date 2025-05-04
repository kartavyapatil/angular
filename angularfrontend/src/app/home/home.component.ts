import { Component, OnInit } from '@angular/core';
import { ModelcomponentComponent } from '../modelcomponent/modelcomponent.component';
import { EmployeecomponentService } from '../employeecomponent.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common'
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import  {ModelforupdateComponent} from '../modelforupdate/modelforupdate.component';
import { AuthServiceTsService } from '../auth.service.ts.service';
@Component({
  selector: 'app-home',
  imports: [ModelcomponentComponent,CommonModule,DatePipe,ModelforupdateComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  selectedId: string | null = null; // <-- ID for update
  showUpdateForm: boolean = false;  // <-- toggle flag
  employees: any[] = [];
  private subscription!: Subscription;
  constructor(
    private employeeService: EmployeecomponentService,
    private authService: AuthServiceTsService,
    private router: Router
  ) {}

  async fetchAllEmployees() {
    try {
      const res: any = await this.employeeService.getAllEmployees();
      this.employees = res.employees;
    } catch (err) {
      console.error('Failed to fetch employees:', err);
    }
  }
  
  async ngOnInit(): Promise<void> {
    this.authService.fetchUser();
    await this.fetchAllEmployees(); 
    this.subscription = this.employeeService.updateNotifier$.subscribe(() => {
      this.fetchAllEmployees();
    });
  }
  async deleteEmployee(_id: string) {
    console.log('deleteEmployee', _id);
    try {
      await this.employeeService.delete(_id);
      console.log('Deleted successfully');
      // await this.fetchAllEmployees(); 
    } catch (err) {
      console.error('Delete failed:', err);
    }
  }
  onUpdateClick(id: string) {
    this.selectedId = id;
    this.showUpdateForm = true;
  }

  closeUpdateForm() {
    this.showUpdateForm = false;
    this.selectedId = null;
  }
  selectedEmployeeId: string = '';

  openModal(id: string) {
    this.selectedEmployeeId = id;
    console.log('Selected Employee ID:', this.selectedEmployeeId);
  }

  onEmployeeUpdated() {
    console.log('Employee updated!');
    // Refresh your data list or show a toast message here
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  confirmDelete(id: string) {
    const confirmed = window.confirm('Do you really want to delete this employee?');
    if (confirmed) {
      this.deleteEmployee(id);
    }
  }
  
  
}
