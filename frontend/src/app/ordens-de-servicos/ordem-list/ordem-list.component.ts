import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdemDeServico, OrdemDeServicoTable } from './../model/ordem-de-servico';
import { OrdemService } from './../service/ordem.service';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-ordem-list',
  styleUrls: ['./ordem-list.component.scss'],
  templateUrl: './ordem-list.component.html',
})
export class OrdemListComponent implements AfterViewInit {
  displayedColumns: string[] = ['numero', 'descricao', 'profissão', 'profissional'];
  dataSource: MatTableDataSource<OrdemDeServicoTable> = new MatTableDataSource();

  ordemDeServicoTable: OrdemDeServicoTable[] = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ordemService: OrdemService
  ) {

    this.ordemService.buscarOrdens().subscribe(
      (dados: OrdemDeServico[]) => {

        // Para facilitar a exibição dos dados das ordens de serviços na tabela é usado o objeto "OrdemDeServicoTable" que é preenchido com os dados do objeto "OrdemDeServico"
        for(let dado of dados){
          this.ordemDeServicoTable.push({
            id: dado.id,
            numero: dado.numero,
            descricao: dado.descricao,
            profissionais: dado.profissionais.map(p => p.nome).toString(),
            profissao: dado.profissionais.map(p => p.profissao)[0]
          })
        }

        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.ordemDeServicoTable);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
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

  add() {
    this.router.navigate(['cadastrar'], {relativeTo: this.activatedRoute})
  }

  detalhes(row: any) {
    this.router.navigate(['detalhes', row.id], {relativeTo: this.activatedRoute});
  }
}


