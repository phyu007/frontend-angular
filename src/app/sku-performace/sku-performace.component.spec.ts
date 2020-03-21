import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuPerformaceComponent } from './sku-performace.component';

describe('SkuPerformaceComponent', () => {
  let component: SkuPerformaceComponent;
  let fixture: ComponentFixture<SkuPerformaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkuPerformaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuPerformaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
