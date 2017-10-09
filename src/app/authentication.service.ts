import { Injectable,Inject } from '@angular/core';
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { User } from './models/user'
import { kkk } from './models/bz'
import 'rxjs/add/operator/catch';
//import '../config.json';

@Injectable()
export class AuthenticationService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });
  pamti_korisnik:any;
  pamti_sifru:any;
  data: Object;
  obj:string;

  constructor(private router:Router,private http: Http,@Inject('ApiEndpoint') private apiEndpoint: any) {

  }

  getJSON(){
    return this.http.get('src/config.json')
      .map(data => data.json())
      .catch(this.handleError);

  }

  loginService(userService: any,passwordService: any):Promise<User[]>{

      return this.http.get(''+this.apiEndpoint+'korisnici-transakciju/inf?ime='+userService+'&sifra='+passwordService+'')
          .toPromise()  
          .then(data =>  { 

            localStorage.clear();    
            let user =  data.json();
        
            if (user && user.Token) {
              localStorage.setItem('currentUser', JSON.stringify(user.Podaci[0].Nadimak_Klijent));
              localStorage.setItem('Token', JSON.stringify(user.Token));
              localStorage.setItem('currentWeek', JSON.stringify(user.seciNedelja));
              this.router.navigate(['/firstpage']);
            }
            else{//Ako nije dobra sifra ili lozinka
              return data.json();
            }
          })
          .catch(this.handleError);
  }

  trenutni_godina():Promise<any>{
      return this.http.get(''+this.apiEndpoint+'trenutna-godina')
            .toPromise()
            .then(data => data.json())//data.json() as User[]) 
            .catch( data => console.log("error")) 
      
  }

  trenutni_nedelja():Promise<any>{
      return this.http.get(''+this.apiEndpoint+'trenutna-nedelja')
            .toPromise()
            .then(data => data.json())//data.json() as User[]) 
            .catch( data => console.log("error")) 
      
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  /*Optimizam():Promise<any>{
      //console.log("this.objasasasasa" + this.obj)
      return this.http.get(''+this.apiEndpoint+'niz')
        .toPromise()
        .then(data => data.json())//data.json() as User[]) 
        .catch( data => console.log("error")) 
  }*/

  /*loginService(userService: any,passwordService: any):Observable<User[]>{

      return this.http.get('http://localhost:3090/korisnici-transakciju/inf?ime='+userService+'&sifra='+passwordService+'')  
      .map(data => {  data.json()
            
        let user =  data.json();
        console.log("data.json() " + user)
        if (user && user.Token) {

          localStorage.setItem('currentUser', JSON.stringify(user.Podaci[0].Nadimak_Klijent));
          localStorage.setItem('Token', JSON.stringify(user.Token));
          localStorage.setItem('currentWeek', JSON.stringify(user.seciNedelja));
          this.router.navigate(['/firstpage']);

        }
        
      })
      .catch(this.handleError);
  }*/
    
  /*trenutni_mesec():Promise<any>{

    console.log("this.objasasasasa" + this.obj)
    return this.http.get(''+this.apiEndpoint+'trenutni-mesec')
      .toPromise()
      .then(data => data.json())//data.json() as User[]) 
      .catch( data => console.log("error")) 
      
  }*/

}
