import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators,AbstractControl  } from '@angular/forms';
import { ActivatedRoute, Params,Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import {HostListener} from '@angular/core';
import { CustomValidators } from 'ng2-validation';
import { LozinkaService} from '../lozinka.service';
import { User } from '../models/user';

@Component({
  selector: 'app-lozinka',
  templateUrl: './lozinka.component.html',
  styleUrls: ['./lozinka.component.css']
})
export class LozinkaComponent implements OnInit,OnDestroy {

  model: any = {};
  public RegForm: FormGroup;
  public submitted: boolean;
  public events: any[] = [];

  odgovorLozinka:any;
  currentUser_lozinka:any;
  text:string;
  text_izlaz_lozinka:string;
  display: boolean = false;
  valueSize: number = 500;

  textError:string;
  textErrorIzlaz:string;
  displayError:boolean = false; 
  interval:any;
  pamtiToken:any;

  currentUser_ne:User[] = [];

  base64Url:any;
  base64:any;
  ispisToken:any;
  tokenAdmin:any;
  message:any; 

  constructor(private route: ActivatedRoute,
               private location: Location,
               private formBuilder: FormBuilder,
               private lozinkService: LozinkaService,
               private router : Router

  ) { }

  ngOnDestroy(){

    //console.log("ngOnDestroy")
    clearInterval(this.interval);

  }

  ngOnInit() {

    //console.log("ngOnInit")
    this.interval = setInterval(() => { 
      console.log("Lozinka!!");

      this.currentUser_ne = JSON.parse(localStorage.getItem('currentUser'));
      this.tokenAdmin = this.ParsirajJWT(JSON.parse(localStorage.getItem('Token')));

      this.lozinkService.RefresujToken(this.currentUser_ne,this.tokenAdmin)
        .subscribe(
            pamtiToken => { this.pamtiToken = pamtiToken
          },
        error => {                     
      });
    }, 1000 * 5 * 60 * 60 );
    

    this.RegForm = this.formBuilder.group({
            starasifra   : ['', Validators.compose([Validators.required, Validators.minLength(0)])],
            novasifra : ['', Validators.compose([Validators.required, Validators.minLength(0)])],
            potvrdasifra : ['', Validators.compose([Validators.required, Validators.minLength(0)])],
    });

    this.currentUser_lozinka = JSON.parse(localStorage.getItem('currentUser'));
    //console.log("this.currentUser_lozinka" + this.currentUser_lozinka);

    this.subcribeToFormChanges();  

    if(JSON.parse(localStorage.getItem('Token')) == null){

        //console.log("Nemaaa nistaa");
        this.router.navigate(['/login']);
        return;

    } 

  }

  ParsirajJWT (token) {

     
      if(token == null){

        console.log("split1");
        //this.router.navigate(['/login']);
        return;

      } 
      else{

        //console.log("split2");
        this.base64Url = token.split('.')[1];
        this.base64 = this.base64Url.replace('-', '+').replace('_', '/');
        this.ispisToken = JSON.parse(window.atob(this.base64));
        
        return this.ispisToken.admin;

      }

  }

  save(model: any, isValid: boolean){

    if(JSON.parse(localStorage.getItem('Token')) == null){

            console.log("Izlogovani ste!!");
            this.router.navigate(['/login']);
            return;

    }
    else{
      this.submitted = true;

      console.log("starasifra" + this.model.starasifra);
      console.log("novasifra" + this.model.novasifra);
      console.log("potvrdasifra" + this.model.potvrdasifra);

          if(isValid){

              if(this.model.starasifra == this.model.novasifra){

                console.log("Nova i stara sofra su iste!!");
                this.text = 'Nova i stara šifra su jednake!!';
                this.text_izlaz_lozinka = 'Izlaz';
                this.showDialog();
                return;

              }


              if(this.model.novasifra != this.model.potvrdasifra){

                console.log("Sifre nisu jednake!!");
                this.text = 'Šifre nisu jednake!!';
                this.text_izlaz_lozinka = 'Izlaz';
                this.showDialog();
                return;

              }

              else{

              this.lozinkService.PromenaSifre( this.currentUser_lozinka,this.model.starasifra,this.model.novasifra)
                  .then(
                      odgovorLozinka => { this.odgovorLozinka = odgovorLozinka

                              console.log("this.odgovorLozinka" + this.odgovorLozinka);

                              if(this.odgovorLozinka == 'Nijeeeeeeee dobra sifraaa')
                              { 

                                this.text = 'Nije dobra stara šifra!!';
                                this.text_izlaz_lozinka = 'Izlaz';
                                this.showDialog(); 
                              }
                              else{

                                console.log("Odicnoooooooo!!!");
                                this.text = 'Uspešno promenjena šifra';
                                this.text_izlaz_lozinka = 'Gotovo';
                                this.showDialog(); 
                                //this.router.navigate(['/firstpage']);

                              }


                      },error => {
                            console.log("error");
                            localStorage.clear();
                            this.textError = 'Došlo je do greške na serveru!!'
                            this.textErrorIzlaz = 'Gotovo';
                            this.showDialogError();      
                                
              }); 
            
            }
      
      } 
    }
  }

  FirstPage(){

    if(this.text_izlaz_lozinka == 'Gotovo'){

      this.router.navigate(['/firstpage']);

    }
    else{

      return;

    }    
    

  }

  Sifre(){

    
      /*this.lozinkService.PromenaSifre('12345')
           .then(
              odgovorLozinka => { this.odgovorLozinka = odgovorLozinka

                      console.log("this.odgovorLozinka" + this.odgovorLozinka)
                     
                           
      });*/
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

  showDialog() {
        this.display = true;
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
