declare var getDateObjFromJSDate: any;
export class User {
    public user_id: number = 0;
    public firstName: string = '';
    public birthdate: string = '';
    public birthYear: number = 0;
    public gender: string = '';
    public matchPreference: string = '';
    public findLoveFlg: boolean = false;
    public meetPeopleFlg: boolean = false;
    public makeMoneyFlg: boolean = false;

    public educationLevel: string = '';
    public income: string = '';
    public religion: string = '';
    public maritalStatus: string = '';
    public bodyType: string = '';
    public bodyHeight: string = '';
    public desiredRelationship: string = '';
    public city: string = '';
    public longestRelationship: string = '';
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


    constructor(obj: any) {
        this.user_id = obj.user_id;
        this.firstName = obj.firstName;
        this.birthdate = obj.birthdate;
        this.birthYear = obj.birthYear;
        this.gender = obj.gender;
        this.findLoveFlg = obj.findLoveFlg == 'Y';
        this.meetPeopleFlg = obj.meetPeopleFlg == 'Y';
        this.makeMoneyFlg = obj.makeMoneyFlg == 'Y';
        this.profilePic = obj.profilePic;
        this.email = obj.email || '';
        this.zipcode = obj.zipcode || '';
        this.educationLevel = obj.educationLevel || '';
        this.income = obj.income || '';
        this.religion = obj.religion || '';
        this.maritalStatus = obj.maritalStatus || '';
        this.bodyType = obj.bodyType || '';
        this.bodyHeight = obj.bodyHeight || '';
        this.desiredRelationship = obj.desiredRelationship || '';
        this.city = obj.city || '';
        this.longestRelationship = obj.longestRelationship || '0';
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
        this.status = obj.userStatus || 'Pending';
        this.emailVerifyFlg = obj.emailVerifyFlg == 'Y';
        this.lastLogin = obj.lastLogin;
        this.lastLoginText = '-';
        this.matchPreference = obj.matchPreference;

        this.matchGender = (this.matchPreference == 'F') ? 'Female' : 'Male';
        if (this.matchPreference == 'A')
            this.matchGender = "All";
        var now = new Date();
        var year = now.getFullYear();
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
            this.age = year - this.birthYear;
        }
        if (this.lastLogin) {
            var dateObj = getDateObjFromJSDate(this.lastLogin);
            this.lastLoginText = dateObj.daysAgo + ' Days ago';
            if (dateObj.daysAgo == 0)
                this.lastLoginText = 'Today';
            if (dateObj.daysAgo == 1)
                this.lastLoginText = 'Yesterday';

        }
        if (this.matchAge == 0) {
            this.matchAge = this.age;
        }

        this.imgSrc = (obj.gender == 'M') ? 'assets/images/theRock.png' : 'assets/images/galGadot.png';
        if (this.profilePic > 0)
            this.imgSrc = 'https://www.appdigity.com/betraPhp/profileImages/profile' + this.user_id + '_' + this.profilePic + '.jpg';

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
            this.adventureStableText = "Moderate";
            if (num > 1)
                this.adventureStableText = "Leans Stable";
            if (num >= 5)
                this.adventureStableText = "Extremely Stable";

            if (num < -1)
                this.adventureStableText = "Leans Adventurous";
            if (num <= -5)
                this.adventureStableText = "Extremely Adventurous";

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
        var basicsFlg = !!(this.firstName && this.zipcode && this.gender);
        if (basicsFlg && this.findLoveFlg && !this.matchPreference)
            basicsFlg = false;

        //----Details
        var detailsFlg = true;
        if (this.findLoveFlg) {
            detailsFlg = !!(this.educationLevel && this.income && this.religion && this.bodyHeight && this.bodyType);
        }

        //---Quiz
        var quizFlg = true;
        if (this.findLoveFlg && !this.personalityQuizAnswers)
            quizFlg = false;

        var politicsFlg = true;
        if (this.findLoveFlg && !this.politicalQuizAnswers)
            politicsFlg = false;

        var matchFlg = true;
        if (this.findLoveFlg && !this.matchHasKids)
            matchFlg = false;

        var profilePicFlg = this.profilePic > 0;
        var additionalPicsFlg = true;
        var verifyFlg = this.emailVerifyFlg;
        if (!basicsFlg || !quizFlg || !matchFlg || !additionalPicsFlg || !verifyFlg)
            this.status = 'Pending';
        if (this.status == 'Pending' && basicsFlg && quizFlg && matchFlg && additionalPicsFlg && verifyFlg) {
            this.status = 'Ready';
        }
        this.profileFlags = [basicsFlg, verifyFlg, detailsFlg, quizFlg, politicsFlg, matchFlg, profilePicFlg, additionalPicsFlg, true];
    }
    userObjFromText(line: string) {
        var obj = {};
        return obj;
    }
}
