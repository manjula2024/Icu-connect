import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // BASE_PATH: 'http://localhost:9010'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
  public userName: String;
  public passWord: String;
  user: any;


  constructor(
    private http: HttpClient) { }

  authentication(username: String, password: String) {
    
    return this.http.get(`http://localhost:9010/login`,
    { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
      this.userName = username;
      this.passWord = password;
      this.registerSuccessfulLogin(username, password);
    }));
  }
  registerSuccessfulLogin(username, password) {
    this.user = username;
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
  }

  logOut() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    
    sessionStorage.clear();
    this.userName = null;
    this.passWord = null;
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
