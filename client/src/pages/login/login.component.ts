import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  authService = inject(AuthService)
  router = inject(Router)

  loginForm !: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    }
    );
  }

  login() {
    
    this.authService.loginService(this.loginForm.value).subscribe({
      next: (res) => {
        alert("Login Succesful !");
        localStorage.setItem("user_id", res.data._id);
        localStorage.setItem("token", res.token);
        localStorage.setItem("username", res.data.userName);
        this.authService.isLoggedIn$.next(true);
        this.router.navigate(['home']);
        this.loginForm.reset;
        console.log(res.token)
        console.log(res.data)
     
      },
      error:(err)=> {
        console.log(err)
        console.log(err.error.message)
      }
    })
  }
}
