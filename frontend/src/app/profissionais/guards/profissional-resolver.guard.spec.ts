import { TestBed } from '@angular/core/testing';

import { ProfissionalResolverGuard } from './profissional-resolver.guard';

describe('ProfissionalResolverGuard', () => {
  let guard: ProfissionalResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProfissionalResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
