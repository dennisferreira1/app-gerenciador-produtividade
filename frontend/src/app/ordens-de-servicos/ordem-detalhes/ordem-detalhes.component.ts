import { OrdemService } from './../service/ordem.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdemDeServico } from '../model/ordem-de-servico';

@Component({
  selector: 'app-ordem-detalhes',
  templateUrl: './ordem-detalhes.component.html',
  styleUrls: ['./ordem-detalhes.component.scss']
})
export class OrdemDetalhesComponent implements OnInit {

  displayedColumns: string[] = ['descricao', 'und', 'quantidade'];

  ordemDeServico!: OrdemDeServico;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ordemService: OrdemService
  ) {

    this.ordemService.getOrdemById(1).subscribe((dados) => this.ordemDeServico = dados);
  }

  ngOnInit(): void {
  }

  editar() {

    const id = this.activatedRoute.snapshot.params['id'];

    this.router.navigateByUrl('ordens-de-servicos/editar/'+id);

  }

}
