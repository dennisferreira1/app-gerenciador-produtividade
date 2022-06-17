import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from 'src/app/shared/components/success-dialog/success-dialog.component';
import { Profissional } from './../model/profissional';
import { ProfissionalService } from './../service/profissional.service';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-profissional-list',
  templateUrl: './profissional-list.component.html',
  styleUrls: ['./profissional-list.component.scss']
})
export class ProfissionalListComponent{

  profissionais: Profissional[] = [];

  displayedColumns = ['nome', 'profissao', 'acoes'];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private profissionalService: ProfissionalService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {

    profissionalService.buscarProfissionais().subscribe(dados => this.profissionais= dados)

  }

  add() {
    this.router.navigate(['cadastrar'], {relativeTo: this.activatedRoute})
  }

  editar(id: number) {
    this.router.navigate(['editar', id], {relativeTo: this.activatedRoute})
  }

  excluir(profissional: Profissional) {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {data: "Tem certeza que deseja excluir?"});

    dialogRef.afterClosed().subscribe(result => {

      if(result) {
        this.profissionalService.excluir(profissional).subscribe(
          dados => {
            this.openDialogSuccess();
            this.profissionalService.buscarProfissionais().subscribe((value: Profissional[]) => this.profissionais = value)
          },
          error => this.openDialogError("Não foi possível excluir o profissional!")
        );
      }
    })
  }

  openDialogSuccess() {
    this._snackBar.openFromComponent(SuccessDialogComponent, {duration: 2000, verticalPosition: 'top'});
  }

  openDialogError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {data: errorMsg})
  }
}
