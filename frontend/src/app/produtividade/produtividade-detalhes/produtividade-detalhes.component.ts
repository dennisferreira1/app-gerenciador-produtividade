import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produtividade-detalhes',
  templateUrl: './produtividade-detalhes.component.html',
  styleUrls: ['./produtividade-detalhes.component.scss']
})
export class ProdutividadeDetalhesComponent implements OnInit {

  displayedColumns: string[] = ['servico', 'und', 'qtde', 'horas'];

  produtividadeDetalhes = [
    {'servico': 'Pintura em parede', 'und': 'm²', 'qtde': 300, 'horas': 150},
    {'servico': 'Pintura em teto', 'und': 'm²', 'qtde': 100, 'horas': 70},
    {'servico': 'Pintura em porta', 'und': 'm²', 'qtde': 20, 'horas': 18},

  ]

  constructor() { }

  ngOnInit(): void {
  }

}
