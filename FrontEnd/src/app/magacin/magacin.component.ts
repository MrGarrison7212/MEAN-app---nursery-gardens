import { Component, OnInit } from '@angular/core';
import { Magacin } from '../models/magacin';
import { KorisnikService } from '../korisnik.service';
import { Preparat } from '../models/preparat';
import { Sadnica } from '../models/sadnica';
import { RequiredValidator } from '@angular/forms';
import { ResourceLoader } from '@angular/compiler';
import { Preduzece } from '../models/preduzece';
import { Narudzbina } from '../models/narudzbina';
import { Rasadnik } from '../models/rasadnik';
import { Router } from '@angular/router';


@Component({
  selector: 'app-magacin',
  templateUrl: './magacin.component.html',
  styleUrls: ['./magacin.component.css']
})
export class MagacinComponent implements OnInit {

  constructor(private servis: KorisnikService, private router: Router) { 
  }

  ngOnInit(): void {
    this.nazivMagacina = localStorage.getItem('MagacinLog');

    this.servis.ucitajMagacine1().subscribe((maga)=>{
      let magacini : Magacin[] = [];
      magacini = maga;
      magacini.forEach(magacin1 => {
        if (magacin1.naziv == this.nazivMagacina) {
          this.magacin = magacin1;
        }
      });
    })

    this.servis.ucitajPreparate1().subscribe((prep)=>{
      let preparati : Preparat[] = [];
      preparati = prep;
      preparati.forEach(preparat => {
        if (preparat.lokacija == this.nazivMagacina) {
          this.preparatiM.push(preparat);
        }
      });
    })

    this.servis.ucitajSadnice1().subscribe((sadn)=>{
      let sadnice : Sadnica[] = [];
      sadnice = sadn;
      sadnice.forEach(sadnica => {
        if (sadnica.lokacija == this.nazivMagacina) {
          this.sadniceM.push(sadnica);
        }
      });
    })

    this.servis.ucitajPreduzeca().subscribe((pred)=> {
      this.preduzeca = pred;
    })

    this.servis.ucitajRasadnike1().subscribe((rasadnici1) => {
      let vlasnik = localStorage.getItem('loggedInUser');
      this.rasadnici = rasadnici1;
      this.rasadnici.forEach(rasad => {
        if (rasad.usernameVlasnika == vlasnik && rasad.temperatura < 12 || rasad.voda < 75) {
          this.rasadniciOdrzavanje.push(rasad);
        }
      });
    })


    }

  preparatiM: Preparat[] = [];
  sadniceM: Sadnica[] = [];

  rasadniciOdrzavanje: Rasadnik[] = [];

  rasadnici: Rasadnik[] = [];

  preduzeca: Preduzece[] = [];

  narudzbineM: Narudzbina[] = [];

  tacnoN : boolean = false;

  nazivMagacina: string;

  magacin: Magacin;

  pristupiProdavnici(preduzece){
    this.servis.pristupProdavnici(preduzece);
  }

  dohvatiNarudzbineMag(){
    let narudzbine : Narudzbina[] = [];
    this.narudzbineM = [];
    this.servis.ucitajNarudzbine1().subscribe((naru)=> {
      narudzbine = naru;
      narudzbine.forEach(narudzbina=>{
        if (narudzbina.magacin == this.nazivMagacina && (narudzbina.status == 'SPREMNA' || narudzbina.status == 'CEKA ISPORUKU' || narudzbina.status=='ISPORUKA U TOKU' || narudzbina.status == 'NA CEKANJU') ) {
          this.narudzbineM.push(narudzbina);
        }
      })
    })
    this.tacnoN = true;
  }

  odbijNarudzbinu(narudzbina){
    this.servis.ucitajKurire();
    this.servis.odbijNarudzbinu1(narudzbina);
  }

  logOff(){
    this.servis.logOff();
  }

  nazad(){
    window.history.back();
  }

  pronasaoS: boolean;

  pronasaoP: boolean;

  preparatiPretraga: Preparat[] = [];
  sadnicePretraga: Sadnica[] = [];

  nazivS: string;
  nazivP: string;



  filterSadnice1(){
    this.pronasaoS = false;
    this.sadnicePretraga = [];
    this.servis.ucitajSadnice1().subscribe((sadnic=>{
      let sadniceP1 : Sadnica[] = [];
      sadniceP1 = sadnic;
      sadniceP1.forEach(sad=>{
        if((sad.naziv == this.nazivS || sad.proizvodjac == this.nazivS) && sad.lokacija == this.nazivMagacina){
          this.sadnicePretraga.push(sad);
          this.pronasaoS = true;
        }
      })
      if(this.pronasaoS){
        alert('Ima u magacinu!');
      }
      else{
        alert("U magacinu se ne nalazi trazena sadnica.");
      }
    }))
  }

  filterPreparati1(){
    this.pronasaoP = false;
    this.preparatiPretraga = [];
    this.servis.ucitajPreparate1().subscribe((prepara=>{
      let preparatiP1 : Preparat[] = [];
      preparatiP1 = prepara;
      preparatiP1.forEach(prep1=>{
        if((prep1.naziv == this.nazivP || prep1.proizvodjac == this.nazivP) && prep1.lokacija == this.nazivMagacina){
          this.preparatiPretraga.push(prep1);
          this.pronasaoP = true;
        }
      })
      if(this.pronasaoP){
        alert('Ima u magacinu!');
      }
      else{
        alert("U magacinu se ne nalazi trazeni preparat.");
      }
    }))
  }

  prikaz: boolean = false;
  prikaz1: boolean = false;
  prikaz2: boolean = false;

  prikaziSveSadnice(){
    this.prikaz = true;
    this.pronasaoS = false;
  }

  prikaziSvePreparate(){
    this.prikaz1 = true;
    this.pronasaoP = false;
  }

  comparesadN(){
    this.sadniceM.sort(compare1);
  }
  comparesadP(){
    this.sadniceM.sort(compare2);
  }
  comparepaN(){
    this.preparatiM.sort(compare1);
  }
  comparepaP(){
    this.preparatiM.sort(compare2);
  }

}
function compare1( a, b ) {
  if ( a.naziv < b.naziv ){
    return -1;
  }
  if ( a.naziv > b.naziv ){
    return 1;
  }
  return 0;
}
function compare2( a, b ) {
  if ( a.proizvodjac < b.proizvodjac ){
    return -1;
  }
  if ( a.proizvodjac > b.proizvodjac ){
    return 1;
  }
  return 0;
}
