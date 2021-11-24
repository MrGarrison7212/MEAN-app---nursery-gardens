import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Preduzece } from '../models/preduzece';
import { Preparat } from '../models/preparat';
import { Sadnica } from '../models/sadnica';
import { Narudzbina } from '../models/narudzbina';

@Component({
  selector: 'app-prodavnica',
  templateUrl: './prodavnica.component.html',
  styleUrls: ['./prodavnica.component.css']
})
export class ProdavnicaComponent implements OnInit {

  constructor(private servis: KorisnikService) { }

  ngOnInit(): void {
    this.nazivPreduzeca = localStorage.getItem('ProdavnicaLog');
    this.preduzece = this.servis.ucitajPreduzecePoNazivu(this.nazivPreduzeca);
  }

  preduzece: Preduzece;

  tacnoS : boolean = false;
  tacnoP : boolean = false;

  nazivPreduzeca : string;

  nazivS: string;
  nazivP: string;

  porukaS: string;
  porukaP: string;

  preparatiP: Preparat[] = [];
  sadniceP: Sadnica[] = [];

  preparatiPretraga: Preparat[] = [];
  sadnicePretraga: Sadnica[] = [];


  narudzbinaId : number;

  pronasaoS: boolean;

  pronasaoP: boolean;

  dohvatiSadniceProd(){
  //  this.sadniceP = this.servis.dohvatiSadniceProd(this.nazivPreduzeca);
  this.sadniceP = [];
  this.servis.ucitajSadnice1().subscribe((sad)=>{
    let sadnice1: Sadnica[] = [];
    sadnice1 = sad;
    sadnice1.forEach(sadni =>{
      if (sadni.lokacija == this.nazivPreduzeca && sadni.naruceno == 0) {
        this.sadniceP.push(sadni);
      }
    })
  })
  this.tacnoS = true;
  }

  dohvatiPreparateProd(){
 //   this.preparatiP = this.servis.dohvatiPreparateProd(this.nazivPreduzeca);
  this.preparatiP = [];
  this.servis.ucitajPreparate1().subscribe((prep)=>{
    let preparati1: Preparat[] = [];
    preparati1 = prep;
    preparati1.forEach(prepar =>{
      if (prepar.lokacija == this.nazivPreduzeca && prepar.naruceno == 0) {
        this.preparatiP.push(prepar);
      }
    })
  })
    this.tacnoP = true;
  }

  comparesadN(){
    this.sadniceP.sort(compare1);
  }
  comparepaN(){
    this.preparatiP.sort(compare1);
  }

  zapocniNarudzbinuSad(){
    this.servis.zapocniNarudzbinuSad1(this.nazivPreduzeca);
  }

  zapocniNarudzbinuPrep(){
    this.servis.zapocniNarudzbinuPrep1(this.nazivPreduzeca);
  }

  zavrsiNarudzbinuSad(){
    this.narudzbinaId = parseInt(localStorage.getItem('narudzbinaIdSad'));
    this.servis.zavrsiNarudzbinu1(this.narudzbinaId);
  }

  zavrsiNarudzbinuPrep(){
    this.narudzbinaId = parseInt(localStorage.getItem('narudzbinaIdPrep'));
    this.servis.zavrsiNarudzbinu1(this.narudzbinaId);
  }

  odaberiSadnicu(sadnica){
    this.narudzbinaId = parseInt(localStorage.getItem('narudzbinaIdSad'));
    this.servis.odaberiSadnicu1(sadnica, this.narudzbinaId);
  }

  odaberiPreparat(preparat){
    this.narudzbinaId = parseInt(localStorage.getItem('narudzbinaIdPrep'));
    this.servis.odaberiPreparat1(preparat, this.narudzbinaId);
  }

  pretragaSadnice(){
    this.pronasaoS = this.servis.pretragaSadnice(this.nazivS, this.nazivPreduzeca);
    if(this.pronasaoS){
      this.porukaS = 'Ima na stanju! Da bi ste kupili datu sadnicu, molimo vas odaberite opciju - "Prikazi sadnice".';
    }
    else{
      this.porukaS = 'Izvinjavamo se, datu sadnicu trenutno nemamo na stanju.';
    }
  }

  pretragaSadnice1(){
    this.pronasaoS = false;
    this.sadnicePretraga = [];
    this.servis.ucitajSadnice1().subscribe((sadnic=>{
      let sadniceP1 : Sadnica[] = [];
      sadniceP1 = sadnic;
      sadniceP1.forEach(sad=>{
        if(sad.naziv == this.nazivS && sad.lokacija == this.nazivPreduzeca){
          this.sadnicePretraga.push(sad);
          this.pronasaoS = true;
        }
      })
      if(this.pronasaoS){
        alert('Ima na stanju!');
      }
      else{
        alert("Izvinjavamo se, datu sadnicu trenutno nemamo na stanju.");
      }
    }))
  }

  pretragaPreparati1(){
    this.pronasaoP = false;
    this.preparatiPretraga = [];
    this.servis.ucitajPreparate1().subscribe((prepara=>{
      let preparatiP1 : Preparat[] = [];
      preparatiP1 = prepara;
      preparatiP1.forEach(prep1=>{
        if(prep1.naziv == this.nazivP && prep1.lokacija == this.nazivPreduzeca){
          this.preparatiPretraga.push(prep1);
          this.pronasaoP = true;
        }
      })
      if(this.pronasaoP){
        alert('Ima na stanju!');
      }
      else{
        alert("Izvinjavamo se, dati preparat trenutno nemamo na stanju.");
      }
    }))
  }

  pretragaPreparati(){
    this.pronasaoP = this.servis.pretragaPreparati(this.nazivP, this.nazivPreduzeca);
    if(this.pronasaoP){
      this.porukaP = 'Ima na stanju! Da bi ste kupili dati preparat, molimo vas odaberite opciju - "Prikazi preparate".';
    }
    else{
      this.porukaP = 'Izvinjavamo se, dati preparat trenutno nemamo na stanju.';
    }
  }
  
  logOff(){
    this.servis.logOff();
  }

  nazad(){
    window.history.back();
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

