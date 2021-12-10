import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../core/models/user';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-allbrands',
  templateUrl: './allbrands.component.html',
  styleUrls: ['./allbrands.component.css']
})

export class AllbrandsComponent implements OnInit {
  loadingIndicator: boolean | undefined;
  Allbrands: any;
  link="https://neophroncrm.com/spiceclubnew/api/v2/";
  openbrand: any;
  Brands: any;
  page2: boolean=false;
  page1: boolean=true;
  discount:boolean =false;
  Peoduct: any;
  page3: boolean=false;
  openproduct: any;
  selectedValue: any;
  Topsell: any;
  quantityy:any
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  prodid:any
   _values1 = [" 1 ", "2", " 3 "," 4 "," 5 "," 6 "];
  product_id: any;
  currentPrice: number | undefined;
  currentdetail: User;
  userid: any;
  accesstoken: any;
  tokentype: any;
  // currentPrice: number;


   
  constructor(private router: Router,private fb: FormBuilder,private request: RequestService,) { 
      
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')||'{}')
      
    );
    console.log("currentuser details=", this.currentUserSubject);
    this.currentUser = this.currentUserSubject.asObservable();
     this.currentdetail = this.currentUserSubject.value;
     this.userid=this.currentdetail.user.id; 
     this.accesstoken=this.currentdetail.access_token;
     this.tokentype=this.currentdetail.token_type;
    //  console.log("currentuser=", this.currentUser);
    //  console.log("currentusezr=",  this.currentdetail.access_token);
 
  }

  ngOnInit(): void {
    this.viewdata();
    // console.log("currentuser=", this.quantityy);
  }

  
viewdata(){
  this.request.getallbrands().subscribe((response: any) => {
    // this.data = data;
    // this.filteredData = data;
    this.Allbrands=response.data;
    this.page1=true,
    this.page2=false,
    console.log("response.data",response.data);
    console.log("allbrands",this.Allbrands);
    // this.filteredData=data.response;
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 500);
  });
}
viewrow(img: any){
  this.openbrand=img.links.products
  // console.log("detail",img.links.products);
  this.viewbrand();
}

viewbrand(){
  this.request.viewallbrands(this.openbrand).subscribe((response: any) => {
    // this.data = data;
    // this.filteredData = data;
    this.Brands=response.data;
    this.page1=false
    this.page2=true
    console.log("response.data",response.data);
   
  
    // this.filteredData=data.response;
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 500);
  });

}

viewbrandproductrow(img: any){
  this.openproduct=img.links.details
console.log("detail", this.openproduct);
  this.viewbrandproduct();
}


 viewbrandproduct(){
 var product_id
  this.request.viewbrandsproducd(this.openproduct).subscribe((response: any) => {
    // this.data = data;
    // this.filteredData = data;
    this.Peoduct=response.data[0];
    product_id=this.Peoduct.id;
    console.log("product id",product_id);
 
    this.page1=false,
    this.page2=false,
    this.page3=true,
    this.topsellingproduct(product_id)
    // this.filteredData=data.response;
    //  return{
    //    prodid :product_id
 
    //  }
    
     
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 500); 
    
  }
  ); 
}

topsellingproduct(product_id:any){
  this.request.topsellproduct(product_id).subscribe((response: any) => {
    this.Topsell=response;

    var month = this.Topsell.data;
    var connectgiv = [];
    for (var i = 0; i < month?.length; i++) {
    connectgiv.push(month[i].name);

   }
   console.log("mon",connectgiv );
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 500);
  });
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
    variant:"",
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
addtowishlist(prd_id:any){
  let edata4={
    user_id:this.userid,
    product_id:prd_id
  }
  console.log(edata4);  
  this.request.addtowishlist(edata4).subscribe((res: any) => {
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
// cartprocess(){
  
//   var processstr = this.Topsell.data;
//   var connectgiv = [];
//   for (var i = 0; i < processstr?.length; i++) {
//   connectgiv.push(processstr[i].name);

//  }
//  console.log("mon",connectgiv );
// }

}



