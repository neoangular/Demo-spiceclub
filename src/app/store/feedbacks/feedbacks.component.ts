import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.css']
})
export class FeedbacksComponent implements OnInit {
  Feedback: any;
  comment!: FormGroup;
  constructor(private router: Router,private fb: FormBuilder,private request: RequestService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getfeedback();

    this.comment = this.fb.group({ 
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobile_no: ['',[Validators.required]],
      feedback: ['', [Validators.required]],

    });
    
  }
  getfeedback(){
    this.request.getfeedbacks().subscribe((response: any) => {
      this.Feedback=response.data;
     
      console.log("response",response);
      console.log("Feedback",this.Feedback);
     
    },
    (error: any) => {
      console.log("error",error);
    
    });
  }

  addfeedback(form: FormGroup){
    let edata2={
      name:form.value.name,
      email:form.value.email,
      mobile_no:form.value.mobile_no,
      feedback:form.value.feedback,
      
    }
    console.log(edata2);  
    this.request.addfeedback(edata2).subscribe((res: any) => {
      console.log(res);
      if (res.message == 'Feedback  Submitted') {       
        this.getfeedback();
      }
      else  {
        console.log("error",res);
  
      }
    }, (error: any) => {
      console.log("error",error);
    
    });
  
  }

}
