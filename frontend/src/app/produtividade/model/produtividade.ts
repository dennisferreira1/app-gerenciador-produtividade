import { Profissional } from "src/app/profissionais/model/profissional"

export interface ProdutividadeOrderTable {
  posicao?: number,
  nomeProfissional: string, // para poder utilizar o filtro da tabela q só funciona com string
  profissao: string, // para poder utilizar o filtro da tabela q só funciona com string
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
