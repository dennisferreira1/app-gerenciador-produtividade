import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from 'src/app/shared/components/success-dialog/success-dialog.component';
import { Profissional } from './../model/profissional';
import { ProfissionalService } from './../service/profissional.service';

@Component({
  selector: 'app-profissional-form',
  templateUrl: './profissional-form.component.html',
  styleUrls: ['./profissional-form.component.scss']
})
export class ProfissionalFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private profissionalService: ProfissionalService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {

     // Utilizando guarda de rota
     const profissional: Profissional = this.activatedRoute.snapshot.data['profissional'];

     this.form = this.formBuilder.group({
       id: [profissional.id],
       nome: [profissional.nome],
       profissao: [profissional.profissao]
     })

  }

  ngOnInit(): void {}

  salvar() {
    const id = this.form.value.id;
    if(id == null) {
      this.profissionalService.salvar(this.form.value).subscribe(
        dados => this.openDialogSuccess(),
        error => this.openDialogError("Erro ao salvar dados do profissional!")
      )
    } else {
      this.profissionalService.atualizar(this.form.value).subscribe(
        dados => this.openDialogSuccess(),
        error => this.openDialogError("Erro ao atualizar dados do profissional!")
      )
    }
  }

  cancelar() {
    this.location.back();
  }

  openDialogError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {data: errorMsg});
  }

  openDialogSuccess() {
    this._snackBar.openFromComponent(SuccessDialogComponent, {duration: 2000, verticalPosition: 'top'});
    this.cancelar();
  }

}
