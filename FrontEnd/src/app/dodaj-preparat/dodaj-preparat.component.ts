import { Component, OnInit } from '@angular/core';
import { Preduzece } from '../models/preduzece';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-dodaj-preparat',
  templateUrl: './dodaj-preparat.component.html',
  styleUrls: ['./dodaj-preparat.component.css']
})
export class DodajPreparatComponent implements OnInit {

  constructor(private servis: KorisnikService) { }

  ngOnInit(): void {
    this.usernameProizvodjac = localStorage.getItem('loggedInUser');

    this.servis.ucitajPreduzeca().subscribe((pred =>{
      let preduzeca:Preduzece[]=[];
      preduzeca = pred;
      preduzeca.forEach(predu=>{
        if(predu.username == this.usernameProizvodjac){
          this.proizvodjac = predu;
        }
      })
    }))
  }

  usernameProizvodjac: string;

  naziv: string;
  cena: number;
  progres: number;

  message: string;

  uspesno: boolean = false;

  proizvodjac: Preduzece;



  dodajPreparat() {
    if (this.emptyField(this.naziv) || this.emptyField(this.cena)) {
      this.message = 'Morate popuniti sva polja';
      return
    }
    this.servis.dodajPreparat1(this.proizvodjac, this.naziv, this.cena, this.progres);
  }

  logOff(){
    this.servis.logOff();
  }
  
  nazad(){
    window.history.back();
  }

  emptyField(field): boolean {
    return (field == '' || field == null);
  }


}
