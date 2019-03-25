import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityCategoryDetailComponent } from './facility-category-detail.component';

describe('FacilityCategoryDetailComponent', () => {
  let component: FacilityCategoryDetailComponent;
  let fixture: ComponentFixture<FacilityCategoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityCategoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityCategoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
