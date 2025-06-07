import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { channelGuard } from './channel.guard';

describe('channelGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => channelGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
