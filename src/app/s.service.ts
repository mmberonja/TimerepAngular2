import { Injectable,Inject } from '@angular/core';
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { User } from './models/user';
import { kkk } from './models/bz';
import { Email} from './models/email.model';
import { ProjektiSTNICA } from './models/projektiSatnica.model';
import { ListaProjekataModel } from './models/ListaProjekata.model';
import { ListaKorisnikaModel } from './models/ListaKorisnika.model';


import { PocetnaComponent } from './pocetna/pocetna.component';

@Injectable()
export class SService {

  pamti_nesto:string;
  text_izlaz:string;
  text:string;
  display: boolean = false;
  obj:string;
  data:any;  

  //private headers = new Headers({ 'Content-Type': 'application/json' });
  //private options = new RequestOptions({ headers: this.headers });

  constructor(private router:Router,private http: Http,@Inject('ApiEndpoint') private apiEndpoint: any) {

     //console.log("apiEndpoint" + this.apiEndpoint);
    /* http.get('src/config.json')
        .map(res => res.json())
        .subscribe(data => this.data = data,
            err => console.log(err),
            () => console.log('Completed'));*/
        
     }

     /*
     insert(userService: any,mesecService: any,godinaService:any,nedeljaService:any):Promise<kkk>{
        
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
        return this.http.get(''+this.apiEndpoint+'insert-u-tabelu-micko-nedelja-mesec-sati?ime='+userService+'&mesec='+mesecService+'&nedelja='+nedeljaService+'&godina='+godinaService+'',options)
              .toPromise()
              .then(data => data.json())       
     }*/
     
     //Ne koristimo
     /*
     ocitavanje(userService: any,mesecService: any,godinaService:any,nedeljaService:any):Promise<any>{
       
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
        return this.http.get(''+this.apiEndpoint+'Select-projekti-satnica-token?ime='+userService+'&mesec='+mesecService+'&nedelja='+nedeljaService+'&godina='+godinaService+'',options)
              .toPromise()
              .then(data => 
      
                  data.json()) 
     }*/

     vrednosti_baza(userService: any,mesecService: any,godinaService:any,nedeljaService:any):Promise<ProjektiSTNICA>{
       
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
        return this.http.get(''+this.apiEndpoint+'projekti?ime='+userService+'&mesec='+mesecService+'&nedelja='+nedeljaService+'&godina='+godinaService+'',options)
              .toPromise()
              .then(data => 
      
                  data.json()) 
     }

    //CuvajProjekat(userService: any,mesecService: any,godinaService:any,nedeljaService:any,idPr:any,razvoj:any,odrzavanje:any,dokumentacija:any,implementacija:any,reziski_poslovi:any):Observable<any>{
     CuvajProjekat(userService: any,mesecService: any,godinaService:any,nedeljaService:any,niz:ProjektiSTNICA):Observable<ProjektiSTNICA>{
        
        //console.log("ProjektiSTNICA" + niz.id_projekat_D);

        console.log(niz.id_pr);
        let cuvajbreee = niz;

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

         /*return this.http.get(''+this.apiEndpoint+'projekti/satnica?nedelja=4&mesec=Maj',options)
            .map(data =>  data.json())
            .catch(this.handleError)*/

        return this.http.put(''+this.apiEndpoint+'projekti?ime='+userService+'&projekat='+niz.id_pr+'&mesec='+mesecService+'&nedelja='+nedeljaService+'&godina='+godinaService+
        '&razvoj='+niz.Razvoj+'&odrzavanje='+niz.odrzavanje+'&dokumentacija='+niz.dokumentacija+'&implementacija='+niz.implementacija+'&reziskiposlovi='+niz.rezijski_poslovi+'',body,options)
              .map(data =>  data )
               .catch(this.handleError)
            
     }

     ListaProjekata():Observable<ListaProjekataModel[]>{

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

     ListaKorisnika():Observable<ListaKorisnikaModel[]>{

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

     SatnicaKorisnici():Observable<any>{

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

        return this.http.get(''+this.apiEndpoint+'projekti/satnica?nedelja=4&mesec=Maj',options)
            .map(data =>  data.json())
            .catch(this.handleError)

     }

     SatnicaKorisniciSveNedelje():Observable<any>{

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

        return this.http.get(''+this.apiEndpoint+'projekti/satnica/nedelje?mesec=januar',options)
            .map(data =>  data.json())
            .catch(this.handleError)

     }

     fullName(nadimak:any):Promise<User[]>{

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
        return this.http.get(''+this.apiEndpoint+'puni-ime-prezime?ime='+nadimak+'',options)
              .toPromise()
              .then(data => 
                    data.json()[0].Ime_Prezime) 
     }

     upisstanja(nadimak:any,projekat:any,sati:number,mesec:any,nedelja:any,godina:any):Promise<User[]>{

         let token = JSON.parse(localStorage.getItem('Token'));
         if(token == null){
             
            // this.router.navigate(['/login']);
            this.text = 'Micko';
            return this.http.get(''+this.apiEndpoint+'odjava-prazan-token')
                .toPromise()
                .then(data => data.json());

         }
         else{

            let authHeader = new Headers(
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            );
            let body = JSON.stringify({Nadimak_Klijent: nadimak, Projekti: projekat, nedelja: nedelja , mesec: mesec , broj_sati:sati,  godina: godina});
            
            let options = new RequestOptions({ headers: authHeader })
            return this.http.post(''+this.apiEndpoint+'micko/Stanje-Procedure',  body , options)
                .toPromise()
                .then(data => data.json())
         }
     }

     showDialog(){
         this.display = true;
     }    

     Obavstenje(){

         if(this.text == 'Izlogovani ste iz aplikacije!!'){

              this.router.navigate(['/login']);
              return;

         }
         else{


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

     Email(nadimak:any):Promise<Email>{

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
        return this.http.get(''+this.apiEndpoint+'korisnik/email?nadimak='+nadimak+'',options)
              .toPromise()
              .then(data => 
                    data.json())    


     }

     slanjeMejla(projekat:any,email:Email):Promise<Email>{

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
        return this.http.get(''+this.apiEndpoint+'email/?projekat='+projekat+'&email='+email+'',options)
              .toPromise()
              .then(data => 
                    data.json())    


     }



     proveraTokena():Observable<any>{

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
                .map(data =>  data.json())
               .catch(this.handleError) 

        }       
      
     }

     trenutni_mesec():Promise<any>{

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

            return this.http.get(''+this.apiEndpoint+'trenutni-mesec',options)
                .toPromise()
                .then(data => 
                data.json())//data.json() as User[]) 
                .catch( data => console.log("error")) 

        }       
      
     }

     trenutni_godina():Promise<any>{

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

            return this.http.get(''+this.apiEndpoint+'trenutna-godina',options)
                .toPromise()
                .then(data => data.json())//data.json() as User[]) 
                .catch( data => console.log("error")) 
         }
            
     }

     trenutni_nedelja():Promise<any>{
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


            return this.http.get(''+this.apiEndpoint+'trenutna-nedelja',options)
                .toPromise()
                .then(data => data.json())//data.json() as User[]) 
                .catch( data => console.log("error")) 
         }
            
     }

     private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
     }

}