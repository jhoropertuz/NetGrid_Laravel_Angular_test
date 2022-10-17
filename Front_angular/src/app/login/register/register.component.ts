import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ActiveUserService } from '../../services/active-user.service';
import { ConnectionApiService } from '../../services/connection-api.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { SweetalertService } from '../../services/sweetalert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  dataC;
  constructor(
    private ActiveUserService:ActiveUserService ,
    private fb: FormBuilder,
    private ConnectionApiService:ConnectionApiService,
    public SweetalertService:SweetalertService,
    public Router:Router
  ) {

    this.dataC=this.fb.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required])),
      confPassword: new FormControl('', Validators.compose([Validators.required])),
    });
   }

  ngOnInit(): void {

  }

  register(values:any){
    if(values.confPassword == values.password){
       this.ConnectionApiService.post('register',values).subscribe(res=>{

            this.ActiveUserService.setUser({
              ...res.data,
              token: res.token_access
            });

            this.SweetalertService.notificacion("success",res.message);
            this.Router.navigateByUrl("pages");
       }, e =>{
            this.SweetalertService.modal("error", e.error.message);
       });
    }else{
      this.SweetalertService.modal("warning", "La confirmación de la contraseña es invalida.");
    }
  }

}
