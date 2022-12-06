declare var getDateObjFromJSDate: any;
export class User {
    public user_id: number = 0;
    public firstName: string = '';
    public birthdate: string = '';
    public birthYear: number = 0;
    public phone: string = '';
    public gender: string = '';
    public genderIcon: string = '';
    public genderName: string = '';

    public matchPreference: string = '';
    public findLoveFlg: boolean = false;
    public meetPeopleFlg: boolean = false;
    public makeMoneyFlg: boolean = false;

    public educationLevel: string = '';
    public income: string = '';
    public race: string = '';
    public smokes: string = '';
    public drinks: string = '';
    public cannabis: string = '';
    public religion: string = '';
    public maritalStatus: string = '';
    public bodyType: string = '';
    public bodyHeight: string = '';
    public desiredRelationship: string = '';
    public city: string = '';
    public longestRelationship: string = '';
    public longestRelationshipText: string = '';
    public numTattoos: string = '';
    public numPiercings: string = '';
    public motto: string = '';
    public marriageView: string = '';
    public numKids: number = 0;
    public wantsKids: string = '';

    public profilePic: number = 0;
    public status: string = '';
    public imgSrc: string = '';
    public email: string = '';
    public zipcode: string = '';
    public emailVerifyFlg: boolean = false;
    public lastLogin: string = '';
    public lastLoginText: string = '';
    public lastLoginNum: number = 0;
    public lastLoginSrc: string = '';

    public story: string = '';
    public birthDay: number = 0;
    public birthMonth: number = 0;
    public age: number = 27;

    public personalityQuizAnswers: string = '';
    public politicalQuizAnswers: string = '';
    public personalityNum: number = 0;
    public stableScore: number = 0;
    public conScore: number = 0;


    //Match
    public matchAge: number = 0;
    public matchAgeRange: number = 0;
    public matchAgeYear: number = 0;
    public matchBody: string = '';
    public matchHeight: string = '';
    public matchMarriage: string = '';
    public matchRelationship: string = '';
    public matchEducation: string = '';
    public matchIncome: string = '';
    public matchReligion: string = '';
    public matchHasKids: string = '';
    public matchWantsKids: string = '';
    public matchGender: string = '';


    public profileFlags: any = [];

    public adventureStableNum: number = 0;
    public adventureStableText: string = 'n/a';
    public conLibertarian: number = 0;
    public conStatist: number = 0;
    public polyText: string = 'Not Filled Out';

    public bodyDesc: string = 'Average';

    public datingPool: any = [];
    public users_interested: number = 0;
    public users_matched: number = 0;
    public questions_asked: number = 0;
    public dates_requested: number = 0;
    public messages_received: number = 0;
    public info_requested: number = 0;
    public dating_pool: string = '';

    public notifications: number = 0;
    public bigInterest: boolean = false;

    public user1_interested: string = '';
    public user2_interested: string = '';
    public match_level: number = 0;
    public heartId: number = 0;
    public showHeartFormFlg: boolean = false;
    public matchObj: any = {};

    public reviewsCount: number = 0;

    // geo info
    public countryName: string = '';
    public latitude: string = '';
    public longitude: string = '';
    public region: string = '';
    public state: string = '';
    public stateName: string = '';
    public ip: string = '';

    public pic1: string = '';
    public pic2: string = '';
    public pic3: string = '';
    public pic4: string = '';
    public numPics: number = 0;
    public mainImageSrc: string = '';
    public memberFlg: boolean = false;

    public regionCode: string = '';
    public division: number = 0;
    public zone: number = 0;
    public adminRegionCode: string = '';
    public adminDivision: number = 0;
    public adminZone: number = 0;
    public ownerFlg: boolean = false;
    public ownerLevel: number = 0;
    public ownerPercent: string = '';
    public monthlyPayout: string = '';

    public picFlagged: number = 0;
    public statsObj: any = null;
    public location: string = '';


