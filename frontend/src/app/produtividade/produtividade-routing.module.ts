import { ProdutividadeDetalhesComponent } from './produtividade-detalhes/produtividade-detalhes.component';
import { ProdutividadeListComponent } from './produtividade-list/produtividade-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfissionalResolverGuard } from '../profissionais/guards/profissional-resolver.guard';

const routes: Routes = [
  { path: '', component: ProdutividadeListComponent },
  { path: 'profissional/:id', component: ProdutividadeDetalhesComponent, resolve: {profissional: ProfissionalResolverGuard} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutividadeRoutingModule { }
