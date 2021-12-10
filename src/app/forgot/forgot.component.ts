import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  meetings = [

    { id: 'phone', value: 'phone' },
    { id: 'email', value: 'email' },

  ];
  forgotForm!: FormGroup;
  passwordForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder,
    private formBuilder: FormBuilder, private authService: AuthService,private modalService: NgbModal) {
      this.forgotForm = this.formBuilder.group({
        Mobile: ['', Validators.required],
        Type: ['', Validators.required],
        // meeting_type:['', Validators.required]
      });
     }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      otp: ['', Validators.required],
      newpassword: ['', Validators.required],
      // meeting_type:['', Validators.required]
    });
  }
  get f() {
    return this.forgotForm.controls;
  }
  get f1() {
    return this.passwordForm.controls;
  }

  newpass(content: any){
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });}

  //  forgot request
  onSubmit(content: any) {
    //  this.disable=true;  
    console.log("submited");
    if (this.forgotForm.invalid) {
      //  this.disable=false;
      console.log("form invalid",);
    } else {
    
      let edata1 = {
        email_or_phone: "" + this.forgotForm.controls['Mobile'].value,
        send_code_by: "" + this.forgotForm.controls['Type'].value,
      }
      console.log(edata1);
     
      this.authService.conformforgot(edata1) .subscribe(
          (res) => {
            console.log(res);
            if (res) { 
              if (res.message == "A code is sent") {
                this.modalService.open(content, {
                  ariaLabelledBy: 'modal-basic-title',
                  size: 'lg',
                });
                console.log("code sent to mail")    
              }
            } else {
              console.log("enter registered mailid");;    
            }
          },
          (error: string) => {
            console.log("test", "" + error);
          }
        );
    }
  }

  // password change
  onAddRowSave(){
    //  this.disable=true;  
 console.log("submited");
 if (this.passwordForm.invalid) {
   //  this.disable=false;
   console.log("form invalid",);
 } else {
  
   let edata3 = {
     verification_code: "" + this.passwordForm.controls['otp'].value,
     password: "" + this.passwordForm.controls['newpassword'].value,
   }
   console.log(edata3);
   // current user by login is stored in local storage -see authservice
   this.authService.resetpassword(edata3) .subscribe(
       (res) => {
         console.log(res);
         if (res) {
           if (res.message == "Your password is reset.Please login") {
            this.modalService.dismissAll();
             this.router.navigate(['/login']);
             console.log("you are logged in")
           }
           
         } else if(res.message == "No user is found") {
           console.log("Invalid code");   
         }
       },
       (error: string) => {

         console.log("test", "" + error);

       }
     );
 }

 }
  resend(){
    let edata2={
       email_or_phone: "" + this.forgotForm.controls['Mobile'].value,
       verify_by: "" + this.forgotForm.controls['Type'].value,
    }
       console.log("resend data",edata2);
        this.authService.resendforgot(edata2).subscribe(
      (res) => {
        console.log("responseee",res);
        if (res.message == "A code is sent again") { 
            console.log("A code is sent again");
            // this.error1 = 'Incorrect OTP!!Please Try Again!!!!';  
         
        } else {
           console.log("need credentials");
          //  this.router.navigate(['/main']);
          // this.error1 = 'Invalid Login';
        }
      },
      (error1) => {
        console.log("fail");
        // this.error1 = error1;
        // this.submitted = false;
      }
    );
  }

}
function content(content: any, arg1: { ariaLabelledBy: string; size: string; }) {
  throw new Error('Function not implemented.');
}

