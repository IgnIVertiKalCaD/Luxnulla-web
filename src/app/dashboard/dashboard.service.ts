import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { inject } from "@angular/core/primitives/di";
import { Observable } from "rxjs";
import {XrayClientConfig} from "./types/rdo/configs.rdo";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  private readonly http = inject(HttpClient);

  getConfigs(): Observable<readonly XrayClientConfig[]> {
    return this.http.get<XrayClientConfig[]>("/configs");
  }

  createConfigsFromUrl(req: string): Observable<XrayClientConfig[]> {
    return this.http.get<XrayClientConfig[]>("/configs");
  }
}
