import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;
declare var getDateObjFromJSDate: any;
declare var getBrowser: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BaseComponent implements OnInit {
  public menuDisableFlg = true;
  public menuSubmitdisableFlg = true;
  public showSubmitButtonFlg: boolean = false;
  public fileToUpload: any;
  public inputFieldObj: any;
  public menuTitles = ['Basics', 'Verify Email', 'Details', 'Personality Test', 'Political Assessment', 'Profile Image', 'Pictures', 'Your Match', 'Done'];
  public menuDesc = [
    'Ready to find love? Yes you are! Lets start with your basic infomation',
    'We want to verify your email to know you are legit. Feel free to skip for now if you want. We trust you!',
    'Details, details details! Yes this is a lot of stuff to fill out, but it will be worth it. Betra tells you more about a potential match than any other dating site!',
    'How about a simple personality test? This is just to see how you stack up against potential matches.',
    'You might not care about politics, but this is just one more tool you can use when looking at matches. NO ONE will be able to see your answers to these questions. The scores are only meant to tell you how close or far away you are from potential matches on the political spectrum.',
    'Take a selfie! And make it a good one. Make sure you show your beautiful face.',
    'This is optional, but feel free to add up to 4 more pictures',
    'Final Step! Tell us what you are looking for in a match. And don\'t worry, these are simply used to tell you how close each potential match is to your ideal.',
    'That\'s it! You are ready to find love.',
    'end'
  ]
  public menuTitles2 = ['Basics', 'Email', 'Details', 'Personality', 'Politics', 'Image', 'Pics', 'Match'];
  public educationLevels = ['No Education', 'High School Grad', 'Some College', '2-year Degree', '4-year Degree', 'Masters Degree', 'PhD'];
  public incomes = ['Under $20K', '$20K - $49K', '$50K - $99K', '$100K - $199K', 'over $200K'];
  public maritalStatus = ['Single', 'Married', 'Divorced'];
  public bodyTypes = ['Thin', 'Average', 'Heavy'];
  public bodyHeights = ['Short', 'Average', 'Tall'];
  public desiredRelationships = ['Serious', 'Casual', 'Serious or Casual'];
  public marriageOptions = ['High Priority', 'Maybe', 'Not likely'];
  public kidsOptions = ['Yes', 'No', 'Does Not Matter'];
  public smokingOptions = ['Yes', 'Occasional', 'No'];
  public religions = ['Christian', 'Jewish', 'Buddhist', 'Islamic', 'Atheist', 'None/Agnostic', 'Hindu', 'Sikh', 'Jainist', 'Taoist', 'Spiritualism', 'Other Religion'];
  public raceOptions = ['White', 'Black', 'Asian', 'Pacific Islander', 'Native American', 'South-Asian', 'Hispanic', 'Middle Eastern', 'Other'];
  public bonusImages = ['Image1', 'Image2', 'Image3', 'Image4'];
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
    { subject: 'Gun Rights', option1: 'Pro 2nd Ammendment', option2: 'Hunting guns only, please.', option3: 'NO to guns!', answer: '' },
    { subject: 'Abortion Rights', option1: 'Pro Life', option2: 'Pro Choice', option3: 'Abortion on demand and government should pay.', answer: '' },
    { subject: 'Education', option1: 'Pro School Choice', option2: 'More funds for better schools.', option3: 'All education should be free and run by the government.', answer: '' },
    { subject: 'Economy & Taxes', option1: 'Yea capitalism!', option2: 'Regulate and tax.', option3: 'Take money away from greedy corporations and give it to the poor.', answer: '' },
    { subject: 'Military', option1: 'No more bombs!', option2: 'Support military but reduce its size.', option3: 'Stronger, better military.', answer: '' },
    { subject: 'Police', option1: 'BLM / Defund Police.', option2: 'Reforms needed.', option3: 'Pro Police', answer: '' },
    { subject: 'Drugs', option1: 'Legalize all drugs', option2: 'Marijuana is OK but no hard drugs.', option3: 'Opposed to drugs.', answer: '' },
    { subject: 'Sex Workers', option1: 'Legalize prostitution everywhere.', option2: 'Let states decide.', option3: 'Keep prostitution illegal.', answer: '' },
  ];
  public stateOptions = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ]
  public cityDisabledFlg = false;
  public browser: string = '';

  constructor(private router: Router, private route: ActivatedRoute) { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.changesMadeFlg = false;
    this.loadQuizAnswers();
    this.loadTestAnswers();
    this.checkIPAddress();
    this.logUser('Y');
    this.browser = getBrowser();

    if (!localStorage['latitude'])
      this.getLocation();
    else if (!this.user.navLat)
      this.uploadCoordinates();

    this.cityDisabledFlg = this.user.city && this.user.city.length > 0;

    this.route.queryParams.subscribe(params => {
      this.menuNum = parseInt(params['num']) || 0;
    });
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
    if (this.changesMadeFlg == true)
      this.menuValueChanged();
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

    window.scrollTo(0, 0);

    //    if (this.menuNum == 8 && this.user.status == 'Active')
    //     this.router.navigate(['']);
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
    if (responseJson.action == "logUser") {
      if (!this.user.email && responseJson.user.email) {
        console.log('fixing User!!', this.user.email, responseJson.user.email);
        this.user.email = responseJson.user.email;
        this.user.phone = responseJson.user.phone;
      }
      this.syncUserWithLocalStorage(responseJson);

    }
    if (responseJson.action == 'login') {
      localStorage['User'] = JSON.stringify(responseJson.user);
      this.loadUserObj();
      this.imgSrc = '';
    }
    if (responseJson.action == 'updateMainImage') {
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
      if (!responseJson.countryName)
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
  menuValueChanged2() {
    this.changesMadeFlg = true;
    this.errorMessage = '';
  }
  menuValueChanged() {
    this.changesMadeFlg = true;
    this.errorMessage = '';
    if (this.menuNum == 0) {
      //this.user.email = $('#email').val();

      var day = $('#day').val();
      var month = $('#month').val();
      var year = $('#year').val();

      var now = getDateObjFromJSDate();
      this.user.birthdate = year + '-' + month + '-' + day + ' ' + now.time;
      //this.user.firstName = $('#firstName').val();
      this.user.phone = $('#phone').val();
      this.user.zipcode = $('#zipcode').val();

      var basicsFlg = (this.user.email && this.user.firstName && this.user.gender && this.user.matchPreference && this.user.phone);
      var obj = getDateObjFromJSDate(this.user.birthdate);

      if (obj.jsDate == 'Invalid Date') {
        this.errorMessage = 'enter valid birthday';
        basicsFlg = false;
      } else {
        this.user.birthYear = obj.year;
        if (obj.daysAgo < 365 * 18) {
          this.errorMessage = 'enter valid birthday';
          basicsFlg = false;
        }
        if (obj.daysAgo > 365 * 100) {
          this.errorMessage = 'enter valid birthday';
          basicsFlg = false;
        }
      }
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
      this.user.state = $('#state').val();
      this.user.longestRelationship = $('#longestRelationship').val();
      this.user.numKids = $('#numKids').val();
      this.user.numTattoos = $('#numTattoos').val();
      this.user.numPiercings = $('#numPiercings').val();

      this.user.desiredRelationship = $('#desiredRelationship').val();
      this.user.marriageView = $('#marriageView').val();
      this.user.motto = $('#motto').val();

      if (this.user.findLoveFlg)
        this.user.profileFlags[this.menuNum] = (this.user.maritalStatus && this.user.educationLevel && this.user.income && this.user.religion && this.user.bodyType && this.user.bodyHeight && this.user.wantsKids && this.user.desiredRelationship && this.user.marriageView && this.user.motto && this.user.city);
      else
        this.user.profileFlags[this.menuNum] = (this.user.maritalStatus);
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
      birthdate: this.user.birthdate,
      birthYear: this.user.birthYear,
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
      city: this.user.city,
      state: this.user.state,
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
      browser: this.browser,
      latitude: localStorage['latitude'],
      longitude: localStorage['longitude'],
      action: 'updateProfile',
    };
    console.log('xxParamsxx', params);
    this.executeApi('appApiCode.php', params, true);
  }

  uploadPicButtonClicked(num: number) {
    this.loadingFlg = true;
    var params = {
      userId: this.user.user_id,
      code: localStorage['code'],
      action: 'updateBonusImage',
      picNum: num + 1,
      image: $('#' + this.bonusImages[num]).attr('src')
    };
    //console.log('uploadPicButtonClicked', params);
    this.executeApi('appApiCode.php', params, true);
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

  updateImageButton2Clicked() {
    this.loadingFlg = true;
    this.showSubmitButtonFlg = false;

    setTimeout(() => {
      var params = {
        userId: this.user.user_id,
        code: localStorage['code'],
        action: 'updateMainImage',
        image: $('#myImg').attr('src')
      };
      console.log('updateImageButtonClicked', params);
      this.executeApi('appApiCode.php', params, true);
    }, 1000);
  }

}
