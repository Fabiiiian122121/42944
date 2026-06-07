import { inject, Injectable, signal } from "@angular/core";
import { filter, ReplaySubject } from "rxjs";
import { Context, contextValidation } from "../app.component";

@Injectable({ providedIn: 'root' })
export class AppService {
  #jwt$: ReplaySubject<string> = new ReplaySubject<string>();
  #context$: ReplaySubject<Context> = new ReplaySubject<Context>();

  public errorMessage = signal(null);

  set jwt(token: string) {
    this.#jwt$.next(token);
  }

  set context(context: Context) {
    this.#context$.next(context);
  }

  get jwt$() {
    return this.#jwt$.asObservable();
  }

  get context$() {
    return this.#context$.asObservable();
  }
}
