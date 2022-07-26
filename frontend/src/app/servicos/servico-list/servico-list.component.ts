import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from 'src/app/shared/components/success-dialog/success-dialog.component';
import { Servico } from '../model/servico';
import { ServicoService } from '../service/servico.service';

@Component({
  selector: 'app-servico-list',
  templateUrl: './servico-list.component.html',
  styleUrls: ['./servico-list.component.scss']
})
export class ServicoListComponent {

  servicos: Servico[] = [];

  displayedColumns = ['descricao', 'und', 'horas', 'acoes'];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private servicoService: ServicoService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {

    servicoService.buscarServicos().subscribe(dados => this.servicos= dados);

  }

  add() {
    this.router.navigate(['cadastrar'], {relativeTo: this.activatedRoute});
  }

  editar(id: number) {
    this.router.navigate(['editar', id], {relativeTo: this.activatedRoute});
  }

  excluir(servico: Servico) {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {data: "Tem certeza que deseja excluir?"});

    dialogRef.afterClosed().subscribe(result => {

      if(result) {
        this.servicoService.excluir(servico).subscribe(
          dados => {
            this.openDialogSuccess();
            this.servicoService.buscarServicos().subscribe((value: Servico[]) => this.servicos = value)
          },
          error => this.openDialogError("Não foi possível excluir o serviço!")
        );
      }
    })
  }

  openDialogSuccess() {
    this._snackBar.openFromComponent(SuccessDialogComponent, {duration: 2000, verticalPosition: 'top'});
  }

  openDialogError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {data: errorMsg});
  }
}
