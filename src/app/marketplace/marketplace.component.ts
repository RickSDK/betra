import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';

declare var $: any;

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent extends BaseComponent implements OnInit {
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
  public sellers: any = [];
  public result: string = '';
  public yourWalletAmount: number = 0;
  public showNewTypeFlg: boolean = false;
  public picTypes: any = ['Nature', 'Animals', 'Still Life', 'Selfie', 'Fashion', 'Outdoors', 'Swim Suit', 'Lingerie', 'NSFW', 'Other'];
  public picCosts: any = [1, 3, 5, 10, 20, 40, 100, 200, 500, 1000];
  public myPicTypes: any = [];
  public picTypeOtherFlg: boolean = false;
  public selectedPerson: any = null;
  public selectedType: any = null;
  public myOrders: any = [];
  public myOffers: any = [];
  public completedRecords: any = [];
  public selectedOrder: any = null;
  public disableUploadButton: boolean = false;
  public showDepositFormFlg: boolean = false;
  public buyErrorMessage: string = '';
  public yourWalletAmountText: string = '';
  public showWithdrawFormFlg: boolean = false;
  public coinLeaders: any = [];
  public lowestPrice: number = 9999;

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
    console.log(order);
    this.errorMessage = '';
    var cashValue = order.amount * order.price / 100;
    if (order.type == 'Offer' && this.yourWalletAmount < cashValue) {
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
    if (this.myPicTypes.length == 0) {
      this.errorMessage = 'Add at least 1 type of picture';
      return;
    }
    var types = JSON.stringify(this.myPicTypes);
    this.getDataFromServer('becomeSeller', 'market.php', { types: types });
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

  cancelPlacedOrder(order: any) {
    this.getDataFromServer('cancelPlacedOrder', 'market.php', { orderId: order.row_id });
  }

  acceptPlacedOrder(order: any) {
    this.getDataFromServer('acceptPlacedOrder', 'market.php', { orderId: order.row_id });
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
    this.disableUploadButton = true;
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

  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);

    if (responseJson.action != 'logUser') {
      this.result = responseJson.result;
      this.lastSalePrice = parseInt(responseJson.lastSalePrice);
      this.currentPrice = this.lastSalePrice;
      this.ccId = responseJson.ccId;
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
      this.sellers = responseJson.sellers;
      this.myOrders = responseJson.myOrders;
      this.myOffers = responseJson.myOffers;
      this.completedRecords = responseJson.completedRecords;
      this.coinLeaders = responseJson.leaders;
      this.myOrders.forEach((element: any) => {
        element.src = 'https://www.betradating.com/betraPhp/marketPics/pic' + element.user_id + '_' + element.row_id + '.jpg';
      });
      this.myOffers.forEach((element: any) => {
        element.src = 'https://www.betradating.com/betraPhp/marketPics/pic' + element.user_id + '_' + element.row_id + '.jpg';
      });
      this.offers.forEach((element: any) => {
        if (parseFloat(element.price) < this.lowestPrice && element.type=='Offer' && !element.isMine)
          this.lowestPrice = element.price
        element.totalCost = (element.amount * element.price / 100).toFixed(2);
      });

      this.offers.sort((a: any, b: any) => {
        return a.price - b.price;
      });
      this.calculateSellableCoins(this.myCoins);

      console.log('lastSalePrice', this.lastSalePrice);
    }

  }

}
