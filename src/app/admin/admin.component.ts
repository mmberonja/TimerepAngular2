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
import { Directive, ElementRef, HostListener, Input,Renderer } from '@angular/core';
import { User } from '../models/user';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit,OnDestroy {

  korisniciAktivni : Admin;
  projektiAktivni : Admin;
//Korisnici
  //spinner input
  selectedGodinakorisniciAdmin:any;
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
  projektiDropDown:SelectItem[];
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
  selectedDodavanjeKorisnikaNaProjekatKorisnik:string;
  selectedDodavanjeKorisnikaNaProjekatProjekat:string;
  trenutnaGodinaDodavanje:number;
  insert:any;
  projektiNaKojimaNeRadi:Admin;
  projektiDropDownDodajNaProjekat:SelectItem[];
//
//Uklanjanje korisnika sa projekta
  selectedUklanjanjeKorisnikaSaProjektaKorisnik:string;
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

   //Style html
   boja:string;  

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private authenticationService: AuthenticationService,  
    private adminservice: AdminService,
    private formBuilder: FormBuilder,
    private router: Router,
    private el: ElementRef,
    public renderer: Renderer,
    //public Probaaaaaa:any
    
    ) 
  {   
    
      //console.log(this.Probaaaaaa);
      this.SumaNizVertikalno[0] = 0;
      this.SumaNizHorizontalno[0] = 0;
      this.uvecajNesto = 0;
      this.saberi = 0;
      //this.boja = 'red';
      this.rezHorizontalno = 0;
      this.neznamKakoDaNazovem = ['Razvoj','odrzavanje','dokumentacija','implementacija','rezijski_poslovi'];
      this.neznamKakoDaNazovemObject = [{x:{ime:'Razvoj',baza:'Razvoj'}},{x:{ime:'Odrzavanje',baza:'odrzavanje'}},
        {x:{ime:'Dokumentacija',baza:'dokumentacija'}},{x:{ime:'Implementacija',baza:'implementacija'}},{x:{ime:'Rezijski poslovi',baza:'rezijski_poslovi'}}];

   //KorisniciMesecAdmin: string;    
      this.KorisniciMesecAdmin = this.nizMesec[0].name;
      this.ProjektiMesecAdmin = this.nizMesec[0].name;
      this.KorisniciNedeljaAdmin = 1;
      this.selectedProjektiAktivni = 'Eksterna obuka, kurs, seminar, …';
      /*this.adminservice.SatnicaKorisniciAdmin('Januar',1)
          .subscribe(
                      ListaProjekataNiz => { this.ListaProjekataNiz = ListaProjekataNiz
                      
                        //console.log("this.ListaProjekataNiz" + this.ListaProjekataNiz[0].Projekti);

              this.adminservice.ListaProjekataAdmin()
                .subscribe(
                  projekti => { this.projekti = projekti
                    
                    var cuvaj = this.projekti;

                    for(let pr in this.projekti){

                      this.NizProjekti[pr] = this.projekti[pr].Projekti
                      //console.log("Projekti--" + this.NizProjekti[pr]);
                    }

                    this.adminservice.ListaKorisnikaAdmin()
                      .subscribe(
                                  korisnici => { this.korisnici = korisnici
                                  
                                    var cuvaj1 = this.korisnici;
                                    //console.log("this.korisnici" + this.korisnici);
                                    for(let pr in this.korisnici){

                                      this.NizKorisnici[pr] = this.korisnici[pr].Ime_Prezime;
                                      //console.log("Korisnici--" + this.NizKorisnici[pr]);

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
                                              //console.log("korisnikIme" + korisnikIme);
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
                                            //this.SumaNizHorizontalno[pr2]
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
                     
      });*/ 
      //this.selectedGodinakorisniciAdmin = 2017;

      this.adminservice.trenutni_godina()
        .then(
          gorinaTre => { this.selectedGodinakorisniciAdmin = gorinaTre

            //this.flgLoadingAdmin = false;
            //Provera za gresku!!
            //this.selectedGodinakorisniciAdmin = 201

            this.adminservice.SatnicaKorisniciSveNedeljeAdmin(this.KorisniciMesecAdmin,this.selectedGodinakorisniciAdmin)
                .subscribe(
                  BazaPodaci => { this.BazaPodaci = BazaPodaci

                  //console.log(this.BazaPodaci)  

                this.adminservice.ListaProjekataAdmin()
                      .subscribe(
                        projekti => { this.projekti = projekti
                          
                          var cuvaj = this.projekti;

                          for(let pr in this.projekti){

                            this.NizProjekti[pr] = this.projekti[pr].Projekti
                            //console.log("Projekti--" + this.NizProjekti[pr]);
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
                                        this.boja = 'blue';

                                      }else if(brKor <= this.korisniciObject.length){

                                        this.saberi = Number(duzNed) + 1;
                                        objectKor['ime'] = this.korisniciObject[brKor].Ime_Prezime
                                        objectKor['oznaka'] = this.korisniciObject[brKor].Ime_Prezime + "" + this.saberi;
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

                                this.SumaPoProjektu[pp] = 0  

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

                            this.flgLoadingAdmin = true;

                            //SumaPoKorisniku
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

      //this.selectedGodinaProjektiAdmin = 2017;
      this.adminservice.trenutni_godina()
        .then(
          gorinaTre => { this.selectedGodinaProjektiAdmin = gorinaTre

            //this.selectedGodinaProjektiAdmin = 200;

            this.adminservice.projekatKorisnici(this.ProjektiMesecAdmin,this.selectedProjektiAktivni,this.selectedGodinaProjektiAdmin)
                  .subscribe(
                      projekatKorisnici => { this.projekatKorisnici = projekatKorisnici
                        
                        //Provera za gresku!!
                        //console.log(this.projekatKorisnici);

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
                                        brojacKor = 0;
                                        this.boja = 'blue';

                                      }else if(brKor <= this.detaljiKorisniciObject.length){

                                        this.saberi = Number(duzNed) + 1;
                                        objectKor['ime'] = this.detaljiKorisniciObject[brKor].Ime_Prezime
                                        objectKor['oznaka'] = this.detaljiKorisniciObject[brKor].Ime_Prezime + "" + this.saberi;
                                        this.boja = 'white';
                                      }

                                      this.detaljiNizObjKorisnik.push(objectKor);      
                                }
                              
                              }
                              // console.log(this.detaljiNizObjKorisnik);
                              for(let nz of this.neznamKakoDaNazovemObject){

                                  let Kor = {};
                                  Kor['Projekat'] = nz.x.ime;
                                  for(let pr of this.detaljiNizObjKorisnik){

                                    Kor[pr.oznaka] = null;

                                  }
                                  this.pakovanjeDetalji.push(Kor);
                              }
                              //console.log(this.pakovanjeDetalji);

                            
                              for(let i in this.neznamKakoDaNazovemObject){
                                //console.log(this.neznamKakoDaNazovemObject[i].x.ime);
                              }

                              for(let i in this.neznamKakoDaNazovemObject){//ovde prolazi 5 puta
                              //for(let i = 0; i < 1 ; i++){   
                                for(let nz in this.projekatKorisnici){//ovde prolazi onoliko puta koliko smo dobili podataka iz baze
                                  this.pakovanjeDetalji[i][this.projekatKorisnici[nz].Ime_Prezime + "" + this.projekatKorisnici[nz].nedelja] = this.projekatKorisnici[nz][this.neznamKakoDaNazovemObject[i].x.baza];
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
          console.log("error");
          this.Erorr("Nije moguce ocitati trenutnu godinu");
      });       
  }

  ngOnDestroy(){

    //console.log("ngOnDestroy")
    clearInterval(this.interval);

  }

  ngOnInit() {

        //console.log("ngOnInit")
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
        /*this.FormDodavanje = this.formBuilder.group({
              korisnik   : ['', Validators.compose([Validators.required, Validators.minLength(5)])]
        });*/
        //this.MesecAdminNgInit();

        this.flgDeaktivacija = 1;
        this.flgAktivacija = 1;

        //this.dodajuspesno = 1;
        
        this.myForm = this.formBuilder.group({
              name   : ['', Validators.compose([Validators.required, Validators.minLength(5)])]
        });
        this.subcribeToFormChanges(); 

        this.selectedGodinakorisniciAdmin = new Date().getFullYear();
        this.selectedGodinaProjektiAdmin = new Date().getFullYear();
        this.trenutnaGodinaDodavanje = new Date().getFullYear();

        //Popunjavanje dropdown-a sa aktivnim korisnicima!!  
        this.imePrezimeAktivniFunkcija();

        this.ImePrezimeNeAktivniKorisniciFunkcija();
      
        this.adminservice.Projekti()
              .subscribe(
                  projektiAktivni => { this.projektiAktivni = projektiAktivni
                    //ovde se popunjava dopwdpwn sa korisniciAktivni
                    this.popuniProjektiAdmin(this.projektiAktivni);

                  },
                  error => {
                      console.log("error")
                      localStorage.clear();
                      this.text = 'Došlo je do greške na serveru!!'
                      this.text_izlaz = 'Gotovo';
                      this.showDialog();
                  },
                  () => {console.log('done')}   
                  
        )

        if(JSON.parse(localStorage.getItem('Token')) == null){

          console.log("Izlogovani ste!!");
          this.router.navigate(['/login']);
          return;

        }

        this.tokenAdmin = this.ParsirajJWT(JSON.parse(localStorage.getItem('Token')));
        //console.log("this.tokenAdmin" + this.tokenAdmin);

        if(this.tokenAdmin == 'nije'){
          
          this.router.navigate(['/firstpage']);

        }
        else{

          return;

        }
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
      
        for(let ar in this.nizObjKorisnik){//Brisanje Niza-objekata!!!

                var index = this.nizObjKorisnik.indexOf(this.nizObjKorisnik[ar]);
                //console.log("NizObjectIndex" + index);
                this.nizObjKorisnik.splice(index, this.nizObjKorisnik.length);

        }
        for(let ar in this.PakovanjeProjekata){//Brisanje Niza-objekata!!!

                var index = this.PakovanjeProjekata.indexOf(this.PakovanjeProjekata[ar]);
                //console.log("NizObjectIndex" + index);
                this.PakovanjeProjekata.splice(index, this.PakovanjeProjekata.length);

        }
        for(let ar in this.SumaPoKorisniku){//Brisanje Niza-objekata!!!

                var index = this.SumaPoKorisniku.indexOf(this.SumaPoKorisniku[ar]);
                //console.log("NizObjectIndex" + index);
                this.SumaPoKorisniku.splice(index, this.SumaPoKorisniku.length);

        }
        for(let ar in this.SumaPoProjektu){//Brisanje Niza-objekata!!!

                var index = this.SumaPoProjektu.indexOf(this.SumaPoProjektu[ar]);
                //console.log("NizObjectIndex" + index);
                this.SumaPoProjektu.splice(index, this.SumaPoProjektu.length);

        }

        this.adminservice.SatnicaKorisniciSveNedeljeAdmin(this.KorisniciMesecAdmin,this.selectedGodinakorisniciAdmin)
              .subscribe(
                BazaPodaci => { this.BazaPodaci = BazaPodaci

                //console.log(this.BazaPodaci)  

              this.adminservice.ListaProjekataAdmin()
                    .subscribe(
                      projekti => { this.projekti = projekti
                        
                        var cuvaj = this.projekti;

                        for(let pr in this.projekti){

                          this.NizProjekti[pr] = this.projekti[pr].Projekti
                          //console.log("Projekti--" + this.NizProjekti[pr]);
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
                                      this.boja = 'blue';

                                    }else if(brKor <= this.korisniciObject.length){

                                      this.saberi = Number(duzNed) + 1;
                                      objectKor['ime'] = this.korisniciObject[brKor].Ime_Prezime
                                      objectKor['oznaka'] = this.korisniciObject[brKor].Ime_Prezime + "" + this.saberi;
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

                              this.SumaPoProjektu[pp] = 0  

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

                          this.flgLoadingAdmin = true;
                          //SumaPoKorisniku
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
    /*this.adminservice.SatnicaKorisniciAdmin(this.KorisniciMesecAdmin,this.KorisniciNedeljaAdmin)
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
                     
    });*/
    

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
      /*this.renderer.listenGlobal('document', 'keydown', (event) => {
           
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
      });*/

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

      for(let ar in this.nizObjKorisnik){//Brisanje Niza-objekata!!!

                var index = this.nizObjKorisnik.indexOf(this.nizObjKorisnik[ar]);
                //console.log("NizObjectIndex" + index);
                this.nizObjKorisnik.splice(index, this.nizObjKorisnik.length);

        }
        for(let ar in this.PakovanjeProjekata){//Brisanje Niza-objekata!!!

                var index = this.PakovanjeProjekata.indexOf(this.PakovanjeProjekata[ar]);
                //console.log("NizObjectIndex" + index);
                this.PakovanjeProjekata.splice(index, this.PakovanjeProjekata.length);

        }
        for(let ar in this.SumaPoKorisniku){//Brisanje Niza-objekata!!!

                var index = this.SumaPoKorisniku.indexOf(this.SumaPoKorisniku[ar]);
                //console.log("NizObjectIndex" + index);
                this.SumaPoKorisniku.splice(index, this.SumaPoKorisniku.length);

        }
        for(let ar in this.SumaPoProjektu){//Brisanje Niza-objekata!!!

                var index = this.SumaPoProjektu.indexOf(this.SumaPoProjektu[ar]);
                //console.log("NizObjectIndex" + index);
                this.SumaPoProjektu.splice(index, this.SumaPoProjektu.length);

        }

        this.adminservice.SatnicaKorisniciSveNedeljeAdmin(this.KorisniciMesecAdmin,this.selectedGodinakorisniciAdmin)
                .subscribe(
                  BazaPodaci => { this.BazaPodaci = BazaPodaci

                  //console.log(this.BazaPodaci)  

                this.adminservice.ListaProjekataAdmin()
                      .subscribe(
                        projekti => { this.projekti = projekti
                          
                          var cuvaj = this.projekti;

                          for(let pr in this.projekti){

                            this.NizProjekti[pr] = this.projekti[pr].Projekti
                            //console.log("Projekti--" + this.NizProjekti[pr]);
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
                                        this.boja = 'blue';

                                      }else if(brKor <= this.korisniciObject.length){

                                        this.saberi = Number(duzNed) + 1;
                                        objectKor['ime'] = this.korisniciObject[brKor].Ime_Prezime
                                        objectKor['oznaka'] = this.korisniciObject[brKor].Ime_Prezime + "" + this.saberi;
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

                                this.SumaPoProjektu[pp] = 0  

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

                            this.flgLoadingAdmin = true;
                            //SumaPoKorisniku
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
  }
  //
  //Druga tabela,goduna,mesec projekat!
  KlikGodinaProjekti(){//input godine -projekti
    this.flgLoadingAdminTabela2 = false;
    if(JSON.parse(localStorage.getItem('Token')) == null){

            console.log("Izlogovani ste!!");
            this.router.navigate(['/login']);
            return;

    }
    else{
      /* this.renderer.listenGlobal('document', 'keydown', (event) => {
           
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
      });*/

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
      this.adminservice.projekatKorisnici(this.ProjektiMesecAdmin,this.selectedProjektiAktivni,this.selectedGodinaProjektiAdmin)
                .subscribe(
                    projekatKorisnici => { this.projekatKorisnici = projekatKorisnici
                      
                      //Provera za gresku!!
                      //console.log(this.projekatKorisnici);

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
                                      brojacKor = 0;
                                      this.boja = 'blue';

                                    }else if(brKor <= this.detaljiKorisniciObject.length){

                                      this.saberi = Number(duzNed) + 1;
                                      objectKor['ime'] = this.detaljiKorisniciObject[brKor].Ime_Prezime
                                      objectKor['oznaka'] = this.detaljiKorisniciObject[brKor].Ime_Prezime + "" + this.saberi;
                                      this.boja = 'white';
                                    }

                                    this.detaljiNizObjKorisnik.push(objectKor);      
                              }
                            
                            }
                            // console.log(this.detaljiNizObjKorisnik);
                            for(let nz of this.neznamKakoDaNazovemObject){

                                let Kor = {};
                                Kor['Projekat'] = nz.x.ime;
                                for(let pr of this.detaljiNizObjKorisnik){

                                  Kor[pr.oznaka] = null;

                                }
                                this.pakovanjeDetalji.push(Kor);
                            }
                            //console.log(this.pakovanjeDetalji);

                          
                            for(let i in this.neznamKakoDaNazovemObject){
                              //console.log(this.neznamKakoDaNazovemObject[i].x.ime);
                            }

                            for(let i in this.neznamKakoDaNazovemObject){//ovde prolazi 5 puta
                            //for(let i = 0; i < 1 ; i++){   
                              for(let nz in this.projekatKorisnici){//ovde prolazi onoliko puta koliko smo dobili podataka iz baze
                                this.pakovanjeDetalji[i][this.projekatKorisnici[nz].Ime_Prezime + "" + this.projekatKorisnici[nz].nedelja] = this.projekatKorisnici[nz][this.neznamKakoDaNazovemObject[i].x.baza];
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
                          this.flgLoadingAdminTabela2 = true;

                        },
                        error => {
                          this.Erorr('Nije moguce očitati korisnike');           
                    });     
                  },
                error => { this.error = error
                  this.Erorr(this.error._body);    
      });
    }
  }

  MesecAdminProjekti(){
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

          this.adminservice.projekatKorisnici(this.ProjektiMesecAdmin,this.selectedProjektiAktivni,this.selectedGodinaProjektiAdmin)
                .subscribe(
                    projekatKorisnici => { this.projekatKorisnici = projekatKorisnici
                      
                      //Provera za gresku!!
                      //console.log(this.projekatKorisnici);

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
                                      brojacKor = 0;
                                      this.boja = 'blue';

                                    }else if(brKor <= this.detaljiKorisniciObject.length){

                                      this.saberi = Number(duzNed) + 1;
                                      objectKor['ime'] = this.detaljiKorisniciObject[brKor].Ime_Prezime
                                      objectKor['oznaka'] = this.detaljiKorisniciObject[brKor].Ime_Prezime + "" + this.saberi;
                                      this.boja = 'white';
                                    }

                                    this.detaljiNizObjKorisnik.push(objectKor);      
                              }
                            
                            }
                            // console.log(this.detaljiNizObjKorisnik);
                            for(let nz of this.neznamKakoDaNazovemObject){

                                let Kor = {};
                                Kor['Projekat'] = nz.x.ime;
                                for(let pr of this.detaljiNizObjKorisnik){

                                  Kor[pr.oznaka] = null;

                                }
                                this.pakovanjeDetalji.push(Kor);
                            }
                            //console.log(this.pakovanjeDetalji);

                          
                            for(let i in this.neznamKakoDaNazovemObject){
                              //console.log(this.neznamKakoDaNazovemObject[i].x.ime);
                            }

                            for(let i in this.neznamKakoDaNazovemObject){//ovde prolazi 5 puta
                            //for(let i = 0; i < 1 ; i++){   
                              for(let nz in this.projekatKorisnici){//ovde prolazi onoliko puta koliko smo dobili podataka iz baze
                                this.pakovanjeDetalji[i][this.projekatKorisnici[nz].Ime_Prezime + "" + this.projekatKorisnici[nz].nedelja] = this.projekatKorisnici[nz][this.neznamKakoDaNazovemObject[i].x.baza];
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
                          this.flgLoadingAdminTabela2 = true;
                        },
                        error => {
                          this.Erorr('Nije moguce očitati korisnike');           
                    });     
                  },
                error => { this.error = error
                  this.Erorr(this.error._body);    
          });
       }
  }

  KlikProjektiAdmin(){
    this.flgLoadingAdminTabela2 = false;
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

          this.adminservice.projekatKorisnici(this.ProjektiMesecAdmin,this.selectedProjektiAktivni,this.selectedGodinaProjektiAdmin)
                .subscribe(
                    projekatKorisnici => { this.projekatKorisnici = projekatKorisnici
                      
                      //Provera za gresku!!
                      //console.log(this.projekatKorisnici);

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
                                      brojacKor = 0;
                                      this.boja = 'blue';

                                    }else if(brKor <= this.detaljiKorisniciObject.length){

                                      this.saberi = Number(duzNed) + 1;
                                      objectKor['ime'] = this.detaljiKorisniciObject[brKor].Ime_Prezime
                                      objectKor['oznaka'] = this.detaljiKorisniciObject[brKor].Ime_Prezime + "" + this.saberi;
                                      this.boja = 'white';
                                    }

                                    this.detaljiNizObjKorisnik.push(objectKor);      
                              }
                            
                            }
                            // console.log(this.detaljiNizObjKorisnik);
                            for(let nz of this.neznamKakoDaNazovemObject){

                                let Kor = {};
                                Kor['Projekat'] = nz.x.ime;
                                for(let pr of this.detaljiNizObjKorisnik){

                                  Kor[pr.oznaka] = null;

                                }
                                this.pakovanjeDetalji.push(Kor);
                            }
                            //console.log(this.pakovanjeDetalji);

                          
                            for(let i in this.neznamKakoDaNazovemObject){
                              //console.log(this.neznamKakoDaNazovemObject[i].x.ime);
                            }

                            for(let i in this.neznamKakoDaNazovemObject){//ovde prolazi 5 puta
                            //for(let i = 0; i < 1 ; i++){   
                              for(let nz in this.projekatKorisnici){//ovde prolazi onoliko puta koliko smo dobili podataka iz baze
                                this.pakovanjeDetalji[i][this.projekatKorisnici[nz].Ime_Prezime + "" + this.projekatKorisnici[nz].nedelja] = this.projekatKorisnici[nz][this.neznamKakoDaNazovemObject[i].x.baza];
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
                          this.flgLoadingAdminTabela2 = true;
                        },
                        error => {
                          this.Erorr('Nije moguce očitati korisnike');           
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
                    this.popuniKorisniciAktivniAdmin(this.korisniciAktivni);

                  },
                  error => {
                      console.log("error")
                      this.Erorr('Nije moguce očitati korisnike!!');
                      /*localStorage.clear();
                      this.text = 'Došlo je do greške na serveru!!'
                      this.text_izlaz = 'Gotovo';
                      this.showDialog();*/
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
      //console.log(model, isValid);
      //console.log("this.filter" + this.filter)
      if(isValid){

        //console.log("Moze da se upise")
        //this.filter = "";
         //this.filter = "";
        this.adminservice.DodavanjeNovogProjekta(model.name)
            .subscribe(
                odgovorInsert => { this.odgovorInsert = odgovorInsert
                    console.log("Bravoo" + this.odgovorInsert)
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

                    this.MesecAdminProjekti();

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

      if(this.selectedDodavanjeKorisnikaNaProjekatKorisnik == '' || this.selectedDodavanjeKorisnikaNaProjekatProjekat == '' || this.selectedDodavanjeKorisnikaNaProjekatKorisnik == undefined || this.selectedDodavanjeKorisnikaNaProjekatProjekat == undefined)
      {
          console.log("Projekat");
          this.dodajProvera = false;
          

      }
      else{

          console.log("Popunjeno")!
          this.dodajProvera = true;

      }


      //this.ZastitaDodavanjeKorisnikaNaProjekat();
    }  
  }

  //***Dodavanje Korisnika na projekata!!!
  //Dodavanje korisnika na projekat
  ProverDropDown(){

    if(JSON.parse(localStorage.getItem('Token')) == null){

            console.log("Izlogovani ste!!");
            this.router.navigate(['/login']);
            return;

    } 
    else{

      //console.log("Ulaziii!!")
      if(this.selectedDodavanjeKorisnikaNaProjekatKorisnik == '' || this.selectedDodavanjeKorisnikaNaProjekatProjekat == '' || this.selectedDodavanjeKorisnikaNaProjekatKorisnik == undefined || this.selectedDodavanjeKorisnikaNaProjekatProjekat == undefined)
      {
          console.log("Projekat");
          this.dodajProvera = false;
          

      }
      else{

          console.log("Popunjeno")!
          this.dodajProvera = true;

      }

      //this.ZastitaDodavanjeKorisnikaNaProjekat();

      //Kada se odabere Korisnik on popuni dropdown sa odgovarajucim projektima
      this.ProbaDropDownFunkcija();
    }  
   
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
                      /*localStorage.clear();
                      this.text = 'Došlo je do greške na serveru!!'
                      this.text_izlaz = 'Gotovo';
                      this.showDialog();*/
      });
    } 

  }
  // ***Dodavanje Korisnika na projekata!!!
  //Snimanje Ili dodavanje projekta za datog korisnika
  Dodaj(){

    if(JSON.parse(localStorage.getItem('Token')) == null){

            console.log("Izlogovani ste!!");
            this.router.navigate(['/login']);
            return;

    }
    else{     
      if( this.selectedDodavanjeKorisnikaNaProjekatKorisnik == '' || this.selectedDodavanjeKorisnikaNaProjekatProjekat == '' || this.selectedDodavanjeKorisnikaNaProjekatKorisnik == undefined || this.selectedDodavanjeKorisnikaNaProjekatProjekat == undefined){

         this.dodajProvera = false;
         return;
         //this.dodajuspesno = ;

      }
      else{

          this.dodajProvera = true;
         //Dodato da posle pritiska na button dodaj se izprazni dropdown
         
         //this.Erorr("Uspešno ste dodali novi projekat.");
         
          this.adminservice.DodavanjeKorisnikaNaProjekat(this.selectedDodavanjeKorisnikaNaProjekatKorisnik, this.selectedDodavanjeKorisnikaNaProjekatProjekat,this.trenutnaGodinaDodavanje)
                .subscribe(
                    insert => { this.insert = insert

                        console.log("Bravoo" + this.insert)
                        //this.Erorr("Uspešno ste dodali novi projekat.");
                        //Poziva se funkcija koja refresuje tabelu Korisnik kada se doda projekat za odradjenog korisnika!!
                        //this.KlikKorisnikAdmin();
                        //Poziva se funkcija koja refresuje tabelu Projekti kada se doda projekat za odradjenog korisnika!!
                        this.KlikProjektiAdmin();

                        //this.dodajuspesno = 1; 
                        this.validDodaj = 'jeste';
                        this.selectedDodavanjeKorisnikaNaProjekatKorisnik = '';
                        this.selectedDodavanjeKorisnikaNaProjekatProjekat = '';
                        //this.selectedDodavanjeKorisnikaNaProjekatProjekat
                        //Ponovno popunjavanje dropdown jer je projekat dodat za korisnika i potrebo je osveziti dropdown
                        this.ProbaDropDownFunkcija();
                        //Da bi se dropdown sa projektima na kojima korisnik radi dopunio sa dodatim projektom!!
                        this.UklanjanjeDropDownFunkcija();
                        //this.Erorr(this.error._body);
                        this.displayUredu = true;
                        this.textPotvrda = 'Uredu';
                        this.textUpozorenje = 'Uspešno ste dodali projekat';
                        this.textObavestenje = "Obaveštenje!!";
                    },
                    error => {
                        console.log("error");
                        this.Erorr(this.error._body);
                        //localStorage.clear();
                        //this.text = 'Došlo je do greške na serveru!!'
                        //this.text_izlaz = 'Gotovo';
                        //this.showDialog();
          }); 
      }
    }

  }

  //***Uklanjanje korisnika sa projekta
  //Uklanjanje korisnika sa projekta
  ProveraVrednostiProjekataUklanjanje(){
   if(JSON.parse(localStorage.getItem('Token')) == null){

            console.log("Izlogovani ste!!");
            this.router.navigate(['/login']);
            return;

    }
    else{

      if(this.selectedUklanjanjeKorisnikaSaProjektaKorisnik == '' || this.selectedUklanjanjeKorisnikaSaProjektaProjekat == '' || this.selectedUklanjanjeKorisnikaSaProjektaKorisnik == undefined || this.selectedUklanjanjeKorisnikaSaProjektaProjekat == undefined)
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

      if(this.selectedUklanjanjeKorisnikaSaProjektaKorisnik == '' || this.selectedUklanjanjeKorisnikaSaProjektaProjekat == '' || this.selectedUklanjanjeKorisnikaSaProjektaKorisnik == undefined || this.selectedUklanjanjeKorisnikaSaProjektaProjekat == undefined){
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
  UklanjanjeDropDownFunkcija(){

    this.adminservice.PopunjavanjeDropDownUklanjanjeSaProjekta(this.selectedUklanjanjeKorisnikaSaProjektaKorisnik)
            .subscribe(
                projektiNaKojimaRadi => { this.projektiNaKojimaRadi = projektiNaKojimaRadi

                  //console.log("this.projektiNaKojimaRadi"+ this.projektiNaKojimaRadi)

                  //ovde se popunjava dopwdpwn sa korisniciAktivni
                  this.popuniProjektiAdminUklanjanjeSaProjekta(this.projektiNaKojimaRadi)

                },
                error => {
                    console.log("error");
                    this.Erorr('Za datog korisnika nije moguce ocitati projekte!!');
                    /*localStorage.clear();
                    this.text = 'Došlo je do greške na serveru!!'
                    this.text_izlaz = 'Gotovo';
                    this.showDialog();*/
     });
  }

  //***Uklanjanje korisnika sa projekta
  //Uklanjenje projekta za izabranog korisnika!!
  UklanjanjeKorisnikaSaProjekta(){

    /*console.log("selectedUklanjanjeKorisnikaSaProjektaKorisnik" + this.selectedUklanjanjeKorisnikaSaProjektaKorisnik);
    console.log("selectedUklanjanjeKorisnikaSaProjektaProjekat" + this.selectedUklanjanjeKorisnikaSaProjektaProjekat);*/

    if(JSON.parse(localStorage.getItem('Token')) == null){

            console.log("Izlogovani ste!!");
            this.router.navigate(['/login']);
            return;
    }
    else{

      if(this.selectedUklanjanjeKorisnikaSaProjektaKorisnik == '' || this.selectedUklanjanjeKorisnikaSaProjektaProjekat == '' || this.selectedUklanjanjeKorisnikaSaProjektaKorisnik == undefined || this.selectedUklanjanjeKorisnikaSaProjektaProjekat == undefined){
        this.proveraUspesnosti = false;
        return;
      }
      else{

        this.proveraUspesnosti = true;  
        this.displayUkloni = true;
        this.textUpozorenje = 'Prilikom uklanjanja svi podaci će biti izbrisani!!';
        this.textNe = 'Odustani';
        this.textPotvrda = 'Potvrda';
        this.textObavestenje = "Upozorenje!!"

        this.adminservice.BrisanjeKorisnikaSaProjekta(this.selectedUklanjanjeKorisnikaSaProjektaKorisnik,this.selectedUklanjanjeKorisnikaSaProjektaProjekat)
                .subscribe(
                    odgovorUklanjanje => { this.odgovorUklanjanje = odgovorUklanjanje

                      //console.log("this.projektiNaKojimaRadi"+ this.projektiNaKojimaRadi)

                      //Poziva se funkcija koja refresuje tabelu Korisnik kada se doda projekat za odradjenog korisnika!!
                      //this.KlikKorisnikAdmin();
                      //Poziva se funkcija koja refresuje tabelu Projekti kada se doda projekat za odradjenog korisnika!!
                      this.KlikProjektiAdmin();

                      this.selectedUklanjanjeKorisnikaSaProjektaKorisnik = "";
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
                    this.Erorr('Korisnika nije moguce ukloniti sa projekata!!');
                    /*localStorage.clear();
                    this.text = 'Došlo je do greške na serveru!!'
                    this.text_izlaz = 'Gotovo';
                    this.showDialog();*/
        });
      }
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
                                    this.KlikProjektiAdmin();

                                }
                                else{
                                  console.log("Ne brisi dropdown")
                                  this.KlikProjektiAdmin();
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
      this.selectedUklanjanjeKorisnikaSaProjektaKorisnik = "";
      this.selectedDodavanjeKorisnikaNaProjekatKorisnik = "";

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

                      this.KlikProjektiAdmin();
                      //Praznjenje dropdown-ova!!
                      //Praznjenje dropdown-ova gde se nalaze Korisnici nije potrebno jer je poziva funkcija this.imePrezimeAktivniFunkcija(); koja postavlja dropdown-ove na pocetne vrednosti!!
                      this.selectedUklanjanjeKorisnikaSaProjektaProjekat = "";
                      this.selectedDodavanjeKorisnikaNaProjekatProjekat = "";
                      //this.selectedProjektiAktivni = "";

                      //this.selectedAktivacija = "";
                      this.dodajuspesno = 1;
                      //this.flgAktivacija = 1;
                      //this.flgDeaktivacija = 1;

                     

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
          value: projekt.ProjektiAdmin
      })

      for(var i = 0; i <= projekti.length - 1; i++){
          //console.log("i" + korisnici[i].Ime_Prezime)
          this.projektiDropDown.push({ 
            label: projekti[i].Projekti ? projekti[i].Projekti : projekti[i].Projekti,
            value: projekti[i].Projekti});
      }
      //korisnik.Nadimak_Klijent = "";

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

    if( this.selectedDodavanjeKorisnikaNaProjekatKorisnik == undefined || this.selectedDodavanjeKorisnikaNaProjekatProjekat == undefined){

      console.log("undefined") 
      this.validDodaj = 'nije';
      this.dodajuspesno = 0;

    }
    else if(this.selectedDodavanjeKorisnikaNaProjekatKorisnik == "" || this.selectedDodavanjeKorisnikaNaProjekatProjekat == ""){

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

      this.selectedUklanjanjeKorisnikaSaProjektaKorisnik = "";
      this.selectedUklanjanjeKorisnikaSaProjektaProjekat = "";

  }

  IzlazPotvrda(){

    this.adminservice.BrisanjeKorisnikaSaProjekta(this.selectedUklanjanjeKorisnikaSaProjektaKorisnik,this.selectedUklanjanjeKorisnikaSaProjektaProjekat)
          .subscribe(
              odgovorUklanjanje => { this.odgovorUklanjanje = odgovorUklanjanje

                //console.log("this.projektiNaKojimaRadi"+ this.projektiNaKojimaRadi)

                //Poziva se funkcija koja refresuje tabelu Korisnik kada se doda projekat za odradjenog korisnika!!
                //this.KlikKorisnikAdmin();
                //Poziva se funkcija koja refresuje tabelu Projekti kada se doda projekat za odradjenog korisnika!!
                this.KlikProjektiAdmin();

                this.selectedUklanjanjeKorisnikaSaProjektaKorisnik = "";
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
