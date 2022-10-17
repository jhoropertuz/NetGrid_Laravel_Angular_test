import { TestBed } from '@angular/core/testing';

import { ConnectionApiService } from './connection-api.service';

describe('ConnectionApiService', () => {
  let service: ConnectionApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectionApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
