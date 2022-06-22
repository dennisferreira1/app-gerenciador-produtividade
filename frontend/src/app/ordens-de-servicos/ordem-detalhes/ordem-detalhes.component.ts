import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordem-detalhes',
  templateUrl: './ordem-detalhes.component.html',
  styleUrls: ['./ordem-detalhes.component.scss']
})
export class OrdemDetalhesComponent implements OnInit {

  displayedColumns: string[] = ['descricao', 'und', 'quantidade'];

  constructor() { }

  ngOnInit(): void {
  }

}
