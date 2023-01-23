declare var getDateObjFromJSDate: any;

export class Blog {
    public row_id: number = 0;
    public user_id: number = 0;
    public views: number = 0;

    public title: string = '';
    public intro: string = '';
    public section1: string = '';
    public section2: string = '';
    public section3: string = '';
    public section1Text: string = '';
    public section2Text: string = '';
    public section3Text: string = '';
    public status: string = '';
    public created: string = '';
    public pic1: boolean = false;
    public pic2: boolean = false;
    public pic3: boolean = false;

    public src1: string = '';
    public src2: string = '';
    public src3: string = '';

    public localDate: string = '';
    public firstName: string = '';
    public profilePic: number = 0;

    constructor(obj: any, userId: number = 0) {
        if (obj) {
            this.row_id = obj.row_id || 0;
            this.user_id = obj.user_id || 0;
            this.views = obj.views || 0;

            this.title = obj.title || '';
            this.section1 = obj.section1 || '';
            this.section2 = obj.section2 || '';
            this.section3 = obj.section3 || '';
            this.status = obj.status || '';
            this.created = obj.created || '';

            this.pic1 = (obj.pic1 == 'Y');
            this.pic2 = (obj.pic2 == 'Y');
            this.pic3 = (obj.pic3 == 'Y');

            this.firstName = obj.firstName || '';
            this.profilePic = obj.profilePic || 0;

            var dt = getDateObjFromJSDate(obj.created);
            this.localDate = dt.localDate;

            if (this.pic1)
                this.src1 = 'https://www.appdigity.com/betraPhp/blogImages/pic'+this.row_id+'_1.jpg';
            if (this.pic2)
                this.src2 = 'https://www.appdigity.com/betraPhp/blogImages/pic'+this.row_id+'_2.jpg';
            if (this.pic3)
                this.src3 = 'https://www.appdigity.com/betraPhp/blogImages/pic'+this.row_id+'_3.jpg';

            this.section1Text = obj.section1.replace(/&nbsp;<br>/g, "\n");
            this.section2Text = obj.section2.replace(/&nbsp;<br>/g, "\n");
            this.section3Text = obj.section3.replace(/&nbsp;<br>/g, "\n");

            this.intro = this.section1Text.substring(0, 300) + '[...]';


        }
    }
}
