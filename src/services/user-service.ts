import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user/user";
import { UserAuthentication } from "../models/user/user -authentication";
import { UserDisplay } from "../models/user/user-display";
import { apiUrl } from "../environments/environment";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class UserService {

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

  public getUsers(): Observable<UserDisplay[]> {
    return this.httpClient.get<UserDisplay[]>(apiUrl + "/api/user", this.jsonOptions);
  }

  public getUserById(id: number): Observable<UserDisplay> {
    return this.httpClient.get<UserDisplay>(apiUrl + "/api/user/" + id, this.jsonOptions);
  }

  public createUser(user: User): Observable<UserDisplay> {
    return this.httpClient.post<UserDisplay>(apiUrl + "/api/user", user, this.jsonOptions);
  }

  public updateUser(id: number, user: User): Observable<UserDisplay> {
    return this.httpClient.put<UserDisplay>(apiUrl + "/api/user/" + id, user, this.jsonOptions);
  }

  public deleteUser(id: number): Observable<string> {
    return this.httpClient.delete<string>(apiUrl + "/api/user/" + id, this.textOptions);
  }

  public authenticateUser(user: User): Observable<UserAuthentication> {
    return this.httpClient.post<UserAuthentication>(apiUrl + "/api/user/authenticate", user);
  }

  public isAuthenticated(): Observable<boolean> {
    return this.httpClient.get<boolean>(apiUrl + "/api/user/isAuthenticated", this.textOptions);
  }
}
