import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PoljoprivrednikComponent } from './poljoprivrednik/poljoprivrednik.component';
import { PreduzeceComponent } from './preduzece/preduzece.component';
import { AdminComponent } from './admin/admin.component';
import { Registracija1Component } from './registracija1/registracija1.component';
import { Registracija2Component } from './registracija2/registracija2.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { DodajKorisnikaComponent } from './dodaj-korisnika/dodaj-korisnika.component';
import { AzurirajKorisnikaComponent } from './azuriraj-korisnika/azuriraj-korisnika.component';
import { ObrisiKorisnikaComponent } from './obrisi-korisnika/obrisi-korisnika.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { RasadnikComponent } from './rasadnik/rasadnik.component';
import { MagacinComponent } from './magacin/magacin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DodajRasadnikComponent } from './dodaj-rasadnik/dodaj-rasadnik.component';
import { ProdavnicaComponent } from './prodavnica/prodavnica.component';
import { DodajSadnicuComponent } from './dodaj-sadnicu/dodaj-sadnicu.component';
import { DodajPreparatComponent } from './dodaj-preparat/dodaj-preparat.component';
import { Pregled30danaComponent } from './pregled30dana/pregled30dana.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PoljoprivrednikComponent,
    PreduzeceComponent,
    AdminComponent,
    Registracija1Component,
    Registracija2Component,
    PocetnaComponent,
    DodajKorisnikaComponent,
    AzurirajKorisnikaComponent,
    ObrisiKorisnikaComponent,
    PromenaLozinkeComponent,
    RasadnikComponent,
    MagacinComponent,
    DodajRasadnikComponent,
    ProdavnicaComponent,
    DodajSadnicuComponent,
    DodajPreparatComponent,
    Pregled30danaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
