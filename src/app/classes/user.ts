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
    public lastLoginColor: string = 'black';

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
    public picNum1: number = 0;
    public picNum2: number = 0;
    public picNum3: number = 0;
    public picNum4: number = 0;
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
    public flaggedImg: string = '';
    public statsObj: any = null;
    public location: string = '';
    public astrologicalSign: string = 'Aries';
    public numReviews: number = 0;

    public pendingStatusReason: string = 'Fill out profile';
    public pendingStatusPage: number = 0;

    public drinksIcon: string = '';
    public drinksTitle: string = '';
    public smokesIcon: string = '';
    public smokesTitle: string = '';
    public potIcon: string = '';
    public potTitle: string = '';

    public roseAssignedBy: number = 0;
    public picCertificateFlg: boolean = false;
    public picCertificateNum: number = 0;
    public lat: number = 0;
    public lng: number = 0;
    public lastDay: string = '';
    public icon: string = 'fa fa-user';
    public userTitle: string = 'Regular Member';

    public profileFlaggedBy: number = 0;
    public profileFlaggedByProfilePic: number = 0;
    public activityRep: number = 0;
    public navLat: string = '';
    public navLng: string = '';
    public gpsLat: string = '';
    public gpsLng: string = '';
    public lookingForTitle: string = '';
    public facebookId: string = '';

    constructor(obj: any) {
        if (obj) {
            this.user_id = obj.user_id || 0;
            this.firstName = obj.firstName;
            this.phone = obj.phone || '';
            this.facebookId = obj.facebookId;
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
            this.gpsLat = obj.latitude || '';
            this.gpsLng = obj.longitude || '';
            this.navLat = obj.navLat || '';
            this.navLng = obj.navLng || '';
            this.latitude = obj.navLat || obj.latitude || '';
            this.longitude = obj.navLng || obj.longitude || '';

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
            this.numReviews = obj.numReviews || 0;
            this.roseAssignedBy = obj.roseAssignedBy || 0;

            this.profileFlaggedBy = obj.profileFlaggedBy || 0;
            this.profileFlaggedByProfilePic = obj.profileFlaggedByProfilePic || 0;

            this.picCertificateFlg = obj.picCertificateFlg && obj.picCertificateFlg == 'Y';
            this.picCertificateNum = obj.picCertificateNum || 0;
            this.lat = obj.lat || 0;
            this.lng = obj.lng || 0;
            this.lastDay = 'test';
            this.activityRep = obj.activityRep || 0;

            if (this.drinks == 'Yes') {
                this.drinksIcon = 'assets/images/drinker.png';
                this.drinksTitle = 'Drinks';
            }
            if (this.drinks == 'No') {
                this.drinksIcon = 'assets/images/nonDrinker.png';
                this.drinksTitle = 'Non Drinker';
            }
            if (this.drinks == 'Occasional') {
                this.drinksIcon = 'assets/images/drinker.png';
                this.drinksTitle = 'Occasionally drinks';
            }

            if (this.smokes == 'Yes') {
                this.smokesIcon = 'assets/images/smoker.png';
                this.smokesTitle = 'Smokes';
            }
            if (this.smokes == 'No') {
                this.smokesIcon = 'assets/images/nonSmoker.png';
                this.smokesTitle = 'Non smoker';
            }
            if (this.smokes == 'Occasional') {
                this.smokesIcon = 'assets/images/smoker.png';
                this.smokesTitle = 'Occasionally smokes';
            }

            if (this.cannabis == 'Yes') {
                this.potIcon = 'assets/images/cannabis.png';
                this.potTitle = 'Uses Cannabis';
            }
            if (this.cannabis == 'No') {
                this.potIcon = 'assets/images/noDrugs.png';
                this.potTitle = 'No drugs';
            }
            if (this.cannabis == 'Occasional') {
                this.potIcon = 'assets/images/cannabis.png';
                this.potTitle = 'Occasional drugs';
            }

            if (this.picFlagged > 0) {
                this.flaggedImg = betraImageFromId(this.user_id, this.profilePic, '', 0);
            }

            if (this.picFlagged > 0)
                this.profilePic = 0;

            this.picNum1 = obj.pic1;
            this.picNum2 = obj.pic2;
            this.picNum3 = obj.pic3;
            this.picNum4 = obj.pic4;
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

        if (this.memberFlg) {
            this.icon = 'fa fa-star';
            this.userTitle = 'Gold Member';
        }

        if (this.ownerFlg) {
            this.icon = 'fa fa-user-secret';
            this.userTitle = 'Admin';
        }

        //var poolImg = (this.matchPreference == 'F') ? 'assets/images/woman.jpeg' : 'assets/images/man.jpg';

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
                var heartFlg2 = (items.length >= 6 && items[5] == 'Y');
                datingPool.push({ name: name, src: src, user_id: user_id, heartFlg: heartFlg, level: level, heartFlg2: heartFlg2 });
            }

        });
        this.datingPool = datingPool;
        this.showHeartFormFlg = (this.datingPool.length >= 5 && this.heartId == 0);
        this.location = this.city;

        this.matchGender = (this.matchPreference == 'F') ? 'Female' : 'Male';

        if (this.matchPreference == 'A')
            this.matchGender = "All";

        this.lookingForTitle = this.maritalStatus + ' ' + this.genderName + ' looking for ' + this.matchGender;

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
            this.astrologicalSign = this.getastrologicalSign(this.birthdate);

        }
        var birthdt = getDateObjFromJSDate(this.birthdate);
        if (birthdt && birthdt.daysAgo > 0)
            this.age = Math.floor(birthdt.daysAgo / 365);

        this.lastLoginSrc = 'assets/images/blackCircle.png';
        if (this.lastLogin) {
            var dateObj = getDateObjFromJSDate(this.lastLogin);
            this.lastLoginColor = dateObj.lastLoginColor;
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
        if (this.status == 'Active' && !this.matchAge) {
            this.pendingStatusReason = 'Enter your ideal match age';
            this.pendingStatusPage = 7;
            this.status = 'Pending';
        }

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

            if (conLibertarian > 3)
                this.polyText = "Capitalist";
            if (conLibertarian < -3)
                this.polyText = "Socialist";
            if (conStatist > 3)
                this.polyText = "Nationalist";
            if (conStatist < -3)
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
                this.polyText = "Communist";

            if (conLibertarian <= -2 && conStatist >= 2)
                this.polyText = "Statist";
            if (conLibertarian == -4 && conStatist == 4)
                this.polyText = "Fascist";

        }

        this.bodyDesc = this.bodyHeight + ' ' + this.bodyType + ' ' + this.genderName;
        if (this.bodyHeight == 'Average')
            this.bodyDesc = this.bodyType + ' ' + this.genderName;
        if (this.bodyType == 'Average')
            this.bodyDesc = this.bodyHeight + ' ' + this.genderName;




        //----Basics
        var basicsFlg = !!(this.gender && this.matchPreference);
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
        if (this.status == 'Active' && !basicsFlg) {
            this.pendingStatusReason = 'Complete Basic info screen';
            this.pendingStatusPage = 0;
            this.status = 'Pending';
        }
        if (this.status == 'Active' && !detailsFlg) {
            this.pendingStatusReason = 'Complete Details info screen';
            this.pendingStatusPage = 2;
            this.status = 'Pending';
        }
        if (this.status == 'Active' && !quizFlg) {
            this.pendingStatusReason = 'Complete Personality Test';
            this.pendingStatusPage = 3;
            this.status = 'Pending';
        }
        if (this.status == 'Active' && !politicsFlg) {
            this.pendingStatusReason = 'Complete Politics Quiz ';
            this.pendingStatusPage = 4;
            this.status = 'Pending';
        }
        if (this.status == 'Active' && !profilePicFlg) {
            this.pendingStatusReason = 'Upload a good photo of your face';
            this.pendingStatusPage = 5;
            this.status = 'Pending';
        }
        if (this.status == 'Active' && !matchFlg) {
            this.pendingStatusReason = 'Complete your ideal-match info screen';
            this.pendingStatusPage = 7;
            this.status = 'Pending';
        }

        this.profileFlags = [basicsFlg, true, detailsFlg, quizFlg, politicsFlg, profilePicFlg, additionalPicsFlg, matchFlg, true];
    }
    userObjFromText(line: string) {
        var obj = {};
        return obj;
    }
    getastrologicalSign(birthdate: any) {
        var dateObj = getDateObjFromJSDate(this.birthdate);
        if (dateObj.mo == 1) {
            if (dateObj.dayOfMonth < 20)
                return 'Capricorn';
            else
                return 'Aquarius';
        }
        if (dateObj.mo == 2) {
            if (dateObj.dayOfMonth < 19)
                return 'Aquarius';
            else
                return 'Pisces';
        }
        if (dateObj.mo == 3) {
            if (dateObj.dayOfMonth < 21)
                return 'Pisces';
            else
                return 'Aries';
        }
        if (dateObj.mo == 4) {
            if (dateObj.dayOfMonth < 20)
                return 'Aries';
            else
                return 'Taurus';
        }
        if (dateObj.mo == 5) {
            if (dateObj.dayOfMonth < 21)
                return 'Taurus';
            else
                return 'Gemini';
        }
        if (dateObj.mo == 6) {
            if (dateObj.dayOfMonth < 22)
                return 'Gemini';
            else
                return 'Cancer';
        }
        if (dateObj.mo == 7) {
            if (dateObj.dayOfMonth < 23)
                return 'Cancer';
            else
                return 'Leo';
        }
        if (dateObj.mo == 8) {
            if (dateObj.dayOfMonth < 23)
                return 'Leo';
            else
                return 'Virgo';
        }
        if (dateObj.mo == 9) {
            if (dateObj.dayOfMonth < 23)
                return 'Virgo';
            else
                return 'Libra';
        }
        if (dateObj.mo == 10) {
            if (dateObj.dayOfMonth < 23)
                return 'Libra';
            else
                return 'Scorpio';
        }
        if (dateObj.mo == 11) {
            if (dateObj.dayOfMonth < 23)
                return 'Scorpio';
            else
                return 'Sagittarius';
        }
        if (dateObj.mo == 12) {
            if (dateObj.dayOfMonth < 22)
                return 'Sagittarius';
            else
                return 'Capricorn';
        }
        return 'Unknown';
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