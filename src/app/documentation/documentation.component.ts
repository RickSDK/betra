import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent extends BaseComponent implements OnInit {

  public levels = [
    'one person likes',
    'match made',
    'question asked',
    'question replied',
    '2nd question replied',
    'Exchanged info',
    'Exchanged picture',
    'Went on date'
  ];

  constructor() { super(); }



}
