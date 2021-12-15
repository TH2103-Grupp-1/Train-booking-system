import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, empty, map, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject$: BehaviorSubject<User>;
  public user: Observable<User>;
  constructor(private http: HttpClient) {
    this.userSubject$ = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.user = this.userSubject$.asObservable();
   }

   public get currentUser(): User {
    return this.userSubject$.value;
}

   login(email: string, password: string) {
    return this.http.post<any>(`$/auth/authenticate`, { email, password })
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
    // this.userSubject$.next(user);
}

  register() {

  }

}

