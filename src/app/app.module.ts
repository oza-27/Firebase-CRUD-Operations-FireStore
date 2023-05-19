import { ToastrModule } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteComponent } from './components/note/note.component';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component'
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { TableComponent } from './components/table/table.component';
import { PhoneComponent } from './components/phone/phone.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    LoginComponent,
    SignupComponent,
    VerifyEmailComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    TableComponent,
    PhoneComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireAuthModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule, 
    ToastrModule.forRoot()
  ],
  providers: [
    provideAnimations(), // required animations providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
