import { Profissional } from "src/app/profissionais/model/profissional"

export interface ProdutividadeOrderTable {
  posicao?: number
  profissional: Profissional,
  totalDeHoras: number
}
