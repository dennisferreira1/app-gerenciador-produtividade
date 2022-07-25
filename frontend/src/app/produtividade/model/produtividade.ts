import { Profissional } from "src/app/profissionais/model/profissional"

export interface ProdutividadeOrderTable {
  posicao?: number
  profissional: Profissional,
  totalDeHoras: number
}

export interface ServicoDetalhes {
  servico: string
  und: string,
  qtde: number,
  horas: number
}

export interface ProdutividadeDetalhes {
  servicos: ServicoDetalhes[],
  totalDeHoras: number,
  percentual: number
}
