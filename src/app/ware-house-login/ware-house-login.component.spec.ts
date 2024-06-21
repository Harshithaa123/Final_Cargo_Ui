import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WareHouseLoginComponent } from './ware-house-login.component';

describe('WareHouseLoginComponent', () => {
  let component: WareHouseLoginComponent;
  let fixture: ComponentFixture<WareHouseLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WareHouseLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WareHouseLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
