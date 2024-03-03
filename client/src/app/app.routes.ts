import { Routes } from '@angular/router';
import { LoginComponent } from 'src/pages/login/login.component';
import { RegisterComponent } from 'src/pages/register/register.component';
import { HomeComponent } from 'src/pages/home/home.component';
import { ProfileComponent } from 'src/pages/profile/profile.component';
import { NotePageComponent } from 'src/pages/note-page/note-page.component';
import { CreateNoteComponent } from 'src/pages/create-note/create-note.component';
import { AuthGuard } from 'src/services/auth.guard';
import { ForgetPasswordComponent } from 'src/pages/forget-password/forget-password.component';
import { ResetComponent } from 'src/pages/reset/reset.component';

export const routes: Routes = [
    {
        path: '', pathMatch:"full", component: LoginComponent
    },
    {
        path: 'signup', pathMatch:"full", component: RegisterComponent
    },
    {
        path: 'home', pathMatch:"full", component: HomeComponent, canActivate: [AuthGuard]
    },
    {
        path: 'profile', pathMatch:"full", component: ProfileComponent, canActivate: [AuthGuard]
    },
    {
        path: 'notepage/:id', pathMatch:"full", component: NotePageComponent, canActivate: [AuthGuard]
    },
    {
        path: 'addnote', pathMatch:"full", component: CreateNoteComponent, canActivate: [AuthGuard]
    },
    {
        path: 'forget-password', pathMatch:"full", component: ForgetPasswordComponent, canActivate: [AuthGuard]
    },
    {
        path: 'reset/:token', pathMatch:"full", component: ResetComponent, canActivate: [AuthGuard]
    }
];
