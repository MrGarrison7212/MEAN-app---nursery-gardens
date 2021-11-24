import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-dodaj-rasadnik',
  templateUrl: './dodaj-rasadnik.component.html',
  styleUrls: ['./dodaj-rasadnik.component.css']
})
export class DodajRasadnikComponent implements OnInit {

  constructor(private servis: KorisnikService) { }

  ngOnInit(): void {
  }


usernameVlasnika: string = localStorage.getItem('loggedInUser');
naziv: string;
mesto: string;
sirina: number;
duzina: number;
nazivMagacina: string;
message1: string;
message2: string;

uspesno1: boolean;
uspesno2: boolean;


dodajRasadnik() {
  if (this.emptyField(this.usernameVlasnika) || this.emptyField(this.naziv) || this.emptyField(this.mesto) ||
    this.emptyField(this.sirina) || this.emptyField(this.duzina)) {
    this.message1 = 'Morate popuniti sva polja!';
    return
  }
  else {
      this.servis.dodajRasadnik1(this.usernameVlasnika, this.naziv, this.mesto,
      this.sirina, this.duzina);
  }

}

dodajMagacin() {
  if (this.emptyField(this.nazivMagacina) || this.emptyField(this.naziv)) {
    this.message2 = 'Morate popuniti sva polja!';
    return
  }
  else {

  this.servis.dodajMagacin1(this.nazivMagacina, this.naziv);

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
