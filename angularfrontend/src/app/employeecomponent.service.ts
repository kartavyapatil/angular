import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { firstValueFrom ,Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeecomponentService {
  private baseUrl = 'http://localhost:8000/api/v1/employee';

  constructor(private http: HttpClient) {}
  private employeeUpdated = new Subject<void>();
  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
  get updateNotifier$() {
    return this.employeeUpdated.asObservable();
  }


  register(userData: any) {
    console.log('User registered:', userData);
    return firstValueFrom(
      this.http.post(`${this.baseUrl}/create`,userData,
      { headers: this.getHeaders() }
    )).then((res) => {
      this.employeeUpdated.next(); 
      return res;
    });
  }

  delete(_id: string) {
    return firstValueFrom(this.http.delete(
      `${this.baseUrl}/delete/${_id}`,
      { headers: this.getHeaders() }
    )).then((res) => {
      this.employeeUpdated.next(); 
      return res;
    });
  }

  getAllEmployees() {
    return firstValueFrom(this.http.get(
      `${this.baseUrl}/getall`,
      { headers: this.getHeaders() }
    ));

  }
  getemployeebyid(_id:string){
    console.log('ID this is from service:', _id);
    return firstValueFrom(this.http.get(
      `${this.baseUrl}/get/${_id}`,
      { headers: this.getHeaders() }
    ));
  }
  updateEmployee(_id: string, userData: any) {
    console.log('User updated:', userData);
    console.log('ID:', _id);
    return firstValueFrom(this.http.put(
      `${this.baseUrl}/update/${_id}`,userData,
      { headers: this.getHeaders() }
    )).then((res) => {
      this.employeeUpdated.next(); 
      return res;
    });
  }
}