import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTovaryComponent } from './admin-tovary.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Storage } from '@angular/fire/storage';

describe('AdminTovaryComponent', () => {
  let component: AdminTovaryComponent;
  let fixture: ComponentFixture<AdminTovaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTovaryComponent ],
      imports:[HttpClientTestingModule],
      providers:[
        {provide: Storage, useValue:{}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTovaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
