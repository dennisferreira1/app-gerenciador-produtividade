import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { OrdemDetalhesComponent } from './ordem-detalhes/ordem-detalhes.component';
import { OrdemListComponent } from './ordem-list/ordem-list.component';
import { OrdensDeServicosRoutingModule } from './ordens-de-servicos-routing.module';




@NgModule({
  declarations: [
    OrdemListComponent,
    OrdemDetalhesComponent
  ],
  imports: [
    CommonModule,
    OrdensDeServicosRoutingModule,
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
    MatChipsModule
  ]
})
export class OrdensDeServicosModule { }
