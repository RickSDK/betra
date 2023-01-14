declare var getDateObjFromJSDate: any;
declare var betraImageFromId: any;

export class Review {
    public row_id: number = 0;
    public created: string = '';
    public firstName: string = '';
    public firstName2: string = '';
    public src: string = '';
    public src2: string = '';
    public profilePic: number = 0;
    public profilePic2: number = 0;
    public rating: number = 0;
    public uid: number = 0;
    public user_id: number = 0;
    public localDt: string = '';
    public message: string = '';

    public likes: number = 0;
    public dislikes: number = 0;
    public iLikeFlg: boolean = false;
    public iDislikeFlg: boolean = false;
    public likeList: any = [];
    public dislikeList: any = [];
    public likeTitle: string = '';
    public dislikeTitle: string = '';

    public isMineFlg: boolean = false;

    constructor(obj: any, userId: number = 0) {
        if (obj) {
            this.row_id = obj.row_id || 0;
            this.created = obj.created || '';
            this.firstName = obj.firstName || '';
            this.firstName2 = obj.firstName2 || '';
            this.message = obj.message || '';


            this.profilePic = obj.profilePic || 0;
            this.profilePic2 = obj.profilePic2 || 0;
            this.rating = obj.rating || 0;
            this.uid = obj.uid || 0;
            this.user_id = obj.user_id || 0;

            this.isMineFlg = (obj.isMineFlg == 'Y');

            this.likes = obj.likes || 0;
            this.dislikes = obj.dislikes || 0;

            this.likeList = obj.likeList || [];
            this.dislikeList = obj.dislikeList || [];

            this.iLikeFlg = obj.iLikeFlg || false;
            this.iDislikeFlg = obj.iDislikeFlg || false;

            this.likeTitle = this.likeList.join('\n');
            this.dislikeTitle = this.dislikeList.join('\n');

            this.src = betraImageFromId(obj.uid, obj.profilePic);
            this.src2 = betraImageFromId(obj.user_id, obj.profilePic2);
            var dtObj = getDateObjFromJSDate(obj.created);
            this.localDt = dtObj.localDate;

        }
    }
}
