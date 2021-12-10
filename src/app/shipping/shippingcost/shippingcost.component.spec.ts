import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingcostComponent } from './shippingcost.component';

describe('ShippingcostComponent', () => {
  let component: ShippingcostComponent;
  let fixture: ComponentFixture<ShippingcostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingcostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingcostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
