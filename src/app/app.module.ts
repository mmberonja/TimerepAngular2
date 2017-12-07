import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule,Routes } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { OpaqueToken } from '@angular/core';

import { AppComponent } from './app.component';
import { MickoComponent } from './micko/micko.component';
import { HomeComponent } from './home/home.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { AuthenticationService } from './authentication.service';
import { SService } from './s.service';
import { ServiceTabela } from './service.tabela';

import { ButtonModule,DialogModule } from 'primeng/primeng';
import { ConfirmDialogModule,ConfirmationService } from 'primeng/primeng';
import { DataTableModule,SharedModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { SpinnerModule } from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { FooterComponent } from './footer/footer.component';
import { TabelaComponent } from './tabela/tabela.component';

import { FooterOstaloComponent } from './footer-ostalo/footer-ostalo.component';
import { AdminComponent } from './admin/admin.component';
import { AdminService } from './admin.service';
import { LozinkaComponent } from './lozinka/lozinka.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { CustomFormsModule } from 'ng2-validation';
import { RegistracijaService } from './registracija.service';
import { HeaderComponent } from './header/header.component';
import { LozinkaService } from './lozinka.service';
import { LocationStrategy,HashLocationStrategy} from '@angular/common';
import { environment } from '../environments/environment';
//import { provide } from '@angular/platform-browser-dynamic';;



@NgModule({
  declarations: [
    AppComponent,
    MickoComponent,
    HomeComponent,
    PocetnaComponent,
    FooterComponent,
    TabelaComponent,
    FooterOstaloComponent,
    AdminComponent,
    LozinkaComponent,
    RegistracijaComponent,
    HeaderComponent,
    
  ],
  imports: [
    BrowserModule,ReactiveFormsModule,CustomFormsModule,
    FormsModule,AutoCompleteModule,
    HttpModule,InputTextModule,
    ButtonModule,DropdownModule,
    DialogModule,SpinnerModule,
    ConfirmDialogModule,CalendarModule,
    DataTableModule,SharedModule,
    //NgxDatatableModule,
    //MdButtonModule, MdCheckboxModule,
    //NgxDatatableModule,
    RouterModule.forRoot([
      {
        path: 'login',
        component: HomeComponent
      },
      {
        path: 'firstpage',
        component: PocetnaComponent
      },
      {
        path: 'tabela',
        component:  TabelaComponent
      },
      {
        path: 'admin',
        component:  AdminComponent
      },
      {
        path: 'lozinka',
        component:  LozinkaComponent
      },
      {
        path: 'registracija',
        component:  RegistracijaComponent
      },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
    ])
  ],
  providers: [AuthenticationService,ConfirmationService,SService,ServiceTabela,AdminService,RegistracijaService,LozinkaService, {provide: 'ApiEndpoint', useValue:  environment.web},{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {

    message:any;

     constructor(//private router: Router,
      //private route: ActivatedRoute,
      private sservice: SService
    ) {

     

    }

    ngOnInit() {

      //console.log("Micko")
        /*Observable
            .interval(5000)//u milisekundama,36000 milisekundi je 60minuta ili 1h!!
            .take(24).map((x) => x+1)
            .subscribe((x) => {
              this.message = x;

              console.log("Usaoooooooooooooooooooooooooooooooo");         
          });*/
    }

 }
