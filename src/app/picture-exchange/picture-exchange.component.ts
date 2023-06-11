import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';
import { BetraPopupComponent } from '../popups/betra-popup/betra-popup.component';
import { PicturePopupComponent } from '../popups/picture-popup/picture-popup.component';
import { Photographer } from '../classes/photographer';
import { ActivatedRoute } from '@angular/router';

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
  public mostOrders: number = 0;
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
  public picTypes: any = ['Nature', 'Animals', 'Still Life', 'Fashion', 'Outdoors', 'Swim Suit', 'Lingerie', 'NSFW', 'Other'];
  public picCosts: any = [1, 2, 3, 4, 5, 10, 20, 40, 100, 200, 500, 1000];
  public myPicTypes: any = [{ type: 'selfie', cost: 1 }];
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
  public updateMadeFg: boolean = false;
  public addPortfolioImageFlg: boolean = false;
  public details: string = '';
  public myPhotographer: any = null;
  public ordersReadyForDelivery: boolean = false;
  public displayOrders: any = [];
  public displayOffers: any = [];
  public offerMenuNum: number = 0;
  public deletePortfolioImageFlg: boolean = false;
  public newOrdersDeliveredFlg: boolean = false;
  public uid: number = 0;
  public moreDetailsFlg: boolean = false;
  public specialRequestFlg: boolean = false;
  public coinValues: any = ['select'];

  constructor(private route: ActivatedRoute, databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.calculateCost(10);
    this.myCoins = this.user.points;
    if (this.myCoins > 0)
      this.coinValues.push('1');
    if (this.myCoins > 5) {
      this.coinValues.push('2');
      this.coinValues.push('5');
    }
    if (this.myCoins > 10)
      this.coinValues.push('10');
    if (this.myCoins > 25)
      this.coinValues.push('25');
    if (this.myCoins > 50)
      this.coinValues.push('50');
    if (this.myCoins > 100)
      this.coinValues.push('100');
    if (this.myCoins > 200)
      this.coinValues.push('200');
    if (this.myCoins > 300)
      this.coinValues.push('300');

    this.coinValues.push(this.myCoins.toString());

    this.route.queryParams.subscribe(params => {
      this.uid = params['uid'] || 0;
    });

    this.getDataFromServer('loadPhotography', 'photography.php', {});

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

  viewImage(src: string) {
    if (this.picturePopupComponent)
      this.picturePopupComponent.showPopup(src);
  }

  picTypeChanged() {
    var picType = $('#picType').val();
    this.picTypeOtherFlg = (picType == 'Other');
  }
  addPicType() {
    this.showNewTypeFlg = true;
  }
  addPicTypeToList() {
    console.log('here');
    var picType = $('#picType').val();
    var picCost = $('#picCost').val();
    if (picType == 'Other') {
      picType = $('#picTypeOther').val();
    }
    if (picType == '') {
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
    else
      this.errorMessage = 'Duplicate pic type. Delete old one first.';
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

  deleteThisImage(item: any) {
    this.getDataFromServer('deleteThisImage', 'photography.php', { orderId: item.id });
    this.selectedPerson = null;
    this.editSellerFlg = false;
  }

  submitSpecialRequest() {
    this.errorMessage = '';
    var instructions = $('#specialRequest').val();
    var coins = $('#specialCoins').val();
    console.log(instructions, coins);
    if(instructions == '') {
      this.errorMessage = 'Enter instructions for the request';
      return;
    }
    if(coins == 'select') {
      this.errorMessage = 'Select number of coins';
      return;
    }
    this.getDataFromServer('placeOrder', 'photography.php', { uid: this.selectedPerson.user_id, type: 'Special', cost: coins, instructions: instructions });
    this.selectedPerson = null;

  }

  placeOrder() {
    var instructions = $('#instructions').val();
    if (this.selectedPerson && this.selectedType) {
      this.getDataFromServer('placeOrder', 'photography.php', { uid: this.selectedPerson.user_id, type: this.selectedType.type, cost: this.selectedType.cost, instructions: instructions });
      this.selectedPerson = null;
    }
  }

  viewSeller(person: any) {
    this.errorMessage = '';
    this.selectedPerson = person;
    this.selectedPerson.types = JSON.parse(person.items);
    this.selectedType = null;
  }

  placeOffer() {
    var amount = $('#amountCoins').val();
    this.getDataFromServer('placeOffer', 'photography.php', { type: 'Offer', amount: amount, price: this.currentPrice });
  }

  placeBid() {
    if (this.ccId == 0) {
      this.errorMessage = 'Please add a credit card first';
      return;
    }
    var amount = $('#amountCoins').val();
    this.getDataFromServer('placeBid', 'photography.php', { type: 'Bid', amount: amount, price: this.currentPrice });

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
    this.getDataFromServer('completeOrder', 'photography.php', { orderId: order.row_id });

  }

  uploadPortfilioPicButtonClicked() {
    this.addPortfolioImageFlg = false;
    this.getDataFromServer('uploadPortfolioImage', 'photography.php', { image: $('#Image1').attr('src') });
  }
  updateAboutMe() {
    this.errorMessage = '';
    var details = $('#details').val();

    if (details.length == 0) {
      this.errorMessage = 'Details cannot be blank.';
      return;
    }
    this.updateMadeFg = true;
    this.getDataFromServer('updateAboutMe', 'photography.php', { details: details });

  }

  becomeSeller() {
    this.errorMessage = '';
    var details = $('#details').val();

    //console.log('hey', this.myPicTypes);
    if (details.length == 0) {
      this.errorMessage = 'Tell us a little about yourself.';
      return;
    }
    if (this.myPicTypes.length == 0) {
      this.errorMessage = 'Add at least 1 type of picture';
      return;
    }
    var types = JSON.stringify(this.myPicTypes);
    this.getDataFromServer('becomeSeller', 'photography.php', { types: types, details: details });
  }

  exitClub() {
    this.getDataFromServer('exitClub', 'photography.php', {});
  }

  becomeBuyer() {
    this.getDataFromServer('becomeBuyer', 'photography.php', {});
  }

  deletePicType(row: any) {
    var myPicTypes: any = [];
    this.myPicTypes.forEach((element: any) => {
      if (element.type != row.type || element.type == 'Selfie')
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

    this.getDataFromServer('depositCash', 'photography.php', params);
  }

  selectCoinsChanged() {
    var amount = $('#amountCoins').val();

    this.calculateCost(amount);
  }
  calculateCost(amount: number) {
    this.totalCost = ((amount * this.currentPrice) / 100);
    this.totalCostDisplay = this.totalCost.toFixed(2);
  }

  filterOrderItems(num: number) {
    this.menuNum = num;
    this.displayOrders = [];
    this.myOrders.forEach((element: any) => {
      if (element.status == 'Confirmed' && num == 1)
        this.displayOrders.push(element);
      if (element.status != 'Confirmed' && num == 0)
        this.displayOrders.push(element);
    });
  }

  filterOfferItems(num: number) {
    this.offerMenuNum = num;
    this.displayOffers = [];
    this.myOffers.forEach((element: any) => {
      if ((element.status == 'Confirmed' || element.status == 'Declined' || element.status == 'Delivered') && num == 1)
        this.displayOffers.push(element);
      if (element.status != 'Confirmed' && element.status != 'Declined' && element.status != 'Delivered' && num == 0)
        this.displayOffers.push(element);
    });
  }

  cancelOrder(order: any) {
    this.getDataFromServer('cancelOrder', 'photography.php', { orderId: order.row_id });
  }

  confirmPlacedOrder(order: any) {
    order.confirmFlg = true;
  }

  rejectPlacedOrder(order: any) {

  }

  textValueSubmitted(order: any, comments: string) {
    console.log(order.row_id)
    this.getDataFromServer('confirmPlacedOrder', 'photography.php', { orderId: order.row_id, details: comments });
  }

  cancelPlacedOrder(order: any) {
    this.getDataFromServer('cancelPlacedOrder', 'photography.php', { orderId: order.row_id });
  }

  acceptPlacedOrder(order: any) {
    this.getDataFromServer('acceptPlacedOrder', 'photography.php', { orderId: order.row_id });
  }

  declinePlacedOrder(order: any) {
    this.getDataFromServer('declinePlacedOrder', 'photography.php', { orderId: order.row_id });
  }

  deleteCancelledOrder(order: any) {
    console.log(order);
    this.getDataFromServer('deleteCancelledOrder', 'photography.php', { orderId: order.row_id });
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
      comments: $('#comments').val(),
      image: $('#Image1').attr('src')
    };
    //console.log('params', params);
    this.getDataFromServer('uploadMarketPicture', 'photography.php', params);
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
      this.newOrdersDeliveredFlg = false;
      this.ordersReadyForDelivery = false;
      this.newOfferReceivedFlg = false;

      this.result = responseJson.result;
      this.lastSalePrice = parseInt(responseJson.lastSalePrice);
      this.currentPrice = this.lastSalePrice;
      this.ccId = responseJson.ccId;
      if (responseJson.items && responseJson.items.length > 0)
        this.myPicTypes = JSON.parse(responseJson.items);

      this.myPicTypes.forEach((element: any) => {
        if (element.type == 'Selfie' && element.cost != 1)
          element.cost = 1;
      });
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
      this.details = responseJson.details;
      this.myPhotographer = new Photographer(responseJson);
      var orderList: any = {}

      //console.log('myPhotographer', this.myPhotographer);

      this.myOrders.forEach((element: any) => {
        if (element.status == 'New' || element.status == 'Accepted')
          orderList[element.uid] = true;

        if (element.status == 'Delivered')
          this.newOrdersDeliveredFlg = true;
        element.src = 'https://www.betradating.com/betraPhp/marketPics/pic' + element.uid + '_' + element.row_id + '.jpg';
      });
      //console.log('orderList', orderList);
      this.myOrders.sort((a: any, b: any) => a.status.localeCompare(b.status));
      this.filterOrderItems(0);

      this.myOffers.forEach((element: any) => {
        if (element.status == 'New')
          this.newOfferReceivedFlg = true;

        if (element.status == 'Accepted')
          this.ordersReadyForDelivery = true;

        element.src = 'https://www.betradating.com/betraPhp/marketPics/pic' + element.uid + '_' + element.row_id + '.jpg';
      });
      //this.offers.forEach((element: any) => {

        //element.totalCost = (element.amount * element.price / 100).toFixed(2);
      //});
      //this.offers.sort((a: any, b: any) => a.status.localeCompare(b.status));
      this.filterOfferItems(0);

      //------------------------------------------
      this.sellersM = [];
      this.sellersF = [];
      responseJson.sellers.forEach((element: any) => {
        element.hasOrderPlaced = orderList[element.user_id];

        if (parseInt(element.ordersDelivered) > this.mostOrders) {
          this.mostOrders = element.ordersDelivered;
        }

        if (element.gender == 'F')
          this.sellersF.push(new Photographer(element));
        else
          this.sellersM.push(new Photographer(element));
      });

      if (this.uid > 0) {
        this.sellersF.forEach((element: { user_id: number; }) => {
          if (element.user_id == this.uid)
            this.viewSeller(element);
        });
        this.sellersM.forEach((element: { user_id: number; }) => {
          if (element.user_id == this.uid)
            this.viewSeller(element);
        });
      }

      this.calculateSellableCoins(this.myCoins);

      if (this.newOfferReceivedFlg && this.betraPopupComponent)
        this.betraPopupComponent.showPopup('You have a new picture request!', 'Check for your new requests under the "My Jobs to Do" section and click "Accept" or "Decline" to complete the transaction.');
      else if (this.newOrdersDeliveredFlg && this.betraPopupComponent)
        this.betraPopupComponent.showPopup('You have a new picture delivered!', 'Check the "My Orders" section and click "Confirm" to complete the transaction.');

      //console.log('lastSalePrice', this.lastSalePrice, this.sellersM);
    }

  }

}
