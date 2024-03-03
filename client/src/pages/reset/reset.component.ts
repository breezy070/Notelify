import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { confirmPasswordValidator } from 'src/validator/confirmPassword.validator';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {


  resetForm!: FormGroup;
  fb = inject(FormBuilder)
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)
  authService = inject(AuthService)

  token !: string

  ngOnInit(): void {
    this.resetForm = new FormGroup({
      password: new FormControl(),
      Confirmpassword: new FormControl()
    });

    this.resetForm = this.fb.group({
      password: ['', Validators.required],
      Confirmpassword: ['', Validators.required]
    },
    {
      validator: confirmPasswordValidator('password', 'Confirmpassword')
    });

    this.activatedRoute.params.subscribe(val => {
      //this val value must be teh same as set on the api route
      this.token = val['token'];
      console.log(this.token)
    })
  }

  reset() {
    let resetObj = {
      token: this.token,
      password: this.resetForm.value.password
    }
    this.authService.resetPasswordService(resetObj).subscribe({
      next: (res) => {
        alert(res.message);
        this.resetForm.reset();
        this.router.navigate(['/'])
      },
      error: (err) => {
        alert(err.error.message)
      }
    })
  }
}
