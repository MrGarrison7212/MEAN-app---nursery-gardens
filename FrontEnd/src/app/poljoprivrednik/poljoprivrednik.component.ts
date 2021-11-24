import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Rasadnik } from '../models/rasadnik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poljoprivrednik',
  templateUrl: './poljoprivrednik.component.html',
  styleUrls: ['./poljoprivrednik.component.css']
})
export class PoljoprivrednikComponent implements OnInit {

  constructor(private servis: KorisnikService, private router : Router) { }

  ngOnInit(): void {
    this.servis.ucitajRasadnike1().subscribe((rasadniciVlasnika1) => {
      let vlasnik = localStorage.getItem('loggedInUser');
      this.rasadnici = rasadniciVlasnika1;
      this.rasadnici.forEach(rasad => {
        if (rasad.usernameVlasnika == vlasnik) {
          this.rasadniciVlasnika.push(rasad);
        }
      });
    })
  }


  zapocniProgres(){
    this.servis.zapocniProgres();
  }

  rasadnici: Rasadnik[] = [];
  rasadniciVlasnika: Rasadnik[] = [];

  pristupiRasadniku(rasadnik){
    this.servis.pristupiRasadniku(rasadnik.naziv);
  }

  dodajRasadnikPage(){
    this.servis.dodajRasadnikPage();
  }

  logOff(){
    this.servis.logOff();
  }

  nazad(){
    window.history.back();
  }

  promeniLoz(){
    this.router.navigate(['promenaLozinke']);
  }


}
