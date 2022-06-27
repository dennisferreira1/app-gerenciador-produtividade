import { Profissional } from './../../profissionais/model/profissional';

export interface Servico {
  descricao: string,
  und: string,
  quantidade: number
}

export interface OrdemDeServico {
  id: number
  numero: string,
  descricao: string,
  profissionais: Profissional[],
  servicos: Servico[]
}
