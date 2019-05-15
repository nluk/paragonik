import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PushReceiptPage } from './push-receipt.page';

describe('PushReceiptPage', () => {
  let component: PushReceiptPage;
  let fixture: ComponentFixture<PushReceiptPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PushReceiptPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PushReceiptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
