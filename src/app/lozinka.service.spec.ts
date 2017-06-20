import { TestBed, inject } from '@angular/core/testing';

import { LozinkaService } from './lozinka.service';

describe('LozinkaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LozinkaService]
    });
  });

  it('should ...', inject([LozinkaService], (service: LozinkaService) => {
    expect(service).toBeTruthy();
  }));
});
