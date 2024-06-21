import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-ware-house',
  templateUrl: './admin-ware-house.component.html',
  styleUrls: ['./admin-ware-house.component.css']
})
export class AdminWareHouseComponent implements OnInit {
  warehouseForm: FormGroup;
  warehouses: any[] = [];
  editMode = false;
  currentWarehouseId: number | null = null;

  apiUrl = 'https://localhost:7234/api/Warehouses';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.warehouseForm = this.fb.group({
      warehouseId: 0,
      warehouseName: ['', Validators.required],
      location: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
      mobileNum: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]]
    });
  }

  ngOnInit(): void {
    this.getWarehouses();
  }

  getWarehouses(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        this.warehouses = data;
      },
      (error) => {
        console.error('Error fetching warehouses:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.warehouseForm.valid) {
      const warehouseData = this.warehouseForm.value;

      if (this.editMode && this.currentWarehouseId !== null) {
        this.updateWarehouse(this.currentWarehouseId, warehouseData);
      } else {
        this.addWarehouse(warehouseData);
      }
    } else {
      console.error('Form is invalid. Please check all fields.');
    }
  }

  addWarehouse(warehouse: any): void {
    this.http.post<any>(this.apiUrl, warehouse).subscribe(
      (response) => {
        this.warehouses.push(response);
        this.warehouseForm.reset();
      },
      (error) => {
        console.error('Error adding warehouse:', error);
      }
    );
  }

  updateWarehouse(id: number, updatedWarehouse: any): void {
    this.http.put<any>(`${this.apiUrl}/${id}`, updatedWarehouse).subscribe(
      (response) => {
        const index = this.warehouses.findIndex(w => w.warehouseId === id);
        if (index !== -1) {
          this.warehouses[index] = { ...updatedWarehouse, warehouseId: id };
        }
        this.editMode = false;
        this.currentWarehouseId = null;
        this.warehouseForm.reset();
      },
      (error) => {
        console.error('Error updating warehouse:', error);
      }
    );
  }

  editWarehouse(warehouse: any): void {
    this.editMode = true;
    this.currentWarehouseId = warehouse.warehouseId;
    // Populate form fields with existing warehouse details
    this.warehouseForm.patchValue({
      warehouseId: warehouse.warehouseId,
      warehouseName: warehouse.warehouseName,
      location: warehouse.location,
      capacity: warehouse.capacity,
      mobileNum: warehouse.mobileNum
    });
  }

  deleteWarehouse(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(
      () => {
        this.warehouses = this.warehouses.filter(w => w.warehouseId !== id);
      },
      (error) => {
        console.error('Error deleting warehouse:', error);
      }
    );
  }
}