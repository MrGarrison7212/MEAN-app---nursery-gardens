import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Preduzece } from '../models/preduzece';

@Component({
  selector: 'app-dodaj-sadnicu',
  templateUrl: './dodaj-sadnicu.component.html',
  styleUrls: ['./dodaj-sadnicu.component.css']
})
export class DodajSadnicuComponent implements OnInit {

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

  message: string;

  uspesno: boolean = false;

  proizvodjac: Preduzece;



  dodajSadnicu() {
    if (this.emptyField(this.naziv) || this.emptyField(this.cena)) {
      this.message = 'Morate popuniti sva polja';
      return
    }
    this.servis.dodajSadnicu1(this.proizvodjac, this.naziv, this.cena);
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
