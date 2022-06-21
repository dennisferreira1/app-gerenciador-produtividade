import { OrdemListComponent } from './ordem-list/ordem-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'ordens-de-servicos'},
  { path: 'ordens-de-servicos', component: OrdemListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdensDeServicosRoutingModule { }
