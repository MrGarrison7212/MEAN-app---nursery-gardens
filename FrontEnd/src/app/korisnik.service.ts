import { Injectable } from '@angular/core';
import { POLJOPRIVREDNICI } from './data/POLJOPRIVREDNICI';
import { PREDUZECA } from './data/PREDUZECA';
import { ADMINI } from './data/ADMINI';
import { Router } from '@angular/router';
import { ZAHTEVIPOLJO } from './data/ZAHTEVIPOLJO';
import { ZAHTEVIPRED } from './data/ZAHTEVIPRED';
import { RASADNICI } from './data/RASADNICI';
import { Rasadnik } from './models/rasadnik';
import { RasadnikComponent } from './rasadnik/rasadnik.component';
import { MAGACINI } from './data/MAGACINI';
import { Magacin } from './models/magacin';
import { PREPARATI } from './data/PREPARATI';
import { SADNICE } from './data/SADNICE';
import { Preparat } from './models/preparat';
import { Sadnica } from './models/sadnica';
import { PARCELE } from './data/PARCELE';
import { Parcela } from './models/parcela';
import { Preduzece } from './models/preduzece';
import { Kurir } from './models/kurir';
import { KURIRI } from './data/KURIRI';
import { Observable, of } from 'rxjs';
import { NARUDZBINE } from './data/NARUDZBINE';
import { Narudzbina } from './models/narudzbina';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Poljoprivrednik } from './models/poljoprivrednik';
import { Admin } from './models/admin';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private router: Router, private http: HttpClient) { }

  ucitajZahtevePoljo() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    return this.http.get<any[]>('http://localhost:5000/ucitajZahtevePoljo', { headers: headers })
  }

  posaljiRegPoljo(username, password, ime, prezime, mestoRodjenja, datumRodjenja, kontaktTelefon, email) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let poljoprivred = {
      username: username,
      password: password,
      ime: ime,
      prezime: prezime,
      mestoRodjenja: mestoRodjenja,
      datumRodjenja: datumRodjenja,
      kontaktTelefon: kontaktTelefon,
      email: email
    }
    alert('Uspesno ste registrovali korisnika!');
    return this.http.post('http://localhost:5000/regZaPoljo', poljoprivred, { responseType: 'text' })
  }

  posaljiRegPred(username, password, naziv, datumOsnivanja, mesto, email) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let preduzece = {
      username: username,
      password: password,
      naziv: naziv,
      datumOsnivanja: datumOsnivanja,
      mesto: mesto,
      email: email
    }
    alert('Uspesno ste registrovali korisnika!');
    return this.http.post('http://localhost:5000/regZaPred', preduzece, { responseType: 'text' })
  }

  posaljiZahtevPoljo(username, password, ime, prezime, mestoRodjenja, datumRodjenja, kontaktTelefon, email) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let poljoprivred = {
      username: username,
      password: password,
      ime: ime,
      prezime: prezime,
      mestoRodjenja: mestoRodjenja,
      datumRodjenja: datumRodjenja,
      kontaktTelefon: kontaktTelefon,
      email: email
    }
    alert('Uspesno ste poslali zahtev za registraciju!');
    return this.http.post('http://localhost:5000/zahtevZaPoljo', poljoprivred, { responseType: 'text' })
  }

  posaljiZahtevPred(username, password, naziv, datumOsnivanja, mesto, email) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let preduzece = {
      username: username,
      password: password,
      naziv: naziv,
      datumOsnivanja: datumOsnivanja,
      mesto: mesto,
      email: email
    }
    alert('Uspesno ste poslali zahtev za registraciju!');
    return this.http.post('http://localhost:5000/zahtevZaPred', preduzece, { responseType: 'text' })
  }

  obrisiZahtevPoljo(username) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    const k = {
      username: username
    }

    return this.http.post('http://localhost:5000/obrisiZahtevPoljo', k, { responseType: 'text' })
  }

  obrisiZahtevPred(username) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    const k = {
      username: username
    }

    return this.http.post('http://localhost:5000/obrisiZahtevPred', k, { responseType: 'text' })
  }

  obrisiPoljoprivrednika1(username) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    const k = {
      username: username
    }

    return this.http.post('http://localhost:5000/obrisiPoljoprivrednika', k, { responseType: 'text' })
  }

  obrisiPreduzece1(username) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    const k = {
      username: username
    }

    return this.http.post('http://localhost:5000/obrisiPreduzece', k, { responseType: 'text' })
  }

  ucitajNarudzbine() {
    if (localStorage.getItem('narudzbine') == null) {
      localStorage.setItem('narudzbine', JSON.stringify(NARUDZBINE));
    }
  }

  dohvatiPreparateMag(naziv) {
    this.ucitajPreparate();
    let preparatiMagacina: Preparat[] = [];
    let preparati = JSON.parse(localStorage.getItem('preparati'));
    preparati.forEach(preparat => {
      if (preparat.lokacija == naziv) {
        preparatiMagacina.push(preparat);
      }
    });
    return preparatiMagacina;
  }

  dohvatiSadniceMag(naziv) {
    this.ucitajSadnice();
    let sadniceMagacina: Sadnica[] = [];
    let sadnice = JSON.parse(localStorage.getItem('sadnice'));
    sadnice.forEach(sadnica => {
      if (sadnica.lokacija == naziv) {
        sadniceMagacina.push(sadnica);
      }
    });
    return sadniceMagacina;
  }

  dohvatiSadniceP(preduzece) {
    this.ucitajSadnice();
    let sadnicePreduzeca: Sadnica[] = [];
    let sadnice = JSON.parse(localStorage.getItem('sadnice'));
    sadnice.forEach(sadnica => {
      if (sadnica.lokacija == preduzece.naziv && sadnica.naruceno == 0) {
        sadnicePreduzeca.push(sadnica);
      }
    });
    return sadnicePreduzeca;
  }

  dohvatiPreparateP(preduzece) {
    this.ucitajPreparate();
    let preparatiPreduzeca: Preparat[] = [];
    let preparati = JSON.parse(localStorage.getItem('preparati'));
    preparati.forEach(preparat => {
      if (preparat.lokacija == preduzece.naziv && preparat.naruceno == 0) {
        preparatiPreduzeca.push(preparat);
      }
    });
    return preparatiPreduzeca;
  }

  dohvatiNarudzbineP(preduzece) {
    this.ucitajNarudzbine();
    let narudzbineP: Narudzbina[] = [];
    let narudzbine = JSON.parse(localStorage.getItem('narudzbine'));
    narudzbine.forEach(narudzbina => {
      if (narudzbina.proizvodjac == preduzece.naziv && narudzbina.status == 'SPREMNA' || narudzbina.status == 'NA CEKANJU') {
        narudzbineP.push(narudzbina);
      }
    });
    return narudzbineP;
  }

  dohvatiNarudzbineMag(magacin) {
    this.ucitajNarudzbine();
    let narudzbineM: Narudzbina[] = [];
    let narudzbine = JSON.parse(localStorage.getItem('narudzbine'));
    narudzbine.forEach(narudzbina => {
      if (narudzbina.magacin == magacin && narudzbina.status == 'SPREMNA') {
        narudzbineM.push(narudzbina);
      }
    });
    return narudzbineM;
  }

  dodajSadnicuPage() {
    this.router.navigate(['/dodajSadnicu']);
  }

  dodajPreparatPage() {
    this.router.navigate(['/dodajPreparat']);
  }

  pregledPoslovanjaPage() {
    this.router.navigate(['/pregled30dana']);
  }

  dohvatiSadniceProd(naziv) {
    this.ucitajSadnice();
    let sadnicePreduzeca: Sadnica[] = [];
    let sadnice = JSON.parse(localStorage.getItem('sadnice'));
    sadnice.forEach(sadnica => {
      if (sadnica.lokacija == naziv && sadnica.naruceno == 0) {
        sadnicePreduzeca.push(sadnica);
      }
    });
    return sadnicePreduzeca;
  }

  dohvatiPreparateProd(naziv) {
    this.ucitajPreparate();
    let preparatiPreduzeca: Preparat[] = [];
    let preparati = JSON.parse(localStorage.getItem('preparati'));
    preparati.forEach(preparat => {
      if (preparat.lokacija == naziv && preparat.naruceno == 0) {
        preparatiPreduzeca.push(preparat);
      }
    });
    return preparatiPreduzeca;
  }

  ukloniSadnicu(sadnica) {
    let sadnice = JSON.parse(localStorage.getItem('sadnice'));
    sadnice.forEach((sad, index) => {
      if (sad.id == sadnica.id) {
        sadnice.splice(index, 1);
      }
    });
    localStorage.setItem('sadnice', JSON.stringify(sadnice));
    location.reload();
  }

  ukloniSadnicu1(sadnica) {
    this.ucitajSadnice1().subscribe((sad => {
      let sadnice: Sadnica[] = [];
      sadnice = sad;
      sadnice.forEach(sad => {
        if (sad.id == sadnica.id) {
          this.ukloniSadnicu11(sad.id).subscribe();
        }
      });
    }))
  }

  ukloniPreparat(preparat) {
    let preparati = JSON.parse(localStorage.getItem('preparati'));
    preparati.forEach((prep, index) => {
      if (prep.id == preparat.id) {
        preparati.splice(index, 1);
      }
    });
    localStorage.setItem('preparati', JSON.stringify(preparati));
    location.reload();
  }

  prihvatiNarudzbinu(narudzbina) {
    let message: string = 'Svi kuriri su treutno zauzeti, sacekajte!';
    let narudzbine = JSON.parse(localStorage.getItem('narudzbine'));
    let kuriri = JSON.parse(localStorage.getItem('kuriri'));
    let sadnice = JSON.parse(localStorage.getItem('sadnice'));
    let preparati = JSON.parse(localStorage.getItem('preparati'));
    //    narudzbine.forEach(nar => {
    //      if(nar.id == narudzbina.id){
    //        nar.status = 'ISPORUKA U TOKU';
    //      }
    //    });
    narudzbine.forEach(naru => {
      if (naru.id == narudzbina.id) {
        naru.status = 'NA CEKANJU';
      }
      localStorage.setItem('narudzbine', JSON.stringify(narudzbine));
    });
    for (let kurir of kuriri) {
      if (kurir.nazivPreduzeca == narudzbina.proizvodjac && kurir.zauzet == 0) {
        message = 'Prihvaceno!';
        kurir.zauzet = 1;
        kurir.idNar = narudzbina.id;
        localStorage.setItem('kuriri', JSON.stringify(kuriri));
        narudzbine.forEach(nar => {
          if (nar.id == narudzbina.id) {
            nar.status = 'CEKA ISPORUKU';
            localStorage.setItem('narudzbine', JSON.stringify(narudzbine));
          }
        });
/**         setTimeout(() => {    //<<<---    using ()=> syntax
          if (narudzbina.vrsta == 0) {
            sadnice.forEach(sadnica => {
              narudzbina.proizvodi.forEach(proizvod => {
                if (sadnica.id == proizvod) {
                  sadnica.naruceno = 0;
                  sadnica.lokacija = narudzbina.magacin;
                }
              });
            });
            localStorage.setItem('sadnice', JSON.stringify(sadnice));
          }
          else {
            preparati.forEach(preparat => {
              narudzbina.proizvodi.forEach(proizvod => {
                if (preparat.id == proizvod) {
                  preparat.naruceno = 0;
                  preparat.lokacija = narudzbina.magacin;
                }
              });
            });
            localStorage.setItem('preparati', JSON.stringify(preparati));
          }
          narudzbine.forEach(nar => {
            if (nar.id == narudzbina.id) {
              nar.status = 'ISPORUCENA I AZURIRANA';
              localStorage.setItem('narudzbine', JSON.stringify(narudzbine));
            }
          });
          kuriri.forEach(kurir => {
            if (kurir.idNar == narudzbina.id && kurir.nazivPreduzeca == narudzbina.proizvodjac) {
              kurir.idNar = 0;
              kurir.zauzet = 0;
              localStorage.setItem('kuriri', JSON.stringify(kuriri));
            }
          });
        }, 20000)
*/        break;
      }
    }
    return message;
  }
  /**    setTimeout(() => {    //<<<---    using ()=> syntax
        if (narudzbina.vrsta == 0) {
          sadnice.forEach(sadnica => {
            narudzbina.proizvodi.forEach(proizvod => {
              if (sadnica.id == proizvod) {
                sadnica.naruceno = 0;
                sadnica.lokacija = narudzbina.magacin;
              }
            });
          });
          localStorage.setItem('sadnice', JSON.stringify(sadnice));
        }
        else {
          preparati.forEach(preparat => {
            narudzbina.proizvodi.forEach(proizvod => {
              if (preparat.id == proizvod) {
                preparat.naruceno = 0;
                preparat.lokacija = narudzbina.magacin;
              }
            });
          });
          localStorage.setItem('preparati', JSON.stringify(preparati));
        }
        narudzbine.forEach(nar => {
          if (nar.id == narudzbina.id) {
            nar.status = 'ISPORUCENA I AZURIRANA';
            localStorage.setItem('narudzbine', JSON.stringify(narudzbine));
          }
        });
        kuriri.forEach(kurir => {
          if(kurir.idNar == narudzbina.id && kurir.nazivPreduzeca == narudzbina.proizvodjac){
            kurir.idNar = 0;
            kurir.naruceno = 0;
            localStorage.setItem('kuriri', JSON.stringify(kuriri));
          }
        });
          }, 20000)   
    */

  prihvatiNarudzbinu1(narudzbina) {
    this.ucitajNarudzbine1().subscribe((narudzb) => {
      this.ucitajKurire1().subscribe((kur1) => {
        let tacno = true;
        let kuriri: Kurir[] = [];
        let narudzbine: Narudzbina[] = [];
        kuriri = kur1;
        narudzbine = narudzb;
        narudzbine.forEach(naru => {
          if (naru.id == narudzbina.id) {
            naru.status = 'NA CEKANJU';
            this.prihvatiNarudzbinu11Narudzbina(naru.id, naru.status).subscribe();
          }
        });
        for (let kurir of kuriri) {
          if (kurir.nazivPreduzeca == narudzbina.proizvodjac && kurir.zauzet == 0) {
            tacno = false;
            alert('Prihvaceno!');
            kurir.zauzet = 1;
            kurir.idNar = narudzbina.id;
            this.prihvatiNarudzbinu11Kurir(kurir.id, kurir.nazivPreduzeca, kurir.zauzet, narudzbina.id).subscribe();
            narudzbine.forEach(nar => {
              if (nar.id == narudzbina.id) {
                nar.status = 'CEKA ISPORUKU';
                this.prihvatiNarudzbinu11Narudzbina(nar.id, nar.status).subscribe();
              }
            });
            break;
          }
        }
        if(tacno){
          alert('Svi kuriri su treutno zauzeti, sacekajte!');
        }
      })
    })
  }

  zapocniIsporuku() {
    let narudzbine = JSON.parse(localStorage.getItem('narudzbine'));
    let kuriri = JSON.parse(localStorage.getItem('kuriri'));
    let sadnice = JSON.parse(localStorage.getItem('sadnice'));
    let preparati = JSON.parse(localStorage.getItem('preparati'));
    narudzbine.forEach(nar => {
      if (nar.status == 'CEKA ISPORUKU') {
        nar.status = 'ISPORUKA U TOKU';
        localStorage.setItem('narudzbine', JSON.stringify(narudzbine));
      }
    });
    narudzbine.forEach(narudzbina => {
      if (narudzbina.status == 'ISPORUKA U TOKU') {
        setTimeout(() => {    //<<<---    using ()=> syntax
          if (narudzbina.vrsta == 0) {
            sadnice.forEach(sadnica => {
              narudzbina.proizvodi.forEach(proizvod => {
                if (sadnica.id == proizvod) {
                  sadnica.naruceno = 0;
                  sadnica.lokacija = narudzbina.magacin;
                }
              });
            });
            localStorage.setItem('sadnice', JSON.stringify(sadnice));
          }
          else {
            preparati.forEach(preparat => {
              narudzbina.proizvodi.forEach(proizvod => {
                if (preparat.id == proizvod) {
                  preparat.naruceno = 0;
                  preparat.lokacija = narudzbina.magacin;
                }
              });
            });
            localStorage.setItem('preparati', JSON.stringify(preparati));
          }
          narudzbine.forEach(nar => {
            if (nar.id == narudzbina.id) {
              nar.status = 'ISPORUCENA I AZURIRANA';
              localStorage.setItem('narudzbine', JSON.stringify(narudzbine));
            }
          });
          kuriri.forEach(kurir => {
            if (kurir.idNar == narudzbina.id && kurir.nazivPreduzeca == narudzbina.proizvodjac) {
              kurir.idNar = 0;
              kurir.zauzet = 0;
              localStorage.setItem('kuriri', JSON.stringify(kuriri));
            }
          });
        }, 20000)
      }
    });
  }


  zapocniIsporuku1() {
    this.ucitajNarudzbine1().subscribe((naru=>{
      this.ucitajKurire1().subscribe((kuri=>{
        this.ucitajSadnice1().subscribe((sadn=>{
          this.ucitajPreparate1().subscribe((prep=>{
            let narudzbine: Narudzbina[]=[];
            let kuriri: Kurir[]=[];
            let sadnice: Sadnica[]=[];
            let preparati: Preparat[]=[];
            narudzbine = naru;
            kuriri = kuri;
            sadnice = sadn;
            preparati = prep;
            narudzbine.forEach(nar => {
              if (nar.status == 'CEKA ISPORUKU') {
                nar.status = 'ISPORUKA U TOKU';
                this.isporukaUToku(nar.id, nar.status).subscribe();
              }
            });
            narudzbine.forEach(narudzbina=>{
              if(narudzbina.status == 'ISPORUKA U TOKU'){
                setTimeout(() => {    //<<<---    using ()=> syntax
                  if (narudzbina.vrsta == 0) {
                    sadnice.forEach(sadnica => {
                      narudzbina.proizvodi.forEach(proizvod => {
                        if (sadnica.id == proizvod) {
                          sadnica.naruceno = 0;
                          sadnica.lokacija = narudzbina.magacin;
                          this.isporukaSadnica(sadnica.id, sadnica.naruceno, sadnica.lokacija).subscribe();
                        }
                      });
                    });
                  }
                  else {
                    preparati.forEach(preparat => {
                      narudzbina.proizvodi.forEach(proizvod => {
                        if (preparat.id == proizvod) {
                          preparat.naruceno = 0;
                          preparat.lokacija = narudzbina.magacin;
                          this.isporukaPreparata(preparat.id, preparat.naruceno, preparat.lokacija).subscribe();
                        }
                      });
                    });
                  }
                  narudzbine.forEach(nar => {
                    if (nar.id == narudzbina.id) {
                      nar.status = 'ISPORUCENA I AZURIRANA';
                      this.isporukaNarudzbina(nar.id, nar.status).subscribe();
                    }
                  });
                  kuriri.forEach(kurir => {
                    if (kurir.idNar == narudzbina.id && kurir.nazivPreduzeca == narudzbina.proizvodjac) {
                      kurir.idNar = 0;
                      kurir.zauzet = 0;
                      this.isporukaKurir(kurir.id, kurir.idNar, kurir.zauzet).subscribe();
                    }
                  });
                }, 180000)
              }
              
            })
          }))
        }))
      }))
    }))
  }

  odbijNarudzbinu(narudzbina) {
    let preparati = JSON.parse(localStorage.getItem('preparati'));
    let sadnice = JSON.parse(localStorage.getItem('sadnice'));
    let narudzbine = JSON.parse(localStorage.getItem('narudzbine'));
    let kuriri = JSON.parse(localStorage.getItem('kuriri'));
    if (narudzbina.vrsta == 0) {
      sadnice.forEach(sadnica => {
        narudzbina.proizvodi.forEach(proizvod => {
          if (sadnica.id == proizvod) {
            sadnica.naruceno = 0;
          }
        });
      });
      localStorage.setItem('sadnice', JSON.stringify(sadnice));
    }
    else {
      preparati.forEach(preparat => {
        narudzbina.proizvodi.forEach(proizvod => {
          if (preparat.id == proizvod) {
            preparat.naruceno = 0;
          }
        });
      });
      localStorage.setItem('preparati', JSON.stringify(preparati));
    }
    narudzbine.forEach((nar, index) => {
      if (nar.id == narudzbina.id) {
        narudzbine.splice(index, 1);
        localStorage.setItem('narudzbine', JSON.stringify(narudzbine));
      }
    });
    kuriri.forEach(kurir => {
      if (kurir.idNar == narudzbina.id && kurir.nazivPreduzeca == narudzbina.proizvodjac) {
        kurir.idNar = 0;
        kurir.naruceno = 0;
        localStorage.setItem('kuriri', JSON.stringify(kuriri));
      }
    });
  }

  odbijNarudzbinu1(narudzbina) {
    this.ucitajNarudzbine1().subscribe((naru) => {
      this.ucitajKurire1().subscribe((kur) => {
        this.ucitajPreparate1().subscribe((prep) => {
          this.ucitajSadnice1().subscribe((sad) => {
            let preparati: Preparat[] = [];
            let sadnice: Sadnica[] = [];
            let narudzbine: Narudzbina[] = [];
            let kuriri: Kurir[] = [];
            preparati = prep;
            sadnice = sad;
            narudzbine = naru;
            kuriri = kur;
            if (narudzbina.vrsta == 0) {
              sadnice.forEach(sadnica => {
                narudzbina.proizvodi.forEach(proizvod => {
                  if (sadnica.id == proizvod) {
                    sadnica.naruceno = 0;
                    this.odbijSadnica(sadnica.id).subscribe();
                  }
                });
              });
            }
            else {
              preparati.forEach(preparat => {
                narudzbina.proizvodi.forEach(proizvod => {
                  if (preparat.id == proizvod) {
                    preparat.naruceno = 0;
                    this.odbijPreparat(preparat.id).subscribe();
                  }
                });
              });
            }
            narudzbine.forEach(nar => {
              if (nar.id == narudzbina.id) {
                this.obrisiNarudzbinu(nar.id).subscribe();
              }
            });
            kuriri.forEach(kurir => {
              if (kurir.idNar == narudzbina.id && kurir.nazivPreduzeca == narudzbina.proizvodjac) {
                kurir.idNar = 0;
                kurir.zauzet = 0;
                this.odbijKurir(kurir.id).subscribe();
              }
            });
          })
        })
      })
    })
  }


  ucitajMagacine() {
    if (localStorage.getItem('magacini') == null) {
      localStorage.setItem('magacini', JSON.stringify(MAGACINI));
    }
  }

  ucitajMagacine1() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    return this.http.get<any[]>('http://localhost:5000/ucitajMagacine', { headers: headers })
  }

  ucitajKurire() {
    if (localStorage.getItem('kuriri') == null) {
      localStorage.setItem('kuriri', JSON.stringify(KURIRI));
    }
  }

  ucitajKurire1() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    return this.http.get<any[]>('http://localhost:5000/ucitajKurire', { headers: headers })
  }

  ucitajParcele() {
    if (localStorage.getItem('parcele') == null) {
      localStorage.setItem('parcele', JSON.stringify(PARCELE));
    }
  }


  ucitajRasadnike() {
    if (localStorage.getItem('rasadnici') == null) {
      localStorage.setItem('rasadnici', JSON.stringify(RASADNICI));
    }
  }

  azurirajTemperaturu(naziv, temperatura) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    const k = {
      naziv: naziv,
      temperatura: temperatura
    }

    return this.http.post('http://localhost:5000/azurirajTemperaturu', k, { responseType: 'text' })
  }

  azurirajVodu(naziv, voda) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    const k = {
      naziv: naziv,
      voda: voda
    }

    return this.http.post('http://localhost:5000/azurirajVodu', k, { responseType: 'text' })
  }

  azurirajParcele3(nazivRas, id, idSad) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    const k = {
      nazivRas: nazivRas,
      id: id,
      idSad: idSad
    }

    return this.http.post('http://localhost:5000/azurirajParcele', k, { responseType: 'text' })
  }

  ucitajRasadnike1() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    return this.http.get<any[]>('http://localhost:5000/ucitajRasadnike', { headers: headers })
  }

  ucitajParcele1() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    return this.http.get<any[]>('http://localhost:5000/ucitajParcele', { headers: headers })
  }

  ucitajSadnice1() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    return this.http.get<any[]>('http://localhost:5000/ucitajSadnice', { headers: headers })
  }

  ucitajPreparate1() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    return this.http.get<any[]>('http://localhost:5000/ucitajPreparate', { headers: headers })
  }

  ucitajNarudzbine1() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    return this.http.get<any[]>('http://localhost:5000/ucitajNarudzbine', { headers: headers })
  }



  ucitajRasadnikeVlasnika() {
    let rasadniciVlasnika: Rasadnik[] = [];
    let rasadnici: Rasadnik[] = [];
    let vlasnik = localStorage.getItem('loggedInUser');
    this.ucitajRasadnike1().subscribe((rasa) => {
      rasadnici = rasa;
      rasadnici.forEach(rasadnik => {
        if (rasadnik.usernameVlasnika == vlasnik) {
          rasadniciVlasnika.push(rasadnik);
        }
      });
    })
    return rasadniciVlasnika;
  }

  proveriTempIVodu() {
    let rasadniciOdrzavanje: Rasadnik[] = [];
    let vlasnik = localStorage.getItem('loggedInUser');
    let rasadnici = JSON.parse(localStorage.getItem('rasadnici'));
    rasadnici.forEach(rasadnik => {
      if (rasadnik.usernameVlasnika == vlasnik && rasadnik.temperatura < 12 || rasadnik.voda < 75) {
        rasadniciOdrzavanje.push(rasadnik);
      }
    });
    return rasadniciOdrzavanje;
  }

  povecajTemperaturu(rasadnik) {
    let rasadnici: Rasadnik[] = [];
    this.ucitajRasadnike1().subscribe((rasadnici1) => {
      rasadnici = rasadnici1;
      rasadnici.forEach(rasad => {
        if (rasad.naziv == rasadnik) {
          this.azurirajTemperaturu(rasadnik, parseInt(rasad.temperatura.toString()) + 1).subscribe();
        }
      });
    })
  }

  smanjiTemperaturu(rasadnik) {
    let rasadnici: Rasadnik[] = [];
    this.ucitajRasadnike1().subscribe((rasadnici1) => {
      rasadnici = rasadnici1;
      rasadnici.forEach(rasad => {
        if (rasad.naziv == rasadnik.naziv) {
          this.azurirajTemperaturu(rasadnik.naziv, parseInt(rasad.temperatura.toString()) - 1).subscribe();
        }
      });
    })
  }

  povecajVodu(rasadnik) {
    let rasadnici: Rasadnik[] = [];
    this.ucitajRasadnike1().subscribe((rasadnici1) => {
      rasadnici = rasadnici1;
      rasadnici.forEach(rasad => {
        if (rasad.naziv == rasadnik.naziv) {
          this.azurirajVodu(rasadnik.naziv, parseInt(rasad.voda.toString()) + 1).subscribe();
        }
      });
    })
  }

  smanjiVodu(rasadnik) {
    let rasadnici: Rasadnik[] = [];
    this.ucitajRasadnike1().subscribe((rasadnici1) => {
      rasadnici = rasadnici1;
      rasadnici.forEach(rasad => {
        if (rasad.naziv == rasadnik.naziv) {
          this.azurirajVodu(rasadnik.naziv, parseInt(rasad.voda.toString()) - 1).subscribe();
        }
      });
    })
  }

  zapocniProgres() {
    this.ucitajRasadnike();
    this.ucitajSadnice();
    this.ucitajPreparate();
    //    let rasadnici = JSON.parse(localStorage.getItem('rasadnici'));
    //    let sadnice = JSON.parse(localStorage.getItem('sadnice'));
    //    let preparati = JSON.parse(localStorage.getItem('preparati'));
    setInterval(() => {
      let rasadnici = JSON.parse(localStorage.getItem('rasadnici'));
      let sadnice = JSON.parse(localStorage.getItem('sadnice'));
      let preparati = JSON.parse(localStorage.getItem('preparati'));
      rasadnici.forEach(rasadnik => {
        rasadnik.temperatura = rasadnik.temperatura - 0.5;
        rasadnik.voda = rasadnik.voda - 1;
      });
      localStorage.setItem('rasadnici', JSON.stringify(rasadnici));
      sadnice.forEach(sadnica => {
        if (sadnica.zasadjena == 1) {
          if (sadnica.prepa == 0) {
            sadnica.progres += 1;
          }
          else {
            preparati.forEach(preparat => {
              if (preparat.lokacija == sadnica.id) {
                sadnica.progres += preparat.progres + 1;
              }

            });
          }
        }
      });
      localStorage.setItem('sadnice', JSON.stringify(sadnice));
    }, 10000);
    /**    this.ucitajRasadnike();
        this.ucitajSadnice();
        this.ucitajPreparate();
    //    let rasadnici = JSON.parse(localStorage.getItem('rasadnici'));
    //    let sadnice = JSON.parse(localStorage.getItem('sadnice'));
    //    let preparati = JSON.parse(localStorage.getItem('preparati'));
    //    rasadnici.forEach(rasadnik => {
    
          setInterval(() => {
              let rasadnici = JSON.parse(localStorage.getItem('rasadnici'));
              rasadnici.forEach(rasadnik => {
                rasadnik.temperatura = rasadnik.temperatura - 0.5;
                rasadnik.voda = rasadnik.voda - 1;
              });
              localStorage.setItem('rasadnici', JSON.stringify(rasadnici)); 
            }, 10000);
    //          rasadnik.temperatura = rasadnik.temperatura - 0.5;
    //          rasadnik.voda = rasadnik.voda - 1;
    //          localStorage.setItem('rasadnici', JSON.stringify(rasadnici)); 
    //          }, 10000);
    //    });
        setInterval(() => {
          let sadnice = JSON.parse(localStorage.getItem('sadnice'));
          let preparati = JSON.parse(localStorage.getItem('preparati'));
          sadnice.forEach(sadnica => {
            if(sadnica.zasadjena == 1){
              if(sadnica.prepa == 0){
                sadnica.progres += 1;
              }
              else{
                preparati.forEach(preparat => {
                  if(preparat.lokacija == sadnica. id){
                      sadnica.progres += preparat.progres + 1;
                    }
                  
                });
              }
            }
          });
          localStorage.setItem('sadnice', JSON.stringify(sadnice)); 
          }, 10000);
    //    sadnice.forEach(sadnica => {
    //      if(sadnica.zasadjena == 1){
    //        if(sadnica.prepa==0){
    //          setInterval(() => {
    //            sadnica.progres += 1;
    //            localStorage.setItem('sadnice', JSON.stringify(sadnice)); 
    //            }, 10000);
    //        }
    //        if(sadnica.prepa == 1){
    //          preparati.forEach(preparat => {
    //            if(preparat.lokacija == sadnica.id){
    //              setInterval(() => {
    //                sadnica.progres += 1 + preparat.progres;
    //              });
    //              localStorage.setItem('sadnica', JSON.stringify(sadnice));
    //            }
    //          }, 10000);
    //        }
    //        setInterval(() => {
    //          if(sadnica.prepa == 0){
    //            sadnica.progres += 1;
    //          }
    //          else{
    //            preparati.forEach(preparat => {
    //             if(preparat.lokacija == sadnica.id){
    //                sadnica.progres += preparat.progres + 1;    
    //              }
    //            });
    //          }
    //          localStorage.setItem('sadnice', JSON.stringify(sadnice)); 
    //          }, 10000);
    //      }
     //   });
    
     */
  }

  zapocniProgres1(){
    setInterval(() => {
      this.ucitajRasadnike1().subscribe((ras=>{
        this.ucitajSadnice1().subscribe((sad=>{
          this.ucitajPreparate1().subscribe((prep=>{
            let rasadnici:Rasadnik[] = [];
            let sadnice:Sadnica[] = [];
            let preparati:Preparat[] = [];
            rasadnici = ras;
            sadnice = sad;
            preparati = prep;
            rasadnici.forEach(rasadnik => {
              rasadnik.temperatura = rasadnik.temperatura - 0.5;
              rasadnik.voda = rasadnik.voda - 1;
              this.zapocniProgresRas(rasadnik.naziv, rasadnik.temperatura, rasadnik.voda).subscribe();
            });
            sadnice.forEach(sadnica => {
              if (sadnica.zasadjena == 1) {
                if (sadnica.prepa == 0) {
                  sadnica.progres += 1;
                  this.zapocniProgresSad(sadnica.id, sadnica.progres).subscribe();
                }
                else {
                  preparati.forEach(preparat => {
                    if(parseInt(preparat.lokacija) == sadnica.id) {
                      sadnica.progres += parseInt(preparat.progres.toString()) + 1;
                      this.zapocniProgresSad(sadnica.id, sadnica.progres).subscribe();
                    }      
                  });
                }
              }
            });
          }))
        }))
      }))
    }, 120000);
  }

  ucitajPreduzece(username) {
    let preduzece: Preduzece;
    let preduzeca = JSON.parse(localStorage.getItem('preduzeca'));
    preduzeca.forEach(pred => {
      if (pred.username == username) {
        preduzece = pred;
      }
    });
    return preduzece;
  }

  ucitajPreduzecePoNazivu(naziv) {
    let preduzece: Preduzece;
    let preduzeca = JSON.parse(localStorage.getItem('preduzeca'));
    preduzeca.forEach(pred => {
      if (pred.naziv == naziv) {
        preduzece = pred;
      }
    });
    return preduzece;
  }

  ucitajRasadnik(naziv) {
    this.ucitajRasadnike();
    let rasadnik: Rasadnik;
    let rasadnici = JSON.parse(localStorage.getItem('rasadnici'));
    rasadnici.forEach(rasad => {
      if (rasad.naziv == naziv) {
        rasadnik = rasad;
      }
    });
    return rasadnik;
  }

  ucitajMagacin(naziv) {
    this.ucitajRasadnike();
    let magacin: Magacin;
    let magacini = JSON.parse(localStorage.getItem('magacini'));
    magacini.forEach(maga => {
      if (maga.naziv == naziv) {
        magacin = maga;
      }
    });
    return magacin;
  }

  ucitajPreparate() {
    if (localStorage.getItem('preparati') == null) {
      localStorage.setItem('preparati', JSON.stringify(PREPARATI));
    }
  }

  ucitajSadnice() {
    if (localStorage.getItem('sadnice') == null) {
      localStorage.setItem('sadnice', JSON.stringify(SADNICE));
    }
  }

  ucitajZahtevePred() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    return this.http.get<any[]>('http://localhost:5000/ucitajZahtevePred', { headers: headers })
  }

  ucitajPoljoprivrednike() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    return this.http.get<any[]>('http://localhost:5000/ucitajPoljoprivrednike', { headers: headers })
  }

  ucitajPreduzeca() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    return this.http.get<any[]>('http://localhost:5000/ucitajPreduzeca', { headers: headers })
  }

  ucitajAdmine() {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    return this.http.get('http://localhost:5000/ucitajAdmine', { headers: headers })
  }

  login(username, password, message) {
    let poljoprivrednici: any = [];
    message = '';
    if (username == '' || username == null || password == '' || password == null) {
      message = 'Morate popuniti sva polja!'
    }
    else {
      this.ucitajPoljoprivrednike().subscribe((poljo) => {
        poljoprivrednici = poljo;

        poljoprivrednici.forEach(poljoprivrednik => {
          if (poljoprivrednik.username == username && poljoprivrednik.password == password) {
            localStorage.setItem('loggedInUser', poljoprivrednik.username);
            this.router.navigate(['/poljoprivrednik']);
          }
          else {
            message = 'Pogresni kredencijali!'
            //            alert('Pogresni kredencijali!');
          }
        });
      })
      let preduzeca: any = [];
      this.ucitajPreduzeca().subscribe((pred) => {
        preduzeca = pred;

        preduzeca.forEach(preduzece => {
          if (preduzece.username == username && preduzece.password == password) {
            localStorage.setItem('loggedInUser', preduzece.username);
            this.router.navigate(['/preduzece']);
          }
          else {
            message = 'Pogresni kredencijali!'
            //             alert('Pogresni kredencijali!');
          }
        });
      })
      let admini: any = [];
      this.ucitajAdmine().subscribe((admin) => {
        admini = admin;
        admini.forEach(admin => {
          if (admin.username == username && admin.password == password) {
            localStorage.setItem('loggedInUser', admin.username);
            this.router.navigate(['/admin']);
          }
          else {
            message = 'Pogresni kredencijali!'
            //              alert('Pogresni kredencijali!');
          }
        });
      })
      //     message = 'Pogresni kredencijali!';
    }
    return message;
  }

  login2(username, password, message) {
    let poljoprivrednici: Poljoprivrednik[] = [];
    let preduzeca: Preduzece[] = [];
    let admini: any = [];

    message = '';
    if (this.emptyField(username) || this.emptyField(password)) {
      message = 'Morate popuniti sva polja!';
      return
    }
    this.ucitajAdmine().subscribe((admin) => {
      admini = admin;
      this.ucitajPreduzeca().subscribe((pred) => {
        preduzeca = pred;
        this.ucitajPoljoprivrednike().subscribe((poljo) => {
          poljoprivrednici = poljo;
          if (username == '' || username == null || password == '' || password == null) {
            message = 'Morate popuniti sva polja!';

          }
          else {
            let p1: boolean = true;
            let p2: boolean = true;
            let p3: boolean = true;

            admini.forEach(admin => {
              if (admin.username == username && admin.password == password) {
                p3 = false;
                localStorage.setItem('loggedInUser', admin.username);
                this.router.navigate(['/admin']);
              }
            });

            preduzeca.forEach(preduzece => {
              if (preduzece.username == username && preduzece.password == password) {
                p2 = false;
                localStorage.setItem('loggedInUser', preduzece.username);
                this.router.navigate(['/preduzece']);
              }
            });       

            poljoprivrednici.forEach(poljoprivrednik => {
              if (poljoprivrednik.username == username && poljoprivrednik.password == password) {
                p1 = false;
                localStorage.setItem('loggedInUser', poljoprivrednik.username);
                this.router.navigate(['/poljoprivrednik']);
              }
            }); 
            if(p3){
              if(p2){
                if(p1){
                  alert('Pogresni kredencijali!');
                }
              }
            }
          }
        })
      })
    })
    return message;
  }

  register1(username, password, ime, prezime, mestoRodjenja, datumRodjenja, kontaktTelefon, email) {
    let preduzeca = JSON.parse(localStorage.getItem('preduzeca'));
    let poljoprivrednici = JSON.parse(localStorage.getItem('poljoprivrednici'));
    let uspesnaRegistracija = true;
    preduzeca.forEach(preduzece => {
      poljoprivrednici.forEach(poljoprivrednik => {
        if (poljoprivrednik.username == username || preduzece.username == username) {
          uspesnaRegistracija = false;
          return uspesnaRegistracija;
        }
      });
    });
    if (uspesnaRegistracija) {
      let poljoprivrednik = {
        username: username,
        password: password,
        ime: ime,
        prezime: prezime,
        mestoRodjenja: mestoRodjenja,
        datumRodjenja: datumRodjenja,
        kontaktTelefon: kontaktTelefon,
        email: email
      }
      poljoprivrednici.push(poljoprivrednik);
      localStorage.setItem('poljoprivrednici', JSON.stringify(poljoprivrednici));
      return uspesnaRegistracija;
    }
  }

  register2(username, password, naziv, datumOsnivanja, mesto, email) {
    let poljoprivrednici = JSON.parse(localStorage.getItem('poljoprivrednici'));
    let preduzeca = JSON.parse(localStorage.getItem('preduzeca'));
    let uspesnaRegistracija = true;
    poljoprivrednici.forEach(poljoprivrednik => {


      preduzeca.forEach(preduzece => {
        if (preduzece.username == username || poljoprivrednik.username == username) {
          uspesnaRegistracija = false;
          return uspesnaRegistracija;
        }
      });
    });
    if (uspesnaRegistracija) {
      let preduzece = {
        username: username,
        password: password,
        naziv: naziv,
        datumOsnivanja: datumOsnivanja,
        mesto: mesto,
        email: email
      }
      preduzeca.push(preduzece);
      localStorage.setItem('preduzeca', JSON.stringify(preduzeca));
      return uspesnaRegistracija;
    }
  }

  dodajMagacin(nazivMagacina, nazivRas) {
    let magacini = JSON.parse(localStorage.getItem('magacini'));
    let uspesno = true;
    magacini.forEach(magacin => {
      if (magacin.naziv == nazivMagacina) {
        uspesno = false;
        return uspesno;
      }
    });
    if (uspesno) {
      let magacin = {
        naziv: nazivMagacina,
        nazivRas: nazivRas
      }
      magacini.push(magacin);
      localStorage.setItem('magacini', JSON.stringify(magacini));
      return uspesno;
    }
  }

  dodajMagacin1(nazivMagacina, nazivRas) {
    this.ucitajMagacine1().subscribe((mag => {
      let magacini: Magacin[] = [];
      let tacno = true;
      magacini = mag;
      magacini.forEach(magacin => {
        if (magacin.naziv == nazivMagacina) {
          tacno = false;
          alert('Postoji magacin sa datim imenom!');
        }
      });
      if (tacno) {
        alert("Magacin ce biti dodat!");
        this.dodajMagacin11(nazivMagacina, nazivRas).subscribe();
      }
    }))
  }


  dodajRasadnik(usernameVlasnika, naziv, mesto,
    sirina, duzina) {
    let rasadnici = JSON.parse(localStorage.getItem('rasadnici'));
    let uspesno = true;
    rasadnici.forEach(rasadnik => {
      if (rasadnik.naziv == naziv) {
        uspesno = false;
        return uspesno;
      }
    });
    if (uspesno) {
      let rasadnik = {
        usernameVlasnika: usernameVlasnika,
        naziv: naziv,
        mesto: mesto,
        sirina: sirina,
        duzina: duzina,
        sadnice: 0,
        sadniceMax: sirina * duzina,
        temperatura: 18,
        voda: 200
      }
      rasadnici.push(rasadnik);
      localStorage.setItem('rasadnici', JSON.stringify(rasadnici));
      this.napraviParcele(naziv, sirina, duzina);
      return uspesno;
    }
  }

  dodajRasadnik1(usernameVlasnika, naziv, mesto,
    sirina, duzina) {
    this.ucitajRasadnike1().subscribe(ras => {
      let rasadnici: Rasadnik[] = [];
      let tacno = true;
      rasadnici = ras;
      rasadnici.forEach(rasad => {
        if (rasad.naziv == naziv) {
          tacno = false;
          alert('Postoji vec rasadnik sa tim nazivom!');
        }
      })
      if (tacno) {
        alert("Rasadnik ce biti dodat!");
        let rasadnik = {
          usernameVlasnika: usernameVlasnika,
          naziv: naziv,
          mesto: mesto,
          sirina: sirina,
          duzina: duzina,
          sadnice: 0,
          sadniceMax: sirina * duzina,
          temperatura: 18,
          voda: 200
        }
        this.napraviParcele1(naziv, sirina, duzina);
        this.dodajRasadnik11(usernameVlasnika, naziv, mesto,
          sirina, duzina).subscribe();
      }
    })
  }

  dodajSadnicu(proizvodjac, naziv, cena) {
    let sadnice = JSON.parse(localStorage.getItem('sadnice'));
    let sadnica = {
      id: sadnice.length + 1,
      proizvodjac: proizvodjac.naziv,
      naziv: naziv,
      lokacija: proizvodjac.naziv,
      zasadjena: 0,
      mestoURasadniku: 0,
      progres: 0,
      cena: cena,
      naruceno: 0,
      prepa: 0
    }
    sadnice.push(sadnica);
    localStorage.setItem('sadnice', JSON.stringify(sadnice));
  }

  dodajSadnicu1(proizvodjac, naziv, cena) {
    let sadnice: Sadnica[] = [];
    let tacno = true;
    this.ucitajSadnice1().subscribe((sad => {
      sadnice = sad;
      if (tacno) {
        let id = sadnice.length + 1;
        let proizvodjac1 = proizvodjac.naziv;
        let naziv1 = naziv;
        let lokacija = proizvodjac.naziv;
        let zasadjena = 0;
        let mestoURasadniku = 0;
        let progres = 0;
        let cena1 = cena;
        let naruceno = 0;
        let prepa = 0;
        this.dodajSadnicu11(id, proizvodjac1, naziv1, lokacija, zasadjena, mestoURasadniku, progres, cena1, naruceno, prepa).subscribe();
      }
    }))
  }

  dodajPreparat(proizvodjac, naziv, cena, progres) {
    let preparati = JSON.parse(localStorage.getItem('preparati'));
    let preparat = {
      id: preparati.length + 1,
      proizvodjac: proizvodjac.naziv,
      naziv: naziv,
      lokacija: proizvodjac.naziv,
      cena: cena,
      progres: progres,
      naruceno: 0
    }
    preparati.push(preparat);
    localStorage.setItem('preparati', JSON.stringify(preparati));
  }

  dodajPreparat1(proizvodjac, naziv, cena, progres) {
    let preparati: Preparat[] = [];
    let tacno = true;
    this.ucitajPreparate1().subscribe((prep => {
      preparati = prep;
      if (tacno) {
        let id = preparati.length + 1;
        let proizvodjac1 = proizvodjac.naziv;
        let naziv1 = naziv;
        let lokacija = proizvodjac.naziv;
        let cena1 = cena;
        let progres1 = progres;
        let naruceno = 0;
        this.dodajPreparat11(id, proizvodjac1, naziv1, lokacija, progres1, cena1, naruceno).subscribe();
      }
    }))
  }

  dohvatiProizvodjaca(user) {
    let preduzeca = JSON.parse(localStorage.getItem('preduzeca'));
    return preduzeca.filter(preduzece =>
      preduzece.username == user)[0];
  }

  zahtevZaReg1(username, password, ime, prezime, mestoRodjenja, datumRodjenja, kontaktTelefon, email) {
    let poljoprivrednici = JSON.parse(localStorage.getItem('poljoprivrednici'));
    let zahteviPoljo = JSON.parse(localStorage.getItem('zahteviPoljo'));
    let uspesnaRegistracija = true;
    poljoprivrednici.forEach(poljoprivrednik => {
      if (poljoprivrednik.username == username) {
        uspesnaRegistracija = false;
        return uspesnaRegistracija;
      }
    });
    zahteviPoljo.forEach(zahtev => {
      if (zahtev.username == username) {
        uspesnaRegistracija = false;
        return uspesnaRegistracija;
      }
    });
    if (uspesnaRegistracija) {
      let poljoprivrednik = {
        username: username,
        password: password,
        ime: ime,
        prezime: prezime,
        mestoRodjenja: mestoRodjenja,
        datumRodjenja: datumRodjenja,
        kontaktTelefon: kontaktTelefon,
        email: email
      }
      zahteviPoljo.push(poljoprivrednik);
      localStorage.setItem('zahteviPoljo', JSON.stringify(zahteviPoljo));
      return uspesnaRegistracija;
    }
  }

  zahtevZaReg11(username, password, ime, prezime, mestoRodjenja, datumRodjenja, kontaktTelefon, email) {
    let poljoprivrednici: Poljoprivrednik[] = [];
    let zahteviPoljo: Poljoprivrednik[] = [];
    let zahteviPred: Preduzece[] = [];
    let preduzeca: Preduzece[] = [];
    this.ucitajPoljoprivrednike().subscribe((poljo) => {
      poljoprivrednici = poljo;
      this.ucitajPreduzeca().subscribe((pred) => {
        preduzeca = pred;
      })
      this.ucitajZahtevePoljo().subscribe((zah) => {
        zahteviPoljo = zah;
      })
      this.ucitajZahtevePred().subscribe((zaht) => {
        zahteviPred = zaht;

        let uspesnaRegistracija = true;
        poljoprivrednici.forEach(poljoprivrednik => {
          if (poljoprivrednik.username == username) {
            uspesnaRegistracija = false;
            alert('Zauzeto korisnicko ime!');
          }
        });
        zahteviPoljo.forEach(zahtev => {
          if (zahtev.username == username) {
            uspesnaRegistracija = false;
            alert('Zauzeto korisnicko ime!');
          }
        });
        preduzeca.forEach(preduzece => {
          if (preduzece.username == username) {
            uspesnaRegistracija = false;
            alert('Zauzeto korisnicko ime!');
          }
        });
        zahteviPred.forEach(zahtev => {
          if (zahtev.username == username) {
            uspesnaRegistracija = false;
            alert('Zauzeto korisnicko ime!');
          }
        });
        if (uspesnaRegistracija) {
          this.posaljiZahtevPoljo(username, password, ime, prezime, mestoRodjenja, datumRodjenja, kontaktTelefon, email).subscribe();
/**          
          var headers = new HttpHeaders();
          headers = headers.append('Content-Type', 'application/json');
          headers = headers.append('Accept', 'application/json');

          let poljoprivred = {
            username: username,
            password: password,
            ime: ime,
            prezime: prezime,
            mestoRodjenja: mestoRodjenja,
            datumRodjenja: datumRodjenja,
            kontaktTelefon: kontaktTelefon,
            email: email
          }
          alert('Uspesno ste poslali zahtev za registraciju!');
          return this.http.post('http://localhost:5000/zahtev', poljoprivred, {responseType: 'text'})
*/        }
      })
    })
  }

  zahtevZaReg12(username, password, naziv, datumOsnivanja, mesto, email) {
    let poljoprivrednici: Poljoprivrednik[] = [];
    let zahteviPoljo: Poljoprivrednik[] = [];
    let zahteviPred: Preduzece[] = [];
    let preduzeca: Preduzece[] = [];
    this.ucitajPoljoprivrednike().subscribe((poljo) => {
      poljoprivrednici = poljo;
      this.ucitajPreduzeca().subscribe((pred) => {
        preduzeca = pred;
      })
      this.ucitajZahtevePoljo().subscribe((zah) => {
        zahteviPoljo = zah;
      })
      this.ucitajZahtevePred().subscribe((zaht) => {
        zahteviPred = zaht;

        let uspesnaRegistracija = true;
        poljoprivrednici.forEach(poljoprivrednik => {
          if (poljoprivrednik.username == username) {
            uspesnaRegistracija = false;
            alert('Zauzeto korisnicko ime!');
          }
        });
        zahteviPoljo.forEach(zahtev => {
          if (zahtev.username == username) {
            uspesnaRegistracija = false;
            alert('Zauzeto korisnicko ime!');
          }
        });
        preduzeca.forEach(preduzece => {
          if (preduzece.username == username) {
            uspesnaRegistracija = false;
            alert('Zauzeto korisnicko ime!');
          }
        });
        zahteviPred.forEach(zahtev => {
          if (zahtev.username == username) {
            uspesnaRegistracija = false;
            alert('Zauzeto korisnicko ime!');
          }
        });
        if (uspesnaRegistracija) {
          this.posaljiZahtevPred(username, password, naziv, datumOsnivanja, mesto, email).subscribe();
        }
      })
    })
  }

  dodajPoljoprivrednika(username, password, ime, prezime, mestoRodjenja, datumRodjenja, kontaktTelefon, email) {
    let poljoprivrednici: Poljoprivrednik[] = [];
    let zahteviPoljo: Poljoprivrednik[] = [];
    let zahteviPred: Preduzece[] = [];
    let preduzeca: Preduzece[] = [];
    this.ucitajPoljoprivrednike().subscribe((poljo) => {
      poljoprivrednici = poljo;
      this.ucitajPreduzeca().subscribe((pred) => {
        preduzeca = pred;
      })
      this.ucitajZahtevePoljo().subscribe((zah) => {
        zahteviPoljo = zah;
      })
      this.ucitajZahtevePred().subscribe((zaht) => {
        zahteviPred = zaht;

        let uspesnaRegistracija = true;
        poljoprivrednici.forEach(poljoprivrednik => {
          if (poljoprivrednik.username == username) {
            uspesnaRegistracija = false;
            alert('Zauzeto korisnicko ime!');
          }
        });
        zahteviPoljo.forEach(zahtev => {
          if (zahtev.username == username) {
            uspesnaRegistracija = false;
            alert('Zauzeto korisnicko ime!');
          }
        });
        preduzeca.forEach(preduzece => {
          if (preduzece.username == username) {
            uspesnaRegistracija = false;
            alert('Zauzeto korisnicko ime!');
          }
        });
        zahteviPred.forEach(zahtev => {
          if (zahtev.username == username) {
            uspesnaRegistracija = false;
            alert('Zauzeto korisnicko ime!');
          }
        });
        if (uspesnaRegistracija) {
          this.posaljiRegPoljo(username, password, ime, prezime, mestoRodjenja, datumRodjenja, kontaktTelefon, email).subscribe();
        }
      })
    })
  }

  dodajPreduzece(username, password, naziv, datumOsnivanja, mesto, email) {
    let poljoprivrednici: Poljoprivrednik[] = [];
    let zahteviPoljo: Poljoprivrednik[] = [];
    let zahteviPred: Preduzece[] = [];
    let preduzeca: Preduzece[] = [];
    this.ucitajPoljoprivrednike().subscribe((poljo) => {
      poljoprivrednici = poljo;
      this.ucitajPreduzeca().subscribe((pred) => {
        preduzeca = pred;
      })
      this.ucitajZahtevePoljo().subscribe((zah) => {
        zahteviPoljo = zah;
      })
      this.ucitajZahtevePred().subscribe((zaht) => {
        zahteviPred = zaht;

        let uspesnaRegistracija = true;
        poljoprivrednici.forEach(poljoprivrednik => {
          if (poljoprivrednik.username == username) {
            uspesnaRegistracija = false;
            alert('Zauzeto korisnicko ime!');
          }
        });
        zahteviPoljo.forEach(zahtev => {
          if (zahtev.username == username) {
            uspesnaRegistracija = false;
            alert('Zauzeto korisnicko ime!');
          }
        });
        preduzeca.forEach(preduzece => {
          if (preduzece.username == username) {
            uspesnaRegistracija = false;
            alert('Zauzeto korisnicko ime!');
          }
        });
        zahteviPred.forEach(zahtev => {
          if (zahtev.username == username) {
            uspesnaRegistracija = false;
            alert('Zauzeto korisnicko ime!');
          }
        });
        if (uspesnaRegistracija) {
          this.posaljiRegPred(username, password, naziv, datumOsnivanja, mesto, email).subscribe();
        }
      })
    })
  }

  zahtevZaReg2(username, password, naziv, datumOsnivanja, mesto, email) {
    let preduzeca = JSON.parse(localStorage.getItem('preduzeca'));
    let zahteviPred = JSON.parse(localStorage.getItem('zahteviPred'));
    let uspesnaRegistracija = true;
    preduzeca.forEach(preduzece => {
      if (preduzece.username == username) {
        uspesnaRegistracija = false;
        return uspesnaRegistracija;
      }
    });
    zahteviPred.forEach(zahtev => {
      if (zahtev.username == username) {
        uspesnaRegistracija = false;
        return uspesnaRegistracija;
      }
    });
    if (uspesnaRegistracija) {
      let preduzece = {
        username: username,
        password: password,
        naziv: naziv,
        datumOsnivanja: datumOsnivanja,
        mesto: mesto,
        email: email
      }
      zahteviPred.push(preduzece);
      localStorage.setItem('zahteviPred', JSON.stringify(zahteviPred));
      return uspesnaRegistracija;
    }
  }

  odobriRegPoljo(username, password, ime, prezime, mestoRodjenja, datumRodjenja,
    kontaktTelefon, email) {
    let poljoprivrednik = {
      username: username,
      password: password,
      ime: ime,
      prezime: prezime,
      mestoRodjenja: mestoRodjenja,
      datumRodjenja: datumRodjenja,
      kontaktTelefon: kontaktTelefon,
      email: email
    }
    this.posaljiRegPoljo(username, password, ime, prezime, mestoRodjenja, datumRodjenja, kontaktTelefon, email).subscribe();

    this.obrisiRegPoljo(poljoprivrednik);
  }


  odobriRegPred(username, password, naziv, datumOsnivanja, mesto, email) {
    for (var i = 0; i < 5; i++) {
        let id = i;
        let nazivPreduzeca = naziv;
        let zauzet = 0;
        let idNar = 0;
      this.napraviKurire11(id, nazivPreduzeca, zauzet, idNar).subscribe();
    }



    let preduzece = {
      username: username,
      password: password,
      naziv: naziv,
      datumOsnivanja: datumOsnivanja,
      mesto: mesto,
      email: email
    }

    this.posaljiRegPred(username, password, naziv, datumOsnivanja, mesto, email).subscribe();

    this.obrisiRegPred(preduzece);

  }

  obrisiRegPoljo(zahtevPoljo) {
    let zahteviPoljo: Poljoprivrednik[] = [];
    this.ucitajZahtevePoljo().subscribe((zah) => {
      zahteviPoljo = zah;
      zahteviPoljo.forEach(zahtev => {
        if (zahtev.username == zahtevPoljo.username) {
          alert('Zahtev ce biti obrisan!');
          this.obrisiZahtevPoljo(zahtev.username).subscribe();
        }
      });
    })

  }

  obrisiRegPred(zahtevPred) {
    let zahteviPred: Preduzece[] = [];
    this.ucitajZahtevePred().subscribe((zah) => {
      zahteviPred = zah;
      zahteviPred.forEach(zahtev => {
        if (zahtev.username == zahtevPred.username) {
          alert('Zahtev ce biti obrisan!');
          this.obrisiZahtevPred(zahtev.username).subscribe();
        }
      });
    })

  }

  obrisiPoljoprivrednika(poljopr) {
    let poljoprivrednici: Poljoprivrednik[] = [];
    this.ucitajPoljoprivrednike().subscribe((poljop) => {
      poljoprivrednici = poljop;
      poljoprivrednici.forEach(poljo => {
        if (poljo.username == poljopr.username) {
          alert('Korisnik ce biti obrisan!');
          this.obrisiPoljoprivrednika1(poljo.username).subscribe();
        }
      });
    })

  }

  obrisiPreduzece(preduz) {
    let preduzeca: Preduzece[] = [];
    this.ucitajPreduzeca().subscribe((predu) => {
      preduzeca = predu;
      preduzeca.forEach(pred => {
        if (pred.username == preduz.username) {
          alert('Korisnik ce biti obrisan!');
          this.obrisiPreduzece1(pred.username).subscribe();
        }
      });
    })

  }

  pretragaPoljo(username) {
    let poljoprivrednici = JSON.parse(localStorage.getItem('poljoprivrednici'));
    return poljoprivrednici.filter(poljoprivrednik =>
      poljoprivrednik.username == username)[0];
  }

  pretragaPred(username) {
    let preduzeca = JSON.parse(localStorage.getItem('preduzeca'));
    return preduzeca.filter(preduzece =>
      preduzece.username == username)[0];
  }

  pretragaAdmin(username) {
    this.ucitajAdmine();
    let admini = JSON.parse(localStorage.getItem('admini'));
    return admini.filter(admin =>
      admin.username == username)[0];
  }

  pretragaSadnice(naziv, nazivPreduzeca) {
    let imaNaStanju = false;
    let sadniceProd = this.dohvatiSadniceProd(nazivPreduzeca);
    sadniceProd.forEach(sadnica => {
      if (sadnica.naziv == naziv) {
        imaNaStanju = true;
        return imaNaStanju;
      }
    });
    return imaNaStanju;
  }

  pretragaPreparati(naziv, nazivPreduzeca) {
    let imaNaStanju = false;
    let preparatiProd = this.dohvatiPreparateProd(nazivPreduzeca);
    preparatiProd.forEach(preparat => {
      if (preparat.naziv == naziv) {
        imaNaStanju = true;
        return imaNaStanju;
      }
    });
    return imaNaStanju;
  }


  azurirajPoljo(username, password, ime, prezime, mestoRodjenja, datumRodjenja,
    kontaktTelefon, email) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      username: username,
      password: password,
      ime: ime,
      prezime: prezime,
      mestoRodjenja: mestoRodjenja,
      datumRodjenja: datumRodjenja,
      kontaktTelefon: kontaktTelefon,
      email: email

    }

    alert('Podaci korisnika ce biti azurirani!');
    return this.http.post('http://localhost:5000/azurirajPoljo', p, { responseType: 'text' })
  }

  azurirajPred(preduzece) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      username: preduzece.username,
      password: preduzece.password,
      naziv: preduzece.naziv,
      datumOsnivanja: preduzece.datumOsnivanja,
      mesto: preduzece.mesto,
      email: preduzece.email

    }

    alert('Podaci korisnika ce biti azurirani!');
    return this.http.post('http://localhost:5000/azurirajPred', p, { responseType: 'text' })
  }

  promeniLozinkuPoljo(username, newPassword) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      username: username,
      newPassword: newPassword
    }
    alert('Lozinka je promenjena!');
    return this.http.post('http://localhost:5000/promeniLozinkuPoljo', p, { responseType: 'text' })
  }

  promeniLozinkuPred(username, newPassword) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      username: username,
      newPassword: newPassword
    }
    alert('Lozinka je promenjena!');
    return this.http.post('http://localhost:5000/promeniLozinkuPred', p, { responseType: 'text' })
  }

  promeniLozinkuAdmin(username, newPassword) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      username: username,
      newPassword: newPassword
    }
    alert('Lozinka je promenjena!');
    return this.http.post('http://localhost:5000/promeniLozinkuAdmin', p, { responseType: 'text' })
  }


  dodajPreparatSS11(id, lokacija) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      id: id,
      lokacija: lokacija
    }
    return this.http.post('http://localhost:5000/dodajPreparat11', p, { responseType: 'text' })
  }

  dodajPreparatSS12(id, prepa) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      id: id,
      prepa: prepa
    }
    alert('Preparat ce biti dodat!');
    return this.http.post('http://localhost:5000/dodajPreparat12', p, { responseType: 'text' })
  }

  presadiParcela(id, idSad) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      id: id,
      idSad: idSad
    }
    alert('Sadnica ce biti presadjena!');
    return this.http.post('http://localhost:5000/presadiParcela', p, { responseType: 'text' })
  }

  obrisiSadnicu(id) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    const k = {
      id: id
    }

    return this.http.post('http://localhost:5000/obrisiSadnicu', k, { responseType: 'text' })
  }

  presadiSad(id) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    const k = {
      id: id
    }

    return this.http.post('http://localhost:5000/presadiSad', k, { responseType: 'text' })
  }

  postaviSadnicu11(id, nazivRas, parcelaId, zasadjena) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      id: id,
      nazivRas: nazivRas,
      parcelaId: parcelaId,
      zasadjena: zasadjena
    }
    alert('Sadnica ce biti zasadjena!');
    return this.http.post('http://localhost:5000/postaviSadnicu11', p, { responseType: 'text' })
  }

  postaviSadnicu11Rasadnik(nazivRas) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      nazivRas: nazivRas,
    }

    return this.http.post('http://localhost:5000/postaviSadnicu11Rasadnik', p, { responseType: 'text' })
  }

  presadiSadRasadnik(nazivRas) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      nazivRas: nazivRas,
    }

    return this.http.post('http://localhost:5000/presadiSadRasadnik', p, { responseType: 'text' })
  }

  odbijSadnica(id) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      id: id,
    }
    return this.http.post('http://localhost:5000/odbijSadnica', p, { responseType: 'text' })
  }

  odbijPreparat(id) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      id: id,
    }
    return this.http.post('http://localhost:5000/odbijPreparat', p, { responseType: 'text' })
  }

  odbijKurir(id) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      id: id,
    }
    alert("Narudzbina ce biti odbijena");
    return this.http.post('http://localhost:5000/odbijKurir', p, { responseType: 'text' })
  }

  obrisiNarudzbinu(id) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    const k = {
      id: id
    }
    alert("Narudzbina ce biti odbijena");
    return this.http.post('http://localhost:5000/obrisiNarudzbinu', k, { responseType: 'text' })
  }

  ukloniSadnicu11(id) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    const k = {
      id: id
    }
    alert("Sadnica ce biti uklonjena");
    return this.http.post('http://localhost:5000/ukloniSadnicu', k, { responseType: 'text' })
  }

  ukloniPreparat11(id) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    const k = {
      id: id
    }
    alert("Preparat ce biti uklonjen");
    return this.http.post('http://localhost:5000/ukloniPreparat', k, { responseType: 'text' })
  }


  dodajRasadnik11(usernameVlasnika, naziv, mesto,
    sirina, duzina) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      usernameVlasnika: usernameVlasnika,
      naziv: naziv,
      mesto: mesto,
      sirina: sirina,
      duzina: duzina,

    }
    return this.http.post('http://localhost:5000/dodajRasadnik', p, { responseType: 'text' })
  }

  dodajMagacin11(nazivMagacina, nazivRas) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      naziv: nazivMagacina,
      nazivRas: nazivRas
    }
    return this.http.post('http://localhost:5000/dodajMagacin', p, { responseType: 'text' })
  }

  napraviParcele11(id, idSad, nazivRas) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      id: id,
      idSad: idSad,
      nazivRas: nazivRas

    }
    return this.http.post('http://localhost:5000/napraviParcele', p, { responseType: 'text' })
  }

  dodajSadnicu11(id, proizvodjac, naziv, lokacija, zasadjena, mestoURasadniku, progres, cena, naruceno, prepa) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      id: id,
      proizvodjac: proizvodjac,
      naziv: naziv,
      lokacija: lokacija,
      zasadjena: zasadjena,
      mestoURasadniku: mestoURasadniku,
      progres: progres,
      cena: cena,
      naruceno: naruceno,
      prepa: prepa

    }
    alert("Uspesno ste dodali sadnicu!");
    return this.http.post('http://localhost:5000/dodajSadnicu', p, { responseType: 'text' })
  }

  dodajPreparat11(id, proizvodjac, naziv, lokacija, progres, cena, naruceno) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      id: id,
      proizvodjac: proizvodjac,
      naziv: naziv,
      lokacija: lokacija,
      cena: cena,
      progres: progres,
      naruceno: naruceno

    }
    alert("Uspesno ste dodali preparat!");
    return this.http.post('http://localhost:5000/dodajPreparat', p, { responseType: 'text' })
  }

  zapocniNarudzbinuSad11(id, proizvodjac, magacin1, status, datum, cena, vrsta, proizvodi) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      id: id,
      proizvodjac: proizvodjac,
      magacin: magacin1,
      status: status,
      datum: datum,
      cena: cena,
      vrsta: vrsta,
      proizvodi: proizvodi

    }
    return this.http.post('http://localhost:5000/zapocniNarudzbinuSad', p, { responseType: 'text' })
  }

  zapocniNarudzbinuPrep11(id, proizvodjac, magacin1, status, datum, cena, vrsta, proizvodi) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      id: id,
      proizvodjac: proizvodjac,
      magacin: magacin1,
      status: status,
      datum: datum,
      cena: cena,
      vrsta: vrsta,
      proizvodi: proizvodi

    }
    return this.http.post('http://localhost:5000/zapocniNarudzbinuPrep', p, { responseType: 'text' })
  }

  odaberiSadnicu11Nar(id, cena, proizvodi) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      id: id,
      cena: cena,
      proizvodi: proizvodi
    }
    alert('Uspesno ste odabrali proizvod!');
    return this.http.post('http://localhost:5000/odaberiSadnicu11Nar', p, { responseType: 'text' })
  }

  odaberiSadnicu11Sad(id, naruceno) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      id: id,
      naruceno: naruceno,
    }
    return this.http.post('http://localhost:5000/odaberiSadnicu11Sad', p, { responseType: 'text' })
  }

  odaberiPreparat11Nar(id, cena, proizvodi) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      id: id,
      cena: cena,
      proizvodi: proizvodi
    }
    alert('Uspesno ste odabrali proizvod!');
    return this.http.post('http://localhost:5000/odaberiPreparat11Nar', p, { responseType: 'text' })
  }

  odaberiPreparat11Prep(id, naruceno) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      id: id,
      naruceno: naruceno,
    }
    return this.http.post('http://localhost:5000/odaberiPreparat11Prep', p, { responseType: 'text' })
  }

  zavrsiNarudzbinu11(narudzbinaId, datum, status) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      id: narudzbinaId,
      datum: datum,
      status: status
    }
    alert('Uspesno ste narucili proizvod/e!');
    return this.http.post('http://localhost:5000/zavrsiNarudzbinu', p, { responseType: 'text' })
  }

  prihvatiNarudzbinu11Kurir(id, nazivPreduzeca, zauzet, narudzbinaId) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      id: id,
      nazivPreduzeca: nazivPreduzeca,
      zauzet: zauzet,
      idNar: narudzbinaId
    }
    return this.http.post('http://localhost:5000/prihvatiNarudzbinuKurir', p, { responseType: 'text' })
  }

  prihvatiNarudzbinu11Narudzbina(id, status) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      id: id,
      status: status
    }
    return this.http.post('http://localhost:5000/prihvatiNarudzbinuNarudzbina', p, { responseType: 'text' })
  }

  napraviKurire11(id, nazivPreduzeca, zauzet, idNar) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      id: id,
      nazivPreduzeca: nazivPreduzeca,
      zauzet: zauzet,
      idNar: idNar

    }
    return this.http.post('http://localhost:5000/napraviKurire', p, { responseType: 'text' })
  }

  isporukaUToku(id, status) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      id: id,
      status: status

    }
    return this.http.post('http://localhost:5000/isporukaUToku', p, { responseType: 'text' })
  }

  isporukaSadnica(id, naruceno, lokacija) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      id: id,
      naruceno: naruceno,
      lokacija: lokacija

    }

    return this.http.post('http://localhost:5000/isporukaSadnica', p, { responseType: 'text' })
  }

  isporukaPreparata(id, naruceno, lokacija) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      id: id,
      naruceno: naruceno,
      lokacija: lokacija

    }
    return this.http.post('http://localhost:5000/isporukaPreparata', p, { responseType: 'text' })
  }

  isporukaNarudzbina(id, status) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      id: id,
      status: status

    }
    return this.http.post('http://localhost:5000/isporukaNarudzbina', p, { responseType: 'text' })
  }

  isporukaKurir(id, idNar, zauzet) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      id: id,
      idNar: idNar,
      zauzet: zauzet

    }
    return this.http.post('http://localhost:5000/isporukaKurir', p, { responseType: 'text' })
  }

  zapocniProgresRas(naziv, temperatura, voda) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      naziv: naziv,
      temperatura: temperatura,
      voda: voda

    }
    return this.http.post('http://localhost:5000/zapocniProgresRas', p, { responseType: 'text' })
  }

  zapocniProgresSad(id, progres) {
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    let p = {
      id: id,
      progres: progres

    }
    return this.http.post('http://localhost:5000/zapocniProgresSad', p, { responseType: 'text' })
  }


  promeniLozinku(username, password, passwordNew, passwordNewConf, message) {
    message = '';
    if (username == '' || username == null || password == '' || password == null) {
      message = 'Morate popuniti sva polja!'
    }
    else {
      let poljoprivrednici = JSON.parse(localStorage.getItem('poljoprivrednici'));
      poljoprivrednici.forEach(poljoprivrednik => {
        if (poljoprivrednik.username == username && poljoprivrednik.password == password) {
          poljoprivrednik.password = passwordNew;
          localStorage.setItem('poljoprivrednici', JSON.stringify(poljoprivrednici));
          this.router.navigate(['/login']);
        }
        else {
          message = 'Stara sifra je pogresna!'
        }
      });
      let preduzeca = JSON.parse(localStorage.getItem('preduzeca'));
      preduzeca.forEach(preduzece => {
        if (preduzece.username == username && preduzece.password == password) {
          preduzece.password = passwordNew;
          localStorage.setItem('preduzeca', JSON.stringify(preduzeca));
          this.router.navigate(['/login']);
        }
        else {
          message = 'Stara sifra je pogresna!'
        }
      });
      let admini = JSON.parse(localStorage.getItem('admini'));
      admini.forEach(admin => {
        if (admin.username == username && admin.password == password) {
          admin.password = passwordNew;
          localStorage.setItem('admini', JSON.stringify(admini));
          this.router.navigate(['/login']);
        }
        else {
          message = 'Stara sifra je pogresna!'
        }
      });
    }
    return message;
  }

  promeniLozinku1(username, password, passwordNew, passwordNewConf) {
    let poljoprivrednici: Poljoprivrednik[] = [];
    let preduzeca: Preduzece[] = [];
    let admini: any = [];
    let message = '';
    this.ucitajPoljoprivrednike().subscribe((poljo) => {
      poljoprivrednici = poljo;
      this.ucitajPreduzeca().subscribe((pred) => {
        preduzeca = pred;
        this.ucitajAdmine().subscribe((admin) => {
          admini = admin;
          poljoprivrednici.forEach(poljoprivrednik => {
            if (poljoprivrednik.username == username) {
              if (poljoprivrednik.password == password) {
                this.promeniLozinkuPoljo(username, passwordNew).subscribe();
                this.router.navigate(['/login']);
              }
              else {
                alert('Stara sifra je pogresna!');
              }
            }
          });
          preduzeca.forEach(preduzece => {
            if (preduzece.username == username) {
              if (preduzece.password == password) {
                this.promeniLozinkuPred(username, passwordNew).subscribe();
                this.router.navigate(['/login']);
              }
              else {
                alert('Stara sifra je pogresna!');
              }
            }
          });
          admini.forEach(admin => {
            if (admin.username == username && admin.password == password) {
              if (admin.password == password) {
                this.promeniLozinkuAdmin(username, passwordNew).subscribe();
                this.router.navigate(['/login']);
              }
              else {
                alert('Stara sifra je pogresna!');
              }
            }
          });
        })
      })
    })
    return message;
  }

  rasadnikSadnice(naziv) {
    this.ucitajSadnice();
    let zasadjeneSadnice: Sadnica[] = [];
    let sadnice = JSON.parse(localStorage.getItem('sadnice'));
    sadnice.forEach(sadnica => {
      if (sadnica.lokacija == naziv) {
        zasadjeneSadnice.push(sadnica);
      }
    });
    return zasadjeneSadnice;
  }

  ucitajMagacinRasadnika() {
    this.ucitajMagacine();
    let magacinRasadnika: Magacin = null;
    let rasadnik = localStorage.getItem('RasadnikLog');
    let magacini = JSON.parse(localStorage.getItem('magacini'));
    magacini.forEach(magacin => {
      if (magacin.nazivRas == rasadnik) {
        magacinRasadnika = magacin;
      }
    });
    return magacinRasadnika;
  }


  pristupiRasadniku(naziv) {
    localStorage.setItem('RasadnikLog', naziv);
    this.router.navigate(['/rasadnik']);
  }

  dodajRasadnikPage() {
    this.router.navigate(['/dodajRasadnik']);
  }

  logOff(){
    this.router.navigate(['/pocetna']);

  }

  pristupMagacinu() {
    let magacini: Magacin[] = [];
    this.ucitajMagacine1().subscribe((magacini1) => {
      let rasadnik = localStorage.getItem('RasadnikLog');
      magacini = magacini1;
      magacini.forEach(magacin => {
        if (magacin.nazivRas == rasadnik) {
          localStorage.setItem('MagacinLog', magacin.naziv);
          this.router.navigate(['/magacin']);
        }
      });
    })
  }

  pristupProdavnici(preduzece) {
    localStorage.setItem('ProdavnicaLog', preduzece.naziv)
    this.router.navigate(['prodavnica']);
  }

  dodajPreparatS(sadnica) {
    localStorage.setItem('sadnicaLog', sadnica.id);
    let magacin = this.ucitajMagacinRasadnika();
    let preparatiM: Preparat[] = [];
    preparatiM = this.dohvatiPreparateMag(magacin.naziv);
    return preparatiM;
  }

  dodajPreparatSS(prep) {
    this.ucitajPreparate();
    this.ucitajSadnice();
    let idSad = localStorage.getItem('sadnicaLog');
    let preparati = JSON.parse(localStorage.getItem('preparati'));
    let sadnice = JSON.parse(localStorage.getItem('sadnice'));
    preparati.forEach(preparat => {
      if (preparat.id == prep.id) {
        preparat.lokacija = idSad;
      }
      localStorage.setItem('preparati', JSON.stringify(preparati));
    });
    sadnice.forEach(sadnica => {
      if (sadnica.id == idSad) {
        sadnica.prepa = 1;
      }
      localStorage.setItem('sadnice', JSON.stringify(sadnice));
    });
  }

  dodajPreparatSS1(prep) {
    this.ucitajSadnice1().subscribe((sad) => {
      this.ucitajPreparate1().subscribe((prepa) => {
        let preparati: Preparat[] = [];
        let sadnice: Sadnica[] = [];
        preparati = prepa;
        sadnice = sad;
        let idSad = localStorage.getItem('sadnicaLog');
        preparati.forEach(preparat => {
          if (preparat.id == prep.id) {
            preparat.lokacija = idSad;
            this.dodajPreparatSS11(preparat.id, preparat.lokacija).subscribe();
          }
        });
        sadnice.forEach(sadnica => {
          if (sadnica.id == parseInt(idSad)) {
            sadnica.prepa = 1;
            this.dodajPreparatSS12(sadnica.id, sadnica.prepa).subscribe();
          }
        });
      })
    })
  }

  dodajPreparatSS0(prep) {
    this.ucitajPreparate1().subscribe((prepa) => {
      let preparati: Preparat[] = [];
      preparati = prepa;
      let idSad = localStorage.getItem('sadnicaLog');
      preparati.forEach(preparat => {
        if (preparat.id == prep.id) {
          preparat.lokacija = idSad;
          this.dodajPreparatSS11(preparat.id, preparat.lokacija).subscribe();
          this.srediSadnicu();
        }
      });
    })
  }

  srediSadnicu() {
    this.ucitajSadnice1().subscribe((sad) => {
      let sadnice: Sadnica[] = [];
      sadnice = sad;
      let idSad = localStorage.getItem('sadnicaLog');
      sadnice.forEach(sadnica => {
        if (sadnica.id == parseInt(idSad)) {
          sadnica.prepa = 1;
          this.dodajPreparatSS12(sadnica.id, sadnica.prepa).subscribe();
        }
      });
    })
  }

  popuniPrazno(parcela) {
    localStorage.setItem('ParcelaLog', parcela.id);
    let magacin = this.ucitajMagacinRasadnika();
    let sadniceM: Sadnica[] = [];
    sadniceM = this.dohvatiSadniceMag(magacin.naziv);
    return sadniceM;
  }

  postaviSadnicu(sadnica) {
    let sadnice = JSON.parse(localStorage.getItem('sadnice'));
    let nazivRas = localStorage.getItem('RasadnikLog');
    let parcelaId = localStorage.getItem('ParcelaLog');
    let sad1 = {
      id: sadnica.id,
      proizvodjac: sadnica.proizvodjac,
      naziv: sadnica.naziv,
      lokacija: nazivRas,
      zasadjena: 1,
      mestoURasadniku: parcelaId,
      progres: sadnica.progres,
      cena: sadnica.cena,
      naruceno: sadnica.naruceno,
      prepa: sadnica.prepa
    }
    sadnice.forEach((sad, index) => {
      if (sad.id == sadnica.id) {
        sadnice[index] = sad1;
      }
    });
    localStorage.setItem('sadnice', JSON.stringify(sadnice));
  }

  postaviSadnicu1(sadnica) {
    let nazivRas = localStorage.getItem('RasadnikLog');
    let parcelaId = localStorage.getItem('ParcelaLog');
    let zasadjena = 1;
    this.postaviSadnicu11(sadnica.id, nazivRas, parseInt(parcelaId), zasadjena).subscribe();
    this.postaviSadnicu11Rasadnik(nazivRas).subscribe();
  }

  presadiSadnicu(sadnica) {
    let sadnice = JSON.parse(localStorage.getItem('sadnice'));
    let parcele = JSON.parse(localStorage.getItem('parcele'));
    parcele.forEach(parcela => {
      if (parcela.idSad == sadnica.id && parcela.nazivRas == sadnica.lokacija) {
        parcela.idSad == 0;
      }
    });
    localStorage.setItem('parcele', JSON.stringify(parcele));
    sadnice.forEach((sad, index) => {
      if (sad.id == sadnica.id) {
        sadnice.splice(index, 1);
      }
    });
    localStorage.setItem('sadnice', JSON.stringify(sadnice));
  }

  presadiSadnicu1(sadnica) {
    let nazivRas = localStorage.getItem('RasadnikLog');
    this.presadiSadRasadnik(nazivRas).subscribe();

    this.ucitajSadnice1().subscribe((sad) => {
      this.ucitajParcele1().subscribe((parc) => {
        let parcele: Parcela[] = [];
        let sadnice: Sadnica[] = [];
        parcele = parc;
        sadnice = sad;
        parcele.forEach(parcela => {
          if (parcela.idSad == sadnica.id && parcela.nazivRas == sadnica.lokacija) {
            parcela.idSad = 0;
            this.presadiParcela(parcela.id, parcela.idSad).subscribe();
            sadnice.forEach(sadn => {
              if (sadn.id == sadnica.id) {
                this.presadiSad(sadnica.id).subscribe();
              }
            });
          }
        });

      })
    })
  }

  setRasadnikCeo(nazivRas, duzina, sirina) {
    this.ucitajSadnice();
    let rasadnikCeo: Sadnica[] = [];
    let praznoMesto: Sadnica;
    let sadnice = JSON.parse(localStorage.getItem('sadnice'));
    for (var i = 0; i < duzina * sirina; i++) {
      let praznoMesto = {
        id: 1000,
        proizvodjac: duzina,
        naziv: duzina,
        lokacija: duzina,
        zasadjena: 0,
        mestoURasadniku: duzina,
        progres: duzina,
        cena: 0,
        naruceno: 0,
        prepa: 1
      }
      rasadnikCeo.push(praznoMesto);
    }
    sadnice.forEach(sadnica => {
      if (sadnica.lokacija == nazivRas) {
        rasadnikCeo.push(sadnica);
      }
    });

    return rasadnikCeo;
  }

  azurirajParcele(naziv) {
    let parcele = JSON.parse(localStorage.getItem('parcele'));
    let sadnice = JSON.parse(localStorage.getItem('sadnice'));
    parcele.forEach(parcela => {
      if (parcela.nazivRas == naziv) {
        sadnice.forEach(sadnica => {
          if (parcela.id == sadnica.mestoURasadniku && parcela.nazivRas == sadnica.nazivRas && sadnica.zasadjena == 1) {
            parcela.idSad = sadnica.id;
            localStorage.setItem('parcele', JSON.stringify(parcele));
          }
        });
      }
    });
  }

  napraviParcele(naziv, sirina, duzina) {
    let parcele = JSON.parse(localStorage.getItem('parcele'));

    for (var i = 0; i < sirina * duzina; i++) {
      let novaParcela: Parcela = {
        id: i,
        idSad: 0,
        nazivRas: naziv
      }
      parcele.push(novaParcela);
      localStorage.setItem('parcele', JSON.stringify(parcele));
    }
  }

  napraviParcele1(naziv, sirina, duzina) {
    for (var i = 0; i < sirina * duzina; i++) {
      let id = i;
      let idSad = 0;
      let nazivRas = naziv;
      this.napraviParcele11(id, idSad, nazivRas).subscribe();
    }
  }

  napraviKurire(naziv) {
    let kuriri = JSON.parse(localStorage.getItem('kuriri'));
    for (var i = 0; i < 5; i++) {
      let noviKurir: Kurir = {
        id: i,
        nazivPreduzeca: naziv,
        zauzet: 0,
        idNar: 0
      }
      kuriri.push(noviKurir);
      localStorage.setItem('kuriri', JSON.stringify(kuriri));
    }
  }

  zapocniNarudzbinuSad(naziv) {
    let magacin = localStorage.getItem('MagacinLog');
    let narudzbine = JSON.parse(localStorage.getItem('narudzbine'));
    let narudzbina = {
      id: narudzbine.length + 1,
      proizvodjac: naziv,
      magacin: magacin,
      status: "U PRIPREMI",
      datum: new Date(),
      cena: 0,
      vrsta: 0,
      proizvodi: []
    }
    narudzbine.push(narudzbina);
    localStorage.setItem('narudzbine', JSON.stringify(narudzbine));
    return narudzbina.id;
  }

  zapocniNarudzbinuSad1(naziv) {
    let tacno = true;
    let magacin = localStorage.getItem('MagacinLog');
    this.ucitajNarudzbine1().subscribe((nar => {
      let narudzbine = nar;
      if (tacno) {
        let id = narudzbine.length + 1;
        let proizvodjac = naziv;
        let magacin1 = magacin;
        let status = "U PRIPREMI";
        let datum = new Date();
        let cena = 0;
        let vrsta = 0;
        let proizvodi = [] = [];
        localStorage.setItem('narudzbinaIdSad', id.toString());
        this.zapocniNarudzbinuSad11(id, proizvodjac, magacin1, status, datum, cena, vrsta, proizvodi).subscribe();
      }
    }))
  }

  zapocniNarudzbinuPrep(naziv) {
    let magacin = localStorage.getItem('MagacinLog');
    let narudzbine = JSON.parse(localStorage.getItem('narudzbine'));
    let narudzbina = {
      id: narudzbine.length + 1,
      proizvodjac: naziv,
      magacin: magacin,
      status: "U PRIPREMI",
      datum: new Date(),
      cena: 0,
      vrsta: 1,
      proizvodi: []
    }
    narudzbine.push(narudzbina);
    localStorage.setItem('narudzbine', JSON.stringify(narudzbine));
    return narudzbina.id;
  }

  zapocniNarudzbinuPrep1(naziv) {
    let tacno = true;
    let magacin = localStorage.getItem('MagacinLog');
    this.ucitajNarudzbine1().subscribe((nar => {
      let narudzbine = nar;
      if (tacno) {
        let id = narudzbine.length + 1;
        let proizvodjac = naziv;
        let magacin1 = magacin;
        let status = "U PRIPREMI";
        let datum = new Date();
        let cena = 0;
        let vrsta = 1;
        let proizvodi: [] = [];
        localStorage.setItem('narudzbinaIdPrep', id.toString());
        this.zapocniNarudzbinuPrep11(id, proizvodjac, magacin1, status, datum, cena, vrsta, proizvodi).subscribe();
      }
    }))
  }

  odaberiSadnicu(sadnica, narudzbinaId) {
    let sadnice = JSON.parse(localStorage.getItem('sadnice'));
    let narudzbine = JSON.parse(localStorage.getItem('narudzbine'));
    narudzbine.forEach(narudzbina => {
      if (narudzbina.id == narudzbinaId) {
        narudzbina.cena = narudzbina.cena + sadnica.cena;
        narudzbina.proizvodi.push(sadnica.id);
      }
      localStorage.setItem('narudzbine', JSON.stringify(narudzbine));
    });
    sadnice.forEach(sad => {
      if (sad.id == sadnica.id) {
        sad.naruceno = 1;
      }
    });
    localStorage.setItem('sadnice', JSON.stringify(sadnice));
  }

  odaberiSadnicu1(sadnica, narudzbinaId) {
    this.ucitajNarudzbine1().subscribe((nar) => {
      this.ucitajSadnice1().subscribe((sad) => {
        let narudzbine = nar;
        let sadnice = sad;
        narudzbine.forEach(narudzbina => {
          if (narudzbina.id == narudzbinaId) {
            narudzbina.cena += sadnica.cena;
            narudzbina.proizvodi.push(sadnica.id);
            this.odaberiSadnicu11Nar(narudzbinaId, narudzbina.cena, narudzbina.proizvodi).subscribe();
          }
        });
        sadnice.forEach(sadni => {
          if (sadni.id == sadnica.id) {
            sadni.naruceno = 1;
            this.odaberiSadnicu11Sad(sadni.id, sadni.naruceno).subscribe();
          }
        });
      })
    })
  }

  odaberiPreparat(preparat, narudzbinaId) {
    let preparati = JSON.parse(localStorage.getItem('preparati'));
    let narudzbine = JSON.parse(localStorage.getItem('narudzbine'));
    narudzbine.forEach(narudzbina => {
      if (narudzbina.id == narudzbinaId) {
        narudzbina.cena = narudzbina.cena + preparat.cena;
        narudzbina.proizvodi.push(preparat.id);
      }
      localStorage.setItem('narudzbine', JSON.stringify(narudzbine));
    });
    preparati.forEach(prep => {
      if (prep.id == preparat.id) {
        prep.naruceno = 1;
      }
    });
    localStorage.setItem('preparati', JSON.stringify(preparati));
  }

  odaberiPreparat1(preparat, narudzbinaId) {
    this.ucitajNarudzbine1().subscribe((nar) => {
      this.ucitajPreparate1().subscribe((pre) => {
        let narudzbine = nar;
        let preparati = pre;
        narudzbine.forEach(narudzbina => {
          if (narudzbina.id == narudzbinaId) {
            narudzbina.cena += preparat.cena;
            narudzbina.proizvodi.push(preparat.id);
            this.odaberiPreparat11Nar(narudzbinaId, narudzbina.cena, narudzbina.proizvodi).subscribe();
          }
        });
        preparati.forEach(prep => {
          if (prep.id == preparat.id) {
            prep.naruceno = 1;
            this.odaberiPreparat11Prep(prep.id, prep.naruceno).subscribe();
          }
        });
      })
    })
  }

  zavrsiNarudzbinu(narudzbinaId) {
    let narudzbine = JSON.parse(localStorage.getItem('narudzbine'));
    narudzbine.forEach(narudzbina => {
      if (narudzbina.id == narudzbinaId) {
        narudzbina.datum = new Date();
        narudzbina.status = "SPREMNA";
      }
    });
    localStorage.setItem('narudzbine', JSON.stringify(narudzbine));
  }

  zavrsiNarudzbinu1(narudzbinaId) {
    let tacno = true;
    this.ucitajNarudzbine1().subscribe((nar => {
      let narudzbine = nar;
      if (tacno) {
        narudzbine.forEach(narudzbina => {
          if (narudzbina.id == narudzbinaId) {
            let datum = new Date();
            let status = "SPREMNA";
            this.zavrsiNarudzbinu11(narudzbinaId, datum, status).subscribe();
          }
        });
      }
    }))
  }


  azurirajParcele1(naziv) {
    let azuriraneParcele: Parcela[] = [];
    let parcele: Parcela[] = [];
    let sveParcele = JSON.parse(localStorage.getItem('parcele'));
    sveParcele.forEach(p => {
      if (p.nazivRas == naziv) {
        parcele.push(p);
      }
    });
    let sadnice = this.rasadnikSadnice(naziv);
    parcele.forEach(parcela => {
      sadnice.forEach(sadnica => {
        if (parcela.id == sadnica.mestoURasadniku && sadnica.zasadjena == 1) {
          parcela.idSad = sadnica.id;
        }
      });
      azuriraneParcele.push(parcela);
    });

    return azuriraneParcele;

  }

  dohvatiPreduzeca() {
    this.ucitajPreduzeca();
    let preduzeca = JSON.parse(localStorage.getItem('preduzeca'));
    return preduzeca;
  }


  dohvatiParcele(naziv) {
    let parceleRas: Parcela[] = [];
    let parcele = this.azurirajParcele1(naziv);
    parcele.forEach(parcela => {
      parceleRas.push(parcela);
    });
    return parceleRas;
  }

  sadnicaInfo(idSad) {
    let sadnice = JSON.parse(localStorage.getItem('sadnice'));
    return sadnice.filter(sadnica =>
      sadnica.id == idSad)[0];
  }

  emptyField(field): boolean {
    return (field == '' || field == null);
  }
}
