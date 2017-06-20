import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params,Router }   from '@angular/router';

@Component({
  selector: 'app-footer-ostalo',
  templateUrl: './footer-ostalo.component.html',
  styleUrls: ['./footer-ostalo.component.css']
})
export class FooterOstaloComponent implements OnInit {

  constructor(private router: Router,
      private route: ActivatedRoute,
  
  ) { }

  ngOnInit() {
  }

  Nazad(){

    this.router.navigate(['/firstpage']);

  }

}
