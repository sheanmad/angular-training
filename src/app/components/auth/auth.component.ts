import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: false,
  
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLoginMode: boolean = true;
  email: string = '';
  password: string = '';
  
  constructor(private authService: AuthService, private router: Router) { }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(): void{
    if(!this.email || !this.password){
      alert('Please enter email and password');
      return;
    }

    if(this.isLoginMode){
      this.authService.login(this.email, this.password).then(
        () => {
          this.router.navigate(['/pokemon']);
        },
        (error)=>{
          console.log(error);
          alert('Login Failed! Please check your credentials.');
        }
      )
    }else{
      this.authService.register(this.email, this.password).then(
        () => {
          this.isLoginMode = true;
        },
        (error)=>{
          console.log(error);
        }
      )
    }
  }
}
