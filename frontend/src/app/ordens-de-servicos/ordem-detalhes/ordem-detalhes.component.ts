import { MatDialog } from '@angular/material/dialog';
import { OrdemDeServico } from './../model/ordem-de-servico';
import { OrdemService } from './../service/ordem.service';

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from 'src/app/shared/components/success-dialog/success-dialog.component';

@Component({
  selector: 'app-ordem-detalhes',
  templateUrl: './ordem-detalhes.component.html',
  styleUrls: ['./ordem-detalhes.component.scss']
})
export class OrdemDetalhesComponent implements OnInit {

  displayedColumns: string[] = ['descricao', 'und', 'quantidade'];

  ordemDeServico = {
    descricao: '',
    numero: '',
    profissionais: [],
    servicos: [],
  } as unknown as OrdemDeServico

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ordemService: OrdemService,
    private location: Location,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.ordemService.getOrdemById(id).subscribe((dados: OrdemDeServico) => this.ordemDeServico = dados);
  }

  editar() {

    const id = this.activatedRoute.snapshot.params['id'];

    this.router.navigateByUrl('ordens-de-servicos/editar/'+id);

  }

  excluir() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {data: "Tem certeza que deseja excluir?"});

    dialogRef.afterClosed().subscribe(result => {

      if(result) {
        this.ordemService.excluir(this.ordemDeServico).subscribe(
          dados => {
            this.openDialogSuccess();
            this.voltar();
          },
          error => this.openDialogError("Não foi possível excluir o profissional!")
        );
      }
    })
  }

  openDialogError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {data: errorMsg});
  }

  openDialogSuccess() {
    this._snackBar.openFromComponent(SuccessDialogComponent, {duration: 2000, verticalPosition: 'top'});
    this.voltar();
  }

  voltar() {
    this.router.navigateByUrl('ordens-de-servicos');
  }

}
