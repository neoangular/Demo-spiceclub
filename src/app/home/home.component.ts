import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { RequestService } from 'src/app/service/request.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../core/models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup, } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { signOut } from "firebase/auth";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  provider: any;
  loginForm!: FormGroup;
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  prodid: any
  _values1 = [" 1 ", "2", " 3 ", " 4 ", " 5 ", " 6 "];
  product_id: any;
  currentPrice: number | undefined;
  currentdetail: User;
  userid: any;
  accesstoken: any;
  tokentype: any;
  otpform!: FormGroup;
  useer_id: any;
  loginotpform!: FormGroup;
  loginverifyform!: FormGroup;
  byertypeform!: FormGroup;
  otpuserid: any;
  s_username: any;
  s_useremail: any;
  s_provider: any;
  s_usermobile: string | null | undefined;
  s_useraccessToken: any;
  s_logintype: any;
  byertype: any;
  buyer: any;
  buer_type: any;



  constructor(private router: Router, private fb: FormBuilder, private request: RequestService,
    private formBuilder: FormBuilder, private authService: AuthService, private modalService: NgbModal,) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')

    );
    console.log("currentuser details=", this.currentUserSubject);
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentdetail = this.currentUserSubject.value;
    this.userid = this.currentdetail.user?.id;
    this.accesstoken = this.currentdetail.access_token;
    this.tokentype = this.currentdetail.token_type;

  }

  ngOnInit(): void {

    this.getbyertype()
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
    this.byertypeform = this.fb.group({
      buyer_type: ['', [Validators.required]],
    });

  }
  get f() {
    return this.loginForm.controls;
  }
  get f1() {
    return this.otpform.controls;
  }
  getbyertype() {
    this.request.getbyertype().subscribe((res: any) => {
      console.log("buertype", res)
      this.buyer = res.data;
    },
      (error: any) => {
        console.log(error);
      })

  }
  onSubmit(content: any) {
    if (this.loginForm.invalid) {
      console.log("err2",);
      return;
    } else {
      this.authService
        .login(this.f.username.value, this.f.password.value,).subscribe((res) => {
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
          (error: any) => {
            console.log("test", "", error.error);
            if (error.error.message == "User not found") {
              console.log("User not found");
            } else if (error.error.message == "Unauthorized") {
              console.log("Unauthorized");
            }
            else if (error.error.message == "Please verify your account") {
              console.log("Please verify your account");
              this.resend();
              this.otpSubmit(content)

            }
            else {
              console.log("error", error.error.message);
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
  resend() {
    let edata2 = {
      email_or_phone: this.f.username.value,
      user_id: this.userid ?? null,
      register_by: "email",
    }
    console.log("resend data", edata2);
    this.authService.resendotp(edata2).subscribe(
      (res) => {
        console.log("responseee", res);
        this.useer_id = res.user_id
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
        console.log("fail", error1);
        // this.error1 = error1;
        // this.submitted = false;
      }
    );
  }
  onAddRowSave(form: FormGroup) {
    let edata1 = {
      user_id: this.useer_id,
      verification_code: "" + this.otpform.controls['otp'].value,
      // mobile_no :""+this.registerForm.controls['Mobile'].value,
    }
    console.log("resend data", edata1);
    this.authService.registerotpverification(edata1).subscribe(
      (res) => {
        console.log("responseee", "" + res);
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
        console.log("fail1", error1);

      }
    );
  }
  loginotp(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }
  loginotpverify(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }

  requestloginotp(form: FormGroup, content: any) {
    if (this.loginotpform.invalid) {
      console.log("err2",);
      return;
    } else {
      let edata1 = {
        phone: form.value.phone,
        // mobile_no :""+this.registerForm.controls['Mobile'].value,
      }
      console.log("edata1", edata1);
      this.authService.reqotplogin(edata1).subscribe((res) => {
        console.log(res);
        this.otpuserid = res.user_id
        if (res) {
          if (res.message == "OTP code is sent to Mobile ") {
            console.log("OTP code is sent to Mobile '");
            this.modalService.open(content, {
              ariaLabelledBy: 'modal-basic-title',
              size: 'lg',
            });
            return;
          }
        } else {
          console.log("else err");
        }
      },
        (error: any) => {
          console.log("test", "", error.error);
        }
      );
    }
  }

  verifyloginotp(form: FormGroup) {
    if (this.loginverifyform.invalid) {
      console.log("err2",);
      return;
    } else {
      let edata1 = {
        user_id: this.otpuserid,
        otp_code: form.value.otp_code,
        // mobile_no :""+this.registerForm.controls['Mobile'].value,
      }
      console.log("edata", edata1);
      this.authService.otplogin(edata1).subscribe((res) => {
        console.log("loginuser", res);
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
        (error: any) => {
          console.log("test", "", error.error);
          if (error.error.message == "User not found") {
            console.log("User not found");
          } else if (error.error.message == "Unauthorized") {
            console.log("Unauthorized");
          }
          else if (error.error.message == "Please verify your account") {
            console.log("Please verify your account");
            this.resend();
            //  this.otpSubmit(content);      
          }
          else {
            console.log("error", error.error.message);
          }
        }
      );
    }
  }

  loginWithGoogle(content: any) {
    const provider = new GoogleAuthProvider();
    this.provider = provider

    this.s_logintype = "google"
    console.log("googlelogin");
    const auth = getAuth();
    signInWithPopup(auth, this.provider)
      .then((result) => {

        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        const user = result.user;

        this.s_username = user.displayName;
        this.s_useremail = user.email;
        this.s_usermobile = user.phoneNumber;
        this.s_useraccessToken = token;
        console.log("user", user);
        if (user) {
          this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
          });
        }

      }).catch((error) => {
        console.log("error", error);
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

      });
  }
  loginWithFacebook(content: any) {
    this.s_logintype = "facebook"
    console.log("facebooklogin");
    const provider = new FacebookAuthProvider();
    this.provider = provider;
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        this.s_username = user.displayName;
        this.s_useremail = user.providerData[0].email;
        this.s_usermobile = user.providerData[0].phoneNumber;
        this.s_useraccessToken = token;
        console.log("user", user);
        console.log("user", user.providerData[0].email);
        if (user) {
          this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
          });
        }


        //  let a:any;
        //  a = credential
        //  const token = a.accessToken;    
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });

  }
  submitbyertype(form: FormGroup) {
    this.buer_type = form.value.buyer_type

    this.validateuser();
  }

  validateuser() {
    let edata1 = {
      name: this.s_username,
      email: this.s_useremail,
      phoneNumber: this.s_usermobile,
      provider: this.s_useraccessToken,
      loginby: this.s_logintype,
      buyertype: this.buer_type
    }
    console.log(edata1);
    
    if(edata1.email==null){
      console.log("S-user data",edata1);
      console.log("verify mail in facebook");
    }
    else{
    console.log("S-user data",edata1);
    this.authService.sociallogin(edata1) .subscribe(
      (res) => {
        console.log("responseee",res);
        if (res.message == "Successfully logged in") { 
            console.log("Successfully logged in");
            this.modalService.dismissAll();
            this.router.navigate(['/main']);
            // this.error1 = 'Incorrect OTP!!Please Try Again!!!!';       
        } else {
           console.log("error occured");
          //  this.router.navigate(['/main']);
          // this.error1 = 'Invalid Login';
        }
      },
      (error1) => {
        // this.error1 = error1;
        console.log("fail1",error1);

      }
    );   }
  }
  logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
    }).catch((error) => {
    });
  }

}


