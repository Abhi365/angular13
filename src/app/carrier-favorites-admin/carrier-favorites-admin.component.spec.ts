import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrierFavoritesAdminComponent } from './carrier-favorites-admin.component';

describe('CarrierFavoritesAdminComponent', () => {
  let component: CarrierFavoritesAdminComponent;
  let fixture: ComponentFixture<CarrierFavoritesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrierFavoritesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrierFavoritesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
