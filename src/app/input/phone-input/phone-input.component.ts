import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss']
})
export class PhoneInputComponent implements OnInit {
  @Input('phone') phone: string = '';

  @Output() messageEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  menuValueChanged(event: any) {
    var firstDigit = 0;
    if (event.target.value && event.target.value.length > 0)
      firstDigit = event.target.value.substring(0, 1);
    var numbers = event.target.value.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9])/g, '');
    var e = (document.getElementById('phone') as HTMLInputElement);
    if (e && (firstDigit > 1 || firstDigit.toString() == '(')) {
      if (numbers.length >= 3) {
        var areaCode = numbers.substring(0, 3);
        if (numbers.length >= 3)
          areaCode = '(' + areaCode + ') ';
        var prefix = numbers.substring(3, 6);
        if (numbers.length >= 6)
          prefix = prefix + '-';

        var num = numbers.substring(6, 10)
        e.value = areaCode.toString() + prefix.toString() + num.toString();
        this.phone = e.value;
      }

    }
    this.messageEvent.emit('change');
  }
}
