import { Router, ActivatedRoute } from '@angular/router';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface OrdemDeServico {
  numero: string;
  descricao: string;
  profissional: string;
}

const NAMES: string[] = [
  'Alex',
  'Marinaldo',
  'Ailton',
  'Silvano',
  'Marcelino',
  'Kelieldo'
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-ordem-list',
  styleUrls: ['./ordem-list.component.scss'],
  templateUrl: './ordem-list.component.html',
})
export class OrdemListComponent implements AfterViewInit {
  displayedColumns: string[] = ['numero', 'descricao', 'profissional'];
  dataSource: MatTableDataSource<OrdemDeServico>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    // Create 100 users
    const users = Array.from({length: 50}, (_, k) => createNewOrdem(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
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

  }

  detalhes(id: number) {
    console.log(id);

    this.router.navigate(['detalhes', id], {relativeTo: this.activatedRoute});
  }
}

/** Builds and returns a new User. */
function createNewOrdem(id: number): OrdemDeServico {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))]

  return {
    numero: id.toString(),
    descricao: "Pintura da Sala " + id,
    profissional: name
  };
}

