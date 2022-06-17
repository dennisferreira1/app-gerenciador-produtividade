import { ProfissionalService } from './../service/profissional.service';
import { Profissional } from './../model/profissional';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfissionalResolverGuard implements Resolve<Profissional> {

  constructor(private profissionalService: ProfissionalService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Profissional> {
    const id= route.paramMap.get('id');

    if(id != null) {
      return this.profissionalService.getProfissionalById(parseInt(id));
    }

    const profissional = {
      nome: null,
      profissao: null
    } as unknown as Profissional

    return of(profissional);
  }



}
