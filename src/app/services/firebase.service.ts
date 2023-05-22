import { IUser } from 'src/app/IUser';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { GithubAuthProvider } from 'firebase/auth';
import { Firestore, collection, doc, collectionData, addDoc } from '@angular/fire/firestore';
import { sendSignInLinkToEmail, getAuth } from 'firebase/auth';
@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    usersList:IUser;
    isLogedIn: boolean = false   
    constructor(public fa: AngularFireAuth, private route: Router, private toastr: ToastrService, private fs:Firestore) { }
    // for login
    login(email: string, password: string, user:IUser) {
        this.fa.signInWithEmailAndPassword(email, password).then(res => {
            this.isLogedIn = true;
            localStorage.setItem('user', JSON.stringify(res.user));
            this.route.navigate(['/dashboard']);
            this.toastr.success('Login Successfully:');
        }).catch((err) => {
            if (err.code == "auth/invalid-email") {
                this.toastr.error("Invalid Email Id");
                this.route.navigate(['/login'])
            } else if (err.code == "auth/invalid-password")
            {
                this.toastr.error('Wrong Password!Try again');
                this.route.navigate(['/login'])
            } else{
                this.toastr.error("Email or Password doesnot match");
            }
        })
    }


    // for registration
    register(users:IUser) {
        this.fa.createUserWithEmailAndPassword(users.email, users.password).then((data) => {
            const user = data.user;
            users.id = doc(collection(this.fs, 'id')).id
            this.route.navigate(['/login']);
            return addDoc(collection(this.fs, 'Users'), users)
            
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
        var provider = this.authGithub(new GithubAuthProvider());
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
