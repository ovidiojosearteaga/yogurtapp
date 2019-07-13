import { TestBed } from '@angular/core/testing';

import { WpRestApiService } from './wp-rest-api/wp-rest-api.service';

describe('WpRestApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WpRestApiService = TestBed.get(WpRestApiService);
    expect(service).toBeTruthy();
  });
});
