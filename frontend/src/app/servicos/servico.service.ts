import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servico } from './servico';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  constructor(private http: HttpClient) { }

  getServicos() {
    return this.http.get<Servico[]>('https://gerenciador-produtividade.herokuapp.com/');
  }
}
