import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Poljoprivrednik } from '../models/poljoprivrednik';
import { Preduzece } from '../models/preduzece';
import { Admin } from '../models/admin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private servis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    this.servis.ucitajAdmine();
    this.servis.ucitajPoljoprivrednike();
    this.servis.ucitajPreduzeca();
    this.username = localStorage.getItem('loggedInUser');
  }

  username: string;
  password: string;
  passwordNew: string;
  passwordNewConf: string;

  poljoprivrednikIzmena: Poljoprivrednik;
  preduzeceIzmena: Preduzece;
  adminIzmena: Admin;

  message: string;
  poruka: string;


  pretragaKorisnika() {
    this.adminIzmena = this.servis.pretragaAdmin(this.username);
    this.preduzeceIzmena = this.servis.pretragaPred(this.username);
    this.poljoprivrednikIzmena = this.servis.pretragaPoljo(this.username);
  }

  promeniLozinku() {
    if (this.emptyField(this.passwordNew)
      || this.emptyField(this.passwordNewConf)) {
      this.message = 'Morate popuniti sva polja!';
      return
    }
    if (this.passwordNew != this.passwordNewConf) {
      this.message = 'Lozinke se ne podudaraju, potvrdite ponovo!';
      return
    }
    if (this.password == this.passwordNew) {
      this.message = 'Nova lozinka ne sme biti ista kao i stara!';
      return
    }
    let passwordRegex = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,})$/;
    if (!passwordRegex.test(this.passwordNew)) {
      this.message = "Nova lozinka je u losem formatu, promenite je !";
      return
    }
    /* else {
       this.poruka = this.servis.promeniLozinku(this.username, this.password,
         this.passwordNew, this.passwordNewConf, this.message);
 
     }
     */
    this.message = this.servis.promeniLozinku1(this.username, this.password, this.passwordNew, this.passwordNewConf);


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
