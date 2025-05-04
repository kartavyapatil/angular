import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { signal } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceTsService {
  private baseUrl = 'http://localhost:8000/api/v1/auth';

  constructor(private http: HttpClient, private router: Router) {}
  private userSignal = signal<any>(null);
  public user$ = this.userSignal.asReadonly();

  register(userData: any) {
    console.log('User registered:', userData);
    return firstValueFrom(this.http.post(`${this.baseUrl}/register`, userData));
  }

  login(userData: any) {
    return firstValueFrom(this.http.post(`${this.baseUrl}/login`, userData));
  }
  async fetchUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      const res = await this.http.get<{ user: any }>(
        `${this.baseUrl}/profile`,
        { headers: { Authorization: `Bearer ${token}` } }
      ).toPromise();

      this.userSignal.set(res!.user);
    } catch (err) {
      console.error(err);
      this.router.navigate(['/login']);
    }
  }

  get user() {
    return this.userSignal();
  }
}

