import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  authService = inject(AuthService);
  isLoggedIn: boolean = false;
  notes: any[] = [];
  favoriteNotes: any[] = []
  favoriteMode: boolean = false
  taggedNotes: any[] = []
  tagMode: boolean = false
  noteId: any[] = [];
  tag: any;
  id: any;
  filteredNotes: any[] = [];
  selectedFilter: string = 'all';

  favoriteNoteId$ = new BehaviorSubject<string | null>(null);


  tagInput: string = '';


  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(res=> {
      this.isLoggedIn = this.authService.isLoggedIn();
    })

    // if (this.selectedFilter === 'all') {
    //   this.getAllNotes()
    // }else{
    //   this.getAllFavoriteNotes();
   
    // }
    
    // this.getAllFavoriteNotes();

    this.getAllNotes();
    // this.getAllFavoriteNotes();

  }

  getFavoriteNoteId$() {
    return this.favoriteNoteId$.asObservable();
  } 

  filterNotes(): void {
    switch (this.selectedFilter) {
      case 'all':
        this.favoriteMode = true
        this.tagMode = false
        this.getAllNotes();
        console.log("ordering by all notes")
        break;
      case 'recent':
        this.favoriteMode = false
        this.tagMode = false
        this.notes.sort((a,b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
        console.log("ordering by ascending date")
        break;
      case 'oldest':
        this.favoriteMode = false
        this.tagMode = false
        this.notes.sort((a,b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
        console.log("ordering by descending date")
        break;
      case 'favorites':
        // this.favoriteNotes = this.notes.filter((note) => note.isFavorite)
        // this.notes = this.notes.filter((note) => note.isFavorite);
        this.favoriteMode = true
        this.tagMode = false
        this.getAllFavoriteNotes();
        
        break;
      default:
        // Handle other cases or set a default behavior
        // this.getAllNotes();
        break;
    }
  }

  toggleFavorite(id: any) {
   
    const note = this.notes.find((n)=> n._id === id)
   

    if (note) {
      
      this.favoriteNoteId$.next(note.isFavorite ? id : null)
      note.isFavorite = !note.isFavorite;
      console.log(note)
      console.log(id)

      this.authService.updateSingleNote(id, note).subscribe(res => {
        alert("note updated !")
        //reload all notes again 
        // this.filterNotes();
        // this.getAllNotes();
        
      })

      
    }


  }

  username = localStorage.getItem("username");
  user_id = localStorage.getItem("user_id");

  getAllNotes() {
    this.authService.getAllNotesService().subscribe(res => {
      this.favoriteMode = false
      this.tagMode = false
      this.notes = res;
      console.log(res)
    
    //grabbing each notes ID
    this.notes.forEach(note => {
      this.noteId = note._id;
      // Do something with the noteId, for example, store it in an array or perform other operations
      console.log('Note ID:', this.noteId);
    });
    })
  }

  getAllFavoriteNotes() {
    this.authService.getAllFavoriteNotesService().subscribe(res => {
      this.favoriteMode = true
      this.tagMode = false
      this.favoriteNotes = res;
      console.log(res)
      // this.favoriteNotes = this.favoriteNotes.filter((favoriteNote) => favoriteNote.isFavorite);
      // this.notes = this.favoriteNotes;
      
    
  
    })
    
  }
 
  searchByTag(tagInput: any) {
    // this.authService.getNotesByTagService(tag).subscribe(res => {
    //   // this.favoriteMode = true
    //   // this.favoriteNotes = res;
    //   // console.log(res)
    //   this.notes = res;
    //   console.log("searching by: " + tag)
      // this.favoriteNotes = this.favoriteNotes.filter((favoriteNote) => favoriteNote.isFavorite);
      // this.notes = this.favoriteNotes;

      this.authService.getNotesByTagService(tagInput).subscribe((filteredNotes) => {
        this.tagMode = true
        this.notes = filteredNotes;
      
    
  
    })
  }
 


  deleteNote(noteId: any) { 
    this.authService.deleteSingleNote(noteId).subscribe(res => {
      alert("note deleted !")
      //reload all notes again 
      this.getAllNotes();
    })
  }

  logout() {
    this.tagMode = false
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this.authService.isLoggedIn$.next(false);
  }

}
