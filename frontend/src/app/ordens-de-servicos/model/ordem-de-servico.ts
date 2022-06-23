import { Profissional } from './../../profissionais/model/profissional';

interface Servico {
  descricao: string,
  und: string
}

export interface OrdemDeServico {
  numero: string,
  descricao: string,
  profissionais: Profissional[],
  servicos: Servico[]
}
