import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeanceBookingComponent } from './seance-booking.component';

describe('SeanceBookingComponent', () => {
  let component: SeanceBookingComponent;
  let fixture: ComponentFixture<SeanceBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeanceBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeanceBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
