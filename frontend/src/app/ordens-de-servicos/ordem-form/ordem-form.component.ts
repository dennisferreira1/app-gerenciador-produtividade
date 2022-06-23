import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatTable } from '@angular/material/table';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-ordem-form',
  templateUrl: './ordem-form.component.html',
  styleUrls: ['./ordem-form.component.scss']
})
export class OrdemFormComponent implements OnInit {

  allServicos = [
    {descricao: 'Pintura em parede'},
    {descricao: 'Pintura em teto'},
    {descricao: 'Pintura em porta'},
    {descricao: 'Pintura em piso'}
  ]

  servicosSelecionados = [
    {descricao: 'Pintura em parede', quantidade: '60', und: 'm²'},
  ]

  separatorKeysCodes: number[] = [ENTER, COMMA];
  profissionaisCtrl = new FormControl('');
  profissionaisFiltrados: Observable<string[]>;
  profissionais: string[] = ['Marinaldo'];
  allProfissionais: string[] = ['Marinaldo', 'Ailton', 'Kelieldo', 'Alex', 'Silvano'];

  @ViewChild('profisionalInput') profisionalInput!: ElementRef<HTMLInputElement>;
  @ViewChild(MatTable) table!: MatTable<any>;

  displayedColumns: string[] = ['descricao', 'und', 'quantidade', 'acoes'];

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {

    this.profissionaisFiltrados = this.profissionaisCtrl.valueChanges.pipe(
      startWith(null),
      map((profissional: string | null) => (profissional ? this._filter(profissional) : this.allProfissionais.slice())),
    );

    this.form = this.formBuilder.group({
      numero: ['01/2022'],
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

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.profissionais.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.profissionaisCtrl.setValue(null);
  }

  remove(profissional: string): void {
    const index = this.profissionais.indexOf(profissional);

    if (index >= 0) {
      this.profissionais.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.profissionais.push(event.option.viewValue);
    this.profisionalInput.nativeElement.value = '';
    this.profissionaisCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allProfissionais.filter(profisional => profisional.toLowerCase().includes(filterValue));
  }

  addServicos() {

    const servicos = this.form.value.servicos;

    servicos.forEach((desc: any) => {
      const servicoSelecionado = {descricao: desc, quantidade: '', und: 'm²'};
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
      if(s.descricao == servico.descricao) {
        index = this.servicosSelecionados.indexOf(s);
      }
    })

    this.servicosSelecionados.splice(index, 1);
    this.table.renderRows();
  }

}
