import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityCategoryNewComponent } from './facility-category-new.component';

describe('FacilityCategoryNewComponent', () => {
  let component: FacilityCategoryNewComponent;
  let fixture: ComponentFixture<FacilityCategoryNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityCategoryNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityCategoryNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
