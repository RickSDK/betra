import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';
import { BetraPopupComponent } from '../popups/betra-popup/betra-popup.component';
import { PicturePopupComponent } from '../popups/picture-popup/picture-popup.component';

declare var $: any;

@Component({
  selector: 'app-picture-exchange',
  templateUrl: './picture-exchange.component.html',
  styleUrls: ['./picture-exchange.component.scss']
})
export class PictureExchangeComponent extends BaseComponent implements OnInit {
  @ViewChild(BetraPopupComponent, { static: true })
  betraPopupComponent!: BetraPopupComponent;

  @ViewChild(PicturePopupComponent, { static: true })
  picturePopupComponent!: PicturePopupComponent;

  public numbers = [10, 20, 40, 50, 100, 200, 500, 1000];
  public costAmounts = [1, 5, 7, 9, 10, 11, 12, 15, 20, 40, 50, 60, 80, 100];
  public depositAmounts = ['$2', '$5', '$10', '$20', '$50', '$100', '$200'];
  public sellableCoins: any = [];
  public totalCost: number = 1;
  public totalCostDisplay: string = ".10";
  public myCurrentValueText: string = '';
  public activity = 0;
  public lastSalePrice = 10;
  public currentPrice = 10;
  public myCoins = 0;
  public buyerFlg: string = '';
  public sellerFlg: string = '';
  public ccId: number = 0;
  public offers: any = [];
  public bids: any = [];
  public buyers: any = [];
  public sellersM: any = [];
  public sellersF: any = [];
  public result: string = '';
  public yourWalletAmount: number = 0;
  public showNewTypeFlg: boolean = false;
  public picTypes: any = ['Nature', 'Animals', 'Still Life', 'Selfie', 'Fashion', 'Outdoors', 'Swim Suit', 'Lingerie', 'NSFW', 'Other'];
  public picCosts: any = [1, 3, 5, 10, 20, 40, 100, 200, 500, 1000];
  public myPicTypes: any = [];
  public picTypeOtherFlg: boolean = false;
  public showImagePopup: boolean = false;
  public selectedPerson: any = null;
  public selectedType: any = null;
  public myOrders: any = [];
  public myOffers: any = [];
  public selectedOrder: any = null;
  public disableUploadButton: boolean = false;
  public showDepositFormFlg: boolean = false;
  public buyErrorMessage: string = '';
  public yourWalletAmountText: string = '';
  public showWithdrawFormFlg: boolean = false;
  public newOfferReceivedFlg: boolean = false;
  public editSellerFlg: boolean = false;

  constructor(databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.calculateCost(10);
    this.myCoins = this.user.points;

    this.getDataFromServer('loadMarket', 'market.php', {});

  }

  calculateSellableCoins(myCoins: number) {
    this.sellableCoins = [];
    for (let i = 10; i <= 100; i += 10) {
      if (myCoins >= 10) {
        this.sellableCoins.push(i);
        myCoins -= 10;
      }
    }
  }

  viewImage(order: any) {
    if (this.picturePopupComponent)
      this.picturePopupComponent.showPopup(order.src);
  }

  picTypeChanged() {
    var picType = $('#picType').val();
    this.picTypeOtherFlg = (picType == 'Other');
  }
  addPicType() {
    this.showNewTypeFlg = true;
  }
  addPicTypeToList() {
    var picType = $('#picType').val();
    var picCost = $('#picCost').val();
    if (picType == 'Other') {
      picType = $('#picTypeOther').val();
    }
    if(picType == '') {
      this.errorMessage = 'Fill out a picture type in the field above';
      return;
    }
    var allowType = true;
    this.myPicTypes.forEach((element: any) => {
      if (element.type == picType && picType != 'Other')
        allowType = false;
    });
    if (allowType)
      this.myPicTypes.push({ type: picType, cost: picCost });
  }

  viewBuyer(person: any) {
    this.selectedPerson = person;
  }

  buyPicture(type: any) {
    this.errorMessage = '';

    if (this.myCoins < parseInt(type.cost)) {
      this.errorMessage = 'Not enough coins!';
      return;
    }
    this.selectedType = type;
  }

