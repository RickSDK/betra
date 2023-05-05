import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';

declare var $: any;

@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.scss']
})
export class CreditCardFormComponent extends BaseComponent implements OnInit {
  public showFormFlg: boolean = false;

  constructor(databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
  }

  ccValueChanged(event: any) {
    var value = $('#ccNumber').val();
    var valueText = value.replace(/\D/g, '');
    $('#ccNumber').val(valueText);
    if (valueText.length >= 12) {
      var group1 = valueText.substring(0, 4);
      var group2 = valueText.substring(4, 8);
      var group3 = valueText.substring(8, 12);
      var group4 = valueText.substring(12);
      $('#ccNumber').val(group1 + ' ' + group2 + ' ' + group3 + ' ' + group4);
    } else if (valueText.length >= 8) {
      var group1 = valueText.substring(0, 4);
      var group2 = valueText.substring(4, 8);
      var group3 = valueText.substring(8);
      $('#ccNumber').val(group1 + ' ' + group2 + ' ' + group3);
    } else if (valueText.length >= 4) {
      var group1 = valueText.substring(0, 4);
      var group2 = valueText.substring(4);
      $('#ccNumber').val(group1 + ' ' + group2);
    }
  }
  expValueChanged(event: any) {
    var value = $('#expNumber').val();
    var valueText = value.replace(/\D/g, '');
    $('#expNumber').val(valueText);
    if (valueText.length >= 2) {
      var group1 = valueText.substring(0, 2);
      var group2 = valueText.substring(2, 4);
      $('#expNumber').val(group1 + ' / ' + group2);
    }
  }

  cvcValueChanged(event: any) {
    var value = $('#cvcNumber').val();
    var valueText = value.replace(/\D/g, '');
    $('#cvcNumber').val(valueText);
  }
  zipcodeValueChanged(event: any) {
    var value = $('#zipcode').val();
    var valueText = value.replace(/\D/g, '');
    $('#zipcode').val(valueText);
  }

  submitButtonPressed() {
    var card_number = $('#ccNumber').val();
    card_number = card_number.replace(/\D/g, '');
    var exp_number = $('#expNumber').val();
    exp_number = exp_number.replace(/\D/g, '');
    var cvcNumber = $('#cvcNumber').val();
    var zipcode = $('#zipcode').val();
    var customerName = $('#customerName').val();

    if (card_number.length < 16) {
      this.errorMessage = 'Enter valid card number';
      return;
    }
    if (exp_number.length < 4) {
      this.errorMessage = 'Enter valid exp date';
      return;
    }
    if (cvcNumber.length < 3) {
      this.errorMessage = 'Enter valid CVC number';
      return;
    }
    if (customerName.length < 5) {
      this.errorMessage = 'Enter valid name';
      return;
    }
    this.showFormFlg = false;
    var params = {
      card_number: card_number,
      exp_number: exp_number,
      cvc: cvcNumber,
      zip_code: zipcode,
      customerName: customerName,
    }
    this.getDataFromServer('addCreditCard', 'payments.php', params);
  }

}
