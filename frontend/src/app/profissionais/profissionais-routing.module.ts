import { ProfissionalFormComponent } from './profissional-form/profissional-form.component';
import { ProfissionalListComponent } from './profissional-list/profissional-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfissionalResolverGuard } from './guards/profissional-resolver.guard';

const routes: Routes = [
  { path: '', component: ProfissionalListComponent },
  { path: 'cadastrar', component: ProfissionalFormComponent, resolve: {profissional: ProfissionalResolverGuard} },
  { path: 'editar/:id', component: ProfissionalFormComponent, resolve: {profissional: ProfissionalResolverGuard} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfissionaisRoutingModule { }
