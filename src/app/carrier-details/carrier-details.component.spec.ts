import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrierDetailsComponent } from './carrier-details.component';

describe('CarrierDetailsComponent', () => {
  let component: CarrierDetailsComponent;
  let fixture: ComponentFixture<CarrierDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrierDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrierDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
