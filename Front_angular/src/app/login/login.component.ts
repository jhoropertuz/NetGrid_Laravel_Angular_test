import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ActiveUserService } from '../services/active-user.service';
import { ConnectionApiService } from '../services/connection-api.service';
import { LocalStorageService } from '../services/local-storage.service';
import { SweetalertService } from '../services/sweetalert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  dataC;
  constructor(
    private ActiveUserService:ActiveUserService,
    private fb: FormBuilder,
    private ConnectionApiService:ConnectionApiService,
    public SweetalertService:SweetalertService,
    public Router:Router
  ) {

    this.dataC=this.fb.group({
      user: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required]))
    });
   }

  ngOnInit(): void {

  }

  login(values:any){
    let user= values.user;
    let password= values.password;
    if(user && password ){
       this.ConnectionApiService.post(
        'login',
        {email:user,password:password}
      ).subscribe((res:any)=>{

          this.ActiveUserService.setUser({
            ...res.data,
            token: res.token_access
          });
          this.SweetalertService.notificacion("success", res.message);
          this.Router.navigateByUrl("pages");
       }, e => {
        this.SweetalertService.modal("error", e.error.message);
       });
    }
  }

}
