import { Component, OnInit, Renderer,OnDestroy  } from '@angular/core';
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
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
//import * as xlsx from 'xlsx';
//declare var require: any;
//import { Excel } from 'exceljs';
import * as Excel from 'exceljs';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})

//declare var require: any;
//export type Fruit = "Orange" | "Apple" | "Banana";


export class PocetnaComponent implements OnInit,OnDestroy {

  
  someEvent$: EventEmitter<any> = new EventEmitter();
  flagGG:boolean = false;
  flagTT:boolean = false;
  x:any;
  d:any;
  y:any;
  m:any;
  z:number;
  brojac:number;
  NizBaza:any = [{}];
  NizObject:any = [{}];
  deviceObjects = [{name: 'Januar'}, {name: 'Februar'}, {name: 'Mart'},{name:'April'},{name: 'Maj'},{name:'Jun'},
                   {name:'Jul'},{name:'Avgust'},{name:'Septembar'},{name:'Oktobar'},{name:'Novembar'},{name:'Decembar'}];
  selectedMesec = this.deviceObjects[0].name;
  selectedGodina:any;
  nedeljaP: any;
  odaberi_mesecP:string; 
  odaberi_godinaP:string;
  izabrani_mesecP:number;
  izbrana_godinaP:number;
  lista_broja_nedelja:any;
  objekti_nedelje = [{}];
  Token: any;
  currentUser_ne:User[] = [];
  //dialog
  display: boolean = false;
  text:string;
  text_izlaz:string;
  valueSize: number = 200;
  //Token
  base64Url:any;
  base64:any;
  ispisToken:any;
  tokenAdmin:any;
  //dialog error
  textError:string;
  textErrorIzlaz:string;
  displayError:boolean = false;  
  displayDialog:boolean = false;
  //
  mumuSum:number;
  projekti_lista:ProjektiSTNICA;
  cuvaj_sate:any;
  projekti:ListaProjekataModel[] = [];
  korisnici:ListaKorisnikaModel[] = [];   
  NizMesecBackspace:any[] = [];
  error:any;
  GodinaJ = new Godina();
  MesecJ:any;
  NedeljaJ = new Godina();
  brojNedeljaJ = [];
  objekatBrojNedelja:any [] = [];
  month:string[] = [];
  objectNedelje:any [] = [];
  pamtiToken:any;
  public interval:any;
  nekaBrojac:number = 0;
  nekaBrojac1:number = 0;
  flgHTML:boolean = true;
  email:any;
  textEmail:string = "";
  emailOdg:string = "";

  flgZahtev:boolean = false;
  prikazProjekti:string = "Prikaži sve";
  //Flg-ovi za loading!!!
  flgLoad:boolean = false;
  flgReload:boolean = false;
  flgChange:boolean = true;
  flgSaveAll:string = 'sacuvano';
  flgSave:string = 'jeste';
  flgDisable:boolean = false;
  flgNeispravno:boolean = false;
  //
  trenutnaGodina:number;
  trenutniMesec:string;
  trenutnaNedelja:number;
  gotovaFunkcija:boolean = true;
  textObavestenjaMesecPrvi:string;
  textObavestenjaMesecPoslednji:string;
  hideElement:number = 1;
  textInput:any;
  zastita:any;
  // 
  sort:boolean = false;
  jsonProbaModel = new prevodPodaciModel();
  nizObjekataBreJ:any [] = [];
  //Nova tabela,promenljive!!
  tabelaPrikaz:prikazTabelaModel[] = [];
  opcijeTabelaMicko:tabelaFunkcijeModel[] = [];
  opcijeTabela:any [] = [];
  prikazInformacija:number = 1;
  rez:number[] = [];
  rezObject:any;
  borderHtml:string = '1px solid #D3D3D3';
  borderFlg:boolean = true;
  iconFlgBtn:boolean = true;
  iconFlg:boolean = true;
  //Excel = require('exceljs');
  //style="border: 2px solid #A52A2A"
  patmiIcon:string;
  pamtiProjekti:string;
  pamtiSmer:string;
  