  placeOrder() {
    var instructions = $('#instructions').val();
    if (this.selectedPerson && this.selectedType)
      this.getDataFromServer('placeOrder', 'market.php', { uid: this.selectedPerson.user_id, type: this.selectedType.type, cost: this.selectedType.cost, instructions: instructions });
  }

  viewSeller(person: any) {
    this.errorMessage = '';
    this.selectedPerson = person;
    this.selectedPerson.types = JSON.parse(person.items);
    this.selectedType = null;
  }

  placeOffer() {
    var amount = $('#amountCoins').val();
    this.getDataFromServer('placeOffer', 'market.php', { type: 'Offer', amount: amount, price: this.currentPrice });
  }

  placeBid() {
    if (this.ccId == 0) {
      this.errorMessage = 'Please add a credit card first';
      return;
    }
    var amount = $('#amountCoins').val();
    this.getDataFromServer('placeBid', 'market.php', { type: 'Bid', amount: amount, price: this.currentPrice });

  }
  acceptOrder(order: any) {
    this.errorMessage = '';
    console.log('xxx', order);
    if (order.type == 'Offer' && this.yourWalletAmount < order.amount) {
      //buy
      this.buyErrorMessage = 'Not enough cash in your wallet to buy these coins. Click the deposit button above.';
      return;
    }
    if (order.type == 'Bid' && this.myCoins < parseInt(order.amount)) {
      //sell
      this.buyErrorMessage = 'You don\'t have enough coins to sell';
      return;
    }
    this.getDataFromServer('completeOrder', 'market.php', { orderId: order.row_id });

  }

  becomeSeller() {
    this.errorMessage = '';
    console.log('hey', this.myPicTypes);
    if (this.myPicTypes.length == 0) {
      this.errorMessage = 'Add at least 1 type of picture';
      return;
    }
    var types = JSON.stringify(this.myPicTypes);
    this.getDataFromServer('becomeSeller', 'market.php', { types: types });
  }

  exitClub() {
    this.getDataFromServer('exitClub', 'market.php', {});
  }

  becomeBuyer() {
    this.getDataFromServer('becomeBuyer', 'market.php', {});
  }

  deletePicType(row: any) {
    var myPicTypes: any = [];
    this.myPicTypes.forEach((element: any) => {
      if (element.type != row.type)
        myPicTypes.push(element);
    });
    this.myPicTypes = myPicTypes;
  }

  changeCost(changeAmount: number) {
    this.currentPrice += changeAmount;
    var amount = $('#amountCoins').val();

    this.calculateCost(amount);
  }

  depositSubmitButtonPressed() {
    this.buyErrorMessage = '';
    var depositAmount = $('#depositAmount').val();
    depositAmount = depositAmount.replace(/\D/g, '');

    var card_number = $('#ccNumber').val();
    if (card_number)
      card_number = card_number.replace(/\D/g, '');
    var exp_number = $('#expNumber').val();
    if (exp_number)
      exp_number = exp_number.replace(/\D/g, '');
    var cvcNumber = $('#cvcNumber').val();
    var zipcode = $('#zipcode').val();
    var customerName = $('#customerName').val();


    if (this.ccId == 0) {
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
    }
    this.showDepositFormFlg = false;

    var params = {
      card_number: card_number,
      exp_number: exp_number,
      cvc: cvcNumber,
      zip_code: zipcode,
      customerName: customerName,
      depositAmount: depositAmount,
      ccId: this.ccId
    }
    console.log(params);

    this.getDataFromServer('depositCash', 'market.php', params);
  }

  selectCoinsChanged() {
    var amount = $('#amountCoins').val();

    this.calculateCost(amount);
  }
  calculateCost(amount: number) {
    this.totalCost = ((amount * this.currentPrice) / 100);
    this.totalCostDisplay = this.totalCost.toFixed(2);
  }

  cancelOrder(order: any) {
    this.getDataFromServer('cancelOrder', 'market.php', { orderId: order.row_id });
  }

