import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-receiver-portal',
  templateUrl: './receiver-portal.component.html',
  styleUrl: './receiver-portal.component.css'
})
export class ReceiverPortalComponent {
  email: string | null = null;
  passwordHash: string | null = null;
  userName: string | null = null;

  receiverForm: FormGroup;
  orders: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route:Router
  ) {
    this.receiverForm = this.formBuilder.group({
      userId: [''] 
    });
  }
  ngOnInit(): void {
    this.loadCredentialsFromLocalStorage();
    if (this.email && this.passwordHash) {
      this.fetchCurrentUser();
    } else {
      console.error('Email or password not found in local storage');
     
    }
  }
  loadCredentialsFromLocalStorage(): void {
    this.email = localStorage.getItem('email');
    this.passwordHash = localStorage.getItem('passwordHash');
    this.userName=localStorage.getItem('username');
  }

  fetchCurrentUser(): void {
    const apiUrl = `https://localhost:7234/api/UserDetails/getUserName/${this.email}/${this.passwordHash}`;
    this.http.get(apiUrl).subscribe(
      (user: any) => {
        this.userName = user.firstName;
        console.log('User details fetched successfully', user);
      },
      (error: any) => {
        console.error('Failed to fetch user details', error);
      }
    );
  }

  logout(): void {  
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    console.log('User logged out');
    this.route.navigate(['user-login']);
  }
  onSubmit(): void {
    const userId = this.receiverForm.get('userId')?.value;
    if (!userId) {
      return;
    }
    this.loading = true;
    this.http.get<any[]>(`https://localhost:7234/api/Orders/receive/${userId}`)
      .subscribe(
        (orders: any[]) => {
          this.orders = orders;
          this.loading = false;
        },
        error => {
          this.error = error.message || 'Failed to fetch orders';
          this.loading = false;
        }
      );
  }

}
