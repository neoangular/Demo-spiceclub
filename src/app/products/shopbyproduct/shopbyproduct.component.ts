import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../core/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-shopbyproduct',
  templateUrl: './shopbyproduct.component.html',
  styleUrls: ['./shopbyproduct.component.css']
})
export class ShopbyproductComponent implements OnInit {
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
  Product: any;
  Allbrands: any;
  brand_id: any;
  openproduct: any;
  Productdet: any;
  Peoduct: any;
  page1: boolean=true;
  page2: boolean=false;
  quantityy: any;
  cat_id: any;
  Allcat: any;
  loadingIndicator: boolean | undefined;
  Relatedprod: any;
  varient_value: any;
  varprise: any; 
  choice: any;
  register!: FormGroup;
  product_iddd: any;
  product_iidd: any;
  message!: FormGroup;
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
  }

  ngOnInit(): void {
    this.viewdata();
   this.viewbrand();
   this.viewcat();

   this.register = this.fb.group({ 
    rating:[''],
    comment: [''],
 
  });

  this.message = this.fb.group({ 
    title:['',[Validators.required]],
    message: ['',[Validators.required]],
 
  });
  }
  get f() {
    return this.register.controls;
    
  }
   
viewdata(){
  this.request.getallproducts().subscribe((response: any) => {
    this.Product=response.data;   
    console.log("response",response);
    console.log("allproduct",this.Product);
  });
}
viewbrand(){
  this.request.getallbrands().subscribe((response: any) => {
    this.Allbrands=response.data;   
    console.log("response",response);
    console.log("Allbrands",this.Allbrands);
  });
}
ontableChange(tbl_id:any) {
    console.log("hiii",tbl_id.value);
     this.brand_id = tbl_id.value;    
     this.page1=true;
     this.page2=false;
    this.request.getbrandprod(this.brand_id).subscribe((response: any) => {
      console.log("prod",response);
           this.Product=response.data;
           console.log("res",this.Product); 
    },
     (error: any) => {
      console.log(error);
    });
  }
  viewproductrow(img: any){
    this.product_id=img.id
  console.log("detail", this.product_id);
  this.request.getproddetail(this.product_id).subscribe((response: any) => {
    this.page1=false;
    this.page2=true;
    console.log("proddetaill",response);
         this.Peoduct=response.data[0];
         this.choice=this.Peoduct.choice_options;
         console.log("res",this.Peoduct); 
         console.log("choise option",this.Peoduct.choice_options); 
  },
   (error: any) => {
    console.log(error);
  });
  this.request.getrelatedprod(this.product_id).subscribe((response: any) => {  
    console.log("relatedprod",response);
         this.Relatedprod=response.data;
         console.log("res",this.Relatedprod); 
  },
   (error: any) => {
    console.log(error);
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
      variant:this?.varient_value,
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
  oncatChange(tbl_id:any) {
    console.log("hiii",tbl_id.value);
     this.cat_id = tbl_id.value;    
     this.page1=true;
     this.page2=false;
    this.request.getcatprodbyid(this.cat_id).subscribe((response: any) => {
      console.log("catprod",response);
           this.Product=response.data;
           console.log("res",this.Product); 
    },
     (error: any) => {
      console.log(error);
    });
  }
  viewcat(){
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
  addconv(content:any,_id:any){
    this.product_iidd=_id;
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }
  sendconv(form:FormGroup){
    let edata={
      product_id:this.product_iidd,
      user_id:this.userid,
      title:form.value.title,
      message:form.value.message
    }
    console.log("edata,",edata);
    this.request.addconv(edata).subscribe((res: any) => {
      console.log(res);
      if (res.message == 'Conversation created') {   
        this.modalService.dismissAll();    
      }
      else  {
        console.log("error",res);
  
      }
    }, (error: any) => {
      console.log("error",error); 
    });

  }
}
