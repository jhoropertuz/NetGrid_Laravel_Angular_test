import { Injectable } from '@angular/core';
import  *  as CryptoJS from  'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private key = "tesApi";

  constructor() { }

  postDatoJson(id:string,obj:object){
    return localStorage.setItem(id, this.encrypt(JSON.stringify(obj)));
  }

  getDatoJson(id:string){
    let data = localStorage.getItem(id);

    if (data) {
      return JSON.parse(this.decrypt(localStorage.getItem(id)||''));
    }
    return false;
  }

  deleteData(id:string){
    return localStorage.removeItem(id);
  }

  deleteAll(){
    return localStorage.clear();
  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }
}
