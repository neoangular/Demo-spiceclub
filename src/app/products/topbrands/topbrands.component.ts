import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-topbrands',
  templateUrl: './topbrands.component.html',
  styleUrls: ['./topbrands.component.css']
})
export class TopbrandsComponent implements OnInit {
  Topbrands: any;
  loadingIndicator: boolean | undefined;

  constructor(private router: Router,private fb: FormBuilder,private request: RequestService, ) { }

  ngOnInit(): void {
  }

//    fetch(cb) {
//     this.request.gettopbrands().subscribe((response) => {
//      console.log(response);
//               cb(response);
//               // this.loader=false;
//     }, (error) => {
//       console.log(error);
//     });
//   }
// viewdata(){
//   this.fetch((data) => {
//     // this.data = data;
//     // this.filteredData = data;
//     this.Topbrands=data.response;
//     // this.filteredData=data.response;
//     setTimeout(() => {
//       this.loadingIndicator = false;
//     }, 500);
//   });
// }
}
