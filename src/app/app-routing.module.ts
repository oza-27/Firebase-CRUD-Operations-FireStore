import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteComponent } from './components/note/note.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: "", component: LoginComponent },
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:"note",component:NoteComponent, canActivate:[AuthGuard]},
  { path:"verify-email-address",component:VerifyEmailComponent},
  {path:"forgot-password",component:ForgotPasswordComponent, canActivate:[AuthGuard]},
  {path:"dashboard",component:DashboardComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
