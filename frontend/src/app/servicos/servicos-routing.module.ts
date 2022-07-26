import { ServicoResolverGuard } from './guards/servico-resolver.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicoFormComponent } from './servico-form/servico-form.component';
import { ServicoListComponent } from './servico-list/servico-list.component';

const routes: Routes = [
  { path: '', component: ServicoListComponent },
  { path: 'cadastrar', component: ServicoFormComponent, resolve: {servico: ServicoResolverGuard} },
  { path: 'editar/:id', component: ServicoFormComponent, resolve: {servico: ServicoResolverGuard} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicosRoutingModule { }
