import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { OrdemDeServico } from '../model/ordem-de-servico';
import { OrdemService } from './../service/ordem.service';

@Injectable({
  providedIn: 'root'
})
export class OrdemResolverGuard implements Resolve<OrdemDeServico> {

  constructor(private ordemService: OrdemService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): OrdemDeServico | Observable<OrdemDeServico> | Promise<OrdemDeServico> {

    const id= route.paramMap.get('id');

    if(id != null) {
      return this.ordemService.getOrdemById(parseInt(id));
    }

    const ordem = {
      descricao: null,
      numero: null,
      profissionais: [],
      servicos: [],
    } as unknown as OrdemDeServico

    return of(ordem);
  }

}
