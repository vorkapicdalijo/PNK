import { TestBed } from '@angular/core/testing';

import { RealEstateService } from './real-estate.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('RealEstateService', () => {
  let service: RealEstateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule]
    });
    service = TestBed.inject(RealEstateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
