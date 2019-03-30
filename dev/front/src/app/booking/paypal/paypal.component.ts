import { Component, OnInit } from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export function testFirst(){
  let a: number = 3;
  let b: number = 8;
  return a+b;
  }
 

//  export function testFirst(state = {} , action){
//   switch(action.type){
//     case ACTION.START :
//       return Object.assign({}, state,{start:true});
//     default: 
//     return state;
  
