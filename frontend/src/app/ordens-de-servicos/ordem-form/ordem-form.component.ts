import { ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { map, startWith } from 'rxjs';
import { ProfissionalService } from 'src/app/profissionais/service/profissional.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from 'src/app/shared/components/success-dialog/success-dialog.component';
import { Profissional } from './../../profissionais/model/profissional';
import { OrdemService } from './../service/ordem.service';
import { Location } from '@angular/common';
import { OrdemDeServico, Servico } from '../model/ordem-de-servico';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-ordem-form',
  templateUrl: './ordem-form.component.html',
  styleUrls: ['./ordem-form.component.scss']
})
export class OrdemFormComponent implements OnInit {

  profissionaisFiltrados: Profissional[] = [];
  profissionais: Profissional[] = [];
  allProfissionais: Profissional[] = [];

  allServicos = [
    { descricao: 'Pintura em parede' },
    { descricao: 'Pintura em teto' },
    { descricao: 'Pintura em porta' },
    { descricao: 'Pintura em piso' }
  ]

  servicosSelecionados: Servico[] = [];

  separatorKeysCodes: number[] = [ENTER, COMMA];

  profissionaisCtrl = new FormControl('');

  @ViewChild('profisionalInput') profisionalInput!: ElementRef<HTMLInputElement>;

  @ViewChild(MatTable) table!: MatTable<any>;

  displayedColumns: string[] = ['descricao', 'und', 'quantidade', 'acoes'];

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private profissionalService: ProfissionalService,
    private ordemService: OrdemService,
    private location: Location,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {

    profissionalService.buscarProfissionais().subscribe(dados => this.allProfissionais = dados);

    this.profissionaisCtrl.valueChanges.pipe(
      startWith(null),
      map((nomeProfissional: string | null) => (nomeProfissional ? this._filter(nomeProfissional) : this.allProfissionais))
    )
      .subscribe(dados => this.profissionaisFiltrados = dados);

    const ordem: OrdemDeServico = this.activatedRoute.snapshot.data['ordem'];

    this.form = this.formBuilder.group({
      id: [ordem.id],
      numero: [ordem.numero],
      descricao: [ordem.descricao],
      servicos: [null]
    })

    this.profissionais = ordem.profissionais;
    this.servicosSelecionados = ordem.servicos;
  }

  ngOnInit(): void {
  }

  salvar() {

    const ordem = {
      id: this.form.value.id,
      numero: this.form.value.numero,
      descricao: this.form.value.descricao,
      profissionais: this.profissionais,
      servicos: this.servicosSelecionados
    }

    if(ordem.id == null) {
      this.ordemService.salvar(ordem).subscribe(
        dados => this.openDialogSuccess(),
        error => this.openDialogError("Erro ao salvar ordem de serviço!")
      )
    } else {
      this.ordemService.atualizar(ordem).subscribe(
        dados => this.openDialogSuccess(),
        error => this.openDialogError("Erro ao atualizar dados da ordem de serviço!")
      )
    }
  }

  cancelar() {
    this.location.back();
  }

  addProfissional(event: MatChipInputEvent): void {

    const nomeProfissional = (event.value || '').trim().split('-')[0];

    this.profissionalService.getProfissionalByNome(nomeProfissional).subscribe(
      dados => {
        const profissional = dados[0];
        // só add profissional se pertencer a lista de profissonais cadastrados
        if (profissional) {
          if (!this.profissionais.find(p => p.nome == profissional.nome)) {
            this.profissionais.push(profissional);

            // limpa o valor do input
            event.chipInput!.clear();

            this.profissionaisCtrl.setValue(null);
          }
        }
      }
    )

  }

  removeProfissional(profissional: Profissional): void {
    const index = this.profissionais.indexOf(profissional);

    if (index >= 0) {
      this.profissionais.splice(index, 1);
    }
  }

  profissionalSelected(event: MatAutocompleteSelectedEvent): void {

    const nomeProfissional = event.option.viewValue.trim().split('-')[0];

    this.profissionalService.getProfissionalByNome(nomeProfissional).subscribe(
      (dados) => {
        const profissional = dados[0];
        // só add profissional se pertencer a lista de profissonais cadastrados
        if (profissional) {
          // não add profissional já inserido
          if (!this.profissionais.find(p => p.nome == profissional.nome)) {
            this.profissionais.push(profissional);
            this.profisionalInput.nativeElement.value = '';
            this.profissionaisCtrl.setValue(null);
          }
        }

      }
    )

  }

  private _filter(value: string | Profissional): Profissional[] {

    let filterValue = '';

    if (typeof (value) != 'object') {
      filterValue = value.toLowerCase();
    } else {
      filterValue = value.nome.toLowerCase();
    }

    return this.allProfissionais.filter(profisional => profisional.nome.toLowerCase().includes(filterValue));
  }

  addServicos() {
    const servicos = this.form.value.servicos;

    servicos.forEach((desc: any) => {
      const servicoSelecionado = { descricao: desc, quantidade: 0, und: 'm²' };
      this.servicosSelecionados.push(servicoSelecionado);
    })


    this.table.renderRows();
    this.form.patchValue({
      servicos: null
    })

  }

  removeServico(servico: any) {
    let index = 0;
    this.servicosSelecionados.forEach(s => {
      if (s.descricao == servico.descricao) {
        index = this.servicosSelecionados.indexOf(s);
      }
    })

    this.servicosSelecionados.splice(index, 1);
    this.table.renderRows();
  }

  openDialogError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {data: errorMsg});
  }

  openDialogSuccess() {
    this._snackBar.openFromComponent(SuccessDialogComponent, {duration: 2000, verticalPosition: 'top'});
    this.cancelar();
  }

}
