import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { RequestService } from 'src/app/service/request.service';
import { User } from '../../core/models/user';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  userid: any;
  accesstoken: any;
  tokentype: any;Proce: any;
  currentdetail: User;
  register!: FormGroup;
  City: any;
  Country: any;
  State: any;
  Address: any;
  editForm!: FormGroup;
  rowiid: any;

  constructor(private request: RequestService,  private fb: FormBuilder,
    private modalService: NgbModal,) {
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
    this.getaddress();
    this.viewcountry();
    this. viewstate();
    this.viewCity();

    this.register = this.fb.group({
     
     address: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['',[Validators.required]],
      city: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
      phone: [ '',],

    });


    this.editForm = this.fb.group({
     
      address: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['',[Validators.required]],
      city: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
      phone: [ '',],
    });
  
  }
  getaddress(){
    this.request.fetchaddress(this.userid).subscribe((response: any) => {
      this.Address=response.data;   
      console.log("Address",this.Address);     
    // this. processdata()    
    });
  }
  addaddresss(content:any){
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });  
  }

  viewcountry(){
    this.request.fetchcountry().subscribe((response: any) => {
      this.Country=response.data;   
      console.log("country",this.Country);     
    // this. processdata()    
    });
  }
  viewstate(){
    this.request.fetchstate().subscribe((response: any) => {
      this.State=response.data;   
      console.log("state",this.State);     
    // this. processdata()    
    });
  }
  viewCity(){
    this.request.fetchCity().subscribe((response: any) => {
      this.City=response.data;   
      console.log("City",this.State);     
    // this. processdata()    
    });
  }
  onAddRowSave(form: FormGroup) {  
    const edata = { 
      user_id: this.userid,
      address:form.value.address,
      country_id:form.value.country,
      state_id:form.value.state,
      city_id:form.value.city,
      postal_code:form.value.postal_code,
      phone:form.value.phone,  
    }
    console.log(edata);
  
    this.request.addaddress(edata).subscribe((res: any) => {
      console.log(res);
      if (res.status == 'Shipping information has been added successfully') {       
        form.reset()
        this.getaddress()
      this.modalService.dismissAll();
    // this.viewdata();    
      }
      else  {
        console.log("res",res);
        form.reset();
    this.modalService.dismissAll();
      }
    }, (error: any) => {
      console.log("error",error);
      form.reset();
      this.modalService.dismissAll();
    });
  }
  editRow(row: any , content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });

    console.log("adderess",row.id);
    this.rowiid=row.id;


    this.editForm.setValue({
      address: row.address,
      country: row.country_name,
      state: row.state_name,
      city: row.city_name,
      postal_code: row.postal_code,
      phone: row.phone,

    });
  

  }
  deleteRow(row:any) {
    console.log("row",row.id);
    this.request.deleteaddress(row.id).subscribe((response: any) => {
      console.log(response); 
      if (response.message == 'Shipping information has been deleted') {
        this.modalService.dismissAll();
        this.getaddress(); 
      
      }
      else  {
        this.modalService.dismissAll();
        console.log("responnn",response);
      }   
     }, (error: any) => {
       console.log(error);
     });
  }


  onEditSave(form: FormGroup) {

    // var x = this.editRow(row, content);
  console.log("row id",this.rowiid)

    const edata2 = {
       id:this.rowiid,
      user_id: this.userid,
      address:form.value.address,
      country_id:form.value.country,
      state_id:form.value.state,
      city_id:form.value.city,
      postal_code:form.value.postal_code,
      phone:form.value.phone,  
  }
  console.log("responnn",edata2);
  this.request.updateaddress(edata2).subscribe((res: any) => {
    console.log("responnn",res);
    if (res.message == 'Shipping information has been updated successfully') {
      this.modalService.dismissAll();
      this.getaddress(); 
    
    }
    else  {
      this.modalService.dismissAll();
      console.log("responnn",res);
    }

  }, (error: any) => {
    console.log(error);
    this.modalService.dismissAll();
  });

  }


}
function content(row: any, content: any) {
  throw new Error('Function not implemented.');
}

function row(row: any, content: (row: any, content: any) => void) {
  throw new Error('Function not implemented.');
}

