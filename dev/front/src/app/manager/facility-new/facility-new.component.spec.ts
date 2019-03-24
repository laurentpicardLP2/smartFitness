import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityNewComponent } from './facility-new.component';

describe('FacilityNewComponent', () => {
  let component: FacilityNewComponent;
  let fixture: ComponentFixture<FacilityNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
