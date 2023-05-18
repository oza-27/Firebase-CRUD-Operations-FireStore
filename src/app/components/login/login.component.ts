import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import validateForm from 'src/app/helpers/validateForm';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa fa-eye-slash";
  loginForm!: FormGroup;
  constructor(public fb: FormBuilder, public auth: FirebaseService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      // send obj to database
    }
    else {
      // error using toastr and with required fields...
      validateForm.validateAllForm(this.loginForm);
    }

    this.auth.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value);
   
  }
  // hiding or showing password
  hideShow() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

}
