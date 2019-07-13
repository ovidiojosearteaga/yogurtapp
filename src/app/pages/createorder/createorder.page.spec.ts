import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateorderPage } from './createorder.page';

describe('CreateorderPage', () => {
  let component: CreateorderPage;
  let fixture: ComponentFixture<CreateorderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateorderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateorderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
