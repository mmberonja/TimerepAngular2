import { Injectable,Inject } from '@angular/core';
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { User } from './models/user';
import { kkk } from './models/bz';
import { Email} from './models/email.model';
import { Godina} from './models/godina.model';
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

    vrednosti_baza(userService: any,mesecService: any,godinaService:any,nedeljaService:any):Observable<ProjektiSTNICA>{
        
        //console.log(godinaService)

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
                .map(data => 

                    data.json()) 
    }

    SaljiSve(userService: any,mesecService: any,godinaService:any,nedeljaService:any,objekti:ProjektiSTNICA):Observable<any>{

        /*console.log("Micko");
        console.log(objekti[0].Projekti);*/
        let cuvajNesto = objekti;

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

        let body = ({ Objekti : cuvajNesto });

        let options = new RequestOptions({ headers: authHeader })
        return this.http.put(''+this.apiEndpoint+'tests-insert?ime='+userService+'&mesec='+mesecService+'&nedelja='+nedeljaService+'&godina='+godinaService+'', body, options )
        //return this.http.put(''+this.apiEndpoint+'tests-insert', body)
            .map(data =>  data.json() )
            .catch(this.handleError)
    }

    //CuvajProjekat(userService: any,mesecService: any,godinaService:any,nedeljaService:any,idPr:any,razvoj:any,odrzavanje:any,dokumentacija:any,implementacija:any,reziski_poslovi:any):Observable<any>{
    CuvajProjekat(userService: any,mesecService: any,godinaService:any,nedeljaService:any,niz:ProjektiSTNICA):Observable<ProjektiSTNICA>{

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
        return this.http.get(''+this.apiEndpoint+'refresh/token?ime='+ime+'&admin='+admin+'', options)
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
        return this.http.get(''+this.apiEndpoint+'email?projekat='+projekat+'&emailsend='+email+'',options)
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

    trenutni_godina():Observable<Godina>{

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
            //.toPromise()
            .map(data => <string>data.json())//data.json() as User[]) 
            .catch(this.handleError) 
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

     /*trenutni_godina():Promise<Godina>{

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
            
     }*/

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

     /* Projekti():Observable<Admin>{

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
                
     }*/

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}