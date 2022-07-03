import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { Profissional } from './../model/profissional';

@Injectable({
  providedIn: 'root'
})
export class ProfissionalService {

  private readonly API = '/api';

  constructor(private http: HttpClient) { }

  salvar(profissional: Profissional): Observable<Profissional> {
    return this.http.post<Profissional>(`${this.API}/profissionais`, profissional);
  }

  atualizar(profissional: Profissional): Observable<Profissional> {
    return this.http.put<Profissional>(`${this.API}/profissionais/${profissional.id}`, profissional);
  }

  excluir(profissional: Profissional): Observable<Profissional> {
    return this.http.delete<Profissional>(`${this.API}/profissionais/${profissional.id}`).pipe(
      first()
    );
  }

  buscarProfissionais(): Observable<Profissional[]> {
    return this.http.get<Profissional[]>(`${this.API}/profissionais`).pipe(
      first()
    );
  }

  getProfissionalById(id: number): Observable<Profissional> {
    return this.http.get<Profissional>(`${this.API}/profissionais/${id}`).pipe(
      first()
    );
  }

  getProfissionalByNome(nome: string): Observable<Profissional[]> {
    return this.http.get<Profissional[]>(`${this.API}/profissionais/?nome=${nome}`).pipe(
      first()
    );
  }
}
