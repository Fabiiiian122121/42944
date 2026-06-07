import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

if (environment.production) {
  enableProdMode();
}

(async () => {
  const app = await createApplication(appConfig);

  // Define custom element
  const PopupElement = createCustomElement(AppComponent, { injector: app.injector});
  customElements.define(environment.htmlTagName, PopupElement);
})();
