export class Photographer {
    public row_id: number = 0;
    public user_id: number = 0;
    public profilePic: number = 0;
    public yourWalletAmount: number = 0;
    public yourWalletAmountText: string = '';
    public myCoins: number = 0;
    public offers: any = [];
    public buyerFlg: boolean = false;
    public sellerFlg: boolean = false;
    public buyers: any = [];
    public myOrders: any = [];
    public myOffers: any = [];
    public details: string = '';
    public gender: string = '';
    public items: string = '';
    public portfolio: string = '';
    public portfolioItems: any = [];
    public firstName: string = '';

    constructor(obj: any) {
        if (obj) {
            this.row_id = obj.row_id || 0;
            this.user_id = obj.user_id || 0;
            this.profilePic = obj.profilePic || 0;
            this.yourWalletAmount = parseFloat(obj.yourWalletAmount) || 0;
            this.yourWalletAmountText = obj.yourWalletAmount || 0;
            this.myCoins = obj.myCoins || 0;
            this.offers = obj.offers || [];
            this.buyerFlg = (obj.buyerFlg == 'Y');
            this.sellerFlg = (obj.sellerFlg == 'Y');
            this.buyers = obj.buyers || [];
            this.myOrders = obj.myOrders || [];
            this.myOffers = obj.myOffers || [];
            this.details = obj.details || '';
            this.gender = obj.gender || '';
            this.items = obj.items || '';
            this.firstName = obj.firstName;
            this.portfolio = obj.portfolio;
            this.portfolioItems = [];

            if (this.portfolio) {
                var items = this.portfolio.split('+');
                items.forEach(element => {
                    this.portfolioItems.push('https://www.betradating.com/betraPhp/portfolioPics/pic' + this.user_id + '_' + element + '.jpg');
                });

            }

            if (obj.yourWalletAmount)
                this.yourWalletAmountText = obj.yourWalletAmount.toFixed(2)
        }
    }
}
