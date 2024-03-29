declare var getDateObjFromJSDate: any;
declare var betraImageFromId: any;

export class Journal {

    public row_id: number = 0;
    public user_id: number = 0;
    public replyTo: number = 0;
    public postId: number = 0;
    public message: string = '';
    public messageText: string = '';
    public created: string = '';
    public firstName: string = '';
    public profilePic: number = 0;
    public replies: number = 0;
    public postFlagged: string = '';
    public src: string = '';
    public localDt: string = '';
    public postFlaggedBy: number = 0;
    public likes: number = 0;
    public dislikes: number = 0;
    public status: string = '';
    public region: string = '';
    public bugType: string = '';
    public deviceType: string = '';
    public imageNum: number = 0;
    public imageSrc: string = '';
    public createdVersion: string = '';
    public fixedVersion: string = '';
    public fixedDate: string = '';
    public history: string = '';
    public lookingFor: string = '';
    public likeList: any = [];
    public dislikeList: any = [];
    public iLikeFlg: boolean = false;
    public iDislikeFlg: boolean = false;
    public likeTitle: string = '';
    public dislikeTitle: string = '';
    public isMineFlg: boolean = false;
    public comments: any = [];
    public updates: any = [];
    public journal_id: number = 0;
    public newFlg: boolean = false;


    constructor(obj: any, userId: number = 0) {
        if (obj) {
            this.row_id = obj.row_id;
            this.journal_id = obj.journal_id;
            this.newFlg = obj.newFlg;
            this.user_id = obj.user_id;
            this.replyTo = obj.replyTo;
            this.postId = obj.postId;
            this.message = obj.message;
            this.created = obj.created;
            this.firstName = obj.firstName;
            this.profilePic = obj.profilePic;
            this.postFlagged = obj.postFlagged;
            this.postFlaggedBy = obj.postFlaggedBy;
            this.likes = obj.likes || 0;
            this.dislikes = obj.dislikes || 0;
            this.replies = this.comments?.length || 0;

            this.status = obj.status;
            this.region = obj.region;
            this.bugType = obj.bugType;
            this.deviceType = obj.deviceType;
            this.imageNum = obj.imageNum;
            this.createdVersion = obj.createdVersion;
            this.fixedVersion = obj.fixedVersion;
            this.fixedDate = obj.fixedDate;
            this.history = obj.history;
            this.updates = obj.updates;
            this.lookingFor = obj.lookingFor;
            this.likeList = obj.likeList || [];
            this.dislikeList = obj.dislikeList || [];

            if (this.likes == 0)
                this.likes = this.likeList.length;

            if (this.dislikes == 0)
                this.dislikes = this.dislikeList.length;

            if (this.imageNum > 0)
                this.imageSrc = "https://www.betradating.com/betraPhp/bugImages/pic" + obj.row_id + "_" + this.imageNum + ".jpg";

            this.messageText = obj.message.replace(/&nbsp;<br>/g, "\n");

            this.src = betraImageFromId(obj.user_id, obj.profilePic);
            var dtObj = getDateObjFromJSDate(obj.created);
            this.localDt = dtObj.localDate;

            this.iLikeFlg = false;
            this.iDislikeFlg = false;
            var likeNames: any = [];
            var dislikeNames: any = [];
            if (userId > 0) {
                this.isMineFlg = (this.user_id == userId);
                this.likeList.forEach((element: any) => {
                    if (element.likeFlg == 'Y')
                        likeNames.push(element.firstName);
                    if (element.dislikeFlg == 'Y')
                        dislikeNames.push(element.firstName);
                    if (element.user_id == userId && element.likeFlg == 'Y')
                        this.iLikeFlg = true;
                    if (element.user_id == userId && element.dislikeFlg == 'Y')
                        this.iDislikeFlg = true;
                });
            }

            if (obj.comments) {
                obj.comments.forEach((element: any) => {
                    var dtObj = getDateObjFromJSDate(element.created);
                    element.localDate = dtObj.localDate;

                    //                if (element.updateFlg == 'Y')
                    //                  this.updates.push(element);
                    //            else
                    this.comments.push(element);

                });

            }
            this.likeTitle = likeNames.join('\n');
            this.dislikeTitle = dislikeNames.join('\n');

        }
    }
}
