import { Component, OnInit, Renderer,OnDestroy } from '@angular/core';
import {Injectable, EventEmitter} from '@angular/core';

import { ActivatedRoute, Params,Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import { AuthenticationService} from '../authentication.service';
import { SService } from '../s.service';
import { HttpModule } from '@angular/http';

import {DataTableModule,SharedModule} from 'primeng/primeng';
import { User } from '../models/user';
import {SelectItem} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {SpinnerModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import { kkk } from '../models/bz';
import { Email } from '../models/email.model';
import { ProjektiSTNICA } from '../models/projektiSatnica.model';
import { ListaProjekataModel } from '../models/ListaProjekata.model';
import { ListaKorisnikaModel } from '../models/ListaKorisnika.model';
//import { Observable } from 'rxjs/Observable';
import {Observable} from 'rxjs/Rx';
import { FooterComponent } from '../footer/footer.component';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit,OnDestroy {

  someEvent$: EventEmitter<any> = new EventEmitter();
  flagGG:boolean = false;
  flagTT:boolean = false;
  items: string[];
  selectedIndex: number;
  hyh: number;
  hideMe : any;
  idShow:any = {};
  private matrica:any [][];
  x:any;
  ngmodelTabela:any;
  boxM:any = {};
  projekatNiz = [{ime:'Razvoj'},{ime:'Odrzavanje'}];
  NizBaza:any = [{}];

  

  users: User[] = [];
  //month:string[]
  cities: SelectItem[];
  selectedCity: string;
  deviceObjects = [{name: 'Januar'}, {name: 'Februar'}, {name: 'Mart'},{name:'April'},
      {name: 'Maj'},{name:'Jun'},{name:'Jul'},{name:'Avgust'},{name:'Septembar'},{name:'Oktobar'},{name:'Novembar'},{name:'Decembar'}];

  //selectedHero: string;    
  selectedMesec = this.deviceObjects[0].name;
  mesecP : any[] = [];
  selectedGodina = "2015"
  selectedNedelja = 0;
  godinaP: User[] = [];
  //nedeljaP: User[] = [];
  nedeljaP: any;
  mounthNames:string[];
  d:any;
  currentMounth:any;

  odaberi_mesec:string; 
  odaberi_godina:string;
  izabrani_mesec:number;
  izbrana_godina:number;

  odaberi_mesecP:string; 
  odaberi_godinaP:string;
  izabrani_mesecP:number;
  izbrana_godinaP:number;

  first_day_of_month:any;
  first_week_number:number;
  yearStart:any; 
  last_day_of_month:any;
  last_week_number:any;
  razlika:number;
  prva_nedelja:number;
  poslednja_nedelja:number;
  pamti_nedelje:any;
  pamti_nedelje_ngModel:any;
  lista_broja_nedelja:any;
  lista_broja_nedelja_ngModel:any;
  objekti_nedelje = [{}];
  objekti_nedelje_ngModel = [{}];
  
  Token: any;
  currentUser_ne:User[] = [];
  
  //users_iscitavanje_p: kkk;
  //users_iscitavanje_p: any;
  users_iscitavanje_p: any[];

  users_iscitavanje_insert:kkk;
  cuvati_ime:any
  pamti_nedelju:any;
  //cuvati_ime = JSON.parse(localStorage.getItem('currentUser'));
  pamti_nesto:any;

  mesecPP:any;
  y:any;
  m:any;
  dd:any;
  onejan:any
  currentWeek_B:any;
  currentYear_B:any;
  brojac:number;
  cuvajOdlicno:any;
  z:number;
  niz:any[];
  sacuvaj_button:any;
  satnice:number[];
  racunanje_ukupno:number;
  
  //dialog
  display: boolean = false;
  text:string;
  text_izlaz:string;
  sizeDialog:number;
  valueSize: number = 500;

  mickoSelect:any;
  values:any;
  racunanje_keydown:number;

  //Token
  base64Url:any;
  base64:any;
  ispisToken:any;
  tokenAdmin:any;
  message:any;
  //alert(getWeekNo(new Date(2015, 2, 31)));
//
  textError:string;
  textErrorIzlaz:string;
  displayError:boolean = false;  

  displayDialog:boolean = false;
  vidljivo:boolean = false;

  NizObject:any = [{}];

   mumuSum:number;
   suma:any;
   mumu:any[] = [];
   
   //projekti_lista:ProjektiSTNICA[] = [];
   projekti_lista:ProjektiSTNICA;
   //projekti_lista = new ProjektiSTNICA();
   vidljivost:string;
   cuvaj_sate:any;
   ngMesec:any;
   tabelaProba:any = [{}];
   nizPr:any[] = [];
   nizKor:any[] = [];
   projekti:ListaProjekataModel[] = [];
   korisnici:ListaKorisnikaModel[] = [];
   korisniciObject:ListaKorisnikaModel[] = [];
   nizObjKorisnik:any[] = [];
   BazaPodaci:any;
   PakovanjeProjekata:any[] = [];
   saberi:number;

   NizProjekti:any[] = [];
   NizKorisnici:any[] = [];
   NizObjekataKorPr:any[] = [];
   ListaProjekataNiz:any;
   SumaNizVertikalno:number[] = [];
   SumaNizHorizontalno:number[] = [];
   uvecajNesto:number;
   flgToken:boolean = true;
   NizMesecBackspace:any[] = [];
   error:any;
   ngGodinaP:any;
   ngMesecP:any;
   ngNedeljaP:number;
   month:string[] = [];
   nowMonth:string;
   selectedNedelje:any [] = [];
   nizNedelja:any [] = [];
   objectNedelje:any [] = [];
   proveraTokena:any = [{}]
   pamtiToken:any;
   public interval:any;
   //public Probaaaaaa:any;
   nekaBrojac:number = 0;
   nekaBrojac1:number = 0;
   flgHTML:boolean = true;
   //selectedNed:{naziv:string,id:number};
    selectedNed:any = {};
   email:Email;
   textEmail:string; 

   flgZahtev:boolean = false; 

    constructor(
        
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private authenticationService: AuthenticationService,
        private sservice :SService,  
        private el: ElementRef,
        public renderer: Renderer,
        //public Probaaaaaa:any
    ) {   


        if(JSON.parse(localStorage.getItem('Token')) == null){

              this.flgHTML = false;
              //alert("Izlogovani ste");
              this.nekaBrojac1 = this.nekaBrojac1 + 1
              if(this.nekaBrojac1 == 0){
                 this.router.navigate(['/login']);
                 //console.log("Miroslav Beronja!!");
                 //return;
              }
             
        }
        else{

          this.flgHTML = true;
          this.interval = setInterval(() => { 
            console.log("Pocetna!!");

            this.currentUser_ne = JSON.parse(localStorage.getItem('currentUser'));
            this.tokenAdmin = this.ParsirajJWT(JSON.parse(localStorage.getItem('Token')));

            //console.log("tokenAdmin" + this.tokenAdmin);
            //console.log("currentUser" + this.currentUser_ne);

            this.sservice.RefresujToken(this.currentUser_ne,this.tokenAdmin)
                .subscribe(
                  pamtiToken => { this.pamtiToken = pamtiToken
                      //console.log("pamtiToken" + this.pamtiToken);
                  },
                  error => {                     
              });
          }, 1000 * 5 * 60 * 60 );

          console.log("usaooo");  
          this.selectedIndex = 0;
          //this.Trenutna_nedelja();
          this.racunanje_ukupno = 0;
          this.racunanje_keydown = 0;
          this.SumaNizVertikalno[0] = 0;
          this.SumaNizHorizontalno[0] = 0;
          this.mumu[0] = 0
          this.mumu[1] = 0
          this.mumuSum = 0;
          this.uvecajNesto = 0;
          this.saberi = 0;

          //var month = new Array();
          this.month[0] = "Januar";
          this.month[1] = "Februar";
          this.month[2] = "Mart";
          this.month[3] = "April";
          this.month[4] = "Maj";
          this.month[5] = "Jun";
          this.month[6] = "Jul";
          this.month[7] = "Avgust";
          this.month[8] = "Septembar";
          this.month[9] = "Oktobar";
          this.month[10] = "Novembar";
          this.month[11] = "Decembar";

          let d = new Date();
          this.nowMonth = this.month[d.getMonth()];

          this.selectedNedelje = [{ naziv:'Nedelje',id:2 }];
          //this.selectedNed = { naziv:'Nedelje',id:2 }

          /*var id = "Miroslav Beronja2";
          var lastChar = id.substr(id.length - 1);
          
          this.NizBaza = [{
              id: 1,Projekti: 'OTPA',id_projekat: 4,nedelja: "4",mesec: "januar",godina: 2017,razvoj: 4,odrzavanje: 3,dokumentacija: 2,implementacija: 1,reziski_poslovi: 0},
              {id: 2,Projekti : 'Erviko',id_projekat: 5,nedelja: "4",mesec: "januar",godina: 2017,razvoj: 9,odrzavanje: 8,dokumentacija: 7,implementacija: 6,reziski_poslovi: 5
          }]

          this.nizPr = ['Pr1','Pr2','Pr3','Pr4','Pr5','Pr6','Pr7'];
          //this.nizKor = ['MB','LZ','MT','SF','LS','sum1','MB1','LZ1','MT1','SF1','LS1','sum2'];
          //this.nizKor = ['MB','LZ','sum1','MB','LZ','sum2'];
          this.nizKor = [{
              ime:'MB',i:'MB'},{ime:'LZ',i:'LZ'},{ime:'sum',i:'sum1'},{ime:'MB',i:'MB1'},{ime:'LZ',i:'LZ1'},{ime:'sum',i:'sum2'}
          ]
          
          this.NizObject = [{ 
            Project:'Erviko',MB:{ime:'MB',value:1},LZ:{ime:'LZ',value:2},sum1:{ime:'sum1',value:null},MB1:{ime:'MB1',value:3},LZ1:{ime:'LZ1',value:4},sum2:{ime:'sum2',value:null}
          },
          {
            Project:'OTPA',MB:{ime:'MB',value:4},LZ:{ime:'LZ',value:3},sum1:{ime:'sum1',value:null},MB1:{ime:'MB1',value:2},LZ1:{ime:'LZ1',value:1},sum2:{ime:'sum2',value:null}
          }]

          for(let u in this.NizObject){

            for(let kor in this.nizKor){

              let pamtiKorisnika1 = this.nizKor[kor].i;
            
            }
          }

          let x = [];

          for (let pr of this.nizPr) {
            let y = {};
            y['Projekat'] = pr;
            for (let kor of this.nizKor) {
              y[kor] = null;
            }
            x.push(y);
          
          }*/  

          /* 
          this.sservice.trenutni_godina()
              .then(
                ngGodinaP => { this.ngGodinaP = ngGodinaP

                  console.log(this.ngGodinaP);

                      this.ngMesecP = 'Jun';

                        this.sservice.trenutni_nedelja()
                          .then(
                            ngNedeljaP => { this.ngNedeljaP = ngNedeljaP

                              //this.broj_nedelja_za_dati_mesec();
                              this.brojNedeljaZaDatiMesecGodinu();

                              console.log("ngNedeljaP" + ngNedeljaP);

                              console.log("this.currentUser_ne" + this.currentUser_ne);
                              this.sservice.vrednosti_baza(this.currentUser_ne,this.ngMesecP,this.ngGodinaP,this.ngNedeljaP)
                                .then(

                                      projekti_lista => { this.projekti_lista = projekti_lista
                                                  
                                                  console.log(this.projekti_lista);

                                                  for(var ii in this.projekti_lista){

                                                    this.Racunaj_proba(Number(this.projekti_lista[ii].Razvoj),Number(this.projekti_lista[ii].odrzavanje),
                                                    Number(this.projekti_lista[ii].dokumentacija),Number(this.projekti_lista[ii].implementacija),Number(this.projekti_lista[ii].rezijski_poslovi),Number(ii));
                                                    
                                                  }

                                                  for(var ii in this.mumu){

                                                    this.mumuSum = Number(this.mumuSum) + Number(this.mumu[ii]);
                                                  //  console.log("this.mumuSum" + Number(this.mumuSum)) 

                                                  }
                                      },
                                      error => { this.error = error
                                                  
                                                  this.Erorr(this.error._body);
                                                  console.log(error);
                                                  //this.GreskaFunkcija();
                              });

                            },
                            error => {
                              console.log("error");
                              this.Erorr("Nije moguce ocitati trenutnu nedelju");
                        });
                },
                error => {
                  console.log("error");
                  this.Erorr("Nije moguce ocitati trenutnu godinu");

          });*/        
          
          

        }   
    }

    ngOnDestroy(){

        console.log("ngOnDestroy")
        clearInterval(this.interval);

    }
  
    ngOnInit() {

      if(JSON.parse(localStorage.getItem('Token')) == null){

          this.nekaBrojac = this.nekaBrojac + 1
          if(this.nekaBrojac == 0){
              this.router.navigate(['/login']);
              console.log("Miroslav Beronja!!");
              return;
          }
          
      }
      else{   

        
        this.flagGG = true;
        this.flagTT = true;
        this.vidljivost = "Prikazi";

        this.sservice.trenutni_godina()
          .then(
            ngGodinaP => { this.ngGodinaP = ngGodinaP
              
              //console.log(this.ngGodinaP);
              let d = new Date();
              this.nowMonth = this.month[d.getMonth()];
                this.ngMesecP = this.nowMonth;

                this.sservice.trenutni_nedelja()
                      .then(
                        ngNedeljaP => { this.ngNedeljaP = ngNedeljaP

                          this.odaberi_mesecP = this.ngMesecP;
                          this.odaberi_godinaP = this.ngGodinaP;

                          if( this.odaberi_mesecP  == 'Januar'){this.izabrani_mesecP = 0;}
                          else if( this.odaberi_mesecP  == 'Februar'){ this.izabrani_mesecP = 1;}
                          else if( this.odaberi_mesecP  == 'Mart'){this.izabrani_mesecP = 2;}
                          else if( this.odaberi_mesecP  == 'April'){this.izabrani_mesecP = 3;}
                          else if( this.odaberi_mesecP  == 'Maj'){this.izabrani_mesecP = 4;}
                          else if( this.odaberi_mesecP  == 'Jun'){this.izabrani_mesecP = 5;}
                          else if( this.odaberi_mesecP  == 'Jul'){this.izabrani_mesecP = 6}
                          else if( this.odaberi_mesecP  == 'Avgust'){this.izabrani_mesecP = 7;}
                          else if( this.odaberi_mesecP  == 'Septembar'){this.izabrani_mesecP = 8;}
                          else if( this.odaberi_mesecP  == 'Oktobar'){this.izabrani_mesecP = 9;}
                          else if( this.odaberi_mesecP  == 'Novembar'){this.izabrani_mesecP = 10;}
                          else if( this.odaberi_mesecP  == 'Decembar'){this.izabrani_mesecP = 11;}
                          else{ this.izabrani_mesecP = 20;}

                          var datum_sada_prijava = new Date()
                          var trenutna_godina_prijava = datum_sada_prijava.getFullYear()

                          this.pamti_nedelje = this.brojNedelja( this.izabrani_mesecP,this.odaberi_godinaP)

                          var brojac = 0
                          for(var index = this.pamti_nedelje[0]; index<=this.pamti_nedelje[1]; index++){

                          this.lista_broja_nedelja = index;

                          }
                          for(var i = 1; this.lista_broja_nedelja >= i ; i++){

                            this.objekti_nedelje[i-1] = i

                          }

                          for(let ar in this.objectNedelje){//Brisanje Niza-objekata!!!

                            let index = this.objectNedelje.indexOf(this.objectNedelje[ar]);
                            //console.log("NizObjectIndex" + index);
                            this.objectNedelje.splice(index, this.objectNedelje.length);

                          }

                          for (let pr of this.objekti_nedelje) {
                            let y = {};
                            y['id'] = pr;
                            y['Naziv'] = 'Nedelja' + pr
                            this.objectNedelje.push(y);

                          }

                          //console.log(this.objectNedelje);

                          this.nizNedelja = [{ naziv:'Nedelje',id:1 },{ naziv:'Nedelje',id:2 },{ naziv:'Nedelje',id:3 }]
                          //this.broj_nedelja_za_dati_mesec();  
                          this.selectedNedelje[0].id = this.ngNedeljaP;
                          this.selectedNed.id = this.ngNedeljaP;
                          //console.log("this.currentUser_ne" + this.currentUser_ne);

                          //this.sservice.vrednosti_baza(this.currentUser_ne,this.ngMesecP,this.ngGodinaP,this.selectedNedelje[0].id)
                          this.sservice.vrednosti_baza(this.currentUser_ne,this.ngMesecP,this.ngGodinaP,this.selectedNed.id)
                            .then(

                                  projekti_lista => { this.projekti_lista = projekti_lista
                                              
                                      //console.log(this.projekti_lista);

                                      if(this.projekti_lista.success == false){
                                          //console.log("Mickokokokokok");
                                          localStorage.clear();
                                          this.router.navigate(['/login']);
                                          //this.GreskaFunkcija();

                                          return;  
                                      }


                                      for(var ii in this.projekti_lista){

                                        this.Racunaj_proba(Number(this.projekti_lista[ii].Razvoj),Number(this.projekti_lista[ii].odrzavanje),
                                        Number(this.projekti_lista[ii].dokumentacija),Number(this.projekti_lista[ii].implementacija),Number(this.projekti_lista[ii].rezijski_poslovi),Number(ii));
                                        
                                      }

                                      for(var ii in this.mumu){

                                        this.mumuSum = Number(this.mumuSum) + Number(this.mumu[ii]);
                                      //  console.log("this.mumuSum" + Number(this.mumuSum)) 

                                      }
                                  },
                                  error => { this.error = error
                                              
                                              this.Erorr(this.error._body);
                                              console.log(error);
                                              //this.GreskaFunkcija();
                          });
                  
                        },
                        error => {
                          console.log("error");
                          this.Erorr("Nije moguce ocitati trenutnu nedelju");
                    });
            },
            error => {
              console.log("error");
              this.Erorr("Nije moguce ocitati trenutnu godinu");

        });
        
        if(JSON.parse(localStorage.getItem('Token')) == null){

              console.log("Miroslav Beronja!!");
              alert("Izlogovani ste");
              this.router.navigate(['/login']);
              return;
        }
      }  
        try {
      
          //this.ParsirajJWTVreme(JSON.parse(localStorage.getItem('Token')));
          this.currentUser_ne = JSON.parse(localStorage.getItem('currentUser'));

        }
        catch(err){

            
        }

        
    }

    posaljiEmail(){

      this.sservice.Email(this.currentUser_ne)
          .then(
            email => { this.email = email

              console.log(email);
              console.log("textEmail" + this.textEmail);

              /*this.sservice.slanjeMejla(this.currentUser_ne,email)
                .then(
                email => { this.email = email

                      console.log(email);

                      

                    }, 
                    error => {
                      console.log("error");
                      this.Erorr("Nije moguce ocitati trenutnu godinu");

              }); */  
            }, 
            error => {
              console.log("error");
              this.Erorr("Nije moguce ocitati trenutnu godinu");

      });   

    }

    Zahtev(){

      this.flgZahtev = true;

    }

    zahtevIzlaz(){

      this.flgZahtev = false;

    }

    Refresuj(){

      location.reload();

    }

    klikGodina(godina:any,mesec:any,nedelja:any){

      this.brisanje_vrednosti_iz_selecta();
      this.brojNedeljaZaDatiMesecGodinu();

      /*console.log("ngGodinaP" + godina);
      console.log("ngMesecP" + mesec);
      console.log("ngNedeljaP" + nedelja);*/

      console.log("ngGodinaP" + godina);
      console.log("ngMesecP" + mesec);
      console.log("ngNedeljaP" + nedelja);

      this.NizMesecBackspace[0] = godina;

      this.renderer.listen(this.el.nativeElement, 'keyup', (event) => {
    
            this.ngGodinaP = this.NizMesecBackspace[0];
      })

      this.sservice.vrednosti_baza(this.currentUser_ne,mesec,godina,nedelja)
            .then(

              projekti_lista => { this.projekti_lista = projekti_lista
                          
                  this.mumuSum = 0;
                  for(var ii in this.projekti_lista){
                      this.Racunaj_proba(Number(this.projekti_lista[ii].Razvoj),Number(this.projekti_lista[ii].odrzavanje),Number(this.projekti_lista[ii].dokumentacija),Number(this.projekti_lista[ii].implementacija),Number(this.projekti_lista[ii].rezijski_poslovi),Number(ii));
                  }
                  for(var ii in this.mumu){

                    this.mumuSum = Number(this.mumuSum) + Number(this.mumu[ii]);
                    console.log("this.mumuSum" + Number(this.mumuSum)) 

                  }
              },
              error => { this.error = error
                this.Erorr(this.error._body);
                console.log(error);
      });
    }

    klikMesec(godina:any,mesec:any,nedelja:any){

      this.brisanje_vrednosti_iz_selecta();
      this.brojNedeljaZaDatiMesecGodinu();

      console.log("ngGodinaP" + godina);
      console.log("ngMesecP" + mesec);
      console.log("ngNedeljaP" + nedelja);
      //console.log("this.objekti_nedelje" + this.objekti_nedelje);

      this.sservice.vrednosti_baza(this.currentUser_ne,mesec,godina,nedelja)
          .then(
            projekti_lista => { this.projekti_lista = projekti_lista
                      
              this.mumuSum = 0;
              for(var ii in this.projekti_lista){
                  this.Racunaj_proba(Number(this.projekti_lista[ii].Razvoj),Number(this.projekti_lista[ii].odrzavanje),Number(this.projekti_lista[ii].dokumentacija),Number(this.projekti_lista[ii].implementacija),Number(this.projekti_lista[ii].rezijski_poslovi),Number(ii));
              }
              for(var ii in this.mumu){

                this.mumuSum = Number(this.mumuSum) + Number(this.mumu[ii]);
                console.log("this.mumuSum" + Number(this.mumuSum)) 

              }
          },
          error => { this.error = error
            this.Erorr(this.error._body);
            console.log(error);
      });

    }

    klikNedelja(godina:any,mesec:any,nedelja:any){

      console.log("ngGodinaP" + godina);
      console.log("ngMesecP" + mesec);
      console.log("ngNedeljaP" + nedelja);

      this.sservice.vrednosti_baza(this.currentUser_ne,mesec,godina,nedelja)
          .then(
            projekti_lista => { this.projekti_lista = projekti_lista
                      
              this.mumuSum = 0;
              for(var ii in this.projekti_lista){
                  this.Racunaj_proba(Number(this.projekti_lista[ii].Razvoj),Number(this.projekti_lista[ii].odrzavanje),Number(this.projekti_lista[ii].dokumentacija),Number(this.projekti_lista[ii].implementacija),Number(this.projekti_lista[ii].rezijski_poslovi),Number(ii));
              }
              for(var ii in this.mumu){

                this.mumuSum = Number(this.mumuSum) + Number(this.mumu[ii]);
                console.log("this.mumuSum" + Number(this.mumuSum)) 

              }
          },
          error => { this.error = error
            this.Erorr(this.error._body);
            console.log(error);
      });

    }

    brojNedeljaZaDatiMesecGodinu(){

        this.odaberi_mesec = this.ngMesecP;
        this.odaberi_godina = this.ngGodinaP;

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

        this.pamti_nedelje = this.brojNedelja( this.izabrani_mesec,this.odaberi_godina)

        var brojac = 0
        for(var index = this.pamti_nedelje[0]; index<=this.pamti_nedelje[1]; index++){

            this.lista_broja_nedelja = index;
          
        }
        for(var i = 1; this.lista_broja_nedelja >= i ; i++){

            this.objekti_nedelje[i-1] = i
          
        }

        for(let ar in this.objectNedelje){//Brisanje Niza-objekata!!!

                let index = this.objectNedelje.indexOf(this.objectNedelje[ar]);
                //console.log("NizObjectIndex" + index);
                this.objectNedelje.splice(index, this.objectNedelje.length);

        }

        for (let pr of this.objekti_nedelje) {
          let y = {};
          y['id'] = pr;
          y['Naziv'] = 'Nedelja' + pr
          this.objectNedelje.push(y);
        }


        //let x = [];


       

    } 

    brojNedelja(month:number,year:any){

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

    ParsirajJWTVreme (token) {

      

        
        this.base64Url = token.split('.')[1];
        this.base64 = this.base64Url.replace('-', '+').replace('_', '/');
        this.ispisToken = JSON.parse(window.atob(this.base64));
        
        //return this.ispisToken.admin;
        console.log(this.ispisToken);

        console.log(this.ispisToken.exp)

        this.ispisToken.exp += Number(500);

        //this.ispisToken.exp = 0;
        /*localStorage.clear();
        this.router.navigate(['/login']); */
        //return;
     

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

    Odjava(){

      localStorage.clear();
      this.router.navigate(['/login']); 

    }

    Funkcija(){

      if(this.text == "Uspešno ste sačuvali satnice!!"){

          return;

      }
      else if(this.text = "Izlogovani ste!!"){

        this.router.navigate(['/login']);

      }

    }
   
    Racunaj_proba(razvojS:number,odrzavanjeS:number,dokumentacijaS:number,implementacijaS:number,reziski_posloviS:number,id:number){

      this.renderer.listen(this.el.nativeElement, 'keypress', (event) => {
      
        if(event.key == '-' || event.key == '+' || event.key == '.'){
            event.preventDefault();
        }

      })

      /*this.renderer.listenGlobal('document', 'keypress', (event) => {
            
              if(event.key == '-' || event.key == '+' || event.key == '.'){
                
                event.preventDefault();
              } 
      });*/

      //event.preventDefault();
      this.suma = Number(0);
      this.mumu[id] = razvojS + odrzavanjeS + dokumentacijaS + implementacijaS + reziski_posloviS;

    }

    Racunaj_Ukupno(){

      this.mumuSum = 0;
        for(var ii in this.mumu){

          this.mumuSum = Number(this.mumuSum) + Number(this.mumu[ii]);

        }

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
            //console.log("Mickoasadasasa")            
        this.router.navigate(['/login']);
      }
      if(this.textError ==  "Izlogovani ste iz aplikacije!!"){
        this.router.navigate(['/login']);
      }


    }

    GreskaFunkcija(){

      localStorage.clear();
      this.textError = 'Došlo je do greške na serveru!!'
      this.textErrorIzlaz = 'Gotovo';
      this.showDialogError();

    }

    Erorr(error:any){

      this.textError = String(error);
      this.textErrorIzlaz = 'Gotovo';
      this.showDialogError();

    }
  
    vidljivoButton(userHH:any,idTr:any){

      
      this.x = document.getElementById(idTr).style.display;
      this.flagGG = true;

      if(this.x == 'block'){
          document.getElementById(idTr).style.display = "none";
          //console.log("ifffff");  
      }
      else{
          document.getElementById(idTr).style.display = "block";
          //console.log("elseeeeee");
      }


      //this.vidljivo = true;
      //this.flagGG = true;
      this.hyh = idTr;
      
    }

    SnimiNiz(id:any,idPr:any,razvoj:any,odrzavanje:any,dokumentacija:any,implementacija:any,reziski_poslovi,nizPodataka:ProjektiSTNICA){

        console.log("nizPodataka" + nizPodataka.Razvoj);
        if(this.ngGodinaP == null || (this.ngGodinaP != '2017' &&  this.ngGodinaP != '2018' && this.ngGodinaP != '2019')){

        //console.log("Nije dobrooo");
          this.text = "Nije dobro uneta godina!!"
          this.text_izlaz = 'Izlaz'; 
          this.showDialog();
          this.ngGodinaP = String(new Date().getFullYear());

      }
      else if(nizPodataka.Razvoj == null || nizPodataka.odrzavanje == null || nizPodataka.dokumentacija == null || nizPodataka.implementacija == null || nizPodataka.rezijski_poslovi == null){

        this.text = "Nije dobro uneta satnica!!"
        this.text_izlaz = 'Izlaz'; 
        this.showDialog();

      }
      else{

        console.log(nizPodataka.id_pr);
        
        //this.sservice.CuvajProjekat(this.currentUser_ne,this.selectedMesec,this.selectedGodina,this.selectedNedelja,idPr,razvoj,odrzavanje,dokumentacija,implementacija,reziski_poslovi)
        //this.sservice.CuvajProjekat(this.currentUser_ne,this.ngMesecP,this.ngGodinaP,this.selectedNedelje[0].id,nizPodataka)
        
        console.log("this.selectedNed.id" + this.selectedNed.id);

        this.sservice.CuvajProjekat(this.currentUser_ne,this.ngMesecP,this.ngGodinaP,this.selectedNed.id,nizPodataka)
          .subscribe(
                      cuvaj_sate => { this.cuvaj_sate = cuvaj_sate
                        
                      console.log(this.cuvaj_sate._body);
                      //var cuvaj = this.cuvaj_sate;
                      if((this.cuvaj_sate._body) == '"Uspesan Insert"'){

                        console.log("Uspesan Insert" +  this.cuvaj_sate)
                        this.text = "Uspešno ste sačuvali satnice!!"
                        this.text_izlaz = 'Uredu'; 
                        this.showDialog()

                      }
                      else if(String(this.cuvaj_sate) == 'Prazno'){

                        console.log("Prazno" +  this.cuvaj_sate);
                        this.text = "Izlogovani ste!!";
                        this.text_izlaz = 'Uredu'; 
                        this.showDialog();

                      }
                      else{

                        this.text = this.cuvaj_sate._body
                        this.text_izlaz = 'Uredu'; 
                        this.showDialog()

                      }
                  
                      },
                      error => { this.error = error
                          
                          this.Erorr(this.error._body);
                          console.log(error);
                          //this.GreskaFunkcija();
        });
      }
    }

    //Ne koristim ih ali ne znam zasto ih nisam obrisao!!
    micko(){

        this.sservice.trenutni_mesec()
              .then(
                      mesecP => { this.mesecP = mesecP
                      this.selectedMesec = mesecP;
                      },
                      error => {
                          console.log("error");
                          this.GreskaFunkcija();
                          /*localStorage.clear();
                          this.textError = 'Došlo je do greške na serveru!!'
                          this.textErrorIzlaz = 'Gotovo';
                          this.showDialogError();*/
        });  

        this.sservice.trenutni_godina()
              .then(
                      godinaP => { this.godinaP = godinaP
                      this.selectedGodina = godinaP;
                      },
                      error => {
                          console.log("error");
                          this.GreskaFunkcija();
                          /*localStorage.clear();
                          this.textError = 'Došlo je do greške na serveru!!'
                          this.textErrorIzlaz = 'Gotovo';
                          this.showDialogError();*/
        });

        this.sservice.trenutni_nedelja()
              .then(
                      nedeljaP => { this.nedeljaP = nedeljaP
                      this.selectedNedelja = nedeljaP
                      
                      },
                      error => {
                          console.log("error");
                          this.GreskaFunkcija();
                          /*localStorage.clear();
                          this.textError = 'Došlo je do greške na serveru!!'
                          this.textErrorIzlaz = 'Gotovo';
                          this.showDialogError();*/
        });

        var week = [1,2,3,4,5,6,7,8,9];                            
        week.length -= 2;
        
    }

    broj_nedelja_za_dati_mesec(){

      this.odaberi_mesecP = this.selectedMesec;
      this.odaberi_godinaP = this.selectedGodina;

      if( this.odaberi_mesecP  == 'Januar'){this.izabrani_mesecP = 0;}
      else if( this.odaberi_mesecP  == 'Februar'){ this.izabrani_mesecP = 1;}
      else if( this.odaberi_mesecP  == 'Mart'){this.izabrani_mesecP = 2;}
      else if( this.odaberi_mesecP  == 'April'){this.izabrani_mesecP = 3;}
      else if( this.odaberi_mesecP  == 'Maj'){this.izabrani_mesecP = 4;}
      else if( this.odaberi_mesecP  == 'Jun'){this.izabrani_mesecP = 5;}
      else if( this.odaberi_mesecP  == 'Jul'){this.izabrani_mesecP = 6}
      else if( this.odaberi_mesecP  == 'Avgust'){this.izabrani_mesecP = 7;}
      else if( this.odaberi_mesecP  == 'Septembar'){this.izabrani_mesecP = 8;}
      else if( this.odaberi_mesecP  == 'Oktobar'){this.izabrani_mesecP = 9;}
      else if( this.odaberi_mesecP  == 'Novembar'){this.izabrani_mesecP = 10;}
      else if( this.odaberi_mesecP  == 'Decembar'){this.izabrani_mesecP = 11;}
      else{ this.izabrani_mesecP = 20;}

      var datum_sada_prijava = new Date()
      var trenutna_godina_prijava = datum_sada_prijava.getFullYear()

      this.pamti_nedelje = this.brojNedelja( this.izabrani_mesecP,this.odaberi_godinaP)

      var brojac = 0
      for(var index = this.pamti_nedelje[0]; index<=this.pamti_nedelje[1]; index++){

        this.lista_broja_nedelja = index;
        
      }
      for(var i = 1; this.lista_broja_nedelja >= i ; i++){

          this.objekti_nedelje[i-1] = i
        
      }

       for (let pr of this.objekti_nedelje) {
          let y = {};
          y['id'] = pr;
          y['Naziv'] = 'Nedelja' + pr
          this.objectNedelje.push(y);
        
        }

        console.log(this.objectNedelje);



    }

    ngModelFunkcija(){

      this.brisanje_vrednosti_iz_selecta_ngModel();
      this.ngModelbroj_nedelja_za_dati_mesec();
      console.log("mesec" + this.ngMesec);
      console.log(" this.objekti_nedelje_ngModel" +  this.objekti_nedelje_ngModel)


    }

    ngModelbroj_nedelja_za_dati_mesec(){

        this.odaberi_mesec = this.ngMesec;
        this.odaberi_godina = this.selectedGodina;

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

        this.pamti_nedelje_ngModel = this.brojNedelja( this.izabrani_mesec,this.odaberi_godina)

        var brojac = 0
        for(var index = this.pamti_nedelje_ngModel[0]; index<=this.pamti_nedelje_ngModel[1]; index++){

            this.lista_broja_nedelja_ngModel = index;
          
        }
        for(var i = 1; this.lista_broja_nedelja_ngModel >= i ; i++){

            this.objekti_nedelje_ngModel[i-1] = i
          
        }

    }

    brisanje_vrednosti_iz_selecta_ngModel(){
      //this.lista_broja_nedelja = 0
      /*for(var i = 0; this.lista_broja_nedelja >= i ; i++){
          this.objekti_nedelje.splice(this.objekti_nedelje.indexOf(i), 1);
      }*/
      for(var i = 0; this.lista_broja_nedelja_ngModel >= i ; i++){
          this.objekti_nedelje_ngModel.splice(this.objekti_nedelje_ngModel.indexOf(i), 1);
      }

      
    }

    NizVidljivost(id:any,idNiz:any){

     console.log("idNiz" + idNiz);
     console.log("Projekti" + id);

     this.x = document.getElementById(idNiz).style.display;
     console.log("x" + this.x);
     /*var elem = document.getElementById(idNiz + 1).innerHTML;
     console.log("elem" + elem)*/

     if(this.x == 'block'){
        document.getElementById(idNiz).style.display = "none";
        //document.getElementById(1 + idNiz).innerHTML = "Prikazi";
        //console.log("ifffff");  
     }
     else{
        document.getElementById(idNiz).style.display = "block";
        //document.getElementById(1 + idNiz).innerHTML = "Sakri";
        //console.log("elseeeeee");
     }
      var change = document.getElementById("12345" + idNiz);
      if (change.innerHTML == "Prikaži"){
          change.innerHTML = "Sakrij";
      }
      else {
          change.innerHTML = "Prikaži";
      }


    }

    Racunaj(){

     this.racunanje_ukupno = 0;
     //console.log("this.racunanje_ukupno" + this.racunanje_ukupno)

     for(var u = 0;Object.keys(this.users_iscitavanje_p).length > u;u++){

       this.racunanje_ukupno = Number(this.users_iscitavanje_p[u].broj_sati) + this.racunanje_ukupno
       //console.log("this.users_iscitavanje_p[u].broj_sati" + this.users_iscitavanje_p[0].broj_sati)
     }

    }

    keydown(){

      this.racunanje_keydown = 0;
      var rez = 0;

      for(var u = 0;Object.keys(this.users_iscitavanje_p).length > u;u++){

          this.racunanje_keydown = Number(this.users_iscitavanje_p[u].broj_sati) + this.racunanje_keydown;
          console.log("Racun " + Number(this.users_iscitavanje_p[u].broj_sati));

      }

      //console.log("Racun " + this.racunanje_keydown);
      this.racunanje_ukupno = this.racunanje_keydown;


    }

    Trenutna_nedelja(){

          this.mounthNames = ["Januar", "Februar", "Mart", "April", "Maj", "Jun",
            "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"];
          this.d = new Date();
          this.mounthNames[this.d.getMonth()];
          this.currentMounth = this.mounthNames[this.d.getMonth()];//Upisuje se u currentMounth trenutni mesec
    }

    Sacuvaj(){

     console.log("this.selectedGodina" + this.selectedGodina)

     if(this.selectedGodina == null || (this.selectedGodina != '2017' &&  this.selectedGodina != '2018' && this.selectedGodina != '2019')){

       //console.log("Nije dobrooo");
        this.text = "Nije dobro uneta godina!!"
        this.text_izlaz = 'Izlaz'; 
        this.showDialog();
        this.selectedGodina = String(new Date().getFullYear());

     }
     else{

        if(this.racunanje_ukupno > 40){

            this.text = "Nije moguce upisati preko 40 sati za datu nedelju!!"
            this.text_izlaz = 'Izlaz'; 
            this.showDialog()

        }
        else{

            for(var u = 0 ; Object.keys(this.users_iscitavanje_p).length > u ; u++){

              if(this.users_iscitavanje_p[u].broj_sati == null){

                this.users_iscitavanje_p[u].broj_sati = 0;

              }

              console.log(this.users_iscitavanje_p[u].broj_sati)
              this.sservice.upisstanja(this.currentUser_ne,this.users_iscitavanje_p[u].Projekti,this.users_iscitavanje_p[u].broj_sati,this.selectedMesec,this.selectedNedelja,this.selectedGodina)
                      .then(
                            sacuvaj_button => { this.sacuvaj_button = sacuvaj_button
                            //console.log("ODICNOOOOOOOOO" +  this.sacuvaj_button)
                            if(this.sacuvaj_button == 'Uspesan Insert'){

                              console.log("Uspesan Insert" +  this.sacuvaj_button)
                              this.text = "Uspešno ste sačuvali satnice!!"
                              this.text_izlaz = 'Uredu'; 
                              this.showDialog()

                            }
                            else if(this.sacuvaj_button == 'Prazno'){

                              console.log("Prazno" +  this.sacuvaj_button);
                              this.text = "Izlogovani ste!!";
                              this.text_izlaz = 'Uredu'; 
                              this.showDialog();

                            }

                           

                            },error => {
                                console.log("error");
                                //console.log("error");
                                 this.GreskaFunkcija();
                      });
            }
        }
     }
    }

    provera_godina(){

      this.brisanje_vrednosti_iz_selecta();
      this.broj_nedelja_za_dati_mesec();
    
      this.NizMesecBackspace[0] = this.selectedGodina;

      this.renderer.listen(this.el.nativeElement, 'keyup', (event) => {
    
            this.selectedGodina = this.NizMesecBackspace[0];
      })

      this.sservice.vrednosti_baza(this.currentUser_ne,this.selectedMesec,this.selectedGodina,this.selectedNedelja)
            .then(

              projekti_lista => { this.projekti_lista = projekti_lista
                          
                  this.mumuSum = 0;
                  for(var ii in this.projekti_lista){
                      this.Racunaj_proba(Number(this.projekti_lista[ii].Razvoj),Number(this.projekti_lista[ii].odrzavanje),Number(this.projekti_lista[ii].dokumentacija),Number(this.projekti_lista[ii].implementacija),Number(this.projekti_lista[ii].rezijski_poslovi),Number(ii));
                  }
                  for(var ii in this.mumu){

                    this.mumuSum = Number(this.mumuSum) + Number(this.mumu[ii]);
                    console.log("this.mumuSum" + Number(this.mumuSum)) 

                  }
              },
              error => { this.error = error
                          
                          this.Erorr(this.error._body);
                          console.log(error);
                          //this.GreskaFunkcija();
      });
    }

    provera_mesec(){
        
        this.brisanje_vrednosti_iz_selecta();
        this.broj_nedelja_za_dati_mesec();

        console.log("this.objekti_nedelje" + this.objekti_nedelje);

        this.sservice.vrednosti_baza(this.currentUser_ne,this.selectedMesec,this.selectedGodina,this.selectedNedelja)
            .then(

              projekti_lista => { this.projekti_lista = projekti_lista
                          
                          this.mumuSum = 0;
                          for(var ii in this.projekti_lista){

                            this.Racunaj_proba(Number(this.projekti_lista[ii].Razvoj),Number(this.projekti_lista[ii].odrzavanje),Number(this.projekti_lista[ii].dokumentacija),Number(this.projekti_lista[ii].implementacija),Number(this.projekti_lista[ii].rezijski_poslovi),Number(ii));
                            
                          }

                          for(var ii in this.mumu){

                            this.mumuSum = Number(this.mumuSum) + Number(this.mumu[ii]);
                            console.log("this.mumuSum" + Number(this.mumuSum)) 

                          }
              },
              error => { this.error = error
                          
                          this.Erorr(this.error._body);
                          console.log(error);
        });
    }

    provera_nedelja(){

        this.sservice.vrednosti_baza(this.currentUser_ne,this.selectedMesec,this.selectedGodina,this.selectedNedelja)
            .then(

              projekti_lista => { this.projekti_lista = projekti_lista
                          
                //console.log("projekti_kistaAAAAAAAAAAAAAA" + this.projekti_kista);
                this.mumuSum = 0;
                for(var ii in this.projekti_lista){

                  this.Racunaj_proba(Number(this.projekti_lista[ii].Razvoj),Number(this.projekti_lista[ii].odrzavanje),Number(this.projekti_lista[ii].dokumentacija),Number(this.projekti_lista[ii].implementacija),Number(this.projekti_lista[ii].rezijski_poslovi),Number(ii));
                  
                }

                for(var ii in this.mumu){

                  this.mumuSum = Number(this.mumuSum) + Number(this.mumu[ii]);
                  console.log("this.mumuSum" + Number(this.mumuSum)) 

                }
              },
              error => { this.error = error
                
                this.Erorr(this.error._body);
                console.log(error);
        });
    }

     /*
          this.sservice.RefresujToken()
            .subscribe(
                  pamtiToken => { this.pamtiToken = pamtiToken
                    //ovde se popunjava dopwdpwn sa korisniciAktivni

                      //console.log("pamtiToken" + this.pamtiToken);


                  },
                  error => {
                      
          });*/

          /*
          this.sservice.trenutni_godina()
            .then(
              ngGodinaP => { this.ngGodinaP = ngGodinaP

                console.log(this.ngGodinaP);
                this.sservice.trenutni_mesec()
                  .then(

                    ngMesecP => { this.ngMesecP = ngMesecP

                      console.log("ngMesecP" + this.ngMesecP);
                      this.ngMesecP = 'Jun';

                      this.sservice.trenutni_nedelja()
                        .then(
                          ngNedeljaP => { this.ngNedeljaP = ngNedeljaP

                            //this.broj_nedelja_za_dati_mesec();
                            this.brojNedeljaZaDatiMesecGodinu();

                            console.log("ngNedeljaP" + ngNedeljaP);

                            console.log("this.currentUser_ne" + this.currentUser_ne);
                            this.sservice.vrednosti_baza(this.currentUser_ne,this.ngMesecP,this.ngGodinaP,this.ngNedeljaP)
                              .then(

                                    projekti_lista => { this.projekti_lista = projekti_lista
                                                
                                                console.log(this.projekti_lista);

                                                for(var ii in this.projekti_lista){

                                                  this.Racunaj_proba(Number(this.projekti_lista[ii].Razvoj),Number(this.projekti_lista[ii].odrzavanje),
                                                  Number(this.projekti_lista[ii].dokumentacija),Number(this.projekti_lista[ii].implementacija),Number(this.projekti_lista[ii].rezijski_poslovi),Number(ii));
                                                  
                                                }

                                                for(var ii in this.mumu){

                                                  this.mumuSum = Number(this.mumuSum) + Number(this.mumu[ii]);
                                                //  console.log("this.mumuSum" + Number(this.mumuSum)) 

                                                }
                                    },
                                    error => { this.error = error
                                                
                                                this.Erorr(this.error._body);
                                                console.log(error);
                                                //this.GreskaFunkcija();
                            });

                          },
                          error => {
                            console.log("error");
                            this.Erorr("Nije moguce ocitati trenutnu nedelju");
                      });
                      },
                      error => {
                        console.log("error");
                        this.Erorr("Nije moguce ocitati trenutni mesec");
                });
              },
              error => {
                console.log("error");
                this.Erorr("Nije moguce ocitati trenutnu godinu");

          });*/
          //location.reload();
          
          /*
          this.sservice.trenutni_godina()
            .then(
              ngGodinaP => { this.ngGodinaP = ngGodinaP
                
                console.log(this.ngGodinaP);

                    let d = new Date();
		                this.nowMonth = this.month[d.getMonth()];

                    this.ngMesecP = this.nowMonth;

                      this.sservice.trenutni_nedelja()
                        .then(
                          ngNedeljaP => { this.ngNedeljaP = ngNedeljaP

                            //this.broj_nedelja_za_dati_mesec();
                            this.brojNedeljaZaDatiMesecGodinu();

                            if(this.ngNedeljaP.success == false){
                                console.log("Ovdeee jee usaooo!!!");
                                //localStorage.clear();
                                //this.router.navigate(['/login']);
                                //this.displayError = true;
                                //this.textError = 'Micko';
                                //this.textErrorIzlaz = 'Micko';
                                //this.router.navigate(['/login']);
                                //return;  
                            }

                            console.log("ngNedeljaP" + ngNedeljaP);

                            console.log("this.currentUser_ne" + this.currentUser_ne);
                            this.sservice.vrednosti_baza(this.currentUser_ne,this.ngMesecP,this.ngGodinaP,this.ngNedeljaP)
                              .then(

                                    projekti_lista => { this.projekti_lista = projekti_lista
                                                
                                                console.log(this.projekti_lista);

                                                if(this.projekti_lista.success == false){
                                                  //  console.log("Mickokokokokok");
                                                  //localStorage.clear();
                                                  //this.router.navigate(['/login']);
                                                  //this.GreskaFunkcija();

                                                  //return;  
                                                }


                                                for(var ii in this.projekti_lista){

                                                  this.Racunaj_proba(Number(this.projekti_lista[ii].Razvoj),Number(this.projekti_lista[ii].odrzavanje),
                                                  Number(this.projekti_lista[ii].dokumentacija),Number(this.projekti_lista[ii].implementacija),Number(this.projekti_lista[ii].rezijski_poslovi),Number(ii));
                                                  
                                                }

                                                for(var ii in this.mumu){

                                                  this.mumuSum = Number(this.mumuSum) + Number(this.mumu[ii]);
                                                //  console.log("this.mumuSum" + Number(this.mumuSum)) 

                                                }
                                    },
                                    error => { this.error = error
                                                
                                                this.Erorr(this.error._body);
                                                console.log(error);
                                                //this.GreskaFunkcija();
                            });

                          },
                          error => {
                            console.log("error");
                            this.Erorr("Nije moguce ocitati trenutnu nedelju");
                      });
              },
              error => {
                console.log("error");
                this.Erorr("Nije moguce ocitati trenutnu godinu");

          });*/
          
          /*this.currentYear_B = new Date().getFullYear();
          this.selectedGodina = this.currentYear_B;*/

          /*this.currentWeek_B = JSON.parse(localStorage.getItem('currentWeek'));
          this.selectedNedelja = this.currentWeek_B */

          /*
          this.sservice.ListaProjekata()
            .subscribe(
                        projekti => { this.projekti = projekti
                          
                          var cuvaj = this.projekti;

                          for(let pr in this.projekti){

                            this.NizProjekti[pr] = this.projekti[pr].Projekti
                            //console.log("Projekti--" + this.NizProjekti[pr]);
                          }
        
                        },
                        error => {
                            
          });

          this.sservice.ListaKorisnika()
            .subscribe(
                        korisnici => { this.korisnici = korisnici
                          
                          var cuvaj1 = this.korisnici;
                          //console.log("this.korisnici" + this.korisnici);
                          for(let pr in this.korisnici){

                            this.NizKorisnici[pr] = this.korisnici[pr].Ime_Prezime;
                            console.log("Korisnici--" + this.NizKorisnici[pr]);

                          }

                          
                    
                        },
                        error => {
                            
          });*/  
          
          /*this.sservice.vrednosti_baza(this.currentUser_ne,this.ngMesecP,this.ngGodinaP,this.ngNedeljaP)
              .then(

                  projekti_lista => { this.projekti_lista = projekti_lista
                            
                            console.log(this.projekti_lista);

                            for(var ii in this.projekti_lista){

                              this.Racunaj_proba(Number(this.projekti_lista[ii].Razvoj),Number(this.projekti_lista[ii].odrzavanje),Number(this.projekti_lista[ii].dokumentacija),Number(this.projekti_lista[ii].implementacija),Number(this.projekti_lista[ii].rezijski_poslovi),Number(ii));
                              
                            }

                            for(var ii in this.mumu){

                              this.mumuSum = Number(this.mumuSum) + Number(this.mumu[ii]);
                            //  console.log("this.mumuSum" + Number(this.mumuSum)) 

                            }
                },
                error => { this.error = error
                            
                            this.Erorr(this.error._body);
                            console.log(error);
                            //this.GreskaFunkcija();
          });*/

          /*this.authenticationService.Optimizam()
                  .then(
                          hideMe => { this.hideMe = hideMe

                            //console.log("hideMe" + this.hideMe)

                          },
                          error => {
                              console.log("error")
                            
          });*/

            //console.log("Puklaaaa1"); 

          //this.broj_nedelja_za_dati_mesec();
          //this.micko();

          //console.log("Puklaaaa3");

          /*this.sservice.trenutni_mesec()
                  .then(
                          mesecP => { this.mesecP = mesecP

                            //console.log("Huhuhuuhuhuhu");  

                          },
                          error => {
                              console.log("error")
                              localStorage.clear();
                              this.textError = 'Došlo je do greške na serveru!!'
                              this.textErrorIzlaz = 'Gotovo';
                              this.showDialogError();
          });*/
          //console.log("Puklaaaa2");
          /*
          this.sservice.trenutni_godina()
                  .then(
                          godinaP => { this.godinaP = godinaP

                          },
                          error => {
                              console.log("error");
                              localStorage.clear();
                              this.textError = 'Došlo je do greške na serveru!!'
                              this.textErrorIzlaz = 'Gotovo';
                              this.showDialogError();
          });  

          this.sservice.trenutni_nedelja()
                  .then(
                          nedeljaP => { this.nedeljaP = nedeljaP

                          },
                          error => {
                              console.log("error");
                              localStorage.clear();
                              this.textError = 'Došlo je do greške na serveru!!'
                              this.textErrorIzlaz = 'Gotovo';
                              this.showDialogError();
          }); 

          this.pamti_nesto = this.sservice.trenutni_nedelja()
              .then(
                nedeljaP => { this.nedeljaP = nedeljaP

                },
                error => {
                  console.log("error");
                  localStorage.clear();
                  this.textError = 'Došlo je do greške na serveru!!'
                  this.textErrorIzlaz = 'Gotovo';
                  this.showDialogError();
          });*/

          /*
          this.sservice.insert(this.currentUser_ne,this.selectedMesec,this.selectedGodina,this.selectedNedelja)
                .then(
                    users_iscitavanje_insert => { this.users_iscitavanje_insert = users_iscitavanje_insert
                            //console.log("this.users_iscitavanje_inser" + this.users_iscitavanje_insert)
                            this.cuvajOdlicno = this.users_iscitavanje_insert

                            
                            if(this.cuvajOdlicno == 'odicnoo'){
                                //console.log("Micko")
                                this.sservice.ocitavanje(this.currentUser_ne,this.selectedMesec,this.selectedGodina,this.selectedNedelja)
                                        .then(
                                                  users_iscitavanje_p => { this.users_iscitavanje_p = users_iscitavanje_p

                                                    for(var u = 0 ; Object.keys(this.users_iscitavanje_p).length > u ; u++){

                                                      var idNone = u;
                                                      
                                                        //document.getElementById('idTr').style.display;
                                                        //document.getElementById(idTr).style.display = "none";
                                                
                                                    }


                                                  this.Racunaj();  
                                });

                    }              
          });*/

    public trackByIndex(index: number, item) {
    //console.log("index" + index + "item" + item);
      return index;
    }        
}
