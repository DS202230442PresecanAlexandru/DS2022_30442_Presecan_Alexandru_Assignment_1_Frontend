import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user/user";
import { environment } from "../environments/environment";
import { CookieService } from "ngx-cookie-service";
import { EnergyConsumption } from "../models/energy-consumption/energy-consumption";

@Injectable()
export class EnergyConsumptionService {

  private jsonOptions!: {};
  private textOptions!: {};

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {

    this.jsonOptions = {
      responseType: 'json',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + cookieService.get("token")
      })
    };

    this.textOptions = {
      responseType: 'text',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + cookieService.get("token")
      })
    };
  }

  public getEnergyConsumptions(deviceId: number, date: Date): Observable<EnergyConsumption[]> {
    return this.httpClient.get<EnergyConsumption[]>(environment.apiUrl + "/api/energyConsumption?" + "deviceId=" + deviceId + "&date=" + date, this.jsonOptions);
  }

  public getEnergyConsumptionById(id: number): Observable<EnergyConsumption> {
    return this.httpClient.get<EnergyConsumption>(environment.apiUrl + "/api/energyConsumption/" + id, this.jsonOptions);
  }

  public createEnergyConsumption(user: User): Observable<EnergyConsumption> {
    return this.httpClient.post<EnergyConsumption>(environment.apiUrl + "/api/energyConsumption", user, this.jsonOptions);
  }

  public updateEnergyConsumption(id: number, user: User): Observable<EnergyConsumption> {
    return this.httpClient.put<EnergyConsumption>(environment.apiUrl + "/api/energyConsumption/" + id, user, this.jsonOptions);
  }

  public deleteEnergyConsumption(id: number): Observable<string> {
    return this.httpClient.delete<string>(environment.apiUrl + "/api/energyConsumption/" + id, this.textOptions);
  }
}
