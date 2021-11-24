import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Router } from '@angular/router';
import { Poljoprivrednik } from '../models/poljoprivrednik';
import { Preduzece } from '../models/preduzece';

@Component({
  selector: 'app-obrisi-korisnika',
  templateUrl: './obrisi-korisnika.component.html',
  styleUrls: ['./obrisi-korisnika.component.css']
})
export class ObrisiKorisnikaComponent implements OnInit {

  constructor(private servis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    this.servis.ucitajPoljoprivrednike().subscribe((poljo) => {
      this.poljoprivrednici = poljo;
    })
    this.servis.ucitajPreduzeca().subscribe((pred) => {
      this.preduzeca = pred;
    })
  }

  poljoprivrednici: Poljoprivrednik[]=[];
  preduzeca: Preduzece[]=[];

  obrisiPoljoprivrednika(poljoprivrednik){
    this.servis.obrisiPoljoprivrednika(poljoprivrednik);
  }

  obrisiPreduzece(preduzece){
    this.servis.obrisiPreduzece(preduzece);
  }

  logOff(){
    this.servis.logOff();
  }

  nazad(){
    window.history.back();
  }

}
