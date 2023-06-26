import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        MatDialogModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers:[
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
      schemas:[
        NO_ERRORS_SCHEMA
      ],
      declarations: [ HeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('it should change total', () => {
    const Fake_Basket=[
      {
        id:1,
      category:{
          id:2,
        name: 'vk',
        path: 'string',
        imagePath: 'vvv',
      },
        name: 'string',
        path: 'string',
        description: 'string',
        weight: '10',
        price: 20,
        imagePath: 'string',
        count:5
      }
    ]
    component.basket=Fake_Basket;
    spyOn(component,"getTotalPrice").and.callThrough();
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(100);
    component.basket=[];
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(0);
  });
});
