import {TestBed} from '@angular/core/testing';

import {RegistryService} from './registry.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('RegistryService', () => {
  let service: RegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
