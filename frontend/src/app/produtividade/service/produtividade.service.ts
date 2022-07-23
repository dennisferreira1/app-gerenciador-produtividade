import { Injectable } from '@angular/core';
import { OrdemService } from 'src/app/ordens-de-servicos/service/ordem.service';
import { ProfissionalService } from 'src/app/profissionais/service/profissional.service';
import { ProdutividadeOrderTable } from '../model/produtividade';

@Injectable({
  providedIn: 'root'
})
export class ProdutividadeService {

  private listProdutividadeOrdenada: ProdutividadeOrderTable[] = [];

  constructor(
    private ordemService: OrdemService,
    private profissionalService: ProfissionalService
  ) {}


}
