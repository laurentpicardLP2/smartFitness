import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionCategoryListingComponent } from './subscription-category-listing.component';

describe('SubscriptionCategoryListingComponent', () => {
  let component: SubscriptionCategoryListingComponent;
  let fixture: ComponentFixture<SubscriptionCategoryListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionCategoryListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionCategoryListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
