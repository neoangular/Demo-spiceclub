import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../core/models/user';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-bestselling',
  templateUrl: './bestselling.component.html',
  styleUrls: ['./bestselling.component.css']
})
export class BestsellingComponent implements OnInit {
 
  openproduct: any;
  Peoduct: any;
  loadingIndicator: boolean | undefined;
  page1: boolean=true;
  page2: boolean=false;
  page3: boolean=false;
  Bestsellpro: any;
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  prodid:any
   _values1 = [" 0 "," 1 ", "2", " 3 "," 4 "," 5 "," 6 "];
  product_id: any;
  currentPrice: number | undefined;
  currentdetail: User;
  userid: any;
  accesstoken: any;
  tokentype: any;
  quantityy: any;
  choice: any;
  varprise: any;
  varient_value: any;

  constructor(private router: Router,private fb: FormBuilder,private request: RequestService) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')||'{}')
      
    );
    console.log("currentuser details=", this.currentUserSubject);
    this.currentUser = this.currentUserSubject.asObservable();
     this.currentdetail = this.currentUserSubject.value;
     this.userid=this.currentdetail.user?.id;
     this.accesstoken=this.currentdetail.access_token;
     this.tokentype=this.currentdetail.token_type;
   }

  ngOnInit(): void {
this.viewfuturedpro();
  }
     
viewfuturedpro(){
  this.request.getbestsellpro().subscribe((response: any) => {
    // this.data = data;
    // this.filteredData = data;
    this.Bestsellpro=response.data;
   
    console.log("response.data",response);
    console.log("best sellling",this.Bestsellpro);
    // this.filteredData=data.response;
 
  });
}
viewproductrow(img: any){
  this.openproduct=img.links.details
console.log("detail", this.openproduct);
this.product_id=img.id;
  this.viewrqwproduct();
} 

viewrqwproduct(){
  var product_id
  this.request.viewfeatproducd(this.openproduct).subscribe((response: any) => {
    // this.data = data;
    // this.filteredData = data;
    this.Peoduct=response.data[0];
     product_id=this.Peoduct.id;
     this.choice=this.Peoduct.choice_options;
    // console.log("topsellis",product_id);
    console.log("response.data",this.Peoduct);
    console.log("choiceoptions",this.Peoduct.choice_options); 
    this.page1=false,
    this.page2=true,
  
    // this.filteredData=data.response;
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 500);
  });
  console.log("topsellis",product_id);

}

firstDropDownChanged(data: any) 
{
  console.log(data.target.value);
  this.quantityy=data.target.value;
    return this.quantityy= this.quantityy; 
}
addtocart(_id:any){
  let edata={
    id : _id,
    variant:this.varient_value,
    user_id: this.userid,
    quantity: this.quantityy
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
selectvar(weight:any){
  this.varient_value=weight
  this.request.addvarient(this.product_id,weight).subscribe((res: any) => {
    console.log(res);
    this.varprise=res?.price_string;
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
