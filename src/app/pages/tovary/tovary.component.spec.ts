import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TovaryComponent } from './tovary.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('TovaryComponent', () => {
  let component: TovaryComponent;
  let fixture: ComponentFixture<TovaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TovaryComponent ],
      imports:[HttpClientModule,
        RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TovaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
