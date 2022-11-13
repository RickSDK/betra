import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

declare var $: any;
declare var getIPInfo: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BaseComponent implements OnInit {
  public menuNum = 0;
  public menuDisableFlg = true;
  public menuSubmitdisableFlg = true;
  public showSubmitButtonFlg: boolean = false;
  public fileToUpload: any;
  public inputFieldObj: any;
  public menuTitles = ['Basics', 'Verify Email', 'Details', 'Personality Test', 'Political Assessment', 'Profile Image', 'Pictures', 'Your Match', 'Done'];
  public educationLevels = ['No Education', 'High School Grad', 'Some College', '2-year Degree', '4-year Degree', 'Masters Degree', 'PhD'];
  public incomes = ['Under $20K', '$20K - $49K', '$50K - $99K', '$100K - $199K', 'over $200K'];
  public religions = ['Christian', 'Jewish', 'Buddhist', 'Islamic', 'Atheist', 'None/Agnostic', 'Hindu', 'Other Religion'];
  public maritalStatus = ['Single', 'Married', 'Divorced'];
  public bodyTypes = ['Thin', 'Average', 'Heavy'];
  public bodyHeights = ['Short', 'Average', 'Tall'];
  public desiredRelationships = ['Serious', 'Casual', 'Serious or Casual'];
  public marriageOptions = ['High Priority', 'Maybe', 'Not likely'];
  public kidsOptions = ['Yes', 'No', 'Does Not Matter'];
  public smokingOptions = ['Yes', 'No'];
  public raceOptions = ['White', 'Black', 'Asian', 'Pacific Islander', 'Native American', 'Asian-Indian', 'Other'];

  public code: string = localStorage['code'];
  public email: string = localStorage['email'];
  public infoScreenNum: number = 0;
  public personalityQuiz = [
    { question: 'Which would you rather have?', option1: 'New Car', option2: 'Paid-off older Car', answer: '' },
    { question: 'What is a better Friday night plan?', option1: 'Clubbing', option2: 'Dinner & Movie', answer: '' },
    { question: 'How many kids is best to have?', option1: 'Less than 2', option2: '2 or More', answer: '' },
    { question: 'Would you rather live in a condo in the city, or house in the suburbs?', option1: 'Condo', option2: 'House', answer: '' },
    { question: 'Where would you rather eat dinner?', option1: 'Nice Restaurant', option2: 'Home Cooked', answer: '' },
    { question: 'What would you rather do alone?', option1: 'Watch TV', option2: 'Gardening', answer: '' },
    { question: 'What sounds like more fun?', option1: 'Spring Break Party', option2: 'Camping Trip', answer: '' },
  ];
  public politicalQuiz = [
    { subject: 'Gun Rights', option1: 'Pro Second Ammendment', option2: 'Guns should be allowed for hunting and personal protection, but heavily regulated and tracked.', option3: 'Guns are too dangerous and should be outlawed.', answer: '' },
    { subject: 'Abortion Rights', option1: 'Pro Life', option2: 'Legal in first trimester, Illegal in 3rd trimester.', option3: 'Full access for everyone and government should pay for abortions.', answer: '' },
    { subject: 'Education', option1: 'Pro School Choice', option2: 'More funds for better schools and better teachers.', option3: 'All education should be free. Opposed to charter schools, religious schools and home schooling.', answer: '' },
    { subject: 'Economy & Taxes', option1: 'Tea Party - Pro capitalism, free market enterprise and keep taxes low', option2: 'Moderate: Good balance of free markets, regulations and taxes.', option3: '99%er: Take money away from greedy corporations in order to fully fund saftey net programs.', answer: '' },
    { subject: 'Military', option1: 'Anti-military. No more bombs or war machines.', option2: 'Support military but would like to see it reduced in size.', option3: 'Stronger, better military.', answer: '' },
    { subject: 'Police', option1: 'BLM supporter. Defund the police and shift to social services.', option2: 'More diversity and racial sensitivity training for police.', option3: 'Pro Police', answer: '' },
    { subject: 'Drugs', option1: 'Legalize all drugs', option2: 'Marijuana  is OK but other hard drugs should remain illegal.', option3: 'Opposed to marijuana and drugs in general.', answer: '' },
    { subject: 'Sex Workers', option1: 'Legalize prostitution everywhere.', option2: 'Let states set their own laws on prostitution and sex work.', option3: 'Pro traditional families, keep prostitution illegal.', answer: '' },
  ];

  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.changesMadeFlg = false;
    this.loadQuizAnswers();
    this.loadTestAnswers();
    this.checkIPAddress();
      //getIPInfo('test', 'test');
    //this.refreshUser();
  }
  checkIPAddress() {
    var params = {
      userId: localStorage['user_id'],
      code: localStorage['code'],
      action: "checkIPAddress"
    };
    this.executeApi('appApiCode.php', params, true);
  }
  populateGeoInfo() {
    console.log('populateGeoInfo');
    $.getJSON('http://www.geoplugin.net/json.gp?jsoncallback=?', (data: any) => {
      var params = {
        userId: localStorage['user_id'],
        code: localStorage['code'],
        city: data.geoplugin_city,
        continentName: data.geoplugin_continentName,
        countryCode: data.geoplugin_countryCode,
        countryName: data.geoplugin_countryName,
        currencyCode: data.geoplugin_currencyCode,
        currencySymbol: data.geoplugin_currencySymbol,
        latitude: data.geoplugin_latitude,
        longitude: data.geoplugin_longitude,
        region: data.geoplugin_region,
        state: data.geoplugin_regionCode,
        stateName: data.geoplugin_regionName,
        ip: data.geoplugin_request,
        action: "updateGeoInfo"
      };
      console.log('params', params);
      this.executeApi('appApiCode.php', params, true);
    });
  }
  loadQuizAnswers() {
    if (this.user.personalityQuizAnswers) {
      var answers = this.user.personalityQuizAnswers.split(':');
      var i = 0;
      if (answers.length == this.personalityQuiz.length) {
        this.personalityQuiz.forEach(element => {
          element.answer = answers[i++];
        });

      }
    }
  }
  loadTestAnswers() {
    if (this.user.politicalQuizAnswers) {
      var answers = this.user.politicalQuizAnswers.split(':');
      var i = 0;
      if (answers.length == this.politicalQuiz.length) {
        this.politicalQuiz.forEach(element => {
          element.answer = answers[i++];
        });

      }
    }
  }
  ngClassAnswer(flg: boolean) {
    if (flg)
      return 'btn btn-quiz button-active';
    else
      return 'btn btn-quiz';
  }
  ngClassButton(flg: boolean) {
    if (flg)
      return 'btn btn-betra button-active';
    else
      return 'btn btn-betra';
  }
  answerPersonalityQuiz(num: number, answer: number) {
    this.changesMadeFlg = true;
    this.errorMessage = '';
    this.personalityQuiz[num].answer = answer.toString();
    var numAnswers = 0;
    var answers: any = [];
    var stableScore = 0;
    this.personalityQuiz.forEach(element => {
      answers.push(element.answer);
      if (element.answer != '')
        numAnswers++;
      if (element.answer == "2")
        stableScore++;
    });
    if (numAnswers == 7)
      this.user.profileFlags[this.menuNum] = true;

    this.user.personalityQuizAnswers = answers.join(':');
    this.user.stableScore = stableScore;
    console.log('xxx', stableScore);
  }
  answerPoliticalQuiz(num: number, answer: number) {
    this.changesMadeFlg = true;
    this.errorMessage = '';
    this.politicalQuiz[num].answer = answer.toString();
    var numAnswers = 0;
    var conScore = 0;
    var answers: any = [];
    this.politicalQuiz.forEach(element => {
      if (element.answer == '2')
        conScore++;
      if (numAnswers < 4 && element.answer == '1')
        conScore += 2;
      if (numAnswers >= 4 && element.answer == '3')
        conScore += 2;



      answers.push(element.answer);
      if (element.answer != '')
        numAnswers++;
    });
    if (numAnswers == 8)
      this.user.profileFlags[this.menuNum] = true;

    this.user.conScore = conScore;
    this.user.politicalQuizAnswers = answers.join(':');
    console.log('xxx', this.user.conScore);
  }
  showInfoScreen(num: number) {
    if (num == this.infoScreenNum)
      this.infoScreenNum = 0;
    else
      this.infoScreenNum = num;
  }
  selectCheckbox(num: number) {
    this.changesMadeFlg = true;
    if (num == 1)
      this.user.findLoveFlg = !this.user.findLoveFlg;
    if (num == 2)
      this.user.meetPeopleFlg = !this.user.meetPeopleFlg;
    if (num == 3)
      this.user.makeMoneyFlg = !this.user.makeMoneyFlg;

    this.menuValueChanged();
  }
  profileSectionBack() {
    this.menuNum--;
    this.changesMadeFlg = false;
    this.errorMessage = '';
  }
  profileSectionAdvance() {
    this.apiSuccessFlg = false;
    if (!this.user.profileFlags[this.menuNum]) {
      this.errorMessage = 'Fill out all required fields';
      return;
    }
    if (this.changesMadeFlg)
      this.profileSubmitPress();
    else
      this.menuNum++;

    if (this.menuNum == 6 && !this.user.findLoveFlg)
      this.menuNum = 8;
  }
  refreshUser() {
    var email = localStorage['email'];
    if (!email) {
      console.log('hey!! no email');
      return;
    }
    var params = {
      email: localStorage['email'],
      code: localStorage['code'],
      action: 'login'
    };
    console.log('refreshUser!!', params);
    this.executeApi('login.php', params, true);
  }
  selectGender(gender: string) {
    this.user.gender = gender;
    this.menuValueChanged();
  }
  selectMatches(gender: string) {
    this.user.matchPreference = gender;
    this.menuValueChanged();
  }
  activateUser() {
    var params = {
      userId: this.user.user_id,
      code: localStorage['code'],
      action: 'activate'
    };
    console.log(params);
    this.executeApi('appApiCode.php', params, true);
  }
  override postSuccessApi(file: string, responseJson: any) {
    console.log('XXX postSuccessApi', file, responseJson);
    if (responseJson.action == 'login') {
      localStorage['User'] = JSON.stringify(responseJson.user);
      this.loadUserObj();
      this.imgSrc = '';
      console.log('xxx', this.imgSrc);
    }
    if(responseJson.action == 'updateMainImage') {
      this.user.profileFlags[this.menuNum] = true;
      console.log('pic uploaded!');
      this.menuNum++;
      if (this.menuNum == 6 && !this.user.findLoveFlg)
        this.menuNum = 8;
    }
    if (responseJson.action == 'activate' || responseJson.action == 'updateProfile' || responseJson.action == 'sendEmailCode') {
      this.apiSuccessFlg = true;
      this.changesMadeFlg = false;
      if (responseJson.action != "sendEmailCode") {
        this.menuNum++;
        this.refreshUser();
      }
    }
    if (responseJson.action == 'checkIPAddress') {
      if (!responseJson.ip)
        this.populateGeoInfo();
    }
  }
  selectMenu(num: number) {
    if (this.menuNum == num)
      this.menuNum = 0;
    else
      this.menuNum = num;
    this.loadingFlg = false;
    this.errorMessage = '';
    this.apiSuccessFlg = false;
    this.menuDisableFlg = true;
    this.menuSubmitdisableFlg = true;
    this.imgSrc = '';
  }
  sendCode() {
    this.menuDisableFlg = false;

    var params = {
      userId: this.user.user_id,
      code: localStorage['code'],
      action: 'sendEmailCode',
    };
    console.log(params);
    this.executeApi('appApiCode.php', params, true);

  }
  ngClassMenuItem(num: number) {
    if (num == this.menuNum)
      return 'profile-menu-item menu-active';
    else
      return 'profile-menu-item';
  }
  profileItemStatusClass(status: boolean) {
    if (status)
      return 'fa fa-check';
    else
      return 'fa fa-exclamation-triangle';
  }
  iconCheckClass(item: string) {
    if (item)
      return 'fa fa-check';
    else
      return 'fa fa-hand-o-right';
  }
  menuValueChanged() {
    this.changesMadeFlg = true;
    this.errorMessage = '';
    if (this.menuNum == 0) {
      this.user.email = $('#email').val();
      this.user.firstName = $('#firstName').val();
      this.user.phone = $('#phone').val();
      this.user.zipcode = $('#zipcode').val();

      var basicsFlg = (this.user.email && this.user.firstName && this.user.zipcode && this.user.gender && this.user.matchPreference);
      if (!this.user.findLoveFlg && !this.user.meetPeopleFlg && !this.user.makeMoneyFlg)
        basicsFlg = false;
      this.user.profileFlags[this.menuNum] = basicsFlg;
    }
    if (this.menuNum == 2) {
      this.user.maritalStatus = $('#maritalStatus').val();
      this.user.race = $('#race').val();
      this.user.smokes = $('#smokes').val();
      this.user.drinks = $('#drinks').val();
      this.user.cannabis = $('#cannabis').val();
      this.user.educationLevel = $('#educationLevel').val();
      this.user.income = $('#income').val();
      this.user.religion = $('#religion').val();
      this.user.bodyType = $('#bodyType').val();
      this.user.bodyHeight = $('#bodyHeight').val();
      this.user.wantsKids = $('#wantsKids').val();

      this.user.city = $('#city').val();
      this.user.longestRelationship = $('#longestRelationship').val();
      this.user.numKids = $('#numKids').val();
      this.user.numTattoos = $('#numTattoos').val();
      this.user.numPiercings = $('#numPiercings').val();

      this.user.desiredRelationship = $('#desiredRelationship').val();
      this.user.marriageView = $('#marriageView').val();
      this.user.motto = $('#motto').val();

      if (this.user.findLoveFlg)
        this.user.profileFlags[this.menuNum] = (this.user.maritalStatus && this.user.city && this.user.educationLevel && this.user.income && this.user.religion && this.user.bodyType && this.user.bodyHeight && this.user.wantsKids && this.user.desiredRelationship && this.user.marriageView && this.user.motto);
      else
        this.user.profileFlags[this.menuNum] = (this.user.maritalStatus && this.user.city);
    }
    if (this.menuNum == 7) {
      this.user.matchAge = $('#matchAge').val();
      this.user.matchBody = $('#matchBody').val();
      this.user.matchHeight = $('#matchHeight').val();
      this.user.matchMarriage = $('#matchMarriage').val();
      this.user.matchRelationship = $('#matchRelationship').val();
      this.user.matchEducation = $('#matchEducation').val();
      this.user.matchIncome = $('#matchIncome').val();
      this.user.matchReligion = $('#matchReligion').val();
      this.user.matchHasKids = $('#matchHasKids').val();
      this.user.matchWantsKids = $('#matchWantsKids').val();
      this.user.matchWantsKids = $('#matchWantsKids').val();
      this.user.story = $('#story').val();
      this.user.profileFlags[this.menuNum] = (this.user.story && this.user.matchHasKids);

    }
  }
  profileSubmitPress() {
    this.loadingFlg = true;
    this.apiSuccessFlg = false;
    this.errorMessage = '';
    this.menuSubmitdisableFlg = true;
    this.menuDisableFlg = true;

    var params = {
      userId: this.user.user_id,
      code: localStorage['code'],
      email: this.user.email,
      firstName: this.user.firstName,
      zipcode: this.user.zipcode,
      motto: this.user.motto,
      story: this.user.story,
      updateNum: this.menuNum + 1,
      gender: this.user.gender,
      matchPreference: this.user.matchPreference,
      findLoveFlg: this.user.findLoveFlg ? 'Y' : 'N',
      meetPeopleFlg: this.user.meetPeopleFlg ? 'Y' : 'N',
      makeMoneyFlg: this.user.makeMoneyFlg ? 'Y' : 'N',
      educationLevel: this.user.educationLevel,
      income: this.user.income,
      race: this.user.race,
      smokes: this.user.smokes,
      drinks: this.user.drinks,
      cannabis: this.user.cannabis,
      religion: this.user.religion,
      maritalStatus: this.user.maritalStatus,
      bodyType: this.user.bodyType,
      bodyHeight: this.user.bodyHeight,
      desiredRelationship: this.user.desiredRelationship,
      city: this.user.city,
      longestRelationship: this.user.longestRelationship,
      numTattoos: this.user.numTattoos,
      numPiercings: this.user.numPiercings,
      marriageView: this.user.marriageView,
      numKids: this.user.numKids,
      wantsKids: this.user.wantsKids,
      personalityQuizAnswers: this.user.personalityQuizAnswers,
      matchAge: this.user.matchAge,
      matchBody: this.user.matchBody,
      matchHeight: this.user.matchHeight,
      matchMarriage: this.user.matchMarriage,
      matchRelationship: this.user.matchRelationship,
      matchEducation: this.user.matchEducation,
      matchIncome: this.user.matchIncome,
      matchReligion: this.user.matchReligion,
      matchHasKids: this.user.matchHasKids,
      matchWantsKids: this.user.matchWantsKids,
      politicalQuizAnswers: this.user.politicalQuizAnswers,
      stableScore: this.user.stableScore,
      conScore: this.user.conScore,
      phone: this.user.phone,
      action: 'updateProfile',
    };
    console.log('xxParamsxx', params);
    this.executeApi('appApiCode.php', params, true);
  }

  handleFileInput(event: any) {
    this.errorMessage = '';
    this.showSubmitButtonFlg = false;
    this.apiSuccessFlg = false;
    var files: FileList = event.target.files;
    this.fileToUpload = files.item(0);
    var reader = new FileReader();
    reader.onload = imageIsLoaded;

    reader.readAsDataURL(this.fileToUpload);
    this.showSubmitButtonFlg = true;
  }

  updateImageButtonClicked() {
    this.showSubmitButtonFlg = false;
    var params = {
      userId: this.user.user_id,
      code: localStorage['code'],
      action: 'updateMainImage',
      image: $('#myImg').attr('src')
    };
    //console.log('updateImageButtonClicked', params);
    this.executeApi('appApiCode.php', params, true);
  }

}
function imageIsLoaded(e: any) {
  $('#myImg').attr('src', e.target.result);
  var image = new Image();
  image.src = e.target.result.toString();
  image.onload = function () {
    console.log('Full size: ', image.src.length, image.width, image.height);
    var smallImgSrc = imageToDataUri(image);

    var smallImage = new Image();
    smallImage.src = smallImgSrc.toString();
    smallImage.onload = function () {
      $('#myImg').attr('src', smallImgSrc);
      console.log('New Size: ', smallImage.src.length, smallImage.width, smallImage.height);
    }
  }
};
function imageToDataUri(img: any) {
  // create an off-screen canvas
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');

  var MAXSIZE = 600;
  var pct;
  if (img.width > img.height) {
    if (img.width > MAXSIZE) {
      pct = MAXSIZE / img.width;
    } else {
      return img.src;
    }
  } else {
    if (img.height > MAXSIZE) {
      pct = MAXSIZE / img.height;
    } else {
      return img.src;
    }
  }

  var newHeight = img.height * pct;
  var newWidth = img.width * pct;

  if (newHeight < 200 || newWidth < 200) {
    return img.src;
  }

  canvas.height = newHeight;
  canvas.width = newWidth;

  // set its dimension to target size
  //canvas.width = width;
  //canvas.height = height;

  // draw source image into the off-screen canvas:
  if (ctx)
    ctx.drawImage(img, 0, 0, newWidth, newHeight);
  // encode image to data-uri with base64 version of compressed image
  //jw1945 so the default is png... from canvas
  // we want to use jpeg and we will
  //set the quality to .8 to save on space
  //in database quality looks pretty good can adjust
  //quality values are 1.0 to 0.1
  return canvas.toDataURL('image/jpeg', 0.8);
}