import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeanceDetailComponent } from './seance-detail.component';

describe('SeanceDetailComponent', () => {
  let component: SeanceDetailComponent;
  let fixture: ComponentFixture<SeanceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeanceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeanceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
