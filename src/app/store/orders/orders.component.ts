import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { RequestService } from 'src/app/service/request.service';
import { User } from '../../core/models/user';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  userid: any;
  accesstoken: any;
  tokentype: any;Proce: any;
  currentdetail: User;
  Orders: any;
  prdid: any;
  Items: any;
  Detail: any;
  loadingIndicator: boolean | undefined;
  page2: boolean=true;
  page1: boolean=false;
  product_iddd: any;
  register!: FormGroup;
  _values2 = [" 1 ", "2", " 3 "," 4 "," 5 "];
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
    this.getorders();
    this.register = this.fb.group({ 
      rating:[''],
      comment: [''],
   
    });
    }
    get f() {
      return this.register.controls;
      
    }
  getorders(){
    this.request.fetchOrders(this.userid).subscribe((response: any) => {
      this.Orders=response.data;   
      console.log("orders",this.Orders);     
    // this. processdata()    
    });
  }
  viewrow(Connectdtls:any,content: any){
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
this.prdid=Connectdtls.id;
  this. viewdetail();
  this.viewitem();
  }
  viewdetail(){
 
     this.request.vieworderdetail(this.prdid).subscribe((response: any) => {
   
       this.Detail=response.data;
      //  product_id=this.Peoduct.id;
       console.log("order detail",response);   
       this.page1=false,
       this.page2=true,
       setTimeout(() => {
         this.loadingIndicator = false;
       }, 500);    
     }
     ); 
   }

   viewitem(){
 
     this.request.vieworderitems(this.prdid).subscribe((response: any) => {
     this.Items=response.data;     
       console.log("items",this.Items);
       
     }
     ); 
   }
   addreview(content:any,_id:any){
    this.product_iddd=_id;
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });

  }
  submitreview(form: FormGroup){
    let edata2={
      product_id : this.product_iddd,
      user_id: this.userid,
      rating:""+this.register.controls['rating'].value,
      comment: ""+this.register.controls['comment'].value,
    }
    console.log(edata2);  
    this.request.addreview(edata2).subscribe((res: any) => {
      console.log(res);
      // if (res.message == 'Product added to cart successfully') {       
      // }
      // else  {
      //   console.log("error",res);
  
      // }
    }, (error: any) => {
      console.log("error",error);
    
    });
  
  }
 
}
