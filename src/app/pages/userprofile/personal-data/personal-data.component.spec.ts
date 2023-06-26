import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDataComponent } from './personal-data.component';
import { ReactiveFormsModule } from '@angular/forms';
import  {MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import  { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { NO_ERRORS_SCHEMA } from '@angular/core';




describe('PersonalDataComponent', () => {
  let component: PersonalDataComponent;
  let fixture: ComponentFixture<PersonalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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

      declarations: [ PersonalDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
