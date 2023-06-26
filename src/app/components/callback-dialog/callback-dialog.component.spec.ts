import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallbackDialogComponent } from './callback-dialog.component';
import {ReactiveFormsModule} from "@angular/forms";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CallbackDialogComponent', () => {
  let component: CallbackDialogComponent;
  let fixture: ComponentFixture<CallbackDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        ReactiveFormsModule,

      ],
      schemas:[
        CUSTOM_ELEMENTS_SCHEMA
      ],
      declarations: [ CallbackDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallbackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
