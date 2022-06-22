import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ordem-detalhes',
  templateUrl: './ordem-detalhes.component.html',
  styleUrls: ['./ordem-detalhes.component.scss']
})
export class OrdemDetalhesComponent implements OnInit {

  displayedColumns: string[] = ['descricao', 'und', 'quantidade'];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
  }

  editar() {

    const id = this.activatedRoute.snapshot.params['id'];

    this.router.navigateByUrl('ordens-de-servicos/editar/'+id);

  }

}
