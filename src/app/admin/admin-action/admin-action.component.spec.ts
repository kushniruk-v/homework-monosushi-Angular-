import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActionComponent } from './admin-action.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Storage } from '@angular/fire/storage';


describe('AdminActionComponent', () => {
  let component: AdminActionComponent;
  let fixture: ComponentFixture<AdminActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      declarations: [ AdminActionComponent ],
        providers:[
          {provide: Storage, useValue:{}}
        ]
    }

      )
    .compileComponents();

    fixture = TestBed.createComponent(AdminActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
