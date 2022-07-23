import { TestBed } from '@angular/core/testing';

import { ProdutividadeService } from './produtividade.service';

describe('ProdutividadeService', () => {
  let service: ProdutividadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutividadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
