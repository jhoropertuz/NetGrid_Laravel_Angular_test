import { Component, Input, OnInit } from '@angular/core';
import { ConnectionApiService } from '../../services/connection-api.service';
import { SweetalertService } from '../../services/sweetalert.service';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent implements OnInit {

  list: any[] = [];
  favorites: any[]= [];
  pokemons: any[]= [];
  message: string= 'Cargando Pokemons... 🐲';
  @Input() type: string = '';

  constructor(
    private ConnectionApiService: ConnectionApiService,
    public SweetalertService:SweetalertService
  ) { }

  ngOnInit(): void {
    this.ConnectionApiService.getPokemon('pokemon').subscribe( res => {
      this.pokemons = res.results;
      this.cargarPokemons();
    });
  }

  /*CARGA EL LISTADO A LA VISTA 👍*/
  cargarPokemons(){
    this.ConnectionApiService.get('my-favorites').subscribe( (favorites:any) => {

      this.favorites = favorites.data;

      if (this.type == 'favorites') {

        this.favorites.forEach((favorite:number) => {
            this.list.push(this.pokemons[favorite]);
        });

      }else{
        this.list = this.pokemons;
        this.cargarStyles();
      }

      this.message = 'No hay pokemons 😒';
    });
  }


  cargarStyles(){
    setTimeout(() => {
      this.favorites.forEach((favorite:number) => {
        document.getElementById('btnFavorites-'+favorite)!.style.background = 'green';
      });
  }, 0);

  }

  info(id: number){

    this.ConnectionApiService.getPokemon('pokemon/'+id).subscribe(info =>{
      let textModal = "";
      info.abilities.forEach((hab:any) => {
        if (textModal) {
          textModal += ', ';
        }
        textModal += hab.ability.name;
      });
      this.SweetalertService.modal('info', textModal, 'Habilidades');
    });
  }

  addFavorite(id: number){

    let domBtn = document.getElementById('btnFavorites-'+id);
    if (domBtn!.style.background == 'green') {
      domBtn!.style.background = '#ffc107';
    }else{
      domBtn!.style.background = 'green';
    }

    this.ConnectionApiService.post('add-favorite',{ref_api:id}).subscribe(res => {
      this.SweetalertService.notificacion('success', this.list[id].name + ' se añadio a favoritos');
      domBtn!.style.background = 'green';
    }, e => {
      domBtn!.style.background = '#ffc107';
    });
  }
}
