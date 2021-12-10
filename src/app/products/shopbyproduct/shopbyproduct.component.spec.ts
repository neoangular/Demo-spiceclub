import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopbyproductComponent } from './shopbyproduct.component';

describe('ShopbyproductComponent', () => {
  let component: ShopbyproductComponent;
  let fixture: ComponentFixture<ShopbyproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopbyproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopbyproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
