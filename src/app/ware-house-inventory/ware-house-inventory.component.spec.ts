import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WareHouseInventoryComponent } from './ware-house-inventory.component';

describe('WareHouseInventoryComponent', () => {
  let component: WareHouseInventoryComponent;
  let fixture: ComponentFixture<WareHouseInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WareHouseInventoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WareHouseInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
