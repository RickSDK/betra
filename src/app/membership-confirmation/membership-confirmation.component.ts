import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';

declare var $: any;

@Component({
  selector: 'app-membership-confirmation',
  templateUrl: './membership-confirmation.component.html',
  styleUrls: ['./membership-confirmation.component.scss']
})
export class MembershipConfirmationComponent extends BaseComponent implements OnInit {
  public plans = [
    { name: '1 Month', cost: '$19.99/month', payment: '$2', term: '1', autoRenewFlg: 'Y' },
    { name: '3 Months', cost: '$14.99/month', payment: '$44.97', term: '3', autoRenewFlg: 'N' },
    { name: '12 Months', cost: '$10.99/month', payment: '$131.88', term: '12', autoRenewFlg: 'N' },
    { name: 'renew', cost: '', payment: '', term: '', autoRenewFlg: '' },
  ];
  public id: number = 0;
  public plan: any = null;
  public showFormFlg: boolean = true;
  public paymentSuccessFlg: boolean = false;

  constructor(private route: ActivatedRoute, databaseService: DatabaseService) { super(databaseService) }

  override ngOnInit(): void {
    super.ngOnInit();

    this.route.queryParams.subscribe(params => {
      this.id = parseInt(params['id']) || 0;
      if (this.id == 99)
        this.plan = this.plans[3];
      else
        this.plan = this.plans[this.id];
    });
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
      term: this.plan.term,
      payment: this.plan.payment,
      name: this.plan.name,
      autoRenewFlg: this.plan.autoRenewFlg,
      cost: this.plan.cost,
      card_number: card_number,
      exp_number: exp_number,
      cvc: cvcNumber,
      zip_code: zipcode,
      customerName: customerName,
    }
    this.getDataFromServer('processPayment', 'payments.php', params);
  }
  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);
    if (responseJson.action == 'processPayment') {
      this.paymentSuccessFlg = true;
    }
  }

}
