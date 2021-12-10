import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from 'src/app/service/request.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../core/models/user';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  Wallet: any;
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  userid: any;
  accesstoken: any;
  tokentype: any;Proce: any;
  currentdetail: User;
  History: any;

  constructor(private request: RequestService,  private fb: FormBuilder,
    private modalService: NgbModal,) {
      this.currentUserSubject = new BehaviorSubject<User>(
        JSON.parse(localStorage.getItem('currentUser')||'{}')     
      );
      
      this.currentUser = this.currentUserSubject.asObservable();
       this.currentdetail = this.currentUserSubject.value;
       this.userid=this.currentdetail.user.id;
       this.accesstoken=this.currentdetail.access_token;
       this.tokentype=this.currentdetail.token_type;
       console.log("currentuserid=", this.userid);
  
     }

  ngOnInit(): void {
    this.getwallet();
    this.getrechargehistory();
  }
  getwallet(){
    this.request.fetchwallet(this.userid).subscribe((response: any) => {
      this.Wallet=response;   
      console.log("Wallet",this.Wallet); 
      console.log("Wallet res",response);        
    });
  }

  getrechargehistory(){
    this.request.fetchrechisttory(this.userid).subscribe((response: any) => {
      this.History=response.data;   
      console.log("History",this.History); 
      // console.log("History res",response);        
    });
  }

}
