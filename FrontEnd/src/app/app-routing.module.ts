import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { Registracija1Component } from './registracija1/registracija1.component';
import { Registracija2Component } from './registracija2/registracija2.component';
import { PoljoprivrednikComponent } from './poljoprivrednik/poljoprivrednik.component';
import { PreduzeceComponent } from './preduzece/preduzece.component';
import { DodajKorisnikaComponent } from './dodaj-korisnika/dodaj-korisnika.component';
import { AzurirajKorisnikaComponent } from './azuriraj-korisnika/azuriraj-korisnika.component';
import { ObrisiKorisnikaComponent } from './obrisi-korisnika/obrisi-korisnika.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { RasadnikComponent } from './rasadnik/rasadnik.component';
import { MagacinComponent } from './magacin/magacin.component';
import { DodajRasadnikComponent } from './dodaj-rasadnik/dodaj-rasadnik.component';
import { ProdavnicaComponent } from './prodavnica/prodavnica.component';
import { DodajSadnicuComponent } from './dodaj-sadnicu/dodaj-sadnicu.component';
import { DodajPreparatComponent } from './dodaj-preparat/dodaj-preparat.component';
import { Pregled30danaComponent } from './pregled30dana/pregled30dana.component';


const routes: Routes = [
  {path: '', component: PocetnaComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registracija1', component: Registracija1Component},
  {path: 'registracija2', component: Registracija2Component},
  {path: 'pocetna', component: PocetnaComponent},
  {path: 'poljoprivrednik', component: PoljoprivrednikComponent},
  {path: 'preduzece', component: PreduzeceComponent},
  {path: 'dodajKorisnika', component: DodajKorisnikaComponent},
  {path: 'azurirajKorisnika', component: AzurirajKorisnikaComponent},
  {path: 'obrisiKorisnika', component: ObrisiKorisnikaComponent},
  {path: 'promenaLozinke', component: PromenaLozinkeComponent},
  {path: 'rasadnik', component: RasadnikComponent},
  {path: 'magacin', component: MagacinComponent},
  {path: 'dodajRasadnik', component: DodajRasadnikComponent},
  {path: 'prodavnica', component: ProdavnicaComponent},
  {path: 'dodajSadnicu', component: DodajSadnicuComponent},
  {path: 'dodajPreparat', component: DodajPreparatComponent},
  {path: 'pregled30dana', component: Pregled30danaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
