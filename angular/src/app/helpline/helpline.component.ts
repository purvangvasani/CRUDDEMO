import { Component, OnInit } from '@angular/core';
import {state} from './state';
import {UTs} from './UT';

@Component({
  selector: 'app-helpline',
  templateUrl: './helpline.component.html',
  styleUrls: ['./helpline.component.scss']
})
export class HelplineComponent implements OnInit {

  public statesArray: any = [];
  public UTArray: any = [];

  constructor() {
    this.statesArray = state;
    this.UTArray = UTs;
   }

  ngOnInit() { }


}
