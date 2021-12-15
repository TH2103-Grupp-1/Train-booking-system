import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';
import { BehaviorSubject, empty, map, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject$: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  constructor(private http: HttpClient, private notyf: Notyf) {
    this.userSubject$ = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.user = this.userSubject$.asObservable();
   }

   public get currentUser(): User | null {
    return this.userSubject$.value;
}

   login(email: string, password: string) {
    return this.http.post<any>('http://localhost:5000/auth/login', { email, password })
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
    this.notyf.success("Utloggad");
    this.userSubject$.next(null);
}

  register() {

  }

}

