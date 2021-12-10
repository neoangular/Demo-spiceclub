import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../core/models/user';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  url: string | undefined;
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;

  // private endPoint1 = "https://admin.jcombiz.com/jcomweb/login.php"
  private endPoint1 = "https://neophroncrm.com/spiceclubnew/api/v2"
  currentdetail: User;
  userid: any;
  accesstoken: any;
  tokentype: any;


  constructor(private http: HttpClient) {

    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')

    );
    console.log("currentuser details=", this.currentUserSubject);
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentdetail = this.currentUserSubject.value;
    // this.userid = this.currentdetail?.user.id;
    this.accesstoken = this.currentdetail.access_token;
    this.tokentype = this.currentdetail.token_type;
    console.log("currentuser=", this.currentUser);
    console.log("currentusezr=", this.currentdetail.access_token);

  }

  logout() { 
    this.url = `${this.endPoint1}/auth/logout`;
    const headers = new HttpHeaders()

    .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null!);
    return this.http.get(this.url,{headers:headers})
  }

  public getallbrands() {
    this.url = `${this.endPoint1}/brands`;
    return this.http.get(this.url);
  }

  public viewallbrands(link: string) {
    return this.http.get(link);

  }
  public viewbrandsproducd(link: string) {
    return this.http.get(link);
  }

  public topsellproduct(id: string) {
    this.url = `${this.endPoint1}/products/top-from-seller/` + id;
    return this.http.get(this.url);
  }
  public getslider() {
    this.url = `${this.endPoint1}/sliders`;
    return this.http.get(this.url);
  }
  public getfuturedcat() {
    this.url = `${this.endPoint1}/categories/featured`;
    return this.http.get(this.url);
  }
  public gettodaysdeal() {
    this.url = `${this.endPoint1}/products/todays-deal`;
    return this.http.get(this.url);
  }


  public viewallfeatured(link: string) {
    return this.http.get(link);

  }

  public viewfeatproducd(link: string) {
    return this.http.get(link);
  }
  public getbanner() {
    this.url = `${this.endPoint1}/banners`;
    return this.http.get(this.url);
  }

  public addtocart(body: any) {
  const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer'+' '+ this.accesstoken)
      // .set('Access-Control-Allow-Origin', '*')
      this.url = `${this.endPoint1}/carts/add`;
      console.log("sts",this.url)
      return this.http.post(this.url,body,{headers:headers});
   
  }
  public fetchusercart(id:any,) {  
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer'+' '+ this.accesstoken)
    this.url = `${this.endPoint1}/carts/` + id;
    console.log("sts",headers)
    return this.http.post(this.url,null,{headers:headers});      
  }
  public fetchcartprocess(body:any) {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer'+' '+ this.accesstoken)
    this.url = `${this.endPoint1}/carts/process`;
    return this.http.post(this.url, body, {headers:headers});
    
  }
  deleteproud(id:any) {  
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer'+' '+ this.accesstoken)
    this.url = `${this.endPoint1}/carts/remove/` + id;
    return this.http.get(this.url,{headers:headers});
}

updatecart(body:any) {  
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken)
  this.url = `${this.endPoint1}/carts/change-quantity`;
  return this.http.post(this.url,body,{headers:headers});
}
fetchsummery(id:any) {  
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken)
  this.url = `${this.endPoint1}/cart-summary/` + id;
  return this.http.get(this.url,{headers:headers});
}
public addtowishlist(body: any) {
  const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest')
      .set('Authorization', 'Bearer'+' '+ this.accesstoken)
      
      this.url = `${this.endPoint1}/wishlists`;
    // console.log("sts",newconnect)
      return this.http.post(this.url, body, {headers:headers});
   
  }

  public fetchuserwishlist(id:any,) {  
    const headers = new HttpHeaders() 
    .set('Authorization', 'Bearer'+' '+ this.accesstoken)
    this.url = `${this.endPoint1}/wishlists/` + id;
    console.log("sts",this.url)
    return this.http.get(this.url,{headers:headers});      
  }
  deletewishproud(id:any) {  
    const headers = new HttpHeaders()
    
    .set('Authorization', 'Bearer'+' '+ this.accesstoken)
    this.url = `${this.endPoint1}/wishlists/` + id;
    return this.http.delete(this.url,{headers:headers});
}
// address
public addaddress(body:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken)    
   this.url = `${this.endPoint1}/user/shipping/create`;
   return this.http.post(this.url,body,{headers:headers});
}
public fetchcountry() {
  this.url = `${this.endPoint1}/countries`;
  return this.http.get(this.url);
}
public fetchstate() {
  this.url = `${this.endPoint1}/states`;
  return this.http.get(this.url);
}
public fetchCity() {
  this.url = `${this.endPoint1}/cities`;
  return this.http.get(this.url);
}
public fetchaddress(id:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
  console.log("headers",headers)
  this.url = `${this.endPoint1}/user/shipping/address/` + id;
  return this.http.get(this.url,{headers:headers});
}
public updateaddress(body:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
  this.url = `${this.endPoint1}/user/shipping/update`;
  return this.http.post(this.url,body,{headers:headers});
}

