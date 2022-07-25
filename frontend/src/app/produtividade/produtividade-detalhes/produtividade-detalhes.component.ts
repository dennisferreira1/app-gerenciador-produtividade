import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdemDeServico } from 'src/app/ordens-de-servicos/model/ordem-de-servico';
import { OrdemService } from 'src/app/ordens-de-servicos/service/ordem.service';
import { Profissional } from 'src/app/profissionais/model/profissional';
import { ProdutividadeDetalhes } from './../model/produtividade';

@Component({
  selector: 'app-produtividade-detalhes',
  templateUrl: './produtividade-detalhes.component.html',
  styleUrls: ['./produtividade-detalhes.component.scss']
})
export class ProdutividadeDetalhesComponent implements OnInit {

  displayedColumns: string[] = ['servico', 'und', 'qtde', 'horas'];

  produtividadeDetalhes: ProdutividadeDetalhes = {
    servicos: [],
    totalDeHoras: 0,
    percentual: 0,
  };

  profissional!: Profissional;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ordemService: OrdemService,
  ) {

    // Utilizando guarda de rota
    this.profissional = this.activatedRoute.snapshot.data['profissional'];

    this.ordemService.buscarOrdensPorProfissional(this.profissional.id).subscribe(
      (ordens: OrdemDeServico[]) => {

        ordens.forEach(o => {

          o.servicos.forEach(itemServico => {

            if (!this.produtividadeDetalhes.servicos.some((s) => s.servico == itemServico.descricao)) {
              this.produtividadeDetalhes.servicos.push({
                servico: itemServico.descricao,
                und: itemServico.und,
                qtde: itemServico.quantidade / o.profissionais.length,
                horas: (itemServico.quantidade / o.profissionais.length) * itemServico.horasParaExecutar1Und
              });
            } else {
              let servicoDetalhe = this.produtividadeDetalhes.servicos.filter(s => s.servico == itemServico.descricao)[0];
              servicoDetalhe.qtde += itemServico.quantidade / o.profissionais.length;
              servicoDetalhe.horas += (itemServico.quantidade / o.profissionais.length) * itemServico.horasParaExecutar1Und;
            }

          })

          this.produtividadeDetalhes.totalDeHoras += o.totalHorasExecucao!;

        })

      }
    );

    this.ordemService.buscarOrdens().subscribe(
      (ordens: OrdemDeServico[]) => {
        let ordensPorCategoria = ordens.filter(o => o.profissionais.some(P => P.profissao == this.profissional.profissao));

        let totalHorasOrdens = 0;
        
        ordensPorCategoria.forEach(o => {
          totalHorasOrdens += o.totalHorasExecucao! * o.profissionais.length;
        })

        console.log(totalHorasOrdens);


        this.produtividadeDetalhes.percentual = this.produtividadeDetalhes.totalDeHoras / totalHorasOrdens;
      })

    console.log(this.produtividadeDetalhes.servicos);

  }

  ngOnInit(): void {
  }

}
