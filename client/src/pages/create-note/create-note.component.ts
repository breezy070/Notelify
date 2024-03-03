import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-note',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {

  authService = inject(AuthService)
  fb = inject(FormBuilder);
  addNoteForm !: FormGroup;
  router = inject(Router)

  ngOnInit(): void {
    this.addNoteForm = this.fb.group({
      title: ['',Validators.required],
      message: ['',Validators.required],
      tags:['',Validators.required],
    });
  }

  createNoteAction() {
    console.log(this.addNoteForm.value)
    this.authService.addSingleNote(this.addNoteForm.value).subscribe({
      next:(res)=>{
        alert("Note Created ! ")
        this.addNoteForm.reset();
        this.router.navigate(['home']);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
