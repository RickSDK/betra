import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';

declare var $: any;

@Component({
  selector: 'app-restaurant-signup',
  templateUrl: './restaurant-signup.component.html',
  styleUrls: ['./restaurant-signup.component.scss']
})
export class RestaurantSignupComponent extends BaseComponent implements OnInit {
  public showFormFlg: boolean = true;
  constructor(databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  submitButtonPressed() {
    var restaurant: string = $('#restaurant').val();
    var address: string = $('#address').val();
    var manager: string = $('#manager').val();
    var phone: string = $('#phone').val();
    var email: string = $('#email').val();
    if (!restaurant || !address || !manager || !phone || !email) {
      this.errorMessage = 'Please fill out form completely';
      return;
    }
    var params = {
      restaurant: restaurant,
      address: address,
      manager: manager,
      phone: phone,
      email: email,
      action: 'restaurantSignup'
    }
    this.executeApi('owners.php', params);
    this.showFormFlg = false;
  }
}
