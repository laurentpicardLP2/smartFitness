import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimestampFacilityComponent } from './timestamp-facility.component';

describe('TimestampFacilityComponent', () => {
  let component: TimestampFacilityComponent;
  let fixture: ComponentFixture<TimestampFacilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimestampFacilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimestampFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
