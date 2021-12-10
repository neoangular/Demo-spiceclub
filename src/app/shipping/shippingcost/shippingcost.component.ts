import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { RequestService } from 'src/app/service/request.service';
import { User } from '../../core/models/user';
@Component({
  selector: 'app-shippingcost',
  templateUrl: './shippingcost.component.html',
  styleUrls: ['./shippingcost.component.css']
})
export class ShippingcostComponent implements OnInit {
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  userid: any;
  accesstoken: any;
  tokentype: any;Proce: any;
  currentdetail: User;
  Address: any;
  Scost: any;
  cost: any;

  constructor(private request: RequestService,  private fb: FormBuilder,
    private modalService: NgbModal) { 
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
    this.getaddress();
  }
  getaddress(){
    this.request.fetchaddress(this.userid).subscribe((response: any) => {
      this.Address=response.data;   
      console.log("Address",this.Address);     
    // this. processdata()    
    });
  }
  shippingcost(row:any){
    console.log("row id",row.city_name); 
    let edata={
      owner_id:9,
      user_id:this.userid,
      city_name:row.city_name
    }
    console.log("edatat",edata); 
    this.request.fetchcost(edata).subscribe((response: any) => {
      this.Scost=response; 
      this. cost= this.Scost.value_string
      console.log("Scost",this.cost);     
    // this. processdata()    
    });
  }

}
