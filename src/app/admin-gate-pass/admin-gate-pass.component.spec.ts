import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGatePassComponent } from './admin-gate-pass.component';

describe('AdminGatePassComponent', () => {
  let component: AdminGatePassComponent;
  let fixture: ComponentFixture<AdminGatePassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminGatePassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminGatePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
