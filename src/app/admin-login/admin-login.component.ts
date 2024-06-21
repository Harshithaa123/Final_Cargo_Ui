import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  error: string = '';

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      const { email, password } = loginData;

      this.http.post(`https://localhost:7234/api/UserRegistrationsTables/login/${email}/${password}`, {})
        .subscribe(
          (response: any) => {
            console.log('Login successful:', response);
            Swal.fire({
              title: "Login Success",
              text: "You have successfully Login",
              icon: "success"
            });
            this.router.navigate(['admin-portal']);
          },
          (error: any) => {
            console.error('Login error:', error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Inavalid Credential, Please give valid credential",
              footer: '<a href="#">Why do I have this issue?</a>'
            });
          }
        );
    } else {
      console.log("Invalid form");
      window.alert('Please fill out the form correctly.');
    }
  }
}
