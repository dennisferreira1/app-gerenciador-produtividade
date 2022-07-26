import { TestBed } from '@angular/core/testing';

import { ServicoResolverGuard } from './servico-resolver.guard';

describe('ProfissionalResolverGuard', () => {
  let guard: ServicoResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ServicoResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
