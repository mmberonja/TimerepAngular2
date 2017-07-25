import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params,Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import { AuthenticationService } from '../authentication.service'
import { Http, Headers, Response } from '@angular/http';
import { User } from '../models/user'
import { kkk } from '../models/bz';
import { ButtonModule,DialogModule } from 'primeng/primeng'; 
import { ConfirmDialogModule,ConfirmationService } from 'primeng/primeng';
import { CalendarModule} from 'primeng/primeng';
import { SpinnerModule} from 'primeng/primeng';

import { FormGroup, FormControl, FormBuilder, Validators,AbstractControl  } from '@angular/forms';
import { HostListener} from '@angular/core';
import { CustomValidators } from 'ng2-validation';
import {Observable} from 'rxjs/Rx';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    model: any = {};
    mesecNg: any = {};
    name = 'Angular';
    h1 = 'TO-NET'
    nullMicko = 'Micko';
    nesto:string[];
    podaci: any;
    users: User[] = [];
    users_iscitavanje: any;
    mesec: User[] = [];
    //users: any[];
    prolaz_sifre:any;
    display: boolean = false;
    displayDialog:boolean = false;
    val4: number = 0;

    //Dodavanje slike
    public fullPath:string;
    public myPicture:string;

    base64Url:any;
    base64:any;
    ispisToken:any;
    tokenAdmin:any;
    message:any;

    public RegForm: FormGroup;
    public submitted: boolean;
    public events: any[] = [];

    text:string;
    textUsr:string;
    textPsw:string;

    textError:string;
    textErrorIzlaz:string;
    displayError:boolean = false;

    flgLoadingHome:boolean = true;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private authenticationService: AuthenticationService,
        private confirmationService: ConfirmationService,
        private formBuilder: FormBuilder
    ){  

     }

    ngOnInit(){

        if(JSON.parse(localStorage.getItem('Token')) != null)
        {   
            //console.log("firstpage")
            this.router.navigate(['/firstpage']);
        }
        else{
            //console.log("login")
            this.router.navigate(['/login']);
        }

        this.text = '';
        this.textUsr = '';
        this.textPsw = '';

        this.RegForm = this.formBuilder.group({
            username   : ['', Validators.compose([Validators.required, Validators.minLength(0)])],
            password :  ['', Validators.compose([Validators.required, Validators.minLength(0)])],
            
        });

        this.subcribeToFormChanges();   

    } 

    ParsirajJWTVreme (token) {

        this.base64Url = token.split('.')[1];
        this.base64 = this.base64Url.replace('-', '+').replace('_', '/');
        this.ispisToken = JSON.parse(window.atob(this.base64));
        //console.log(this.ispisToken);

    }

    subcribeToFormChanges(){

        const myFormStatusChanges$ = this.RegForm.statusChanges;
        const myFormValueChanges$ = this.RegForm.valueChanges;
        /*console.log("myFormStatusChanges$" +  myFormStatusChanges$)
        console.log("myFormValueChanges$" +  myFormValueChanges$)*/
        
        myFormStatusChanges$.subscribe(x => this.events.push({ 
          event: 'STATUS_CHANGED', object: x,
          //nesto: console.log("x" + x) 
        }));
        myFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x, //nesto: console.log("x" + x)
       }));

    }

    showDialogToAdd(){

       this.displayDialog = true;

    }

    Registracija(){
        this.router.navigate(['/registracija']);
    }

    login(model: any, isValid: boolean){   
       
      this.submitted = true;  

      if(isValid){

        //Ako ima token a hocemo opet da se prijavimo,ovde treba da dodam jos jedan uslov!!  
        console.log("Token" + JSON.parse(localStorage.getItem('Token')));
        if(JSON.parse(localStorage.getItem('Token')) != null){

            console.log("token postoji!!!");
            this.router.navigate(['/firstpage']);
            return;

        }
        else if(JSON.parse(localStorage.getItem('Token')) == null){
            this.flgLoadingHome = false;

            if(this.model.username && this.model.password){
                this.authenticationService.loginService(this.model.username,this.model.password)
                    .then(
                        users => { this.users = users

                            this.prolaz_sifre = this.users;
                            //console.log("this.prolaz_sifre" + this.prolaz_sifre);
                            if(this.prolaz_sifre == "Nije dobra Sifra"){
                                //this.flgLoadingHome = true;
                                this.model.password='';
                                console.log("Nije dobra sifra");
                                this.textPsw = "Nije dobra šifra!!";
                                this.flgLoadingHome = true;

                            }
                            else if(this.prolaz_sifre == "Nije dobro Ime"){
                                this.model.username='';
                                console.log("Nije dobrokorisnicko ime");
                                this.textUsr = "Nije dobro korisničko ime!!";
                                this.flgLoadingHome = true;
                            }
                            else if(this.prolaz_sifre == "Neaktivni ste!!!"){
                                //this.flgLoadingHome = true;
                                //this.model.password=''
                                //this.model.username=''
                                console.log("Niste aktivni!!");
                                this.textUsr = "Neaktivni ste!!";
                                this.textPsw = "Neaktivni ste!!";
                                this.flgLoadingHome = true;         
                            }
                            else{
                                
                                console.log("false" + this.flgLoadingHome)
                                if(this.users == {}){
                                   
                                }
                                else{
                                    
                                    //this.flgLoadingHome = true;

                                }
                                //this.router.navigate(['/firstpage']);
                            }
                        },
                    error => {
                        console.log("error");
                        console.log("error");
                        localStorage.clear();
                        this.textError = 'Došlo je do greške na serveru!!'
                        this.textErrorIzlaz = 'Gotovo';
                        this.showDialogError();
                });

               /* this.authenticationService.trenutni_mesec()
                    .then(
                            mesec => { this.mesec = mesec
                                //this.router.navigate(['/firstpage']);   
                            },
                            error => {
                                console.log("error");
                                console.log("error");
                                localStorage.clear();
                                this.textError = 'Došlo je do greške na serveru!!'
                                this.textErrorIzlaz = 'Gotovo';
                                this.showDialogError();
                            });  */          


                    
            }
            else{
                console.log("Page")
                return;
            }
      }
     }
    }

    showDialogError() {
        console.log("Usaooo")
        this.displayError = true;
    }

    Izlaz(){

        if(this.textError == 'Došlo je do greške na serveru!!'){

           console.log("Mickoasadasasa")            
           this.router.navigate(['/login']);

        }

    } 
    
}
