import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Notyf } from 'notyf';
import { BehaviorSubject, empty, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterDto, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL: string;

  private userSubject$: BehaviorSubject<User | null>;
  public user: Observable<User | null>;


  constructor(private http: HttpClient, private notyf: Notyf, private translate: TranslateService) {
    this.userSubject$ = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.user = this.userSubject$.asObservable();
    this.BASE_URL = environment.BASE_URL;
  }

  public get currentUser(): User | null {
    return this.userSubject$.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.BASE_URL}/auth/login`, { email, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject$.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.notyf.success(this.translate.instant('Logged out'));
    this.userSubject$.next(null);
  }

  register(user: RegisterDto) {
    return this.http.post<any>(`${this.BASE_URL}/users/`, {user})
      .pipe(map(result => {
        if (result === 201) {
          return result;
          }
        return null;
      }));
  }

}

