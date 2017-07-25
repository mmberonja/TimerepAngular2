import { Injectable,Inject } from '@angular/core';
import { Admin } from './models/admin.model'
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { User } from './models/user'
import { kkk } from './models/bz'

@Injectable()
export class LozinkaService {

  constructor(private router:Router,private http: Http,@Inject('ApiEndpoint') private apiEndpoint: any) { }


   PromenaSifre(nadimak:any,sifraStara:any,novasifra:any):Promise<any>{

        //console.log("projekat" + projekat)
        let token = JSON.parse(localStorage.getItem('Token'));
        //console.log("token" + token)
        if(token == null){
             this.router.navigate(['/login']);
        }
        
        let authHeader = new Headers(
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        );
        let body = JSON.stringify({sifra: sifraStara});

        let options = new RequestOptions({ headers: authHeader })
        return this.http.post(''+this.apiEndpoint+'promenasifre?imeSifra='+nadimak+'&sifra='+sifraStara+'', { sifra: novasifra } ,options)
            .toPromise()
            .then(data =>  data.json())
            .catch(this.handleError)

   }


    RefresujToken(ime:any,admin:any):Observable<any>{

        let token = JSON.parse(localStorage.getItem('Token'));
        //console.log(JSON.parse(localStorage.getItem('Token')));
        if(token == null){
                this.router.navigate(['/login']);
        }
        let authHeader = new Headers(
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        );
        let options = new RequestOptions({ headers: authHeader })
        return this.http.get(''+this.apiEndpoint+'refresh/token?ime='+ime+'&admin='+admin+'',options)
            .map(data => { 
               let user =  data.json();
               //console.log("user" + user);
               //localStorage.removeItem('Token')
               localStorage.setItem('Token', JSON.stringify(user));
        
            })
            .catch(this.handleError) 
     }

   private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
   }  

}
