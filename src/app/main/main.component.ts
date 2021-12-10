import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, FormControl,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../core/models/user';
import { HttpHeaders } from '@angular/common/http';
import { RequestService } from '../service/request.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  userid?: any;
  currentdetail: any;
  accesstoken: string;

  constructor(private authService: AuthService,private request: RequestService,private router: Router, private fb: FormBuilder, private formBuilder: FormBuilder,) { 
  
    
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')||'{}')
      
    );
    // console.log("currentuser details=", this.currentUserSubject);
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentdetail = this.currentUserSubject.value;
    this.userid=this.currentdetail.user.id; 
    // this.tokentype = this.currentdetail.token_type;
    this.accesstoken = this.currentdetail.access_token;
    // this.memberid = this.currentUserSubject.value[0]
     console.log("currentuser id=", this.userid);
  }

  ngOnInit(): void {
    // console.log("current user",this.currentUser);
    // console.log("user",User);
  }
  logout(){
    console.log("logggouttt") 
    this.request.logout().subscribe( res=>{
      console.log("res",res);
      // if(res.message == "Successfully logged out"){
      // this.router.navigate(['/login']);}
    })
  }

}
