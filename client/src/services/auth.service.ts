import { Injectable, inject } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { apiUrls } from 'src/app/api.urls';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // constructor() { }

  http = inject(HttpClient);

  //service for behavior subject
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  



  //auth services
  registerService(registerObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}register`, registerObj);
  }

  loginService(loginObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}login`, loginObj);
  }

  //send email services
  sendEmailService(email: string) {
    return this.http.post<any>(`${apiUrls.authServiceApi}send-email`, {email: email});
  }

  resetPasswordService(resetObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}reset-password`, resetObj);
  }





  isLoggedIn() {
    // "!!"" means true or false based on whats inside the parentheses

    return !!localStorage.getItem("token");
  }

  // setToken() {
  //   window.localStorage.setItem('token', )
  // }

  // getToken() {

  //   console.log(window.localStorage.getItem('token'))
  //   return window.localStorage.getItem('user_id')
    
  // }


 
    //notes services
    getAllNotesService() {
      return this.http.get<any>(`${apiUrls.noteServiceApi}`)
    }

    getSingleNoteService(noteId: any) {
      return this.http.get<any>(`${apiUrls.noteServiceApi}${noteId}`)
    }

    getAllFavoriteNotesService() {
      return this.http.get<any>(`${apiUrls.noteServiceApi}favorites`)
    }

    getNotesByTagService(tag: string) {
      return this.http.get<any>(`${apiUrls.noteServiceApi}/filter?tag=${tag}`);
    }

    addSingleNote(noteObj: any) {
      return this.http.post<any>(`${apiUrls.noteServiceApi}createnote`, noteObj);
    }

    deleteSingleNote(noteObj: any) {
      return this.http.delete<any>(`${apiUrls.noteServiceApi}deletenote/${noteObj}`)
    }

    updateSingleNote(noteId: any, updatedNoteData: any) {
      return this.http.put<any>(`${apiUrls.noteServiceApi}editnote/${noteId}`, updatedNoteData)
    }

 




    //user services
    getUserByIdService(userId: any) {
      return this.http.get<any>(`${apiUrls.userServiceApi}${userId}`)
    }
}
