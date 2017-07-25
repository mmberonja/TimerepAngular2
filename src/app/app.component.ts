import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params,Router }   from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { SService } from './s.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Micko!';

  web:any;
  token:any;
  cuvaj:any;
  message:number;
  proveraTokena:any  = [{}];
  //NizBaza:any = [{}];

  constructor(private router: Router,
      private route: ActivatedRoute,
      private sservice: SService
    ) {

      if(window.onhashchange){
        console.log("window.onhashchangeIf")
      } 

  }

  ngOnInit() {

    /*Observable
          .interval(5000)//u milisekundama,36000 milisekundi je 60minuta ili 1h!!
          .take(24).map((x) => x+1)
          .subscribe((x) => {
            this.message = x;

            console.log("Usaoooooooooooooooooooooooooooooooo");         
    });*/

    this.web = 'http://localhost:4200/'
    this.token = JSON.parse(localStorage.getItem('Token'));
    this.cuvaj = document.location;

    if(this.token != null && (this.cuvaj == this.web + 'login')){

      console.log("Ima token!!")
      this.router.navigate(['/firstpage']);
      console.log("history.length" + history.length);

    }
    else if(this.token == null){

      console.log("Nema tokena!!!")
      this.router.navigate(['/login']);

    }
    else{

      console.log("Nista od navedenog!!")

    }

  }

}
