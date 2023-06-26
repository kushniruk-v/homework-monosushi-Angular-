import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TovaryInfoComponent } from './tovary-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

xdescribe('TovaryInfoComponent', () => {
  let component: TovaryInfoComponent;
  let fixture: ComponentFixture<TovaryInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TovaryInfoComponent ],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TovaryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
