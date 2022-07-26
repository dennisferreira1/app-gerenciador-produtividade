import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { map, startWith } from 'rxjs';
import { ProfissionalService } from 'src/app/profissionais/service/profissional.service';
import { Servico } from 'src/app/servicos/model/servico';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from 'src/app/shared/components/success-dialog/success-dialog.component';
import { ServicoService } from '../../servicos/service/servico.service';
import { OrdemDeServico } from '../model/ordem-de-servico';
import { Profissional } from './../../profissionais/model/profissional';
import { ItemServico } from './../model/ordem-de-servico';
import { OrdemService } from './../service/ordem.service';

@Component({
  selector: 'app-ordem-form',
  templateUrl: './ordem-form.component.html',
  styleUrls: ['./ordem-form.component.scss']
})
export class OrdemFormComponent implements OnInit {

  profissionaisFiltrados: Profissional[] = [];
  profissionais: Profissional[] = [];
  allProfissionais: Profissional[] = [];

  allServicos: Servico[] = [];

  servicosSelecionados: ItemServico[] = [];

  separatorKeysCodes: number[] = [ENTER, COMMA];

  profissionaisCtrl = new FormControl('', Validators.required);

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
    private activatedRoute: ActivatedRoute,
    private servicoService: ServicoService
  ) {

    profissionalService.buscarProfissionais().subscribe(dados => this.allProfissionais = dados);

    servicoService.buscarServicos().subscribe(dados => this.allServicos = dados)

    this.profissionaisCtrl.valueChanges.pipe(
      startWith(null),
      map((nomeProfissional: string | null) => (nomeProfissional ? this._filter(nomeProfissional) : this.allProfissionais))
    )
      .subscribe(dados => this.profissionaisFiltrados = dados);

    const ordem: OrdemDeServico = this.activatedRoute.snapshot.data['ordem'];

    this.form = this.formBuilder.group({
      id: [ordem?.id],
      numero: [ordem?.numero, Validators.required],
      descricao: [ordem?.descricao, Validators.required],
      servicos: [null]
    })

    this.profissionais = ordem.profissionais;
    this.servicosSelecionados = ordem.servicos;
  }

  ngOnInit(): void {
  }

  salvar() {
    if(this.profissionais.length == 0) {
      this.openDialogError("É necessário informar no mínimo 1 profissional!")
      return;
    }
    if(this.servicosSelecionados.length == 0) {
      this.openDialogError("É necessário informar no mínimo 1 serviço!")
      return;
    }

    const ordem = {
      id: this.form.value.id,
      numero: this.form.value.numero,
      descricao: this.form.value.descricao,
      profissionais: this.profissionais,
      servicos: this.servicosSelecionados,
    }

    if(this.form.valid) {

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

  }

  cancelar() {
    this.location.back();
  }

  addProfissional(event: MatChipInputEvent): void {

    const nomeProfissional = (event.value || '').split('-')[0].trim();

    const profissional = this.allProfissionais.find(p => p.nome == nomeProfissional);

    if (profissional) {
      if (!this.profissionais.find(p => p.nome == profissional.nome)) {
        this.profissionais.push(profissional);

        // limpa o valor do input
        event.chipInput!.clear();

        this.profissionaisCtrl.setValue(null);
      }
    }

  }

  removeProfissional(profissional: Profissional): void {
    const index = this.profissionais.indexOf(profissional);

    if (index >= 0) {
      this.profissionais.splice(index, 1);
    }
  }

  profissionalSelected(event: MatAutocompleteSelectedEvent): void {

    const nomeProfissional = event.option.viewValue.split('-')[0].trim();

    const profissional = this.allProfissionais.find(p => p.nome == nomeProfissional);
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

    if (servicos) {

      servicos.forEach((desc: string) => {

        const servicoSelecionado = this.allServicos.find(s => s.descricao == desc);

        if (servicoSelecionado) {

          // só add se o serviço ainda não estiver sido adicionado
          if (!this.servicosSelecionados.find(s => s.descricao == servicoSelecionado.descricao)) {

            const itemServico = {id: servicoSelecionado.id, descricao: servicoSelecionado.descricao, und: servicoSelecionado.und, horasParaExecutar1Und: servicoSelecionado.horasParaExecutar1Und, quantidade: 1}

            this.servicosSelecionados.push(itemServico);
          }
        }
      })

    }

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

  addQuantitativo(itemServico: ItemServico, inptuQtde: any) {
    const quantidade = inptuQtde.value;

    this.servicosSelecionados.forEach(item => {
      if(item.id == itemServico.id) {
        item.quantidade = quantidade;
      }
    })

  }

}
