import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../core/models/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @ViewChild('form') form!: ElementRef;
  accessCode: any;
  encRequestRes : any;
  order_no : any = 'qaz234567';
  testAmount : any = '10';
  selectedAddress : any = {
    name : 'testing',
    address : 'test address',
    city : 'test city',
    pincode : '23456',
    state : 'state test',
    phone : '1234567890'
  }
 

  

  loadingIndicator: boolean | undefined;
  Cart: any;
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  currentdetail: User;
  userid: any;
  accesstoken: any;
  tokentype: any;Proce: any;
  _values1 = [" 1 ", "2", " 3 "," 4 "," 5 "," 6 "];
  quantityy: any;
  Summery: any;
  Address: any;
  Scost: any;
  cost: any;
  cosst: boolean=false;
  caart: boolean=true;
  owneriid: any;
  Grandtot: any;
  Paymenttype: any;
  payytype: any;
  comment!: FormGroup;
  combined_orderid: any;
  grandtotal: any;
  username: any;
  userphone: any;
  useremail: any;
  city: any;
  pincode: any;
  phone: any;
  address: any;
  state_name: any;

  constructor(private router: Router, private authService: AuthService,private fb: FormBuilder,private request: RequestService,) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')||'{}')
      
    );
    
    this.currentUser = this.currentUserSubject.asObservable();
     this.currentdetail = this.currentUserSubject.value;
     this.userid=this.currentdetail.user.id;
     this.accesstoken=this.currentdetail.access_token;
     this.tokentype=this.currentdetail.token_type;
     this.username=this.currentdetail.user.name;
     this.userphone=this.currentdetail.user.phone;
     this.useremail=this.currentdetail.user.email;
     console.log("currentuserid=", this.userid);
     console.log("currentuserdetail=", this.currentdetail);
   }

  ngOnInit(): void {

    this.accessCode = 'YOURACCESSCODEGOESHERE';

    this.viewcart();
    this.viewcart3();

    this.comment = this.fb.group({ 
      
      coupan: ['',[Validators.required]],
   
    });
  }
  viewcart(){
    this.request.fetchusercart(this.userid).subscribe((response: any) => {
      this.Cart=response;   
      console.log("cart",response);   
      console.log("owner id",this.Cart[0].owner_id);
      this.owneriid=this.Cart[0].owner_id;

    // this. processdata()
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });
  
  }
  // processdata(){
  //   let edata={
  //     cart_ids:"54,59",
  //     cart_quantities:"2,1"
  //   }
  //   console.log("edata",edata);
  //   this.request.fetchcartprocess(edata).subscribe((response: any) => {
  //     this.Proce=response;   
  //     console.log("cart",response);  ;
  //     setTimeout(() => {
  //       this.loadingIndicator = false;
  //     }, 500);
  //   });
  
  // }
  deleteRecord(id:any) {
    console.log("row",id);
    this.request.deleteproud(id).subscribe((response: any) => {
      console.log(response);
      if(response.message=="Product is successfully removed from your cart"){
        console.log("deleted");
        this.viewcart();
        this.viewcart3();
      }
      else{
        console.log("error ,product is not deleted")
      }

     }, (error: any) => {
       console.log(error);
     });
  }
  firstDropDownChanged(data: any,_id:any)  {
    console.log(data.target.value);
    this.quantityy=data.target.value;
    let edata2={
      id:_id,
      quantity:  this.quantityy
    }
    console.log("edata2",edata2);

     this.request.updatecart(edata2).subscribe((response:any) => {
       console.log("response",response);
       this.viewcart();
       this.viewcart3();
     });
  }
  viewcart3(){
    this.request.fetchsummery(this.userid).subscribe((response: any) => {
      this.Summery=response;   
      this.Grandtot=this.Summery.grand_total
      console.log("summery",response);    
      console.log("grand total",this.Summery.grand_total); 
      this.grandtotal=this.Summery.grand_total
    // this. processdata()
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });
  
  }

  proshipping(){
    this.caart=false
    this.cosst=true;
    this.getaddress();
  }

  getaddress(){
    this.request.fetchaddress(this.userid).subscribe((response: any) => {
      this.Address=response.data;   
      console.log("Address",this.Address);     
    // this. processdata()    
    });
    this.paymettype();
  }
  shippingcost(row:any){
    console.log("row id",row.city_name); 
    console.log("row id",row.id);
    this.city=row.city_name;
    this.pincode=row.postal_code;
    this.phone=row.phone;
    this.address=row.address;
    this.state_name=row.state_name

    let edata2={
      user_id:this.userid,
      address_id:row.id
    }
    let edata={
      owner_id:this.owneriid,
      user_id:this.userid,
      city_name:row.city_name
    }
    console.log("edatat",edata); 
    console.log("edatat",edata2);
    this.request.fetchcost(edata).subscribe((response: any) => {
      this.Scost=response; 
      this. cost= this.Scost.value_string
      console.log("Scost",this.cost);     
    // this. processdata()    
    });
    this.request.updateshippingaddress(edata2).subscribe((response: any) => {
      console.log("address changed res",response);     
    // this. processdata()    
    });

  }
  paymettype(){
    this.request.fetchpaytype().subscribe((response: any) => {
      this.Paymenttype=response;  
      console.log("Paymenttype",this.Paymenttype);     
    // this. processdata()    
    });
  }
  selectpaytype(row:any){
    console.log("paytype",row.payment_type)
    this.payytype=row.payment_type
  }
  placeorder(){
    let edata={
      owner_id:this.owneriid,
      user_id:this.userid,
      payment_type:this.payytype
    }
    console.log("edatat",edata); 
    this.request.placeorder(edata).subscribe((response: any) => {
      console.log("Placeorder",response); 
      this.combined_orderid =response.combined_order_id    
       
    });
  }
  applycoupan(form: FormGroup){
    let edata2={
      user_id:this.userid,
      owner_id:this.owneriid,
      coupon_code:form.value.coupan,
      
    }
    console.log(edata2);  
    this.request.appycoupan(edata2).subscribe((res: any) => {
      console.log(res);
      // if (res.message == 'Feedback  Submitted') {       
       
      // }
      // else  {
      //   console.log("error",res);
  
      // }
    }, (error: any) => {
      console.log("error",error);
    
    });
  
  }


  checkout(){
    let redirect_url = 'http%3A%2F%2Flocalhost%3A3008%2Fhandleresponse'; 
    let request = `merchant_id=BDSKUATY&order_id=${this.order_no}&currency=INR&amount=${this.grandtotal}&redirect_url=${redirect_url}&cancel_url=${redirect_url}&language=EN&billing_name=${this.username}&billing_address=${this.address}&billing_city=${this.city}&billing_state=${this.state_name}&billing_zip=${this.pincode}&billing_country=India&billing_tel=${this.phone}
    &delivery_name=${this.username}&delivery_address=${this.address}&delivery_city=${this.city}&delivery_state=${this.state_name}&delivery_zip=${this.pincode}&delivery_country=India&delivery_tel=${this.phone}&billing_email=${this.useremail}`
  console.log("request",request)
    // this.authService.encryptdata(request).subscribe(
    //   (      data: { [x: string]: any; }) => {
    //   console.log('---------------------', data['response'])
    //   this.encRequestRes = data['response']; 
    //       setTimeout(()=>{
    //           this.form.nativeElement.submit();
    //       },1000)
    //   }, (error: any) => {
    //   console.log(error)
    //   }
    //   );
  }




// method 2
  // pay() {
    
  //   // this.cartValue contains all the order information which is sent to the server
  //   // You can use this package to encrypt - https://www.npmjs.com/package/node-ccavenue/
  //   this.authService.getEnc(this.orderInformation).subscribe((response: any) => {
  //     this.encRequest = response.encRequest;
  //     setTimeout((_: any) => this.form.nativeElement.submit());
  //   }, (error: any) => {
  //     console.log(error);
  //   });
  // }


  // razorpay
// initPay() {
//  let options = {
//     "key": "rzp_test_HTQz79bVMhpN4L", 
//     "amount": this.grandtotal.replace('Rs',""),
//     "currency": "INR",
//     "name": "Acme Corp",
//     "description": "Test Transaction",
//     "image": "https://example.com/your_logo",
//     "order_id": this.combined_orderid,
//     "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
//     "prefill": {
//         "name": this.username,
//         "email": this.useremail,
//         "contact": this.userphone
//     },
//     "notes": {
//         "address": "Razorpay Corporate Office"
//     },
//     "theme": {
//         "color": "#3399cc"
//     }
// };
//   console.log("options,",options)
//   let rzp1 = new this.authService.nativeWindow.Razorpay(options);
//   rzp1.open();
//   console.log("works");
// }

}
