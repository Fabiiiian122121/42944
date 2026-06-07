import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ApiInterceptor } from "./interceptors/api.interceptor";
import { provideAnimations } from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptors([
      ApiInterceptor
    ])),
    importProvidersFrom(
      OverlayModule,
    ),
  ],
};
