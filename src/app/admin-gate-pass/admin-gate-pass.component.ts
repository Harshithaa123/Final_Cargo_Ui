import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-gate-pass',
  templateUrl: './admin-gate-pass.component.html',
  styleUrls: ['./admin-gate-pass.component.css']
})
export class AdminGatePassComponent implements OnInit {
  gatePasses: any[] = [];
  selectedGatePass: any = null;
  private apiUrl = 'https://localhost:7234/api/GatePasses';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadGatePasses();
  }

  loadGatePasses(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      data => {
        this.gatePasses = data;
        console.log(data);
      },
      error => {
        console.error('Error loading gate passes:', error);
      }
    );
  }

  editGatePass(gatePass: any): void {
    this.selectedGatePass = { ...gatePass };
  }

  updateGatePass(): void {
    if (!this.selectedGatePass) return;

    this.http.put<any>(`${this.apiUrl}/${this.selectedGatePass.gatePassId}`, this.selectedGatePass).subscribe(
      () => {
        const index = this.gatePasses.findIndex(gp => gp.gatePassId === this.selectedGatePass.gatePassId);
        if (index !== -1) {
          this.gatePasses[index] = { ...this.selectedGatePass };
        }
        this.selectedGatePass = null;
      },
      error => {
        console.error('Error updating gate pass:', error);
      }
    );
  }

  deleteGatePass(id: number): void {
    this.http.delete<any>(`${this.apiUrl}/${id}`).subscribe(
      () => {
        this.gatePasses = this.gatePasses.filter(gp => gp.gatePassId !== id);
      },
      error => {
        console.error('Error deleting gate pass:', error);
      }
    );
  }
}
