import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../core/models/user';

// function _window() : any {
//   return window;
// }

@Injectable({
  providedIn: 'root'
})
export class AuthService {

//   get nativeWindow() : any {
//     return _window();
//  }

  url: string | undefined;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
 
  private endPoint1 = "https://neophroncrm.com/spiceclubnew/api/v2"
 

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')||'{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
   }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


  login(email: string, password: string) { 
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest')
     this.url = `${this.endPoint1}/auth/login`;
     return this.http.post<any>(this.url,{ email, password},{headers:headers}).pipe( 
       
        map((user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          console.log("currentuser:",user);
          return user;
        })
      );
  }

  otplogin(body:any) { 
     this.url = `${this.endPoint1}/auth/lgoinverifyotp`;
     return this.http.post<any>(this.url,body).pipe(      
        map((user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          console.log("currentuser:",user);
          return user;
        })
      );
  }
  reqotplogin(body: any) { 
    this.url = `${this.endPoint1}/auth/loginwithotp`;
    return this.http.post<any>(this.url, body)
      
  }

  logout() { 
    this.url = `${this.endPoint1}/auth/logout`;
    
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null!);
    return this.http.get<any>(this.url)
  }
   adduser(body: any) {
    console.log('credentials2',body);
    this.url = `${this.endPoint1}/auth/signup`;
    return this.http.post(this.url, body);
  }

  registerotpverification(body: any) {  
    this.url = `${this.endPoint1}/auth/confirm_code`;
    return this.http.post<any>(this.url, body)
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // console.log(JSON.stringify(user));
          // localStorage.setItem('currentUser', JSON.stringify(user));
          // this.currentUserSubject.next(user);
          return user;
        })
      );
  }
  resendotp(body: any) { 
    this.url = `${this.endPoint1}/auth/resend_code`;
    return this.http.post<any>(this.url, body)
      
  }
  //forgot password
  conformforgot(body: any) { 
    this.url = `${this.endPoint1}/auth/password/forget_request`;
    return this.http.post<any>(this.url, body)
    
      
  }
  resetpassword(body: any) { 
    this.url = `${this.endPoint1}/auth/password/confirm_reset`;
    return this.http.post<any>(this.url, body)
      
  }
  resendforgot(body: any) { 
    this.url = `${this.endPoint1}/auth/password/resend_code`;
    return this.http.post<any>(this.url, body)
      
  }

}
