import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ActiveUserService {

  constructor(private LocalStorageService: LocalStorageService) { }

  getUser(){
    return this.LocalStorageService.getDatoJson('user');
  }

  setUser(data:any){
    return this.LocalStorageService.postDatoJson('user', data);
  }

}
