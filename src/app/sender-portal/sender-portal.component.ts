import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sender-portal',
  templateUrl: './sender-portal.component.html',
  styleUrls: ['./sender-portal.component.css']
})
export class SenderPortalComponent implements OnInit {
  sendOrderForm: FormGroup;
  loading = false;
  submitted = false;
  error: string = '';
  warehouses: any;
  senderId: number | null = null;
  receiverId: number | null = null;

  email: string | null = null;
  passwordHash: string | null = null;
  userName: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.sendOrderForm = this.formBuilder.group({
      receiverId: ['', Validators.required],
      cargoName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      fromWarehouseId: ['', Validators.required],
      toWarehouseId: ['', Validators.required],
      orderDate: [new Date().toISOString().slice(0, 16), Validators.required], 
      senderId: [this.senderId],
      status: ['Pending'],
      isOutgoing: [true],
      location: ['', Validators.required]
    });
  }

  get f() { return this.sendOrderForm.controls; }

  ngOnInit(): void {
    this.loadCredentialsFromLocalStorage();
    if (this.email && this.passwordHash) {
      this.fetchCurrentUser();
    } else {
      console.error('Email or password not found in local storage');
    }
    this.fetchWarehouses();
  }

  loadCredentialsFromLocalStorage(): void {
    this.email = localStorage.getItem('email');
    this.passwordHash = localStorage.getItem('passwordHash');
    this.userName = localStorage.getItem('username');
  }

  fetchCurrentUser(): void {
    const apiUrl = `https://localhost:7234/api/UserDetails/getUserName/${this.email}/${this.passwordHash}`;
    this.http.get(apiUrl).subscribe(
      (user: any) => {
        this.senderId = user.userId; 
        console.log('User details fetched successfully', user);
      },
      (error: any) => {
        console.error('Failed to fetch user details', error);
      }
    );
  }

  fetchWarehouses(): void {
    const apiUrl = 'https://localhost:7234/api/Warehouses';
    this.http.get(apiUrl).subscribe(
      (data: any) => {
        this.warehouses = data;
        console.log('Warehouses fetched successfully', this.warehouses);
      },
      (error: any) => {
        console.error('Failed to fetch warehouses', error);
      }
    );
  }

  onSubmit(): void {
    Swal.fire({
      title: "Order Success",
      text: "Congratulations! Your order has been placed successfully.",
      icon: "success"
    });
    const order = {
      senderId: this.senderId,
      receiverId: this.sendOrderForm.value.receiverId,
      cargoName: this.sendOrderForm.value.cargoName,
      quantity: this.sendOrderForm.value.quantity,
      fromWarehouseId: this.sendOrderForm.value.fromWarehouseId,
      toWarehouseId: this.sendOrderForm.value.toWarehouseId,
      orderDate: new Date().toISOString().slice(0, 16),
      status: 'Pending',
      isOutgoing: true
    };
    console.log(order)
    this.http.post('https://localhost:7234/api/Orders', order)
      .subscribe(
        response => {
          console.log('Order sent successfully:', response);
          this.loading = false;
          this.sendOrderForm.reset();
          this.submitted = false;
        },
        error => {
          this.error = error.message; // or error.toString() depending on the error format
          console.error('Failed to send order:', error);
          this.loading = false;
        }
      );
  }

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('email');
      localStorage.removeItem('passwordHash');
      console.log('User logged out');
      this.router.navigate(['user-login']);
    }
  }
}
