import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoPortalComponent } from './cargo-portal.component';

describe('CargoPortalComponent', () => {
  let component: CargoPortalComponent;
  let fixture: ComponentFixture<CargoPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CargoPortalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargoPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
