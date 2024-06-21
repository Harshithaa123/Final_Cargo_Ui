import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ware-house-portal',
  templateUrl: './ware-house-portal.component.html',
  styleUrl: './ware-house-portal.component.css'
})
export class WareHousePortalComponent {
  cargoId: number | null = null;
  cargoIdWeight: number | null = null;
  cargoIdDamage: number | null = null;

  weight: number | null = null;
  isDamaged: boolean | null = null;
  reorderMessage: string | null = null;

  errorMessage: string | null = null;

  activeSection: string | null = 'check-weight'; // Default to 'check-weight' section

  private apiUrl = 'https://localhost:7234/api/Cargo'; 

  constructor(private http: HttpClient) { }

  setActiveSection(section: string): void {
    this.activeSection = section;
  }

  checkWeight(): void {
    if (this.cargoIdWeight !== null) {
      this.http.get<{ weight: number }>(`${this.apiUrl}/check-weight/${this.cargoIdWeight}`)
        .subscribe(
          response => this.weight = response.weight,
          error => console.error('Error checking weight', error)
        );
    }
  }

  checkDamage(): void {
    if (this.cargoIdDamage !== null) {
      this.http.get<{ isDamaged: boolean }>(`${this.apiUrl}/check-damage/${this.cargoIdDamage}`)
        .subscribe(
          response => this.isDamaged = response.isDamaged,
          error => console.error('Error checking damage', error)
        );
    }
  }

  reorderCargo(): void {
    if (this.cargoId !== null) {
      this.http.post<{ message: string, newOrderId: number }>(`${this.apiUrl}/reorder/${this.cargoId}`, {})
        .subscribe(
          response => {
            this.reorderMessage = response.message;
            this.errorMessage = null;
          },
          (error: HttpErrorResponse) => {
            if (error.status === 400 && error.error === 'Cargo is not damaged') {
              this.errorMessage = 'Cannot reorder. Cargo is not damaged.';
            } else {
              console.error('Error reordering cargo', error);
              this.errorMessage = 'Failed to reorder cargo.';
            }
          }
        );
    } else {
      this.errorMessage = 'Please enter a valid Cargo ID.';
    }
  }
}