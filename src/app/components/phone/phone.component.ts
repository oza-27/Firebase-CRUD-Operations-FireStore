import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecaptchaVerifier, Auth } from 'firebase/auth';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {
  phoneNumber: any;
  reCaptchaVerifier: any;
  authExtern:Auth;
  getOtp:FormGroup
  constructor(private fb: FormBuilder, public fa: AngularFireAuth) { }

  ngOnInit(): void {

    this.getOtp = this.fb.group({
      phone: [null, [Validators.required, Validators.maxLength(10)]]
    }) 
  }

  getCode(){
    this.reCaptchaVerifier = new RecaptchaVerifier('sign-in-button',{size:'invisible'}, this.authExtern) 
    this.fa.signInWithPhoneNumber(this.phoneNumber, this.reCaptchaVerifier).then((confirmResult) =>{
      console.log(confirmResult);
    })
  }

}
