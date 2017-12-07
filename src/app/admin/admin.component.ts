import { Component, OnInit,OnDestroy } from '@angular/core';
//import { DropdownModule} from 'primeng/primeng';
import { AdminService } from '../admin.service'
import { Admin } from '../models/admin.model'
import { ActivatedRoute, Params,Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import { AuthenticationService} from '../authentication.service'
import { FooterOstaloComponent } from '../footer-ostalo/footer-ostalo.component';
import { Observable } from 'rxjs/Observable';
import { SelectItem,TreeNode } from 'primeng/primeng';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { ProjektiSTNICA } from '../models/projektiSatnica.model';
import { ListaProjekataModel } from '../models/ListaProjekata.model';
import { ListaKorisnikaModel } from '../models/ListaKorisnika.model';
import { ListaBazaPodaciModel } from '../models/ListaBazaPodaci.model';
import { SelectItemProjekti } from '../models/dropdown.model';
import { Directive, ElementRef, HostListener, Input,Renderer } from '@angular/core';
import { User } from '../models/user';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { Http, Headers, Response,RequestOptions } from '@angular/http';
import { Injectable,Inject } from '@angular/core';
/*import * as XLSX from 'ts-xlsx';
import { read, IUtils ,write, IWorkBook  } from 'ts-xlsx';
import { saveAs } from 'file-saver';
import {IWorkSheet} from "ts-xlsx";*/
import { saveAs } from 'file-saver';
//import * as JSZip from 'jszip';
//import { zip } from 'jszip';

//WritingOptions

//type AOA = Array<Array<any>>;
declare var require: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  /*host: {
    '(document:click)': 'onClick($event)',
  },*/
})
export class AdminComponent implements OnInit,OnDestroy {

  korisniciAktivni : Admin;
  projektiAktivni : Admin;
//Korisnici
  //spinner input
  selectedGodinakorisniciAdmin:number;
  //dropdown
  imePrezimeAktivni:SelectItem[];
  selectedKorisnikAdmin:any;
  //tabela-vrednost za NgPrime tabelu
  vrednostTabelakorisnici:any;
//

//Projekti
  //spinner input
  selectedGodinaProjektiAdmin:any;
  //dropdown
  projektiDropDown:SelectItemProjekti[];
  selectedProjektiAktivni:string;
  //tabela-vrednost za NgPrime tabelu
  vrednostTabelaProjekti:any;
//
//Dodavanje novog projekta
  DodavanjeNovogKorisnika:any;
  //Form
  public myForm: FormGroup;
  public submitted: boolean;
  public events: any[] = [];
  public validDodaj : string;
  filter:any;
  odgovorInsert:string;
  dodajuspesno:number;

  //
//
//Dodavanje korisnika na projekat
  selectedDodavanjeKorisnikaNaProjekatKorisnik = new ListaKorisnikaModel();
  selectedDodavanjeKorisnikaNaProjekatProjekat:string;
  trenutnaGodinaDodavanje:number;
  insert:any;
  projektiNaKojimaNeRadi:Admin;
  projektiDropDownDodajNaProjekat:SelectItem[];
//
//Uklanjanje korisnika sa projekta
  selectedUklanjanjeKorisnikaSaProjektaKorisnik = new ListaKorisnikaModel();
  selectedUklanjanjeKorisnikaSaProjektaProjekat:string;
  projektiNaKojimaRadi:Admin;
  projektiDropDownUklanjanjeSaProjekta:SelectItem[];
  odgovorUklanjanje:Admin;
//
//Deaktivacija
  selectedDeaktivacija:string;
  deaktivacijaKorisnik:Admin;
  flgDeaktivacija:number; 
//
//Aktivacija
  selectedAktivacija:string;
  aktivacijaKorisnik:Admin;
  imePrezimeNeAktivni:SelectItem[];
  korisniciNeAktivni:Admin;
  flgAktivacija:number;
  
//
//Token
  base64Url:any;
  base64:any;
  ispisToken:any;
  tokenAdmin:string;
  currentUser_ne:User[] = [];
//
//
  display:boolean = false;
  displayUkloni:boolean = false;
  displayUredu:boolean = false;
  displayError:boolean = false;
  textError:string;
  textPotvrdaError:string;

  textObavestenje:string;
  text_izlaz:string;
  text:string;
  textPotvrda:string;
  textNe:string
  textUpozorenje:string;  
  proveraUspesnosti:boolean = true;
  dodajProvera:boolean = true;
//
//Slanje mejla
  newUser = {
    username:'',
    password:''
  }
//Nova tabela svi korisnici i svi projekti
   projekti_lista:ProjektiSTNICA[] = [];
   //projekti_lista = new ProjektiSTNICA();
   vidljivost:string;
   cuvaj_sate:ProjektiSTNICA;
   ngMesec:any;
   tabelaProba:any = [{}];
   nizPr:any[] = [];
   nizKor:any[] = [];
   projekti:ListaProjekataModel[] = [];
   korisnici:ListaKorisnikaModel[] = [];
   korisniciObject:ListaKorisnikaModel[] = [];
   nizObjKorisnik:any[] = [];
   BazaPodaci:ListaBazaPodaciModel;
   PakovanjeProjekata:any[] = [];
   saberi:number;
   rezHorizontalno:number;
   rezVertikalno:number;
   projekatRezDetalji:number;
   projekatKorDetalji:number;

   SumaPoKorisniku:any[] = [];
   SumaPoKorisnikuProjekat:any[] = [];
   SumaPoProjektu:any[] = [];
   SumaPoNedeljamaDetalji:any[] = [];
   projekatKorisnici = new ProjektiSTNICA();//projekatKorisnici:ProjektiSTNICA;
   neznamKakoDaNazovem:any[] = [];
   neznamKakoDaNazovemObject:any[] = [];
   pakovanjeDetalji:any[] = [];
   probaMICKO:any[] = [];

   detaljiKorisniciObject:ListaKorisnikaModel[] = [];
   detaljiNizObjKorisnik:any[] = [];

   NizProjekti:any[] = [];
   NizKorisnici:any[] = [];
   NizObjekataKorPr:any[] = [];
   ListaProjekataNiz:any;
   SumaNizVertikalno:number[] = [];
   SumaNizHorizontalno:number[] = [];
   uvecajNesto:number;
   pamtiToken:any;
   //KorisniciOdredjeniProjekat:

   odaberi_mesec:string; 
   odaberi_godina:number;
   izabrani_mesec:number;
   KorisniciMesecAdmin:string;
   ProjektiMesecAdmin:string;
   pamti_nedelje_Admin:any;
   projekatPamti_nedelje_Admin:any;
   lista_broja_nedelja:any;
   lista_broja_nedelja_ngModel:any;
   projekatLista_broja_nedelja_ngModel:any;

   first_day_of_month:any;
   first_week_number:number;
   yearStart:any; 
   last_day_of_month:any;
   last_week_number:any;
   razlika:number;
   prva_nedelja:number;
   poslednja_nedelja:number;
   nizMesec = [{name: 'Januar'}, {name: 'Februar'}, {name: 'Mart'},{name:'April'},
      {name: 'Maj'},{name:'Jun'},{name:'Jul'},{name:'Avgust'},{name:'Septembar'},{name:'Oktobar'},{name:'Novembar'},{name:'Decembar'}];

   KorisniciNedeljaAdmin:any; 
   error:any;
   interval:any;
   Naslov:string = "Obavestenje"
   flgLoadingAdmin:boolean = false;
   flgLoadingAdminTabela2:boolean = false;
   sumSvih:number = 0;
   sumSvihProjekti:number = 0;

   //Style html
   boja:string;  
   stringPrazan:string = "";
   godinaTrAdmin:number;

   //readonlyInput:any;
   readonlyInput = new ListaProjekataModel();
   flgIf:boolean = false;
   flgDrop:boolean = false;
   nizNgFor:any = ['Miroslav Beronja','Stefan Beronja','Jasna Beronja','Miroslav Beronja','Mihajlo Beronja','Radivoje Mikic','Zelimir Mikic','Marko Vulic','Marko Beronja'];
   nizNgForPrikaz:any[] = [];
   brojacDrop:boolean = false;
   probaBre:string = 'nije';
   brojacKlik:number = 0;
   pretraga:any;
   projektiObjekat: ListaProjekataModel[] = [];

   readonlyInputNeaktivni = new ListaProjekataModel();
   flgDropNeaktivni:boolean = false;
   nizNgForPrikazNeaktivni:any[] = [];
   pretragaAktivni:any;
   projektiObjekatNeaktivni: ListaProjekataModel[] = [];

   godinaInput:number;
   ukupnoExcel:any[] = [];
   projektiOdabrani:any[] = [];
   vidljivostProjekta:any[] = [];
   pretragaDodavanje:any; 
   pretragaDodavanjeOdabrano:any;
   flgKorisnik:boolean = false
   
