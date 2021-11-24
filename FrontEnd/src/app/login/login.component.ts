import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { POLJOPRIVREDNICI } from '../data/POLJOPRIVREDNICI';
import { PREDUZECA } from '../data/PREDUZECA';
import { ADMINI } from '../data/ADMINI';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private servis: KorisnikService) { }

  ngOnInit(): void {
    this.servis.ucitajAdmine().subscribe((admini1) => {
      this.admini = admini1;
    })
    this.servis.ucitajPreduzeca();
  }

  admini: any = [];


  username: string;
  password: string;

  message: string;

  login() {
    if (this.emptyField(this.username) || this.emptyField(this.password)){
      this.message = 'Morate popuniti sva polja!';
      return
    }
    this.message = this.servis.login2(this.username, this.password, this.message);
 //    this.servis.login2(this.username, this.password, this.message);
 //   this.servis.login2(this.username, this.password, this.message).subscribe((message) => {
  //    this.message = message
 //  })

 

  }


  emptyField(field): boolean {
    return (field == '' || field == null);
  }

}
