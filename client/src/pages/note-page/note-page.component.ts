import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './note-page.component.html',
  styleUrls: ['./note-page.component.css']
})
export class NotePageComponent implements OnInit {

  noteId: any;
  note: any;
  editMode = false;
  router = inject(Router)

  constructor(private route: ActivatedRoute, private authService: AuthService, private fb: FormBuilder) {}

  // fb = inject(FormBuilder);
  editNoteForm !: FormGroup;



  ngOnInit(): void {
    this.editNoteForm = new FormGroup({
      title: new FormControl(),
      message: new FormControl()
    });
    // Use ActivatedRoute to get parameters from the URL
    this.route.params.subscribe(params => {
     //store the id
      this.noteId = params['id'];

      //use this.noteId in your service
      this.authService.getSingleNoteService(this.noteId).subscribe(res => {
        //note actions
        // console.log(note.data);
        this.note = res.data;
        console.log(this.note)

        this.editNoteForm = this.fb.group({
          title: [this.note.title, Validators.required],
          message: [this.note.message, Validators.required],
        });
        this.editNoteForm.disable();

      });
    });


  }

  toggleEditMode() {
    if (this.editNoteForm.enabled) {
      this.editNoteForm.disable();
      this.editMode = false
      console.log(this.editMode)
    } else {
      this.editNoteForm.enable();
      this.editMode = true
      console.log(this.editMode)
    }
  }

  editNoteAction() {
    
    this.authService.updateSingleNote(this.noteId, this.editNoteForm.value).subscribe({
      next:(res)=>{
        alert("Note Updated ! ")
        this.editMode = false;
        this.editNoteForm.disable();
       
        console.log(res)
        // this.editNoteForm.reset();
        // this.router.navigate(['home']);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
