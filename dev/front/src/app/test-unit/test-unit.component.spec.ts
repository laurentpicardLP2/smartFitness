
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestUnitComponent } from './test-unit.component';

import { testUnit } from './test-unit.component'

describe('TestUnitComponent', () => {
  let component: TestUnitComponent;
  let fixture: ComponentFixture<TestUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    console.log('should create');
   });

   it('execute testUnit', () => {
    const result = testUnit(); 
    expect(result).toEqual(15);
  });
 
});



