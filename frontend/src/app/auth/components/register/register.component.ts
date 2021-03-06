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
    email: new FormControl('', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/), Validators.email, Validators.maxLength(30)]),
    firstName: new FormControl('', [Validators.required, Validators.pattern(/[A-Za-z]/)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern(/[A-Za-z]/)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^(\+|[0-9])[1-9][0-9 \-\(\)\.]{7,32}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)])
  });

  constructor(private authService: AuthService, private notyf: Notyf, private router: Router, private translate: TranslateService) {

  }

  ngOnInit(): void {
  }

  onSubmit() {
    const result = this.authService.register(this.registerForm.value)
    .pipe(first()).subscribe(
      () => {
        const result = this.authService.login(this.registerForm.value.email, this.registerForm.value.password)
        .pipe(first())
        .subscribe(
          () => {
            this.notyf.success(this.translate.instant('Registered & logged in'));
            this.router.navigate(['/']);
          },
          error => {
            this.notyf.error(this.translate.instant(error.message));
          },
          );;

          setTimeout(() => { // Prevent memory-leak
            result.unsubscribe();
          }, 5500);
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


