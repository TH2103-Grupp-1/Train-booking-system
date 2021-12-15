import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';
import { first } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

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

  constructor(private authService: AuthService, private router: Router, public notyf: Notyf) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
    .pipe(first())
    .subscribe(
      data => {
        this.notyf.success("Inloggad");
        this.router.navigate(['/']);
      },
      error => {
        console.log(error);
      });;


  }

  getErrorMessage() {
    if (this.loginForm.value.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.value.email.hasError('email') ? 'Not a valid email' : '';
  }

}
