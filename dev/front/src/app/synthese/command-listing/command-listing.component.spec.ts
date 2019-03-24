import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandListingComponent } from './command-listing.component';

describe('CommandListingComponent', () => {
  let component: CommandListingComponent;
  let fixture: ComponentFixture<CommandListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
