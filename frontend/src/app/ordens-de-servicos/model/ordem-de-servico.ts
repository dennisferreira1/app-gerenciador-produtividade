import { Profissional } from './../../profissionais/model/profissional';

export interface ItemServico {
  id: number,
  descricao: string,
  und: string,
  horasParaExecutar1Und: number,
  quantidade: number
}

export interface OrdemDeServico {
  id: number
  numero: string,
  descricao: string,
  profissionais: Profissional[],
  servicos: ItemServico[],
  totalHorasExecucao?: number
}

export interface OrdemDeServicoTable {
  id: number
  numero: string,
  descricao: string,
  profissionais: string,
  profissao: string
}