public updateshippingaddress(body:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
  this.url = `${this.endPoint1}/update-address-in-cart`;
  return this.http.post(this.url,body,{headers:headers});
}
deleteaddress(id:any) {  
  const headers = new HttpHeaders()
  .set('Authorization', 'Bearer'+' '+ this.accesstoken)
  this.url = `${this.endPoint1}/user/shipping/delete/` + id;
  return this.http.get(this.url,{headers:headers});
}
public fetchcost(body:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
  this.url = `${this.endPoint1}/shipping_cost`;
  return this.http.post(this.url,body,{headers:headers});
}
// futuredproduct
public getfuturedpro() {
  this.url = `${this.endPoint1}/products/featured`;
  return this.http.get(this.url);
}
// bestseling pro
public getbestsellpro() {
  this.url = `${this.endPoint1}/products/best-seller`;
  return this.http.get(this.url);
}
// orders
public fetchOrders(id:any) {
  const headers = new HttpHeaders()
  .set('Authorization', 'Bearer'+' '+ this.accesstoken)    
   this.url = `${this.endPoint1}/purchase-history/`  + id;
   return this.http.get(this.url,{headers:headers});
}
public vieworderdetail(id:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
  this.url = `${this.endPoint1}/purchase-history-details/` + id;
  return this.http.get(this.url,{headers:headers});
}
public vieworderitems(id:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
  this.url = `${this.endPoint1}/purchase-history-items/` + id;
  return this.http.get(this.url,{headers:headers});
}
// paymenttype
public fetchpaytype() {
  this.url = `${this.endPoint1}/payment-types`;
  return this.http.get(this.url);
}
// placeorder
public placeorder(body:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
  this.url = `${this.endPoint1}/order/store`;
  return this.http.post(this.url,body,{headers:headers});
}
// all category
public getallcat() {
  this.url = `${this.endPoint1}/categories`;
  return this.http.get(this.url);
}
// cat prod
public getcatprod(link: string) {
  return this.http.get(link);
}
//subcategory
public getcatsubprod(link: string) {
  return this.http.get(link);
}
// shopbyproducts
public getallproducts() { 
  this.url = `${this.endPoint1}/products?page=` + 1;
  return this.http.get(this.url,);
}
// productbybrand

public getbrandprod(id: string) {
  this.url = `${this.endPoint1}/products/brand/` + id +'?page=1';
  return this.http.get(this.url);
}
//prod detail
public getproddetail(id: string) {
  this.url = `${this.endPoint1}/products/` + id ;
  return this.http.get(this.url);
}
public getcatprodbyid(id: string) {
  this.url = `${this.endPoint1}/products/category/` + id +`?page=1&name=`;
  return this.http.get(this.url);
}
//related product
public getrelatedprod(id: string) {
  this.url = `${this.endPoint1}/products/related/` + id ;
  return this.http.get(this.url);
}
public addvarient(id: string,varient:any) {
  this.url = `${this.endPoint1}/products/variant/price?id=` + id +`&color=` +`&variants=` + varient;
  return this.http.get(this.url);
}
public getsortprod(sort: string) {
  this.url = `${this.endPoint1}/products/search?sort_key=` + sort ;
  return this.http.get(this.url);
}
public filterdataa(category:any,min:any,max:any) {
  this.url = `${this.endPoint1}/products/search?categories=` + category +`&brands=` +`&name=` +`&min=` + min +`&max=` +max ;
  return this.http.get(this.url);
}
public filtersearchdataa(name:any) {
  this.url = `${this.endPoint1}/products/search?name=`  +name ;
  return this.http.get(this.url);
}
//review
public addreview(body:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
  this.url = `${this.endPoint1}/reviews/submit`;
  return this.http.post(this.url,body,{headers:headers});
}
//shops
public getallshop( ) {
  this.url = `${this.endPoint1}/shops`;
  return this.http.get(this.url); 
}

