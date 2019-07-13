import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerlistPage } from './customerlist.page';

describe('CustomerlistPage', () => {
  let component: CustomerlistPage;
  let fixture: ComponentFixture<CustomerlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerlistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
