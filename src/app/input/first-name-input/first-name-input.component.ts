import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-first-name-input',
  templateUrl: './first-name-input.component.html',
  styleUrls: ['./first-name-input.component.scss']
})
export class FirstNameInputComponent implements OnInit {
  @Input('firstName') firstName: string = '';

  @Output() messageEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  menuValueChanged(event: any) {
    var e = (document.getElementById ('firstName') as HTMLInputElement);
    if(e)
      e.value = event.target.value.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');
    this.messageEvent.emit('change');
  }
}
