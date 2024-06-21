import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders: any[] = [];
  selectedOrder: any = null;

  private apiUrl = 'https://localhost:7234/api/Orders';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.http.get<any[]>(this.apiUrl).subscribe((orders) => {
      this.orders = orders;
    });
  }

  editOrder(order: any): void {
    this.selectedOrder = { ...order };
  }

  cancelEdit(): void {
    this.selectedOrder = null;
  }

  saveOrder(): void {
    if (this.selectedOrder.orderId) {
      this.http.put<any>(`${this.apiUrl}/${this.selectedOrder.orderId}`, this.selectedOrder).subscribe(
        () => {
          this.selectedOrder = null;
          this.loadOrders();
        },
        error => {
          console.error('Error updating order:', error);
        }
      );
    }
  }

  deleteOrder(id: number): void {
    this.http.delete<any>(`${this.apiUrl}/${id}`).subscribe(
      () => {
        this.loadOrders();
      },
      error => {
        console.error('Error deleting order:', error);
      }
    );
  }
}
