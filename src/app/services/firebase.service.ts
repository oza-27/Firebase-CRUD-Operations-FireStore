import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    isLogedIn: boolean = false
    constructor(public fa: AngularFireAuth, private route: Router) { }

    // for login
    login(email: string, password: string) {
        this.fa.signInWithEmailAndPassword(email, password).then(res => {
            this.isLogedIn = true;
            localStorage.setItem('user', JSON.stringify(res.user));
            this.route.navigate(['/note'])
        }, err => {
            alert("something went wrong");
            this.route.navigate(['/login'])
        })
    }

    public sendVerificationMail(){
        return this.fa.currentUser.then((u:any) => 
            u.sendVerificationMail()).then(()=>{
                this.route.navigate(['/verify-email-address'])
            })
    }

    // for registration
    register(email: string, password: string, username:string) {
        this.fa.createUserWithEmailAndPassword(email, password).then((data) => {
            const user = data.user;
            this.sendVerificationMail();
            this.route.navigate(['/login']);
            alert("Registration successfull");
            return user?.updateProfile({
                displayName: username
            })
        }, error => {
            alert("Something went wrong");
        });
    }

    // for logout
    logout() {
        this.fa.signOut().then(() => {
            localStorage.removeItem('user')
            this.route.navigate(['/login'])
        }, error => {
            alert("Something went wrong:/");
        })
    }

   authLogin(provider:any){
    return this.fa.signInWithPopup(provider).then((result)=>{
        alert("You are successfully logged in")
        this.route.navigate(['/note'])
    })
   }
    googleAuth(){
        return this.authLogin(new GoogleAuthProvider())
    }

    // for forgot-password
    ForgotPassword(passwordReset:string){
        this.fa.sendPasswordResetEmail(passwordReset).then(()=>{
            alert("Password reset mail sent! Check your mail Inbox");
        }).catch((error)=>{
            alert("error");
        })
    }
}
