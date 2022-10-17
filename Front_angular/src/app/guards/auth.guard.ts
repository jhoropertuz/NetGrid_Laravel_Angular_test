import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ActiveUserService } from '../services/active-user.service';
import { LocalStorageService } from '../services/local-storage.service';
import { SweetalertService } from '../services/sweetalert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public SweetalertService:SweetalertService,
    private router: Router,
    private ActiveUserService:ActiveUserService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let user=this.ActiveUserService.getUser();

    if(user){
        return true;
    }else{

      this.router.navigateByUrl("login");
      return false;
    }
  }
}
