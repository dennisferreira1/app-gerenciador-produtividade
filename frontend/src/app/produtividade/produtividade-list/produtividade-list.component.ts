import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdemDeServico } from 'src/app/ordens-de-servicos/model/ordem-de-servico';
import { OrdemService } from 'src/app/ordens-de-servicos/service/ordem.service';
import { Profissional } from 'src/app/profissionais/model/profissional';
import { } from '../model/produtividade';
import { ProfissionalService } from './../../profissionais/service/profissional.service';
import { ProdutividadeOrderTable } from './../model/produtividade';
import { ProdutividadeService } from './../service/produtividade.service';

@Component({
  selector: 'app-produtividade-list',
  templateUrl: './produtividade-list.component.html',
  styleUrls: ['./produtividade-list.component.scss']
})
export class ProdutividadeListComponent implements AfterViewInit {

  displayedColumns: string[] = ['posicao', 'profissional', 'profissao', 'horas'];
  dataSource: MatTableDataSource<ProdutividadeOrderTable> = new MatTableDataSource();

  listProdutividadeOrdenada: ProdutividadeOrderTable[] = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ordemService: OrdemService,
    private profissionalService: ProfissionalService,
    private produtividadeService: ProdutividadeService
  ) {

    this.listarProdutividades();
  }

  private listarProdutividades() {
    this.profissionalService.buscarProfissionais().subscribe(
      (dados: Profissional[]) => {
        for (let p of dados) {

          let totalHoras = 0;

          this.ordemService.buscarOrdensPorProfissional(p.id).subscribe(
            (ordens: OrdemDeServico[]) => {

              for (let ordem of ordens) {
                totalHoras += ordem.totalHorasExecucao || 0;
              }
              this.listProdutividadeOrdenada.push({
                profissional: p.nome,
                profissao: p.profissao,
                totalDeHoras: totalHoras,
              });

              this.listProdutividadeOrdenada.sort((a, b) => b.totalDeHoras - a.totalDeHoras);
              this.listProdutividadeOrdenada.forEach((p, index) => p.posicao = ++index);

              // Assign the data to the data source for the table to render
              this.dataSource = new MatTableDataSource(this.listProdutividadeOrdenada);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
          );
        }
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  detalhes(profissionalId: any) {
    this.router.navigate(['detalhes', profissionalId], { relativeTo: this.activatedRoute });
  }

}
