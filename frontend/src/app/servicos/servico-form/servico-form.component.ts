import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from 'src/app/shared/components/success-dialog/success-dialog.component';
import { Servico } from '../model/servico';
import { ServicoService } from '../service/servico.service';

@Component({
  selector: 'app-servico-form',
  templateUrl: './servico-form.component.html',
  styleUrls: ['./servico-form.component.scss']
})
export class ServicoFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private servicoService: ServicoService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {

     // Utilizando guarda de rota
     const servico: Servico = this.activatedRoute.snapshot.data['servico'];

     this.form = this.formBuilder.group({
       id: [servico.id],
       descricao: [servico.descricao, Validators.required],
       und: [servico.und, Validators.required],
       horasParaExecutar1Und: [servico.horasParaExecutar1Und, Validators.required]
     })

  }

  ngOnInit(): void {}

  salvar() {

    if (this.form.valid) {

      const id = this.form.value.id;
      if(id == null) {
        this.servicoService.salvar(this.form.value).subscribe(
          dados => this.openDialogSuccess(),
          error => this.openDialogError("Erro ao salvar dados do serviço!")
        )
      } else {
        this.servicoService.atualizar(this.form.value).subscribe(
          dados => this.openDialogSuccess(),
          error => this.openDialogError("Erro ao atualizar dados do serviço!")
        )
      }

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
