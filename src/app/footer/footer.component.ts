import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Params,Router }   from '@angular/router';
import { SService } from '../s.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  nadimak:any;
  fullname_baza:any;
  disableValue:number;

  //Token
  base64Url:any;
  base64:any;
  ispisToken:any;
  tokenAdmin:string;
  fullImagePath: string;
  flgDrop:boolean = false;
  brKlik:number = 0;

  constructor(private router: Router,
              private sservice :SService            
  ) { 

   

  }

  ngOnInit() {

    
    //Provera iz Tokena da li je admin ili nije!!
    if(JSON.parse(localStorage.getItem('Token')) == null){

       this.router.navigate(['/login']);
       return; 

    }
    this.tokenAdmin = this.ParsirajJWT(JSON.parse(localStorage.getItem('Token')));
    //console.log("tokenAdmin" + this.tokenAdmin);

    this.disableValue = 0;

    this.nadimak = JSON.parse(localStorage.getItem('currentUser'));
    //console.log("this.nadimak" + this.nadimak)
    this.sservice.fullName(this.nadimak)
            .then(
                    fullname_baza => { this.fullname_baza= fullname_baza
                     // console.log("this.fullname_baza" + this.fullname_baza)

                    },
                    error => {
                        console.log("error")
    }); 
  }

  prikazDropDowna(){

    this.brKlik++;
    if(this.flgDrop == false){
      this.flgDrop = true;
    }
    else{
      this.flgDrop = false;
    }

  }

  @HostListener('document:click', ['$event'])
  public documentClick(event: Event): void {

    this.brKlik++;
    if(this.brKlik == 2){
      this.brKlik = 0;
    }
    else if(this.brKlik == 1){
      this.brKlik = 0;
      this.flgDrop = false;
    }
  }


  ParsirajJWT (token) {

		this.base64Url = token.split('.')[1];
    this.base64 = this.base64Url.replace('-', '+').replace('_', '/');
		this.ispisToken = JSON.parse(window.atob(this.base64));
    
		return this.ispisToken.admin;

	}


  Odjava(){

     localStorage.clear();
     this.router.navigate(['/login']); 
  }

  Tabela(){
     this.router.navigate(['/tabela']); 
  }

  Admin(){
     this.router.navigate(['/admin']); 
  }

  Lozinka(){
     this.router.navigate(['/lozinka']); 
  }
  
}
