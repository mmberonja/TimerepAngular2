import { Injectable,Inject } from '@angular/core';
import { Admin } from './models/admin.model'
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { User } from './models/user';
import { kkk } from './models/bz';
import { ProjektiSTNICA } from './models/projektiSatnica.model';
import { ListaProjekataModel } from './models/ListaProjekata.model';
import { ListaKorisnikaModel } from './models/ListaKorisnika.model';
import { ListaBazaPodaciModel } from './models/ListaBazaPodaci.model';


@Injectable()
export class AdminService {

  /*private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });*/
  obj:any;

  constructor(private router:Router,private http: Http,@Inject('ApiEndpoint') private apiEndpoint: any) { 


      /* this.getJSON().subscribe(data => {
        this.obj=data.konfiguracija.konekcija.web;
                  //console.log("obj" + this.obj);
        }, 
        error => console.log(error));*/

  }
  

    getJSON():Observable<any>{

                return this.http.get('src/config.json')
                            .map(data => data.json())
                            .catch(this.handleError);

    }

    ListaProjekataAdmin():Observable<ListaProjekataModel[]>{

            let token = JSON.parse(localStorage.getItem('Token'));
            if(token == null){
                this.router.navigate(['/login']);
            }
            let authHeader = new Headers(
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            );

            let body = JSON.stringify({});

            let options = new RequestOptions({ headers: authHeader })

            return this.http.get(''+this.apiEndpoint+'lista/projekti',options)
                .map(data =>  data.json())
                .catch(this.handleError)

    }

    ListaKorisnikaAdmin():Observable<ListaKorisnikaModel[]>{

            let token = JSON.parse(localStorage.getItem('Token'));
            if(token == null){
                this.router.navigate(['/login']);
            }
            let authHeader = new Headers(
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            );

            let body = JSON.stringify({});

            let options = new RequestOptions({ headers: authHeader })

            return this.http.get(''+this.apiEndpoint+'korisnici',options)
                .map(data =>  data.json())
                .catch(this.handleError)

    }

    SatnicaKorisniciAdmin(Mesec:any,Nedelja:any):Observable<any>{

        // console.log("")

            let token = JSON.parse(localStorage.getItem('Token'));
            if(token == null){
                    this.router.navigate(['/login']);
            }
            let authHeader = new Headers(
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            );

            let body = JSON.stringify({});

            let options = new RequestOptions({ headers: authHeader })

            return this.http.get(''+this.apiEndpoint+'projekti/satnica?nedelja='+Nedelja+'&mesec='+Mesec+'',options)
            //return this.http.get(''+this.apiEndpoint+'projekti/satnica?nedelja=4&mesec=maj',options)
                .map(data =>  data.json())
                .catch(this.handleError)

    } 

    SatnicaKorisniciSveNedeljeAdmin(mesec:any,godina:any):Observable<ListaBazaPodaciModel>{

            let token = JSON.parse(localStorage.getItem('Token'));
            if(token == null){
                this.router.navigate(['/login']);
            }
            let authHeader = new Headers(
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            );

            let body = JSON.stringify({});

            let options = new RequestOptions({ headers: authHeader })

            return this.http.get(''+this.apiEndpoint+'projekti/satnica/nedelje?mesec='+mesec+'&godina='+godina+'',options)
                .map(data =>  data.json())
                .catch(this.handleError)

    }

    projekatKorisnici(mesec:any,projekat:any,godina:any):Observable<ProjektiSTNICA>{

            let token = JSON.parse(localStorage.getItem('Token'));
            if(token == null){
                this.router.navigate(['/login']);
            }
            let authHeader = new Headers(
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            );

            let body = JSON.stringify({});

            let options = new RequestOptions({ headers: authHeader })

            return this.http.get(''+this.apiEndpoint+'opcije/satnica/nedelje?projekat='+projekat+'&mesec='+mesec+'&godina='+godina+'',options)
                .map(data =>  data.json())
                .catch(this.handleError)

    }

    imePrezimeAktivni():Observable<Admin>{

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

            let options = new RequestOptions({ headers: authHeader })
            return this.http.get(''+this.apiEndpoint+'korisnici/aktivni',options)
                .map(data =>  data.json())
                .catch(this.handleError)
                
    }
    /*
    TabelaKorisnici(korisnik:any,godina:number):Observable<Admin>{

        let token = JSON.parse(localStorage.getItem('Token'));

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
            return this.http.get(''+this.apiEndpoint+'Spojeno-u-nadimak-tabela-nije-admin?ime='+korisnik+'&godina='+godina+'',options)
                .map(data => data.json())
                .catch(this.handleError)

    }*/

    Projekti():Observable<Admin>{

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

            let options = new RequestOptions({ headers: authHeader })
            return this.http.get(''+this.apiEndpoint+'projekti/lista',options)
                .map(data =>  data.json())
                .catch(this.handleError)
                
    }
    
