import {TestBed} from '@angular/core/testing';

import {MicrozordNgCompilerService} from './microzord-ng-compiler.service';

describe('MicrozordNgCompilerService', () => {
  let service: MicrozordNgCompilerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicrozordNgCompilerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
