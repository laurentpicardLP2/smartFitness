import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomNewComponent } from './room-new.component';

describe('RoomNewComponent', () => {
  let component: RoomNewComponent;
  let fixture: ComponentFixture<RoomNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