    /*
    TabelaProjekti(projekti:string,godina:number):Observable<Admin>{

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

            let options = new RequestOptions({ headers: authHeader })
            return this.http.get(''+this.apiEndpoint+'Za-dati-projekat-korisnici-koji-rade-na-njemu?projekat='+projekti+'&godina='+godina+'',options)
                .map(data =>  data.json())
                .catch(this.handleError)

    }*/

    DodavanjeNovogProjekta(projekat:any):Observable<any>{

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
            let body = JSON.stringify({Projekat: projekat});

            let options = new RequestOptions({ headers: authHeader })
            return this.http.post(''+this.apiEndpoint+'projekat/novi', body ,options)
                .map(data =>  data.json())
                .catch(this.handleError)

    }

    PopunjavanjeDropDownDodavanjeNaProjekat(Nadimak:any):Observable<Admin>{

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
            //let body = JSON.stringify({Nadimak: Nadimak,Projekat: Projekat,godina: godina});

            let options = new RequestOptions({ headers: authHeader })
            return this.http.get(''+this.apiEndpoint+'korisnici/pr/nerade?ime='+Nadimak+'' ,options)
                .map(data =>  data.json())
                .catch(this.handleError)


    }

    DodavanjeKorisnikaNaProjekat(Nadimak:any,Projekat:string,godina:number):Observable<Admin>{
        
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
            let body = JSON.stringify({Nadimak: Nadimak,Projekat: Projekat,godina: godina});

            let options = new RequestOptions({ headers: authHeader })
            return this.http.post(''+this.apiEndpoint+'projekat/admin', body ,options)
                .map(data =>  data.json())
                .catch(this.handleError)

    }

    PopunjavanjeDropDownUklanjanjeSaProjekta(Nadimak:any):Observable<Admin>{

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

            let options = new RequestOptions({ headers: authHeader })
            return this.http.get(''+this.apiEndpoint+'projekti/lista/admin?ime='+Nadimak+'',options)
                .map(data =>  data.json())
                .catch(this.handleError)

    }

    BrisanjeKorisnikaSaProjekta(Nadimak:any,Projekat:string):Observable<Admin>{
        
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

            let options = new RequestOptions({ headers: authHeader })
            return this.http.delete(''+this.apiEndpoint+'projekat/admin?NadimakBrisanje='+Nadimak+'&ProjekatBRisanje='+Projekat+'' ,options)
                .map(data =>  data.json())
                .catch(this.handleError)

    }

    Deaktivacija(Nadimak:any):Observable<Admin>{

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

            let body = JSON.stringify({});

            let options = new RequestOptions({ headers: authHeader })
            return this.http.put(''+this.apiEndpoint+'korisnik/deaktivacija?Nadimak_Klijent='+Nadimak+'' ,body,options)
                .map(data =>  data.json())
                .catch(this.handleError)

    }

    ImePrezimeNeAktivni():Observable<Admin>{

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

            let options = new RequestOptions({ headers: authHeader })
            return this.http.get(''+this.apiEndpoint+'korisnici/neaktivni',options)
                .map(data =>  data.json())
                .catch(this.handleError)

    }

    Aktivacija(Nadimak:any):Observable<Admin>{

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

            let body = JSON.stringify({});

            let options = new RequestOptions({ headers: authHeader })
            return this.http.put(''+this.apiEndpoint+'korisnik/aktivacija?Nadimak_Klijent='+Nadimak+'' ,body,options)
                .map(data =>  data.json())
                .catch(this.handleError)

    }

    /*trenutni_mesec():Promise<any>{
            
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

        let options = new RequestOptions({ headers: authHeader })

        return this.http.get(''+this.apiEndpoint+'trenutni-mesec',options)
            .toPromise()
            .then(data => 
            data.json())//data.json() as User[]) 
            .catch( data => console.log("error")) 
        
    }*/

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
               //localStorage.removeItem('Token')
               localStorage.setItem('Token', JSON.stringify(user));
            })
            .catch(this.handleError) 
     }

     trenutni_godina():Promise<any>{

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

        let options = new RequestOptions({ headers: authHeader })

        return this.http.get(''+this.apiEndpoint+'trenutna-godina',options)
            .toPromise()
            .then(data => data.json())//data.json() as User[]) 
            .catch( data => console.log("error")) 
            
     }

   /*AddUserService(usercreds){

        let token = JSON.parse(localStorage.getItem('Token')); 

        let authHeader = new Headers(
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        );
        let options = new RequestOptions({ headers: authHeader });

        return this.http.post(''+this.apiEndpoint+'aktivacija-korisnik-nadimak?Nadimak_Klijent=' ,options)
            .map(data =>  data.json())
            .catch(this.handleError)

   }*/

   private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
   }       

}
