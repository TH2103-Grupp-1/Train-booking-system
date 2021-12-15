import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {

  }

  onSubmit() {
    console.log(this.loginForm.value);
  }

  getErrorMessage() {
    if (this.loginForm.value.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.value.email.hasError('email') ? 'Not a valid email' : '';
  }

}
