import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ServicoService } from '../service/servico.service';
import { Servico } from '../model/servico';

@Injectable({
  providedIn: 'root'
})
export class ServicoResolverGuard implements Resolve<Servico> {

  constructor(private servicoService: ServicoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Servico> {

    const id= route.paramMap.get('id');

    if(id != null) {
      return this.servicoService.getServicoById(parseInt(id));
    }

    const servico = {
      descricao: null,
      und: null,
      horasParaExecutar1Und: null
    } as unknown as Servico

    return of(servico);
  }

}
