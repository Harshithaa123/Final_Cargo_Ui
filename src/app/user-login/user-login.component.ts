import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  loginForm: FormGroup;
  isLoginMode = true;
  name : any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      registrationDate: [new Date()] 
    });
  }
  ngOnInit(): void {
    this.toggleFormControls();
  }
  onSubmit(): void {
    const formData = this.loginForm.value;
    console.log(formData.email);
    if (this.isLoginMode) {
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          this.http.get(`https://localhost:7234/api/UserDetails/getUserName/${formData.email}/${formData.password}`)
          .subscribe((data:any)=>{
            console.log("data is comming from api");
            console.log(data[0]);
            localStorage.setItem('username', data[0].firstName);
          })
          Swal.fire({
            title: "SignIn Success",
            text: "You have successfully SignedIn",
            icon: "success"
          });
          console.log(userCredential);
          this.navigateToUserPortal(userCredential.user);
        })
        .catch(error => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Inavalid Credential, Please give valid credential",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
          console.log(error);
        });
    } else {

      console.log(formData.email+" "+formData.password);
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          console.log(userCredential);
          Swal.fire({
            title: "SignuUp Success",
            text: "You have successfully LoggedIn",
            icon: "success"
          });
          console.log(formData);
          this.storeUserDetails(formData); 
          this.signupSuccess();
        })
        .catch(error => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "EmailId already exists",
            footer: '<a href="#">Please try to signup using diffrent EmailId</a>'
          });
        });
    }
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.toggleFormControls();
  }

  private toggleFormControls(): void {
    if (this.isLoginMode) {
      this.loginForm.get('firstName')?.clearValidators();
      this.loginForm.get('lastName')?.clearValidators();
    } else {
      this.loginForm.get('firstName')?.setValidators([Validators.required]);
      this.loginForm.get('lastName')?.setValidators([Validators.required]);
    }
    this.loginForm.get('firstName')?.updateValueAndValidity();
    this.loginForm.get('lastName')?.updateValueAndValidity();
  }

  private navigateToUserPortal(user: any): void {
    this.router.navigate(['/user-portal']);
  }

  private signupSuccess(): void {
    this.toggleMode();
  }

  private storeUserDetails(formData: any): void {

    const user = {
      email : formData.email,
      firstName : formData.firstName,
      lastName : formData.lastName,
      passwordHash:formData.password,
      registrationDate:formData.registrationDate
    }
    console.log("This is the user" + user);
    this.http.post('https://localhost:7234/api/Users/register', user)
      .subscribe(
        (response: any) => {
         
          console.log('User details stored successfully:', response);
         
          this.navigateToUserPortal(response); 
        },
        (error: any) => {
           console.log('Form Data:', formData);
          console.error('Error storing user details:', error);
          alert('Failed to register user. Please try again.');
        }
      );
  }
}