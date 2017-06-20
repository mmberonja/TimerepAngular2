import { Injectable,Inject } from '@angular/core';
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { User } from './models/user';
import { kkk } from './models/bz';
import { ListaProjekataModel } from './models/ListaProjekata.model';
import { ListaBazaPodaciModel } from './models/ListaBazaPodaci.model';

@Injectable()
export class ServiceTabela {

  

  constructor(private router:Router,private http: Http,@Inject('ApiEndpoint') private apiEndpoint: any) { }


     fullName(nadimak:any):Promise<User[]>{

        let token = JSON.parse(localStorage.getItem('Token'));
        //console.log("nadimak" + nadimak)
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
        return this.http.get(''+this.apiEndpoint+'puni-ime-prezime?ime='+nadimak+'',options)
              .toPromise()
              .then(data => 
                    data.json()[0].Ime_Prezime) 
     }

     projektiNaKojimaRadiKorisnik(imePrezime:any):Observable<ListaProjekataModel[]>{

         let token = JSON.parse(localStorage.getItem('Token'));
        //console.log("nadimak" + nadimak)
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
        return this.http.get(''+this.apiEndpoint+'projekti/lista/admin?ime='+imePrezime+'',options)
              .map(data =>  data.json())
               .catch(this.handleError) 
       
     }

     satnicaKorisnik(mesec:any,nadimak:any,godina:any):Observable<ListaBazaPodaciModel[]>{

         let token = JSON.parse(localStorage.getItem('Token'));
        //console.log("nadimak" + nadimak)
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
        return this.http.get(''+this.apiEndpoint+'korisnici/tabela?nadimak='+nadimak+'&mesec='+mesec+'&godina='+godina+'',options)
              .map(data =>  data.json())
               .catch(this.handleError) 
       
     }  

    proveraTokena():Promise<any>{

         let token = JSON.parse(localStorage.getItem('Token'));
         if(token == null){
             
            // this.router.navigate(['/login']);
         }
         else{

            let authHeader = new Headers(
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            );
            
            let options = new RequestOptions({ headers: authHeader })

            return this.http.get(''+this.apiEndpoint+'Sifra-Micko',options)
                .toPromise()
                .then(data => 
                data.json())//data.json() as User[]) 
                .catch( data => console.log("error")) 

        }       
      
    }

    RefresujToken(ime:any,admin:any):Observable<any>{

        return this.http.get(''+this.apiEndpoint+'refresh/token?ime='+ime+'&admin='+admin+'')
            .map(data => { 
               let user =  data.json();
               //console.log("user" + user);
               //localStorage.removeItem('Token')
               localStorage.setItem('Token', JSON.stringify(user));
        
            })
            .catch(this.handleError) 

     }

     /*
     tabela(nadimak:any,godina:number):Promise<User[]>{

         let token = JSON.parse(localStorage.getItem('Token'));
         //console.log("nadimaktabela" + nadimak)
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
         return this.http.get(''+this.apiEndpoint+'Spojeno-u-nadimak?ime='+nadimak+'&godina='+godina+'',options)
              .toPromise()
              .then(data => 
                    data.json()) 


     } */

     private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
     }

}