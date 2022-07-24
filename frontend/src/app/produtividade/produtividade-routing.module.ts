import { ProdutividadeDetalhesComponent } from './produtividade-detalhes/produtividade-detalhes.component';
import { ProdutividadeListComponent } from './produtividade-list/produtividade-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ProdutividadeListComponent },
  { path: 'profissional/:id', component: ProdutividadeDetalhesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutividadeRoutingModule { }
