import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-registracija2',
  templateUrl: './registracija2.component.html',
  styleUrls: ['./registracija2.component.css']
})
export class Registracija2Component implements OnInit {

  constructor(private servis: KorisnikService) { }

  ngOnInit(): void {
    this.servis.ucitajPreduzeca();
    this.servis.ucitajZahtevePred();
  }




  username: string;
  password: string;
  passwordConf: string;
  naziv: string;
  mesto: string;
  datumOsnivanja: Date;
  email: string;

  uspesnaRegistracija: boolean;


  message: string;

  register2() {
    if (this.emptyField(this.naziv) || this.emptyField(this.username) ||
      this.emptyField(this.password) || this.emptyField(this.mesto) ||
      this.emptyField(this.datumOsnivanja) || this.emptyField(this.email)) {
      alert('Morate popuniti sva polja!');
      return
    }
    let mailRegex = /^\w+@\w+\.\w+$/;
    let passwordRegex1 = /^[A-Z,a-z]/;
    let passwordRegex2 = /[A-Z]+/;
    let passwordRegex3 = /\W+/;
    let passwordRegex4 = /\d+/; 
    let passwordRegex5 = /.{7,}/;
    if(!mailRegex.test(this.email)){
      alert('Mail je u losem formatu, promenite ga!');
      return
    }
    if (!passwordRegex1.test(this.password) || !passwordRegex2.test(this.password) || !passwordRegex3.test(this.password)
    || !passwordRegex4.test(this.password) || !passwordRegex5.test(this.password)) {
      alert("Lozinka je u losem formatu, promenite je !");
      return
    }
    if (this.password != this.passwordConf) {
      alert('Lozinke se ne podudaraju, potvrdite ponovo!');
      return
    }
    else {
      this.servis.zahtevZaReg12(this.username, this.password, this.naziv,
        this.datumOsnivanja, this.mesto, this.email);
    }
  }

  emptyField(field): boolean {
    return (field == '' || field == null);
  }

  logOff(){
    this.servis.logOff();
  }

  nazad(){
    window.history.back();
  }

}
