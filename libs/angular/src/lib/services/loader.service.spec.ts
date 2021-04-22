import {TestBed} from '@angular/core/testing';

import {LoaderService} from './loader.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
