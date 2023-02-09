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

    public likes: number = 0;
    public dislikes: number = 0;
    public iLikeFlg: boolean = false;
    public iDislikeFlg: boolean = false;
    public likeList: any = [];
    public dislikeList: any = [];
    public likeTitle: string = '';
    public dislikeTitle: string = '';

    public comments: any = [];
    public commentCount: number = 0;
    public author: string = '';
    public url: string = '';
    public blogIds: any = [];
    public firstBlogId: number = 0;
    public lastBlogId: number = 0;
    public prevBlogId: number = 0;
    public nextBlogId: number = 0;

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

            this.likes = obj.likes || 0;
            this.dislikes = obj.dislikes || 0;
            this.iLikeFlg = (obj.iLikeFlg == 'Y');
            this.iDislikeFlg = (obj.iDislikeFlg == 'Y');
            this.likeList = obj.likeList || [];
            this.dislikeList = obj.dislikeList || [];
            this.likeTitle = this.likeList.join('\n');
            this.dislikeTitle = this.dislikeList.join('\n');

            this.comments = obj.comments || [];
            this.blogIds = obj.blogIds || [];
            var i = 0;
            var thisI = 0;
            this.blogIds.forEach((element: any) => {
                if (element == this.row_id)
                    thisI = i;
                i++;
            });
            if (this.blogIds && this.blogIds.length > 0) {
                if (thisI > 0)
                    this.prevBlogId = this.blogIds[thisI - 1];
                if (thisI < this.blogIds.length-1)
                    this.nextBlogId = this.blogIds[thisI + 1];
                this.firstBlogId = this.blogIds[0];
                this.lastBlogId = this.blogIds[this.blogIds.length - 1];
            }
            this.commentCount = obj.commentCount || 0;

            this.author = obj.author || '';
            this.url = obj.url || '';

            this.comments.forEach((element: any) => {
                var dt = getDateObjFromJSDate(element.created);
                element.localDate = dt.localDate;
            });

            if (this.pic1)
                this.src1 = 'https://www.betradating.com/betraPhp/blogImages/pic' + this.row_id + '_1.jpg';
            if (this.pic2)
                this.src2 = 'https://www.betradating.com/betraPhp/blogImages/pic' + this.row_id + '_2.jpg';
            if (this.pic3)
                this.src3 = 'https://www.betradating.com/betraPhp/blogImages/pic' + this.row_id + '_3.jpg';

            this.section1Text = this.section1.replace(/&nbsp;<br>/g, "\n");
            this.section2Text = this.section2.replace(/&nbsp;<br>/g, "\n");
            this.section3Text = this.section3.replace(/&nbsp;<br>/g, "\n");

            this.intro = this.section1Text.substring(0, 300) + '[...]';


        }
    }
}
