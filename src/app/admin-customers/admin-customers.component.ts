import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-customers',
  templateUrl: './admin-customers.component.html',
  styleUrls: ['./admin-customers.component.css']
})
export class AdminCustomersComponent implements OnInit {
  apiUrl = 'https://localhost:7234/api/UserRegistrationsTables'; 
  userDetails: any[] = [];
  selectedUserDetail: any = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadUserDetails();
  }

  loadUserDetails(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      userDetails => {
        this.userDetails = userDetails;
      },
      error => {
        console.error('Error loading user details:', error);
      }
    );
  }

  editUserDetail(userDetail: any): void {
    this.selectedUserDetail = { ...userDetail }; 
  }

  cancelEdit(): void {
    this.selectedUserDetail = null;
  }

  saveUserDetail(): void {
    if (this.selectedUserDetail.registrationId) {
      this.http.put<any>(`${this.apiUrl}/${this.selectedUserDetail.registrationId}`, this.selectedUserDetail).subscribe(
        () => {
          this.selectedUserDetail = null;
          this.loadUserDetails();
        },
        error => {
          console.error('Error updating user detail:', error);
        }
      );
    }
  }

  deleteUserDetail(id: number): void {
    this.http.delete<any>(`${this.apiUrl}/${id}`).subscribe(
      () => {
        this.loadUserDetails();
      },
      error => {
        console.error('Error deleting user detail:', error);
      }
    );
  }
}
