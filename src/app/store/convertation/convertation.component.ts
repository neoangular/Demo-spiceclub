import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from 'src/app/service/request.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../core/models/user';
@Component({
  selector: 'app-convertation',
  templateUrl: './convertation.component.html',
  styleUrls: ['./convertation.component.css']
})
export class ConvertationComponent implements OnInit {
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  prodid:any
   _values1 = [" 1 ", "2", " 3 "," 4 "," 5 "," 6 "];
   _values2 = [" 1 ", "2", " 3 "," 4 "," 5 "];
  product_id: any;
  currentPrice: number | undefined;
  currentdetail: User;
  userid: any;
  accesstoken: any;
  tokentype: any;
  Convertations: any;
  page2: boolean=false;
  Messages: any;
  page1: boolean=true;
  conv_id: any;
  message!: FormGroup;
  Mesg: any;
  lastmessage_id: any;

  constructor(private router: Router,private fb: FormBuilder,private request: RequestService,private modalService: NgbModal,) { 
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')||'{}')
      
    );
    console.log("currentuser details=", this.currentUserSubject);
    this.currentUser = this.currentUserSubject.asObservable();
     this.currentdetail = this.currentUserSubject.value;
     this.userid=this.currentdetail.user.id; 
     this.accesstoken=this.currentdetail.access_token;
     this.tokentype=this.currentdetail.token_type;

     setInterval(()=> { this.lastmessage() }, 60000);
  }

  ngOnInit(): void {
    this.viewdata();
    this.message = this.fb.group({ 
      message:['',[Validators.required]],
    });
  }
  viewdata(){
    this.request.getallconv(this.userid).subscribe((response: any) => {
      this.Convertations=response.data;   
      console.log("response",response);
      console.log("Convertations",this.Convertations);
    },
    (error: any) => {
      console.log("error",error); 
    });
  }
  viewrow(row:any){
    this.conv_id=row.id
    this.request.getallmessages(row.id).subscribe((response: any) => {
      this.page2=true;this.page1=false;
      this.Messages=response.data;   
      console.log("response",response);
      console.log("Messages",this.Messages);
    },
    (error: any) => {
      console.log("error",error); 
    });
  }
  sendmsg(form:FormGroup){
    let edata={
    conversation_id :this.conv_id,
    user_id :this.userid ,
    message: form.value.message
    }
    this.request.sendmessages(edata).subscribe((response: any) => {  
      // this.Messages=response.data;   
      console.log("response",response);
      if(response.success==true){
        this.Mesg=response.data; 
        this.lastmessage_id= this.Mesg.id
        this.lastmessage();
      }
      else{
     console.log("err Messages",response);
      }  
    },
    (error: any) => {
      console.log("error",error); 
    });
  }
  lastmessage(){

    this.request.getnewmessages(this.conv_id,this.lastmessage_id,).subscribe((response: any) => {  
      // this.Messages=response.data;   
      console.log("newmsg",response);
      if(response.success==true){
        this.Messages=response.data; 
        // this.lastmessage_id= this.Mesg.id

      }
      else{
     console.log("err Messages",response);
      }  
    },
    (error: any) => {
      console.log("error",error); 
    });

  }
  
 

}
