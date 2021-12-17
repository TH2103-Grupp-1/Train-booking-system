import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Notyf } from 'notyf';
import { first } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/), Validators.email, Validators.maxLength(50)]),
    firstName: new FormControl('', [Validators.required, Validators.pattern(/[A-Za-z]/)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern(/[A-Za-z]/)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^(\+|00)[1-9][0-9 \-\(\)\.]{7,32}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)])
  });

  constructor(private authService: AuthService, private notyf: Notyf, private router: Router, private translate: TranslateService) {

  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.registerForm.value);
    const result = this.authService.register(this.registerForm.value)
    .pipe(first()).subscribe(
      data => {
        this.notyf.success(this.translate.instant('Registered, please login'));
         this.router.navigate(['/login']);
      },
      error => {
        this.notyf.error(this.translate.instant(error.message));
      },
      );;

      setTimeout(() => { // Prevent memory-leak
        result.unsubscribe();
      }, 5500);
  }

  getErrorMessage() {
    if (this.registerForm.value.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.registerForm.value.email.hasError('email') ? 'Not a valid email' : '';
  }

}


