import { TestBed } from '@angular/core/testing';

import { TovaryService } from './tovary.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('TovaryService', () => {
  let service: TovaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(TovaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
