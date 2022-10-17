import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIS } from '../config';
import { ActiveUserService } from './active-user.service';
@Injectable({
  providedIn: 'root'
})
export class ConnectionApiService {

  constructor(
    private http: HttpClient,
    private ActiveUserService:ActiveUserService
    ) {

  }

  getHeader(){
    let token: string = this.ActiveUserService.getUser().token;
    return { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${ token }` : '',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers' : 'X-Requested-With,content-type'
    }) };
  }

  get(endPoind:string):Observable<any>{
    return this.http.get<any>(APIS.BASE + endPoind, this.getHeader());
  }

  post(endPoind:string,Data:any={}):Observable<any>{
    return this.http.post<any>(APIS.BASE + endPoind,Data, this.getHeader());
  }

  put(endPoind:string,Data:any={}):Observable<any>{
    return this.http.put<any>(APIS.BASE + endPoind,Data, this.getHeader());
  }

  getPokemon(endPoind:string):Observable<any>{
    return this.http.get<any>(APIS.POKEMON + endPoind);
  }
}
