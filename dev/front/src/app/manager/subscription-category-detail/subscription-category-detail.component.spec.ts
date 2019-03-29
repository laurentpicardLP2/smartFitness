import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionCategoryDetailComponent } from './subscription-category-detail.component';

describe('SubscriptionCategoryDetailComponent', () => {
  let component: SubscriptionCategoryDetailComponent;
  let fixture: ComponentFixture<SubscriptionCategoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionCategoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionCategoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
