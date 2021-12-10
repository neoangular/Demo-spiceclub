import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, FormControl,  Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { RequestService } from '../service/request.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  Regby = [  
    { id: 'email', value: 'email' },
    { id: 'phone', value: 'phone' },  
  ];
  registerForm: FormGroup;
  submitted: boolean | undefined;
  otpform!: FormGroup;
  userid: any;
  constructor( private router: Router,private fb: FormBuilder,private request: RequestService, 
    private formBuilder: FormBuilder, private authService: AuthService,private modalService: NgbModal,) {
    this.registerForm = this.formBuilder.group({
      fname: ['', Validators.required], 
      Mobile: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      password: ['', Validators.required], 
      confirmpassword: ['', Validators.required],
      register_by: ['', Validators.required],
    });
   }

  ngOnInit(): void {
    this.otpform = this.fb.group({ 
      otp: ['', [Validators.required]], 
    });
  }
  get f1() {
   
    return this.otpform.controls;
  }
  get f() {
    return this.registerForm.controls;
    
  }
  onSubmit(content: any) {
   
    this.submitted = true;

    if (this.registerForm.invalid) {
      console.log("form invalid")
      return;
    } else {
       let edata={
             name:""+this.registerForm.controls['fname'].value,
             email:""+this.registerForm.controls['email'].value,
             phone:""+this.registerForm.controls['Mobile'].value,
             password:""+this.registerForm.controls['password'].value,
             passowrd_confirmation:""+this.registerForm.controls['confirmpassword'].value,
             register_by:""+this.registerForm.controls['register_by'].value,      
           }
           console.log("reg",edata)

      this.authService.adduser(edata).subscribe(
        (res: any) => {
          console.log("response",res);
          this.userid =res.user_id
          if (res.message == "Registration Successful. Please verify and log in to your account.") {
            console.log("registerForm",""+res.result);
            console.log("response",res);
            this.modalService.open(content, {
              ariaLabelledBy: 'modal-basic-title',
              size: 'lg',
            });
          } else  {
            console.log("failresult",""+res.message);
           
          }
        },
        
      );
    } 

  }

  onAddRowSave(form: FormGroup) {
    let edata1={
      user_id: this.userid,
      verification_code:""+this.otpform.controls['otp'].value,
      // mobile_no :""+this.registerForm.controls['Mobile'].value,
    }
    this.authService.registerotpverification(edata1) .subscribe(
      (res) => {
        console.log("responseee",""+res);
        if (res.message == "Code does not match, you can request for resending the code") { 
            console.log("Code does not match");
            // this.error1 = 'Incorrect OTP!!Please Try Again!!!!';  
         
        } else {
           console.log("Code matched");
           this.router.navigate(['/main']);
          // this.error1 = 'Invalid Login';
        }
      },
      (error1) => {
        // this.error1 = error1;
        console.log("fail1",error1);
        this.submitted = false;
      }
    );
    // this.request.addsellerotp(seller).subscribe(
    //   (res: any) => {
    //     if (res.login_status == "1") {
    //       console.log("registerForm",""+res.login_status);
    //       localStorage.setItem('currentUser', JSON.stringify(res));
    //       this.currentUserSubject.next(res);
    //       this.modalService.dismissAll();
    //       this.router.navigate(['/dashboard/main']);
    //     } else if (res.login_status == "0") {
         
    //     }
    //   },
    //   error => {
       
    //   }
    // );
    
  }
  resend(){
    let edata2={
      user_id: this.userid,
      register_by:""+this.registerForm.controls['register_by'].value,
      // mobile_no :""+this.registerForm.controls['Mobile'].value,
     
    }
       console.log("resend data",edata2);
    this.authService.resendotp(edata2).subscribe(
      (res) => {
        console.log("responseee",""+res);
        // if (res.message == "Code does not match, you can request for resending the code") { 
        //     console.log("Code does not match");
        //     // this.error1 = 'Incorrect OTP!!Please Try Again!!!!';  
         
        // } else {
        //    console.log("Code  matched");
        //    this.router.navigate(['/main']);
        //   // this.error1 = 'Invalid Login';
        // }
      },
      (error1) => {
        console.log("fail");
        // this.error1 = error1;
        this.submitted = false;
      }
    );
  }
}
