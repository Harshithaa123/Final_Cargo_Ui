import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WareHousePortalComponent } from './ware-house-portal.component';

describe('WareHousePortalComponent', () => {
  let component: WareHousePortalComponent;
  let fixture: ComponentFixture<WareHousePortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WareHousePortalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WareHousePortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
