import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-area-input',
  templateUrl: './text-area-input.component.html',
  styleUrls: ['./text-area-input.component.scss']
})
export class TextAreaInputComponent implements OnInit {
  @Input('id') id: string = '';
  @Input('value') value: string = '';
  @Input('maxLength') maxLength: number = 500;
  @Output() messageEvent = new EventEmitter<string>();

  public strlen: number = 0;

  constructor() { }

  ngOnInit(): void {
  }
  inputValueChanged(event: any) {
    var e = (document.getElementById(this.id) as HTMLInputElement);
    if (e) {
      var value = event.target.value.normalize('NFD').replace(/[^\x00-\x7F]/g, '');
      value = value.replace(/`/g, '');
      e.value = value;
      if (value.length > this.maxLength) {
        value = value.substring(0, this.maxLength);
        e.value = value;
      }
      this.strlen = value.length;
      this.messageEvent.emit(value);
    }
  }
}
