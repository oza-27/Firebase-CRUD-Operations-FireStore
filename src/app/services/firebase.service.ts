import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { GithubAuthProvider } from 'firebase/auth';
@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    isLogedIn: boolean = false   
    constructor(public fa: AngularFireAuth, private route: Router, private toastr: ToastrService) { }
    // for login
    login(email: string, password: string) {
        this.fa.signInWithEmailAndPassword(email, password).then(res => {
            this.isLogedIn = true;
            localStorage.setItem('user', JSON.stringify(res.user));
            this.route.navigate(['/dashboard']);
            this.toastr.success('Login Successfully:');
          
        }).catch((err) => {
            if (err.code == "auth/invalid-email") {
                this.toastr.error("Invalid Email Id");
                this.route.navigate(['/login'])
            }
            debugger
            if (err.code == "auth/invalid-password") {
                this.toastr.error("Wrong Password!Try again");
                this.route.navigate(['/login'])
            }
        })
    }

    // sending message for verification
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
            
            // adding fields 
            return user.updateProfile({
                displayName: username
            })
        }, error => {
            if (error.code == "auth/email-already-in-use") {
                this.toastr.error("Email already exists!Please register with new mail:")
            }
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

    // signin with Github
    githubAuth(){
        var provider = this.authGithub(new GithubAuthProvider())
    }

    authGithub(provider:any){
        return this.fa.signInWithPopup(provider)
        .then((result) =>{
            alert("You are successfully logged in")
            this.route.navigate(['/dashboard'])
        }).catch((error) =>{
            this.route.navigate(['/login'])
        })
    }

}
