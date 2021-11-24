import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Poljoprivrednik } from '../models/poljoprivrednik';
import { Preduzece } from '../models/preduzece';

@Component({
  selector: 'app-azuriraj-korisnika',
  templateUrl: './azuriraj-korisnika.component.html',
  styleUrls: ['./azuriraj-korisnika.component.css']
})
export class AzurirajKorisnikaComponent implements OnInit {

  constructor(private servis: KorisnikService) { }

  ngOnInit(): void {
  }

  username1: string;
  username2: string;

  poljoprivrednici: Poljoprivrednik[] = [];
  preduzeca: Preduzece[] = [];

  poljoprivrednikIzmena: Poljoprivrednik;
  preduzeceIzmena: Preduzece;

  pretragaPoljo(username1) {
    this.servis.ucitajPoljoprivrednike().subscribe((poljopriv) => {
      let korisnik = username1;
      this.poljoprivrednici = poljopriv;
      this.poljoprivrednici.forEach(poljo => {
        if (poljo.username == korisnik) {
          this.poljoprivrednikIzmena = poljo;
        }
      });
    })
  }
  pretragaPred(username2) {
    this.servis.ucitajPreduzeca().subscribe((predu) => {
      let korisnik = username2;
      this.preduzeca = predu;
      this.preduzeca.forEach(pred => {
        if (pred.username == korisnik) {
          this.preduzeceIzmena = pred;
        }
      });
    })
  }

  azurirajPoljo() {
    this.servis.azurirajPoljo(this.poljoprivrednikIzmena.username, this.poljoprivrednikIzmena.password,
    this.poljoprivrednikIzmena.ime, this.poljoprivrednikIzmena.prezime,
    this.poljoprivrednikIzmena.mestoRodjenja, this.poljoprivrednikIzmena.datumRodjenja,
    this.poljoprivrednikIzmena.kontaktTelefon, this.poljoprivrednikIzmena.email).subscribe();
  }

  azurirajPred() {
    this.servis.azurirajPred(this.preduzeceIzmena).subscribe();
  }

  logOff(){
    this.servis.logOff();
  }

  nazad(){
    window.history.back();
  }
}


