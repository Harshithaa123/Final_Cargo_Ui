import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cargo-portal',
  templateUrl: './cargo-portal.component.html',
  styleUrls: ['./cargo-portal.component.css']
})
export class CargoPortalComponent implements OnInit {
  cargos: any[] = [];
  newCargo: any = {
    cargoName: '',
    weight: 0,
    damaged: false,
    dateStored: new Date().toISOString().split('T')[0],
    warehouseId: null
  };
  shiftCargoData: any = {
    cargoId: 0,
    fromWarehouseId: 0,
    toWarehouseId: 0
  };
  trackCargoId: any;
  trackedCargo: any = null;
  apiUrl = 'https://localhost:7234/api/Cargo';
  isUpdating = false;
  showAddForm = false;
  showShiftForm = false;
  showTrackForm = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCargos();
  }

  loadCargos(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(cargos => {
      this.cargos = cargos;
    });
  }

  addCargo(): void {
    this.http.post<any>(this.apiUrl, this.newCargo).subscribe(result => {
      this.cargos.push(result);
      this.newCargo = {
        cargoName: '',
        weight: 0,
        damaged: false,
        dateStored: new Date().toISOString().split('T')[0],
        warehouseId: null
      };
      this.showAddForm = false;
    });
  }

  updateCargo(cargo: any): void {
    this.newCargo = { ...cargo };
    this.showAddForm = true;
    this.isUpdating = true;
  }

  saveUpdatedCargo(): void {
    this.http.put<any>(`${this.apiUrl}/${this.newCargo.cargoId}`, this.newCargo).subscribe(result => {
      const index = this.cargos.findIndex(c => c.cargoId === result.cargoId);
      if (index !== -1) {
        this.cargos[index] = result;
      }
      this.newCargo = null;
      this.showAddForm = false;
      this.isUpdating = false;
    });
  }

  deleteCargo(cargoId: number): void {
    this.http.delete<any>(`${this.apiUrl}/${cargoId}`).subscribe(() => {
      this.cargos = this.cargos.filter(c => c.cargoId !== cargoId);
    });
  }

  showAddCargoForm(): void {
    this.showAddForm = true;
    this.showShiftForm = false;
    this.showTrackForm = false;
    this.isUpdating = false;
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    this.isUpdating = false;
  }

  showShiftCargoForm(): void {
    this.showShiftForm = true;
    this.showAddForm = false;
    this.showTrackForm = false;
  }

  toggleShiftForm(): void {
    this.showShiftForm = !this.showShiftForm;
  }

  shiftCargo() {
    const { cargoId, fromWarehouseId, toWarehouseId } = this.shiftCargoData;
    const url = `${this.apiUrl}/shift?cargoId=${cargoId}&fromWarehouseId=${fromWarehouseId}&toWarehouseId=${toWarehouseId}`;

    this.http.post<any>(url, {}).subscribe(
      result => {
        console.log('Cargo shifted successfully', result);
        this.showShiftForm = false;
      },
      error => {
        console.error('Error shifting cargo', error);
      }
    );
  }

  showTrackCargoForm(): void {
    this.showTrackForm = true;
    this.showAddForm = false;
    this.showShiftForm = false;
  }

  toggleTrackForm(): void {
    this.showTrackForm = !this.showTrackForm;
  }

  trackCargo(): void {
    this.http.get<any>(`${this.apiUrl}/track/${this.trackCargoId}`).subscribe(result => {
      this.trackedCargo = result;
      this.showTrackForm = false;
    });
  }
}
