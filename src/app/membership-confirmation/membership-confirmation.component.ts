import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-membership-confirmation',
  templateUrl: './membership-confirmation.component.html',
  styleUrls: ['./membership-confirmation.component.scss']
})
export class MembershipConfirmationComponent extends BaseComponent implements OnInit {

  constructor(private route: ActivatedRoute) { super() }

  override ngOnInit(): void {
    super.ngOnInit();

    this.route.queryParams.subscribe(params => {
      this.menuNum = parseInt(params['id']) || 0;
    });
  }

}
