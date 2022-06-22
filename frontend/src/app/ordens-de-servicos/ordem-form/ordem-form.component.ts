import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-ordem-form',
  templateUrl: './ordem-form.component.html',
  styleUrls: ['./ordem-form.component.scss']
})
export class OrdemFormComponent implements OnInit {

  allServicos = [
    {nome: 'Pintura em parede'},
    {nome: 'Pintura em teto'},
    {nome: 'Pintura em porta'},
    {nome: 'Pintura em piso'}
  ]

  servicos = [
    {descricao: 'Pintura em parede', quantidade: '60', und: 'm²'},
    {descricao: 'Pintura em teto', quantidade: '25', und: 'm²'},
    {descricao: 'Pintura em esquadria de madeira', quantidade: '5', und: 'm²'}
  ]

  separatorKeysCodes: number[] = [ENTER, COMMA];
  profissionaisCtrl = new FormControl('');
  profissionaisFiltrados: Observable<string[]>;
  profissionais: string[] = ['Marinaldo'];
  allProfissionais: string[] = ['Marinaldo', 'Ailton', 'Kelieldo', 'Alex', 'Silvano'];

  @ViewChild('profisionalInput') profisionalInput!: ElementRef<HTMLInputElement>;

  displayedColumns: string[] = ['descricao', 'und', 'quantidade'];

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {

    this.profissionaisFiltrados = this.profissionaisCtrl.valueChanges.pipe(
      startWith(null),
      map((profissional: string | null) => (profissional ? this._filter(profissional) : this.allProfissionais.slice())),
    );

    this.form = this.formBuilder.group({
      numero: ['01/2022'],
      descricao: [null],
    })
  }

  ngOnInit(): void {
  }

  salvar() {
  }

  cancelar() {
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

  }

}
