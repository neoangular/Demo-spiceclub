import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../core/models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as _ from 'lodash';
// import { ConfirmedValidator } from '';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  prodid:any
   _values1 = [" 1 ", "2", " 3 "," 4 "," 5 "," 6 "];
   _values2 = [" 1 ", "2", " 3 "," 4 "," 5 "];
  product_id: any;
  currentPrice: number | undefined;
  currentdetail: User;
  userid: any; 
  accesstoken: any;
  tokentype: any;
  countes: any;
  profilee: any;
  editForm: FormGroup;
  imageError!: string;
  isImageSaved: boolean=false;
  cardImageBase64!: string |null ;
  filename: any;
  profilepto: any;
  constructor(private router: Router,private fb: FormBuilder,private request: RequestService,private modalService: NgbModal,) { 
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')||'{}')
      
    );
    console.log("currentuser details=", this.currentUserSubject);
    this.currentUser = this.currentUserSubject.asObservable();
     this.currentdetail = this.currentUserSubject.value;
     this.userid=this.currentdetail.user.id; 
     this.accesstoken=this.currentdetail.access_token;
     this.tokentype=this.currentdetail.token_type;
     console.log("profile detail",this.currentdetail);
     this.profilee =this.currentdetail.user


     this.editForm = this.fb.group({
       name:[''],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    },
      // {
      //   validator: ConfirmedValidator('password', 'confirm_password')
      // }
      );
  }

  ngOnInit(): void {
    this.viewdata();
  }
  viewdata(){
    this.request.getcountes(this.userid).subscribe((response: any) => {
      this.countes=response;
      console.log("response",response);
      // console.log("countes",this.countes);
     
    },
    (error: any) => {
      console.log("error",error);
    
    });
  }
  editprofil(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }

  onEditSave(form: FormGroup) {   
    if (this.editForm.invalid) {
 
      console.log("Password and Confirm Password must be match.", );
      // form.reset();
      return;
    }
     else {
      const edata = {
        id: this.userid,
        name: form.value.name,
        password: form.value.password,
      }
      console.log("edata",edata)
      this.request.updateProfile(edata).subscribe((response: any) => {
        console.log("res",response)
        // if (res[0].status == 'success') {
        //   this.modalService.dismissAll();
  
        //   form.reset();
          
        //   return true;
        // }
        // else if (res[0].status == 'error') {
        //   this.modalService.dismissAll();
        // }

      }, (error) => {
        console.log(error);
        this.modalService.dismissAll();
      });

    }
  }
  editprofileimg(content: any){
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }

  fileChangeEvent(fileInput: any) {
    
    this.filename=fileInput.target.files[0].name;
    console.log("fileInput", this.filename);
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        // if (fileInput.target.files[0].size > max_size) {
        //     this.imageError =
        //         'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        //     return false;
        // }

        // if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        //     this.imageError = 'Only Images are allowed ( JPG | PNG )';
        //     return false;
        // }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
               
                // console.log(img_height, img_width);
                    const imgBase64Path = e.target.result.split(',')[1];  
                    this.cardImageBase64 = imgBase64Path;
                    this.isImageSaved = true;
                    // this.previewImagePath = imgBase64Path;
                    console.log("imgBase64Path", imgBase64Path);
                
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
    }
}

removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
}
changeproimg(){
  let edata ={
    id:this.userid,
    filename:this.filename,
    image:this.cardImageBase64
  }
  console.log("edata",edata)
  this.request.changeimg(edata).subscribe((response: any) => {
    console.log("response",response);
    this.profilee=response.path;
  },
  (error: any) => {
    console.log("error",error);
  
  });
}

}
