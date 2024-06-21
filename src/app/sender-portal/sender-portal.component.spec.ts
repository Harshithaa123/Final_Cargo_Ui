import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderPortalComponent } from './sender-portal.component';

describe('SenderPortalComponent', () => {
  let component: SenderPortalComponent;
  let fixture: ComponentFixture<SenderPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SenderPortalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SenderPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
