import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../Models/user.model';
import { Token } from '../Models/token.model';
import { map } from 'rxjs/operators';
import { URL } from '../../assets/configurations/config';
import {Role} from '../Models/role.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  baseUrl = URL.baseUrl;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

  authenticate(user: User): Observable<Token>{
    return this.http.post<Token>(this.baseUrl + '/authenticate', user).pipe(map(
      (result : Token) => {
        if(result){
          user.token = result.token;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return result;
      }
    ));
  }
  getUser(): Observable<User>{
    return this.http.get<User>(this.baseUrl + '/user');
  }

  getRole(): Observable<Role[]>{
    return this.http.get<Role[]>(this.baseUrl + '/roles');
  }

  register(user: User): Observable<string>{
    return this.http.post<string>(this.baseUrl + '/register', user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}
}
