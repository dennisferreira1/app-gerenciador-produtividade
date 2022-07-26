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
  iconProfissional= '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private ordemService: OrdemService,
  ) {

    // Utilizando guarda de rota
    this.profissional = this.activatedRoute.snapshot.data['profissional'];

    this.definirIconProfissional();

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

        this.produtividadeDetalhes.percentual = this.produtividadeDetalhes.totalDeHoras / totalHorasOrdens;
      })
  }

  definirIconProfissional() {

    switch(this.profissional.profissao) {

      case "Pintor":
      this.iconProfissional = "https://img2.gratispng.com/20180207/lpq/kisspng-painting-artist-icon-painter-5a7b30f06aae97.536983001518022896437.jpg";
      break;

      case "Encanador":
      this.iconProfissional = "https://img1.gratispng.com/20180303/hle/kisspng-plumbing-stock-photography-illustration-vector-illustration-blue-business-people-png-5a9aad83a019c2.7267477315200864036558.jpg"
      break;

      case "Pedreiro":
      this.iconProfissional = "https://w7.pngwing.com/pngs/55/271/png-transparent-bricklayer-masonry-architectural-engineering-builder-engineer-construction-worker-objects.png"
      break;

      case "Marceneiro":
      this.iconProfissional = "https://i.pinimg.com/736x/8c/e7/12/8ce712becb06eaa81b2fcc99c0cc2fd0.jpg"
      break;

      case "Carpinteiro":
      this.iconProfissional = "https://cdn-icons-png.flaticon.com/512/360/360484.png"
      break;

      case "Soldador":
      this.iconProfissional = "https://cdn-icons-png.flaticon.com/512/2767/2767759.png"
      break;

      default:
      this.iconProfissional = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcNsfWYho7MIHnJ0nxfjJfn-DBTY0xSDqQEQ&usqp=CAU"

    }

  }

  ngOnInit(): void {
  }

}
