import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionCategoryNewComponent } from './subscription-category-new.component';

describe('SubscriptionCategoryNewComponent', () => {
  let component: SubscriptionCategoryNewComponent;
  let fixture: ComponentFixture<SubscriptionCategoryNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionCategoryNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionCategoryNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
