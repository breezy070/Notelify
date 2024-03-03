import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {confirmPasswordValidator} from '../../validator/confirmPassword.validator'
import { AuthService } from 'src/services/auth.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{


  fb = inject(FormBuilder);
  authService = inject(AuthService)
  router = inject(Router)

  registerForm !: FormGroup;

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    {
      validator: confirmPasswordValidator('password', 'confirmPassword')
    }
    );
  }

  register() {
    this.authService.registerService(this.registerForm.value).subscribe({
      next:(res)=>{
        alert("User Created ! ")
        this.registerForm.reset();
        this.router.navigate(['/']);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


}
