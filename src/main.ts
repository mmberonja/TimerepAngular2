//import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { provide } from '@angular/core';
//import { disableDeprecatedForms, provideForms } from '@angular/forms';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
/*import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';*/

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
