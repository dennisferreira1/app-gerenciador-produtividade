import { OrdensDeServicosModule } from './ordens-de-servicos/ordens-de-servicos.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profissionais',
    loadChildren: () => import('./profissionais/profissionais.module').then(m => m.ProfissionaisModule)
  },
  { path: 'ordens-de-servicos',
    loadChildren: () => import('./ordens-de-servicos/ordens-de-servicos.module').then(m => m.OrdensDeServicosModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
