import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NoteserviceService {



  private favoriteNoteId$ = new BehaviorSubject<string | null>(null);

  

  constructor() { }
}
