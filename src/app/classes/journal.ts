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
    
   
    constructor(obj: any) {
        if (obj) {
            this.row_id = obj.row_id;
            this.user_id = obj.user_id;
            this.replyTo = obj.replyTo;
            this.postId = obj.postId;
            this.message = obj.message;
            this.created = obj.created;
            this.firstName = obj.firstName;
            this.profilePic = obj.profilePic;
            this.replies = obj.replies;
            this.postFlagged = obj.postFlagged;
            this.postFlaggedBy = obj.postFlaggedBy;
            this.likes = obj.likes;
            this.dislikes = obj.dislikes;

            this.status = obj.status;
            this.region = obj.region;
            this.bugType = obj.bugType;
            this.deviceType = obj.deviceType;
            this.imageNum = obj.imageNum;
            this.createdVersion = obj.createdVersion;
            this.fixedVersion = obj.fixedVersion;
            this.fixedDate = obj.fixedDate;
            this.history = obj.history;
            this.lookingFor = obj.lookingFor;
            
            if(this.imageNum>0)
                this.imageSrc = "https://www.appdigity.com/betraPhp/bugImages/pic"+obj.row_id+"_"+this.imageNum+".jpg";

            this.messageText = obj.message.replace(/<br>/g, "\n");

            this.src = betraImageFromId(obj.user_id, obj.profilePic);
            var dtObj = getDateObjFromJSDate(obj.created);
            this.localDt = dtObj.localDate;
    
        }
    }
}
