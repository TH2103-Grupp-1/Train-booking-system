import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
  returnUrl: string | undefined;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/),  Validators.email, Validators.maxLength(100)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)])
  });

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router, public notyf: Notyf, private translate: TranslateService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    const result = this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
    .pipe(first())
    .subscribe(
      data => {
        this.notyf.success(this.translate.instant('Logged in'));
        this.router.navigate([this.returnUrl]);
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
    if (this.loginForm.value.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.value.email.hasError('email') ? 'Not a valid email' : '';
  }

}
