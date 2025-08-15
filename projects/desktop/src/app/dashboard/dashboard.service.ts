import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { inject } from "@angular/core/primitives/di";
import { Observable } from "rxjs";
import { ConfigRdo } from "./types/rdo/configs.rdo";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  private readonly http = inject(HttpClient);

  getConfigs(): Observable<readonly ConfigRdo[]> {
    return this.http.get<ConfigRdo[]>("/subs");
  }
}
