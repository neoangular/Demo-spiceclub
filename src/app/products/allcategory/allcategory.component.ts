import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../core/models/user';
@Component({
  selector: 'app-allcategory',
  templateUrl: './allcategory.component.html',
  styleUrls: ['./allcategory.component.css']
})
export class AllcategoryComponent implements OnInit {
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
  Allcat: any;
  loadingIndicator: boolean | undefined;
  catprod: any;
  subprod: any; 
  page2: boolean=false;
  page1: boolean=true;
  page3: boolean=false;
  quantityy: any;
  openproduct: any;
  Peoduct: any;
  page4: boolean=false;
  
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
  this.request.getallcat().subscribe((response: any) => {
    this.Allcat=response.data;
    // this.page1=true,
    // this.page2=false,
    console.log("response",response);
    console.log("allcategory",this.Allcat);
    // this.filteredData=data.response;
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 500);
  });
}
getprod(products:any){
  console.log("pro link",products);
  this.request.getcatprod(products).subscribe((response: any) => {
    this.catprod=response.data;
    this.page1=false,
    this.page2=false,
    this.page3=true,
    console.log("response",response);
    console.log("allprod",this.catprod);
    // this.filteredData=data.response;
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 500);
  });


}
getsubcategory(subbproducts:any){
  console.log("subpro link",subbproducts)
   this.request.getcatsubprod(subbproducts).subscribe((response: any) => {
    this.subprod=response.data;
    this.page2=true,
    this.page1=false,
    this.page3=false,

    console.log("response",response);
    console.log("allprod",this.catprod);
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
    this.page3=false,
    this.page4=true,
    // this.topsellingproduct(product_id)
     
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 500); 
    
  }
  ); 
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

}
