import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  
  // BASE_PATH: 'http://localhost:9010'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public username: String;
  public password: String;
  user: any;

  constructor(
    private http: HttpClient) { }

  userAuthenticate(username: String, password: String) {
    return this.http.get(`http://localhost:9010/login`,
      { headers:{ 'X-Requested-With': 'XMLHttpRequest', authorization: this.createBasicAuthToken(username, password) } })

    }
    registerSuccessfulLogin(username, password) {
    this.user = username;
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
  }

  logOut() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.clear();
    this.username = null;
    this.password = null;
  }

  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }
}
