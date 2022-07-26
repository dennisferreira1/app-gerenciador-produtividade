import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'produtividade' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profissionais',
    loadChildren: () => import('./profissionais/profissionais.module').then(m => m.ProfissionaisModule)
  },
  { path: 'servicos',
    loadChildren: () => import('./servicos/servicos.module').then(m => m.ServicosModule)
  },
  { path: 'ordens-de-servicos',
    loadChildren: () => import('./ordens-de-servicos/ordens-de-servicos.module').then(m => m.OrdensDeServicosModule)
  },
  { path: 'produtividade',
    loadChildren: () => import('./produtividade/produtividade.module').then(m => m.ProdutividadeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
