import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-portal',
  templateUrl: './user-portal.component.html',
  styleUrl: './user-portal.component.css'
})
export class UserPortalComponent {

  email: string | null = null;
  passwordHash: string | null = null;
  userName: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

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
    const apiUrl = `https://localhost:7234/api/UserRegistrationsTables/getUserName/${this.email}/${this.passwordHash}`;
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
    Swal.fire({
      title: "Are you sure?",
      text: "Want to Logout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, LogOut!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "LogOut!",
          text: "Logout Successfully!!.",
          icon: "success"
        });
        this.router.navigate(['user-login']);
      }
    });
    console.log('User logged out'); 
  }
}