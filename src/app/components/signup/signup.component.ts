import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import validateForm from 'src/app/helpers/validateForm';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa fa-eye-slash";
  signupForm!: FormGroup
  username: string = "";
  password: string = "";
  constructor(private fb:FormBuilder, private auth:FirebaseService) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  // hiding or showing password
  hideShow() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.auth.register(this.signupForm.get('email')?.value, this.signupForm.get('password')?.value)
      this.username = '';
      this.password = '';
      // send obj to database
    }
    else {
      // error using toastr and with required fields...
      validateForm.validateAllForm(this.signupForm);
    }
  }

}
