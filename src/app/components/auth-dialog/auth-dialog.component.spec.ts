import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthDialogComponent } from './auth-dialog.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AuthDialogComponent', () => {
  let component: AuthDialogComponent;
  let fixture: ComponentFixture<AuthDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
      MatDialogModule,
        HttpClientTestingModule,
        ReactiveFormsModule,

      ],
      providers:[
        {provide:MatDialogRef, useValue:{}},
        {provide:Auth, useValue:{}},
        {provide:Firestore, useValue:{}}
      ],
      schemas:[
        NO_ERRORS_SCHEMA
      ],
      declarations: [ AuthDialogComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AuthDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
