import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dodaj-korisnika',
  templateUrl: './dodaj-korisnika.component.html',
  styleUrls: ['./dodaj-korisnika.component.css']
})
export class DodajKorisnikaComponent implements OnInit {

  constructor(private servis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    this.servis.ucitajPoljoprivrednike();
    this.servis.ucitajPreduzeca();
    this.servis.ucitajZahtevePoljo();
    this.servis.ucitajZahtevePred();
  }

  username: string;
  username2: string;
  password: string;
  password2: string;
  ime: string;
  prezime: string;
  mestoRodjenja: string;
  datumRodjenja: Date;
  kontaktTelefon: string;
  email: string;
  email2: string;
  naziv: string;
  mesto: string;
  datumOsnivanja: Date;

  uspesnaRegistracija: boolean;


  message: string;
  message2: string;

  register1() {
    if (this.emptyField(this.ime) || this.emptyField(this.prezime) || this.emptyField(this.username) ||
      this.emptyField(this.password) || this.emptyField(this.mestoRodjenja) || this.emptyField(this.datumRodjenja) ||
      this.emptyField(this.kontaktTelefon) || this.emptyField(this.email)) {
      this.message = 'Morate popuniti sva polja!';
      return
    }
    let passwordRegex1 = /^[A-Z,a-z]/;
    let passwordRegex2 = /[A-Z]+/;
    let passwordRegex3 = /\W+/;
    let passwordRegex4 = /\d+/; 
    let passwordRegex5 = /.{7,}/;
    let mailRegex = /^\w+@\w+\.\w+$/;
    if(!mailRegex.test(this.email)){
      this.message = 'Mail je u losem formatu, promenite ga !';
      return
    }
    if (!passwordRegex1.test(this.password) || !passwordRegex2.test(this.password) || !passwordRegex3.test(this.password)
    || !passwordRegex4.test(this.password) || !passwordRegex5.test(this.password)) {
      this.message = "Lozinka je u losem formatu, promenite je !";
    }
    else {

    this.servis.dodajPoljoprivrednika(this.username, this.password, this.ime,
        this.prezime, this.mestoRodjenja, this.datumRodjenja, this.kontaktTelefon,
        this.email);
    }

  }

  register2() {
    if (this.emptyField(this.naziv) || this.emptyField(this.username2) ||
      this.emptyField(this.password2) || this.emptyField(this.mesto) ||
      this.emptyField(this.datumOsnivanja) || this.emptyField(this.email2)) {
      this.message2 = 'Morate popuniti sva polja!';
      return
    }
    let passwordRegex1 = /^[A-Z,a-z]/;
    let passwordRegex2 = /[A-Z]+/;
    let passwordRegex3 = /\W+/;
    let passwordRegex4 = /\d+/; 
    let passwordRegex5 = /.{7,}/;
    let mailRegex = /^\w+@\w+\.\w+$/;
    if(!mailRegex.test(this.email2)){
      this.message2 = 'Mail je u losem formatu, promenite ga !';
      return
    }
    if (!passwordRegex1.test(this.password2) || !passwordRegex2.test(this.password2) || !passwordRegex3.test(this.password2)
    || !passwordRegex4.test(this.password2) || !passwordRegex5.test(this.password2)) {
      this.message2 = "Lozinka je u losem formatu, promenite je !";
    }
    else {

      this.servis.dodajPreduzece(this.username2, this.password2, this.naziv,
        this.datumOsnivanja, this.mesto, this.email2);
    }

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
