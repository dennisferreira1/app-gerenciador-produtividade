import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatTable } from '@angular/material/table';
import { map, startWith } from 'rxjs';
import { ProfissionalService } from 'src/app/profissionais/service/profissional.service';
import { Profissional } from './../../profissionais/model/profissional';

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

  servicosSelecionados = [
    { descricao: 'Pintura em parede', quantidade: '60', und: 'm²' },
  ]

  separatorKeysCodes: number[] = [ENTER, COMMA];

  profissionaisCtrl = new FormControl('');

  @ViewChild('profisionalInput') profisionalInput!: ElementRef<HTMLInputElement>;

  @ViewChild(MatTable) table!: MatTable<any>;

  displayedColumns: string[] = ['descricao', 'und', 'quantidade', 'acoes'];

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private profissionalService: ProfissionalService
  ) {

    profissionalService.buscarProfissionais().subscribe(dados => this.allProfissionais = dados);

    this.profissionaisCtrl.valueChanges.pipe(
      startWith(null),
      map((nomeProfissional: string | null) => (nomeProfissional ? this._filter(nomeProfissional) : this.allProfissionais))
    )
      .subscribe(dados => this.profissionaisFiltrados = dados);

    this.form = this.formBuilder.group({
      numero: [null],
      descricao: [null],
      servicos: [null]
    })
  }

  ngOnInit(): void {
  }

  salvar() {
    //TO DO
  }

  cancelar() {
    //TO DO
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
      const servicoSelecionado = { descricao: desc, quantidade: '', und: 'm²' };
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

}
