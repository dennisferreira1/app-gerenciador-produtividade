import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { Servico } from '../model/servico';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  private readonly API = 'https://gerenciador-produtividade.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  buscarServicos(): Observable<Servico[]> {
    return this.http.get<Servico[]>(`${this.API}/servicos`).pipe(
      first()
    );
  }

  salvar(servico: Servico): Observable<Servico> {
    return this.http.post<Servico>(`${this.API}/servicos`, servico);
  }

  atualizar(servico: Servico): Observable<Servico> {
    return this.http.put<Servico>(`${this.API}/servicos/${servico.id}`, servico);
  }

  excluir(servico: Servico): Observable<Servico> {
    return this.http.delete<Servico>(`${this.API}/servicos/${servico.id}`).pipe(
      first()
    );
  }

  getServicoById(id: number): Observable<Servico> {
    return this.http.get<Servico>(`${this.API}/servicos/${id}`).pipe(
      first()
    );
  }

}
