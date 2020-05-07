import { TestBed } from '@angular/core/testing';

import { HttpInteceptorService } from './http-inteceptor.service';

describe('HttpInteceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpInteceptorService = TestBed.get(HttpInteceptorService);
    expect(service).toBeTruthy();
  });
});
