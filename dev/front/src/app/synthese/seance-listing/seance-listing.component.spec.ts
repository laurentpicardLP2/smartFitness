import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeanceListingComponent } from './seance-listing.component';

describe('SeanceListingComponent', () => {
  let component: SeanceListingComponent;
  let fixture: ComponentFixture<SeanceListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeanceListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeanceListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
