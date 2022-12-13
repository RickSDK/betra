declare var getDateObjFromJSDate: any;
declare var betraImageFromId: any;

export class Journal {

    public row_id: number = 0;
    public user_id: number = 0;
    public replyTo: number = 0;
    public postId: number = 0;
    public message: string = '';
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

            this.src = betraImageFromId(obj.user_id, obj.profilePic);
            var dtObj = getDateObjFromJSDate(obj.created);
            this.localDt = dtObj.localDate;
    
        }
    }
}
