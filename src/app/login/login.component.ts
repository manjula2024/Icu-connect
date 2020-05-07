import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import {  MatDialog } from '@angular/material/dialog';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  loginForm: FormGroup;
 
  submitted = false;
  username: String;
  password: String;
  message: any;
  error = '';
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: UserServiceService,
    private dialog: MatDialog,
    private router: Router, private Authservice: AuthService) { }

  ngOnInit() {
    if (this.Authservice.isUserLoggedIn()) {
      //this.Authservice.enableHistory=this.enableReferPatient;
      this.router.navigate(["/"]);
    }
    this.loginForm = this.formBuilder.group({
      Username: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required)
    });
  }
  get fval() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
     
      let resp = this.Authservice.authentication(this.username, this.password);
      resp.subscribe(data => {
        this.Authservice.registerSuccessfulLogin(this.username, this.password);
        // this.service.userDetails = data;
        this.invalidLogin = false;
        this.loginSuccess = true;
        this.successMessage = 'Login Successful.';
        this.message = data;
        this.router.navigate(["user/menu"])
      }, () => {
        this.invalidLogin = true;
        this.loginSuccess = false;
      });
    }
  }

 
 

}
