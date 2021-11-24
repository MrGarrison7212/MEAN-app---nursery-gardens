import { Component, OnInit } from '@angular/core';
import { Narudzbina } from '../models/narudzbina';
import { KorisnikService } from '../korisnik.service';
import { Preduzece } from '../models/preduzece';
import { Pregled30 } from '../models/pregled30';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pregled30dana',
  templateUrl: './pregled30dana.component.html',
  styleUrls: ['./pregled30dana.component.css']
})
export class Pregled30danaComponent implements OnInit {

  constructor(private servis:KorisnikService, private router: Router) { }

  ngOnInit(): void {
    this.ukupanIznos = 0;
    this.ukupnoBroj = 0;
    this.userPreduzece = localStorage.getItem('loggedInUser');
    this.servis.ucitajPreduzeca().subscribe((pred) =>{
      this.preduzeca = pred;
      this.preduzeca.forEach(predu =>{
        if(predu.username == this.userPreduzece){
          this.preduzece = predu;
        }
      })
    })
    this.servis.ucitajNarudzbine1().subscribe((narudz=>{
      this.narudzbine30 = [];
      this.pregled30 = [];
      let danasnjiDatum = new Date();
      let danasnjiDatum1:any = new Date(danasnjiDatum);


      this.narudzbine = [];
      this.narudzbine = narudz;

      for(let i=0;i<30; i=i+1){
        if(i == 0) this.poslednjih30dana[i] = danasnjiDatum1;
        else this.poslednjih30dana[i] = new Date().setDate(danasnjiDatum1.getDate()-i);
      }
      for(let i=0; i<30; i=i+1){
      let datumkonvert:any= new Date(this.poslednjih30dana[i]);
      this.poslednjih30dana[i] = datumkonvert;
      this.narudzbineZaPregled[i] = 0;
      }


      this.narudzbine.forEach(narudzbina1234 =>{
        if(narudzbina1234.proizvodjac == this.preduzece.naziv && narudzbina1234.status == "ISPORUCENA I AZURIRANA"){
          let datumnar:any = new Date(narudzbina1234.datum);
          for(let i = 0; i< 30; i=i+1){
            let datumprovera:any = new Date(this.poslednjih30dana[i]);
            var provera:any = Math.floor((datumprovera - datumnar) / (1000 * 60 * 60 * 24));
            if(provera == 0){
              this.narudzbineZaPregled[i]++;
            }
          }
        }
      })



      this.narudzbine.forEach(naru=>{
        if(naru.proizvodjac == this.preduzece.naziv && naru.status == 'ISPORUCENA I AZURIRANA'){
          let datum1:any = new Date(naru.datum);
          var diffDays:any = Math.floor((danasnjiDatum1 - datum1) / (1000 * 60 * 60 * 24));
            if(diffDays < 30){
 //         if(parseInt(Math.floor((datum1.getTime() - danasnjiDatum1.getTime()) / (1000 * 60 * 60 * 24)).toString()) < diffDays){
            this.narudzbine30.push(naru);
          }
        }
      })

      this.narudzbine30.forEach(naru4=>{
        this.ukupnoBroj += 1;
        this.ukupanIznos += parseInt(naru4.cena.toString());
      })

      this.narudzbine30.forEach(naru2=>{
        if(this.pregled30.filter(preg3=>
          Math.floor((preg3.datum.getTime() - naru2.datum.getTime() / (1000 * 60 * 60 * 24)))[0])){
            let pregled = {
              datum : naru2.datum,
              brojNarudzbina : 0,
              iznos: 0
            }
            this.pregled30.push(pregled);
          }
          else{
            let pregled = {
              datum : naru2.datum,
              brojNarudzbina : 0,
              iznos: 0
            }
            this.pregled30.push(pregled);
          }
      })
      this.narudzbine30.forEach(naru1=>{
        this.pregled30.forEach(preg=>{
          if(preg.datum == naru1.datum){
            preg.brojNarudzbina += 1;
            preg.iznos += naru1.cena;
          }
        })
      })
    }))
  }

  poslednjih30dana = new Array(30);


  narudzbineZaPregled = new Array(30);

  narudzbine: Narudzbina[] = [];
  narudzbine30: Narudzbina[] = [];
  userPreduzece: string;
  preduzeca: Preduzece[] = [];
  preduzece: Preduzece;
  pregled30: Pregled30[] = [];
  ukupnoBroj: number;
  ukupanIznos: number;

  logOff(){
    this.servis.logOff();
  }

  nazad(){
    this.router.navigate(['preduzece']);
  }

  prikaz: boolean = false;
  prikaz1: boolean = false;
  prikaz2: boolean = false;

  prikazi(){
    this.prikaz = true;
  }

  prikaziSve(){
    this.prikaz1 = true;
  }

  prikaziUkupno(){
    this.prikaz2 = true;
  }

}
