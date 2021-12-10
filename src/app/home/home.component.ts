import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, FormControl,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { RequestService } from 'src/app/service/request.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../core/models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginForm!: FormGroup;
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  prodid:any
   _values1 = [" 1 ", "2", " 3 "," 4 "," 5 "," 6 "];
  product_id: any;
  currentPrice: number | undefined;
  currentdetail: User;
  userid: any ;
  accesstoken: any;
  tokentype: any;
  otpform!: FormGroup;
  useer_id: any;
  loginotpform!: FormGroup;
  loginverifyform!: FormGroup;
  otpuserid: any;

  

  constructor(  private router: Router,private fb: FormBuilder,private request: RequestService, 
    private formBuilder: FormBuilder, private authService: AuthService,private modalService: NgbModal,) {
      this.currentUserSubject = new BehaviorSubject<User>(
        JSON.parse(localStorage.getItem('currentUser')||'{}')
        
      );
      console.log("currentuser details=", this.currentUserSubject);
      this.currentUser = this.currentUserSubject.asObservable();
       this.currentdetail = this.currentUserSubject.value;
       this.userid=this.currentdetail.user?.id; 
       this.accesstoken=this.currentdetail.access_token;
       this.tokentype=this.currentdetail.token_type;

     }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      // meeting_type:['', Validators.required]
    });

    this.otpform = this.fb.group({ 
      otp: ['', [Validators.required]],
    });

    this.loginotpform = this.fb.group({ 
      phone: ['', [Validators.required]],
    });
    this.loginverifyform = this.fb.group({ 
      otp_code: ['', [Validators.required]],
    });
 
  }
  get f() {
    return this.loginForm.controls;
  }
  get f1() {
    return this.otpform.controls;
  }

  onSubmit(content: any) {  
    if (this.loginForm.invalid) {  
      console.log("err2",);
      return;  
    } else {
      this.authService
        .login(this.f.username.value,this.f.password.value,) .subscribe( (res) => {          
             console.log(res); 
            if (res) {
            
              if (res.message == "User not found") {
                console.log("User not found");               
                return;
              }
              if (res.message == "Unauthorized") {  
                console.log("Unauthorized");  
              }
              if (res.message == "Successfully logged in") {  
                console.log("hiii you are logged in");
                this.router.navigate(['/main']);
              }
            } else {
              console.log("Invalid Login"); 
            }
            
          },
          (error:any) => {   
            console.log("test","",error.error);
            if(error.error.message=="User not found"){
              console.log("User not found"); 
            }else if(error.error.message=="Unauthorized"){
              console.log("Unauthorized"); 
            }
            else if(error.error.message=="Please verify your account"){
              console.log("Please verify your account"); 
              this.resend();
             this.otpSubmit(content)
              
             
            }
            else{
              console.log("error",error.error.message);
            }  
          }
        );
    }
  }
  otpSubmit(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }
  resend(){
    let edata2={
     email_or_phone:this.f.username.value,
      user_id: this.userid ?? null,
      register_by:"email",
      // register_by:""+this.registerForm.controls['register_by'].value,
      // mobile_no :""+this.registerForm.controls['Mobile'].value,
     
    }
       console.log("resend data",edata2);
    this.authService.resendotp(edata2).subscribe(
      (res) => {
        console.log("responseee",res);
        this.useer_id=res.user_id
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
        console.log("fail",error1);
        // this.error1 = error1;
        // this.submitted = false;
      }
    );
  }
  onAddRowSave(form: FormGroup) {
    let edata1={
      user_id: this.useer_id ,
      verification_code:""+this.otpform.controls['otp'].value,
      // mobile_no :""+this.registerForm.controls['Mobile'].value,
    }
    console.log("resend data",edata1);
    this.authService.registerotpverification(edata1) .subscribe(
      (res) => {
        console.log("responseee",""+res);
        if (res.message == "Code does not match, you can request for resending the code") { 
            console.log("Code does not match");
            // this.error1 = 'Incorrect OTP!!Please Try Again!!!!';  
         
        } else {
           console.log("Code  matched");
           this.router.navigate(['/main']);
          // this.error1 = 'Invalid Login';
        }
      },
      (error1) => {
        // this.error1 = error1;
        console.log("fail1",error1);
        
      }
    );   
  }
  loginotp(content: any){
    this.modalService.open(content, {
      ariaLabelledBy:'modal-basic-title',
      size: 'lg',
    });
  }
  loginotpverify(content: any){
    this.modalService.open(content, {
      ariaLabelledBy:'modal-basic-title',
      size: 'lg',
    });
  }

  requestloginotp(form: FormGroup,content:any) {  
    if (this.loginotpform.invalid) {  
      console.log("err2",);
      return;  
    } else {
      let edata1={
        phone:form.value.phone,
        // mobile_no :""+this.registerForm.controls['Mobile'].value,
      } 
      console.log("edata1",edata1);
      this.authService.reqotplogin(edata1).subscribe( (res) => {          
             console.log(res); 
             this.otpuserid=res.user_id
            if (res) {
              if (res.message == "OTP code is sent to Mobile ") {
                console.log("OTP code is sent to Mobile '");               
               
             
              
              this.modalService.open(content, {
                ariaLabelledBy:'modal-basic-title',
                size: 'lg',
              });
              return;
            }

            } else {

              console.log("else err"); 
         
            }
            
          },
          (error:any) => {   
            console.log("test","",error.error);
         
           
          }
        );
    }
  }

  verifyloginotp(form: FormGroup) {  
    if (this.loginverifyform.invalid) {  
      console.log("err2",);
      return;  
    } else {
      let edata1={
        user_id:this.otpuserid,
        otp_code:form.value.otp_code,
        // mobile_no :""+this.registerForm.controls['Mobile'].value,
      } 
      console.log("edata",edata1);
      this.authService.otplogin(edata1).subscribe( (res) => {          
             console.log("loginuser",res); 
            if (res) {
              if (res.message == "User not found") {
                console.log("User not found");               
                return;
              }
              if (res.message == "Unauthorized") {  
                console.log("Unauthorized");  
              }
              if (res.message == "Successfully logged in") {  
                console.log("hiii you are logged in");
                this.router.navigate(['/main']);
                this.modalService.dismissAll();
              }
            } else {
              console.log("Invalid Login"); 
            }
            
          },
          (error:any) => {   
            console.log("test","",error.error);
            if(error.error.message=="User not found"){
              console.log("User not found"); 
            }else if(error.error.message=="Unauthorized"){
              console.log("Unauthorized"); 
            }
            else if(error.error.message=="Please verify your account"){
              console.log("Please verify your account"); 
              this.resend();
            //  this.otpSubmit(content);      
            }
            else{
              console.log("error",error.error.message);
            }  
          }
        );
    }
  }
 

}


