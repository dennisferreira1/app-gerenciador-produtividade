
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { OrdemDeServico } from '../model/ordem-de-servico';

@Injectable({
  providedIn: 'root'
})
export class OrdemService {
  private readonly API = '/api';

  constructor(private http: HttpClient) { }

  salvar(ordemDeServico: OrdemDeServico): Observable<OrdemDeServico> {
    return this.http.post<OrdemDeServico>(`${this.API}/ordens-de-servicos`, ordemDeServico);
  }

  atualizar(ordemDeServico: OrdemDeServico): Observable<OrdemDeServico> {
    return this.http.put<OrdemDeServico>(`${this.API}/ordens-de-servicos/${ordemDeServico.id}`, ordemDeServico);
  }

  excluir(ordemDeServico: OrdemDeServico): Observable<OrdemDeServico> {
    return this.http.delete<OrdemDeServico>(`${this.API}/ordens-de-servicos/${ordemDeServico.id}`).pipe(
      first()
    );
  }

  buscarOrdens(): Observable<OrdemDeServico[]> {
    return this.http.get<OrdemDeServico[]>(`${this.API}/ordens-de-servicos`).pipe(
      first()
    );
  }

  getOrdemById(id: number): Observable<OrdemDeServico> {
    return this.http.get<OrdemDeServico>(`${this.API}/ordens-de-servicos/${id}`).pipe(
      first()
    );
  }

}
