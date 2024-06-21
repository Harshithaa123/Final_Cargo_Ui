import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiverPortalComponent } from './receiver-portal.component';

describe('ReceiverPortalComponent', () => {
  let component: ReceiverPortalComponent;
  let fixture: ComponentFixture<ReceiverPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceiverPortalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiverPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
