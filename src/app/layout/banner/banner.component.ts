import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  Slider: any;
  loadingIndicator: boolean | undefined;
  Futurecatg: any;
  opencat: any;
  FeaturePro: any;
  page1: boolean=true;
  page2: boolean=false;
  openproduct: any;
  Peoduct: any;
  page3: boolean=false;
  Banners: any;
  Todaysdeal: any;

  constructor(private router: Router,private fb: FormBuilder,private request: RequestService) { }

  ngOnInit(): void {
    this.viewdata();
    this.viewdata2();
    this.viewdata3();
    this.viewdata4();

  }
  viewdata(){
    this.request.getslider().subscribe((response: any) => {
      // this.data = data;
      // this.filteredData = data;
      this.Slider=response.data;
      
       console.log("slider.data",response.data);
      console.log("slider",this.Slider);
      // this.filteredData=data.response;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });
  }
   
viewdata2(){
  this.request.getfuturedcat().subscribe((response: any) => {
    // this.data = data;
    // this.filteredData = data;
    this.Futurecatg=response.data;
   
    console.log("response.data",response);
    console.log("allbrands",this.Futurecatg);
    // this.filteredData=data.response;
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 500);
  });
}
viewdata3(){
  this.request.getbanner().subscribe((response: any) => {
    // this.data = data;
    // this.filteredData = data;
    this.Banners=response.data;
    
     console.log("slider.data",response.data);
    console.log("slider",this.Slider);
    // this.filteredData=data.response;
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 500);
  });
}
viewdata4(){
  this.request.gettodaysdeal().subscribe((response: any) => {
    this.Todaysdeal=response.data;
     console.log("Todaysdeal.data",response.data);
    console.log("Todaysdeal",this.Todaysdeal);
  });

}
viewrow(img: any){
  this.opencat=img.links.products
   console.log("detail",img.links.products);
   this.viewbrand();
}

viewbrand(){
  this.request.viewallfeatured(this.opencat).subscribe((response: any) => {
    // this.data = data;
    // this.filteredData = data;
    this.FeaturePro=response.data;
    this.page1=false
    this.page2=true
    console.log("response.data",response.data);
 
    // this.filteredData=data.response;
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 500);
  });

}
viewproductrow(img: any){
  this.openproduct=img.links.details
console.log("detail", this.openproduct);
  this.viewrqwproduct();
} 

viewrqwproduct(){
  var product_id
  this.request.viewfeatproducd(this.openproduct).subscribe((response: any) => {
    // this.data = data;
    // this.filteredData = data;
    this.Peoduct=response.data[0];
     product_id=this.Peoduct.id;
    // console.log("topsellis",product_id);
   console.log("response.data",this.Peoduct);
    this.page1=false,
    this.page2=false,
    this.page3=true,
  
    // this.filteredData=data.response;
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 500);
  });
  console.log("topsellis",product_id);

}

}
