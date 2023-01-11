declare var getDateObjFromJSDate: any;
declare var betraImageFromId: any;

export class DateItem {
    public row_id: number = 0;
    public user_id: number = 0;
    public uid: number = 0;
    public cancelledBy: number = 0;
    public profilePic: number = 0;

    public address: string = '';
    public city: string = '';
    public comment: string = '';
    public eventDate: string = '';
    public eventTime: string = '';
    public location: string = '';
    public state: string = '';
    public status: string = '';
    public zip: string = '';
    public dtObj: any = null;
    public currentFlg: boolean = false;

    constructor(obj: any) {
        if (obj) {
            this.row_id = obj.row_id;
            this.user_id = obj.user_id;
            this.uid = obj.uid;
            this.cancelledBy = obj.cancelledBy;
            this.address = obj.address;
            this.city = obj.city;
            this.comment = obj.comment;
            this.eventDate = obj.eventDate;
            this.eventTime = obj.eventTime;
            this.location = obj.location;
            this.state = obj.state;
            this.status = obj.status;
            this.zip = obj.zip;
            this.profilePic = obj.profilePic;

            this.dtObj = getDateObjFromJSDate(this.eventDate + ' ' + this.eventTime);
            this.currentFlg = this.dtObj.secondsAgo <= 0;
            if (!this.comment)
                this.comment = this.dtObj.distanceAway;
        }
    }
}
