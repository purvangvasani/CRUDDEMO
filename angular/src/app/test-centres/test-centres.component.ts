import { Component, OnInit } from '@angular/core';
import {testCentres} from './testCentres';

@Component({
  selector: 'app-test-centres',
  templateUrl: './test-centres.component.html',
  styleUrls: ['./test-centres.component.scss']
})
export class TestCentresComponent implements OnInit {

  public testCentresArray: any = [];
  constructor() {
    this.testCentresArray = testCentres;
   }

  ngOnInit() {
  }

}
