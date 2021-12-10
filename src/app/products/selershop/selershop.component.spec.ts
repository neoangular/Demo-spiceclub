import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelershopComponent } from './selershop.component';

describe('SelershopComponent', () => {
  let component: SelershopComponent;
  let fixture: ComponentFixture<SelershopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelershopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelershopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
