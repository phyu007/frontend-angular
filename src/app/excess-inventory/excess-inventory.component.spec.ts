import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcessInventoryComponent } from './excess-inventory.component';

describe('ExcessInventoryComponent', () => {
  let component: ExcessInventoryComponent;
  let fixture: ComponentFixture<ExcessInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcessInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcessInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
