import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Poljoprivrednik } from '../models/poljoprivrednik';
import { Preduzece } from '../models/preduzece';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private servis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    this.servis.ucitajZahtevePred().subscribe((zahtevipr) => {
      this.zahteviPred = zahtevipr;
    })
    this.servis.ucitajZahtevePoljo().subscribe((zahtevipo) => {
      this.zahteviPoljo = zahtevipo;
    })
  }



  zahteviPoljo: Poljoprivrednik[]=[];
  zahteviPred: Preduzece[]=[];

  odobriRegPoljo(zahtevPoljo){
    this.servis.odobriRegPoljo(zahtevPoljo.username,zahtevPoljo.password, zahtevPoljo.ime, zahtevPoljo.prezime,
        zahtevPoljo.mestoRodjenja, zahtevPoljo.datumRodjenja, zahtevPoljo.kontaktTelefon, zahtevPoljo.email);
  }
  odobriRegPred(zahtevPred){
    this.servis.odobriRegPred(zahtevPred.username, zahtevPred.password, zahtevPred.naziv,
       zahtevPred.datumOsnivanja, zahtevPred.mesto, zahtevPred.email);
  }

  obrisiRegPoljo(zahtevPoljo){
    this.servis.obrisiRegPoljo(zahtevPoljo);
  }

  obrisiRegPred(zahtevPred){
    this.servis.obrisiRegPred(zahtevPred);
  }

  dodajKorisnika(){
    this.router.navigate(['/dodajKorisnika']);
  }
  
  azurirajKorisnika(){
    this.router.navigate(['/azurirajKorisnika']);

  }

  obrisiKorisnika(){
    this.router.navigate(['/obrisiKorisnika']);

  }

  zapocniProgres(){
    this.servis.zapocniProgres1();
  }

  logOff(){
    this.servis.logOff();
  }

  nazad(){
    window.history.back();
  }

}
