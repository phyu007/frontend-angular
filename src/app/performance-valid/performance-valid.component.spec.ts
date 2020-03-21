import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceValidComponent } from './performance-valid.component';

describe('PerformanceValidComponent', () => {
  let component: PerformanceValidComponent;
  let fixture: ComponentFixture<PerformanceValidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceValidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceValidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
