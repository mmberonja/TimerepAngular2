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
import { Godina} from '../models/godina.model';
import { ProjektiSTNICA } from '../models/projektiSatnica.model';
import { ListaProjekataModel } from '../models/ListaProjekata.model';
import { ListaKorisnikaModel } from '../models/ListaKorisnika.model';
import { prevodPodaciModel } from '../models/prevodPodaci';
import { tabelaFunkcijeModel } from '../models/tabelaFunkcije';
import { prikazTabelaModel } from '../models/prikazTabela';
import { snimiProjekatModel } from '../models/snimiProjekat';
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import { FooterComponent } from '../footer/footer.component';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})

//export type Fruit = "Orange" | "Apple" | "Banana";

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
  selectedGodina:any;
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
  valueSize: number = 200;

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
   probaFiltar = new ProjektiSTNICA();
   //probaGiltar:any = [{}];
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
   ngGodinaP = new Godina();
   //ngNedeljaP:number;
   ngNedeljaP = new Godina();

   cuvajGodina:string;
   ngMesecP:any;
  
   month:string[] = [];
   nowMonth:string;
   selectedNedelje:any [] = [];
   nizNedelja:any [] = [];
   objectNedelje:any [] = [];
   proveraTokena:any = [{}]
   pamtiToken:any;
   public interval:any;
   public intrevalPamtiOtvoreneprojekte:any;
   //public Probaaaaaa:any;
   nekaBrojac:number = 0;
   nekaBrojac1:number = 0;
   flgHTML:boolean = true;
   //selectedNed:{naziv:string,id:number};
   selectedNed:any = {};
   email:any;
   textEmail:string = "";
   emailOdg:string = "";

   ModelGodina = new Godina; 

   flgZahtev:boolean = false;
   brojacV:number; 
   prikazProjekti:string = "Prikaži sve";
   flgLoading:boolean = false;

   trenutnaGodina:number;
   trenutniMesec:string;
   trenutnaNedelja:number;
   gotovaFunkcija:boolean = true;

   textObavestenjaMesecPrvi:string;
   textObavestenjaMesecPoslednji:string;

   hideElement:number = 1;
   mickoTrue:number[] = [];
   textInput:any;
   zastita:any;
   nizBlock = [];
   hideObavestenja:number = 1;
   prikazObavestenja:number[] = [];
   textPrikazi:string[] = [];
   objektPrikazi:any[] = [];
   brFiltar:number = 0;
   //cuvajProjekte:any[] = [];
   cuvajProjekte = new ProjektiSTNICA();
   flgFiltar:boolean = true;
   cuvajPoziciju:any[] = [];
   disableSort:boolean = true;
   flgSearchSort:boolean = false;
   cuvajBre:any[] = [];
   probaHtmlL:boolean = false;
   sort:boolean = false;
   pocetakSort:boolean = false;
   flgGotovo:boolean = false;
   nestohhhh:boolean = false;
   cuvajprojekti_lista:any[] = [];
   probaMickoBre = new prevodPodaciModel();
   nizPush:any[] = [];
   nizObjekataBre:any [] = [];

   //Nova tabela,promenljive!!
   prikazTabela:prikazTabelaModel[] = [];
   opcijeTabelaMicko:tabelaFunkcijeModel[] = [];
   opcijeTabela:any [] = [];
   prikazInformacija:number = 1;
   listaBrojNedelja:any;
   rez:number[] = [];

    constructor(
        
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private authenticationService: AuthenticationService,
        private sservice :SService,  
        private el: ElementRef,
        private renderer: Renderer,
        //public Probaaaaaa:any
      ) 
      {   

      if(JSON.parse(localStorage.getItem('Token')) == null){

        this.flgHTML = false;
        this.nekaBrojac1 = this.nekaBrojac1 + 1
        if(this.nekaBrojac1 == 0){
            this.router.navigate(['/login']);
        }
            
      }
      else{

        this.flgHTML = true;
        this.interval = setInterval(() => { 
          console.log("Pocetna!!");

          this.currentUser_ne = JSON.parse(localStorage.getItem('currentUser'));
          this.tokenAdmin = this.ParsirajJWT(JSON.parse(localStorage.getItem('Token')));

          this.sservice.RefresujToken(this.currentUser_ne,this.tokenAdmin)
            .subscribe(
              pamtiToken => { this.pamtiToken = pamtiToken
                //console.log("pamtiToken" + this.pamtiToken);
              },
            error => {                     
            });
        },  1000 * 5 * 60 * 60 );

        this.selectedIndex = 0;
        this.racunanje_ukupno = 0;
        this.racunanje_keydown = 0;
        this.SumaNizVertikalno[0] = 0;
        this.SumaNizHorizontalno[0] = 0;
        this.mumu[0] = 0
        this.mumu[1] = 0
        this.mumuSum = 0;
        this.uvecajNesto = 0;
        this.saberi = 0;
        this.brojacV = 0;
    
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

        /*
          var id = "Miroslav Beronja2";
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
          
          }
        */   
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

          });
        */        
          
      }   
    }


    ngOnDestroy(){

        clearInterval(this.interval);

    }
  
    ngOnInit() {

      this.currentUser_ne = JSON.parse(localStorage.getItem('currentUser'));

      this.sservice.trenutni_godina()
        .subscribe(
          ngGodinaP => { this.ngGodinaP.godina = Number(ngGodinaP)

            this.trenutnaGodina = Number(this.ngGodinaP.godina);
            let d = new Date();
            this.ngMesecP = this.month[d.getMonth()];
            this.trenutniMesec = this.ngMesecP

            this.racunanjeRadnihDana(this.ngMesecP,this.ngGodinaP.godina);

            this.sservice.trenutni_nedelja()
              .then(
                ngNedeljaP => { this.ngNedeljaP.nedelja = ngNedeljaP

                  this.trenutnaNedelja = Number(this.ngNedeljaP.nedelja);
                  let izabraniMesec:number;

                  if( this.ngMesecP  == 'Januar'){izabraniMesec = 0;}
                  else if( this.ngMesecP  == 'Februar'){ izabraniMesec= 1;}
                  else if( this.ngMesecP  == 'Mart'){izabraniMesec = 2;}
                  else if( this.ngMesecP  == 'April'){izabraniMesec = 3;}
                  else if( this.ngMesecP  == 'Maj'){izabraniMesec = 4;}
                  else if( this.ngMesecP  == 'Jun'){izabraniMesec = 5;}
                  else if( this.ngMesecP  == 'Jul'){izabraniMesec = 6}
                  else if( this.ngMesecP  == 'Avgust'){izabraniMesec = 7;}
                  else if( this.ngMesecP  == 'Septembar'){izabraniMesec = 8;}
                  else if( this.ngMesecP  == 'Oktobar'){izabraniMesec = 9;}
                  else if( this.ngMesecP  == 'Novembar'){izabraniMesec = 10;}
                  else if( this.ngMesecP  == 'Decembar'){izabraniMesec = 11;}
                  else{ this.ngMesecP = 20;}

                  //console.log("izabraniMesec"+ izabraniMesec);  
                  let pamtiNedelje = this.brojNedelja(izabraniMesec,this.ngGodinaP.godina)

                  //console.log(pamtiNedelje);
                  for(var index = pamtiNedelje[0]; index<=pamtiNedelje[1]; index++){
                    this.listaBrojNedelja = index;
                  }

                  for(var i = 1; this.listaBrojNedelja >= i ; i++){
                    this.objekti_nedelje[i-1] = i;
                  }

                  for(let ar in this.objectNedelje){//Brisanje Niza-objekata!!!
                    let index = this.objectNedelje.indexOf(this.objectNedelje[ar]);
                    this.objectNedelje.splice(index, this.objectNedelje.length);
                  }

                  for (let pr of this.objekti_nedelje) {
                    let y = {};
                    y['id'] = pr;
                    y['Naziv'] = 'Nedelja' + pr
                    this.objectNedelje.push(y);
                  }

                  this.sservice.projektiPrevodPodaci(this.currentUser_ne,this.ngGodinaP.godina,this.ngMesecP,this.ngNedeljaP.nedelja)
                    .subscribe(probaMickoBre => { this.probaMickoBre = probaMickoBre

                      console.log(this.probaMickoBre);
                      /*if(this.probaMickoBre.Podaci.success == false){                                  
                          localStorage.clear();
                          this.router.navigate(['/login']);
                          return;  
                      }*/

                      for(let pr in this.probaMickoBre.Podaci){
                        let k = {};
                        k['pretraga'] = 1;
                        k['prikaz'] = 0;
                        k['text'] = "Prikaži";
                        k['Projekti'] = this.probaMickoBre.Podaci[pr].Projekti;
                        this.opcijeTabela.push(k);
                      }

                      this.opcijeTabelaMicko = this.opcijeTabela;

                      let nizIme = [];
                      let nizVrednost = []; 
                      let nizBazaIme = []; 
                      for(let i in this.probaMickoBre.Podaci){
                      //for(let i = 0; i < 3; i++){  
                        let z:number = 0
                        z = Number(i);
                        
                        for(let g in this.probaMickoBre.Podaci[z]){
                          for(let k in this.probaMickoBre.Prevod[0]){
                            if(k == g){
                              nizIme[k] = this.probaMickoBre.Prevod[0][g];
                              nizVrednost[k] = this.probaMickoBre.Podaci[z][g];
                              nizBazaIme[k] = g;
                            }
                          }
                        }

                        let nizPodaci:any[] = [];
                        
                        for(let h in nizVrednost){
                          let tt = {};
                          tt['ime'] = nizIme[h];
                          tt['satnica'] = nizVrednost[h];
                          tt['baza'] = nizBazaIme[h];
                          nizPodaci.push(tt)

                        }
                        
                        let gg = {};
                        gg['Podaci'] = nizPodaci;
                        gg['Projekti'] = this.probaMickoBre.Podaci[z]['Projekti'];
                        gg['id_pr'] = this.probaMickoBre.Podaci[z]['id_pr'];
                        this.nizObjekataBre.push(gg);
                      }

                      this.prikazTabela = this.nizObjekataBre

                      if(this.probaMickoBre == {}){                                        
                        this.flgLoading = false;
                      }
                      else{                                    
                        this.flgLoading = true;
                      }

                      for(var ii in this.prikazTabela){
                      //for(let ii = 0;ii<1;ii++){  
                        this.rez[ii] = 0
                        for(var zz in this.prikazTabela[ii].Podaci){
                          this.rez[ii] += this.prikazTabela[ii].Podaci[zz].satnica;
                        }
                        //console.log("rez"+ ": " + this.rez[ii]);
                        this.mumuSum += this.rez[ii];
                      }
                      //console.log(this.prikazTabela);

                    },
                    error => {
                      console.log("error");
                      this.Erorr(this.error._body);
                    }
                  );
              },
              error => {
                console.log("error");
                this.Erorr("Nije moguce ocitati trenutnu nedelju");
              }
            );     

        },
        error => {
          console.log("error");
          this.Erorr("Nije moguce ocitati trenutnu godinu");
        }
      );  

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
        /*   
          this.sservice.trenutni_godina()
            .subscribe(
              ngGodinaP => { this.ngGodinaP.godina = Number(ngGodinaP)

                this.trenutnaGodina = Number(this.ngGodinaP.godina);
                let d = new Date();
                this.nowMonth = this.month[d.getMonth()];
                this.ngMesecP = this.nowMonth;
                this.trenutniMesec = this.ngMesecP

                  this.racunanjeRadnihDana(this.trenutniMesec,this.ngGodinaP.godina);

                  this.sservice.trenutni_nedelja()
                        .then(
                          ngNedeljaP => { this.ngNedeljaP.nedelja = ngNedeljaP

                            this.trenutnaNedelja = Number(this.ngNedeljaP.nedelja);
                            this.odaberi_mesecP = this.ngMesecP;
                            this.odaberi_godinaP = String(this.ngGodinaP.godina);

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
                              this.objekti_nedelje[i-1] = i;
                            }

                            for(let ar in this.objectNedelje){//Brisanje Niza-objekata!!!
                              let index = this.objectNedelje.indexOf(this.objectNedelje[ar]);
                              this.objectNedelje.splice(index, this.objectNedelje.length);
                            }

                            for (let pr of this.objekti_nedelje) {
                              let y = {};
                              y['id'] = pr;
                              y['Naziv'] = 'Nedelja' + pr
                              this.objectNedelje.push(y);
                            }

                            this.nizNedelja = [{ naziv:'Nedelje',id:1 },{ naziv:'Nedelje',id:2 },{ naziv:'Nedelje',id:3 }]
                            //this.broj_nedelja_za_dati_mesec();  
                            this.selectedNedelje[0].id = this.ngNedeljaP.nedelja;
                            this.selectedNed.id = this.ngNedeljaP.nedelja;

                            this.sservice.vrednosti_baza(this.currentUser_ne,this.ngMesecP,this.ngGodinaP.godina,this.ngNedeljaP.nedelja)
                            //this.sservice.vrednosti_baza(this.currentUser_ne,this.ngMesecP,this.ngGodinaP.godina,this.selectedNed.id)
                              .subscribe(

                                projekti_lista => { this.projekti_lista = projekti_lista

                                  //console.log(this.projekti_lista);

                                  for(let kk in this.projekti_lista){
                                    this.mickoTrue[kk] = 1;
                                    this.prikazObavestenja[kk] = 0;
                                    this.textPrikazi[kk] = "Prikaži";
                                    
                                  }
                                  for(let kk in this.projekti_lista){
                                    let k = {};
                                    k['search'] = 1;
                                    k['prikaz'] = 0;
                                    k['text'] = "Prikaži";
                                    k['imeProjekta'] = this.projekti_lista[kk].Projekti;
                                    this.objektPrikazi.push(k);    
                                  }
                                  //console.log(this.objektPrikazi);

                                  if(this.projekti_lista == {}){                                        
                                    this.flgLoading = false;
                                  }
                                  else{                                    
                                    this.flgLoading = true;
                                  }

                                  if(this.projekti_lista.success == false){                                  
                                      localStorage.clear();
                                      this.router.navigate(['/login']);
                                      return;  
                                  }

                                  for(var ii in this.projekti_lista){
                                    this.Racunaj_proba(Number(this.projekti_lista[ii].Razvoj),Number(this.projekti_lista[ii].odrzavanje),
                                    Number(this.projekti_lista[ii].dokumentacija),Number(this.projekti_lista[ii].implementacija),Number(this.projekti_lista[ii].rezijski_poslovi),Number(ii));                                    
                                  }

                                  for(var ii in this.mumu){
                                    this.mumuSum = Number(this.mumuSum) + Number(this.mumu[ii]);
                                  }
                                },
                                error => { this.error = error
                                                
                                  this.Erorr(this.error._body);
                                  console.log(error);
                                  //this.GreskaFunkcija();
                                },
                                () => {console.log('done')}            
                            );
                    
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
        */  
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
        /*
          this.cuvajNesto = {Podaci:[{Razvoj:10,odrzavanje:5}],Prevod:[{Razvoj:'Razvoj',odrzavanje:'Odrzavanje'}]}


          let juhu = [];
          let yyyy = [];
          let juhu1 = 'Erviko';

          //let nizPush = [];
          for(let jj in this.cuvajNesto){
            let p = {};
            p['ime'] = this.cuvajNesto[jj].Podaci
            p['satnic'] = this.cuvajNesto.Prevod[0];
            yyyy.push(p);
          }
          console.log(yyyy);

          juhu[0] = [{ime:'Razvoj',satnica:10},{ime:'Odrzavanje',satnica:5}];
          let kk = {};
          kk['Projekti'] = juhu1;
          kk['Podaci'] = juhu[0];

          this.nizPush.push(kk);
          console.log(this.nizPush);
          console.log(this.cuvajNesto);
        */
      }

        
    }

    prikazPr(id:number,tabela:any){

      if(this.opcijeTabelaMicko[id]['text'] == 'Prikaži'){
        this.opcijeTabelaMicko[id]['text'] = 'Sakrij'
        this.opcijeTabelaMicko[id]['prikaz'] = 1;
      }
      else if(this.opcijeTabelaMicko[id]['text'] == 'Sakrij'){
        this.opcijeTabelaMicko[id]['text'] = 'Prikaži';
        this.opcijeTabelaMicko[id]['prikaz'] = 0;
      }

    }

    sumiranje(){

      this.mumuSum = 0;
      for(var ii in this.prikazTabela){
      //for(let ii = 0;ii<1;ii++){  
        this.rez[ii] = 0
        for(var zz in this.prikazTabela[ii].Podaci){
          this.rez[ii] += this.prikazTabela[ii].Podaci[zz].satnica;
        }
        if( this.opcijeTabelaMicko[ii]['pretraga'] == 1){
          this.mumuSum += this.rez[ii];
        }
      }
    }

    sacuvajProjekat(vrednosti:snimiProjekatModel[] = [],idProjekta:number){

      let flg:boolean = false;

      for(let z in vrednosti){
        if(vrednosti[z].satnica == null){
          flg = true;
        }
      }  

      //console.log(vrednosti);
    
      this.zastitaUnosa();

      if(this.gotovaFunkcija == true){
        console.log("Gotova je funkcija!!")
    
        if(this.ngGodinaP.godina == null || (this.ngGodinaP.godina != 2017 &&  this.ngGodinaP.godina != 2018 && this.ngGodinaP.godina != 2019)){
          this.text = "Nije dobro uneta godina!!"
          this.text_izlaz = 'Izlaz'; 
          this.showDialog();
          this.ngGodinaP.godina = (new Date().getFullYear());
        }
        else{

          if(flg==true){
             this.Erorr("Satnica za dati projekat nije dobro uneta");
          }
          else{
            this.sservice.CuvajProjekat(this.currentUser_ne,this.ngMesecP,this.ngGodinaP.godina,this.ngNedeljaP.nedelja,vrednosti,idProjekta)
                .subscribe(
                    cuvaj_sate => { this.cuvaj_sate = cuvaj_sate

                    if((this.cuvaj_sate._body) == '"Uspesan Insert"'){

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
            });
          }
        }
      }
      else{
        console.log("Prosao je!!")
      }  
    }

    sacuvajSveProjekate(){

      this.zastitaUnosa();

      if(this.gotovaFunkcija == true){
        let cujajBree;
        //this.currentUser_ne,this.ngMesecP,this.ngGodinaP.godina,this.ngNedeljaP.nedelja,nizPodataka
        this.sservice.SaljiSve(this.currentUser_ne,this.ngMesecP,this.ngGodinaP.godina,this.ngNedeljaP.nedelja,this.prikazTabela)
          .subscribe(

              cujajBree => { cujajBree = cujajBree
                
                console.log("cujajBree" + cujajBree);
                /*if(cujajBree == "Insert bre"){
                  this.text = "Uspešno ste sačuvali satnice!!"
                  this.text_izlaz = 'Uredu'; 
                  this.showDialog();   
                }*/
            },
            error => {
                console.log("error");
                this.Erorr("Nije moguce ocitati trenutnu godinu");
            },
            () => {
              console.log("done");

            });
      }
      else{

      }     
    }

    racunanjeUzivo(satnica:number,ime:string,id:number,projekti:string,pd:any){

      //console.log(this.prikazTabela)

      this.zastita = this.renderer.listen(this.el.nativeElement, 'keypress', (event) => {
      
        if(event.key == '-' || event.key == '+' || event.key == '.'){
          if(satnica == null){
            event.preventDefault();
           }
           else{
             //console.log("usao ovde bree");
           }
        }
      })

      this.sumiranje();

    }

    ViditiSort(){

      this.sort = true;

    }

    Svastara(){
      console.log("Usaoo!!");
      for(let jj in this.projekti_lista){

        for(let kk in this.cuvajPoziciju){
          if(this.projekti_lista[jj]['Projekti'] == this.cuvajPoziciju[kk]['naziv'] ){

            this.objektPrikazi[jj]['prikaz'] = this.cuvajPoziciju[kk]['pozicija'];
            if(this.objektPrikazi[jj]['prikaz'] == 1){
              this.objektPrikazi[jj]['text'] = "Sakrij";
            }
            else{
              this.objektPrikazi[jj]['text'] = "Prikaži";
            }
          }
        } 
      }

      this.mumuSum = 0;
      for(var ii in this.projekti_lista){
          this.Racunaj_proba(Number(this.projekti_lista[ii].Razvoj),Number(this.projekti_lista[ii].odrzavanje),Number(this.projekti_lista[ii].dokumentacija),Number(this.projekti_lista[ii].implementacija),Number(this.projekti_lista[ii].rezijski_poslovi),Number(ii));
      }
      for(var ii in this.mumu){
        this.mumuSum = Number(this.mumuSum) + Number(this.mumu[ii]);
      }

    }

    Filtriraj(){

      let rezultat = [];
      let niz = [];
      let porobaObject = [];
      this.brFiltar++;
      this.pocetakSort = true;//Tek kada ovaj flg postene true vrsice se sortiranje i na pretragu!!
      let cuvajObjektPrikazi = [];

        for(let ii in this.projekti_lista){
          rezultat[ii] = this.projekti_lista[ii]['Razvoj'] + this.projekti_lista[ii]['odrzavanje'] 
            + this.projekti_lista[ii]['dokumentacija'] + this.projekti_lista[ii]['implementacija']
            + this.projekti_lista[ii]['rezijski_poslovi'];   
        }

        if(this.probaHtmlL == false){
          this.flgFiltar = false;

          for(let ar in this.cuvajBre){//Brisanje Niza-objekata!!!
            let index = this.cuvajBre.indexOf(this.cuvajBre[ar]);
            this.cuvajBre.splice(index, this.cuvajBre.length);
          }

          for(let zz in this.objektPrikazi){
            if(this.objektPrikazi[zz]['search'] == 1){
              let u = {}
              //u['ime'] = this.objektPrikazi[zz]['imeProjekta'];
              u['ime'] = this.projekti_lista[zz]['Projekti'];
              u['pozicija'] = zz;
              u['prikazZ'] = this.objektPrikazi[zz]['prikaz'];
              this.cuvajBre.push(u)
            }
          }

          this.nestohhhh = true;
          for(let zzz in this.objektPrikazi){
            let t = {}
            t['cuvajImeProjekta'] = this.objektPrikazi[zzz]['imeProjekta']
            t['cuvajPrikaz'] =  this.objektPrikazi[zzz]['prikaz'];
            t['cuvajSearch'] =  this.objektPrikazi[zzz]['search'];
            t['cuvajText'] =  this.objektPrikazi[zzz]['text'];
            cuvajObjektPrikazi.push(t);
          }

          for(let tt in this.cuvajBre){
            for(let ll in cuvajObjektPrikazi){
              if(this.cuvajBre[tt]['ime'] == cuvajObjektPrikazi[ll]['cuvajImeProjekta']){
                cuvajObjektPrikazi[ll]['cuvajPrikaz'] = this.cuvajBre[tt]['prikazZ'];
              }
            }
          }
          /*console.log(this.cuvajBre);
          console.log(cuvajObjektPrikazi);*/
          for(let nn in this.cuvajBre){
            //for(let nn = 0;nn<4;nn++){ 
            
            let pozicijaA = 0;
            let brObj = 0;
            let isti = 0;
            let niz = [];
            let nizPozcija = [];
            let idemoBre = 0;

            pozicijaA = this.cuvajBre[nn]['pozicija'];

              for(let ll in this.cuvajBre){
                let pozicizaOstali = 0;
                pozicizaOstali = this.cuvajBre[ll]['pozicija'];

                /*if(this.projekti_lista[pozicijaA]['Razvoj'] > this.projekti_lista[pozicizaOstali]['Razvoj']){
                  brObj++;
                }
                if(this.projekti_lista[pozicijaA]['Razvoj'] == this.projekti_lista[pozicizaOstali]['Razvoj']){
                  niz[isti] = this.projekti_lista[pozicizaOstali]['Razvoj'];
                  nizPozcija[isti] = pozicizaOstali;
                  if(isti > 1){
                    idemoBre++;
                  }
                  isti++;
                }*/
                if(rezultat[pozicijaA] > rezultat[pozicizaOstali]){
                  brObj++;
                }
                if(rezultat[pozicijaA] == rezultat[pozicizaOstali]){
                  niz[isti] = this.projekti_lista[pozicizaOstali]['Razvoj'];
                  nizPozcija[isti] = pozicizaOstali;
                  if(isti > 1){
                    idemoBre++;
                  }
                  isti++;
                }
              }
              let z = {};

              z['Projekti'] = this.projekti_lista[pozicijaA]['Projekti'];
              z['Razvoj'] = this.projekti_lista[pozicijaA]['Razvoj'];
              z['odrzavanje'] = this.projekti_lista[pozicijaA]['odrzavanje'];
              z['dokumentacija'] = this.projekti_lista[pozicijaA]['dokumentacija'];
              z['implementacija'] = this.projekti_lista[pozicijaA]['implementacija'];
              z['rezijski_poslovi'] = this.projekti_lista[pozicijaA]['rezijski_poslovi'];
              z['id_pr'] = this.projekti_lista[pozicijaA]['id_pr'];
              z['poz'] = this.cuvajBre[brObj]['pozicija'];

              porobaObject[this.cuvajBre[brObj]['pozicija']] = z;

              if(isti > 1){
                for(let i = 0;i<isti;i++){
                  let t = {};

                  t['Projekti'] = this.projekti_lista[nizPozcija[i]]['Projekti'];
                  t['Razvoj'] = this.projekti_lista[nizPozcija[i]]['Razvoj'];
                  t['odrzavanje'] = this.projekti_lista[nizPozcija[i]]['odrzavanje'];
                  t['dokumentacija'] = this.projekti_lista[nizPozcija[i]]['dokumentacija'];
                  t['implementacija'] = this.projekti_lista[nizPozcija[i]]['implementacija'];
                  t['rezijski_poslovi'] = this.projekti_lista[nizPozcija[i]]['rezijski_poslovi'];
                  t['id_pr'] = this.projekti_lista[nizPozcija[i]]['id_pr'];
                  t['poz'] = this.cuvajBre[brObj + i]['pozicija'];

                  porobaObject[this.cuvajBre[brObj + i]['pozicija']] = t;
                }
              }
          }
          /*
            for(let pr in porobaObject){
              let u = {};

              u['Projekti'] = porobaObject[pr]['Projekti']
              u['Razvoj'] = porobaObject[pr]['Razvoj'];
              u['odrzavanje'] = porobaObject[pr]['odrzavanje']
              u['dokumentacija'] = porobaObject[pr]['dokumentacija']
              u['implementacija'] = porobaObject[pr]['implementacija']
              u['rezijski_poslovi'] = porobaObject[pr]['rezijski_poslovi']
              u['id_pr'] = porobaObject[pr]['id_pr']

              this.projekti_lista[porobaObject[pr]['poz']] = u;
            }
          */
        }
        else if(this.probaHtmlL == true){
          this.flgFiltar = true;

          for(let ar in this.cuvajBre){//Brisanje Niza-objekata!!!
            let index = this.cuvajBre.indexOf(this.cuvajBre[ar]);
            this.cuvajBre.splice(index, this.cuvajBre.length);
          }

          for(let zz in this.objektPrikazi){
            if(this.objektPrikazi[zz]['search'] == 1){
              let u = {}
              //u['ime'] = this.objektPrikazi[zz]['imeProjekta'];
              u['ime'] = this.projekti_lista[zz]['Projekti'];
              u['pozicija'] = zz;
              u['prikazZ'] = this.objektPrikazi[zz]['prikaz'];
              this.cuvajBre.push(u)
            }
          }

          for(let zzz in this.objektPrikazi){
            let t = {}
            t['cuvajImeProjekta'] = this.objektPrikazi[zzz]['imeProjekta']
            t['cuvajPrikaz'] =  this.objektPrikazi[zzz]['prikaz'];
            t['cuvajSearch'] =  this.objektPrikazi[zzz]['search'];
            t['cuvajText'] =  this.objektPrikazi[zzz]['text'];
            cuvajObjektPrikazi.push(t);
          }

          for(let tt in this.cuvajBre){
            for(let ll in cuvajObjektPrikazi){
              if(this.cuvajBre[tt]['ime'] == cuvajObjektPrikazi[ll]['cuvajImeProjekta']){
                cuvajObjektPrikazi[ll]['cuvajPrikaz'] = this.cuvajBre[tt]['prikazZ'];
              }
            }
          }
          //PRovera 
          for(let nn in this.cuvajBre){
            //for(let nn = 0;nn<4;nn++){ 
            let pozicijaA = 0;
            let brObj = 0;
            let isti = 0;
            let niz = [];
            let nizPozcija = [];
            let idemoBre = 0;

            pozicijaA = this.cuvajBre[nn]['pozicija'];

            for(let ll in this.cuvajBre){
              let pozicizaOstali = 0;
              pozicizaOstali = this.cuvajBre[ll]['pozicija'];

              /*if(this.projekti_lista[pozicijaA]['Razvoj'] < this.projekti_lista[pozicizaOstali]['Razvoj']){
                brObj++;
              }
              if(this.projekti_lista[pozicijaA]['Razvoj'] == this.projekti_lista[pozicizaOstali]['Razvoj']){
                niz[isti] = this.projekti_lista[pozicizaOstali]['Razvoj'];
                nizPozcija[isti] = pozicizaOstali;
                if(isti > 1){
                  idemoBre++;
                }
                isti++;
              }*/
              if(rezultat[pozicijaA] < rezultat[pozicizaOstali]){
                brObj++;
              }
              if(rezultat[pozicijaA] == rezultat[pozicizaOstali]){
                niz[isti] = this.projekti_lista[pozicizaOstali]['Razvoj'];
                nizPozcija[isti] = pozicizaOstali;
                if(isti > 1){
                  idemoBre++;
                }
                isti++;
              }
            }
            let z = {};

            z['Projekti'] = this.projekti_lista[pozicijaA]['Projekti'];
            z['Razvoj'] = this.projekti_lista[pozicijaA]['Razvoj'];
            z['odrzavanje'] = this.projekti_lista[pozicijaA]['odrzavanje'];
            z['dokumentacija'] = this.projekti_lista[pozicijaA]['dokumentacija'];
            z['implementacija'] = this.projekti_lista[pozicijaA]['implementacija'];
            z['rezijski_poslovi'] = this.projekti_lista[pozicijaA]['rezijski_poslovi'];
            z['id_pr'] = this.projekti_lista[pozicijaA]['id_pr'];
            z['poz'] = this.cuvajBre[brObj]['pozicija'];

            porobaObject[this.cuvajBre[brObj]['pozicija']] = z;

            if(isti > 1){
              for(let i = 0;i<isti;i++){
                let t = {};

                t['Projekti'] = this.projekti_lista[nizPozcija[i]]['Projekti'];
                t['Razvoj'] = this.projekti_lista[nizPozcija[i]]['Razvoj'];
                t['odrzavanje'] = this.projekti_lista[nizPozcija[i]]['odrzavanje'];
                t['dokumentacija'] = this.projekti_lista[nizPozcija[i]]['dokumentacija'];
                t['implementacija'] = this.projekti_lista[nizPozcija[i]]['implementacija'];
                t['rezijski_poslovi'] = this.projekti_lista[nizPozcija[i]]['rezijski_poslovi'];
                t['id_pr'] = this.projekti_lista[nizPozcija[i]]['id_pr'];
                t['poz'] = this.cuvajBre[brObj + i]['pozicija'];

                porobaObject[this.cuvajBre[brObj + i]['pozicija']] = t;
              }
            }
          }  
        }

        for(let pr in porobaObject){
            let u = {};

            u['Projekti'] = porobaObject[pr]['Projekti']
            u['Razvoj'] = porobaObject[pr]['Razvoj'];
            u['odrzavanje'] = porobaObject[pr]['odrzavanje']
            u['dokumentacija'] = porobaObject[pr]['dokumentacija']
            u['implementacija'] = porobaObject[pr]['implementacija']
            u['rezijski_poslovi'] = porobaObject[pr]['rezijski_poslovi']
            u['id_pr'] = porobaObject[pr]['id_pr']

            this.projekti_lista[porobaObject[pr]['poz']] = u;
        }

        for(let z in this.projekti_lista){
          //for(let z = 0;z < 21;z++){
          //console.log("ime" + this.projekti_lista[z]['Projekti']);
          for(let jj in this.objektPrikazi){
            if(this.projekti_lista[z]['Projekti'] == cuvajObjektPrikazi[jj]['cuvajImeProjekta']){
              this.objektPrikazi[z]['imeProjekta'] =  cuvajObjektPrikazi[jj]['cuvajImeProjekta']
              this.objektPrikazi[z]['prikaz'] =  cuvajObjektPrikazi[jj]['cuvajPrikaz'];
              this.objektPrikazi[z]['search'] =  cuvajObjektPrikazi[jj]['cuvajSearch'];
              this.objektPrikazi[z]['text'] =  cuvajObjektPrikazi[jj]['cuvajText'];

            }
          }
        }

        this.RacunajSumePretraga();

        /*console.log(this.objektPrikazi);
        console.log(this.projekti_lista);*/

        /*this.mumuSum = 0;
        for(var ii in this.projekti_lista){
            this.Racunaj_proba(Number(this.projekti_lista[ii].Razvoj),Number(this.projekti_lista[ii].odrzavanje),Number(this.projekti_lista[ii].dokumentacija),Number(this.projekti_lista[ii].implementacija),Number(this.projekti_lista[ii].rezijski_poslovi),Number(ii));
        }
        for(var ii in this.mumu){
          this.mumuSum = Number(this.mumuSum) + Number(this.mumu[ii]);
        }
        this.flgGotovo = true;*/
       
       
      /*
        for(let pr in rezultat){
          niz[pr] = 'g';
        }

        for(let i = 0;i<rezultat.length;i++){

          let brojac = 0;
          let isti = 0
          //console.log(nizPun[i]);
          for(let z = 0;z<rezultat.length;z++){
            if(rezultat[i] > rezultat[z]){
              brojac++;
            }
            if(rezultat[i] == rezultat[z]){
              isti++;
            }
          }
          niz[brojac] = rezultat[i];
          
          if(isti > 1){
            for(let h = 1;h <isti;h++){
              niz[brojac + h] = rezultat[i];
            }
            isti = 0;
          }     
        }

        

        //let nizPun = [10,5,1,6,12,2];
        let nizPun = [5,10,4,3,5,5,1,1,11,6,7,100,3,0];
        let brNesto = 0;

        let objects = []
        objects[0] = {strength: 3, name: "Leo"}
        objects[1] = {strength: 3, name: "Mike"}

        var str = "HELLO WORLD";
        var res = str.charAt(0);

        //console.log(objects[1].name.toLowerCase().indexOf("k"))


        let z = objects[0].name.charAt(0);
        //console.log("z" + z);

        this.probaFiltar[0] = projekti[0];

        //for(let pr in nizPun){
        //  niz[pr] = 'g';
        //}
        //console.log(niz);
        for(let i = 0;i<nizPun.length;i++){

          let brojac = 0;
          let isti = 0
          //console.log(nizPun[i]);
          for(let z = 0;z<nizPun.length;z++){
            if(nizPun[i] > nizPun[z]){
              brojac++;
            }
            if(nizPun[i] == nizPun[z]){
              isti++;
            }
          }
          niz[brojac] = nizPun[i];
          
          if(isti > 1){
            for(let h = 1;h <isti;h++){
              niz[brojac + h] = nizPun[i];
            }
            isti = 0;
          }     
        }
      */
      /*
       if(this.flgSearchSort == true){
        console.log("this.flgSearchSort" + this.flgSearchSort);
        for(let k in projekti){
          let y = {};
          let h = {};
          y['Projekti'] = projekti[k]['Projekti'];
          y['Razvoj'] = projekti[k]['Razvoj'];
          y['odrzavanje'] = projekti[k]['odrzavanje'];
          y['dokumentacija'] = projekti[k]['dokumentacija'];
          y['implementacija'] = projekti[k]['implementacija'];
          y['rezijski_poslovi'] = projekti[k]['rezijski_poslovi'];
          y['id_pr'] = projekti[k]['id_pr'];
          h['Projekti'] = " ";
          h['Razvoj'] = 0;
          h['odrzavanje'] = 0;
          h['dokumentacija'] = 0;
          h['implementacija'] = 0;
          h['rezijski_poslovi'] = 0;
          h['id_pr'] = 0;


          this.cuvajProjekte[k] = y;
          porobaObject[k] = h;
        }

        for(let ii in this.projekti_lista){
          rezultat[ii] = this.projekti_lista[ii]['Razvoj'] + this.projekti_lista[ii]['odrzavanje'] 
            + this.projekti_lista[ii]['dokumentacija'] + this.projekti_lista[ii]['implementacija']
            + this.projekti_lista[ii]['rezijski_poslovi'];   
        }

        for(let ar in this.cuvajPoziciju){//Brisanje Niza-objekata!!!
          let index = this.cuvajPoziciju.indexOf(this.cuvajPoziciju[ar]);
          this.cuvajPoziciju.splice(index, this.cuvajPoziciju.length);
        }

        if(this.flgFiltar == true){
          this.flgFiltar = false;
          for(let i in this.cuvajProjekte){ 
              //for(let i = 0;i<1;i++){
            let brojacObj = 0;
            let istiObj = 0;
            let cuvajJednake = [];
            let cuvajJednakeVece = [];
            let idemo = 0;

            let p = {};
            p['naziv'] = this.cuvajProjekte[i]['Projekti'];
            p['pozicija'] = this.objektPrikazi[i]['prikaz'];

            this.cuvajPoziciju.push(p);

            for(let pro in this.cuvajProjekte){

              //if(this.cuvajProjekte[i].Razvoj > this.cuvajProjekte[pro].Razvoj){
              if(rezultat[i] > rezultat[pro]){  

                brojacObj++;

              }
              //if(this.cuvajProjekte[i].Razvoj == this.cuvajProjekte[pro].Razvoj){
              if(rezultat[i] == rezultat[pro]){ 

                cuvajJednake[istiObj] = pro;
                if(istiObj > 1){
                  idemo++;
                }
                istiObj++;
              }
            }

            let z = {};

            z['Projekti'] = this.cuvajProjekte[i]['Projekti']
            z['Razvoj'] = this.cuvajProjekte[i]['Razvoj'];
            z['odrzavanje'] = this.cuvajProjekte[i]['odrzavanje']
            z['dokumentacija'] = this.cuvajProjekte[i]['dokumentacija']
            z['implementacija'] = this.cuvajProjekte[i]['implementacija']
            z['rezijski_poslovi'] = this.cuvajProjekte[i]['rezijski_poslovi']
            z['id_pr'] = this.cuvajProjekte[i]['id_pr']

            porobaObject[brojacObj + idemo] = z;

            if(istiObj > 1){
              for(let u = 0;u<istiObj;u++){

                let t = {}
                let cuvajMicko = cuvajJednake[u];

                t['Projekti'] = this.cuvajProjekte[cuvajMicko]['Projekti']
                t['Razvoj'] = this.cuvajProjekte[cuvajMicko]['Razvoj'];
                t['odrzavanje'] = this.cuvajProjekte[cuvajMicko]['odrzavanje']
                t['dokumentacija'] = this.cuvajProjekte[cuvajMicko]['dokumentacija']
                t['implementacija'] = this.cuvajProjekte[cuvajMicko]['implementacija']
                t['rezijski_poslovi'] = this.cuvajProjekte[cuvajMicko]['rezijski_poslovi']
                t['id_pr'] = this.cuvajProjekte[cuvajMicko]['id_pr'];

                porobaObject[brojacObj + u] = t;

              }
            }
          }
          //console.log(this.cuvajPoziciju);

        }
        else if(this.flgFiltar == false){
          this.flgFiltar = true;
          for(let i in this.cuvajProjekte){ 
              //for(let i = 0;i<1;i++){
            let brojacObj = 0;
            let istiObj = 0;
            let cuvajJednake = [];
            let cuvajJednakeVece = [];
            let idemo = 0;

            let p = {};
            p['naziv'] = this.cuvajProjekte[i]['Projekti'];
            p['pozicija'] = this.objektPrikazi[i]['prikaz'];

          this.cuvajPoziciju.push(p);

            for(let pro in this.cuvajProjekte){

              //if(this.cuvajProjekte[i].Razvoj < this.cuvajProjekte[pro].Razvoj){
              if(rezultat[i] < rezultat[pro]){    
                brojacObj++;

              }
              //if(this.cuvajProjekte[i].Razvoj == this.cuvajProjekte[pro].Razvoj){
              if(rezultat[i] == rezultat[pro]){ 

                cuvajJednake[istiObj] = pro;
                if(istiObj > 1){
                  //console.log("Ima istih");
                  idemo++;
                }

                istiObj++;
              }
            }

            let z = {};

            z['Projekti'] = this.cuvajProjekte[i]['Projekti']
            z['Razvoj'] = this.cuvajProjekte[i]['Razvoj'];
            z['odrzavanje'] = this.cuvajProjekte[i]['odrzavanje']
            z['dokumentacija'] = this.cuvajProjekte[i]['dokumentacija']
            z['implementacija'] = this.cuvajProjekte[i]['implementacija']
            z['rezijski_poslovi'] = this.cuvajProjekte[i]['rezijski_poslovi']
            z['id_pr'] = this.cuvajProjekte[i]['id_pr']

            porobaObject[brojacObj + idemo] = z;

            if(istiObj > 1){
              for(let u = 0;u<istiObj;u++){

                let t = {}
                let cuvajMicko = cuvajJednake[u];

                t['Projekti'] = this.cuvajProjekte[cuvajMicko]['Projekti']
                t['Razvoj'] = this.cuvajProjekte[cuvajMicko]['Razvoj'];
                t['odrzavanje'] = this.cuvajProjekte[cuvajMicko]['odrzavanje']
                t['dokumentacija'] = this.cuvajProjekte[cuvajMicko]['dokumentacija']
                t['implementacija'] = this.cuvajProjekte[cuvajMicko]['implementacija']
                t['rezijski_poslovi'] = this.cuvajProjekte[cuvajMicko]['rezijski_poslovi']
                t['id_pr'] = this.cuvajProjekte[cuvajMicko]['id_pr'];

                porobaObject[brojacObj + u] = t;

              }
            }
          }
        } 

        for(let ii in porobaObject){
            let t = {}
            
            t['Projekti'] = porobaObject[ii]['Projekti']
            t['Razvoj'] = porobaObject[ii]['Razvoj'];
            t['odrzavanje'] = porobaObject[ii]['odrzavanje']
            t['dokumentacija'] = porobaObject[ii]['dokumentacija']
            t['implementacija'] = porobaObject[ii]['implementacija']
            t['rezijski_poslovi'] = porobaObject[ii]['rezijski_poslovi']
            t['id_pr'] = porobaObject[ii]['id_pr'];

            this.projekti_lista[ii] = t;

        }

        for(let jj in this.projekti_lista){

          for(let kk in this.cuvajPoziciju){
            if(this.projekti_lista[jj]['Projekti'] == this.cuvajPoziciju[kk]['naziv'] ){

              this.objektPrikazi[jj]['prikaz'] = this.cuvajPoziciju[kk]['pozicija'];
              if(this.objektPrikazi[jj]['prikaz'] == 1){
                this.objektPrikazi[jj]['text'] = "Sakrij";
              }
              else{
                this.objektPrikazi[jj]['text'] = "Prikaži";
              }
            }
          } 
        }
      
        this.mumuSum = 0;
        for(var ii in this.projekti_lista){
            this.Racunaj_proba(Number(this.projekti_lista[ii].Razvoj),Number(this.projekti_lista[ii].odrzavanje),Number(this.projekti_lista[ii].dokumentacija),Number(this.projekti_lista[ii].implementacija),Number(this.projekti_lista[ii].rezijski_poslovi),Number(ii));
        }
        for(var ii in this.mumu){
          this.mumuSum = Number(this.mumuSum) + Number(this.mumu[ii]);
        }
       }
      */ 

    }

    SortFunkcija(){

      for(let ar in this.cuvajprojekti_lista){//Brisanje Niza-objekata!!!
        let index = this.cuvajprojekti_lista.indexOf(this.cuvajprojekti_lista[ar]);
        this.cuvajprojekti_lista.splice(index, this.cuvajprojekti_lista.length);
      }

      for(let jj in this.projekti_lista){
        let h = {};
        h['Projektii'] = this.projekti_lista[jj]['Projekti'];
        h['Razvojj'] = this.projekti_lista[jj]['Razvoj'];
        h['odrzavanjee'] = this.projekti_lista[jj]['odrzavanje'];
        h['dokumentacijaa'] = this.projekti_lista[jj]['dokumentacija'];
        h['implementacijaa'] = this.projekti_lista[jj]['implementacija'];
        h['rezijski_poslovii'] = this.projekti_lista[jj]['rezijski_poslovi'];
        h['id_prr'] = this.projekti_lista[jj]['id_pr'];

        this.cuvajprojekti_lista.push(h);
      }

      for(let z in this.projekti_lista){
        for(let k in this.objektPrikazi){
          if(this.projekti_lista[z]['Projekti'] == this.objektPrikazi[k]['imeProjekta']){
            this.cuvajprojekti_lista[k]['Projektii'] = this.objektPrikazi[k]['imeProjekta']
            this.cuvajprojekti_lista[k]['Razvojj'] = this.projekti_lista[z]['Razvoj'];
            this.cuvajprojekti_lista[k]['odrzavanjee'] = this.projekti_lista[z]['odrzavanje'];
            this.cuvajprojekti_lista[k]['dokumentacijaa'] = this.projekti_lista[z]['dokumentacija'];
            this.cuvajprojekti_lista[k]['implementacijaa'] = this.projekti_lista[z]['implementacija'];
            this.cuvajprojekti_lista[k]['rezijski_poslovii'] = this.projekti_lista[z]['rezijski_poslovi'];
            this.cuvajprojekti_lista[k]['id_prr'] = this.projekti_lista[z]['id_pr']; 
          }
        }
      }

      for(let z in this.cuvajprojekti_lista){
        this.projekti_lista[z]['Projekti'] = this.cuvajprojekti_lista[z]['Projektii'];
        this.projekti_lista[z]['Razvoj'] = this.cuvajprojekti_lista[z]['Razvojj'];
        this.projekti_lista[z]['odrzavanje'] =  this.cuvajprojekti_lista[z]['odrzavanjee'];
        this.projekti_lista[z]['dokumentacija'] = this.cuvajprojekti_lista[z]['dokumentacijaa'];
        this.projekti_lista[z]['implementacija'] = this.cuvajprojekti_lista[z]['implementacijaa'];
        this.projekti_lista[z]['rezijski_poslovi'] = this.cuvajprojekti_lista[z]['rezijski_poslovii'];
        this.projekti_lista[z]['id_pr'] = this.cuvajprojekti_lista[z]['id_prr'];
      }  

      this.Filtriraj();

      /*this.mumuSum = 0;
      for(var ii in this.projekti_lista){
        this.Racunaj_proba(Number(this.projekti_lista[ii].Razvoj),Number(this.projekti_lista[ii].odrzavanje),Number(this.projekti_lista[ii].dokumentacija),Number(this.projekti_lista[ii].implementacija),Number(this.projekti_lista[ii].rezijski_poslovi),Number(ii));
      }
      for(var ii in this.mumu){
        if(this.objektPrikazi[ii]['search'] == 1){
          this.mumuSum = Number(this.mumuSum) + Number(this.mumu[ii]);
        }
      }  */

    }

    RacunajSume(){

      this.mumuSum = 0;
      for(var ii in this.projekti_lista){
          this.Racunaj_proba(Number(this.projekti_lista[ii].Razvoj),Number(this.projekti_lista[ii].odrzavanje),Number(this.projekti_lista[ii].dokumentacija),Number(this.projekti_lista[ii].implementacija),Number(this.projekti_lista[ii].rezijski_poslovi),Number(ii));
      }
      for(var ii in this.mumu){
        if(this.objektPrikazi[ii]['search'] == 1){  
          this.mumuSum = Number(this.mumuSum) + Number(this.mumu[ii]);
        }
      }

    }

    RacunajSumePretraga(){

      this.mumuSum = 0;
      for(var ii in this.projekti_lista){
          this.Racunaj_proba(Number(this.projekti_lista[ii].Razvoj),Number(this.projekti_lista[ii].odrzavanje),Number(this.projekti_lista[ii].dokumentacija),Number(this.projekti_lista[ii].implementacija),Number(this.projekti_lista[ii].rezijski_poslovi),Number(ii));
      }
      for(var ii in this.mumu){
        //if(this.opcijeTabelaMicko[ii]['pretraga'] == 1){
          this.mumuSum = Number(this.mumuSum) + Number(this.mumu[ii]);
        //}
      }

    }

    projektiSatnice(){

      for(let ar in this.prikazTabela){//Brisanje Niza-objekata!!!
        let index = this.prikazTabela.indexOf(this.prikazTabela[ar]);
        this.prikazTabela.splice(index, this.prikazTabela.length);
      }

      for(let pr in this.probaMickoBre.Podaci){
        let k = {};
        k['pretraga'] = 1;
        k['prikaz'] = 0;
        k['text'] = "Prikaži";
        k['Projekti'] = this.probaMickoBre.Podaci[pr].Projekti;
        this.opcijeTabela.push(k);
      }

      this.opcijeTabelaMicko = this.opcijeTabela;

      let nizIme = [];
      let nizVrednost = [];
      let nizBazaIme = [];   
      for(let i in this.probaMickoBre.Podaci){
      //for(let i = 0; i < 3; i++){  
        let z:number = 0
        z = Number(i);
        
        for(let g in this.probaMickoBre.Podaci[z]){
          for(let k in this.probaMickoBre.Prevod[0]){
            if(k == g){
              nizIme[k] = this.probaMickoBre.Prevod[0][g];
              nizVrednost[k] = this.probaMickoBre.Podaci[z][g];
              nizBazaIme[k] = g;
            }
          }
        }

        let nizPodaci:any[] = [];
        
        for(let h in nizVrednost){
          let tt = {};
          tt['ime'] = nizIme[h];
          tt['satnica'] = nizVrednost[h];
          tt['baza'] = nizBazaIme[h];
          nizPodaci.push(tt)
        }
  
        let gg = {};
        gg['Podaci'] = nizPodaci;
        gg['Projekti'] = this.probaMickoBre.Podaci[z]['Projekti'];
        gg['id_pr'] = this.probaMickoBre.Podaci[z]['id_pr'];
        this.nizObjekataBre.push(gg);
      }

      this.prikazTabela = this.nizObjekataBre

      if(this.probaMickoBre == {}){                                        
        this.flgLoading = false;
      }
      else{                                    
        this.flgLoading = true;
      }

      this.mumuSum = 0;
      for(var ii in this.prikazTabela){
      //for(let ii = 0;ii<1;ii++){  
        this.rez[ii] = 0
        for(var zz in this.prikazTabela[ii].Podaci){
          this.rez[ii] += this.prikazTabela[ii].Podaci[zz].satnica;
        }
        //console.log("rez"+ ": " + this.rez[ii]);
        this.mumuSum += this.rez[ii];
      }
    }

    onChangeNedelja(godina:any,mesec:any,nedelja:any){

      this.brisanje_vrednosti_iz_selecta();
      this.brojNedeljaZaDatiMesecGodinu();

      this.sservice.projektiPrevodPodaci(this.currentUser_ne,godina,mesec,nedelja)
        .subscribe(probaMickoBre => { this.probaMickoBre = probaMickoBre

          this.projektiSatnice();

        },
        error => {
          console.log("error");
          this.Erorr(this.error._body);
        }
      );

      /*
        this.sservice.vrednosti_baza(this.currentUser_ne,mesec,godina,nedelja)
            .subscribe(
              projekti_lista => { this.projekti_lista = projekti_lista

                
                if(this.projekti_lista != null){
                  if(this.pocetakSort  == true){
                    //this.Filtriraj();
                    for(var ii in this.prikazTabela){
                        //for(let ii = 0;ii<1;ii++){  
                      this.rez[ii] = 0
                      for(var zz in this.prikazTabela[ii].Podaci){
                        this.rez[ii] += this.prikazTabela[ii].Podaci[zz].satnica;
                      }
                      console.log("rez"+ ": " + this.rez[ii]);
                      this.mumuSum += this.rez[ii];
                    }
                  }
                }
                  
                if(this.brojacV < 2){
                  
                  this.brojacV++;
                  this.intrevalPamtiOtvoreneprojekte = setInterval(() => { 

                    if(this.brojacV == 1){
                      clearInterval(this.intrevalPamtiOtvoreneprojekte);
                      this.brojacV = 0;
                    }

                    for(let i = 0;Object.keys(this.projekti_lista).length > i;i++){
                    } 
  
                  }, 1 );
                }
            },
            error => { this.error = error
              this.Erorr(this.error._body);
              console.log(error);
            },
            () => {
              console.log("done");
              if(this.pocetakSort  == true){
                //this.SortFunkcija(); 
              }
            }
        );
      */
    } 
    
    onChangeMesec(godina:any,mesec:any,nedelja:any){

      this.racunanjeRadnihDana(mesec,godina);

      this.brisanje_vrednosti_iz_selecta();
      this.brojNedeljaZaDatiMesecGodinu();
      if(this.objectNedelje.length < nedelja)
      { 
        this.ngNedeljaP.nedelja = 1;
        nedelja = 1;
      }

      this.sservice.projektiPrevodPodaci(this.currentUser_ne,godina,mesec,nedelja)
        .subscribe(probaMickoBre => { this.probaMickoBre = probaMickoBre

          this.projektiSatnice();

        },
        error => {
          console.log("error");
          this.Erorr(this.error._body);
        }
      );
      /*
        this.sservice.vrednosti_baza(this.currentUser_ne,mesec,godina,nedelja)
            .subscribe(
              projekti_lista => { this.projekti_lista = projekti_lista
                
                if(this.pocetakSort  == false){  
                  this.RacunajSumePretraga();
                }

                if(this.brojacV < 2){
                  
                  this.brojacV++;
                  this.intrevalPamtiOtvoreneprojekte = setInterval(() => { 

                  if(this.brojacV == 1){
                    clearInterval(this.intrevalPamtiOtvoreneprojekte);
                    this.brojacV = 0;
                  }
                  for(let i = 0;Object.keys(this.projekti_lista).length > i;i++){
                  }
                  }, 1 );
                }  
            },
            error => { this.error = error
              this.Erorr(this.error._body);
              console.log(error);
            },
            () => {
              console.log('done')
              if(this.pocetakSort  == true){
                this.SortFunkcija();
              }
          }
        );
      */  
    }

    klikGodina(godina:any,mesec:any,nedelja:any){
      /*
        let nizDani = ['Ponedeljak','Utorak','Sreda','Cetvrtak','Petak','Subota','Nedelja'];
        let mesecOdabrani;
        let redniBrojMesec;

        if(mesec == 'Januar'){mesecOdabrani = 'Jan',redniBrojMesec = 1}
        else if(mesec == 'Februar'){mesecOdabrani = 'Feb',redniBrojMesec = 2}
        else if(mesec == 'Mart'){mesecOdabrani = 'Mar',redniBrojMesec = 3}
        else if(mesec == 'April'){mesecOdabrani = 'Apr',redniBrojMesec = 4}
        else if(mesec == 'Maj'){mesecOdabrani = 'May',redniBrojMesec = 5}
        else if(mesec == 'Jun'){mesecOdabrani = 'Jun',redniBrojMesec = 6}
        else if(mesec == 'Jul'){mesecOdabrani = 'Jul',redniBrojMesec = 7}
        else if(mesec == 'Avgust'){mesecOdabrani = 'Aug',redniBrojMesec = 8}
        else if(mesec == 'Septembar'){mesecOdabrani = 'Sep',redniBrojMesec = 9}
        else if(mesec == 'Oktobar'){mesecOdabrani = 'Oct',redniBrojMesec = 10}
        else if(mesec == 'Novembar'){mesecOdabrani = 'Nov',redniBrojMesec = 11}
        else if(mesec == 'Decembar'){mesecOdabrani = 'Dec',redniBrojMesec = 12}

        let date = new Date();
    

        let brojDanaUMesecu = new Date(2017, redniBrojMesec , 0).getDate();
        //console.log("brojDanaUMesecu" + brojDanaUMesecu);

        let prvi = String(new Date(""+mesecOdabrani+" 01, "+godina+" 01:00:00"));
        let poslednji = String(new Date(""+mesecOdabrani+""+brojDanaUMesecu+", "+godina+" 11:00:00"));

        let danPrvi = prvi.substring(0,3);
        console.log("danPrvi" + danPrvi)
        let danPoslednji = poslednji.substring(0,3);

        if(danPrvi == 'Mon'){danPrvi = nizDani[0],this.textObavestenjaMesecPrvi = "Prva nedelja ima 5 radnih dana"}
        else if(danPrvi == 'Tue'){danPrvi = nizDani[1],this.textObavestenjaMesecPrvi = "Prva nedelja ima 4 radna dana"}
        else if(danPrvi == 'Wed'){danPrvi = nizDani[2],this.textObavestenjaMesecPrvi = "Prva nedelja ima 3 radna dana"}
        else if(danPrvi == 'Thu'){danPrvi = nizDani[3],this.textObavestenjaMesecPrvi = "Prva nedelja ima 2 radna dana"}
        else if(danPrvi == 'Fri'){danPrvi = nizDani[4],this.textObavestenjaMesecPrvi = "Prva nedelja ima 1 radni dan"}
        else if(danPrvi == 'Sat'){danPrvi = nizDani[5],this.textObavestenjaMesecPrvi = "Prva nedelja nema radnih dana"}
        else if(danPrvi == 'Sun'){danPrvi = nizDani[6],this.textObavestenjaMesecPrvi = "Prva nedelja nema radnih dana"}

        if(danPoslednji == 'Mon'){danPoslednji = nizDani[0],this.textObavestenjaMesecPoslednji = "Poslednja nedelja ima 1 radni dana"}
        else if(danPoslednji == 'Tue'){danPoslednji = nizDani[1],this.textObavestenjaMesecPoslednji = "Poslednja nedelja ima 2 radna dana"}
        else if(danPoslednji == 'Wed'){danPoslednji = nizDani[2],this.textObavestenjaMesecPoslednji = "Poslednja nedelja ima 3 radna dana"}
        else if(danPoslednji == 'Thu'){danPoslednji = nizDani[3],this.textObavestenjaMesecPoslednji = "Poslednja nedelja ima 4 radna dana"}
        else if(danPoslednji == 'Fri'){danPoslednji = nizDani[4],this.textObavestenjaMesecPoslednji = "Poslednja nedelja ima 5 radnih dana"}
        else if(danPoslednji == 'Sat'){danPoslednji = nizDani[5],this.textObavestenjaMesecPoslednji = "Poslednja nedelja nema radnih dana"}
        else if(danPoslednji == 'Sun'){danPoslednji = nizDani[6],this.textObavestenjaMesecPoslednji = "Poslednja nedelja nema radnih dana"}

        console.log("Prvi dan" + danPrvi);
        console.log("Poslednji dan" + danPoslednji);
      */
      this.racunanjeRadnihDana(mesec,godina); 

      this.brisanje_vrednosti_iz_selecta();
      this.brojNedeljaZaDatiMesecGodinu();


      this.NizMesecBackspace[0] = godina;

      this.renderer.listen(this.el.nativeElement, 'keyup', (event) => {
            this.ngGodinaP.godina = this.NizMesecBackspace[0];
      });

      this.sservice.projektiPrevodPodaci(this.currentUser_ne,godina,mesec,nedelja)
        .subscribe(probaMickoBre => { this.probaMickoBre = probaMickoBre

          this.projektiSatnice();

        },
        error => {
          console.log("error");
          this.Erorr(this.error._body);
        }
      );

      /*
      this.sservice.vrednosti_baza(this.currentUser_ne,mesec,godina,nedelja)
            .subscribe(

              projekti_lista => { this.projekti_lista = projekti_lista
                          
                  this.mumuSum = 0;
                  for(var ii in this.projekti_lista){
                      this.Racunaj_proba(Number(this.projekti_lista[ii].Razvoj),Number(this.projekti_lista[ii].odrzavanje),Number(this.projekti_lista[ii].dokumentacija),Number(this.projekti_lista[ii].implementacija),Number(this.projekti_lista[ii].rezijski_poslovi),Number(ii));
                  }
                  for(var ii in this.mumu){
                    this.mumuSum = Number(this.mumuSum) + Number(this.mumu[ii]);
                    console.log("this.mumuSum" + Number(this.mumuSum)) 
                  }

                  for(let jj in this.projekti_lista){
                    for(let kk in this.cuvajPoziciju){
                      if(this.projekti_lista[jj]['Projekti'] == this.cuvajPoziciju[kk]['naziv'] ){

                        this.objektPrikazi[jj]['prikaz'] = this.cuvajPoziciju[kk]['pozicija'];
                        if(this.objektPrikazi[jj]['prikaz'] == 1){
                              this.objektPrikazi[jj]['text'] = "Sakrij";
                        }
                        else{
                              this.objektPrikazi[jj]['text'] = "Prikaži";
                        }
                      }
                    } 
                  }

              },
              error => { this.error = error
                this.Erorr(this.error._body);
                console.log(error);
              },
              () => {console.log('done')}
      );
      */
    }

    Pretraga(text:any){

      let brojacSlova = 0;

      for(let pr in this.prikazTabela){
        if(this.prikazTabela[pr]['Projekti'].toLowerCase().indexOf(""+this.textInput+"") > -1){
         
          this.opcijeTabelaMicko[pr]['pretraga'] = 1;
          brojacSlova++;
          console.log("brojacSlova" + this.prikazTabela[pr]['Projekti'])
        }
        else{
          //this.mickoTrue[pr] = 0;
          this.opcijeTabelaMicko[pr]['pretraga'] = 0;
        }
      }
      console.log(this.opcijeTabelaMicko);
      this.sumiranje();

      if(this.pocetakSort  == true){
        this.Filtriraj();
      }

    }

    ngForRendred() {
      console.log('NgFor is Rendered');
      //document.getElementById("1").style.display = "block";
      //document.getElementById("123451").innerHTML = "Sakrij"; 
      for(let i = 0;Object.keys(this.projekti_lista).length > i;i++){

        console.log("Prvo" + Object.keys(this.projekti_lista).length);
        document.getElementById(""+i+"").style.display = "block";
        document.getElementById("12345"+i+"").innerHTML = "Sakrij";  

      }
      console.log('Gotovoo!!');
    }

    Model(podatak:any){

      console.log("Podatak" + podatak);

    }

    posaljiEmail(){

      this.sservice.fullName(this.currentUser_ne)
          .then(
            email => { this.email = email

              if(this.textEmail == " " || this.textEmail == undefined || this.textEmail == ""){
                this.Erorr("Nije moguce poslati prazan zahtev.");
              }
              else{
                  this.sservice.slanjeMejla(this.textEmail,email)
                    .subscribe(
                      emailOdg => { this.emailOdg = String(emailOdg)

                        if(this.emailOdg != "Poslat mejl"){
                          console.log("Nije poslat mejl");
                        }
                        else{
                          console.log(emailOdg);
                        }
                        this.textEmail = " ";
                        this.Erorr("Uspešno ste poslali zahtev za novi projekat.");

                      }, 
                      error => {
                        console.log("error");
                        this.Erorr("Nije moguce poslati zahtev za novi projekat");
                  }); 
              }
            },
            error => {
                  console.log("error");
                  this.Erorr("Nije moguce ocitati mejl korisnika");

      });  
    }

    Zahtev(){

      this.flgZahtev = true;

    }

    snimiSve(){

      this.zastitaUnosa();

      /*if(this.gotovaFunkcija == true){
        let cujajBree;
        //this.currentUser_ne,this.ngMesecP,this.ngGodinaP.godina,this.ngNedeljaP.nedelja,nizPodataka
        this.sservice.SaljiSve(this.currentUser_ne,this.ngMesecP,this.ngGodinaP.godina,this.ngNedeljaP.nedelja,this.projekti_lista)
          .subscribe(

              cujajBree => { cujajBree = cujajBree
                
                //console.log("cujajBree" + cujajBree);
                if(cujajBree == "Insert bre"){
                  this.text = "Uspešno ste sačuvali satnice!!"
                  this.text_izlaz = 'Uredu'; 
                  this.showDialog();   
                }
            },
            error => {
                console.log("error");
                this.Erorr("Nije moguce ocitati trenutnu godinu");
            },
            () => {
              console.log("done");

            });
      }
      else{

      }   */  
    }

    zahtevIzlaz(){

      this.flgZahtev = false;

    }

    Refresuj(){

      location.reload();

    }

    trackByNiz(index,niz){

      //console.log(index);

    }

    racunanjeRadnihDana(mesec:any,godina:any){

      let nizDani = ['Ponedeljak','Utorak','Sreda','Cetvrtak','Petak','Subota','Nedelja'];
      let mesecOdabrani;
      let redniBrojMesec;

      if(mesec == 'Januar'){mesecOdabrani = 'Jan',redniBrojMesec = 1}
      else if(mesec == 'Februar'){mesecOdabrani = 'Feb',redniBrojMesec = 2}
      else if(mesec == 'Mart'){mesecOdabrani = 'Mar',redniBrojMesec = 3}
      else if(mesec == 'April'){mesecOdabrani = 'Apr',redniBrojMesec = 4}
      else if(mesec == 'Maj'){mesecOdabrani = 'May',redniBrojMesec = 5}
      else if(mesec == 'Jun'){mesecOdabrani = 'Jun',redniBrojMesec = 6}
      else if(mesec == 'Jul'){mesecOdabrani = 'Jul',redniBrojMesec = 7}
      else if(mesec == 'Avgust'){mesecOdabrani = 'Aug',redniBrojMesec = 8}
      else if(mesec == 'Septembar'){mesecOdabrani = 'Sep',redniBrojMesec = 9}
      else if(mesec == 'Oktobar'){mesecOdabrani = 'Oct',redniBrojMesec = 10}
      else if(mesec == 'Novembar'){mesecOdabrani = 'Nov',redniBrojMesec = 11}
      else if(mesec == 'Decembar'){mesecOdabrani = 'Dec',redniBrojMesec = 12}

      let date = new Date();
      let brojDanaUMesecu = new Date(2017, redniBrojMesec , 0).getDate();
      
      //console.log("brojDanaUMesecu" + brojDanaUMesecu);

      let prvi = String(new Date(""+mesecOdabrani+" 01, "+godina+" 01:00:00"));
      let poslednji = String(new Date(""+mesecOdabrani+""+brojDanaUMesecu+", "+godina+" 11:00:00"));

      let danPrvi = prvi.substring(0,3);
      //console.log("danPrvi" + danPrvi);
      let danPoslednji = poslednji.substring(0,3);
      //console.log("danPoslednji" + danPoslednji);

      if(danPrvi == 'Mon'){danPrvi = nizDani[0],this.textObavestenjaMesecPrvi = "Prva nedelja ima 5 radnih dana"}
      else if(danPrvi == 'Tue'){danPrvi = nizDani[1],this.textObavestenjaMesecPrvi = "Prva nedelja ima 4 radna dana"}
      else if(danPrvi == 'Wed'){danPrvi = nizDani[2],this.textObavestenjaMesecPrvi = "Prva nedelja ima 3 radna dana"}
      else if(danPrvi == 'Thu'){danPrvi = nizDani[3],this.textObavestenjaMesecPrvi = "Prva nedelja ima 2 radna dana"}
      else if(danPrvi == 'Fri'){danPrvi = nizDani[4],this.textObavestenjaMesecPrvi = "Prva nedelja ima 1 radni dan"}
      else if(danPrvi == 'Sat'){danPrvi = nizDani[5],this.textObavestenjaMesecPrvi = "Prva nedelja nema radnih dana"}
      else if(danPrvi == 'Sun'){danPrvi = nizDani[6],this.textObavestenjaMesecPrvi = "Prva nedelja nema radnih dana"}

      if(danPoslednji == 'Mon'){danPoslednji = nizDani[0],this.textObavestenjaMesecPoslednji = "Poslednja nedelja ima 1 radni dan"}
      else if(danPoslednji == 'Tue'){danPoslednji = nizDani[1],this.textObavestenjaMesecPoslednji = "Poslednja nedelja ima 2 radna dana"}
      else if(danPoslednji == 'Wed'){danPoslednji = nizDani[2],this.textObavestenjaMesecPoslednji = "Poslednja nedelja ima 3 radna dana"}
      else if(danPoslednji == 'Thu'){danPoslednji = nizDani[3],this.textObavestenjaMesecPoslednji = "Poslednja nedelja ima 4 radna dana"}
      else if(danPoslednji == 'Fri'){danPoslednji = nizDani[4],this.textObavestenjaMesecPoslednji = "Poslednja nedelja ima 5 radnih dana"}
      else if(danPoslednji == 'Sat'){danPoslednji = nizDani[5],this.textObavestenjaMesecPoslednji = "Poslednja nedelja nema radnih dana"}
      else if(danPoslednji == 'Sun'){danPoslednji = nizDani[6],this.textObavestenjaMesecPoslednji = "Poslednja nedelja nema radnih dana"}

    }

    klikMesec(godina:any,mesec:any,nedelja:any){

      this.brisanje_vrednosti_iz_selecta();
      this.brojNedeljaZaDatiMesecGodinu();

      console.log("ngGodinaP" + godina);
      console.log("ngMesecP" + mesec);
      console.log("ngNedeljaP" + nedelja);
      //console.log("this.objekti_nedelje" + this.objekti_nedelje);

      this.sservice.vrednosti_baza(this.currentUser_ne,mesec,godina,nedelja)
          .subscribe(
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
          },
          () => {console.log('done')}
      );

    }

    klikNedelja(godina:any,mesec:any,nedelja:any){

      /*console.log("ngGodinaPNN" + godina);
      console.log("ngMesecP" + mesec);
      console.log("ngNedeljaP" + nedelja);*/

     /* this.sservice.vrednosti_baza(this.currentUser_ne,mesec,godina,nedelja)
          .then(
            projekti_lista => { this.projekti_lista = projekti_lista
                      
              this.mumuSum = 0;
              for(var ii in this.projekti_lista){
                  this.Racunaj_proba(Number(this.projekti_lista[ii].Razvoj),Number(this.projekti_lista[ii].odrzavanje),Number(this.projekti_lista[ii].dokumentacija),Number(this.projekti_lista[ii].implementacija),Number(this.projekti_lista[ii].rezijski_poslovi),Number(ii));
              }
              for(var ii in this.mumu){

                this.mumuSum = Number(this.mumuSum) + Number(this.mumu[ii]);
                //console.log("this.mumuSum" + Number(this.mumuSum)) 

              }
              
          },
          error => { this.error = error
            this.Erorr(this.error._body);
            console.log(error);
      });*/

    


    }

    prikazSve(vrednostButton:string){

      if(vrednostButton == "Prikaži sve"){
        this.prikazProjekti = "Sakri sve";
        for(let i = 0;Object.keys(this.projekti_lista).length > i;i++){
          this.objektPrikazi[i]['text'] = "Sakrij";
          this.objektPrikazi[i]['prikaz'] = 1;
        }
      }
      else if(vrednostButton == "Sakri sve"){
        this.prikazProjekti = "Prikaži sve";
        for(let i = 0;Object.keys(this.projekti_lista).length > i;i++){
          this.objektPrikazi[i]['text'] = "Prikaži";
          this.objektPrikazi[i]['prikaz'] = 0;  
        }
      }
    }

    brojNedeljaZaDatiMesecGodinu(){

        this.odaberi_mesec = this.ngMesecP;
        this.odaberi_godina = String(this.ngGodinaP.godina);
  
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
          this.objectNedelje.splice(index, this.objectNedelje.length);
        }



        for (let pr of this.objekti_nedelje) {
          let y = {};
          y['id'] = pr;
          y['Naziv'] = 'Nedelja' + pr
          this.objectNedelje.push(y);
        }

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

      for(var i = 0; this.lista_broja_nedelja >= i ; i++){
          this.objekti_nedelje.splice(this.objekti_nedelje.indexOf(i), 1);
      }
    
      
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

       this.zastita = this.renderer.listen(this.el.nativeElement, 'keypress', (event) => {
      
        if(event.key == '-' || event.key == '+' || event.key == '.'){
            if(razvojS == null){
            event.preventDefault();
            console.log("Micko")
           }
           else{
             console.log("usao ovde bree");
           }
        }
      }) 

      /*this.renderer.listenGlobal('document', 'keypress', (event) => {
            
              if(event.key == '-' || event.key == '+' || event.key == '.'){
                
                event.preventDefault();
              } 
      });*/

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

    zastitaUnosa(){

      let brojMeseca;
      let trenutniBrojMeseca;  

      if( this.ngMesecP  == 'Januar'){brojMeseca = 0;}
      else if( this.ngMesecP  == 'Februar'){ brojMeseca = 1;}
      else if( this.ngMesecP  == 'Mart'){brojMeseca = 2;}
      else if( this.ngMesecP  == 'April'){brojMeseca = 3;}
      else if( this.ngMesecP  == 'Maj'){brojMeseca = 4;}
      else if( this.ngMesecP  == 'Jun'){brojMeseca = 5;}
      else if( this.ngMesecP  == 'Jul'){brojMeseca = 6}
      else if( this.ngMesecP  == 'Avgust'){brojMeseca = 7;}
      else if( this.ngMesecP  == 'Septembar'){brojMeseca = 8;}
      else if( this.ngMesecP  == 'Oktobar'){brojMeseca = 9;}
      else if( this.ngMesecP  == 'Novembar'){brojMeseca = 10;}
      else if( this.ngMesecP  == 'Decembar'){brojMeseca = 11;}
      else{ this.ngMesecP = 20;}

      if( this.trenutniMesec  == 'Januar'){trenutniBrojMeseca = 0;}
      else if( this.trenutniMesec  == 'Februar'){ trenutniBrojMeseca = 1;}
      else if( this.trenutniMesec  == 'Mart'){trenutniBrojMeseca = 2;}
      else if( this.trenutniMesec  == 'April'){trenutniBrojMeseca = 3;}
      else if( this.trenutniMesec  == 'Maj'){trenutniBrojMeseca = 4;}
      else if( this.trenutniMesec  == 'Jun'){trenutniBrojMeseca = 5;}
      else if( this.trenutniMesec  == 'Jul'){trenutniBrojMeseca = 6}
      else if( this.trenutniMesec  == 'Avgust'){trenutniBrojMeseca = 7;}
      else if( this.trenutniMesec  == 'Septembar'){trenutniBrojMeseca = 8;}
      else if( this.trenutniMesec  == 'Oktobar'){trenutniBrojMeseca = 9;}
      else if( this.trenutniMesec  == 'Novembar'){trenutniBrojMeseca = 10;}
      else if( this.trenutniMesec  == 'Decembar'){trenutniBrojMeseca = 11;}
      else{ this.trenutniMesec = String(20);}

      if(this.ngGodinaP.godina > this.trenutnaGodina){
        this.Erorr("Nije moguce uneti unapred vrednosti za sledecu godinu!");
        this.gotovaFunkcija = false; 
        return;
      }
      else{
        if(brojMeseca > trenutniBrojMeseca){
           this.Erorr("Nije moguce uneti unapred satnicu za taj mesec!");
           this.gotovaFunkcija = false;
           return;
        }
        else{

          if(this.ngGodinaP.godina < this.trenutnaGodina){  
            if(brojMeseca < trenutniBrojMeseca){
              //console.log("1111")
              this.gotovaFunkcija = true;
            }
          }
          else if(this.ngGodinaP.godina == this.trenutnaGodina){
             if(brojMeseca == trenutniBrojMeseca){
                if(this.ngNedeljaP.nedelja > this.trenutnaNedelja)
                {
                  //console.log("2222");
                  this.Erorr("Nije moguce uneti unapred satnicu za tu nedelju!");
                  this.gotovaFunkcija = false;
                  return;
                }
                else{
                  //console.log("3333");
                  this.gotovaFunkcija = true;
                } 
             }
             else if(brojMeseca < trenutniBrojMeseca){
               //console.log("4444");
               this.gotovaFunkcija = true;
             }
          }  
          else{

            this.Erorr("Nije moguce uneti unapred satnicu za tu nedelju!");
            this.gotovaFunkcija = false;  
            this.gotovaFunkcija = false;
            console.log("Dobro je");
          }
        }
      }

       


    }

    SnimiNiz(id:any,idPr:any,razvoj:any,odrzavanje:any,dokumentacija:any,implementacija:any,reziski_poslovi,nizPodataka:ProjektiSTNICA){

      /*
        console.log("this.ngGodinaP.godina" + this.ngGodinaP.godina);
        console.log("this.this.trenutnaGodina" + this.trenutnaGodina);

        console.log("this.ngMesecP" + this.ngMesecP);
        console.log("this.trenutniMesec" + this.trenutniMesec); 
        
        console.log("this.ngNedeljaP.nedelja" + this.ngNedeljaP.nedelja);
        console.log("this.trenutnaNedelja" + this.trenutnaNedelja);*/

        /*
        let brojMeseca;
        let trenutniBrojMeseca;  

        if( this.ngMesecP  == 'Januar'){brojMeseca = 0;}
        else if( this.ngMesecP  == 'Februar'){ brojMeseca = 1;}
        else if( this.ngMesecP  == 'Mart'){brojMeseca = 2;}
        else if( this.ngMesecP  == 'April'){brojMeseca = 3;}
        else if( this.ngMesecP  == 'Maj'){brojMeseca = 4;}
        else if( this.ngMesecP  == 'Jun'){brojMeseca = 5;}
        else if( this.ngMesecP  == 'Jul'){brojMeseca = 6}
        else if( this.ngMesecP  == 'Avgust'){brojMeseca = 7;}
        else if( this.ngMesecP  == 'Septembar'){brojMeseca = 8;}
        else if( this.ngMesecP  == 'Oktobar'){brojMeseca = 9;}
        else if( this.ngMesecP  == 'Novembar'){brojMeseca = 10;}
        else if( this.ngMesecP  == 'Decembar'){brojMeseca = 11;}
        else{ this.ngMesecP = 20;}

        if( this.trenutniMesec  == 'Januar'){trenutniBrojMeseca = 0;}
        else if( this.trenutniMesec  == 'Februar'){ trenutniBrojMeseca = 1;}
        else if( this.trenutniMesec  == 'Mart'){trenutniBrojMeseca = 2;}
        else if( this.trenutniMesec  == 'April'){trenutniBrojMeseca = 3;}
        else if( this.trenutniMesec  == 'Maj'){trenutniBrojMeseca = 4;}
        else if( this.trenutniMesec  == 'Jun'){trenutniBrojMeseca = 5;}
        else if( this.trenutniMesec  == 'Jul'){trenutniBrojMeseca = 6}
        else if( this.trenutniMesec  == 'Avgust'){trenutniBrojMeseca = 7;}
        else if( this.trenutniMesec  == 'Septembar'){trenutniBrojMeseca = 8;}
        else if( this.trenutniMesec  == 'Oktobar'){trenutniBrojMeseca = 9;}
        else if( this.trenutniMesec  == 'Novembar'){trenutniBrojMeseca = 10;}
        else if( this.trenutniMesec  == 'Decembar'){trenutniBrojMeseca = 11;}
        else{ this.trenutniMesec = String(20);}
        
        if(this.ngGodinaP.godina > this.trenutnaGodina){
          this.Erorr("Nije moguce uneti unapred vrednosti za sledecu godinu!");
          return;
        }
        else{
          if(brojMeseca > trenutniBrojMeseca){
            this.Erorr("Nije moguce uneti unapred satnicu za taj mesec!");
            return;
          }
          else{

            if(this.ngNedeljaP.nedelja > this.trenutnaNedelja)
            {
              this.Erorr("Nije moguce uneti unapred satnicu za tu nedelju!");
              return;
            }
            else{
              console.log("Dobro je");
            }
          }
        }  
      */

      console.log("this.ngMesecP" + this.ngMesecP);
      console.log("this.ngNedeljaP.nedelja" + this.ngNedeljaP.nedelja);
      console.log("this.ngGodinaP.godina" + this.ngGodinaP.godina);
      console.log("nizPodataka" + nizPodataka.Razvoj);
      console.log("id" + nizPodataka.id_pr);

      this.zastitaUnosa();

      if(this.gotovaFunkcija == true){
        console.log("Gotova je funkcija!!")
    
        if(this.ngGodinaP.godina == null || (this.ngGodinaP.godina != 2017 &&  this.ngGodinaP.godina != 2018 && this.ngGodinaP.godina != 2019)){
          this.text = "Nije dobro uneta godina!!"
          this.text_izlaz = 'Izlaz'; 
          this.showDialog();
          this.ngGodinaP.godina = (new Date().getFullYear());
        }
        else if(nizPodataka.Razvoj == null || nizPodataka.odrzavanje == null || nizPodataka.dokumentacija == null || nizPodataka.implementacija == null || nizPodataka.rezijski_poslovi == null){

          this.text = "Nije dobro uneta satnica!!"
          this.text_izlaz = 'Izlaz'; 
          this.showDialog();

        }
        else{
          /*
          this.sservice.CuvajProjekat(this.currentUser_ne,this.ngMesecP,this.ngGodinaP.godina,this.ngNedeljaP.nedelja,nizPodataka)
              .subscribe(
                  cuvaj_sate => { this.cuvaj_sate = cuvaj_sate
                    
                  if((this.cuvaj_sate._body) == '"Uspesan Insert"'){

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
          });
          */
        }
      }
      else{
        console.log("Prosao je!!")
      }   
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

      /*
        this.x = document.getElementById(idNiz).style.display;
        console.log("x" + this.x);
    
        if(this.x == 'block'){
          document.getElementById(idNiz).style.display = "none";
        }
        else{
          document.getElementById(idNiz).style.display = "block";
        }
      */

      //console.log(this.objektPrikazi);

      let cuvajIdNiz;
      cuvajIdNiz = idNiz;

      //console.log("idNiz" + idNiz);
      this.prikazObavestenja[idNiz] = 1;

      if(this.objektPrikazi[idNiz]['text'] == "Prikaži"){
        //console.log("Prikazi");
        //this.textPrikazi[idNiz] = "Sakrij";
        this.objektPrikazi[idNiz]['text'] = "Sakrij";
        this.objektPrikazi[idNiz]['prikaz'] = 1;  
      }
      else if(this.objektPrikazi[idNiz]['text'] == "Sakrij"){
        //this.textPrikazi[idNiz] = "Prikaži";
         this.objektPrikazi[idNiz]['text'] = "Prikaži";
         this.objektPrikazi[idNiz]['prikaz'] = 0;
      }

      //this.textPrikazi = "Prikaži";
      /*
        if(this.textPrikazi == "Prikaži"){
          this.textPrikazi = "Sakrij";
          this.prikazObavestenja[idNiz] = 1;
        }
        else{
          this.textPrikazi = "Prikaži";
          this.prikazObavestenja[idNiz] = 0;
        }*/

        /*var change = document.getElementById("12345" + idNiz);
        if (change.innerHTML == "Prikaži"){
          change.innerHTML = "Sakrij";
          this.prikazObavestenja[idNiz] = 1;
        }
        else {
          change.innerHTML = "Prikaži";
          this.prikazObavestenja[idNiz] = 0;
        }
      */

      let niz = [];
      let br;
      let brBlock = 0;

      br = Object.keys(this.projekti_lista).length

      /*for(let ii in this.projekti_lista){

        if(this.objektPrikazi[idNiz]['prikaz'] == 1){     
          brBlock++;
        }
        else{
        }

        if(brBlock == br){
          this.prikazProjekti = "Sakri sve";
        }
        else{
          this.prikazProjekti = "Prikaži sve";
        }
      }*/

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

    /*
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
    }*/

    provera_godina(){

      this.brisanje_vrednosti_iz_selecta();
      this.broj_nedelja_za_dati_mesec();
    
      this.NizMesecBackspace[0] = this.selectedGodina;

      this.renderer.listen(this.el.nativeElement, 'keyup', (event) => {
    
            this.selectedGodina = this.NizMesecBackspace[0];
      })

      this.sservice.vrednosti_baza(this.currentUser_ne,this.selectedMesec,this.selectedGodina,this.selectedNedelja)
            .subscribe(

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
              },
              () => {console.log('done')}
      );
    }

    provera_mesec(){
        
        this.brisanje_vrednosti_iz_selecta();
        this.broj_nedelja_za_dati_mesec();

        console.log("this.objekti_nedelje" + this.objekti_nedelje);

        this.sservice.vrednosti_baza(this.currentUser_ne,this.selectedMesec,this.selectedGodina,this.selectedNedelja)
            .subscribe(

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
              },
              () => {console.log('done')}
        );
    }

    provera_nedelja(){

        this.sservice.vrednosti_baza(this.currentUser_ne,this.selectedMesec,this.selectedGodina,this.selectedNedelja)
            .subscribe(

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
              },
              () => {console.log('done')}
        );
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

           //Ne koristim ih ali ne znam zasto ih nisam obrisao!!
          /* micko(){

          this.sservice.trenutni_mesec()
                .then(
                        mesecP => { this.mesecP = mesecP
                        this.selectedMesec = mesecP;
                        },
                        error => {
                            console.log("error");
                            this.GreskaFunkcija();
                            
          });  

          this.sservice.trenutni_godina()
                .then(
                        godinaP => { this.godinaP = godinaP
                        this.selectedGodina = godinaP;
                        },
                        error => {
                            console.log("error");
                            this.GreskaFunkcija();
                            
          });

          this.sservice.trenutni_nedelja()
                .then(
                        nedeljaP => { this.nedeljaP = nedeljaP
                        this.selectedNedelja = nedeljaP
                        
                        },
                        error => {
                            console.log("error");
                            
          });

          var week = [1,2,3,4,5,6,7,8,9];                            
          week.length -= 2;
        
    }
    */

    public trackByIndex(index: number, item) {
    //console.log("index" + index + "item" + item);
      return index;
    }        
}
