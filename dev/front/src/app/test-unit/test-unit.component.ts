import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-unit',
  templateUrl: './test-unit.component.html',
  styleUrls: ['./test-unit.component.css']
})
export class TestUnitComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


 export function testFirst(){
    return 15;
}
