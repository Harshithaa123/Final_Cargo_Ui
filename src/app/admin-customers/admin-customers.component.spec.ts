import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomersComponent } from './admin-customers.component';

describe('AdminCustomersComponent', () => {
  let component: AdminCustomersComponent;
  let fixture: ComponentFixture<AdminCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCustomersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