   flgAdd:boolean = false;
   flgRemove:boolean = false;
   pretragaDodaj:any;
   pretragaUkloni:any;
   nizNgForDodajProjekat:any[] = [];
   nizNgForUkloniProjekat:any[] = [];
   Citanje:string = 'sacuvano';
   izvrsiDisable:boolean = true;
   pretragU:any;
   naKojimaRadeHtml:any[] = [];
   pretragaUklanjanjeOdabrano:any;
   projektiUkloniOdabrani:any[] = [];
   izvrsiUkloni:boolean = true;
   CitanjeUkloni:string = 'sacuvano';
   

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private authenticationService: AuthenticationService,  
    private adminservice: AdminService,
    private formBuilder: FormBuilder,
    private router: Router,
    private el: ElementRef,
    public renderer: Renderer,
    private http: Http,
    @Inject('ApiEndpoint') private apiEndpoint: any
  ) 
  {   
    
      //this.readonlyInput.Projekti = 
      this.SumaNizVertikalno[0] = 0;
      this.SumaNizHorizontalno[0] = 0;
      this.uvecajNesto = 0;
      this.saberi = 0;
      this.rezHorizontalno = 0;
      this.neznamKakoDaNazovem = ['Razvoj','odrzavanje','dokumentacija','implementacija','rezijski_poslovi'];
      this.neznamKakoDaNazovemObject = [{x:{ime:'Razvoj',baza:'Razvoj'}},{x:{ime:'Odrzavanje',baza:'odrzavanje'}},
        {x:{ime:'Dokumentacija',baza:'dokumentacija'}},{x:{ime:'Implementacija',baza:'implementacija'}},{x:{ime:'Rezijski poslovi',baza:'rezijski_poslovi'}}];

      //this.KorisniciMesecAdmin = this.nizMesec[0].name;
      this.ProjektiMesecAdmin = this.nizMesec[0].name;
      this.KorisniciNedeljaAdmin = 1;
      this.selectedProjektiAktivni = 'INIT 10';
      let tabelaIme = 'sve_jedna_tabela';
      
  }

  ngOnDestroy(){
    clearInterval(this.interval);
  }

  ngOnInit() {

    this.selectedGodinakorisniciAdmin = Number(new Date().getFullYear());
    this.KorisniciMesecAdmin = this.nizMesec[0].name;
    this.adminservice.SatnicaKorisniciSveNedeljeAdmin(this.KorisniciMesecAdmin,this.selectedGodinakorisniciAdmin)
      .subscribe(
        BazaPodaci => { this.BazaPodaci = BazaPodaci
          if(this.BazaPodaci != null){
            for(let ii in this.BazaPodaci){
              if(this.BazaPodaci[ii]['sum'] == 0){
                this.BazaPodaci[ii]['sum'] = null;
              } 
            }
          }
          this.adminservice.ListaProjekataAdmin()
            .subscribe(
                projekti => { this.projekti = projekti
    
                var cuvaj = this.projekti;

                for(let pr in this.projekti){
                  this.NizProjekti[pr] = this.projekti[pr].Projekti
                }  

                this.adminservice.ListaKorisnikaAdmin()
                  .subscribe(
                    korisniciObject => { this.korisniciObject = korisniciObject

                      let cuvajObject = this.korisniciObject;                        
                      this.brojNedeljaZaDatimesecAdmin();
                      let brojacKor = 0;

                      for(let duzNed in this.pamti_nedelje_Admin){ 
                        //for(let brKor in this.korisniciObject){
                        for(let brKor = 0;brKor<this.korisniciObject.length + 1;brKor++){  
                          let objectKor = {};
                          brojacKor++;
                          
                          if(this.korisniciObject.length + 1 == brojacKor){
                            objectKor['ime'] = this.saberi + "." + 'Nedelja';
                            objectKor['oznaka'] = 'Nedelja' + "" + this.saberi;
                            objectKor['boja'] = 1;
                            brojacKor = 0;
                            this.boja = 'blue';

                          }else if(brKor <= this.korisniciObject.length){

                            this.saberi = Number(duzNed) + 1;
                            objectKor['ime'] = this.korisniciObject[brKor].Ime_Prezime
                            objectKor['oznaka'] = this.korisniciObject[brKor].Ime_Prezime + "" + this.saberi;
                            objectKor['boja'] = 0;
                            this.boja = 'white';
                          }
                          this.nizObjKorisnik.push(objectKor);     
                        }                        
                      }
                      //console.log(this.nizObjKorisnik);
                      for(let pr of this.NizProjekti){

                        let Kor = {};
                        Kor['Projekat'] = pr;
                        for(let korinik of this.nizObjKorisnik){
                          Kor[korinik.oznaka] = null;
                        }
                        this.PakovanjeProjekata.push(Kor);
                      }  
                      
                      for(let pp in this.PakovanjeProjekata){
                        for(let bp in this.BazaPodaci){
                          
                          if(this.PakovanjeProjekata[pp]['Projekat'] == this.BazaPodaci[bp]['Projekti']){

                            let pamtiNedeljuKor = 0;
                            let pamtiImePrezime;
                            let spojiImePrezimeNedelju;
                            pamtiNedeljuKor = this.BazaPodaci[bp]['nedelja'];
                            pamtiImePrezime = this.BazaPodaci[bp]['Ime_Prezime']
                            spojiImePrezimeNedelju = pamtiImePrezime + "" + pamtiNedeljuKor;
                            //this.PakovanjeProjekata[pp]['Projekat']
                            //console.log("spojiImePrezimeNedelju" + spojiImePrezimeNedelju);
                            this.PakovanjeProjekata[pp][spojiImePrezimeNedelju] = this.BazaPodaci[bp].sum;
                          }
                        }
                      }
                      
                      for(let pp in this.PakovanjeProjekata){
                          this.SumaPoProjektu[pp] = null; 
                      }

                      for(let pp in this.PakovanjeProjekata){
                        //for(let i = 0; i < 2 ; i++){  
                        for(let duzNed in this.pamti_nedelje_Admin){

                          for(let kor of this.korisniciObject){

                            let cuvajKor;
                            this.rezHorizontalno = Number(duzNed) + 1;
                            
                            cuvajKor = kor.Ime_Prezime + "" + this.rezHorizontalno;
                            this.PakovanjeProjekata[pp]['Nedelja' + this.rezHorizontalno] = this.PakovanjeProjekata[pp][cuvajKor] + this.PakovanjeProjekata[pp]['Nedelja' + this.rezHorizontalno];
                            //if(this.PakovanjeProjekata[pp]['Nedelja' + this.rezHorizontalno] == 0){
                              // this.PakovanjeProjekata[pp]['Nedelja' + this.rezHorizontalno] = null;
                            //}
                          }                                
                        }
                      }
                      //console.log(this.PakovanjeProjekata)
                        
                      for(let pp in this.PakovanjeProjekata){
                        for(let duzNed in this.pamti_nedelje_Admin){

                          this.rezVertikalno = Number(duzNed) + 1;
                          this.SumaPoProjektu[pp] = this.PakovanjeProjekata[pp]['Nedelja' + this.rezVertikalno] + this.SumaPoProjektu[pp];  
                        }
                      }

                      for(let kor in this.nizObjKorisnik){
                        this.SumaPoKorisniku[kor] = 0
                      }

                      for(let kor in this.nizObjKorisnik){
                        for(let pp in this.PakovanjeProjekata){

                          let cuvajOznaku;
                          cuvajOznaku = this.nizObjKorisnik[kor].oznaka
                          this.SumaPoKorisniku[kor] = this.PakovanjeProjekata[pp][cuvajOznaku] + this.SumaPoKorisniku[kor];

                        }
                      }

                      for(let sum in this.SumaPoProjektu){
                          this.sumSvih = Number(this.SumaPoProjektu[sum]) + this.sumSvih;
                      }
                     
                      this.flgLoadingAdmin = true;
                      
                  },
                  error => { this.error = error
                    this.Erorr('Nije moguce očitati korisnike');     
              });
            },

            error => { this.error = error
              this.Erorr('Nije moguce očitati projekte');             
          });   
        },
        error => { this.error = error
          console.log("error");
          this.Erorr(this.error._body);    
    });

    this.interval = setInterval(() => { 
        console.log("Admin!!");

        this.currentUser_ne = JSON.parse(localStorage.getItem('currentUser'));
        this.tokenAdmin = this.ParsirajJWT(JSON.parse(localStorage.getItem('Token')));

        this.adminservice.RefresujToken(this.currentUser_ne,this.tokenAdmin)
          .subscribe(
              pamtiToken => { this.pamtiToken = pamtiToken
            },
            error => {                     
        });
    }, 1000 * 5 * 60 * 60 );
   
    this.flgDeaktivacija = 1;
    this.flgAktivacija = 1;
    this.myForm = this.formBuilder.group({
          name   : ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
    this.subcribeToFormChanges(); 
    this.trenutnaGodinaDodavanje = new Date().getFullYear();
    //Popunjavanje dropdown-a sa aktivnim korisnicima!!  
    this.imePrezimeAktivniFunkcija();
    this.ImePrezimeNeAktivniKorisniciFunkcija();
    this.adminservice.Projekti()
      .subscribe(
        projektiAktivni => { this.projektiAktivni = projektiAktivni
          //ovde se popunjava dopwdpwn sa korisniciAktivni
          //console.log(this.projektiAktivni);

          this.popuniProjektiAdmin(this.projektiAktivni);

          },
          error => {
          console.log("error")
              localStorage.clear();
              this.text = 'Došlo je do greške na serveru!!'
              this.text_izlaz = 'Gotovo';
              this.showDialog();
          },
          () => {//console.log('done')
    });
    let tabelaIme = 'sve_jedna_tabela';
    this.adminservice.NeAktivniProjekti()
      .subscribe(
        projektiObjekat => { this.projektiObjekat = projektiObjekat
          //console.log(this.projektiObjekat)
          for(let t in this.projektiObjekat){
            this.nizNgForPrikaz[t] = 0;
          }

        },  
        error => {
          console.log("error")
          localStorage.clear();
        },
        () => {//console.log('done')
    });
    this.adminservice.AktivniProjekti()
      .subscribe(
        projektiObjekatNeaktivni => { this.projektiObjekatNeaktivni = projektiObjekatNeaktivni
          //console.log(this.projektiObjekatNeaktivni)
          for(let t in this.projektiObjekatNeaktivni){
            this.nizNgForPrikazNeaktivni[t] = 0;
          }

        },  
        error => {
          console.log("error")
          localStorage.clear();
        },
        () => {//console.log('done')
    });
    this.adminservice.trenutni_godina()
        .then(
          gorinaTre => { this.selectedGodinaProjektiAdmin = gorinaTre

            this.adminservice.projekatKorisnici(this.ProjektiMesecAdmin,this.selectedProjektiAktivni,this.selectedGodinaProjektiAdmin,tabelaIme)
              .subscribe(
                projekatKorisnici => { this.projekatKorisnici = projekatKorisnici

                  let tabelaCuvaj;
                  let tabelaIme = 'sve_jedna_tabela';
                  this.adminservice.TabelaJson(tabelaIme)
                    .subscribe(
                      tabelaCuvaj => { tabelaCuvaj = tabelaCuvaj
                  
                        this.adminservice.ListaKorisnikaAdmin()
                          .subscribe(

                            detaljiKorisniciObject => { this.detaljiKorisniciObject = detaljiKorisniciObject
                                              
                            let cuvajObject = this.detaljiKorisniciObject;                        
                            this.projektiBrojNedeljaMesecAdmin();
                            let brojacKor = 0;

                            for(let duzNed in this.projekatPamti_nedelje_Admin){ 
                              //for(let brKor in this.korisniciObject){
                              for(let brKor = 0;brKor<this.detaljiKorisniciObject.length + 1;brKor++){  
                                let objectKor = {};
                                brojacKor++;
                                
                                if(this.detaljiKorisniciObject.length + 1 == brojacKor){
                                  objectKor['ime'] = this.saberi + "." + 'Nedelja';
                                  objectKor['oznaka'] = 'Nedelja' + "" + this.saberi;
                                  objectKor['boja'] = 1;
                                  brojacKor = 0;
                                  this.boja = 'blue';

                                }else if(brKor <= this.detaljiKorisniciObject.length){

                                  this.saberi = Number(duzNed) + 1;
                                  objectKor['ime'] = this.detaljiKorisniciObject[brKor].Ime_Prezime
                                  objectKor['oznaka'] = this.detaljiKorisniciObject[brKor].Ime_Prezime + "" + this.saberi;
                                  objectKor['boja'] = 0;
                                  this.boja = 'white';
                                }
                                this.detaljiNizObjKorisnik.push(objectKor);      
                              }                     
                            }
                            
                            for(let tb in tabelaCuvaj){
                              //console.log(tb);
                              let korA = {};
                              korA['Projekat'] = tabelaCuvaj[tb].ime;
                              for(let pr of this.detaljiNizObjKorisnik){
                                korA[pr.oznaka] = null;
                              }
                              this.pakovanjeDetalji.push(korA);
                            }

                            for(let i in tabelaCuvaj){//ovde prolazi 5 puta
                            //for(let i = 0; i < 1 ; i++){
                              //console.log(i);
                              for(let nz in this.projekatKorisnici){
                                this.pakovanjeDetalji[i][this.projekatKorisnici[nz].Ime_Prezime + "" + this.projekatKorisnici[nz].nedelja] = this.projekatKorisnici[nz][tabelaCuvaj[i].baza];
                                if(this.pakovanjeDetalji[i][this.projekatKorisnici[nz].Ime_Prezime + "" + this.projekatKorisnici[nz].nedelja] == 0){
                                  this.pakovanjeDetalji[i][this.projekatKorisnici[nz].Ime_Prezime + "" + this.projekatKorisnici[nz].nedelja] = null;
                                }
                              }
                            }
                        
                            //Sumiranje po nedeljama
                            for(let pd in this.pakovanjeDetalji){
                            //for(let pd = 0; pd < 1 ; pd++){  
                              for(let duzNed in this.projekatPamti_nedelje_Admin){
                                for(let kor in this.detaljiKorisniciObject){

                                    this.projekatRezDetalji = Number(duzNed) + 1;
                                    this.pakovanjeDetalji[pd]['Nedelja' + this.projekatRezDetalji] = Number(this.pakovanjeDetalji[pd][this.detaljiKorisniciObject[kor]['Ime_Prezime'] + "" + this.projekatRezDetalji]) +  this.pakovanjeDetalji[pd]['Nedelja' + this.projekatRezDetalji];
                                }
                              }
                            }
                            for(let pd in this.detaljiNizObjKorisnik){

                                this.SumaPoKorisnikuProjekat[pd] = 0;
                            }

                            //Sumiranje po korisniku  
                            for(let kor in this.detaljiNizObjKorisnik){         
                              //for(let kor = 0; kor < 3 ; kor++){
                                  for(let pk in this.pakovanjeDetalji){

                                  let cuvajIme;
                                  cuvajIme = this.detaljiNizObjKorisnik[kor].oznaka 
                                  this.SumaPoKorisnikuProjekat[kor] = this.pakovanjeDetalji[pk][cuvajIme] + this.SumaPoKorisnikuProjekat[kor]; 
                                  
                              }  
                            }

                            for(let pd in this.pakovanjeDetalji){

                              this.SumaPoNedeljamaDetalji[pd] = 0;

                            }

                            for(let pd in this.pakovanjeDetalji){
                              for(let duzNed in this.projekatPamti_nedelje_Admin){

                                this.projekatKorDetalji = Number(duzNed) + 1;
                                this.SumaPoNedeljamaDetalji[pd] = this.pakovanjeDetalji[pd]['Nedelja' + this.projekatKorDetalji] + this.SumaPoNedeljamaDetalji[pd];  
                              }
                            }

                            for(let sum in this.SumaPoNedeljamaDetalji){
                              this.sumSvihProjekti = Number(this.SumaPoNedeljamaDetalji[sum]) + this.sumSvihProjekti;
                            }

                            this.flgLoadingAdminTabela2 = true;
                          },
                          error => {
                          this.Erorr('Nije moguce očitati korisnike');           
                        });
                    },
                    error => { this.error = error
                    this.Erorr(this.error._body);    
                });       
              },
              error => { this.error = error
                this.Erorr(this.error._body);    
            });
        },    
        error => { this.error = error
          console.log("error");
          this.Erorr("Nije moguce ocitati trenutnu godinu");
    });   

    if(JSON.parse(localStorage.getItem('Token')) == null){
      console.log("Izlogovani ste!!");
      this.router.navigate(['/login']);
      return;
    }

    this.tokenAdmin = this.ParsirajJWT(JSON.parse(localStorage.getItem('Token')));
    if(this.tokenAdmin == 'nije'){
      this.router.navigate(['/firstpage']);
    }
    else{
      return;
    }

    /*
      this.adminservice.trenutni_godina()
          .then(
            gorinaTre => { this.selectedGodinakorisniciAdmin = gorinaTre

              this.KorisniciMesecAdmin = 'Januar'
              console.log("this.selectedGodinakorisniciAdmin" + this.selectedGodinakorisniciAdmin);
              console.log(this.KorisniciMesecAdmin);
              this.selectedGodinakorisniciAdmin = 2019

              this.adminservice.SatnicaKorisniciSveNedeljeAdmin(this.KorisniciMesecAdmin,2017)
                  .subscribe(
                    BazaPodaci => { this.BazaPodaci = BazaPodaci

                    console.log("BazaPodaci" , BazaPodaci);  
                    if(this.BazaPodaci != null){
                      for(let ii in this.BazaPodaci){
                        if(this.BazaPodaci[ii]['sum'] == 0){
                          this.BazaPodaci[ii]['sum'] = null;
                        } 
                      }
                    }

                    this.adminservice.ListaProjekataAdmin()
                      .subscribe(
                          projekti => { this.projekti = projekti
                        
                          console.log("projekti" , projekti);     

                          var cuvaj = this.projekti;

                          for(let pr in this.projekti){
                            this.NizProjekti[pr] = this.projekti[pr].Projekti
                          }  

                          this.adminservice.ListaKorisnikaAdmin()
                            .subscribe(
                              korisniciObject => { this.korisniciObject = korisniciObject

                              console.log("his.korisniciObject" , this.korisniciObject)

                              let cuvajObject = this.korisniciObject;                        
                              this.brojNedeljaZaDatimesecAdmin();
                              let brojacKor = 0;

                              for(let duzNed in this.pamti_nedelje_Admin){ 
                                //for(let brKor in this.korisniciObject){
                                for(let brKor = 0;brKor<this.korisniciObject.length + 1;brKor++){  
                                  let objectKor = {};
                                  brojacKor++;
                                  
                                  if(this.korisniciObject.length + 1 == brojacKor){
                                    objectKor['ime'] = this.saberi + "." + 'Nedelja';
                                    objectKor['oznaka'] = 'Nedelja' + "" + this.saberi;
                                    objectKor['boja'] = 1;
                                    brojacKor = 0;
                                    this.boja = 'blue';

                                  }else if(brKor <= this.korisniciObject.length){

                                    this.saberi = Number(duzNed) + 1;
                                    objectKor['ime'] = this.korisniciObject[brKor].Ime_Prezime
                                    objectKor['oznaka'] = this.korisniciObject[brKor].Ime_Prezime + "" + this.saberi;
                                    objectKor['boja'] = 0;
                                    this.boja = 'white';
                                  }
                                  this.nizObjKorisnik.push(objectKor);     
                                }                        
                              }
                              //console.log(this.nizObjKorisnik);
                              for(let pr of this.NizProjekti){

                                let Kor = {};
                                Kor['Projekat'] = pr;
                                for(let korinik of this.nizObjKorisnik){
                                  Kor[korinik.oznaka] = null;
                                }
                                this.PakovanjeProjekata.push(Kor);
                              }  
                              
                              for(let pp in this.PakovanjeProjekata){
                                for(let bp in this.BazaPodaci){
                                  
                                  if(this.PakovanjeProjekata[pp]['Projekat'] == this.BazaPodaci[bp]['Projekti']){

                                    let pamtiNedeljuKor = 0;
                                    let pamtiImePrezime;
                                    let spojiImePrezimeNedelju;
                                    pamtiNedeljuKor = this.BazaPodaci[bp]['nedelja'];
                                    pamtiImePrezime = this.BazaPodaci[bp]['Ime_Prezime']
                                    spojiImePrezimeNedelju = pamtiImePrezime + "" + pamtiNedeljuKor;
                                    //this.PakovanjeProjekata[pp]['Projekat']
                                    //console.log("spojiImePrezimeNedelju" + spojiImePrezimeNedelju);
                                    this.PakovanjeProjekata[pp][spojiImePrezimeNedelju] = this.BazaPodaci[bp].sum;
                                  }
                                }
                              }
                              
                              for(let pp in this.PakovanjeProjekata){
                                  this.SumaPoProjektu[pp] = null; 
                              }

                              for(let pp in this.PakovanjeProjekata){
                                //for(let i = 0; i < 2 ; i++){  
                                for(let duzNed in this.pamti_nedelje_Admin){

                                  for(let kor of this.korisniciObject){

                                    let cuvajKor;
                                    this.rezHorizontalno = Number(duzNed) + 1;
                                    
                                    cuvajKor = kor.Ime_Prezime + "" + this.rezHorizontalno;
                                    this.PakovanjeProjekata[pp]['Nedelja' + this.rezHorizontalno] = this.PakovanjeProjekata[pp][cuvajKor] + this.PakovanjeProjekata[pp]['Nedelja' + this.rezHorizontalno];
                                    //if(this.PakovanjeProjekata[pp]['Nedelja' + this.rezHorizontalno] == 0){
                                    // this.PakovanjeProjekata[pp]['Nedelja' + this.rezHorizontalno] = null;
                                    //}
                                  }                                
                                }
                              }
                              //console.log(this.PakovanjeProjekata)
                                
                              for(let pp in this.PakovanjeProjekata){
                                for(let duzNed in this.pamti_nedelje_Admin){

                                  this.rezVertikalno = Number(duzNed) + 1;
                                  this.SumaPoProjektu[pp] = this.PakovanjeProjekata[pp]['Nedelja' + this.rezVertikalno] + this.SumaPoProjektu[pp];  
                                }
                              }

                              for(let kor in this.nizObjKorisnik){
                                this.SumaPoKorisniku[kor] = 0
                              }

                              for(let kor in this.nizObjKorisnik){
                                for(let pp in this.PakovanjeProjekata){

                                  let cuvajOznaku;
                                  cuvajOznaku = this.nizObjKorisnik[kor].oznaka
                                  this.SumaPoKorisniku[kor] = this.PakovanjeProjekata[pp][cuvajOznaku] + this.SumaPoKorisniku[kor];

                                }
                              }

                              for(let sum in this.SumaPoProjektu){
                                  this.sumSvih = Number(this.SumaPoProjektu[sum]) + this.sumSvih;
                              }
                              console.log("Micko")   
                              this.flgLoadingAdmin = true;
                              console.log("this.flgLoadingAdmin" + this.flgLoadingAdmin);
                            },
                            error => { this.error = error
                              this.Erorr('Nije moguce očitati korisnike');     
                        });
                      },

                      error => { this.error = error
                        this.Erorr('Nije moguce očitati projekte');             
                    });   
                  },
                  error => { this.error = error
                    console.log("error");
                    this.Erorr(this.error._body);    
              });
          },
          error => { this.error = error
            console.log("error");
            this.Erorr("Nije moguce ocitati trenutnu godinu");

      });  
    */


  }

  PripremaExporta(projektiZeljeni:any[] = [],sumaProjekti:any[] = [],sumaKorisnici:any[] = [],sum:any){

    let ukuponoCsv = [];
    let excelHeader = [];
    let p = {};
    p['ime0'] = '';
    for(let z in this.nizObjKorisnik){
      let t = 1;
      let sum = 0;
      sum = Number(t) + Number(z);
      let subString;
      let ime_pr = this.nizObjKorisnik[z]['ime'];
      let pos = ime_pr.indexOf(" ");
      let nextPos = Number(pos) + 1
      let res = ime_pr.substr(nextPos, ime_pr.length);
      let prvoSlovo = ime_pr.substr(0, 1);
      subString = prvoSlovo+"."+res;
      let tacka = ime_pr.indexOf(".")
      if(tacka == -1){
        p['ime'+sum+''] = subString;
      }
      else{
        p['ime'+sum+''] = this.nizObjKorisnik[z]['ime'];;  
      }
    }
    let Ukupno:number;
    Ukupno = Number(this.nizObjKorisnik.length) + 1;
    p['ime'+Ukupno+''] = 'Ukupno';
    excelHeader.push(p);
    let excelNiz:any[] = [];
    
    for(let pk in projektiZeljeni){
      let h = {}
      for(let i in projektiZeljeni[pk]){
        
        if(projektiZeljeni[pk][i] == null){
          h[i] = ''
        }
        else{
          h[i] = projektiZeljeni[pk][i]
        }
      }
      h['Ukupno'] = sumaProjekti[pk];
      excelNiz.push(h);
    }
  
    let z = {};
    for(let br = 0; br < Object.keys(projektiZeljeni[1]).length + 1; br++){
      let numberObject = (Number(Object.keys(projektiZeljeni[1]).length));
      if(numberObject == br){
        z['UkupnoSve'] = sum;
      }
      else{
        if(br == 0){
          z['Ukupno'+br+''] = 'Ukupno';
        }
        else{
          z['Ukupno'+br+''] = sumaKorisnici[br-1];
        }
      }
    }

    excelNiz.push(z);
    ukuponoCsv = excelHeader.concat(excelNiz)
    return ukuponoCsv;

    //excelNiz = this.PakovanjeProjekata.slice(0,this.PakovanjeProjekata.length);
    /*for(let ex in excelNiz){
      for(let i in excelNiz[ex]){
        if(excelNiz[ex][i] == null){
          excelNiz[ex][i] = '';
        }
      }
    }*/

  }

  ExcelExoprt(){

    let pripremaExp = [];
    pripremaExp = this.PripremaExporta(this.PakovanjeProjekata,this.SumaPoProjektu,this.SumaPoKorisniku,this.sumSvih);
    let prikazJson;
    this.adminservice.Sifra(pripremaExp)
      .subscribe(
        prikazJson => { prikazJson = prikazJson
        //console.log("prikazJson.data" , prikazJson.data)
        const blob = new Blob([new Uint8Array(prikazJson.data)])
        saveAs(blob, 'table.xlsx');
      },  
      error => {
    });
  }

  ExportCsv(){

    let pripremaExp = [];
    pripremaExp = this.PripremaExporta(this.PakovanjeProjekata,this.SumaPoProjektu,this.SumaPoKorisniku,this.sumSvih); 
    new Angular2Csv(pripremaExp, 'My Report');

    /*
      let Micko:any = [10,15]
      let wb: IWorkBook = write(Micko);

      const ws_name = 'SomeSheet';
      const wb: IWorkBook = { SheetNames: [], Sheets: {} };
      const ws: any = utils.json_to_sheet(this.table);
      wb.SheetNames.push(ws_name);
      wb.Sheets[ws_name] = ws;
    */

  }

  ExcelExoprtProjekat(){
    let pripremaExp = [];
    pripremaExp = this.PripremaExporta(this.pakovanjeDetalji,this.SumaPoNedeljamaDetalji,this.SumaPoKorisnikuProjekat,this.sumSvihProjekti);
    let prikazJson;
    this.adminservice.Sifra(pripremaExp)
      .subscribe(
        prikazJson => { prikazJson = prikazJson
        //console.log("prikazJson.data" , prikazJson.data)
        const blob = new Blob([new Uint8Array(prikazJson.data)])
        saveAs(blob, 'table.xlsx');
      },  
      error => {
    });
  }

  ExportCsvProjekat(){
    let pripremaExp = [];
    pripremaExp = this.PripremaExporta(this.pakovanjeDetalji,this.SumaPoNedeljamaDetalji,this.SumaPoKorisnikuProjekat,this.sumSvihProjekti);
    new Angular2Csv(pripremaExp, 'My Report');   
  }

  DropDodavanjeKorisnika(){
    this.flgDrop = false;
    this.flgDropNeaktivni = false;
    this.flgRemove = false;
    this.brojacKlik++;
    if(this.flgAdd == false){
      this.flgAdd = true;
    }else{
      this.flgAdd = false;
    }
  }

  prikaziDrop(){
    this.flgDropNeaktivni = false;
    this.flgAdd = false;
    this.flgRemove = false;
    this.brojacKlik++;
    if(this.flgDrop == false){
      this.flgDrop = true;
    }
    else{
      this.flgDrop = false;
    }
  }

  prikaziDropNeaktivni(){
    this.flgDrop = false;
    this.flgAdd = false;
    this.flgRemove = false;
    this.brojacKlik++;
    if(this.flgDropNeaktivni == false){
      this.flgDropNeaktivni = true;
    }
    else{
      this.flgDropNeaktivni = false;
    }
  }

  DropUklanjanjeKorisnika(){
    this.flgDrop = false;
    this.flgAdd = false;
    this.flgDropNeaktivni = false;
    this.brojacKlik++;
    if(this.flgRemove == false){
      this.flgRemove = true;
    }
    else{
      this.flgRemove = false;
    }
  }

  InputFunkcija(){
    this.brojacKlik++;
  }

  InputFunkcijaAktivni(){
    this.brojacKlik++;
  }

  InputFunkcijaDodavanjeProjekata(){
    this.brojacKlik++;
  }

  InputFunkcijaUklanjanjeProjekata(){
    this.brojacKlik++;
  }

  PretragaInput(){
    for(let pr in this.projektiObjekat){
      if(this.projektiObjekat[pr]['Projekti'].toLowerCase().indexOf(""+this.pretraga+"") > -1){
        this.nizNgForPrikaz[pr] = 0;
      }
      else{
        this.nizNgForPrikaz[pr] = 1;
      }
    }
  }

  PretragaInputNeaktivni(){
    for(let pr in this.projektiObjekatNeaktivni){
      if(this.projektiObjekatNeaktivni[pr]['Projekti'].toLowerCase().indexOf(""+this.pretragaAktivni+"") > -1){
        this.nizNgForPrikazNeaktivni[pr] = 0;
      }
      else{
        this.nizNgForPrikazNeaktivni[pr] = 1;
      }
    }
  }

  PretragaDodavanjeProjekta(){
    for(let pr in this.korisniciAktivni){
      if(this.korisniciAktivni[pr]['Ime_Prezime'].toLowerCase().indexOf(""+this.pretragaDodaj+"") > -1){
        this.nizNgForDodajProjekat[pr] = 0;
      }
      else{
        this.nizNgForDodajProjekat[pr] = 1;
      }
    }
  }

  PretragaUkloniProjekta(){
    console.log("Ulazii");
    for(let pr in this.korisniciAktivni){
      if(this.korisniciAktivni[pr]['Ime_Prezime'].toLowerCase().indexOf(""+this.pretragaUkloni+"") > -1){
        this.nizNgForUkloniProjekat[pr] = 0;
      }
      else{
        this.nizNgForUkloniProjekat[pr] = 1;
      }
    }
  }
  
  vrednostDrop(z:ListaProjekataModel){
    this.readonlyInput.Projekti = z.Projekti;
    this.readonlyInput.id_pr = z.id_pr;
  }

  vrednostDropNeaktivni(z:ListaProjekataModel){
    this.readonlyInputNeaktivni.Projekti = z.Projekti;
    this.readonlyInputNeaktivni.id_pr = z.id_pr;
  }

  vrednostDropDodavanjeKorisnika(korisnik:any){
    this.selectedDodavanjeKorisnikaNaProjekatKorisnik.Nadimak_Klijent = korisnik.Nadimak_Klijent;
    this.selectedDodavanjeKorisnikaNaProjekatKorisnik.Ime_Prezime = korisnik.Ime_Prezime;
    this.pretragaDodavanje = "";
    //this.pretragaDodaj = "";
    this.ProveraIzvrsi();
    this.ProverDropDown();
  }

  vrednostDropUklanjanjeKorisnika(korisnik:any){

    this.selectedUklanjanjeKorisnikaSaProjektaKorisnik.Ime_Prezime = korisnik.Ime_Prezime;
    this.selectedUklanjanjeKorisnikaSaProjektaKorisnik.Nadimak_Klijent = korisnik.Nadimak_Klijent;
    this.pretragU = "";
    //this.pretragaUkloni = "";
    this.ProveraUkloni();
    this.UklanjanjeDropDown();

  }

  over(z:any){
    //console.log("Over: " + z);
  }

  AktiviranjeProjekta(projekat = new ListaProjekataModel()){
    
    let odgovorUp:string;
    this.adminservice.AktivirajProjekat(projekat)
      .subscribe(
        odgovorUp => { odgovorUp = odgovorUp
          this.Erorr(odgovorUp);
          this.readonlyInput.Projekti = "";
          this.readonlyInput.id_pr = null;
          this.pretraga = "";

          this.NeaktivniProjekti();
          this.AktivniProjekti();
          this.godinaMesecProjekat();
          this.tabelaSviKorisniciSviProjekti();
          this.PonovnoUcitavanjeProjekataUkloni(this.selectedUklanjanjeKorisnikaSaProjektaKorisnik.Nadimak_Klijent);
          this.PonovoUcitavanjeProjekataDodaj(this.selectedDodavanjeKorisnikaNaProjekatKorisnik.Nadimak_Klijent); 
          console.log("Ukloni" , this.projektiUkloniOdabrani);//ovde
          console.log("Dodaj" , this.projektiOdabrani);//ovde
        }, 
        error => {
          console.log("error")
          localStorage.clear();
        },
        () => {console.log('done')
    });

  }

  DekativiranjeProjekata(projekat = new ListaProjekataModel()){

    //console.log("readonlyInputNeaktivni" , this.readonlyInputNeaktivni);
    for(let pr in this.projektiOdabrani){
      /*console.log("projektiOdabrani" , this.projektiOdabrani[pr]);
      console.log("readonlyInputNeaktivni" + this.readonlyInputNeaktivni.id_pr);*/
      if(this.projektiOdabrani[pr]['Projekti'] == this.readonlyInputNeaktivni.Projekti){
        this.projektiOdabrani.splice(Number(pr),1);
      }
    }
    for(let pr in this.projektiUkloniOdabrani){
      if(this.projektiUkloniOdabrani[pr]['Projekti'] == this.readonlyInputNeaktivni.Projekti){
        this.projektiUkloniOdabrani.splice(Number(pr),1);
      }
    }


    let odgovorUp:string;
    this.adminservice.DeaktivirajProjekat(projekat)
      .subscribe(
        odgovorUp => { odgovorUp = odgovorUp
          this.Erorr(odgovorUp);
          this.readonlyInputNeaktivni.Projekti = "";
          this.readonlyInputNeaktivni.id_pr = null;
          this.pretragaAktivni = "";

          this.NeaktivniProjekti();
          this.AktivniProjekti();
          this.godinaMesecProjekat();
          this.tabelaSviKorisniciSviProjekti();
          this.PonovnoUcitavanjeProjekataUkloni(this.selectedUklanjanjeKorisnikaSaProjektaKorisnik.Nadimak_Klijent);
          this.PonovoUcitavanjeProjekataDodaj(this.selectedDodavanjeKorisnikaNaProjekatKorisnik.Nadimak_Klijent); 
          console.log("Ukloni" , this.projektiUkloniOdabrani);//ovde
          console.log("Dodaj" , this.projektiOdabrani);//ovde
        }, 
        error => {
          console.log("error")
          localStorage.clear();
        },
        () => {console.log('done')
    });

  }

  Gotovo(){
    this.Citanje = "sacuvano";
  }

  @HostListener('document:click', ['$event'])
  public documentClick(event: Event,z:any): void {

    this.brojacKlik++;
    if(this.brojacKlik == 2){
      this.brojacKlik = 0;
    }
    else if(this.brojacKlik == 1){
      this.brojacKlik = 0;
      this.flgDrop = false;
      this.flgDropNeaktivni = false;
      this.flgAdd = false;
      this.flgRemove = false;
    }
  }

  NeaktivniProjekti(){

    this.adminservice.NeAktivniProjekti()
      .subscribe(
        projektiObjekat => { this.projektiObjekat = projektiObjekat
          for(let t in this.projektiObjekat){
            this.nizNgForPrikaz[t] = 0;
          }

        },  
        error => {
          console.log("error")
          localStorage.clear();
        },
        () => {console.log('done')
    });
  }

  AktivniProjekti(){
    this.adminservice.AktivniProjekti()
      .subscribe(
        projektiObjekatNeaktivni => { this.projektiObjekatNeaktivni = projektiObjekatNeaktivni
          //console.log(this.projektiObjekatNeaktivni)
          for(let t in this.projektiObjekatNeaktivni){
            this.nizNgForPrikazNeaktivni[t] = 0;
          }

        },  
        error => {
          console.log("error")
          localStorage.clear();
        },
        () => {console.log('done')
    });  
  }

  godinaMesecProjekat(){

    this.adminservice.Projekti()
      .subscribe(
        projektiAktivni => { this.projektiAktivni = projektiAktivni
          //ovde se popunjava dopwdpwn sa korisniciAktivni
          //console.log(this.projektiAktivni);
          this.popuniProjektiAdmin(this.projektiAktivni);

          },
          error => {
          console.log("error")
              localStorage.clear();
              this.text = 'Došlo je do greške na serveru!!'
              this.text_izlaz = 'Gotovo';
              this.showDialog();
          },
          () => {console.log('done')
    });


  }

  tabelaSviKorisniciSviProjekti(){

    for(let ar in this.nizObjKorisnik){//Brisanje Niza-objekata!!!
      var index = this.nizObjKorisnik.indexOf(this.nizObjKorisnik[ar]);
      this.nizObjKorisnik.splice(index, this.nizObjKorisnik.length);
    }
    for(let ar in this.PakovanjeProjekata){//Brisanje Niza-objekata!!!
      var index = this.PakovanjeProjekata.indexOf(this.PakovanjeProjekata[ar]);
      this.PakovanjeProjekata.splice(index, this.PakovanjeProjekata.length);
    }
    for(let ar in this.SumaPoKorisniku){//Brisanje Niza-objekata!!!
      var index = this.SumaPoKorisniku.indexOf(this.SumaPoKorisniku[ar]);      
      this.SumaPoKorisniku.splice(index, this.SumaPoKorisniku.length);
    }
    for(let ar in this.SumaPoProjektu){//Brisanje Niza-objekata!!!
      var index = this.SumaPoProjektu.indexOf(this.SumaPoProjektu[ar]);
      this.SumaPoProjektu.splice(index, this.SumaPoProjektu.length);
    }

    this.adminservice.SatnicaKorisniciSveNedeljeAdmin(this.KorisniciMesecAdmin,this.selectedGodinakorisniciAdmin)
      .subscribe(
        BazaPodaci => { this.BazaPodaci = BazaPodaci

          if(this.BazaPodaci != null){
            for(let ii in this.BazaPodaci){
              if(this.BazaPodaci[ii]['sum'] == 0){
                this.BazaPodaci[ii]['sum'] = null;
              } 
            }
          }    
          //console.log(this.BazaPodaci)  

          this.adminservice.ListaProjekataAdmin()
            .subscribe(
              projekti => { this.projekti = projekti
                
                var cuvaj = this.projekti;

                for(let pr in this.projekti){
                  this.NizProjekti[pr] = this.projekti[pr].Projekti
                }   

                this.adminservice.ListaKorisnikaAdmin()
                  .subscribe(

                    korisniciObject => { this.korisniciObject = korisniciObject
                                      
                      let cuvajObject = this.korisniciObject;                        
                      this.brojNedeljaZaDatimesecAdmin();
                      let brojacKor = 0;

                      for(let duzNed in this.pamti_nedelje_Admin){ 
                          //for(let brKor in this.korisniciObject){
                        for(let brKor = 0;brKor<this.korisniciObject.length + 1;brKor++){  
                          let objectKor = {};
                          brojacKor++;
                                
                          if(this.korisniciObject.length + 1 == brojacKor){
                            objectKor['ime'] = this.saberi + "." + 'Nedelja';
                            objectKor['oznaka'] = 'Nedelja' + "" + this.saberi;
                            brojacKor = 0;
                            objectKor['boja'] = 1;
                            this.boja = 'blue';
                          }
                          else if(brKor <= this.korisniciObject.length){
                            this.saberi = Number(duzNed) + 1;
                            objectKor['ime'] = this.korisniciObject[brKor].Ime_Prezime
                            objectKor['oznaka'] = this.korisniciObject[brKor].Ime_Prezime + "" + this.saberi;
                            objectKor['boja'] = 0;
                            this.boja = 'white';
                          }

                          this.nizObjKorisnik.push(objectKor);    
                        }   
                        //console.log(this.nizObjKorisnik);
                      }

                      for(let pr of this.NizProjekti){

                        let Kor = {};
                        Kor['Projekat'] = pr;
                        for(let korinik of this.nizObjKorisnik){
                          Kor[korinik.oznaka] = null;
                        }
                        this.PakovanjeProjekata.push(Kor);
                      }  
                      //console.log(this.PakovanjeProjekata)
                      for(let pp in this.PakovanjeProjekata){
                        for(let bp in this.BazaPodaci){
                          
                          if(this.PakovanjeProjekata[pp]['Projekat'] == this.BazaPodaci[bp]['Projekti']){

                            let pamtiNedeljuKor = 0;
                            let pamtiImePrezime;
                            let spojiImePrezimeNedelju;
                            pamtiNedeljuKor = this.BazaPodaci[bp]['nedelja'];
                            pamtiImePrezime = this.BazaPodaci[bp]['Ime_Prezime']
                            spojiImePrezimeNedelju = pamtiImePrezime + "" + pamtiNedeljuKor;
                            //this.PakovanjeProjekata[pp]['Projekat']
                            //console.log("spojiImePrezimeNedelju" + spojiImePrezimeNedelju);
                            this.PakovanjeProjekata[pp][spojiImePrezimeNedelju] = this.BazaPodaci[bp].sum;
                          }
                        }
                      }
                  
                      for(let pp in this.PakovanjeProjekata){
                          this.SumaPoProjektu[pp] = 0;  
                      }

                      for(let pp in this.PakovanjeProjekata){
                        //for(let i = 0; i < 2 ; i++){  
                        for(let duzNed in this.pamti_nedelje_Admin){
                            /*this.rezVertikalno = Number(duzNed) + 1;
                            this.SumaPoProjektu[pp] = this.PakovanjeProjekata[pp]['Nedelja' + this.rezVertikalno] + this.SumaPoProjektu[pp];  */
                          for(let kor of this.korisniciObject){
                            let cuvajKor;
                            this.rezHorizontalno = Number(duzNed) + 1;
                            
                            cuvajKor = kor.Ime_Prezime + "" + this.rezHorizontalno;
                            this.PakovanjeProjekata[pp]['Nedelja' + this.rezHorizontalno] = this.PakovanjeProjekata[pp][cuvajKor] + this.PakovanjeProjekata[pp]['Nedelja' + this.rezHorizontalno];
                          }
                        }
                      }
                    
                      for(let pp in this.PakovanjeProjekata){
                        for(let duzNed in this.pamti_nedelje_Admin){

                          this.rezVertikalno = Number(duzNed) + 1;
                          this.SumaPoProjektu[pp] = this.PakovanjeProjekata[pp]['Nedelja' + this.rezVertikalno] + this.SumaPoProjektu[pp];  
                        }
                      }

                      for(let kor in this.nizObjKorisnik){
                        this.SumaPoKorisniku[kor] = 0
                      }

                      for(let kor in this.nizObjKorisnik){
                        for(let pp in this.PakovanjeProjekata){

                          let cuvajOznaku;
                          cuvajOznaku = this.nizObjKorisnik[kor].oznaka
                          this.SumaPoKorisniku[kor] = this.PakovanjeProjekata[pp][cuvajOznaku] + this.SumaPoKorisniku[kor];
                        }
                      }

                      this.sumSvih = 0;
                      for(let sum in this.SumaPoProjektu){
                        this.sumSvih = Number(this.SumaPoProjektu[sum]) + this.sumSvih;
                      }

                      this.flgLoadingAdmin = true;
                      //SumaPoKorisniku
                      /*let pripremaExp = [];
                      pripremaExp = this.PripremaExporta()  
                      this.ExportCsv(pripremaExp);*/

                    },
                    error => { this.error = error
                      this.Erorr('Nije moguce očitati korisnike');     
                });
            },

            error => { this.error = error
              this.Erorr('Nije moguce očitati projekte');             
          });   
          },
          error => { this.error = error
            console.log("error");
            this.Erorr(this.error._body);           
    });

  }

  //Prvi tabela,svi projekti i svi korisnici
  MesecAdminF(){

    this.flgLoadingAdmin = false;
    this.brisanjeVrednostiSelecta();
    this.brojNedeljaZaDatimesecAdmin();

    if(JSON.parse(localStorage.getItem('Token')) == null){

            console.log("Izlogovani ste!!");
            this.router.navigate(['/login']);
            return;

    }
    else{
      this.tabelaSviKorisniciSviProjekti();
    }

    /*
      this.adminservice.SatnicaKorisniciAdmin(this.KorisniciMesecAdmin,this.KorisniciNedeljaAdmin)
          .subscribe(
                      ListaProjekataNiz => { this.ListaProjekataNiz = ListaProjekataNiz
                      
                      console.log("this.ListaProjekataNiz" + this.ListaProjekataNiz);

              this.adminservice.ListaProjekataAdmin()
                .subscribe(
                  projekti => { this.projekti = projekti
                    
                    var cuvaj = this.projekti;

                    for(let pr in this.projekti){

                      this.NizProjekti[pr] = this.projekti[pr].Projekti
                      //console.log("this.NizProjekti" + this.NizProjekti[pr])
                     
                    }

                    this.adminservice.ListaKorisnikaAdmin()
                      .subscribe(
                                  korisnici => { this.korisnici = korisnici
                                  
                                    var cuvaj1 = this.korisnici;
                                   
                                    for(let pr in this.korisnici){

                                      this.NizKorisnici[pr] = this.korisnici[pr].Ime_Prezime;
                                      //console.log("this.NizKorisnici" + this.NizKorisnici[pr])
                                    }

                                    let h = [];

                                      for (let pr of this.NizProjekti) {
                                        let z = {};
                                        z['Projekat'] = pr;
                                        for (let kor of this.NizKorisnici) {
                                          z[kor] = null;
                                        }
                                        this.NizObjekataKorPr.push(z);
                                        
                                      }
                                      //console.log(this.NizObjekataKorPr);

                                      for(let pr in this.NizObjekataKorPr){
                                        for(let kor in this.ListaProjekataNiz){
                                          
                                          if(this.NizObjekataKorPr[pr]['Projekat'] == this.ListaProjekataNiz[kor]['Projekti']){
 
                                              let korisnikIme;
                                              korisnikIme = this.ListaProjekataNiz[kor].Ime_Prezime;
                                              this.NizObjekataKorPr[pr][korisnikIme] = this.ListaProjekataNiz[kor].sum;

                                          }
                                        } 
                                      }
                                      for(let pr1 in this.NizObjekataKorPr){
                                        
                                        this.uvecajNesto++;
                                        this.SumaNizVertikalno[pr1] = 0;
                                    
                                      }
                                      for(let kor in this.NizKorisnici){
                                      
                                        this.SumaNizHorizontalno[kor] = 0;

                                      }

                                      for(let pr1 in this.NizObjekataKorPr){  
                                          for(let kor in this.NizKorisnici){

                                              let cuvajKorisnik;
                                              cuvajKorisnik = this.NizKorisnici[kor]

                                              if(this.NizObjekataKorPr[pr1][cuvajKorisnik] == null){
                                              
                                              }
                                              else{
                                                this.SumaNizVertikalno[pr1] = Number(this.NizObjekataKorPr[pr1][cuvajKorisnik]) + Number(this.SumaNizVertikalno[pr1]);
                                            
                                              }
                                          }
                                      }

                                      for(let kor in this.NizKorisnici){
                                      //for(var kor = 2;kor<3;kor++){  
                                        for(let pr2 in this.NizObjekataKorPr){

                                          let cuvajKorisnikVertikalno;
                                          cuvajKorisnikVertikalno = this.NizKorisnici[kor]

                                          if(this.NizObjekataKorPr[pr2][cuvajKorisnikVertikalno] == null){

                                            
                                          }
                                          else{
                                            this.SumaNizHorizontalno[kor] = Number(this.NizObjekataKorPr[pr2][cuvajKorisnikVertikalno]) + Number(this.SumaNizHorizontalno[kor]);
                                            
                                          }
                                        }
                                      }
                                                                      
                      },
                      error => {
                      
                  }); 
              },
              error => {
                        
              });
          },
          error => {
                     
      });
    */
  }

  KlikGodinaKorisnik(){//input godine -korisnici
    //console.log("selectedGodinakorisniciAdmin" + this.selectedGodinakorisniciAdmin)
    this.flgLoadingAdmin = false;
    console.log("Token"+JSON.parse(localStorage.getItem('Token')));

    if(JSON.parse(localStorage.getItem('Token')) == null){

            console.log("Izlogovani ste!!");
            this.router.navigate(['/login']);
            return;

    }
    else{
      this.renderer.listen(this.el.nativeElement, 'keydown', (event) => {
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

      this.tabelaSviKorisniciSviProjekti();
      

    } 
  }
  //
  //Druga tabela,goduna,mesec projekat!
  KlikGodinaProjekti(dropdown:SelectItemProjekti[],projekat:any){//input godine -projekti

    let OdabraniProjekat;

    for(let pr in dropdown){
      if(projekat == dropdown[pr].value){
        OdabraniProjekat = dropdown[pr].tabela
      }
    }

    this.flgLoadingAdminTabela2 = false;
    if(JSON.parse(localStorage.getItem('Token')) == null){

            console.log("Izlogovani ste!!");
            this.router.navigate(['/login']);
            return;

    }
    else{
      this.renderer.listen(this.el.nativeElement, 'keydown', (event) => {
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
      for(let ar in this.detaljiNizObjKorisnik){//Brisanje Niza-objekata!!!

                  var index = this.detaljiNizObjKorisnik.indexOf(this.detaljiNizObjKorisnik[ar]);
                  //console.log("NizObjectIndex" + index);
                  this.detaljiNizObjKorisnik.splice(index, this.detaljiNizObjKorisnik.length);

      }
      for(let ar in this.pakovanjeDetalji){//Brisanje Niza-objekata!!!

              var index = this.pakovanjeDetalji.indexOf(this.pakovanjeDetalji[ar]);
              //console.log("NizObjectIndex" + index);
              this.pakovanjeDetalji.splice(index, this.pakovanjeDetalji.length);

      }
      for(let ar in this.SumaPoKorisnikuProjekat){//Brisanje Niza-objekata!!!

              var index = this.SumaPoKorisnikuProjekat.indexOf(this.SumaPoKorisnikuProjekat[ar]);
              //console.log("NizObjectIndex" + index);
              this.SumaPoKorisnikuProjekat.splice(index, this.SumaPoKorisnikuProjekat.length);

      }
      for(let ar in this.SumaPoNedeljamaDetalji){//Brisanje Niza-objekata!!!

              var index = this.SumaPoNedeljamaDetalji.indexOf(this.SumaPoNedeljamaDetalji[ar]);
              //console.log("NizObjectIndex" + index);
              this.SumaPoNedeljamaDetalji.splice(index, this.SumaPoNedeljamaDetalji.length);

      }

      this.adminservice.projekatKorisnici(this.ProjektiMesecAdmin,this.selectedProjektiAktivni,this.selectedGodinaProjektiAdmin,OdabraniProjekat)
        .subscribe(
            projekatKorisnici => { this.projekatKorisnici = projekatKorisnici
                      
                      //Provera za gresku!!
                      //console.log(this.projekatKorisnici);
              let tabelaCuvaj;

              this.adminservice.TabelaJson(OdabraniProjekat)
                .subscribe(
                tabelaCuvaj => { tabelaCuvaj = tabelaCuvaj
                        
                console.log(tabelaCuvaj);

                this.adminservice.ListaKorisnikaAdmin()
                          .subscribe(

                            detaljiKorisniciObject => { this.detaljiKorisniciObject = detaljiKorisniciObject
                                              
                                let cuvajObject = this.detaljiKorisniciObject;                        
                                this.projektiBrojNedeljaMesecAdmin();
                                let brojacKor = 0;

                            for(let duzNed in this.projekatPamti_nedelje_Admin){ 
                              //for(let brKor in this.korisniciObject){
                                for(let brKor = 0;brKor<this.detaljiKorisniciObject.length + 1;brKor++){  
                                    let objectKor = {};
                                    brojacKor++;
                                    
                                    if(this.detaljiKorisniciObject.length + 1 == brojacKor){
                                      objectKor['ime'] = this.saberi + "." + 'Nedelja';
                                      objectKor['oznaka'] = 'Nedelja' + "" + this.saberi;
                                       objectKor['boja'] = 1;
                                      brojacKor = 0;
                                      this.boja = 'blue';

                                    }else if(brKor <= this.detaljiKorisniciObject.length){

                                      this.saberi = Number(duzNed) + 1;
                                      objectKor['ime'] = this.detaljiKorisniciObject[brKor].Ime_Prezime
                                      objectKor['oznaka'] = this.detaljiKorisniciObject[brKor].Ime_Prezime + "" + this.saberi;
                                      objectKor['boja'] = 0;
                                      this.boja = 'white';
                                    }

                                    this.detaljiNizObjKorisnik.push(objectKor);      
                              }
                            
                            }
                            // console.log(this.detaljiNizObjKorisnik);
                            for(let tb in tabelaCuvaj){
                              //console.log(tb);
                              let korA = {};
                              korA['Projekat'] = tabelaCuvaj[tb].ime;
                              for(let pr of this.detaljiNizObjKorisnik){
                                korA[pr.oznaka] = null;
                              }
                              this.pakovanjeDetalji.push(korA);
                            }
                            //console.log(this.pakovanjeDetalji);
                          
                            for(let i in this.neznamKakoDaNazovemObject){
                              //console.log(this.neznamKakoDaNazovemObject[i].x.ime);
                            }

                            for(let i in tabelaCuvaj){//ovde prolazi 5 puta
                            //for(let i = 0; i < 1 ; i++){
                              //console.log(i);
                              for(let nz in this.projekatKorisnici){
                                this.pakovanjeDetalji[i][this.projekatKorisnici[nz].Ime_Prezime + "" + this.projekatKorisnici[nz].nedelja] = this.projekatKorisnici[nz][tabelaCuvaj[i].baza];
                                if(this.pakovanjeDetalji[i][this.projekatKorisnici[nz].Ime_Prezime + "" + this.projekatKorisnici[nz].nedelja] == 0){
                                  this.pakovanjeDetalji[i][this.projekatKorisnici[nz].Ime_Prezime + "" + this.projekatKorisnici[nz].nedelja] = null;
                                }
                              }
                            }

                            //Sumiranje po nedeljama
                            for(let pd in this.pakovanjeDetalji){
                            //for(let pd = 0; pd < 1 ; pd++){  
                              for(let duzNed in this.projekatPamti_nedelje_Admin){
                                for(let kor in this.detaljiKorisniciObject){

                                    this.projekatRezDetalji = Number(duzNed) + 1;
                                    this.pakovanjeDetalji[pd]['Nedelja' + this.projekatRezDetalji] = Number(this.pakovanjeDetalji[pd][this.detaljiKorisniciObject[kor]['Ime_Prezime'] + "" + this.projekatRezDetalji]) +  this.pakovanjeDetalji[pd]['Nedelja' + this.projekatRezDetalji];
                                }
                              }
                            }
                            for(let pd in this.detaljiNizObjKorisnik){

                                this.SumaPoKorisnikuProjekat[pd] = 0;
                            }

                            //Sumiranje po korisniku  
                            for(let kor in this.detaljiNizObjKorisnik){         
                              //for(let kor = 0; kor < 3 ; kor++){
                                  for(let pk in this.pakovanjeDetalji){

                                  let cuvajIme;
                                  cuvajIme = this.detaljiNizObjKorisnik[kor].oznaka 
                                  this.SumaPoKorisnikuProjekat[kor] = this.pakovanjeDetalji[pk][cuvajIme] + this.SumaPoKorisnikuProjekat[kor]; 
                                  
                              }  
                            }

                            for(let pd in this.pakovanjeDetalji){

                              this.SumaPoNedeljamaDetalji[pd] = 0;

                            }

                            for(let pd in this.pakovanjeDetalji){
                              for(let duzNed in this.projekatPamti_nedelje_Admin){

                                this.projekatKorDetalji = Number(duzNed) + 1;
                                this.SumaPoNedeljamaDetalji[pd] = this.pakovanjeDetalji[pd]['Nedelja' + this.projekatKorDetalji] + this.SumaPoNedeljamaDetalji[pd];  
                              }
                            }

                            this.sumSvihProjekti = 0;
                            for(let sum in this.SumaPoNedeljamaDetalji){
                                this.sumSvihProjekti = Number(this.SumaPoNedeljamaDetalji[sum]) + this.sumSvihProjekti;
                            }

                            this.flgLoadingAdminTabela2 = true;

                  },
                  error => {
                  this.Erorr('Nije moguce očitati korisnike');           
                });

              },
              error => { this.error = error
              this.Erorr(this.error._body);    
            });       
          },
          error => { this.error = error
          this.Erorr(this.error._body);    
      });
    }
  }

  MesecAdminProjekti(dropdown:SelectItemProjekti[],projekat:any){

    let OdabraniProjekat

    for(let pr in dropdown){
      if(projekat == dropdown[pr].value){
        OdabraniProjekat = dropdown[pr].tabela
      }
    }

    this.flgLoadingAdminTabela2 = false;
    this.brisanjeVrednostiSelecta();
    this.projektiBrojNedeljaMesecAdmin();
    if(JSON.parse(localStorage.getItem('Token')) == null){

        console.log("Izlogovani ste!!");
        this.router.navigate(['/login']);
        return;

    }
    else{
      for(let ar in this.detaljiNizObjKorisnik){//Brisanje Niza-objekata!!!

              var index = this.detaljiNizObjKorisnik.indexOf(this.detaljiNizObjKorisnik[ar]);
              //console.log("NizObjectIndex" + index);
              this.detaljiNizObjKorisnik.splice(index, this.detaljiNizObjKorisnik.length);

      }
      for(let ar in this.pakovanjeDetalji){//Brisanje Niza-objekata!!!

              var index = this.pakovanjeDetalji.indexOf(this.pakovanjeDetalji[ar]);
              //console.log("NizObjectIndex" + index);
              this.pakovanjeDetalji.splice(index, this.pakovanjeDetalji.length);

      }
      for(let ar in this.SumaPoKorisnikuProjekat){//Brisanje Niza-objekata!!!

              var index = this.SumaPoKorisnikuProjekat.indexOf(this.SumaPoKorisnikuProjekat[ar]);
              //console.log("NizObjectIndex" + index);
              this.SumaPoKorisnikuProjekat.splice(index, this.SumaPoKorisnikuProjekat.length);

      }
      for(let ar in this.SumaPoNedeljamaDetalji){//Brisanje Niza-objekata!!!

              var index = this.SumaPoNedeljamaDetalji.indexOf(this.SumaPoNedeljamaDetalji[ar]);
              //console.log("NizObjectIndex" + index);
              this.SumaPoNedeljamaDetalji.splice(index, this.SumaPoNedeljamaDetalji.length);

      }

      this.adminservice.projekatKorisnici(this.ProjektiMesecAdmin,this.selectedProjektiAktivni,this.selectedGodinaProjektiAdmin,OdabraniProjekat)
        .subscribe(
            projekatKorisnici => { this.projekatKorisnici = projekatKorisnici
                      
              //Provera za gresku!!
              //console.log(this.projekatKorisnici);
              let tabelaCuvaj;

              this.adminservice.TabelaJson(OdabraniProjekat)
                .subscribe(
                tabelaCuvaj => { tabelaCuvaj = tabelaCuvaj

                this.adminservice.ListaKorisnikaAdmin()
                          .subscribe(

                            detaljiKorisniciObject => { this.detaljiKorisniciObject = detaljiKorisniciObject
                                              
                                let cuvajObject = this.detaljiKorisniciObject;                        
                                this.projektiBrojNedeljaMesecAdmin();
                                let brojacKor = 0;

                            for(let duzNed in this.projekatPamti_nedelje_Admin){ 
                              //for(let brKor in this.korisniciObject){
                                for(let brKor = 0;brKor<this.detaljiKorisniciObject.length + 1;brKor++){  
                                    let objectKor = {};
                                    brojacKor++;
                                    
                                    if(this.detaljiKorisniciObject.length + 1 == brojacKor){
                                      objectKor['ime'] = this.saberi + "." + 'Nedelja';
                                      objectKor['oznaka'] = 'Nedelja' + "" + this.saberi;
                                        objectKor['boja'] = 1;
                                      brojacKor = 0;
                                      this.boja = 'blue';

                                    }else if(brKor <= this.detaljiKorisniciObject.length){

                                      this.saberi = Number(duzNed) + 1;
                                      objectKor['ime'] = this.detaljiKorisniciObject[brKor].Ime_Prezime
                                      objectKor['oznaka'] = this.detaljiKorisniciObject[brKor].Ime_Prezime + "" + this.saberi;
                                      objectKor['boja'] = 0;
                                      this.boja = 'white';
                                    }

                                    this.detaljiNizObjKorisnik.push(objectKor);      
                              }
                            
                            }
                            // console.log(this.detaljiNizObjKorisnik);
                            for(let tb in tabelaCuvaj){
                              //console.log(tb);
                              let korA = {};
                              korA['Projekat'] = tabelaCuvaj[tb].ime;
                              for(let pr of this.detaljiNizObjKorisnik){
                                korA[pr.oznaka] = null;
                              }
                              this.pakovanjeDetalji.push(korA);
                            }
                            //console.log(this.pakovanjeDetalji);

                          
                            for(let i in this.neznamKakoDaNazovemObject){
                              //console.log(this.neznamKakoDaNazovemObject[i].x.ime);
                            }

                            for(let i in tabelaCuvaj){//ovde prolazi 5 puta
                            //for(let i = 0; i < 1 ; i++){
                              //console.log(i);
                              for(let nz in this.projekatKorisnici){
                                this.pakovanjeDetalji[i][this.projekatKorisnici[nz].Ime_Prezime + "" + this.projekatKorisnici[nz].nedelja] = this.projekatKorisnici[nz][tabelaCuvaj[i].baza];
                                if(this.pakovanjeDetalji[i][this.projekatKorisnici[nz].Ime_Prezime + "" + this.projekatKorisnici[nz].nedelja] == 0){
                                  this.pakovanjeDetalji[i][this.projekatKorisnici[nz].Ime_Prezime + "" + this.projekatKorisnici[nz].nedelja] = null;
                                }
                              }
                            }

                            //Sumiranje po nedeljama
                            for(let pd in this.pakovanjeDetalji){
                            //for(let pd = 0; pd < 1 ; pd++){  
                              for(let duzNed in this.projekatPamti_nedelje_Admin){
                                for(let kor in this.detaljiKorisniciObject){

                                    this.projekatRezDetalji = Number(duzNed) + 1;
                                    this.pakovanjeDetalji[pd]['Nedelja' + this.projekatRezDetalji] = Number(this.pakovanjeDetalji[pd][this.detaljiKorisniciObject[kor]['Ime_Prezime'] + "" + this.projekatRezDetalji]) +  this.pakovanjeDetalji[pd]['Nedelja' + this.projekatRezDetalji];
                                }
                              }
                            }
                            for(let pd in this.detaljiNizObjKorisnik){

                                this.SumaPoKorisnikuProjekat[pd] = 0;
                            }

                            //Sumiranje po korisniku  
                            for(let kor in this.detaljiNizObjKorisnik){         
                              //for(let kor = 0; kor < 3 ; kor++){
                                  for(let pk in this.pakovanjeDetalji){

                                  let cuvajIme;
                                  cuvajIme = this.detaljiNizObjKorisnik[kor].oznaka 
                                  this.SumaPoKorisnikuProjekat[kor] = this.pakovanjeDetalji[pk][cuvajIme] + this.SumaPoKorisnikuProjekat[kor]; 
                                  
                              }  
                            }

                            for(let pd in this.pakovanjeDetalji){

                              this.SumaPoNedeljamaDetalji[pd] = 0;

                            }

                            for(let pd in this.pakovanjeDetalji){
                              for(let duzNed in this.projekatPamti_nedelje_Admin){

                                this.projekatKorDetalji = Number(duzNed) + 1;
                                this.SumaPoNedeljamaDetalji[pd] = this.pakovanjeDetalji[pd]['Nedelja' + this.projekatKorDetalji] + this.SumaPoNedeljamaDetalji[pd];  
                              }
                            }

                            this.sumSvihProjekti = 0;
                            for(let sum in this.SumaPoNedeljamaDetalji){
                                this.sumSvihProjekti = Number(this.SumaPoNedeljamaDetalji[sum]) + this.sumSvihProjekti;
                            }

                            this.flgLoadingAdminTabela2 = true;

                  },
                  error => {
                  this.Erorr('Nije moguce očitati korisnike');           
                });

              },
              error => { this.error = error
              this.Erorr(this.error._body);    
            });       
          },
          error => { this.error = error
          this.Erorr(this.error._body);    
      });  
    }
  }

  KlikProjektiAdmin(godina:any,mesec:string,projekat:string,dropdown:SelectItemProjekti[]){

    let OdabraniProjekat

    for(let pr in dropdown){
      if(projekat == dropdown[pr].value){
        OdabraniProjekat = dropdown[pr].tabela
      }
    }

    this.flgLoadingAdminTabela2 = false;
    if(JSON.parse(localStorage.getItem('Token')) == null){

            console.log("Izlogovani ste!!");
            this.router.navigate(['/login']);
            return;

    }
    else{
      for(let ar in this.detaljiNizObjKorisnik){//Brisanje Niza-objekata!!!
        var index = this.detaljiNizObjKorisnik.indexOf(this.detaljiNizObjKorisnik[ar]);
        this.detaljiNizObjKorisnik.splice(index, this.detaljiNizObjKorisnik.length);
      }
      for(let ar in this.pakovanjeDetalji){//Brisanje Niza-objekata!!!
        var index = this.pakovanjeDetalji.indexOf(this.pakovanjeDetalji[ar]);
        this.pakovanjeDetalji.splice(index, this.pakovanjeDetalji.length);
      }
      for(let ar in this.SumaPoKorisnikuProjekat){//Brisanje Niza-objekata!!!
        var index = this.SumaPoKorisnikuProjekat.indexOf(this.SumaPoKorisnikuProjekat[ar]);
        this.SumaPoKorisnikuProjekat.splice(index, this.SumaPoKorisnikuProjekat.length);
      }
      for(let ar in this.SumaPoNedeljamaDetalji){//Brisanje Niza-objekata!!!
        var index = this.SumaPoNedeljamaDetalji.indexOf(this.SumaPoNedeljamaDetalji[ar]);
        this.SumaPoNedeljamaDetalji.splice(index, this.SumaPoNedeljamaDetalji.length);
      }

          //this.adminservice.projekatKorisnici(this.ProjektiMesecAdmin,this.selectedProjektiAktivni,this.selectedGodinaProjektiAdmin)

      this.adminservice.projekatKorisnici(this.ProjektiMesecAdmin,this.selectedProjektiAktivni,this.selectedGodinaProjektiAdmin,OdabraniProjekat)
        .subscribe(
            projekatKorisnici => { this.projekatKorisnici = projekatKorisnici
                      
              //Provera za gresku!!
              //console.log(this.projekatKorisnici);
              let tabelaCuvaj;

              this.adminservice.TabelaJson(OdabraniProjekat)
                .subscribe(
                  tabelaCuvaj => { tabelaCuvaj = tabelaCuvaj

                  this.adminservice.ListaKorisnikaAdmin()
                    .subscribe(
                        detaljiKorisniciObject => { this.detaljiKorisniciObject = detaljiKorisniciObject
                                          
                            let cuvajObject = this.detaljiKorisniciObject;                        
                            this.projektiBrojNedeljaMesecAdmin();
                            let brojacKor = 0;

                        for(let duzNed in this.projekatPamti_nedelje_Admin){ 
                          //for(let brKor in this.korisniciObject){
                            for(let brKor = 0;brKor<this.detaljiKorisniciObject.length + 1;brKor++){  
                                let objectKor = {};
                                brojacKor++;
                                
                                if(this.detaljiKorisniciObject.length + 1 == brojacKor){
                                  objectKor['ime'] = this.saberi + "." + 'Nedelja';
                                  objectKor['oznaka'] = 'Nedelja' + "" + this.saberi;
                                    objectKor['boja'] = 1;
                                  brojacKor = 0;
                                  this.boja = 'blue';

                                }else if(brKor <= this.detaljiKorisniciObject.length){

                                  this.saberi = Number(duzNed) + 1;
                                  objectKor['ime'] = this.detaljiKorisniciObject[brKor].Ime_Prezime
                                  objectKor['oznaka'] = this.detaljiKorisniciObject[brKor].Ime_Prezime + "" + this.saberi;
                                  objectKor['boja'] = 0;
                                  this.boja = 'white';
                                }

                                this.detaljiNizObjKorisnik.push(objectKor);      
                          }
                        
                        }
                        // console.log(this.detaljiNizObjKorisnik);
                        for(let tb in tabelaCuvaj){
                          //console.log(tb);
                          let korA = {};
                          korA['Projekat'] = tabelaCuvaj[tb].ime;
                          for(let pr of this.detaljiNizObjKorisnik){
                            korA[pr.oznaka] = null;
                          }
                          this.pakovanjeDetalji.push(korA);
                        }
                        //console.log(this.pakovanjeDetalji);

                      
                        for(let i in this.neznamKakoDaNazovemObject){
                          //console.log(this.neznamKakoDaNazovemObject[i].x.ime);
                        }

                        for(let i in tabelaCuvaj){//ovde prolazi 5 puta
                        //for(let i = 0; i < 1 ; i++){
                          //console.log(i);
                          for(let nz in this.projekatKorisnici){
                            this.pakovanjeDetalji[i][this.projekatKorisnici[nz].Ime_Prezime + "" + this.projekatKorisnici[nz].nedelja] = this.projekatKorisnici[nz][tabelaCuvaj[i].baza];
                            if(this.pakovanjeDetalji[i][this.projekatKorisnici[nz].Ime_Prezime + "" + this.projekatKorisnici[nz].nedelja] == 0){
                              this.pakovanjeDetalji[i][this.projekatKorisnici[nz].Ime_Prezime + "" + this.projekatKorisnici[nz].nedelja] = null;
                            }
                          }
                        }

                        //Sumiranje po nedeljama
                        for(let pd in this.pakovanjeDetalji){
                        //for(let pd = 0; pd < 1 ; pd++){  
                          for(let duzNed in this.projekatPamti_nedelje_Admin){
                            for(let kor in this.detaljiKorisniciObject){

                                this.projekatRezDetalji = Number(duzNed) + 1;
                                this.pakovanjeDetalji[pd]['Nedelja' + this.projekatRezDetalji] = Number(this.pakovanjeDetalji[pd][this.detaljiKorisniciObject[kor]['Ime_Prezime'] + "" + this.projekatRezDetalji]) +  this.pakovanjeDetalji[pd]['Nedelja' + this.projekatRezDetalji];
                            }
                          }
                        }
                        for(let pd in this.detaljiNizObjKorisnik){

                            this.SumaPoKorisnikuProjekat[pd] = 0;
                        }

                        //Sumiranje po korisniku  
                        for(let kor in this.detaljiNizObjKorisnik){         
                          //for(let kor = 0; kor < 3 ; kor++){
                              for(let pk in this.pakovanjeDetalji){

                              let cuvajIme;
                              cuvajIme = this.detaljiNizObjKorisnik[kor].oznaka 
                              this.SumaPoKorisnikuProjekat[kor] = this.pakovanjeDetalji[pk][cuvajIme] + this.SumaPoKorisnikuProjekat[kor]; 
                              
                          }  
                        }

                        for(let pd in this.pakovanjeDetalji){

                          this.SumaPoNedeljamaDetalji[pd] = 0;

                        }

                        for(let pd in this.pakovanjeDetalji){
                          for(let duzNed in this.projekatPamti_nedelje_Admin){

                            this.projekatKorDetalji = Number(duzNed) + 1;
                            this.SumaPoNedeljamaDetalji[pd] = this.pakovanjeDetalji[pd]['Nedelja' + this.projekatKorDetalji] + this.SumaPoNedeljamaDetalji[pd];  
                          }
                        }

                        this.sumSvihProjekti = 0;
                        for(let sum in this.SumaPoNedeljamaDetalji){
                            this.sumSvihProjekti = Number(this.SumaPoNedeljamaDetalji[sum]) + this.sumSvihProjekti;
                        }

                        this.flgLoadingAdminTabela2 = true;

                  },
                  error => {
                  this.Erorr('Nije moguce očitati korisnike');           
                });

              },
              error => { this.error = error
              this.Erorr(this.error._body);    
            });       
          },
          error => { this.error = error
          this.Erorr(this.error._body);    
      });   
       
    }
  }
  //
  //Koristimo za dobijanje broja nedelja
  brisanjeVrednostiSelecta(){
     //this.lista_broja_nedelja = 0
     for(var i = 0; this.lista_broja_nedelja_ngModel >= i ; i++){
        this.pamti_nedelje_Admin.splice(this.pamti_nedelje_Admin.indexOf(i), 1);
     }
     
     for(var i = 0; this.projekatLista_broja_nedelja_ngModel >= i ; i++){
        this.projekatPamti_nedelje_Admin.splice(this.projekatPamti_nedelje_Admin.indexOf(i), 1);
     }
     
  }

  brojNedeljaZaDatimesecAdmin(){

      this.odaberi_mesec = this.KorisniciMesecAdmin;
      this.odaberi_godina = this.selectedGodinakorisniciAdmin;

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

      this.pamti_nedelje_Admin = this.broj_nedelja( this.izabrani_mesec,this.odaberi_godina)
      
      var brojac = 0
      for(var index = this.pamti_nedelje_Admin[0]; index<=this.pamti_nedelje_Admin[1]; index++){

          this.lista_broja_nedelja_ngModel = index;
         
			}
      for(var i = 1; this.lista_broja_nedelja_ngModel >= i ; i++){

           this.pamti_nedelje_Admin[i-1] = i
         
      }

  }

  projektiBrojNedeljaMesecAdmin(){

      this.odaberi_mesec = this.ProjektiMesecAdmin;
      this.odaberi_godina = this.selectedGodinaProjektiAdmin;

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

      this.projekatPamti_nedelje_Admin = this.broj_nedelja( this.izabrani_mesec,this.odaberi_godina)
      
      var brojac = 0
      for(var index = this.projekatPamti_nedelje_Admin[0]; index<=this.projekatPamti_nedelje_Admin[1]; index++){

          this.projekatLista_broja_nedelja_ngModel = index;
         
			}
      for(var i = 1; this.projekatLista_broja_nedelja_ngModel >= i ; i++){

           this.projekatPamti_nedelje_Admin[i-1] = i
         
      }

      

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

  //Parsiranje tokena da bi se proverilo da li odredjeni korisnik ima prava na ovu stranicu!!
  ParsirajJWT (token) {

		this.base64Url = token.split('.')[1];
    this.base64 = this.base64Url.replace('-', '+').replace('_', '/');
		this.ispisToken = JSON.parse(window.atob(this.base64));
    
		return this.ispisToken.admin;

	}

  //Funkcija za popunjavanje dropdown-a  sa aktivnim korisnicima!!
  imePrezimeAktivniFunkcija(){

    if(JSON.parse(localStorage.getItem('Token')) == null){

        console.log("Izlogovani ste!!");
        this.router.navigate(['/login']);
        return;

    }
    else{
      this.adminservice.imePrezimeAktivni()
        .subscribe(
          korisniciAktivni => { this.korisniciAktivni = korisniciAktivni
            //ovde se popunjava dopwdpwn sa korisniciAktivni
            for(let t in this.korisniciAktivni){
              this.nizNgForDodajProjekat[t] = 0;
              this.nizNgForUkloniProjekat[t] = 0;
            }
            this.popuniKorisniciAktivniAdmin(this.korisniciAktivni);
          },
          error => {
            console.log("error")
            this.Erorr('Nije moguce očitati korisnike!!');        
      });
    }    
  }

  subcribeToFormChanges() {
        //console.log("Micko")
        const myFormStatusChanges$ = this.myForm.statusChanges;
        const myFormValueChanges$ = this.myForm.valueChanges;
        //console.log("myFormStatusChanges$" +  myFormStatusChanges$)
        //console.log("myFormValueChanges$" +  myFormValueChanges$)
        
        myFormStatusChanges$.subscribe(x => this.events.push({ 
          event: 'STATUS_CHANGED', object: x,
          //nesto: console.log("sdas" + x) 
        }));
        myFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x, /*nesto: console.log("sdas" + x)*/ }));
  }

  save(model: any, isValid: boolean) {

    if(JSON.parse(localStorage.getItem('Token')) == null){
      console.log("Izlogovani ste!!");
      this.router.navigate(['/login']);
      return;
    } 
    else{  
      this.submitted = true;
      if(isValid){

        this.adminservice.DodavanjeNovogProjekta(model.name)
          .subscribe(
            odgovorInsert => { this.odgovorInsert = odgovorInsert
              this.filter = "";
              //this.subcribeToFormChanges();
              //this.KlikProjektiAdmin();
              this.adminservice.Projekti()
                .subscribe(
                    projektiAktivni => { this.projektiAktivni = projektiAktivni
                      //ovde se popunjava dopwdpwn sa korisniciAktivni
                      this.popuniProjektiAdmin(this.projektiAktivni);
                      this.Erorr('Uspešno ste dodali novi projekat.');

                    },
                    error => {
                      console.log("error")
                      localStorage.clear();
                      this.text = 'Došlo je do greške na serveru!!'
                      this.text_izlaz = 'Gotovo';
                      this.showDialog();
              });

              this.MesecAdminF();
              this.godinaMesecProjekat();
              //this.NeaktivniProjekti();
              this.AktivniProjekti();
              //this.MesecAdminProjekti();

          },
          error => {
            console.log("error")
            this.Erorr('Nije moguce upisati novi projekat');
        });         
      }
      else{

        console.log("Ne moze");

      }
    }
  }

  ProverDropDownProjekti(){

    if(JSON.parse(localStorage.getItem('Token')) == null){
      console.log("Izlogovani ste!!");
      this.router.navigate(['/login']);
      return;
    }
    else{ 

      if(this.selectedDodavanjeKorisnikaNaProjekatKorisnik.Ime_Prezime == '' || this.selectedDodavanjeKorisnikaNaProjekatProjekat == '' || this.selectedDodavanjeKorisnikaNaProjekatKorisnik == undefined || this.selectedDodavanjeKorisnikaNaProjekatProjekat == undefined)
      {
        this.dodajProvera = false;
      }
      else{
        this.dodajProvera = true;
      }
      //this.ZastitaDodavanjeKorisnikaNaProjekat();
    }  
  }

  //***Dodavanje Korisnika na projekata!!!
  //Dodavanje korisnika na projekat
  PonovoUcitavanjeProjekataDodaj(korisnik:any){

    this.adminservice.PopunjavanjeDropDownDodavanjeNaProjekat(this.selectedDodavanjeKorisnikaNaProjekatKorisnik.Nadimak_Klijent)
        .subscribe(
          projektiNaKojimaNeRadi => { this.projektiNaKojimaNeRadi = projektiNaKojimaNeRadi
            //ovde se popunjava dopwdpwn sa korisniciAktivni
            if(this.flgKorisnik == false){
              let niz = [];
              this.vidljivostProjekta = niz;
            }
            else{
              let niz = [];
              for(let pr in this.projektiNaKojimaNeRadi){
                let u = {};
                u['Projekti'] = this.projektiNaKojimaNeRadi[pr]['Projekti']
                u['vidljivo'] = true
                u['trazi'] = 1;
                niz.push(u);
              }
              this.vidljivostProjekta = niz;
            }
            for(let pr in this.vidljivostProjekta){
              for(let od in this.projektiOdabrani){
                if(this.vidljivostProjekta[pr]['Projekti'] == this.projektiOdabrani[od]['Projekti']){
                  this.vidljivostProjekta[pr]['vidljivo'] = false;
                }
              }
            }
            this.PretragaDodavanjeKorisnika();
           
          },
        error => {
          console.log("error");
          this.Erorr('Za datog korisnika nije moguce ocitati projekte!!');         
      });
  }

  ProverDropDown(){

    if(JSON.parse(localStorage.getItem('Token')) == null){
      this.router.navigate(['/login']);
      return;
    } 
    else{
      if(this.selectedDodavanjeKorisnikaNaProjekatKorisnik.Ime_Prezime == '' || this.selectedDodavanjeKorisnikaNaProjekatProjekat == '' || this.selectedDodavanjeKorisnikaNaProjekatKorisnik == undefined || this.selectedDodavanjeKorisnikaNaProjekatProjekat == undefined)
      { 
        this.dodajProvera = false;
      }
      else{
        this.dodajProvera = true;
        this.flgKorisnik = false;
      }
      //Kada se odabere Korisnik on popuni dropdown sa odgovarajucim projektima
      if(this.selectedDodavanjeKorisnikaNaProjekatKorisnik.Ime_Prezime == ''  || this.selectedDodavanjeKorisnikaNaProjekatKorisnik == undefined){
        this.flgKorisnik = false;
      }
      else{
        this.flgKorisnik = true;  
      }
      this.adminservice.PopunjavanjeDropDownDodavanjeNaProjekat(this.selectedDodavanjeKorisnikaNaProjekatKorisnik.Nadimak_Klijent)
        .subscribe(
          projektiNaKojimaNeRadi => { this.projektiNaKojimaNeRadi = projektiNaKojimaNeRadi
            //ovde se popunjava dopwdpwn sa korisniciAktivni
            for(let ar in this.projektiOdabrani){//Brisanje Niza-objekata!!!
              let index = this.projektiOdabrani.indexOf(this.projektiOdabrani[ar]);
              this.projektiOdabrani.splice(index, this.projektiOdabrani.length);
            }
            if(this.flgKorisnik == false){
              let niz = [];
              this.vidljivostProjekta = niz;
            }
            else{
              let niz = [];
              for(let pr in this.projektiNaKojimaNeRadi){
                let u = {};
                u['Projekti'] = this.projektiNaKojimaNeRadi[pr]['Projekti']
                u['vidljivo'] = true
                u['trazi'] = 1;
                niz.push(u);
              }
              this.vidljivostProjekta = niz;
            }
          },
        error => {
          console.log("error");
          this.Erorr('Za datog korisnika nije moguce ocitati projekte!!');         
      });
    }  
  }

  OdaberiProjekat(ime:any){

    let z = {}
    z['Projekti'] = ime
    z['trazi'] = 1;
    this.projektiOdabrani.push(z);
    for(let pr in this.vidljivostProjekta){
      if(this.vidljivostProjekta[pr]['Projekti'] == ime){
        this.vidljivostProjekta[pr]['vidljivo'] = false;
      }
    }
    this.ProveraIzvrsi();
  }

  BrisanjeIzObjekta(ime:any){

    for(let pr in this.projektiOdabrani){
      if(this.projektiOdabrani[pr]['Projekti'] == ime){
        let poslednji = Number(pr) + 1
        this.projektiOdabrani.splice(Number(pr),1);
      }
    }
    for(let pr in this.vidljivostProjekta){
      if(this.vidljivostProjekta[pr]['Projekti'] == ime){
        this.vidljivostProjekta[pr]['vidljivo'] = true;
        this.vidljivostProjekta[pr]['trazi'] = 1;
      }
    }
    this.ProveraIzvrsi();
  }

  PretragaDodavanjeKorisnika(){

    for(let pr in this.vidljivostProjekta){
      if(this.vidljivostProjekta[pr]['Projekti'].toLowerCase().indexOf(""+this.pretragaDodavanje+"") > -1){
        this.vidljivostProjekta[pr]['trazi'] = 1;
      }
      else{
        this.vidljivostProjekta[pr]['trazi'] = 0;
      }
    }
  }

  PretragaDodavanjeOdabranoKorisnika(){
    for(let pr in this.projektiOdabrani){
      if(this.projektiOdabrani[pr]['Projekti'].toLowerCase().indexOf(""+this.pretragaDodavanjeOdabrano+"") > -1){
        this.projektiOdabrani[pr]['trazi'] = 1;
      }
      else{
        this.projektiOdabrani[pr]['trazi'] = 0;
      }
    }
  }

  PreostaliProjekti(){
    for(let ar in this.projektiOdabrani){//Brisanje Niza-objekata!!!
      let index = this.projektiOdabrani.indexOf(this.projektiOdabrani[ar]);
      this.projektiOdabrani.splice(index, this.projektiOdabrani.length);
    }

    for(let pr in this.vidljivostProjekta){
      let z = {}
      z['Projekti'] = this.vidljivostProjekta[pr]['Projekti']
      z['trazi'] = 1;
      this.projektiOdabrani.push(z);
      this.vidljivostProjekta[pr]['trazi'] = 0;
    }
    this.pretragaDodavanje = "";
    this.pretragaDodavanjeOdabrano = "";
    this.ProveraIzvrsi();
  }

  UkloniPr(){

    for(let ar in this.projektiOdabrani){//Brisanje Niza-objekata!!!
      let index = this.projektiOdabrani.indexOf(this.projektiOdabrani[ar]);
      this.projektiOdabrani.splice(index, this.projektiOdabrani.length);
    }
    for(let pr in this.vidljivostProjekta){
      this.vidljivostProjekta[pr]['trazi'] = 1;
      this.vidljivostProjekta[pr]['vidljivo'] = true;
    }
    this.ProveraIzvrsi();
    console.log("this.projektiOdabrani" , this.projektiOdabrani);
  }

  //***Dodavanje Korisnika na projekata!!!
  //Popunjavanje dropdown-a 
  ProbaDropDownFunkcija(){

    if(JSON.parse(localStorage.getItem('Token')) == null){
      console.log("Izlogovani ste!!");
      this.router.navigate(['/login']);
      return;
    } 
    else{
      this.adminservice.PopunjavanjeDropDownDodavanjeNaProjekat(this.selectedDodavanjeKorisnikaNaProjekatKorisnik)
        .subscribe(
          projektiNaKojimaNeRadi => { this.projektiNaKojimaNeRadi = projektiNaKojimaNeRadi
            //ovde se popunjava dopwdpwn sa korisniciAktivni
            this.popuniProjektiAdminDodavanjeNaProjekat(this.projektiNaKojimaNeRadi)

          },
          error => {
            console.log("error");
            this.Erorr('Za datog korisnika nije moguce ocitati projekte!!');         
      });
    } 

  }
  // ***Dodavanje Korisnika na projekata!!!
  //Snimanje Ili dodavanje projekta za datog korisnika
  Dodaj(){

    this.Citanje = 'snimanje';
    if(JSON.parse(localStorage.getItem('Token')) == null){
      console.log("Izlogovani ste!!");
      this.router.navigate(['/login']);
      return;
    }
    else{     
      if(this.selectedDodavanjeKorisnikaNaProjekatKorisnik.Ime_Prezime == '' || this.selectedDodavanjeKorisnikaNaProjekatKorisnik == undefined
        || (this.selectedDodavanjeKorisnikaNaProjekatKorisnik == undefined && this.projektiOdabrani.length == 0)){
        this.dodajProvera = false;
        return;
      }
      else{
        this.dodajProvera = true;
        this.adminservice.DodavanjeKorisnikaNaProjekat(this.selectedDodavanjeKorisnikaNaProjekatKorisnik.Nadimak_Klijent, this.projektiOdabrani , this.trenutnaGodinaDodavanje)
          .subscribe(
            insert => { this.insert = insert

              //Poziva se funkcija koja refresuje tabelu Projekti kada se doda projekat za odradjenog korisnika!!
              this.KlikProjektiAdmin(this.selectedGodinaProjektiAdmin,this.ProjektiMesecAdmin,this.selectedProjektiAktivni,this.projektiDropDown);
              this.validDodaj = 'jeste';
              this.Citanje = 'gotovo';
              for(let ar in this.projektiOdabrani){//Brisanje Niza-objekata!!!
                let index = this.projektiOdabrani.indexOf(this.projektiOdabrani[ar]);
                this.projektiOdabrani.splice(index, this.projektiOdabrani.length);
              }  
              this.ProveraIzvrsi();
              this.PonovnoUcitavanjeProjekataUkloni(this.selectedUklanjanjeKorisnikaSaProjektaKorisnik.Nadimak_Klijent);
              //Ponovno popunjavanje dropdown jer je projekat dodat za korisnika i potrebo je osveziti dropdown
              //this.ProbaDropDownFunkcija();
              //Da bi se dropdown sa projektima na kojima korisnik radi dopunio sa dodatim projektom!!
              //this.UklanjanjeDropDownFunkcija();
              },
            error => {
              console.log("error");
              this.Erorr("Neuspešno ste dodali korisnika na projekat!!");
        });
      }
    }
  }

  ProveraIzvrsi(){
    if(this.selectedDodavanjeKorisnikaNaProjekatKorisnik.Ime_Prezime == '' || this.projektiOdabrani.length == 0
      || (this.selectedDodavanjeKorisnikaNaProjekatKorisnik == undefined && this.projektiOdabrani.length == 0)){
        this.izvrsiDisable = true;
    }
    else{
      this.izvrsiDisable = false;
    }
  }

  //***Uklanjanje korisnika sa projekta
  //Uklanjanje korisnika sa projekta
  PretragaUkloniKorisnika(){
    for(let pr in this.naKojimaRadeHtml){
      if(this.naKojimaRadeHtml[pr]['Projekti'].toLowerCase().indexOf(""+this.pretragU+"") > -1){
        this.naKojimaRadeHtml[pr]['trazi'] = 1;
      }
      else{
        this.naKojimaRadeHtml[pr]['trazi'] = 0;
      }
    }
  }

  PretragaUklanjanjeOdabranoKorisnika(){
     for(let pr in this.projektiUkloniOdabrani){
      if(this.projektiUkloniOdabrani[pr]['Projekti'].toLowerCase().indexOf(""+this.pretragaUklanjanjeOdabrano+"") > -1){
        this.projektiUkloniOdabrani[pr]['trazi'] = 1;
      }
      else{
        this.projektiUkloniOdabrani[pr]['trazi'] = 0;
      }
    }
  }

  BrisanjeIzObjektaUkloni(ime:any){

    for(let pr in this.projektiUkloniOdabrani){
      if(this.projektiUkloniOdabrani[pr]['Projekti'] == ime){
        let poslednji = Number(pr) + 1
        this.projektiUkloniOdabrani.splice(Number(pr),1);
      }
    }
    for(let pr in this.naKojimaRadeHtml){
      if(this.naKojimaRadeHtml[pr]['Projekti'] == ime){
        this.naKojimaRadeHtml[pr]['vidljivo'] = true;
        this.naKojimaRadeHtml[pr]['trazi'] = 1;
      }
    }
    this.ProveraUkloni();
  }

  OdaberiZaUkloni(ime:any,id:number){

    let z = {}
    z['Projekti'] = ime
    z['id'] = id
    z['trazi'] = 1;
    this.projektiUkloniOdabrani.push(z);
    for(let pr in this.naKojimaRadeHtml){
      if(this.naKojimaRadeHtml[pr]['Projekti'] == ime){
        this.naKojimaRadeHtml[pr]['vidljivo'] = false;
      }
    }
    this.ProveraUkloni();
    //projektiUkloniOdabrani
  }

  ProveraVrednostiProjekataUklanjanje(){
   if(JSON.parse(localStorage.getItem('Token')) == null){
      console.log("Izlogovani ste!!");
      this.router.navigate(['/login']);
      return;
    }
    else{
      if(this.selectedUklanjanjeKorisnikaSaProjektaKorisnik.Ime_Prezime == '' || this.selectedUklanjanjeKorisnikaSaProjektaProjekat == '' || this.selectedUklanjanjeKorisnikaSaProjektaKorisnik == undefined || this.selectedUklanjanjeKorisnikaSaProjektaProjekat == undefined)
      {
        this.proveraUspesnosti = false;
      }
      else{
        this.proveraUspesnosti = true;
      }
    }
  }

  UklanjanjeDropDown(){
    if(JSON.parse(localStorage.getItem('Token')) == null){
      console.log("Izlogovani ste!!");
      this.router.navigate(['/login']);
      return;
    }
    else{

      if(this.selectedUklanjanjeKorisnikaSaProjektaKorisnik.Ime_Prezime == '' || this.selectedUklanjanjeKorisnikaSaProjektaProjekat == '' || this.selectedUklanjanjeKorisnikaSaProjektaKorisnik == undefined || this.selectedUklanjanjeKorisnikaSaProjektaProjekat == undefined){
        this.proveraUspesnosti = false;
      }
      else{
        this.proveraUspesnosti = true;
      }
      this.UklanjanjeDropDownFunkcija();
    }

  }
  //***Uklanjanje korisnika sa projekta
  //Popunjavanje dropdown-a
  PonovnoUcitavanjeProjekataUkloni(korisnik:any){
    this.adminservice.PopunjavanjeDropDownUklanjanjeSaProjekta(korisnik)
      .subscribe(
        projektiNaKojimaRadi => { this.projektiNaKojimaRadi = projektiNaKojimaRadi

          let nizU = [];
          for(let pr in this.projektiNaKojimaRadi){
            let u = {};
            u['Projekti'] = this.projektiNaKojimaRadi[pr]['Projekti']
            u['id_pr'] = this.projektiNaKojimaRadi[pr]['id_pr']
            u['vidljivo'] = true;
            u['trazi'] = 1;
            nizU.push(u);
          }
          this.naKojimaRadeHtml = nizU;
          for(let pr in this.naKojimaRadeHtml){
            for(let od in this.projektiUkloniOdabrani){
              if(this.naKojimaRadeHtml[pr]['Projekti'] == this.projektiUkloniOdabrani[od]['Projekti']){
                this.naKojimaRadeHtml[pr]['vidljivo'] = false;
              }
            }
          }
          this.PretragaUkloniKorisnika();
          //this.popuniProjektiAdminUklanjanjeSaProjekta(this.projektiNaKojimaRadi)
      },
      error => {
        console.log("error");
        this.Erorr('Za datog korisnika nije moguce ocitati projekte!!');
    });
  }

  UklanjanjeDropDownFunkcija(){
    this.adminservice.PopunjavanjeDropDownUklanjanjeSaProjekta(this.selectedUklanjanjeKorisnikaSaProjektaKorisnik.Nadimak_Klijent)
      .subscribe(
        projektiNaKojimaRadi => { this.projektiNaKojimaRadi = projektiNaKojimaRadi

          for(let ar in this.projektiUkloniOdabrani){//Brisanje Niza-objekata!!!
            let index = this.projektiUkloniOdabrani.indexOf(this.projektiUkloniOdabrani[ar]);
            this.projektiUkloniOdabrani.splice(index, this.projektiUkloniOdabrani.length);
          }

          let nizU = [];
          for(let pr in this.projektiNaKojimaRadi){
            let u = {};
            u['Projekti'] = this.projektiNaKojimaRadi[pr]['Projekti']
            u['id_pr'] = this.projektiNaKojimaRadi[pr]['id_pr']
            u['vidljivo'] = true
            u['trazi'] = 1;
            nizU.push(u);
          }
          this.naKojimaRadeHtml = nizU;
          //this.popuniProjektiAdminUklanjanjeSaProjekta(this.projektiNaKojimaRadi)
      },
      error => {
        console.log("error");
        this.Erorr('Za datog korisnika nije moguce ocitati projekte!!');
    });
  }

  GotovoUkloni(){
    this.CitanjeUkloni = 'sacuvano';
  }
  //***Uklanjanje korisnika sa projekta
  //Uklanjenje projekta za izabranog korisnika!!
  SredjivanjeHtmlA(){
    this.selectedUklanjanjeKorisnikaSaProjektaKorisnik.Nadimak_Klijent = "";
    this.selectedUklanjanjeKorisnikaSaProjektaKorisnik.Ime_Prezime = "";
    this.selectedDodavanjeKorisnikaNaProjekatKorisnik.Ime_Prezime = '';
    this.selectedDodavanjeKorisnikaNaProjekatKorisnik.Nadimak_Klijent = '';
    for(let ar in this.projektiOdabrani){//Brisanje Niza-objekata!!!
      let index = this.projektiOdabrani.indexOf(this.projektiOdabrani[ar]);
      this.projektiOdabrani.splice(index, this.projektiOdabrani.length);
    }
    for(let ar in this.naKojimaRadeHtml){//Brisanje Niza-objekata!!!
      let index = this.naKojimaRadeHtml.indexOf(this.naKojimaRadeHtml[ar]);
      this.naKojimaRadeHtml.splice(index, this.naKojimaRadeHtml.length);
    }
    for(let ar in this.vidljivostProjekta){//Brisanje Niza-objekata!!!
      let index = this.vidljivostProjekta.indexOf(this.vidljivostProjekta[ar]);
      this.vidljivostProjekta.splice(index, this.vidljivostProjekta.length);
    }
    for(let ar in this.projektiUkloniOdabrani){//Brisanje Niza-objekata!!!
      let index = this.projektiUkloniOdabrani.indexOf(this.projektiUkloniOdabrani[ar]);
      this.projektiUkloniOdabrani.splice(index, this.projektiUkloniOdabrani.length);
    }

  }

  UklanjanjeKorisnikaSaProjekta(){

    this.CitanjeUkloni = 'snimanje'
    if(JSON.parse(localStorage.getItem('Token')) == null){
      console.log("Izlogovani ste!!");
      this.router.navigate(['/login']);
      return;
    }
    else{
      if(this.selectedUklanjanjeKorisnikaSaProjektaKorisnik.Ime_Prezime == '' || this.selectedUklanjanjeKorisnikaSaProjektaKorisnik == undefined){
        this.proveraUspesnosti = false;
        return;
      }
      else{
        this.adminservice.BrisanjeKorisnikaSaProjekta(this.selectedUklanjanjeKorisnikaSaProjektaKorisnik.Nadimak_Klijent,this.projektiUkloniOdabrani)
          .subscribe(
            odgovorUklanjanje => { this.odgovorUklanjanje = odgovorUklanjanje

            //Poziva se funkcija koja refresuje tabelu Projekti kada se doda projekat za odradjenog korisnika!!
            this.KlikProjektiAdmin(this.selectedGodinaProjektiAdmin,this.ProjektiMesecAdmin,this.selectedProjektiAktivni,this.projektiDropDown);
            this.CitanjeUkloni = 'gotovo';
            this.ProveraUkloni(); 
            for(let ar in this.projektiUkloniOdabrani){//Brisanje Niza-objekata!!!
              let index = this.projektiUkloniOdabrani.indexOf(this.projektiUkloniOdabrani[ar]);
              this.projektiUkloniOdabrani.splice(index, this.projektiUkloniOdabrani.length);
            }   
            //this.SredjivanjeHtmlA();//Brise sve iz html-ova koji su vezani za dodavanje i Uklanjanje korisnika sa projekta!!
            this.PonovoUcitavanjeProjekataDodaj(this.selectedDodavanjeKorisnikaNaProjekatKorisnik.Nadimak_Klijent);  
            //this.UklanjanjeDropDownFunkcija();
            //Prilikom uklanjanja projekta za odredjenog korisnika da ozvezi dropdown za Dodavanje korisnika na projekat!!!
            //this.ProbaDropDownFunkcija();
          },
          error => {
            console.log("error");
            this.Erorr('Korisnika nije moguce ukloniti sa projekata!!');
        });
      }
    }

  }

  ProveraUkloni(){
    if(this.selectedUklanjanjeKorisnikaSaProjektaKorisnik.Ime_Prezime == '' || this.projektiUkloniOdabrani.length == 0
        || (this.selectedUklanjanjeKorisnikaSaProjektaKorisnik == undefined && this.projektiUkloniOdabrani.length == 0)){
        this.izvrsiUkloni = true;
    }
    else{
      this.izvrsiUkloni = false;
    }
  }
  //*** Deaktivacija
  Deaktivacija(){
    if(JSON.parse(localStorage.getItem('Token')) == null){
      console.log("Izlogovani ste!!");
      this.router.navigate(['/login']);
      return;
    }
    else{
      if(this.selectedDeaktivacija == undefined || this.selectedDeaktivacija == ''){

        //this.selectedDeaktivacija = '';
        this.flgDeaktivacija = 0;
        return;
      
      }
      else{

        console.log("PUT" + this.selectedDeaktivacija)
        this.adminservice.Deaktivacija(this.selectedDeaktivacija)
                .subscribe(
                    deaktivacijaKorisnik => { this.deaktivacijaKorisnik = deaktivacijaKorisnik
                      
                      this.selectedAktivacija = "";
                      //this.imePrezimeAktivniFunkcija();
                      this.selectedDodavanjeKorisnikaNaProjekatKorisnik.Ime_Prezime = "";
                      this.selectedDodavanjeKorisnikaNaProjekatKorisnik.Nadimak_Klijent = "";

                      this.adminservice.imePrezimeAktivni()
                          .subscribe(
                              korisniciAktivni => { this.korisniciAktivni = korisniciAktivni
                                //ovde se popunjava dopwdpwn sa korisniciAktivni

                                this.popuniKorisniciAktivniAdmin(this.korisniciAktivni);

                                //Prilikom Deaktivacije Korisnika izprazni podatke iz tabele Korisnici!!
                                if(this.selectedKorisnikAdmin == this.selectedDeaktivacija){

                                    //Ako je korisnik u tabeli izabran a u isto vreme njega zelimo da Deaktiviramo moramo da ispraznimo tabelu i napunimo dropdown sa samo aktivnim korisnicima
                                    this.selectedKorisnikAdmin = "";
                                    this.selectedGodinakorisniciAdmin = 2017;
                                    //this.KlikKorisnikAdmin();

                                    //Refresovanje tabele Projekat u zavisnosti od toga koji je korisnik aktivan!!
                                    //this.KlikProjektiAdmin();
                                    this.KlikProjektiAdmin(this.selectedGodinaProjektiAdmin,this.ProjektiMesecAdmin,this.selectedProjektiAktivni,this.projektiDropDown);
                                    
                                }
                                else{
                                  console.log("Ne brisi dropdown")
                                  //this.KlikProjektiAdmin();
                                  this.KlikProjektiAdmin(this.selectedGodinaProjektiAdmin,this.ProjektiMesecAdmin,this.selectedProjektiAktivni,this.projektiDropDown);
                                  this.Erorr('Uspesno ste deaktivirali korisnika!');
                                }

                              },
                              error => {
                                  console.log("error")
                                  this.Erorr('Nije moguce isčitati korisnika!!');
                                  /*localStorage.clear();
                                  this.text = 'Došlo je do greške na serveru!!'
                                  this.text_izlaz = 'Gotovo';
                                  this.showDialog();*/
                      });
                      

                      this.ImePrezimeNeAktivniKorisniciFunkcija();

                      //Praznjenje dropdown-ova!!
                      //Praznjenje dropdown-ova gde se nalaze Korisnici nije potrebno jer je poziva funkcija this.imePrezimeAktivniFunkcija(); koja postavlja dropdown-ove na pocetne vrednosti!!
                      this.selectedUklanjanjeKorisnikaSaProjektaProjekat = "";
                      this.selectedDodavanjeKorisnikaNaProjekatProjekat = "";
                      //this.selectedProjektiAktivni = "";
                      //this.selectedAktivacija = "";
                      this.dodajuspesno = 1;
                      /*this.flgDeaktivacija = 1;
                      this.flgAktivacija = 1;*/
                    },
                    error => {
                        console.log("error")
                        this.Erorr('Nije moguće deaktivirati korisnika!!');
        });             
      }
    }

  }

  ProveraDeaktivacija(){
    if(JSON.parse(localStorage.getItem('Token')) == null){

            console.log("Izlogovani ste!!");
            this.router.navigate(['/login']);
            return;

    }
    else{
      if(this.selectedDeaktivacija == undefined || this.selectedDeaktivacija == ''){

        //this.selectedDeaktivacija = '';
        this.flgDeaktivacija = 0;
        return;
      }
      else{

        this.flgDeaktivacija = 1;

      }
    }

  }

  //* Aktivacija
  Aktivacija(){

    if(JSON.parse(localStorage.getItem('Token')) == null){

            console.log("Izlogovani ste!!");
            this.router.navigate(['/login']);
            return;

    }
    else{
      //Ova dva selecta su koriscena da ako prilikom deaktivacije ostanu popunjeni i onda prilikom aktivacije se ponovo pojave imena i prezimena u dropdown-ovima
      //Zbog toga su oni onda ispraznjeni!!
      this.selectedUklanjanjeKorisnikaSaProjektaKorisnik.Ime_Prezime = "";
      this.selectedUklanjanjeKorisnikaSaProjektaKorisnik.Nadimak_Klijent = "";
      this.selectedDodavanjeKorisnikaNaProjekatKorisnik.Ime_Prezime = "";
      this.selectedDodavanjeKorisnikaNaProjekatKorisnik.Nadimak_Klijent = "";

      if(this.selectedAktivacija == undefined){

        this.selectedAktivacija = '';
        this.flgAktivacija = 0;
        return;

      }
      else{
        console.log("PUT" + this.selectedAktivacija)
        this.adminservice.Aktivacija(this.selectedAktivacija)
          .subscribe(
            aktivacijaKorisnik => { this.aktivacijaKorisnik = aktivacijaKorisnik

              //console.log("this.aktivacijaKorisnik"+ this.aktivacijaKorisnik)
              this.selectedDeaktivacija = "";
              this.imePrezimeAktivniFunkcija();
              this.ImePrezimeNeAktivniKorisniciFunkcija();
              //this.KlikProjektiAdmin();
              this.KlikProjektiAdmin(this.selectedGodinaProjektiAdmin,this.ProjektiMesecAdmin,this.selectedProjektiAktivni,this.projektiDropDown);
              //Praznjenje dropdown-ova!!
              //Praznjenje dropdown-ova gde se nalaze Korisnici nije potrebno jer je poziva funkcija this.imePrezimeAktivniFunkcija(); koja postavlja dropdown-ove na pocetne vrednosti!!
              this.selectedUklanjanjeKorisnikaSaProjektaProjekat = "";
              this.selectedDodavanjeKorisnikaNaProjekatProjekat = "";
             
              this.dodajuspesno = 1;
              this.Erorr('Uspesno ste aktivirali korisnika!');
              
            },
            error => {
              console.log("error")
              this.Erorr('Nije moguće aktivirati korisnika!!');
        });
      }
    }
  }

  ProveraAktivacija(){
    if(JSON.parse(localStorage.getItem('Token')) == null){

            console.log("Izlogovani ste!!");
            this.router.navigate(['/login']);
            return;

    }
    else{
      if(this.selectedAktivacija == undefined || this.selectedAktivacija == ''){

        //this.selectedDeaktivacija = '';
        this.flgAktivacija = 0;
        return;
      }
      else{

        this.flgAktivacija = 1;

      }
    }

  }

  ImePrezimeNeAktivniKorisniciFunkcija(){
    if(JSON.parse(localStorage.getItem('Token')) == null){

            console.log("Izlogovani ste!!");
            this.router.navigate(['/login']);
            return;

    }
    else{
      this.adminservice.ImePrezimeNeAktivni()
              .subscribe(
                  korisniciNeAktivni => { this.korisniciNeAktivni = korisniciNeAktivni
                    //ovde se popunjava dopwdpwn sa korisniciAktivni
                    this.popuniProjektiAdminNeAktivniKorisnici(this.korisniciNeAktivni);

                  },
                  error => {
                      console.log("error")
                      
        });
    }
  }

  popuniKorisniciAktivniAdmin(korisnici:any) {//Popunjavanje dropdown-a sa korisnicima

      this.imePrezimeAktivni = [];

      const korisnik = new Admin();
      korisnik.imePrezime = '----';
      korisnik.Nadimak_Klijent = "";

      this.imePrezimeAktivni.unshift({
          label: '----',
          value: korisnik.Nadimak_Klijent
      })
      
      for(var i = 0; i <= korisnici.length - 1; i++){
          //console.log("i" + korisnici[i].Ime_Prezime)
          this.imePrezimeAktivni.push({ 
            label: korisnici[i].Ime_Prezime ? korisnici[i].Ime_Prezime : korisnici[i].Ime_Prezime,
            value: korisnici[i].Nadimak_Klijent});
      }

  }

  popuniProjektiAdmin(projekti:any){//Popunjavanje dropdown-a sa projektima

      this.projektiDropDown = [];

      const projekt = new Admin();
      projekt.ProjektiAdmin = '----';
      projekt.ProjektiAdmin = "";


      this.projektiDropDown.unshift({
          label: '----',
          value: projekt.ProjektiAdmin,
          tabela: 'Micko',
      })

      for(var i = 0; i <= projekti.length - 1; i++){
          //console.log("i" + korisnici[i].Ime_Prezime)
          this.projektiDropDown.push({ 
            label: projekti[i].Projekti ? projekti[i].Projekti : projekti[i].Projekti,
            //label: projekti[i].tabela_vrednosti,
            tabela: projekti[i].tabela_vrednosti, 
            value: projekti[i].Projekti});
      }
      //korisnik.Nadimak_Klijent = "";
      //console.log(this.projektiDropDown);

  }

  popuniProjektiAdminDodavanjeNaProjekat(projekti1:any){//Popunjavanje dropdown-a sa projektima

      this.projektiDropDownDodajNaProjekat = [];

      if(projekti1 == 'Ne selectuj'){

          console.log("Nije oznacen korisnik")
          return;

      }
      else{

        const projekt1 = new Admin();
        projekt1.ProjektiAdminDodavanjeNaProjekat = '----';
        projekt1.ProjektiAdminDodavanjeNaProjekat = "";

        this.projektiDropDownDodajNaProjekat.unshift({
            label: '----',
            value: projekt1.ProjektiAdminDodavanjeNaProjekat
        })


        for(var i = 0; i <= projekti1.length - 1; i++){
            //console.log("i" + korisnici[i].Ime_Prezime)
            this.projektiDropDownDodajNaProjekat.push({ 
              label: projekti1[i].Projekti ? projekti1[i].Projekti : projekti1[i].Projekti,
              value: projekti1[i].Projekti});
        }
      }
  }

  popuniProjektiAdminUklanjanjeSaProjekta(projekti:any){

      this.projektiDropDownUklanjanjeSaProjekta = [];

      if(projekti == 'Ne selectuj'){

          console.log("Nije oznacen korisnik")
          return;

      }
      else{
        const projekatUklanjanje = new Admin();
        projekatUklanjanje.ProjektiAdminUklanjanjeNaProjekat = '----'
        projekatUklanjanje.ProjektiAdminUklanjanjeNaProjekat = "";

        this.projektiDropDownUklanjanjeSaProjekta.unshift({
              label: '----',
              value: projekatUklanjanje.ProjektiAdminDodavanjeNaProjekat
          })

        for(var i = 0; i <= projekti.length - 1; i++){
              //console.log("i" + korisnici[i].Ime_Prezime)
              this.projektiDropDownUklanjanjeSaProjekta.push({ 
                label: projekti[i].Projekti ? projekti[i].Projekti : projekti[i].Projekti,
                value: projekti[i].Projekti});
          }   
      }     

  }

  popuniProjektiAdminNeAktivniKorisnici(korisnici1:any){

      this.imePrezimeNeAktivni = [];

      const korisnikNeAktivni = new Admin();
      korisnikNeAktivni.NeAktivnikorisnici = '----';
      korisnikNeAktivni.Nadimak_Klijent = "";

      this.imePrezimeNeAktivni.unshift({
          label: '----',
          value: korisnikNeAktivni.Nadimak_Klijent
      })

      for(var i = 0; i <= korisnici1.length - 1; i++){
          //console.log("i" + korisnici[i].Ime_Prezime)
          this.imePrezimeNeAktivni.push({ 
            label: korisnici1[i].Ime_Prezime ? korisnici1[i].Ime_Prezime : korisnici1[i].Ime_Prezime,
            value: korisnici1[i].Nadimak_Klijent});
      }

  }

  ZastitaDodavanjeKorisnikaNaProjekat(){

    if( this.selectedDodavanjeKorisnikaNaProjekatKorisnik.Ime_Prezime == undefined || this.selectedDodavanjeKorisnikaNaProjekatProjekat == undefined){
      console.log("undefined") 
      this.validDodaj = 'nije';
      this.dodajuspesno = 0;
    }
    else if(this.selectedDodavanjeKorisnikaNaProjekatKorisnik.Ime_Prezime == "" || this.selectedDodavanjeKorisnikaNaProjekatProjekat == ""){
       console.log("Praznoo") 
       this.validDodaj = 'nije';
       this.dodajuspesno = 0;
    }
    else{
      this.validDodaj = 'jeste';
    }

  }

  showDialog() {
    console.log("Usaooo")
    this.display = true;
  }

  Izlaz(){

    if(this.text == 'Došlo je do greške na serveru!!'){

           console.log("Mickoasadasasa")            
           this.router.navigate(['/login']);

        }

  }

  Erorr(error:any){

    this.textError = String(error);
    this.textPotvrdaError = 'Uredu';
    //this.displayError = true;
    this.showDialogError();
    

  }

  showDialogError() {
          console.log("Usaooo")
          this.displayError = true;
  }

  IzlazNe(){

      this.selectedUklanjanjeKorisnikaSaProjektaKorisnik.Ime_Prezime = "";
      this.selectedUklanjanjeKorisnikaSaProjektaKorisnik.Nadimak_Klijent = "";
      this.selectedUklanjanjeKorisnikaSaProjektaProjekat = "";

  }

  IzlazPotvrda(){

    this.adminservice.BrisanjeKorisnikaSaProjekta(this.selectedUklanjanjeKorisnikaSaProjektaKorisnik.Nadimak_Klijent,this.projektiUkloniOdabrani)
          .subscribe(
              odgovorUklanjanje => { this.odgovorUklanjanje = odgovorUklanjanje

                //console.log("this.projektiNaKojimaRadi"+ this.projektiNaKojimaRadi)

                //Poziva se funkcija koja refresuje tabelu Korisnik kada se doda projekat za odradjenog korisnika!!
                //this.KlikKorisnikAdmin();
                //Poziva se funkcija koja refresuje tabelu Projekti kada se doda projekat za odradjenog korisnika!!
                //this.KlikProjektiAdmin();
                this.KlikProjektiAdmin(this.selectedGodinaProjektiAdmin,this.ProjektiMesecAdmin,this.selectedProjektiAktivni,this.projektiDropDown);

                this.selectedUklanjanjeKorisnikaSaProjektaKorisnik.Ime_Prezime = "";
                this.selectedUklanjanjeKorisnikaSaProjektaKorisnik.Nadimak_Klijent = "";
                this.selectedUklanjanjeKorisnikaSaProjektaProjekat = "";
                //this.UklanjanjeDropDownFunkcija();
                //console.log("this.selectedUklanjanjeKorisnikaSaProjektaKorisnik" + this.selectedUklanjanjeKorisnikaSaProjektaKorisnik)
                //console.log("this.selectedUklanjanjeKorisnikaSaProjektaProjekat" + this.selectedUklanjanjeKorisnikaSaProjektaProjekat)

                this.UklanjanjeDropDownFunkcija();

                //Prilikom uklanjanja projekta za odredjenog korisnika da ozvezi dropdown za Dodavanje korisnika na projekat!!!
                this.ProbaDropDownFunkcija();
                
            },
            error => {
              console.log("error");
              localStorage.clear();
              this.text = 'Došlo je do greške na serveru!!'
              this.text_izlaz = 'Gotovo';
              this.showDialog();
    });

  }

  //Ne koristim ali ne znam sto nisam izbrisao
  NedeljaAdminF(){

     for(let ar in this.NizObjekataKorPr){

            var index = this.NizObjekataKorPr.indexOf(this.NizObjekataKorPr[ar]);
            console.log("NizObjectIndex" + index);
            this.NizObjekataKorPr.splice(index, this.NizObjekataKorPr.length);

    }
    this.adminservice.SatnicaKorisniciAdmin(this.KorisniciMesecAdmin,this.KorisniciNedeljaAdmin)
          .subscribe(
                      ListaProjekataNiz => { this.ListaProjekataNiz = ListaProjekataNiz
                      
                      console.log("this.ListaProjekataNiz" + this.ListaProjekataNiz);

              this.adminservice.ListaProjekataAdmin()
                .subscribe(
                  projekti => { this.projekti = projekti
                    
                    var cuvaj = this.projekti;

                    for(let pr in this.projekti){

                      this.NizProjekti[pr] = this.projekti[pr].Projekti
                      //console.log("this.NizProjekti" + this.NizProjekti[pr])
                     
                    }

                    this.adminservice.ListaKorisnikaAdmin()
                      .subscribe(
                                  korisnici => { this.korisnici = korisnici
                                  
                                    var cuvaj1 = this.korisnici;
                                   
                                    for(let pr in this.korisnici){

                                      this.NizKorisnici[pr] = this.korisnici[pr].Ime_Prezime;
                                      //console.log("this.NizKorisnici" + this.NizKorisnici[pr])
                                    }

                                    let h = [];

                                      for (let pr of this.NizProjekti) {
                                        let z = {};
                                        z['Projekat'] = pr;
                                        for (let kor of this.NizKorisnici) {
                                          z[kor] = null;
                                        }
                                        this.NizObjekataKorPr.push(z);
                                        
                                      }
                                      //console.log(this.NizObjekataKorPr);

                                      for(let pr in this.NizObjekataKorPr){
                                        for(let kor in this.ListaProjekataNiz){
                                          
                                          if(this.NizObjekataKorPr[pr]['Projekat'] == this.ListaProjekataNiz[kor]['Projekti']){
 
                                              let korisnikIme;
                                              korisnikIme = this.ListaProjekataNiz[kor].Ime_Prezime;
                                              this.NizObjekataKorPr[pr][korisnikIme] = this.ListaProjekataNiz[kor].sum;

                                          }
                                        } 
                                      }
                                      for(let pr1 in this.NizObjekataKorPr){
                                        
                                        this.uvecajNesto++;
                                        this.SumaNizVertikalno[pr1] = 0;
                                    
                                      }
                                      for(let kor in this.NizKorisnici){
                                      
                                        this.SumaNizHorizontalno[kor] = 0;

                                      }

                                      for(let pr1 in this.NizObjekataKorPr){  
                                          for(let kor in this.NizKorisnici){

                                              let cuvajKorisnik;
                                              cuvajKorisnik = this.NizKorisnici[kor]

                                              if(this.NizObjekataKorPr[pr1][cuvajKorisnik] == null){
                                              
                                              }
                                              else{
                                                this.SumaNizVertikalno[pr1] = Number(this.NizObjekataKorPr[pr1][cuvajKorisnik]) + Number(this.SumaNizVertikalno[pr1]);
                                            
                                              }
                                          }
                                      }

                                      for(let kor in this.NizKorisnici){
                                      //for(var kor = 2;kor<3;kor++){  
                                        for(let pr2 in this.NizObjekataKorPr){

                                          let cuvajKorisnikVertikalno;
                                          cuvajKorisnikVertikalno = this.NizKorisnici[kor]

                                          if(this.NizObjekataKorPr[pr2][cuvajKorisnikVertikalno] == null){

                                            
                                          }
                                          else{
                                            this.SumaNizHorizontalno[kor] = Number(this.NizObjekataKorPr[pr2][cuvajKorisnikVertikalno]) + Number(this.SumaNizHorizontalno[kor]);
                                            
                                          }
                                        }
                                      }
                                                                      
                      },
                      error => {
                      
                  }); 
              },
              error => {
                        
              });
          },
          error => {
                     
    });

  }

  DodajNoviProjekat(){

    console.log("DodavanjeNovogKorisnika" + this.DodavanjeNovogKorisnika)

  }

  /*
  KlikKorisnikAdmin(){
     if(JSON.parse(localStorage.getItem('Token')) == null){

            console.log("Izlogovani ste!!");
            this.router.navigate(['/login']);
            return;

    }
    else{    
      this.adminservice.TabelaKorisnici(this.selectedKorisnikAdmin,this.selectedGodinakorisniciAdmin)
              .subscribe(
                  vrednostTabelakorisnici => { this.vrednostTabelakorisnici = vrednostTabelakorisnici
                    //console.log("Bravoo" + this.vrednostTabelakorisnici)
                  },
                  error => {
                      console.log("error")
                      localStorage.clear();
                      this.text = 'Došlo je do greške na serveru!!'
                      this.text_izlaz = 'Gotovo';
                      this.showDialog();
      }); 
    }
  }*/


}
