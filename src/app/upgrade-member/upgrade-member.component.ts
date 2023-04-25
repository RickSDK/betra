import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Platform, AlertController } from '@ionic/angular';
import { InAppPurchase2, IAPProduct } from '@ionic-native/in-app-purchase-2/ngx';
import { DatabaseService } from '../services/database.service';

declare var getPlatform: any;
const PLAN1MONTH = 'plan1';
const PLAN3MONTH = 'plan3';
const PLAN12MONTH = 'plan12';
const SUBSCRIPTION1MONTH = 'subscription1';
const SUBSCRIPTIONPROMO = 'promo1';

@Component({
  selector: 'app-upgrade-member',
  templateUrl: './upgrade-member.component.html',
  styleUrls: ['./upgrade-member.component.scss']
})
export class UpgradeMemberComponent extends BaseComponent implements OnInit {
  public plans = [
    { name: '1 Month', cost: '$19.99/month', payment: '$2' },
    { name: '3 Months', cost: '$14.99/month', payment: '$44.97' },
    { name: '12 Months', cost: '$10.99/month', payment: '$131.88' },
  ];
  public benefitExpDate: string = '';
  public cardOnFile: string = '';
  public showUpgradeFlg: boolean = true;
  public showPlanDetailsFlg: boolean = true;
  public creditObj: any = null
  public platform: string = getPlatform();
  public products: IAPProduct[] = [];
  public isPro: boolean = false;
  public gems: number = 0;
  public appStore: any = null;

  constructor(private plt: Platform, private store: InAppPurchase2, private alertController: AlertController, private ref: ChangeDetectorRef, databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();

    this.plt.ready().then(() => {
      // Only for debugging!
      this.store.verbosity = this.store.DEBUG;
      this.appStore = this.store;
      console.log('hey!! store', this.store);
      console.log('hey!! products', this.store.products);

      this.registerProducts();
      this.setupListeners();

      // Get the real product information
      this.store.ready(() => {
        this.products = this.store.products;
        this.ref.detectChanges();
      });
    });

    this.showPlanDetailsFlg = !this.user.memberFlg;
    this.getDataFromServer('getCreditCardInfo', 'payments.php', {});
  }

  registerProducts() {
    this.store.register({
      id: PLAN1MONTH,
      type: this.store.CONSUMABLE,
    });

    this.store.register({
      id: SUBSCRIPTION1MONTH,
      type: this.store.NON_CONSUMABLE,
    });

    this.store.refresh();
  }

  setupListeners() {
    // General query to all products
    this.store.when('product')
      .approved((p: IAPProduct) => {
        // Handle the product deliverable
        if (p.id === SUBSCRIPTION1MONTH) {
          this.isPro = true;
        } else if (p.id === PLAN1MONTH) {
          this.gems += 100;
        }
        this.ref.detectChanges();

        return p.verify();
      })
      .verified((p: IAPProduct) => p.finish());


    // Specific query for one ID
    this.store.when(SUBSCRIPTION1MONTH).owned((p: IAPProduct) => {
      this.isPro = true;
    });
  }

  purchase(product: IAPProduct) {
    this.store.order(product).then((p: any) => {
      // Purchase in progress!
    }, (e: any) => {
      this.presentAlert('Failed', `Failed to purchase: ${e}`);
    });
  }

  // To comply with AppStore rules
  restore() {
    this.store.refresh();
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }


  setAutoRenew(value: string) {
    this.creditObj.autoRenewFlg = value;
    this.getDataFromServer('setCreditCardRenew', 'payments.php', { autoRenewFlg: value });
  }

  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);
    if (responseJson.action == "getCreditCardInfo") {
      //this.benefitExpDate = this.localDateFrommySqlDate(responseJson.creditObj.expiration);
      if (responseJson.creditObj.expiration) {
        var dt = this.getDateObjFromJSDate(responseJson.creditObj.expiration);
        this.benefitExpDate = dt.localDate + ' (' + (dt.daysAgo * -1) + ' days remaining)';
      } else
        this.benefitExpDate = 'Never expire';
      this.cardOnFile = '';
      if (responseJson.creditObj && responseJson.creditObj.card_number && responseJson.creditObj.card_number.length > 12)
        this.cardOnFile = '**** **** **** ' + responseJson.creditObj.card_number.substr(-4, 4);
      this.creditObj = responseJson.creditObj;
    }
  }

}
