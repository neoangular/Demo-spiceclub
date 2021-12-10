import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/service/auth.service';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-searched',
  templateUrl: './searched.component.html',
  styleUrls: ['./searched.component.css']
})
export class SearchedComponent implements OnInit {
  Sort = [
    { id: 'price_low_to_high', value: 'price_low_to_high' },
    { id: 'price_high_to_low', value: 'price_high_to_low' },
    { id: 'new_arrival', value: 'new_arrival' },
    { id: 'popularity', value: 'popularity' },
    { id: 'top_rated', value: 'top_rated' },
  ];


registerForm: FormGroup;
  Peoduct: any;
  sortprod: any;
  Allcat: any;
  searchh: any;
  constructor(private router: Router,private fb: FormBuilder,private request: RequestService, 
    private formBuilder: FormBuilder, private authService: AuthService,private modalService: NgbModal,) {

      this.registerForm = this.formBuilder.group({
        min: [''], 
        max: [''],
        category:['']
       
      });
  
   }

  ngOnInit(): void {
    this.viewdata();
   
  }

  
viewdata(){
  this.request.getallcat().subscribe((response: any) => {
    this.Allcat=response.data;
    // this.page1=true,
    // this.page2=false,
    console.log("response",response);
    console.log("allcategory",this.Allcat);

  });
}
  get f() {
    return this.registerForm.controls;
  }

  opensort(content:any){
    this.registerForm.reset();
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }
  oncatChange(val:any){
   
      console.log("value",val);
      this.request.getsortprod(val).subscribe((response: any) => {
        this.sortprod=response.data;
        // this.page1=false,
        // this.page2=false,
        // this.page3=true,
        console.log("response",response);
         console.log("allprod",this.sortprod);
     
      });
    }

    apply(form: FormGroup){
      console.log("submitted");
      console.log("submitted",form.value.category,form.value.min,form.value.max);
      
      this.request.filterdataa(form.value.category,form.value.min,form.value.max).subscribe((response: any) => {
        this.sortprod=response.data;
        // this.page1=false,
        // this.page2=false,
        // this.page3=true,
        console.log("response",response);
         console.log("allprod",this.sortprod);
     
      });

    }
    filterDatatable(event:any){
  console.log(event.target.value)
  this.searchh=event.target.value
  this.request.filtersearchdataa(this.searchh).subscribe((response: any) => {
    this.sortprod=response.data; 
    console.log("response",response);
     console.log("search",this.sortprod);
 
  });

    }
}
