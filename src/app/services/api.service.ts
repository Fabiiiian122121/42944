import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class ApiService {
  #http = inject(HttpClient);

  public get() {
    return this.#http.get('https://nexus-gateway.gritmo.com/nexus-widget-api/sprawdzam');
  }
}
