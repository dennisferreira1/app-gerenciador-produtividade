import { OrdemFormComponent } from './ordem-form/ordem-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdemDetalhesComponent } from './ordem-detalhes/ordem-detalhes.component';
import { OrdemListComponent } from './ordem-list/ordem-list.component';

const routes: Routes = [
  { path: '', component: OrdemListComponent },
  { path: 'detalhes/:id', component: OrdemDetalhesComponent },
  { path: 'editar/:id', component: OrdemFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdensDeServicosRoutingModule { }
