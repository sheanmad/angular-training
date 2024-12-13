import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  login(){
    this.isLoggedIn = true;
    console.log('Log in')
  }
  logout(){
    this.isLoggedIn = false;
    console.log('log out')
  }
  getStatus(){
    return this.isLoggedIn;
  }
  constructor() { }
}
