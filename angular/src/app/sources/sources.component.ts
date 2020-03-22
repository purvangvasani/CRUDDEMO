import { Component, OnInit } from '@angular/core';
import {sources} from './sources';

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.scss']
})
export class SourcesComponent implements OnInit {

  public sourcesArray: any = [];
  constructor() {
    this.sourcesArray = sources;
   }

  ngOnInit() {
  }

}
