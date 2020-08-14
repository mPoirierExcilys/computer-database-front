import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../Models/user.model';
import { Token } from '../Models/token.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  baseUrl= 'http://10.0.1.108:8080/webapprest/authenticate';
  // baseUrl= 'http://localhost:8080/webapprest/authenticate';
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

  authenticate(user: User): Observable<Token>{
    return this.http.post<Token>(this.baseUrl, user).pipe(map(
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
    return this.http.get<User>(this.baseUrl);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}
}