  confirmPlacedOrder(order: any) {
    this.getDataFromServer('confirmPlacedOrder', 'market.php', { orderId: order.row_id });
  }

  cancelPlacedOrder(order: any) {
    this.getDataFromServer('cancelPlacedOrder', 'market.php', { orderId: order.row_id });
  }

  acceptPlacedOrder(order: any) {
    this.getDataFromServer('acceptPlacedOrder', 'market.php', { orderId: order.row_id });
  }

  declinePlacedOrder(order: any) {
    this.getDataFromServer('declinePlacedOrder', 'market.php', { orderId: order.row_id });
  }

  deleteCancelledOrder(order: any) {
    this.getDataFromServer('deleteCancelledOrder', 'market.php', { orderId: order.row_id });
  }

  deliverOrder(order: any) {
    this.selectedOrder = order;
    this.disableUploadButton = true;
  }

  uploadPicButtonClicked(num: number, action: string, file: string) {
    this.disableUploadButton = false;
  }

  uploadImage() {
    var params = {
      orderId: this.selectedOrder.row_id,
      image: $('#Image1').attr('src')
    };
    console.log('params', params);
    this.getDataFromServer('uploadMarketPicture', 'market.php', params);
  }

  iWantToBuy() {
    if (this.yourWalletAmount == 0) {
      this.buyErrorMessage = 'You need money in your wallet before you can buy. Click "Deposit" button above';
      return;
    }
    this.changeActivity(1);
  }

  changeActivity(num: number) {
    this.selectedPerson = null;
    this.errorMessage = '';
    this.selectedOrder = null;
    this.buyErrorMessage = '';
    this.activity = num;
  }

  editSellerProfile() {
    this.changeActivity(0);
    this.editSellerFlg = !this.editSellerFlg;
  }

  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);

    if (responseJson.action != 'logUser') {
      this.result = responseJson.result;
      this.lastSalePrice = parseInt(responseJson.lastSalePrice);
      this.currentPrice = this.lastSalePrice;
      this.ccId = responseJson.ccId;
      if (responseJson.items && responseJson.items.length > 0)
        this.myPicTypes = JSON.parse(responseJson.items);
      this.myCurrentValueText = (this.myCoins * this.lastSalePrice / 100).toFixed(2);
      this.calculateCost(10);
      this.changeActivity(0);
      this.yourWalletAmount = parseFloat(responseJson.wallet) || 0;
      this.yourWalletAmountText = this.yourWalletAmount.toFixed(2);
      this.myCoins = responseJson.myCoins;
      this.offers = responseJson.offers;
      this.buyerFlg = responseJson.buyerFlg;
      this.sellerFlg = responseJson.sellerFlg;
      this.buyers = responseJson.buyers;
      this.myOrders = responseJson.myOrders;
      this.myOffers = responseJson.myOffers;

      this.sellersM = [];
      this.sellersF = [];
      responseJson.sellers.forEach((element: any) => {
        if (element.gender == 'F')
          this.sellersF.push(element);
        else
          this.sellersM.push(element);
      });
      this.myOrders.forEach((element: any) => {
        element.src = 'https://www.betradating.com/betraPhp/marketPics/pic' + element.uid + '_' + element.row_id + '.jpg';
      });
      this.myOffers.forEach((element: any) => {
        if (element.status == 'New')
          this.newOfferReceivedFlg = true;

        element.src = 'https://www.betradating.com/betraPhp/marketPics/pic' + element.uid + '_' + element.row_id + '.jpg';
      });
      this.offers.forEach((element: any) => {
        element.totalCost = (element.amount * element.price / 100).toFixed(2);
      });
      this.calculateSellableCoins(this.myCoins);

      if (this.newOfferReceivedFlg && this.betraPopupComponent)
        this.betraPopupComponent.showPopup('You have a new picture request!', 'Check for your new requests under the "My Offers" section and click "Accept" or "Decline" to complete the transaction.');

      console.log('lastSalePrice', this.lastSalePrice);
    }

  }

}
