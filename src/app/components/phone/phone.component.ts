import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {
  getOtp:FormGroup
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {

    this.getOtp = this.fb.group({
      phone: [null, [Validators.required, Validators.pattern('^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$'), Validators.maxLength(10)]]
    })
  }

}
