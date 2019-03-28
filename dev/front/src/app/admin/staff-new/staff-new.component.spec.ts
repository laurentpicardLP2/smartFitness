import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffNewComponent } from './staff-new.component';

describe('StaffNewComponent', () => {
  let component: StaffNewComponent;
  let fixture: ComponentFixture<StaffNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
