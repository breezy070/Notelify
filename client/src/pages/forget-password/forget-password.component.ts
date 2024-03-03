import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {


  forgetPwForm !: FormGroup;
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.forgetPwForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    })
  }

  submit() {
    this.authService.sendEmailService(this.forgetPwForm.value.email).subscribe({
      next: (res) => {
        alert(res.message);
        this.forgetPwForm.reset();
      },
      error: (err) => {
        alert(err.error.message)
      }
    })
  }
}
