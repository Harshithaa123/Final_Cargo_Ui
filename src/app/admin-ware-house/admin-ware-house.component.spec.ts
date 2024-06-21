import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWareHouseComponent } from './admin-ware-house.component';

describe('AdminWareHouseComponent', () => {
  let component: AdminWareHouseComponent;
  let fixture: ComponentFixture<AdminWareHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminWareHouseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminWareHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
