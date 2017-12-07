import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators,AbstractControl  } from '@angular/forms';
import { ActivatedRoute, Params}   from '@angular/router';
import { Location }                 from '@angular/common';
import {HostListener} from '@angular/core';
//import { CustomFormsModule } from 'ng2-validation'
import { CustomValidators } from 'ng2-validation';
import { RegistracijaService} from '../registracija.service'


@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  model: any = {};
  public RegForm: FormGroup;
  public submitted: boolean;
  public events: any[] = [];

  jednakostSifre: string;
  odgovor: any;

  display: boolean = false;
  text:string;
  widthD:number;
  x:any;
  atpos:any;
  dotpos:any;
  ispravnostMejla:boolean = true;

  textError:string;
  textErrorIzlaz:string;
  displayError:boolean = false;

  constructor( private route: ActivatedRoute,
               private location: Location,
               private formBuilder: FormBuilder,
               private registracijaService: RegistracijaService,
               private router: Router
              ) { 

               /*this.RegForm = new FormGroup({
                    field: new FormControl('', CustomValidators.range([5, 9]))
                });  */


  }

  ngOnInit() {

    this.RegForm = this.formBuilder.group({
            name   : ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            korisnk :  ['', Validators.compose([Validators.required, Validators.minLength(5)])],
            prezime : ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            emaill : ['', Validators.compose([Validators.required, Validators.minLength(5)])],
            sifra :  ['', Validators.compose([Validators.required, Validators.minLength(5)])],
            sifraPotvrda : ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });

    this.jednakostSifre = 'jeste';

    this.subcribeToFormChanges();   

  }

  showDialog() {
        this.display = true;
  }

  Brisii(){

    this.model.name = "";

  }

  save(model: any, isValid: boolean){

      console.log("model.korisnickoIme" + model.name);
      console.log("model.ime" + model.name);
      console.log("model.prezime" + model.prezime);
      console.log("model.emaill" + model.emaill)
      console.log("model.sifra" + model.sifra);
      console.log("model.sifraPotvrda" + model.sifraPotvrda);

      this.x = model.emaill;
      console.log("x" + this.x)
      this.atpos = this.x.indexOf("@");
      this.dotpos = this.x.lastIndexOf(".");
      console.log("this.atpos" + this.atpos);
      console.log("this.dotpos" + this.dotpos);

      if (this.atpos<1 || this.dotpos<this.atpos+2 || this.dotpos+2>=this.x.length) {
        //alert("Not a valid e-mail address");
        //return false;
        this.ispravnostMejla = false;
      }
      else{
        this.ispravnostMejla = true;
      }
      console.log("this.ispravnostMejla" + this.ispravnostMejla)

      if(model.sifra == model.sifraPotvrda){
        this.jednakostSifre = 'jeste';
      }
      else{
        this.jednakostSifre = 'nije';
      }

      this.submitted = true;
     
      if(isValid && this.jednakostSifre == 'jeste' && this.ispravnostMejla == true){

         console.log("Moze");

         this.registracijaService.Registracija(model.name, model.korisnk,model.prezime, model.emaill, model.sifra)
          .subscribe(
            odgovor => { this.odgovor = odgovor
                  
              console.log("odgovor" + this.odgovor)

              if(this.odgovor == 'postoji'){

                this.text = "Postoji korisnik sa tim korisničkim imenom!! Pokušaj ponovo."
                this.widthD = 500;
                this.showDialog();
                this.model.name = "";
                this.model.korisnk = "";
                this.model.prezime = "";
                this.model.emaill = "";
                this.model.sifra = "";
                this.model.sifraPotvrda = "";
                // model = {};
                  return;
              }
              else{
                this.text = "Uspešna registacija";
                this.widthD = 200;
                this.showDialog();
              }
              
            },
            error => {
                console.log("error");
                localStorage.clear();
                this.textError = 'Došlo je do greške na serveru!!'
                this.textErrorIzlaz = 'Gotovo';
                this.showDialogError();

      });
        
      }
      else{

        console.log("Ne moze");

      }

  }

  loginPage(){

    if(this.text == 'Uspešna registacija'){

        this.router.navigate(['/login']);

      }
      else{

        return;

      }   
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

  doSomething($event,value:any){
  }   
 

}
