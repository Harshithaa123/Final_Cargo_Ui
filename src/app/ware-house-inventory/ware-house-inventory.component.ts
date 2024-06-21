import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ware-house-inventory',
  templateUrl: './ware-house-inventory.component.html',
  styleUrl: './ware-house-inventory.component.css'
})
export class WareHouseInventoryComponent {

  warehouseInventoryItems: any[] = [];
  newItem: any = { warehouseId: 0, cargoId: 0, quantity: 0 };
  editItem: any | null = null;

  private apiUrl = 'https://localhost:7234/api/WarehouseInventory'; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadWarehouseInventory();
  }

  loadWarehouseInventory(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      items => this.warehouseInventoryItems = items,
      error => console.error('Error loading warehouse inventory', error)
    );
  }

  createWarehouseInventory(): void {
    console.log(this.newItem)
    this.http.post(this.apiUrl, this.newItem).subscribe(
      () => {
        console.log(this.newItem)
        this.loadWarehouseInventory();
        this.newItem = { warehouseId: 0, cargoId: 0, quantity: 0 };
      },
      error => console.error('Error creating warehouse inventory item', error)
    );
  }

  deleteWarehouseInventory(warehouseId: number, cargoId: number): void {
    this.http.delete(`${this.apiUrl}/${warehouseId}/${cargoId}`).subscribe(
      () => this.loadWarehouseInventory(),
      error => console.error('Error deleting warehouse inventory item', error)
    );
  }

  startEdit(item: any): void {
    this.editItem = { ...item };
  }

  cancelEdit(): void {
    this.editItem = null;
  }
}