    constructor(obj: any) {
        if (obj) {
            this.user_id = obj.user_id || 0;
            this.firstName = obj.firstName;
            this.phone = obj.phone || '';
            this.birthdate = obj.birthdate;
            this.birthYear = obj.birthYear;
            this.statsObj = obj.statsObj;
            this.gender = obj.gender;
            this.genderIcon = (obj.gender == 'M') ? 'fa fa-male' : 'fa fa-female';
            this.genderName = (obj.gender == 'M') ? 'male' : 'female';
            //this.findLoveFlg = obj.findLoveFlg == 'Y';
            this.findLoveFlg = true; // always true for this version
            this.meetPeopleFlg = obj.meetPeopleFlg == 'Y';
            this.makeMoneyFlg = obj.makeMoneyFlg == 'Y';
            this.profilePic = obj.profilePic;
            this.email = obj.email || '';
            this.zipcode = obj.zipcode || '';
            this.educationLevel = obj.educationLevel || '';
            this.income = obj.income || '';
            this.race = obj.race || '';
            this.smokes = obj.smokes || '';
            this.drinks = obj.drinks || '';
            this.cannabis = obj.cannabis || '';
            this.religion = obj.religion || '';
            this.maritalStatus = obj.maritalStatus || '';
            this.bodyType = obj.bodyType || '';
            this.bodyHeight = obj.bodyHeight || '';
            this.desiredRelationship = obj.desiredRelationship || '';
            this.city = obj.city || '';
            this.longestRelationship = obj.longestRelationship || '0';
            this.longestRelationshipText = this.longestRelationship + ' years';
            if (this.longestRelationship == '1')
                this.longestRelationshipText = '1 year';
            this.numTattoos = obj.numTattoos || '0';
            this.numPiercings = obj.numPiercings || '0';

            this.personalityQuizAnswers = obj.personalityQuizAnswers || '';
            this.politicalQuizAnswers = obj.politicalQuizAnswers || '';
            this.stableScore = obj.stableScore || 0;
            this.conScore = obj.conScore || 0;

            this.marriageView = obj.marriageView;
            this.numKids = obj.numKids || 0;
            this.wantsKids = obj.wantsKids || '';

            //match
            this.matchAge = obj.matchAge || 0;
            this.matchBody = obj.matchBody || obj.bodyType;
            this.matchHeight = obj.matchHeight || obj.bodyHeight;
            this.matchMarriage = obj.matchMarriage || obj.marriageView;
            this.matchRelationship = obj.matchRelationship || obj.desiredRelationship;
            this.matchEducation = obj.matchEducation || obj.educationLevel;
            this.matchIncome = obj.matchIncome || obj.income;
            this.matchReligion = obj.matchReligion || obj.religion;
            this.matchHasKids = obj.matchHasKids || '';
            this.matchWantsKids = obj.matchWantsKids || obj.wantsKids;

            this.motto = obj.motto || '';
            this.story = obj.story || '';
            this.status = obj.userStatus || 'Started';
            this.emailVerifyFlg = obj.emailVerifyFlg == 'Y';
            this.lastLogin = obj.lastLogin;
            this.lastLoginText = '-';
            this.datingPool = obj.datingPool;
            this.matchPreference = obj.matchPreference;

            this.users_interested = obj.users_interested || 0;
            this.users_matched = obj.users_matched || 0;
            this.questions_asked = obj.questions_asked || 0;
            this.dates_requested = obj.dates_requested || 0;
            this.messages_received = obj.messages_received || 0;
            this.info_requested = obj.info_requested || 0;
            this.dating_pool = obj.dating_pool || '';

            this.bigInterest = (obj.bigInterest > 0);

            this.user1_interested = obj.user1_interested || '';
            this.user2_interested = obj.user2_interested || '';
            this.match_level = obj.match_level || 0;
            this.heartId = obj.heartId || 0;
            this.matchObj = obj.matchObj;
            this.reviewsCount = obj.reviewsCount || 0;;

            this.countryName = obj.countryName || '';
            this.latitude = obj.latitude || '';
            this.longitude = obj.longitude || '';
            this.region = obj.region || '';
            this.state = obj.state || '';
            this.stateName = obj.stateName || '';
            this.ip = obj.ip || '';

            this.regionCode = obj.regionCode || '';
            this.division = obj.division || 0;
            this.zone = obj.zone || 0;
            this.adminRegionCode = obj.adminRegionCode || '';
            this.adminDivision = obj.adminDivision || 0;
            this.adminZone = obj.adminZone || 0;
            this.ownerFlg = obj.ownerFlg && obj.ownerFlg == 'Y';
            this.ownerLevel = obj.ownerLevel || 0;
            this.picFlagged = obj.picFlagged || 0;


            if (this.picFlagged > 0)
                this.profilePic = 0;

            this.pic1 = bonusImageFromNum(obj.user_id, obj.pic1);
            this.pic2 = bonusImageFromNum(obj.user_id, obj.pic2);
            this.pic3 = bonusImageFromNum(obj.user_id, obj.pic3);
            this.pic4 = bonusImageFromNum(obj.user_id, obj.pic4);

            this.numPics = 0;
            if (obj.pic1 > 0)
                this.numPics++;
            if (obj.pic2 > 0)
                this.numPics++;
            if (obj.pic3 > 0)
                this.numPics++;
            if (obj.pic4 > 0)
                this.numPics++;

            this.memberFlg = obj.memberFlg == 'Y';

            var ownerPercents = ['0%', '0.5%', '1%', '2%', '4%', '6%', '7%']
            this.ownerPercent = ownerPercents[this.ownerLevel];
            var monthlyPayouts = ['$0', '$5,000', '$10,000', '$20,000', '$40,000', '$60,000', '$70,000']
            this.monthlyPayout = monthlyPayouts[this.ownerLevel];

        }

        var poolImg = (this.matchPreference == 'F') ? 'assets/images/woman.jpeg' : 'assets/images/man.jpg';

        this.notifications = Math.round(this.users_interested) + Math.round(this.users_matched) + Math.round(this.questions_asked) + Math.round(this.dates_requested) + Math.round(this.messages_received) + Math.round(this.info_requested);

        var dpList = this.dating_pool.split('+');
        var datingPool: any = [];
        dpList.forEach(element => {
            var items = element.split(':');
            if (items.length >= 3) {
                var name = items[1];
                var user_id = parseInt(items[0]);
                var src = betraImageFromId(user_id, parseInt(items[2]), '', 0);
                var heartFlg = (items.length >= 4 && items[3] == 'Y');
                var level = (items.length >= 5) ? items[4] : '0';
                datingPool.push({ name: name, src: src, user_id: user_id, heartFlg: heartFlg, level: level });
            }

        });
        this.datingPool = datingPool;
        this.showHeartFormFlg = (this.datingPool.length >= 5 && this.heartId == 0);
        this.location = this.city;

        this.matchGender = (this.matchPreference == 'F') ? 'Female' : 'Male';
        if (this.matchPreference == 'A')
            this.matchGender = "All";
        var now = new Date();
        var year = now.getFullYear();

        this.matchAgeYear = this.birthYear;
        if (this.matchAge > 0) {
            this.matchAgeYear = year - this.matchAge;
            this.matchAgeRange = Math.round((this.matchAge - 18) / 2);
            if (this.matchAgeRange < 4)
                this.matchAgeRange = 4;
        }
        if (this.birthYear > 0) {
            var items = this.birthdate.split(' ');
            var items2 = items[0].split('-');
            if (items2.length == 3 && items2[0] == this.birthYear.toString()) {
                this.birthDay = parseInt(items2[2]);
                this.birthMonth = parseInt(items2[1]);
            } else {
                var dt = new Date(this.birthdate);
                this.birthDay = dt.getDate();
                this.birthMonth = dt.getMonth() + 1;
            }
            this.birthdate = items[0];
            this.age = year - this.birthYear;
        }

        this.lastLoginSrc = 'assets/images/blackCircle.png';
        if (this.lastLogin) {
            var dateObj = getDateObjFromJSDate(this.lastLogin);
            this.lastLoginText = dateObj.daysAgo + ' Days ago';
            if (dateObj.daysAgo == 0)
                this.lastLoginText = 'Today';
            if (dateObj.daysAgo == 1)
                this.lastLoginText = 'Yesterday';

            if (dateObj.daysAgo <= 14)
                this.lastLoginSrc = 'assets/images/redCircle.png';
            if (dateObj.daysAgo <= 7)
                this.lastLoginSrc = 'assets/images/yellowCircle.png';
            if (dateObj.daysAgo == 0)
                this.lastLoginSrc = 'assets/images/blueCircle.png';
            if (dateObj.secondsAgo <= 15 * 60) {
                this.lastLoginSrc = 'assets/images/greenCircle.png';
                this.lastLoginText = 'Online Now!';
            }
        }
        if (this.status == 'Active' && !this.matchAge)
            this.status = 'Pending';

        if (this.matchAge == 0) {
            this.matchAge = this.age;
        }


        this.imgSrc = betraImageFromId(this.user_id, this.profilePic, this.gender, this.picFlagged);
        this.mainImageSrc = this.imgSrc;

        this.adventureStableText = "n/a";
        if (this.personalityQuizAnswers) {
            var items = this.personalityQuizAnswers.split(':');
            var num = 0;
            items.forEach(element => {
                if (element == '2')
                    num++;
                else
                    num--;
            });
            if (num == 0 || num == 1)
                this.adventureStableText = "Easy Going";
            if (num > 1)
                this.adventureStableText = "Mellow";
            if (num >= 5)
                this.adventureStableText = "Stable";

            if (num == -1)
                this.adventureStableText = "Bold";
            if (num < -1)
                this.adventureStableText = "Adventurous";
            if (num <= -5)
                this.adventureStableText = "Wild";

            this.personalityNum = num;
        }
        if (this.politicalQuizAnswers) {
            var items = this.politicalQuizAnswers.split(':');
            var num = 0;
            var conLibertarian = 0;
            var conStatist = 0;
            items.forEach(element => {
                num++;
                if (num <= 4) {
                    if (element == "1")
                        conLibertarian++;
                    if (element == "3")
                        conLibertarian--;
                } else {
                    if (element == "1")
                        conStatist--;
                    if (element == "3")
                        conStatist++;

                }
            });
            this.conStatist = conStatist;
            this.conLibertarian = conLibertarian;

            this.polyText = "Moderate";

            if (conLibertarian > 2)
                this.polyText = "Capitalist";
            if (conLibertarian < -2)
                this.polyText = "Communist";
            if (conStatist > 2)
                this.polyText = "Nationalist";
            if (conStatist < -2)
                this.polyText = "Progressive";



            if (conLibertarian >= 2 && conStatist >= 2)
                this.polyText = "Conservative";
            if (conLibertarian == 4 && conStatist == 4)
                this.polyText = "NeoCon";


            if (conLibertarian >= 2 && conStatist <= -2)
                this.polyText = "Libertarian";
            if (conLibertarian == 4 && conStatist == -4)
                this.polyText = "Anarchist";

            if (conLibertarian <= -2 && conStatist <= -2)
                this.polyText = "Liberal";
            if (conLibertarian == -4 && conStatist == -4)
                this.polyText = "Socialist";

            if (conLibertarian <= -2 && conStatist >= 2)
                this.polyText = "Statist";
            if (conLibertarian == -4 && conStatist == 4)
                this.polyText = "Fascist";

        }

        this.bodyDesc = this.bodyHeight + ' ' + this.bodyType;
        if (this.bodyHeight == 'Average')
            this.bodyDesc = this.bodyType;
        if (this.bodyType == 'Average')
            this.bodyDesc = this.bodyHeight;




        //----Basics
        var basicsFlg = !!(this.firstName && this.gender && this.matchPreference && this.phone);
        //if (basicsFlg && this.findLoveFlg && !this.matchPreference)
        //  basicsFlg = false;

        //----Details
        var detailsFlg = true;
        if (this.findLoveFlg) {
            detailsFlg = !!(this.educationLevel && this.income && this.religion && this.bodyHeight && this.bodyType && this.city);
        }

        //---Quiz
        var quizFlg = true;
        if (this.findLoveFlg && !this.personalityQuizAnswers)
            quizFlg = false;

        var politicsFlg = true;
        if (this.findLoveFlg && !this.politicalQuizAnswers)
            politicsFlg = false;

        var matchFlg = true;
        if (this.status != 'Active')
            matchFlg = false;

        if (this.findLoveFlg && !this.matchHasKids)
            matchFlg = false;

        var profilePicFlg = this.profilePic > 0;

        var additionalPicsFlg = true;
        var verifyFlg = true;
        if (this.status == 'Active') {
            if (!basicsFlg || !detailsFlg || !quizFlg || !matchFlg || !additionalPicsFlg || !verifyFlg || !profilePicFlg)
                this.status = 'Pending';
        }

        //       if (this.status == 'Pending' && basicsFlg && quizFlg && matchFlg && additionalPicsFlg && verifyFlg) {
        //            this.status = 'Ready';
        //        }
        this.profileFlags = [basicsFlg, true, detailsFlg, quizFlg, politicsFlg, profilePicFlg, additionalPicsFlg, matchFlg, true];
    }
    userObjFromText(line: string) {
        var obj = {};
        return obj;
    }
}
function betraImageFromId(user_id: number, profilePic: number, gender: string, picFlagged: number) {
    var imgSrc = (gender && gender == 'M') ? 'assets/images/theRock.png' : 'assets/images/galGadot.png';

    if (user_id > 0 && profilePic > 0)
        imgSrc = 'https://www.appdigity.com/betraPhp/profileImages/profile' + user_id.toString() + '_' + profilePic.toString() + '.jpg';

    if (picFlagged > 0)
        imgSrc = 'assets/images/picFlagged' + picFlagged.toString() + '.png';

    return imgSrc;
}
function bonusImageFromNum(user_id: number, profilePic: number) {
    if (user_id > 0 && profilePic > 0)
        return 'https://www.appdigity.com/betraPhp/bonusPics/pic' + user_id.toString() + '_' + profilePic.toString() + '.jpg';
    else
        return '';

}