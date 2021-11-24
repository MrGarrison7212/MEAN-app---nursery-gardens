import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Preduzece } from '../models/preduzece';
import { Sadnica } from '../models/sadnica';
import { Preparat } from '../models/preparat';
import { Narudzbina } from '../models/narudzbina';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preduzece',
  templateUrl: './preduzece.component.html',
  styleUrls: ['./preduzece.component.css']
})
export class PreduzeceComponent implements OnInit {

  constructor(private servis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    this.userPreduzece = localStorage.getItem('loggedInUser');
    this.servis.ucitajPreduzeca().subscribe((pred) =>{
      this.preduzeca = pred;
      this.preduzeca.forEach(predu =>{
        if(predu.username == this.userPreduzece){
          this.preduzece = predu;
        }
      })
    })
  }

  tacnoS : boolean = false;
  tacnoP : boolean = false;
  tacnoN : boolean = false;

  message: string;

  userPreduzece : string;

  preduzeca : Preduzece[] = [];

  preduzece : Preduzece;

  preparatiP: Preparat[] = [];
  sadniceP: Sadnica[] = [];
  narudzbineP: Narudzbina[] = [];

  dohvatiSadniceP(){
//    this.sadniceP = this.servis.dohvatiSadniceP(this.preduzece);
    this.sadniceP = [];
    this.servis.ucitajSadnice1().subscribe((sad)=>{
      let sadnice1: Sadnica[] = [];
      sadnice1 = sad;
      sadnice1.forEach(sadni =>{
        if (sadni.lokacija == this.preduzece.naziv && sadni.naruceno == 0) {
          this.sadniceP.push(sadni);
        }
      })
    })
    this.tacnoS = true;
  }

  dohvatiPreparateP(){
    this.preparatiP = [];
//   this.preparatiP = this.servis.dohvatiPreparateP(this.preduzece);
    this.servis.ucitajPreparate1().subscribe((prep)=>{
      let preparati1: Preparat[] = [];
      preparati1 = prep;
      preparati1.forEach(prepar =>{
        if (prepar.lokacija == this.preduzece.naziv && prepar.naruceno == 0) {
          this.preparatiP.push(prepar);
        }
      })
    })
    this.tacnoP = true;
  }

  dohvatiNarudzbineP(){
    this.narudzbineP = [];
//    this.narudzbineP = this.servis.dohvatiNarudzbineP(this.preduzece);
    this.servis.ucitajNarudzbine1().subscribe((naru)=>{
      let narudzbine1: Narudzbina[] = [];
      narudzbine1 = naru;
      narudzbine1.forEach(narudz =>{
        if (narudz.proizvodjac == this.preduzece.naziv && (narudz.status == 'SPREMNA' || narudz.status == 'NA CEKANJU')) {
          this.narudzbineP.push(narudz);
        }
      })
    })
    this.tacnoN = true;
  }

  ukloniSadnicu(sadnica){
    this.servis.ukloniSadnicu11(sadnica.id).subscribe();
  }

  ukloniPreparat(preparat){
    this.servis.ukloniPreparat11(preparat.id).subscribe();
  }

  prihvatiNarudzbinu(narudzbina){
    this.servis.prihvatiNarudzbinu1(narudzbina);
  }

  odbijNarudzbinu(narudzbina){
    this.servis.odbijNarudzbinu1(narudzbina);
  }

  dodajSadnicuPage(){
    this.servis.dodajSadnicuPage();
  }

  dodajPreparatPage(){
    this.servis.dodajPreparatPage();
  }

  pregledPoslovanjaPage(){
    this.servis.pregledPoslovanjaPage();
  }

  zapocniIsporuku(){
    this.servis.zapocniIsporuku1();
  }

  logOff(){
    this.servis.logOff();
  }

  promeniLoz(){
    this.router.navigate(['promenaLozinke']);
  }

  nazad(){
    window.history.back();
  }


  comparesadN(){
    this.sadniceP.sort(compare1);
  }
  comparesadP(){
    this.sadniceP.sort(compare2);
  }
  comparepaN(){
    this.preparatiP.sort(compare1);
  }
  comparepaP(){
    this.preparatiP.sort(compare2);
  }

  compareNarDat(){
    this.narudzbineP.sort(compare3);
  }

  compareStatus(){
    this.narudzbineP.sort(compare4);
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

function compare3( a, b ) {
  if ( a.id < b.id ){
    return -1;
  }
  if ( a.id > b.id ){
    return 1;
  }
  return 0;
}

function compare4( a, b ) {
  if ( a.status < b.status ){
    return -1;
  }
  if ( a.status > b.status ){
    return 1;
  }
  return 0;
}

