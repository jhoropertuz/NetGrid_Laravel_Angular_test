import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionApiService } from '../services/connection-api.service';
import { LocalStorageService } from '../services/local-storage.service';
import { SweetalertService } from '../services/sweetalert.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(
    public SweetalertService:SweetalertService,
    public LocalStorageService:LocalStorageService,
    private ConnectionApiService:ConnectionApiService,
    private Router:Router
  ) { }

  ngOnInit(): void {
  }

  salir() {
    this.SweetalertService.confirmacion('question', 'Esta seguro que desea cerrar sesión? ').then(res =>{
      if (res) {
          this.ConnectionApiService.get('logout').subscribe(res=>{
            this.SweetalertService.notificacion("success",res.message);
            this.LocalStorageService.deleteAll();
            this.Router.navigateByUrl('login');
        }, e =>{
              this.SweetalertService.modal("error", e.error.message);
        });
      }
    });
  }
}
