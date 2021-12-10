import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-selershop',
  templateUrl: './selershop.component.html',
  styleUrls: ['./selershop.component.css']
})
export class SelershopComponent implements OnInit {
  Allshop: any;
  shopdetail: any;
  page2: boolean =false;
  page1: boolean =true;
  Newarrival: any;
  Featuredprod: any;
  topprod: any;

  constructor(private router: Router,private fb: FormBuilder,private request: RequestService,) { }

  ngOnInit(): void {
    this.viewdata();
    // console.log("currentuser=", this.quantityy);
  }

  
viewdata(){
  this.request.getallshop().subscribe((response: any) => {
    this.Allshop=response.data;
    this.page1=true,
    this.page2=false,
    console.log("response",response);
    console.log("allshop",this.Allshop);
  
  });
}
getshopdetail(id:any){
  this.request.getshopdetails(id).subscribe((response: any) => {
    this.shopdetail=response.data[0];
    this.page2=true,
    this.page1=false,
   
    console.log("allshop",this.Allshop);
  });
  this.request.getnewarrival(id).subscribe((response: any) => {
    this.Newarrival=response.data;
    this.page2=true,
    this.page1=false,  
    console.log("new arrival",this.Newarrival);
  }); 
  this.request.getshopfeatured(id).subscribe((response: any) => {
    this.Featuredprod=response.data;
    this.page2=true,
    this.page1=false,  
    console.log(" Featuredprod",this.Featuredprod);
  }); 
  this.request.gettopshop(id).subscribe((response: any) => {
    this.topprod=response.data;
    this.page2=true,
    this.page1=false,  
    console.log(" topprod",this.topprod);
  }); 
}

}
