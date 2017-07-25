import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceTabela } from '../service.tabela';
import { ActivatedRoute, Params,Router }   from '@angular/router';
import { DataTableModule,SharedModule} from 'primeng/primeng';
import { FooterOstaloComponent } from '../footer-ostalo/footer-ostalo.component';
import {SpinnerModule} from 'primeng/primeng';
import { HeaderComponent } from '../header/header.component';
import { ListaProjekataModel } from '../models/ListaProjekata.model';
import { ListaBazaPodaciModel } from '../models/ListaBazaPodaci.model';
import { Directive, ElementRef, HostListener, Input,Renderer } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { User } from '../models/user';


@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit,OnDestroy {

  nadimak_tabela:any;
  fullname_baza_tabela:any;
  podaci_tabela:any;
  selectedGodinaTabelaKorisnik:any;
  deviceObjects = [{name: 'Januar'}, {name: 'Februar'}, {name: 'Mart'},{name:'April'},
      {name: 'Maj'},{name:'Jun'},{name:'Jul'},{name:'Avgust'},{name:'Septembar'},{name:'Oktobar'},{name:'Novembar'},{name:'Decembar'}];
  selectedMesecTabela:any;
  projekti:ListaProjekataModel[] = [];
  satnica:ListaBazaPodaciModel[] = [];
  projektiObjekiNedelje:any[] = [];
  odaberi_mesec:string; 
  odaberi_godina:string;
  izabrani_mesec:number;
  izbrana_godina:number;
  pamti_nedelje:any;
  lista_broja_nedelja:any;
  objekti_nedelje = [];
  first_day_of_month:any;
  first_week_number:number;
  yearStart:any; 
  last_day_of_month:any;
  last_week_number:any;
  razlika:number;
  prva_nedelja:number;
  poslednja_nedelja:number;
  sumNedelja:any[] = [];    
  message:any;    
  proveraTokena:any = [{}]
  NizObjekiNedelje:any[] = [];
  sumProjekti:any[] = [];

//Greska na serveru,pukao serveru
  textError:string;
  textErrorIzlaz:string;
  display:boolean = false;
  interval:any;
  pamtiToken:any;

  NizObject:any;

  base64Url:any;
  base64:any;
  ispisToken:any;
  tokenAdmin:string;
  currentUser_ne:User[] = [];

  constructor(private router: Router,
              private serviceTabela : ServiceTabela,
              private el: ElementRef,
              public renderer: Renderer) 
    { 


      this.NizObject = [{ 
            Project:'Erviko',nedelja1:1,nedelja2:2,nedelja3:3,nedelja4:4,nedelja5:5,nedelja6:6
      }]     
    }

  ngOnDestroy(){

        console.log("ngOnDestroy")
        clearInterval(this.interval);

  }  

  ngOnInit() {

    this.interval = setInterval(() => { 
          console.log("Tabela!!");

          this.currentUser_ne = JSON.parse(localStorage.getItem('currentUser'));
          this.tokenAdmin = this.ParsirajJWT(JSON.parse(localStorage.getItem('Token')));

          this.serviceTabela.RefresujToken(this.currentUser_ne,this.tokenAdmin)
            .subscribe(
              pamtiToken => { this.pamtiToken = pamtiToken
                
              },
              error => {                     
          });
    }, 1000 * 5 * 60 * 60 );//1000 * 5 * 60 * 60 = 5h

    this.selectedMesecTabela = this.deviceObjects[0].name;
    this.broj_nedelja_za_dati_mesec();

    this.selectedGodinaTabelaKorisnik = new Date().getFullYear();
    /*this.selectedGodina = this.currentYear_B;*/

    this.nadimak_tabela = JSON.parse(localStorage.getItem('currentUser'));
    //console.log("this.nadimak" + this.nadimak_tabela)
    this.serviceTabela.fullName(this.nadimak_tabela)
        .then(

          fullname_baza_tabela => { this.fullname_baza_tabela= fullname_baza_tabela

           this.serviceTabela.projektiNaKojimaRadiKorisnik(this.nadimak_tabela)
                    .subscribe(

                //console.log(this.satnica);
                projekti => { this.projekti= projekti

                 //console.log(projekti);
               
                 this.serviceTabela.satnicaKorisnik(this.selectedMesecTabela,this.nadimak_tabela,this.selectedGodinaTabelaKorisnik)
                    .subscribe(      

                        satnica => { this.satnica= satnica

                        //console.log(this.satnica);

                        this.broj_nedelja_za_dati_mesec();

                        for(let ar in this.projektiObjekiNedelje){//Brisanje Niza-objekata!!!

                            var index = this.projektiObjekiNedelje.indexOf(this.projektiObjekiNedelje[ar]);
                            //console.log("NizObjectIndex" + index);
                            this.projektiObjekiNedelje.splice(index, this.projektiObjekiNedelje.length);

                        }

                        for (let pr of this.projekti) {
                            let y = {};
                            y['Projekti'] = pr.Projekti;
                            for (let kor of this.NizObjekiNedelje) {
                              y[kor.Oznaka] = null;
                            }
                            this.projektiObjekiNedelje.push(y);
                          
                        }
                        //console.log(this.projektiObjekiNedelje);

                        for(let pr in this.projektiObjekiNedelje){
                        //for(let pr = 0; pr < 2 ; pr++){  
                            
                            for (let sat of this.satnica) {//kor.Oznaka
                              
                              if(this.projektiObjekiNedelje[pr]['Projekti'] == sat.Projekti){ 
                                this.projektiObjekiNedelje[pr][sat.nedelja+".Nedelja"] = sat.sum;
                              }
                          }
                        }

                        for(let ar in this.sumNedelja){//Brisanje Niza-objekata!!!

                            var index = this.sumNedelja.indexOf(this.sumNedelja[ar]);
                            //console.log("NizObjectIndex" + index);
                            this.sumNedelja.splice(index, this.sumNedelja.length);

                        }
                        
                        for(let pr in this.NizObjekiNedelje){
                            this.sumNedelja[pr] = 0;
                        }

                        for(let ned in this.NizObjekiNedelje){
                        //for(let ned = 0; ned < 1 ; ned++){  
                          //console.log("usaoo" + this.NizObjekiNedelje[ned].Oznaka);
                          for(let pr in this.projektiObjekiNedelje){

                            this.sumNedelja[ned] = this.projektiObjekiNedelje[pr][this.NizObjekiNedelje[ned].Oznaka] +  this.sumNedelja[ned];
                            //console.log(this.projektiObjekiNedelje[pr]['1.Nedelja'])

                          }
                        }


                        //sumProjekti
                        for(let pr in this.projektiObjekiNedelje){
                        //for(let h=0;h<1;h++){  
                          //console.log("pr" + pr);
                          this.sumProjekti[pr] = 0;
                          this.projektiObjekiNedelje[pr]['Ukupno'] = this.sumProjekti[pr];
                          for(let i=0;i<this.NizObjekiNedelje.length - 1;i++){
                            //console.log("i" + i)
                            let z = 1;
                            z = z + i;
                            this.sumProjekti[pr] = this.projektiObjekiNedelje[pr][z+".Nedelja"] + this.sumProjekti[pr];
                          }
                          this.projektiObjekiNedelje[pr]['Ukupno'] = this.sumProjekti[pr];
                        }

                    },
                    error => {
                      console.log("error");
                                  
              });
          },
                error => {
                  console.log("error");
                              
          });
      },
      error => {
        console.log("error");
        localStorage.clear();
        this.textError = 'Došlo je do greške na serveru!!'
        this.textErrorIzlaz = 'Gotovo';
        this.showDialog();
    });     

    /*this.serviceTabela.fullName(this.nadimak_tabela)
            .then(
                    fullname_baza_tabela => { this.fullname_baza_tabela= fullname_baza_tabela
                    console.log(this.fullname_baza_tabela)

                    this.serviceTabela.tabela(this.fullname_baza_tabela,this.selectedGodinaTabelaKorisnik)
                          .then(
                                podaci_tabela => { this.podaci_tabela= podaci_tabela
                                console.log("this.podaci_tabela" + this.podaci_tabela)


                    },
                    error => {
                        console.log("error")
                         localStorage.clear();
                         this.textError = 'Došlo je do greške na serveru!!'
                         this.textErrorIzlaz = 'Gotovo';
                         this.showDialog();
                    });   



                  },
                  error => {
                      console.log("error");
                      localStorage.clear();
                      this.textError = 'Došlo je do greške na serveru!!'
                      this.textErrorIzlaz = 'Gotovo';
                      this.showDialog();
    });*/

    //Zastita ako je odjavljen korisnik iz nekog drugog taba da ne moze da dalje radi u aplikaciji!!
    if(JSON.parse(localStorage.getItem('Token')) == null){

        //console.log("Nemaaa nistaa");
        this.router.navigate(['/login']);
        return;

    }   

  }

  ParsirajJWT (token) {

		this.base64Url = token.split('.')[1];
    this.base64 = this.base64Url.replace('-', '+').replace('_', '/');
		this.ispisToken = JSON.parse(window.atob(this.base64));
    
		return this.ispisToken.admin;

	}

  broj_nedelja(month:number,year:any){

    var year = year || new Date().getFullYear();
		this.yearStart = new Date(year,0,1); // 1st Jan of the Year

    this.first_day_of_month = new Date(year, month , 1);
    this.first_week_number = Math.ceil((((this.first_day_of_month - this.yearStart) / 86400000) +this.yearStart.getDay()+ 1)/7);//Prva nedelja u mesecu

		this.last_day_of_month = new Date(year, month+1, 0); // Last date of the Month
		this.last_week_number = Math.ceil(( ( (this.last_day_of_month - this.yearStart) / 86400000) + this.yearStart.getDay()+ 1)/7);//Poslednja nedelja u mesecu

		this.razlika = (this.last_week_number - this.first_week_number) + 1;//10-6 u Februaru
	  this.poslednja_nedelja = this.razlika;
		this.prva_nedelja = 1;
 
		return  [this.prva_nedelja, this.poslednja_nedelja];

  }

  broj_nedelja_za_dati_mesec(){

      this.odaberi_mesec = this.selectedMesecTabela;
      this.odaberi_godina = this.selectedGodinaTabelaKorisnik;

      if( this.odaberi_mesec  == 'Januar'){this.izabrani_mesec = 0;}
      else if( this.odaberi_mesec  == 'Februar'){ this.izabrani_mesec = 1;}
      else if( this.odaberi_mesec  == 'Mart'){this.izabrani_mesec = 2;}
      else if( this.odaberi_mesec  == 'April'){this.izabrani_mesec = 3;}
      else if( this.odaberi_mesec  == 'Maj'){this.izabrani_mesec = 4;}
      else if( this.odaberi_mesec  == 'Jun'){this.izabrani_mesec = 5;}
      else if( this.odaberi_mesec  == 'Jul'){this.izabrani_mesec = 6}
      else if( this.odaberi_mesec  == 'Avgust'){this.izabrani_mesec = 7;}
      else if( this.odaberi_mesec  == 'Septembar'){this.izabrani_mesec = 8;}
      else if( this.odaberi_mesec  == 'Oktobar'){this.izabrani_mesec = 9;}
      else if( this.odaberi_mesec  == 'Novembar'){this.izabrani_mesec = 10;}
      else if( this.odaberi_mesec  == 'Decembar'){this.izabrani_mesec = 11;}
      else{ this.izabrani_mesec = 20;}

      var datum_sada_prijava = new Date()
		  var trenutna_godina_prijava = datum_sada_prijava.getFullYear()

      this.pamti_nedelje = this.broj_nedelja( this.izabrani_mesec,this.odaberi_godina)

      var brojac = 0
      for(var index = this.pamti_nedelje[0]; index<=this.pamti_nedelje[1]; index++){

          this.lista_broja_nedelja = index;
         
			}
      for(var i = 1; this.lista_broja_nedelja >= i ; i++){

           this.objekti_nedelje[i-1] = i
         
      }

       //let x = [];

       for(let ar in this.NizObjekiNedelje){//Brisanje Niza-objekata!!!

          let index = this.NizObjekiNedelje.indexOf(this.NizObjekiNedelje[ar]);
          //console.log("NizObjectIndex" + index);
          this.NizObjekiNedelje.splice(index, this.NizObjekiNedelje.length);

       }

       for (let pr of this.objekti_nedelje) {
          let y = {};
          y['Nedelja'] = 'nedelja' + pr;
          y['Oznaka'] = pr + ".Nedelja";
          /*for (let kor of this.objekti_nedelje) {
            y[kor] = null;
          }*/
          this.NizObjekiNedelje.push(y);
         
       }
       let z = {};

       z['Nedelja'] = null;
       z['Oznaka'] = "Ukupno";

       this.NizObjekiNedelje.push(z);

       console.log(this.NizObjekiNedelje);

  }

  brisanje_vrednosti_iz_selecta(){
     //this.lista_broja_nedelja = 0
     for(var i = 0; this.lista_broja_nedelja >= i ; i++){
        this.objekti_nedelje.splice(this.objekti_nedelje.indexOf(i), 1);
     }
     /*for(var i = 0; this.lista_broja_nedelja_ngModel >= i ; i++){
        this.objekti_nedelje_ngModel.splice(this.objekti_nedelje_ngModel.indexOf(i), 1);
     }*/

     
  }

  odabraniMesecTabela(){

    this.brisanje_vrednosti_iz_selecta()
    this.broj_nedelja_za_dati_mesec();

    this.serviceTabela.fullName(this.nadimak_tabela)
        .then(

          fullname_baza_tabela => { this.fullname_baza_tabela= fullname_baza_tabela

           this.serviceTabela.projektiNaKojimaRadiKorisnik(this.nadimak_tabela)
                    .subscribe(

                //console.log(this.satnica);
                projekti => { this.projekti= projekti
               
                 this.serviceTabela.satnicaKorisnik(this.selectedMesecTabela,this.nadimak_tabela,this.selectedGodinaTabelaKorisnik)
                    .subscribe(      

                        satnica => { this.satnica= satnica

                        //console.log(this.projekti);
                        this.broj_nedelja_za_dati_mesec();

                        for(let ar in this.projektiObjekiNedelje){//Brisanje Niza-objekata!!!

                            var index = this.projektiObjekiNedelje.indexOf(this.projektiObjekiNedelje[ar]);
                            //console.log("NizObjectIndex" + index);
                            this.projektiObjekiNedelje.splice(index, this.projektiObjekiNedelje.length);

                        }

                        for (let pr of this.projekti) {
                            let y = {};
                            y['Projekti'] = pr.Projekti;
                            for (let kor of this.NizObjekiNedelje) {
                              y[kor.Oznaka] = null;
                            }
                            this.projektiObjekiNedelje.push(y);
                          
                        }
                        //console.log(this.projektiObjekiNedelje);

                        for(let pr in this.projektiObjekiNedelje){
                        //for(let pr = 0; pr < 2 ; pr++){  
                            for (let sat of this.satnica) {//kor.Oznaka
                              
                              if(this.projektiObjekiNedelje[pr]['Projekti'] == sat.Projekti){ 
                                this.projektiObjekiNedelje[pr][sat.nedelja+".Nedelja"] = sat.sum;
                              }
                          }
                        }

                        for(let ar in this.sumNedelja){//Brisanje Niza-objekata!!!

                            var index = this.sumNedelja.indexOf(this.sumNedelja[ar]);
                            //console.log("NizObjectIndex" + index);
                            this.sumNedelja.splice(index, this.sumNedelja.length);

                        }

                        for(let pr in this.NizObjekiNedelje){

                            this.sumNedelja[pr] = 0;

                        }

                        for(let ned in this.NizObjekiNedelje){
                        //for(let ned = 0; ned < 1 ; ned++){  
                          for(let pr in this.projektiObjekiNedelje){
                            this.sumNedelja[ned] = this.projektiObjekiNedelje[pr][this.NizObjekiNedelje[ned].Oznaka] +  this.sumNedelja[ned];
                          }

                        }

                        for(let pr in this.projektiObjekiNedelje){
                        //for(let h=0;h<1;h++){                           
                          this.sumProjekti[pr] = 0;
                          this.projektiObjekiNedelje[pr]['Ukupno'] = this.sumProjekti[pr];
                          for(let i=0;i<this.NizObjekiNedelje.length - 1;i++){             
                            let z = 1;
                            z = z + i;
                            this.sumProjekti[pr] = this.projektiObjekiNedelje[pr][z+".Nedelja"] + this.sumProjekti[pr];
                          }
                          this.projektiObjekiNedelje[pr]['Ukupno'] = this.sumProjekti[pr];
                        }

                    },
                    error => {
                      console.log("error");
                                  
              });
          },
                error => {
                  console.log("error");
                              
          });
      },
      error => {
        console.log("error");
        localStorage.clear();
        this.textError = 'Došlo je do greške na serveru!!'
        this.textErrorIzlaz = 'Gotovo';
        this.showDialog();
    });  

    //console.log(this.objekti_nedelje);

  }

  proveraGodinaTabelaKorisnik(){

    if(JSON.parse(localStorage.getItem('Token')) == null){

            console.log("Izlogovani ste!!");
            this.router.navigate(['/login']);
            return;

    }
    else{
      this.renderer.listen(this.el.nativeElement, 'keydown', (event) => {
      // Do something with 'event'
          event.preventDefault();
            if(event.key == '-' || event.key == '+' || event.key == '.' ){
              
               event.preventDefault();
               return;
            } 
            if(event.key == 'backspace'){

               console.log("Usaooooooooooo"); 
               event.preventDefault();
               return;
            } 

      })
      /*
      this.serviceTabela.tabela(this.fullname_baza_tabela,this.selectedGodinaTabelaKorisnik)
                            .then(
                                  podaci_tabela => { this.podaci_tabela= podaci_tabela
                                  console.log("this.podaci_tabela" + this.podaci_tabela[0].id)


                      },
                      error => {
                          console.log("error");
                          localStorage.clear();
                          this.textError = 'Došlo je do greške na serveru!!'
                          this.textErrorIzlaz = 'Gotovo';
                          this.showDialog();

      });  */
    this.serviceTabela.fullName(this.nadimak_tabela)
        .then(

          fullname_baza_tabela => { this.fullname_baza_tabela= fullname_baza_tabela

           this.serviceTabela.projektiNaKojimaRadiKorisnik(this.nadimak_tabela)
                    .subscribe(

                //console.log(this.satnica);
                projekti => { this.projekti= projekti
               
                 this.serviceTabela.satnicaKorisnik(this.selectedMesecTabela,this.nadimak_tabela,this.selectedGodinaTabelaKorisnik)
                    .subscribe(      

                        satnica => { this.satnica= satnica

                        //console.log(this.projekti);
                        this.broj_nedelja_za_dati_mesec();

                        for(let ar in this.projektiObjekiNedelje){//Brisanje Niza-objekata!!!

                            var index = this.projektiObjekiNedelje.indexOf(this.projektiObjekiNedelje[ar]);
                            //console.log("NizObjectIndex" + index);
                            this.projektiObjekiNedelje.splice(index, this.projektiObjekiNedelje.length);

                        }

                        for (let pr of this.projekti) {
                            let y = {};
                            y['Projekti'] = pr.Projekti;
                            for (let kor of this.NizObjekiNedelje) {
                              y[kor.Oznaka] = null;
                            }
                            this.projektiObjekiNedelje.push(y);
                          
                        }
                        //console.log(this.projektiObjekiNedelje);

                        for(let pr in this.projektiObjekiNedelje){
                        //for(let pr = 0; pr < 2 ; pr++){  
                            for (let sat of this.satnica) {//kor.Oznaka
                              
                              if(this.projektiObjekiNedelje[pr]['Projekti'] == sat.Projekti){ 
                                this.projektiObjekiNedelje[pr][sat.nedelja+".Nedelja"] = sat.sum;
                              }
                          }
                        }

                        for(let ar in this.sumNedelja){//Brisanje Niza-objekata!!!

                            var index = this.sumNedelja.indexOf(this.sumNedelja[ar]);
                            //console.log("NizObjectIndex" + index);
                            this.sumNedelja.splice(index, this.sumNedelja.length);

                        }

                        for(let pr in this.NizObjekiNedelje){
                            this.sumNedelja[pr] = 0;
                        }

                        for(let ned in this.NizObjekiNedelje){
                        //for(let ned = 0; ned < 1 ; ned++){  
                          for(let pr in this.projektiObjekiNedelje){
                            this.sumNedelja[ned] = this.projektiObjekiNedelje[pr][this.NizObjekiNedelje[ned].Oznaka] +  this.sumNedelja[ned];
                          }

                        }

                        for(let pr in this.projektiObjekiNedelje){
                        //for(let h=0;h<1;h++){                           
                          this.sumProjekti[pr] = 0;
                          this.projektiObjekiNedelje[pr]['Ukupno'] = this.sumProjekti[pr];
                          for(let i=0;i<this.NizObjekiNedelje.length - 1;i++){             
                            let z = 1;
                            z = z + i;
                            this.sumProjekti[pr] = this.projektiObjekiNedelje[pr][z+".Nedelja"] + this.sumProjekti[pr];
                          }
                          this.projektiObjekiNedelje[pr]['Ukupno'] = this.sumProjekti[pr];
                        }

                    },
                    error => {
                      console.log("error");
                                  
              });
          },
                error => {
                  console.log("error");
                              
          });
      },
      error => {
        console.log("error");
        localStorage.clear();
        this.textError = 'Došlo je do greške na serveru!!'
        this.textErrorIzlaz = 'Gotovo';
        this.showDialog();
    }); 

    } 
  }

  showDialog() {
        console.log("Usaooo")
        this.display = true;
  }

  Izlaz(){

    if(this.textError == 'Došlo je do greške na serveru!!'){

           console.log("Mickoasadasasa")            
           this.router.navigate(['/login']);

    }
    if(this.textError == 'Izlogovani ste iz aplikacije!!'){

           console.log("Mickoasadasasa")            
           this.router.navigate(['/login']);

    }

  }


}
