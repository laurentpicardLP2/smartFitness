import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomListingComponent } from './room-listing.component';

describe('RoomListingComponent', () => {
  let component: RoomListingComponent;
  let fixture: ComponentFixture<RoomListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
