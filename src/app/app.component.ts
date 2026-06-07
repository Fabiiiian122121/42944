import { Component, inject, Input } from '@angular/core';
import { AppService } from "./services/app.service";
import { AsyncPipe } from "@angular/common";
import { NoContext } from "./components/no-context";
import { WidgetContentComponent } from "./components/analytics-component/widget-content.component";
import { WidgetError } from "./components/widget-error";
import { ApiService } from "./services/api.service";

export interface Context {
  schema: string;
  table: string;
}

export const contextValidation = (context: Context): boolean => {
  return !!(context?.schema && context?.table);
}

@Component({
  selector: 'widget-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    AsyncPipe,
    NoContext,
    WidgetContentComponent,
    WidgetError,
  ]
})
export class AppComponent {
  public appService = inject(AppService);
  public apiService = inject(ApiService);

  public errorMessage = this.appService.errorMessage;

  @Input()
  public set context(context: Context) {
    this.appService.errorMessage.set(null);
    this.appService.context = context;
  }

  @Input()
  public set jwt(jwt: string) {
    this.appService.jwt = jwt;
  }

  public contextValidation = contextValidation;

  public get$ = this.apiService.get();
}
