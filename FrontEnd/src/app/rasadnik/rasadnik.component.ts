import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Rasadnik } from '../models/rasadnik';
import { Sadnica } from '../models/sadnica';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Parcela } from '../models/parcela';
import { Router } from '@angular/router';
import { Preparat } from '../models/preparat';
import { Magacin } from '../models/magacin';

@Component({
  selector: 'app-rasadnik',
  templateUrl: './rasadnik.component.html',
  styleUrls: ['./rasadnik.component.css']
})
export class RasadnikComponent implements OnInit {

  constructor(private servis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    this.servis.ucitajParcele1().subscribe((parcele1) => {
      this.servis.ucitajSadnice1().subscribe((sadnice1) => {
        let parcele: Parcela[] = [];
        let sadnice: Sadnica[] = [];
        let rasadnik = localStorage.getItem('RasadnikLog');
        parcele = parcele1;
        sadnice = sadnice1;        
        parcele.forEach(parcela => {
          if (parcela.nazivRas == rasadnik) {
            sadnice.forEach(sadnica => {
              if (parcela.id == sadnica.mestoURasadniku && sadnica.lokacija == rasadnik && parseInt(sadnica.zasadjena.toString()) == 1) {
                this.servis.azurirajParcele3(rasadnik, parcela.id, sadnica.id).subscribe();
              }
            });
            this.parceleRas.push(parcela);
          }
        });
        this.parceleRas.sort(compare1);
      })
    })

    this.nazivRasadnika = localStorage.getItem('RasadnikLog');
    this.servis.ucitajRasadnike1().subscribe((rasadnici1) => {
      this.nazivRasadnika = localStorage.getItem('RasadnikLog');
      this.rasadnici = rasadnici1;
      this.rasadnici.forEach(rasad => {
        if (rasad.naziv == this.nazivRasadnika) {
          this.rasadnik = rasad;
          this.duzinaRAS.length = this.rasadnik.duzina;
          this.sirinaRAS.length = this.rasadnik.sirina;
          this.mestaURasadniku.length = this.rasadnik.duzina * this.rasadnik.sirina;
          for(let i = 0; i< this.rasadnik.duzina; i++){
            this.duzinaRAS[i] = i;
            for(let j = 0; j< this.rasadnik.sirina; j++){
              this.sirinaRAS[j] = j*this.rasadnik.duzina;
            }
          }
          for(let i = 0; i<this.rasadnik.duzina*this.rasadnik.sirina; i++){
            this.mestaURasadniku[i] = i;
          }
        }
      });
      let vlasnik = localStorage.getItem('loggedInUser');
      this.rasadnici.forEach(rasad => {
        if (rasad.usernameVlasnika == vlasnik && rasad.temperatura < 12 || rasad.voda < 75) {
          this.rasadniciOdrzavanje.push(rasad);
        }
      });
    })


  }

  parceleRas: Parcela[] = [];


  rasadnici: Rasadnik[] = [];


  nazivRasadnika: string;

  uspeo: boolean;

  rasadnik: Rasadnik;

  sadnica: Sadnica;

  sirinaRAS: number[] = [];
  duzinaRAS: number[] = [];
  mestaURasadniku: number[] = [];

  zasadjeneSadnice: Sadnica[] = [];
  rasadnikCeo: Sadnica[] = [];



  rasadniciOdrzavanje: Rasadnik[] = [];
  sadniceM: Sadnica[] = [];

  preparatiM: Preparat[] = [];

  sadnicaInfo(parcela) {
    let sadnice: Sadnica[] = [];
    this.servis.ucitajSadnice1().subscribe((sad) => {
      sadnice = sad;
      sadnice.forEach(sadn => {
        if (sadn.id == parcela.idSad) {
          this.sadnica = sadn;
        }
      });
    })    
  }

  popuniPrazno(parcela) {
  //  this.sadniceM = this.servis.popuniPrazno(parcela);
    localStorage.setItem('ParcelaLog', parcela.id);
    let sadnice: Sadnica[] = [];
    let magacini: Magacin[] = [];
    this.servis.ucitajMagacine1().subscribe((mag) => {
      magacini = mag;
      magacini.forEach(maga => {
        if (maga.nazivRas == this.nazivRasadnika) {
          this.servis.ucitajSadnice1().subscribe((sad)=>{
            sadnice = sad;
            this.sadniceM = [];
            sadnice.forEach(sad=>{
              if(sad.lokacija == maga.naziv){
                this.sadniceM.push(sad);
              }
            })
          })
        }
      });
    })  
  }

  dodajPreparatS(sadnica) {
  //  this.preparatiM = this.servis.dodajPreparatS(sadnica);
  localStorage.setItem('sadnicaLog', sadnica.id);
  let preparati: Preparat[] = [];
  let magacini: Magacin[] = [];
  this.servis.ucitajMagacine1().subscribe((mag) => {
    magacini = mag;
    magacini.forEach(maga => {
      if (maga.nazivRas == this.nazivRasadnika) {
        this.servis.ucitajPreparate1().subscribe((prep)=>{
          preparati = prep;
          this.preparatiM = [];
          preparati.forEach(prepa=>{
            if(prepa.lokacija == maga.naziv){
              this.preparatiM.push(prepa);
            }
          })
        })
      }
    });
  })  

  }

  dodajPreparatSS(prep) {
    this.servis.dodajPreparatSS1(prep);
  }

  postaviSadnicu(sadnica) {
    this.servis.postaviSadnicu1(sadnica);
    //    location.reload();
  }

  presadiSadnicu(sadnica) {
    this.servis.presadiSadnicu1(sadnica);
    //  location.reload();
  }

  pristupiMagacinu() {
    this.servis.pristupMagacinu();
  }

  logOff(){
    this.servis.logOff();
  }



  povecajTemperaturu() {
    this.servis.povecajTemperaturu(this.nazivRasadnika);
    //    location.reload();
  }

  smanjiTemperaturu(rasadnik) {
    this.servis.smanjiTemperaturu(rasadnik);
    //   location.reload();
  }

  povecajVodu(rasadnik) {
    this.servis.povecajVodu(rasadnik);
    //   location.reload();
  }

  smanjiVodu(rasadnik) {
    this.servis.smanjiVodu(rasadnik);
    //   location.reload();
  }

  nazad(){
    window.history.back();
  }

}

function compare1( a, b ) {
  if ( a.id < b.id ){
    return -1;
  }
  if ( a.id > b.id ){
    return 1;
  }
  return 0;
}