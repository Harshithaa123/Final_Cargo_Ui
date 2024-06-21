import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.css']
})
export class AdminPortalComponent implements OnInit {
  @ViewChild('barChart') barChart!: ElementRef;
  @ViewChild('lineChart') lineChart!: ElementRef;

  cargoData: { status: string, count: number }[] = [];
  ordersByDate: { date: string, count: number }[] = [];

  totalOrders: number | undefined;
  pendingOrders: number | undefined;
  completedOrders: number | undefined;
  cancelledOrders: number | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchOrderCounts();
    this.fetchOrderStatuses();
    this.fetchOrdersByDate();
  }

  fetchOrderCounts(): void {
    this.http.get<number>('https://localhost:7234/api/Orders/TotalOrders').subscribe(
      data => this.totalOrders = data,
      error => console.error('Error fetching total orders', error)
    );
    this.http.get<number>('https://localhost:7234/api/Orders/PendingOrders').subscribe(
      data => this.pendingOrders = data,
      error => console.error('Error fetching pending orders', error)
    );
    this.http.get<number>('https://localhost:7234/api/Orders/CompletedOrders').subscribe(
      data => this.completedOrders = data,
      error => console.error('Error fetching completed orders', error)
    );
    this.http.get<number>('https://localhost:7234/api/Orders/CancelledOrders').subscribe(
      data => this.cancelledOrders = data,
      error => console.error('Error fetching cancelled orders', error)
    );
  }

  fetchOrderStatuses(): void {
    this.http.get<{ status: string, count: number }[]>('https://localhost:7234/api/Reports/orders-by-status').subscribe(
      data => {
        this.cargoData = data;
        this.createCargoChart();
      },
      error => console.error('Error fetching order statuses', error)
    );
  }

  fetchOrdersByDate(): void {
    this.http.get<{ date: string, count: number }[]>('https://localhost:7234/api/Orders/OrdersGroupedByDate').subscribe(
      data => {
        this.ordersByDate = data;
        this.createOrdersByDateChart();
      },
      error => console.error('Error fetching orders by date', error)
    );
  }

  createCargoChart(): void {
    const labels = this.cargoData.map(item => item.status);
    const data = this.cargoData.map(item => item.count);

    const ctx = this.barChart.nativeElement.getContext('2d');

    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Cargo Status Counts',
            data: data,
            backgroundColor: [
              '#FF6384', // Red
              '#36A2EB', // Blue
              '#FFCE56', // Yellow
              '#4BC0C0', // Teal
              '#9966FF', // Purple
              '#FF9F40'  // Orange
            ],
            borderColor: [
              '#FF6384', // Red
              '#36A2EB', // Blue
              '#FFCE56', // Yellow
              '#4BC0C0', // Teal
              '#9966FF', // Purple
              '#FF9F40'  // Orange
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('Failed to get 2D context for Cargo chart');
    }
  }

  createOrdersByDateChart(): void {
    const labels = this.ordersByDate.map(item => new Date(item.date).toLocaleDateString());
    const data = this.ordersByDate.map(item => item.count);

    const ctx = this.lineChart.nativeElement.getContext('2d');

    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Orders by Date',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)', 
            borderColor: 'rgba(54, 162, 235, 1)',      
            borderWidth: 2,
            fill: true, 
            tension: 0.4 
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('Failed to get 2D context for Orders by Date chart');
    }
  }
}
