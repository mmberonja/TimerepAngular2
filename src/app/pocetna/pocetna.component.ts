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

   GodinaJ = new Godina();
   MesecJ:any;
   NedeljaJ = new Godina();
   brojNedeljaJ = [];
   objekatBrojNedelja:any [] = [];

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
   jsonProbaModel = new prevodPodaciModel();
   nizPush:any[] = [];
   nizObjekataBre:any [] = [];
   nizObjekataBreJ:any [] = [];

   //Nova tabela,promenljive!!
   prikazTabela:prikazTabelaModel[] = [];
   tabelaPrikaz:prikazTabelaModel[] = [];
   opcijeTabelaMicko:tabelaFunkcijeModel[] = [];
   opcijeTabela:any [] = [];
   prikazInformacija:number = 1;
   listaBrojNedelja:any;
   rez:number[] = [];
   rezObject:any;

   borderHtml:string = '1px solid #D3D3D3';
   borderFlg:boolean = true;
   iconFlgBtn:boolean = true;
   iconFlg:boolean = true;
   //style="border: 2px solid #A52A2A"

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
      let jsonProba;
     
      this.sservice.trenutni_godina()
        .subscribe(
          GodinaJ => { this.GodinaJ.godina = Number(GodinaJ)

            this.trenutnaGodina = Number(this.GodinaJ.godina);
            let d = new Date();
            this.MesecJ = this.month[d.getMonth()];
            this.trenutniMesec = this.MesecJ;

            this.racunanjeRadnihDana(this.MesecJ,this.GodinaJ.godina);

            this.sservice.trenutni_nedelja()
              .then(
                NedeljaJ => { this.NedeljaJ.nedelja = NedeljaJ

                  //console.log("Trenutna nedelja" + this.NedeljaJ.nedelja);
                  let izabraniMesecJ:number;
                  this.trenutnaNedelja = Number(this.NedeljaJ.nedelja);

                  if( this.MesecJ  == 'Januar'){izabraniMesecJ = 0;}
                  else if( this.MesecJ  == 'Februar'){ izabraniMesecJ= 1;}
                  else if( this.MesecJ  == 'Mart'){izabraniMesecJ = 2;}
                  else if( this.MesecJ  == 'April'){izabraniMesecJ = 3;}
                  else if( this.MesecJ  == 'Maj'){izabraniMesecJ = 4;}
                  else if( this.MesecJ  == 'Jun'){izabraniMesecJ = 5;}
                  else if( this.MesecJ  == 'Jul'){izabraniMesecJ = 6}
                  else if( this.MesecJ  == 'Avgust'){izabraniMesecJ = 7;}
                  else if( this.MesecJ  == 'Septembar'){izabraniMesecJ = 8;}
                  else if( this.MesecJ  == 'Oktobar'){izabraniMesecJ = 9;}
                  else if( this.MesecJ  == 'Novembar'){izabraniMesecJ = 10;}
                  else if( this.MesecJ  == 'Decembar'){izabraniMesecJ = 11;}
                  else{ this.MesecJ = 20;}

                  let pamtiNedeljeJ = this.brojNedelja(izabraniMesecJ,this.GodinaJ.godina)

                  let poslednjiNiz;
                  for(var index = pamtiNedeljeJ[0]; index<=pamtiNedeljeJ[1]; index++){
                    poslednjiNiz = index;
                  }

                  for(var i = 1; poslednjiNiz >= i ; i++){
                    this.brojNedeljaJ[i-1] = i;
                  }

                  for(let ar in this.objekatBrojNedelja){//Brisanje Niza-objekata!!!
                    let index = this.objekatBrojNedelja.indexOf(this.objekatBrojNedelja[ar]);
                    this.objekatBrojNedelja.splice(index, this.objekatBrojNedelja.length);
                  }

                  for (let pr of this.brojNedeljaJ){
                    let y = {};
                    y['id'] = pr;
                    y['Naziv'] = 'Nedelja' + pr
                    this.objekatBrojNedelja.push(y);
                  }
                
                  this.sservice.jsonProjekti(this.NedeljaJ.nedelja,this.MesecJ,this.currentUser_ne,this.GodinaJ.godina)
                    .subscribe(
                        jsonProba => { this.jsonProbaModel = jsonProba
                          //console.log(this.jsonProbaModel.Podaci);

                          for(let pr in this.jsonProbaModel.Podaci){
                            let k = {};
                            k['pretraga'] = 1;
                            k['prikaz'] = 0;
                            k['text'] = "Prikaži";
                            k['Projekti'] = this.jsonProbaModel.Podaci[pr].Projekti;
                            k['border'] = '2px solid #D3D3D3';
                            this.opcijeTabela.push(k);
                          }
                          
                          this.opcijeTabelaMicko = this.opcijeTabela;
                          let nizImeJ = [];
                          let nizVrednostJ = []; 
                          let nizBazaImeJ = [];

                          for(let i in this.jsonProbaModel.Podaci){

                            let z:number = 0
                            z = Number(i);

                            let brJ:number = 0;
                            for(let g in this.jsonProbaModel.Podaci[i]){//Razvoj,ostalo_obuka...(iz baze nazivi kolona)!!
                              for(let k in this.jsonProbaModel.Prevodi[0]){                                
                                if(g == k){
                                  //console.log("Naziv: " + k);
                                  nizImeJ[brJ] = this.jsonProbaModel.Prevodi[0][g];
                                  nizVrednostJ[brJ] = this.jsonProbaModel.Podaci[z][g];
                                  nizBazaImeJ[brJ] = g;
                                  brJ++;
                                }
                              }
                            }

                            let nizPodaciJ:any[] = [];

                            for(let hh in nizImeJ){
                              let tt = {};
                              tt['ime'] = nizImeJ[hh];
                              tt['satnica'] = nizVrednostJ[hh];
                              tt['baza'] = nizBazaImeJ[hh];
                              nizPodaciJ.push(tt);
                            }
                          
                            let gg = {};
                            gg['Podaci'] = nizPodaciJ;
                            gg['Projekti'] = this.jsonProbaModel.Podaci[z]['Projekti'];
                            gg['id_pr'] = this.jsonProbaModel.Podaci[z]['id_pr'];
                            gg['tabela_vrednosti'] = this.jsonProbaModel.Podaci[z]['tabela_vrednosti'];
                            gg['sumProjekata'] = null;
                            gg['pretraga'] = 1;
                            this.nizObjekataBreJ.push(gg);
                            nizImeJ.splice(0,nizImeJ.length)
                            nizVrednostJ.splice(0,nizVrednostJ.length)
                            nizBazaImeJ.splice(0,nizBazaImeJ.length)
                            
                          }   
                          
                          this.tabelaPrikaz = this.nizObjekataBreJ;

                          if(this.jsonProbaModel == {}){                                        
                            this.flgLoading = false;
                          }
                          else{                                    
                            this.flgLoading = true;
                          }
                          
                          for(var ii in this.tabelaPrikaz){
                          //for(let ii = 0;ii<1;ii++){
                              
                            this.rez[ii] = 0
                            for(var zz in this.tabelaPrikaz[ii].Podaci){
                              this.rez[ii] += this.tabelaPrikaz[ii].Podaci[zz].satnica;
                              //this.tabelaPrikaz[ii].Podaci[zz].satnica;
                              this.tabelaPrikaz[ii]['sumProjekata'] = this.rez[ii];
                            }
                            //this.mumuSum += this.rez[ii];
                            this.mumuSum += this.tabelaPrikaz[ii]['sumProjekata'];
                          }
                          console.log("this.tabelaPrikaz" , this.tabelaPrikaz);
                          //console.log("this.rez" , this.rez);
                          /*
                          this.tabelaPrikaz.sort(function(a,b){
                            return a['sumProjekata']-b['sumProjekata']
                            //var nameA=a.Projekti.toLowerCase(), nameB=b.Projekti.toLowerCase()
                            //if (nameA < nameB) //sort string ascending
                            //    return -1 
                            //if (nameA > nameB)
                            //    return 1
                            //return 0 
                          });*/

                      },
                      error => {
                      console.log("error");
                      this.Erorr("Nije moguce ocitati trenutnu godinu");
                  });

              },
                error => {
                console.log("error");
                this.Erorr("Nije moguce ocitati trenutnu godinu");
            });      

        },
          error => {
          console.log("error");
          this.Erorr("Nije moguce ocitati trenutnu godinu");
      });  


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
        
        if(JSON.parse(localStorage.getItem('Token')) == null){

              console.log("Miroslav Beronja!!");
              alert("Izlogovani ste");
              this.router.navigate(['/login']);
              return;
        }
      }  
      try {
    
        this.currentUser_ne = JSON.parse(localStorage.getItem('currentUser'));

      }
      catch(err){
      
      }

      this.brojNedeljeUMesecu("Januar",2017)
      
      let sortNiz = [];
      sortNiz = [{broj:'10',ime:'15'},{broj:11,ime:'AA11'},{broj:2,ime:'2bd'},{broj:0,ime:'asa'},{broj:0,ime:'1dsda5'},
                 {broj:3,ime:'15aaa'},{broj:1,ime:'15ssss'},{broj:7,ime:'Mico'},{broj:7,ime:'NEsto'},{broj:9,ime:'Breee'}];

      sortNiz.sort(function(a,b){
        //return a.broj-b.broj //sortira od najmanjeg do najveceg!!
        // return b.broj-a.broj  //sortira od najveceg do najmanjeg!!
        var nameA=a.ime.toLowerCase(), nameB=b.ime.toLowerCase()
            if (nameA < nameB) //sort string ascending
                return -1 
            if (nameA > nameB)
                return 1
            return 0 //default return value (no sorting)
      })
      console.log("sortNiz" , sortNiz);

    }

    iconfunction(strela:string,value:string,smer:string,projektiS:prikazTabelaModel[] = [],projektiPrikaz:any[] = []){

      let brString:number = 0;
      for(let pr in projektiS){
        if(typeof(projektiS[pr][value]) == 'number'){
  
        }
        else{
          brString++;
        }
      }
      if(brString >= 1){
        if(brString == projektiS.length){
          //console.log("Jednaki");
        }
        else{
          for(let pr in projektiS){
            projektiS[pr][value] = String(projektiS[pr][value]);    
          }    
        }
      }

      console.log("tabelaPrikaz" , this.tabelaPrikaz);
      console.log("opcijeTabelaMicko" , this.opcijeTabelaMicko);


      if(brString == 0){
        //console.log("Number");
        projektiS.sort(function(a,b){

          let valS = value

            if(smer == 'dole'){
              return a[valS]-b[valS] 
            }
            else if(smer == 'gore'){
              return b[valS]-a[valS] 
            }
            //return a[valS]-b[valS] //sortira od najmanjeg do najveceg!!
            // return b.broj-a.broj  //sortira od najveceg do najmanjeg!!
        })

      }
      else if(brString >= 1){
        //console.log("String");
        projektiS.sort(function(a,b){
          let valS = value
          var nameA=a[valS].toLowerCase(), nameB=b[valS].toLowerCase()
          if(smer == 'dole'){
            if (nameA < nameB) //sort string ascending
                return -1 
            if (nameA > nameB)
                return 1
            return 0 //default return value (no sorting)
          }
          else if(smer == 'gore'){
            if (nameA > nameB) //sort string ascending
                return -1 
            if (nameA < nameB)
                return 1
            return 0 //default return value (no sorting)
          }
            
        })

      }

      if(strela == 'btn'){
        if(this.iconFlgBtn == true){
          this.iconFlgBtn = false;
        }
        else if(this.iconFlgBtn == false){
          this.iconFlgBtn = true;
        }
      }
      else if(strela == 'icon'){
        if(this.iconFlg == true){
          this.iconFlg = false;
        }
        else if(this.iconFlg == false){
          this.iconFlg = true;
        }
      }

    }

    funkcijaSort(niz:any = [],sort:string){

      var employees=[]
      employees[0]={name:"George", age:32, retiredate:"March 12, 2014"}
      employees[1]={name:"Edward", age:17, retiredate:"June 2, 2023"}
      employees[2]={name:"Christine", age:58, retiredate:"December 20, 2036"}
      employees[3]={name:"Sarah", age:62, retiredate:"April 30, 2020"}
      
      /*
      employees.sort(function(a, b){
          return a.age-b.age
      })*/

      employees.sort(function(a, b){
          var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
          if (nameA < nameB) //sort string ascending
              return -1 
          if (nameA > nameB)
              return 1
          return 0 //default return value (no sorting)
      })

      console.log(employees);
      //this.sortNiz.sort(function)

      var maxSpeed = {
        car: 300, 
        bike: 60, 
        motorbike: 200, 
        airplane: 1000,
        helicopter: 400, 
        rocket: 8 * 60 * 60
      };
      var sortable = [];
      for (var vehicle in maxSpeed) {
        sortable.push([vehicle, maxSpeed[vehicle]]);
      }

      sortable.sort(function(a, b) {
        /*console.log("a" , a);
        console.log("b" , b);
        console.log("ab" , a[1] - b[1]);*/
        return a[1]
        //return a[1] - b[1];
      });

      //console.log("sortable" , sortable);
    }

    handleKeyEvent(event: Event,nesto:string){
      console.log("enter");
    }

    onUp(){

      console.log("tastatura!!");

    }

    brojNedeljeUMesecu(mesec:string,godina:number){

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

      /*console.log("redniBrojMesec" + redniBrojMesec);
      console.log("mesecOdabrani" + mesecOdabrani);*/

      let date = new Date();
      let brojDanaUMesecu = new Date(2017, redniBrojMesec , 0).getDate();
    
      /*let prvi = String(new Date(""+mesecOdabrani+" 01, "+godina+" 01:00:00"));
      let poslednji = String(new Date(""+mesecOdabrani+""+brojDanaUMesecu+", "+godina+" 11:00:00"));

      let danPrvi = prvi.substring(0,3);
      console.log("danPrvi" + danPrvi);
      let danPoslednji = poslednji.substring(0,3);
      console.log("danPoslednji" + danPoslednji);*/

    }

    prikazPr(id:number,tabela:any){

      if(this.opcijeTabelaMicko[id]['text'] == 'Prikaži'){
        this.opcijeTabelaMicko[id]['text'] = 'Sakrij'
        this.opcijeTabelaMicko[id]['prikaz'] = 1;
        this.opcijeTabelaMicko[id]['border'] = '2px solid #A52A2A';
        //this.borderHtml = '2px solid #A52A2A';

      }
      else if(this.opcijeTabelaMicko[id]['text'] == 'Sakrij'){
        this.opcijeTabelaMicko[id]['text'] = 'Prikaži';
        this.opcijeTabelaMicko[id]['prikaz'] = 0;
        this.opcijeTabelaMicko[id]['border'] = '2px solid #D3D3D3';
        //this.borderHtml = '1px solid #D3D3D3';
      }

    }

    sumiranje(){

      this.mumuSum = 0;
      for(var ii in this.tabelaPrikaz){
      //for(let ii = 0;ii<1;ii++){  
        this.rez[ii] = 0
        for(var zz in this.tabelaPrikaz[ii].Podaci){
          this.rez[ii] += this.tabelaPrikaz[ii].Podaci[zz].satnica;
          this.tabelaPrikaz[ii]['sumProjekata'] = this.rez[ii];
        }
        if( this.opcijeTabelaMicko[ii]['pretraga'] == 1){
          //this.mumuSum += this.rez[ii];
          this.mumuSum += this.tabelaPrikaz[ii]['sumProjekata'];
        }
      }
    }

    zastitaUnosa(godina:number,mesec:string,nedelja:any){

      let brojMeseca;
      let trenutniBrojMeseca;  

      if( mesec  == 'Januar'){brojMeseca = 0;}
      else if( mesec  == 'Februar'){ brojMeseca = 1;}
      else if( mesec  == 'Mart'){brojMeseca = 2;}
      else if( mesec  == 'April'){brojMeseca = 3;}
      else if( mesec  == 'Maj'){brojMeseca = 4;}
      else if( mesec  == 'Jun'){brojMeseca = 5;}
      else if( mesec  == 'Jul'){brojMeseca = 6}
      else if( mesec  == 'Avgust'){brojMeseca = 7;}
      else if( mesec  == 'Septembar'){brojMeseca = 8;}
      else if( mesec  == 'Oktobar'){brojMeseca = 9;}
      else if( mesec  == 'Novembar'){brojMeseca = 10;}
      else if( mesec  == 'Decembar'){brojMeseca = 11;}
      else{ mesec = String(20); }

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

      if(godina > this.trenutnaGodina){
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

          if(godina < this.trenutnaGodina){  
            if(brojMeseca < trenutniBrojMeseca){
              //console.log("1111")
              this.gotovaFunkcija = true;
            }
          }
          else if(godina == this.trenutnaGodina){
             if(brojMeseca == trenutniBrojMeseca){
                if(nedelja > this.trenutnaNedelja)
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

    sacuvajProjekat(vrednosti:snimiProjekatModel[] = [],idProjekta:number,imeTabele:string,godina:any,mesec:any,nedelja:any){

      let flg:boolean = false;

      for(let z in vrednosti){
        if(vrednosti[z].satnica == null){
          flg = true;
        }
      } 

      this.zastitaUnosa(godina,mesec,nedelja);

      if(this.gotovaFunkcija == true){
        //console.log("Gotova je funkcija!!")
        if(this.GodinaJ.godina == null || (this.GodinaJ.godina  != 2017 &&  this.GodinaJ.godina  != 2018 && this.GodinaJ.godina  != 2019)){
          this.text = "Nije dobro uneta godina!!"
          this.text_izlaz = 'Izlaz'; 
          this.showDialog();
          this.GodinaJ.godina  = (new Date().getFullYear());
        }
        else{
          if(flg==true){
             this.Erorr("Satnica za dati projekat nije dobro uneta");
          }
          else{
            this.sservice.CuvajProjekat(this.currentUser_ne,this.MesecJ,this.GodinaJ.godina,this.NedeljaJ.nedelja,vrednosti,idProjekta,imeTabele)
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

      ////this.zastitaUnosa();
      this.zastitaUnosa(this.GodinaJ.godina,this.MesecJ,this.NedeljaJ.nedelja);

      if(this.gotovaFunkcija == true){
        let cujajBree;
        //this.currentUser_ne,this.ngMesecP,this.ngGodinaP.godina,this.ngNedeljaP.nedelja,nizPodataka
        this.sservice.SaljiSve(this.currentUser_ne,this.MesecJ,this.GodinaJ.godina,this.NedeljaJ.nedelja,this.tabelaPrikaz)
          .subscribe(

              cujajBree => { cujajBree = cujajBree

                if(cujajBree == "Uspesan Insert"){
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
    
    projektiSatnice(){

      let brojacInterval = 0;
      this.flgLoading = false;

      let intervalPocetna = setInterval(() => { 
          
        //console.log("Mickoasasa")
        brojacInterval++;
        if(brojacInterval == 1){

        for(let ar in this.tabelaPrikaz){//Brisanje Niza-objekata!!!
          let index = this.tabelaPrikaz.indexOf(this.tabelaPrikaz[ar]);
          this.tabelaPrikaz.splice(index, this.tabelaPrikaz.length);
        }

        for(let pr in this.jsonProbaModel.Podaci){
          let k = {};
          k['pretraga'] = 1;
          k['prikaz'] = 0;
          k['text'] = "Prikaži";
          k['Projekti'] = this.jsonProbaModel.Podaci[pr].Projekti;
          this.opcijeTabela.push(k);
        }
        
        this.opcijeTabelaMicko = this.opcijeTabela;

        let nizImeJ = [];
        let nizVrednostJ = []; 
        let nizBazaImeJ = [];
        
        for(let i in this.jsonProbaModel.Podaci){

          let z:number = 0
          z = Number(i);

          let brJ:number = 0;
          for(let g in this.jsonProbaModel.Podaci[z]){//Razvoj,ostalo_obuka...(iz baze nazivi kolona)!!
            for(let k in this.jsonProbaModel.Prevodi[0]){
              if(g == k){
                nizImeJ[brJ] = this.jsonProbaModel.Prevodi[0][g];
                nizVrednostJ[brJ] = this.jsonProbaModel.Podaci[z][g];
                nizBazaImeJ[brJ] = g;
                brJ++;
              }
            }
          }
          let nizPodaciJ:any[] = [];

          for(let hh in nizImeJ){
            let tt = {};
            tt['ime'] = nizImeJ[hh];
            tt['satnica'] = nizVrednostJ[hh];
            tt['baza'] = nizBazaImeJ[hh];
            nizPodaciJ.push(tt);
          }
        
          let gg = {};
          gg['Podaci'] = nizPodaciJ;
          gg['Projekti'] = this.jsonProbaModel.Podaci[z]['Projekti'];
          gg['id_pr'] = this.jsonProbaModel.Podaci[z]['id_pr'];
          gg['tabela_vrednosti'] = this.jsonProbaModel.Podaci[z]['tabela_vrednosti'];
          gg['sumProjekata'] = null;
          gg['pretraga'] = 1;
          this.nizObjekataBreJ.push(gg);

          nizImeJ.splice(0,nizImeJ.length);
          nizVrednostJ.splice(0,nizVrednostJ.length);
          nizBazaImeJ.splice(0,nizBazaImeJ.length);

        }   

        this.tabelaPrikaz = this.nizObjekataBreJ

        if(this.jsonProbaModel == {}){                                        
          this.flgLoading = false;
        }
        else{                                    
          this.flgLoading = true;
        }

        this.mumuSum = 0;  
        for(var ii in this.tabelaPrikaz){
        //for(let ii = 0;ii<1;ii++){  
          this.rez[ii] = 0
          for(var zz in this.tabelaPrikaz[ii].Podaci){
            this.rez[ii] += this.tabelaPrikaz[ii].Podaci[zz].satnica;
          }
          //console.log("rez"+ ": " + this.rez[ii]);
          this.mumuSum += this.rez[ii];
        }  
        clearInterval(intervalPocetna);

        }
      }, 300);

    }

    onChangeNedelja(godina:any,mesec:any,nedelja:any){

      this.brojNedeljaZaDatiMesecGodinu(mesec,godina);
      this.sservice.jsonProjekti(nedelja,mesec,this.currentUser_ne,godina)
        .subscribe(jsonProbaModel => { this.jsonProbaModel = jsonProbaModel

          //console.log(this.jsonProbaModel);
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

      //this.brisanje_vrednosti_iz_selecta();
      this.racunanjeRadnihDana(mesec,godina);
      this.brojNedeljaZaDatiMesecGodinu(mesec,godina);
      if(this.objekatBrojNedelja.length < nedelja)
      { 
        this.NedeljaJ.nedelja = 1;
        nedelja = 1;
      }

      this.sservice.jsonProjekti(nedelja,mesec,this.currentUser_ne,godina)
        .subscribe(jsonProbaModel => { this.jsonProbaModel = jsonProbaModel

          //console.log(this.jsonProbaModel);
          this.projektiSatnice();
        },
        error => {
          console.log("error");
          this.Erorr(this.error._body);
      });
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

      this.brojNedeljaZaDatiMesecGodinu(mesec,godina);

      this.NizMesecBackspace[0] = godina;

      this.renderer.listen(this.el.nativeElement, 'keyup', (event) => {
            this.GodinaJ.godina = this.NizMesecBackspace[0];
      });

      this.sservice.jsonProjekti(nedelja,mesec,this.currentUser_ne,godina)
        .subscribe(jsonProbaModel => { this.jsonProbaModel = jsonProbaModel

          console.log(this.jsonProbaModel);
          this.projektiSatnice();

        },
        error => {
          console.log("error");
          this.Erorr(this.error._body);
      });
      
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

      for(let pr in this.tabelaPrikaz){
        if(this.tabelaPrikaz[pr]['Projekti'].toLowerCase().indexOf(""+this.textInput+"") > -1){
          this.opcijeTabelaMicko[pr]['pretraga'] = 1;
          this.tabelaPrikaz[pr]['pretraga'] = 1;
          brojacSlova++;
        }
        else{
          this.opcijeTabelaMicko[pr]['pretraga'] = 0;
          this.tabelaPrikaz[pr]['pretraga'] = 0;
        }
      }
      this.sumiranje();

      /*if(this.pocetakSort  == true){
        this.Filtriraj();
      }*/

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

    zahtevIzlaz(){

      this.flgZahtev = false;

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
      else if(danPrvi == 'Sun'){danPrvi = nizDani[6],this.textObavestenjaMesecPrvi = "Prva nedelja ima 5 radnih dana"}

      //else if(danPrvi == 'Sat'){danPrvi = nizDani[5],this.textObavestenjaMesecPrvi = "Prva nedelja nema radnih dana"}
      //else if(danPrvi == 'Sun'){danPrvi = nizDani[6],this.textObavestenjaMesecPrvi = "Prva nedelja nema radnih dana"}

      if(danPoslednji == 'Mon'){danPoslednji = nizDani[0],this.textObavestenjaMesecPoslednji = "Poslednja nedelja ima 1 radni dan"}
      else if(danPoslednji == 'Tue'){danPoslednji = nizDani[1],this.textObavestenjaMesecPoslednji = "Poslednja nedelja ima 2 radna dana"}
      else if(danPoslednji == 'Wed'){danPoslednji = nizDani[2],this.textObavestenjaMesecPoslednji = "Poslednja nedelja ima 3 radna dana"}
      else if(danPoslednji == 'Thu'){danPoslednji = nizDani[3],this.textObavestenjaMesecPoslednji = "Poslednja nedelja ima 4 radna dana"}
      else if(danPoslednji == 'Fri'){danPoslednji = nizDani[4],this.textObavestenjaMesecPoslednji = "Poslednja nedelja ima 5 radnih dana"}
      else if(danPoslednji == 'Sat'){danPoslednji = nizDani[5],this.textObavestenjaMesecPoslednji = "Poslednja nedelja ima 5 radnih dana"}
      else if(danPoslednji == 'Sun'){danPoslednji = nizDani[6],this.textObavestenjaMesecPoslednji = "Poslednja nedelja nema radnih dana"}

    }

    prikazSve(vrednostButton:string){

      if(vrednostButton == "Prikaži sve"){
        this.prikazProjekti = "Sakri sve";
        for(let k in this.opcijeTabelaMicko){
          this.opcijeTabelaMicko[k].prikaz = 1;
          this.opcijeTabelaMicko[k].text = "Sakrij";
        }
        
      }
      else if(vrednostButton == "Sakri sve"){
        this.prikazProjekti = "Prikaži sve";
        for(let k in this.opcijeTabelaMicko){
          this.opcijeTabelaMicko[k].prikaz = 0;
          this.opcijeTabelaMicko[k].text = "Prikaži";
        }
      }
    }

    brojNedeljaZaDatiMesecGodinu(mesec:any,godina:any){

      let mesecOdabrani,odabranaGodina;
      let mesecIzabrani;
      mesecOdabrani = mesec;
      odabranaGodina = String(godina);;
      
      if(mesecOdabrani == 'Januar'){mesecIzabrani = 0;}
      else if( mesecOdabrani == 'Februar'){ mesecIzabrani = 1;}
      else if( mesecOdabrani == 'Mart'){mesecIzabrani = 2;}
      else if( mesecOdabrani == 'April'){mesecIzabrani = 3;}
      else if( mesecOdabrani  == 'Maj'){mesecIzabrani = 4;}
      else if( mesecOdabrani  == 'Jun'){mesecIzabrani = 5;}
      else if( mesecOdabrani  == 'Jul'){mesecIzabrani = 6}
      else if( mesecOdabrani  == 'Avgust'){mesecIzabrani = 7;}
      else if( mesecOdabrani  == 'Septembar'){mesecIzabrani = 8;}
      else if( mesecOdabrani  == 'Oktobar'){mesecIzabrani = 9;}
      else if( mesecOdabrani  == 'Novembar'){mesecIzabrani = 10;}
      else if( mesecOdabrani  == 'Decembar'){mesecIzabrani = 11;}
      else{ mesecIzabrani = 20;}

      let brojNedeljaPamti = this.brojNedelja(mesecIzabrani,this.odaberi_godina)
      let ukupnoNedelja; 

      for(var index = brojNedeljaPamti[0]; index<=brojNedeljaPamti[1]; index++){
        ukupnoNedelja = index;
      }
      for(var i = 0; ukupnoNedelja >= i ; i++){
          this.brojNedeljaJ.splice(this.brojNedeljaJ.indexOf(i), 1);
      }

      for(var i = 1; ukupnoNedelja >= i ; i++){
        this.brojNedeljaJ[i-1] = i;
      }

      for(let ar in this.objekatBrojNedelja){//Brisanje Niza-objekata!!!
        let index = this.objekatBrojNedelja.indexOf(this.objekatBrojNedelja[ar]);
        this.objekatBrojNedelja.splice(index, this.objekatBrojNedelja.length);
      }

      for (let pr of this.brojNedeljaJ){
        let y = {};
        y['id'] = pr;
        y['Naziv'] = 'Nedelja' + pr
        this.objekatBrojNedelja.push(y);
      }
      //console.log(this.objekatBrojNedelja); 
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
        
        console.log(this.ispisToken);
        console.log(this.ispisToken.exp)

        this.ispisToken.exp += Number(500)

    }

    brisanje_vrednosti_iz_selecta(){

      for(var i = 0; this.lista_broja_nedelja >= i ; i++){
          this.objekti_nedelje.splice(this.objekti_nedelje.indexOf(i), 1);
      }

      for(var i = 0; this.lista_broja_nedelja >= i ; i++){
          this.brojNedeljaJ.splice(this.brojNedeljaJ.indexOf(i), 1);
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
        //console.log(this.objectNedelje);
    }

    provera_godina(){

      this.brisanje_vrednosti_iz_selecta();
      this.broj_nedelja_za_dati_mesec();
    
      this.NizMesecBackspace[0] = this.selectedGodina;

      this.renderer.listen(this.el.nativeElement, 'keyup', (event) => {
    
            this.selectedGodina = this.NizMesecBackspace[0];
      })

      
      /*this.sservice.vrednosti_baza(this.currentUser_ne,this.selectedMesec,this.selectedGodina,this.selectedNedelja)
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
              () => {console.log('done')
      });*/
    }

    public trackByIndex(index: number, item) {
    //console.log("index" + index + "item" + item);
      return index;
    } 

    /*let MickoNizBreTakoJe = [];
      MickoNizBreTakoJe = ['a','b','c','d','e','f'];
      console.log(MickoNizBreTakoJe)
      MickoNizBreTakoJe.splice(0,MickoNizBreTakoJe.length)
      console.log(MickoNizBreTakoJe)*/



}
