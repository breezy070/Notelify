import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  authService = inject(AuthService);
  users: any = [];
  userId = localStorage.getItem("user_id");
  
  ngOnInit(): void {

    this.authService.getUserByIdService(this.userId).subscribe(res => {
      this.users = res.data
      console.log(this.users)
      console.log(this.userId)
  })

  }
}
