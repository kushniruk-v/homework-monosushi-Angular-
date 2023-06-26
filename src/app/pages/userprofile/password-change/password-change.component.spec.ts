import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChangeComponent } from './password-change.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Auth} from "@angular/fire/auth";
import {Firestore} from "@angular/fire/firestore";




describe('PasswordChangeComponent', () => {
  let component: PasswordChangeComponent;
  let fixture: ComponentFixture<PasswordChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordChangeComponent ],
      imports:[
        ReactiveFormsModule,
        MatDialogModule,
        HttpClientTestingModule
      ],
      providers:[
        {provide: MatDialogRef, useValue:{}},
        {provide:Auth, useValue:{}},
        {provide:Firestore, useValue:{}}
      ],
      schemas:[
     NO_ERRORS_SCHEMA
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
