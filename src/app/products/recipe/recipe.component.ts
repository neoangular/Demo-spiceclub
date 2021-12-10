import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../core/models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  Allcat: any;
  Recipecat: any;
  page2: boolean=false;
  page1: boolean=true;
  Recipedetail: any;
  page3: boolean=false;
  Peoduct: any;
  Comments: any;
  comment!: FormGroup;
  rec_id: any;
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
  }
  ngOnInit(): void {
    this.viewdata();

    this.comment = this.fb.group({ 
      rating:[''],
      comment: [''],
   
    });
  }
  viewdata(){
    this.request.getallrecipecat().subscribe((response: any) => {
      this.Allcat=response.data;
      this.page1=true,
      this.page2=false,
      this.page3=false,
      console.log("response",response);
      console.log("allrecipecategory",this.Allcat);
     
    },
    (error: any) => {
      console.log("error",error);
    
    });
  }

  getprod(id:any){
    this.request.getrecipebycat(id).subscribe((response: any) => {
      this.Recipecat=response.data;
      this.page2=true,
      this.page1=false,
      this.page3=false,
      console.log("response",response);
      console.log("recipecategory",this.Recipecat);
     
    },
    (error: any) => {
      console.log("error",error);
    
    });
  }
  getrecdetail(id:any){
    this.rec_id=id;
    this.request.getrecipedetail(id).subscribe((response: any) => {
      this.Peoduct=response.data[0];
      this.page2=false,
      this.page1=false,
      this.page3=true,
      console.log("response",response);
      console.log("recipecategorydetail",this.Peoduct);
     
    },
    (error: any) => {
      console.log("error",error);
    
    });
    this.getcommentsss();
    
  }

 getcommentsss(){
    this.request.getcomments(this.rec_id).subscribe((response: any) => {
      this.Comments=response.data;
      this.page2=false,
      this.page1=false,
      this.page3=true,
      console.log("response",response);
      console.log("Comments",this.Comments);
     
    },
    (error: any) => {
      console.log("error",error);
    
    });
  }

    addcomment(form: FormGroup){
      let edata2={
        recipe_id : this.rec_id,
        user_id: this.userid,
        rating:form.value.rating,
        comment:form.value.comment,
      }
      console.log(edata2);  
      this.request.addrecipecomment(edata2).subscribe((res: any) => {
        console.log(res);
        if (res.message == 'Comment  Submitted') {       
          this.getcommentsss();
        }
        else  {
          console.log("error",res);
    
        }
      }, (error: any) => {
        console.log("error",error);
      
      });
    
    }

} 

