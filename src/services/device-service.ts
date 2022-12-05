import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Device } from "../models/device/device";
import { environment } from "../environments/environment";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class DeviceService {

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

  public getDevices(): Observable<Device[]> {
    return this.httpClient.get<Device[]>(environment.apiUrl + "/api/device", this.jsonOptions);
  }

  public getDeviceById(id: number): Observable<Device> {
    return this.httpClient.get<Device>(environment.apiUrl + "/api/device/" + id, this.jsonOptions);
  }

  public getDevicesByUserId(id: number): Observable<Device[]> {
    return this.httpClient.get<Device[]>(environment.apiUrl + "/api/device?userId=" + id, this.jsonOptions);
  }

  public createDevice(device: Device): Observable<Device> {
    return this.httpClient.post<Device>(environment.apiUrl + "/api/device", device, this.jsonOptions);
  }

  public updateDevice(id: number, device: Device): Observable<Device> {
    return this.httpClient.put<Device>(environment.apiUrl + "/api/device/" + id, device, this.jsonOptions);
  }

  public deleteDevice(id: number): Observable<string> {
    return this.httpClient.delete<string>(environment.apiUrl + "/api/device/" + id, this.textOptions);
  }

  public userDeviceMapping(userId: number, deviceId: number): Observable<string> {
    return this.httpClient.put<string>(environment.apiUrl + "/api/device/mapping?userId=" + userId + "&deviceId=" + deviceId, "", this.textOptions);
  }
}
