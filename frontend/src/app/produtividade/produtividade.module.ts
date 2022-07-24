import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutividadeRoutingModule } from './produtividade-routing.module';
import { ProdutividadeListComponent } from './produtividade-list/produtividade-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProdutividadeDetalhesComponent } from './produtividade-detalhes/produtividade-detalhes.component';


@NgModule({
  declarations: [
    ProdutividadeListComponent,
    ProdutividadeDetalhesComponent
  ],
  imports: [
    CommonModule,
    ProdutividadeRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatListModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatAutocompleteModule
  ]
})
export class ProdutividadeModule { }
