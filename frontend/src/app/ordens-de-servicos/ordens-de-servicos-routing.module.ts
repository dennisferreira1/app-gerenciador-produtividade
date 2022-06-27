import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdemResolverGuard } from './guards/ordem-resolver.guard';
import { OrdemDetalhesComponent } from './ordem-detalhes/ordem-detalhes.component';
import { OrdemFormComponent } from './ordem-form/ordem-form.component';
import { OrdemListComponent } from './ordem-list/ordem-list.component';

const routes: Routes = [
  { path: '', component: OrdemListComponent },
  { path: 'detalhes/:id', component: OrdemDetalhesComponent },
  { path: 'editar/:id', component: OrdemFormComponent, resolve: {ordem: OrdemResolverGuard} },
  { path: 'cadastrar', component: OrdemFormComponent, resolve: {ordem: OrdemResolverGuard} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdensDeServicosRoutingModule { }
