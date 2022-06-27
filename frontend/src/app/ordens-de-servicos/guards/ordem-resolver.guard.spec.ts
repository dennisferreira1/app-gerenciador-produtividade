import { TestBed } from '@angular/core/testing';

import { OrdemResolverGuard } from './ordem-resolver.guard';

describe('OrdemResolverGuard', () => {
  let guard: OrdemResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OrdemResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
