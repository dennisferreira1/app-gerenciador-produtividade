
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import { OrdemDeServico } from '../model/ordem-de-servico';

@Injectable({
  providedIn: 'root'
})
export class OrdemService {
  private readonly API = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

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
