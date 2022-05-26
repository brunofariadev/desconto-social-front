import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DescontoSocial } from './models/desconto-social';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiPath: string = 'api/descontosocial';

  constructor(private http: HttpClient) {
    this.apiPath = environment.API_URL + this.apiPath;
  }

  create(descontoSocial: DescontoSocial): Observable<DescontoSocial> {
    return this.http.post(this.apiPath, descontoSocial).pipe(
      catchError(this.handleError),
      map(this.jsonDataToDescontoSocial)
    );
  }

  jsonDataToDescontoSocial(jsonDataToDescontoSocial: any): DescontoSocial {
    return Object.assign(new DescontoSocial(), jsonDataToDescontoSocial);
  }

  handleError(erro: any): Observable<any> {
    console.log("Erro na requisicao => ", erro)
    return throwError(erro);
  }

  getParams(objeto: any): HttpParams {
    let params = new HttpParams();
    Object.keys(objeto).forEach((key) => {
      if (objeto[key]) {
        if (objeto[key] instanceof Array) {
          objeto[key].forEach((element) => {
            params = params.append(key.toString(), element);
          });
        } else if (typeof objeto[key] === 'object') {
          Object.keys(objeto[key]).forEach((k) => {
            params = params.append(key.toString() + '.' + k.toString(), objeto[key][k]);
          });
        } else {
          params = params.set(key.toString(), objeto[key].toString());
        }
      }
    });
    return params;
  }

}
