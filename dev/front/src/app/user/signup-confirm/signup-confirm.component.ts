import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-confirm',
  templateUrl: './signup-confirm.component.html',
  styleUrls: ['./signup-confirm.component.css']
})
export class SignupConfirmComponent implements OnInit {

  email: string;
  fullname: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.email = this.route.snapshot.params.email;
    this.fullname = this.route.snapshot.params.fullname;
    
  }

}
