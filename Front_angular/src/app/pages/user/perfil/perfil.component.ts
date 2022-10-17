import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnectionApiService } from '../../../services/connection-api.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { SweetalertService } from '../../../services/sweetalert.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  dataC;
  constructor(
    private LocalStorageService:LocalStorageService ,
    private fb: FormBuilder,
    private ConnectionApiService:ConnectionApiService,
    public SweetalertService:SweetalertService,
    public Router:Router
  ) {

    this.dataC=this.fb.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      address: new FormControl(''),
      birthdate: new FormControl(''),
      city: new FormControl(''),
      password: new FormControl(''),
      confPassword: new FormControl(''),
    });
   }

  ngOnInit(): void {
    this.addDataInit();
  }

  addDataInit(){
    this.ConnectionApiService.get(
      'user-perfile'
    ).subscribe((res:any)=>{
        this.addData(
          res.data.name,
          res.data.email,
          res.data.address,
          res.data.city,
          res.data.birthdate
        );
     }, e => {
      this.SweetalertService.modal("error", e.error.message);
     });
  }

  actualizar(values:any){
    if(values.confPassword == values.password){
       this.ConnectionApiService.put('update-user-perfile',values).subscribe(res=>{
           this.addData(
            res.data.name,
            res.data.email,
            res.data.address,
            res.data.city,
            res.data.birthdate
          );
          this.SweetalertService.notificacion("success", res.message);
       });
    }else{
      this.SweetalertService.modal("warning", "La confirmación de la contraseña es invalida.");
    }
  }

  addData(name:string, email:string, address:string, city:string, birthdate:any){
    this.dataC.controls['name'].setValue(name);
    this.dataC.controls['email'].setValue(email);
    this.dataC.controls['address'].setValue(address);
    this.dataC.controls['city'].setValue(city);
    this.dataC.controls['birthdate'].setValue(birthdate);
  }

}
