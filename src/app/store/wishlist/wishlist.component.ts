import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../core/models/user';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  userid: any;
  accesstoken: any;
  tokentype: any;Proce: any;
  currentdetail: User;
  Wishlist: any;
  loadingIndicator: boolean | undefined;
  constructor(private router: Router,private fb: FormBuilder,private request: RequestService) {
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
this.viewcart();
  }
  viewcart(){
    this.request.fetchuserwishlist(this.userid).subscribe((response: any) => {
      this.Wishlist=response.data;   
      console.log("Wishlist",response.data); 
      // console.log("Wishlist", this.Wishlist[0].id);     
      // this. processdata()
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });
  
  }
  deleteRecord(id:any) {
    console.log("row",id);
    this.request.deletewishproud(id).subscribe((response: any) => {
      console.log(response);
      if(response.message=="Product is successfully removed from your wishlist"){
        console.log("deleted");
        this.viewcart();
      }
      else{
        console.log("error ,product is not deleted")
      }

     }, (error: any) => {
       console.log(error);
     });
  }
  addtocart(_id:any){
    let edata={
      id : _id,
      variant:"",
      user_id: this.userid,
      quantity: 2
    }
    console.log(edata);  
    this.request.addtocart(edata).subscribe((res: any) => {
      console.log(res);
      if (res.message == 'Product added to cart successfully') {       
      }
      else  {
        console.log("error",res);
  
      }
    }, (error: any) => {
      console.log("error",error);
    
    });
  }
}