public getshopdetails(id: string) {
  this.url = `${this.endPoint1}/shops/details/` + id ;
  return this.http.get(this.url);
}
public getnewarrival(id: string) {
  this.url = `${this.endPoint1}/shops/products/new/` + id ;
  return this.http.get(this.url);
}
public getshopfeatured(id: string) {
  this.url = `${this.endPoint1}/shops/products/featured/` + id ;
  return this.http.get(this.url);
}
public gettopshop(id: string) {
  this.url = `${this.endPoint1}/shops/products/top/` + id ;
  return this.http.get(this.url);
}

public fetchwallet(id: string) {
  const headers = new HttpHeaders()
  .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
  this.url = `${this.endPoint1}/wallet/balance/` + id ;
  return this.http.get(this.url,{headers:headers});
}
public fetchrechisttory(id: string) {
  const headers = new HttpHeaders()
  .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
  this.url = `${this.endPoint1}/wallet/history/` + id ;
  return this.http.get(this.url,{headers:headers});
}
//recipe
public getallrecipecat() {
  this.url = `${this.endPoint1}/recipe/categories`;
  return this.http.get(this.url);
}
public getrecipebycat(id: string) {
  this.url = `${this.endPoint1}/recipe/category/` + id+`?page=1` ;
  return this.http.get(this.url);
}
public getrecipedetail(id: string) {
  this.url = `${this.endPoint1}/recipe/` + id ;
  return this.http.get(this.url);
}
public getcomments(id: string) {
  this.url = `${this.endPoint1}/recipecomment/recipe/` + id ;
  return this.http.get(this.url);
}
public addrecipecomment(body:any) {
  this.url = `${this.endPoint1}/recipecomment/submit`;
  return this.http.post(this.url,body);
}
//feedbacks
public getfeedbacks() {
  this.url = `${this.endPoint1}/feedback`;
  return this.http.get(this.url);
}
public addfeedback(body:any) {
  this.url = `${this.endPoint1}/feedback/submit`;
  return this.http.post(this.url,body);
}
//coupan
public appycoupan(body:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
  this.url = `${this.endPoint1}/coupon-apply`;
  return this.http.post(this.url,body,{headers:headers});
}
//profile
public getcountes(id: string) {
  const headers = new HttpHeaders()
  .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
  this.url = `${this.endPoint1}/profile/counters/` + id ;
  console.log("url",this.url)
  return this.http.get(this.url,{headers:headers});

}
public updateProfile(body:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
  this.url = `${this.endPoint1}/profile/update`;
  return this.http.post(this.url,body,{headers:headers});
} 
public changeimg(body:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
  this.url = `${this.endPoint1}/profile/update-image`;
  return this.http.post(this.url,body,{headers:headers});
} 
// convertation
public addconv(body:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken)
  this.url = `${this.endPoint1}/chat/create-conversation`;
  return this.http.post(this.url,body,{headers:headers});
}
public getallconv(id: string) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken)
  this.url = `${this.endPoint1}/chat/conversations/` + id ;
  return this.http.get(this.url,{headers:headers});
}
public getallmessages(id: string) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken)
  this.url = `${this.endPoint1}/chat/messages/` + id ;
  return this.http.get(this.url,{headers:headers});
}
public sendmessages(body:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken)
  this.url = `${this.endPoint1}/chat/insert-message`;
  return this.http.post(this.url,body,{headers:headers});
}
public getnewmessages(convid: any,lastid:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken)
  this.url = `${this.endPoint1}/chat/get-new-messages/` + convid +`/` + lastid +`?Content-Type=` + "application/json" +`&Authorization=Bearer`+ this.accesstoken;
  console.log("url",this.url)
  return this.http.get(this.url,{headers:headers});
}

}