  //require: any;
  //workbook: ExcelProper.Workbook = new Excel.Workbook();
  
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
        this.nekaBrojac1 = this.nekaBrojac1 + 1
        if(this.nekaBrojac1 == 0){
            this.router.navigate(['/login']);
        } 
      }
      else{

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

        this.mumuSum = 0;
        this.month = ["Januar","Februar","Mart","April","Maj","Jun","Jul","Avgust","Septembar","Oktobar","Novembar","Decembar"]
        let d = new Date();
          
      }   
    }

    ngOnDestroy(){

        clearInterval(this.interval);

    }

    ngOnInit() {

      this.currentUser_ne = JSON.parse(localStorage.getItem('currentUser'));
      let jsonProba;
     
      /*this.sservice.trenutni_godina()
        .subscribe(
          GodinaJ => { this.GodinaJ.godina = Number(GodinaJ)*/
      this.GodinaJ.godina = Number(new Date().getFullYear());
      this.trenutnaGodina = Number(this.GodinaJ.godina);
      let d = new Date();
      this.MesecJ = this.month[d.getMonth()];
      this.trenutniMesec = this.MesecJ;
      this.racunanjeRadnihDana(this.MesecJ,this.GodinaJ.godina);

      this.sservice.trenutni_nedelja()
        .then(
          NedeljaJ => { this.NedeljaJ.nedelja = NedeljaJ

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
                    gg['sacuvano'] = 'jeste'
                    this.nizObjekataBreJ.push(gg);
                    nizImeJ.splice(0,nizImeJ.length)
                    nizVrednostJ.splice(0,nizVrednostJ.length)
                    nizBazaImeJ.splice(0,nizBazaImeJ.length)
                    
                  }   
                  this.tabelaPrikaz = this.nizObjekataBreJ;
                  
                  for(var ii in this.tabelaPrikaz){
                  //for(let ii = 0;ii<1;ii++){
                    this.rez[ii] = 0
                    for(var zz in this.tabelaPrikaz[ii].Podaci){
                      this.rez[ii] += this.tabelaPrikaz[ii].Podaci[zz].satnica;
                      this.tabelaPrikaz[ii]['sumProjekata'] = this.rez[ii];
                    }
                    //this.mumuSum += this.rez[ii];
                    this.mumuSum += this.tabelaPrikaz[ii]['sumProjekata'];
                  }
                  this.flgReload = true;
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

      /*  },
        error => {
        console.log("error");
        this.Erorr("Nije moguce ocitati trenutnu godinu");
      });  */

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
        if(JSON.parse(localStorage.getItem('Token')) == null){

              console.log("Miroslav Beronja!!");
              alert("Izlogovani ste");
              this.router.navigate(['/login']);
              return;
        }
      }  
      try{
        this.currentUser_ne = JSON.parse(localStorage.getItem('currentUser'));
      }
      catch(err){
      }

      this.brojNedeljeUMesecu("Januar",2017)
      
      let sortNiz = [];
      sortNiz = [{broj:'10',ime:'15'},{broj:11,ime:'AA11'},{broj:2,ime:'2bd'},{broj:0,ime:'asa'},{broj:0,ime:'1dsda5'},
                 {broj:3,ime:'15aaa'},{broj:1,ime:'15ssss'},{broj:7,ime:'Mico'},{broj:7,ime:'NEsto'},{broj:9,ime:'Breee'}];

      sortNiz.sort(function(a,b){
        // return a.broj-b.broj //sortira od najmanjeg do najveceg!!
        // return b.broj-a.broj  //sortira od najveceg do najmanjeg!!
        var nameA=a.ime.toLowerCase(), nameB=b.ime.toLowerCase()
            if (nameA < nameB) //sort string ascending
                return -1 
            if (nameA > nameB)
                return 1
            return 0 //default return value (no sorting)
      })

    }

    PrikazProjekata(){
  
      let opcijePrikaz = [];

      for(let bb in this.tabelaPrikaz){
        for(let cc in this.opcijeTabelaMicko){
          if(this.tabelaPrikaz[bb]['Projekti'] == this.opcijeTabelaMicko[cc]['Projekti']){
            let t = {};
            for(let kk in this.opcijeTabelaMicko[cc]){
              t[kk] = this.opcijeTabelaMicko[cc][kk];
            }opcijePrikaz.push(t);
          }
        }
      }
      opcijePrikaz.slice(0,opcijePrikaz.length);
      for(let ar in this.opcijeTabelaMicko){//Brisanje Niza-objekata!!!
        let index = this.opcijeTabelaMicko.indexOf(this.opcijeTabelaMicko[ar]);
        this.opcijeTabelaMicko.splice(index, this.opcijeTabelaMicko.length);
      }  
      
      this.opcijeTabelaMicko = opcijePrikaz;
      for(let op in opcijePrikaz){
        for(let ss in opcijePrikaz[op]){
          this.opcijeTabelaMicko[op][ss] = opcijePrikaz[op][ss];
        }
      }
      
    }

    iconfunction(strela:string,value:string,smer:string,projektiS:prikazTabelaModel[] = [],projektiPrikaz:any[] = [],click:string){

      this.patmiIcon = strela;  
      this.pamtiProjekti = value;
      this.pamtiSmer = smer;
      if(this.patmiIcon == undefined && this.pamtiProjekti == undefined && this.pamtiSmer == undefined){
        return
      }

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

      this.PrikazProjekata();
      if(click == 'click'){
        this.menjenjeStrelica(this.patmiIcon);
      }
      //this.menjenjeStrelica(this.patmiIcon);
      /*
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
      */

    }

    menjenjeStrelica(value:string){
      
      if(value == 'btn'){
        if(this.iconFlgBtn == true){
          this.iconFlgBtn = false;
        }
        else if(this.iconFlgBtn == false){
          this.iconFlgBtn = true;
        }
      }
      else if(value == 'icon'){
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

    ureduFunkcija(idS:number){

      this.tabelaPrikaz[idS]['sacuvano'] = 'jeste'; 

    }

    sacuvajProjekat(idP:number,vrednosti:snimiProjekatModel[] = [],idProjekta:number,imeTabele:string,godina:any,mesec:any,nedelja:any){

      let flg:boolean = false;
      this.tabelaPrikaz[idP]['sacuvano'] = 'nije';
      for(let z in vrednosti){
        if(vrednosti[z].satnica == null){
          flg = true;
        }
      } 
      this.zastitaUnosa(godina,mesec,nedelja);

      if(this.gotovaFunkcija == true){
        if(this.GodinaJ.godina == null || (this.GodinaJ.godina  != 2017 &&  this.GodinaJ.godina  != 2018 && this.GodinaJ.godina  != 2019)){
          this.text = "Nije dobro uneta godina!!"
          this.text_izlaz = 'Izlaz'; 
          this.showDialog();
          this.GodinaJ.godina  = (new Date().getFullYear());
        }
        else{
          if(flg==true){
             this.Erorr("Satnica za dati projekat nije dobro uneta");
             this.flgNeispravno = true;
             this.tabelaPrikaz[idP]['sacuvano'] = 'jeste';
          }
          else{
            this.sservice.CuvajProjekat(this.currentUser_ne,this.MesecJ,this.GodinaJ.godina,this.NedeljaJ.nedelja,vrednosti,idProjekta,imeTabele)
              .subscribe(
                cuvaj_sate => { this.cuvaj_sate = cuvaj_sate

                  if((this.cuvaj_sate._body) == '"Uspesan Insert"'){

                    this.tabelaPrikaz[idP]['sacuvano'] = 'snimanje';
                    //this.flgSave = 'jeste';
                    this.text = "Uspešno ste sačuvali satnice!!"
                    this.text_izlaz = 'Uredu'; 
                    //this.showDialog();
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
                    this.showDialog();
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

      this.flgSaveAll = 'snimanje';
      this.flgReload = true;
      this.flgChange = true;
      this.flgDisable = true;
      ////this.zastitaUnosa();
      this.zastitaUnosa(this.GodinaJ.godina,this.MesecJ,this.NedeljaJ.nedelja);

      if(this.gotovaFunkcija == true){
        let cujajBree;
        //this.currentUser_ne,this.ngMesecP,this.ngGodinaP.godina,this.ngNedeljaP.nedelja,nizPodataka
        
        this.sservice.SaljiSve(this.currentUser_ne,this.MesecJ,this.GodinaJ.godina,this.NedeljaJ.nedelja,this.tabelaPrikaz)
          .subscribe(

            cujajBree => { cujajBree = cujajBree

              if(cujajBree == "Uspesan Insert"){
                this.flgSaveAll = 'gotovo';
                //this.flgDisable = false;
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

    GotovoSveSatnice(){

      this.flgSaveAll = 'sacuvano';
      this.flgDisable = false;

    }

    racunanjeUzivo(satnica:number,ime:string,id:number,projekti:string,pd:any){

      

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
    
    projektiSatnice(){


      let brojacInterval = 0;
      let intervalPocetna = setInterval(() => { 
          
        brojacInterval++;
        if(brojacInterval == 1){

        for(let ar in this.tabelaPrikaz){//Brisanje Niza-objekata!!!
          let index = this.tabelaPrikaz.indexOf(this.tabelaPrikaz[ar]);
          this.tabelaPrikaz.splice(index, this.tabelaPrikaz.length);
        }

        /*
          for(let ar in this.opcijeTabelaMicko){//Brisanje Niza-objekata!!!
            let index = this.opcijeTabelaMicko.indexOf(this.opcijeTabelaMicko[ar]);
            this.opcijeTabelaMicko.splice(index, this.opcijeTabelaMicko.length);
          }

          for(let ar in this.opcijeTabela){//Brisanje Niza-objekata!!!
            let index = this.opcijeTabela.indexOf(this.opcijeTabela[ar]);
            this.opcijeTabela.splice(index, this.opcijeTabela.length);
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

        */

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
          gg['sacuvano'] = 'jeste';
          this.nizObjekataBreJ.push(gg);

          nizImeJ.splice(0,nizImeJ.length);
          nizVrednostJ.splice(0,nizVrednostJ.length);
          nizBazaImeJ.splice(0,nizBazaImeJ.length);

        }   

        this.tabelaPrikaz = this.nizObjekataBreJ
        this.mumuSum = 0;  
        for(var ii in this.tabelaPrikaz){
        //for(let ii = 0;ii<1;ii++){  
          this.rez[ii] = 0
          for(var zz in this.tabelaPrikaz[ii].Podaci){
            this.rez[ii] += this.tabelaPrikaz[ii].Podaci[zz].satnica;
            this.tabelaPrikaz[ii]['sumProjekata'] = this.rez[ii];
          }
          //console.log("rez"+ ": " + this.rez[ii]);
          this.mumuSum += this.rez[ii];
        }
       
        this.flgChange = true;
        this.flgDisable = false;
        this.iconfunction(this.patmiIcon,this.pamtiProjekti,this.pamtiSmer,this.tabelaPrikaz,this.opcijeTabelaMicko,'nije');
        clearInterval(intervalPocetna);

        }
      }, 200);

    }

    onChangeNedelja(godina:any,mesec:any,nedelja:any){

      this.brojNedeljaZaDatiMesecGodinu(mesec,godina);
      this.flgChange = false;
      this.flgDisable = true;
      this.sservice.jsonProjekti(nedelja,mesec,this.currentUser_ne,godina)
        .subscribe(jsonProbaModel => { this.jsonProbaModel = jsonProbaModel

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
      this.flgChange = false;
      this.flgDisable = true;
      if(this.objekatBrojNedelja.length < nedelja)
      { 
        this.NedeljaJ.nedelja = 1;
        nedelja = 1;
      }

      this.sservice.jsonProjekti(nedelja,mesec,this.currentUser_ne,godina)
        .subscribe(jsonProbaModel => { this.jsonProbaModel = jsonProbaModel

          //console.log(this.jsonProbaModel);
          //this.PrikazProjekata();
          this.projektiSatnice();
          
          
        },
        error => {
          console.log("error");
          this.Erorr(this.error._body);
      });
    }

    klikGodina(godina:any,mesec:any,nedelja:any){
     
      this.racunanjeRadnihDana(mesec,godina); 
      this.brojNedeljaZaDatiMesecGodinu(mesec,godina);
      this.flgChange = false;
      this.flgDisable = true;
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
      odabranaGodina = String(godina);
      
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

      let brojNedeljaPamti = this.brojNedelja(mesecIzabrani,odabranaGodina)
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
      let yearStart:any;
      yearStart = new Date(year,0,1); // 1st Jan of the Year

      let fristDayOfMonth:any;
      fristDayOfMonth = new Date(year, month , 1);
      let fristWeekNumber:number;
      fristWeekNumber = Math.ceil((((fristDayOfMonth - yearStart) / 86400000) +yearStart.getDay()+ 1)/7);//Prva nedelja u mesecu

      let lastDayOfMonth:any;
      lastDayOfMonth = new Date(year, month+1, 0); // Last date of the Month
      let lastWeekNumber;
      lastWeekNumber = Math.ceil((((lastDayOfMonth - yearStart) / 86400000) + yearStart.getDay()+ 1)/7);//Poslednja nedelja u mesecu

      let razlika:number;
      razlika = (lastWeekNumber - fristWeekNumber) + 1;//10-6 u Februaru
      let poslednjaNedelja:number
      poslednjaNedelja = razlika;
      let prvaNedelja;
      prvaNedelja = 1;
  
      return  [prvaNedelja, poslednjaNedelja];

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

      let pamtiNedelje:any;
      pamtiNedelje = this.brojNedelja( this.izabrani_mesecP,this.odaberi_godinaP)
      //this.pamti_nedelje = this.brojNedelja( this.izabrani_mesecP,this.odaberi_godinaP)
      //for(var index = this.pamti_nedelje[0]; index<=this.pamti_nedelje[1]; index++){
      
      for(var index = pamtiNedelje[0]; index<=pamtiNedelje[1]; index++){  
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

    /*
      let MickoNizBreTakoJe = [];
      MickoNizBreTakoJe = ['a','b','c','d','e','f'];
      console.log(MickoNizBreTakoJe)
      MickoNizBreTakoJe.splice(0,MickoNizBreTakoJe.length)
      console.log(MickoNizBreTakoJe)
    */
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
