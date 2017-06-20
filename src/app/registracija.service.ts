import { Injectable,Inject } from '@angular/core';
import { Admin } from './models/admin.model'
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { User } from './models/user';
import { kkk } from './models/bz';
import { Registracija } from './models/registracija.model';

@Injectable()
export class RegistracijaService {

  constructor(private router:Router,private http: Http,@Inject('ApiEndpoint') private apiEndpoint: any) { }

  Registracija(Ime:any,Nadimak:any,Prezime:any,Email:any,Sifra:any):Observable<Registracija>{

      console.log("ime" + Ime);
      console.log("nadimak" + Nadimak);
      console.log("prezime" + Prezime);
      console.log("email" + Email);
      console.log("sifra" + Sifra);

      let body = JSON.stringify({ime:'Micko',nadimak:Nadimak,prezime:Prezime,email:Email,sifra:Sifra});

      return this.http.post(''+this.apiEndpoint+'PrijavaKorisnika', {ime:Ime,nadimak:Nadimak,prezime:Prezime,email:Email,sifra:Sifra})
              .map(data => data.json())//data.json() as User[]) 
              .catch(this.handleError)
        
     }

      private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
   }   

}
