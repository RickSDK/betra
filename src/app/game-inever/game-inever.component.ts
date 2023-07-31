import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';
import { WebsocketService } from '../websocket.service';
import { Router } from '@angular/router';

declare var betraImageFromId: any;
declare var $: any;

@Component({
  selector: 'app-game-inever',
  templateUrl: './game-inever.component.html',
  styleUrls: ['./game-inever.component.scss']
})
export class GameIneverComponent extends BaseComponent implements OnInit {

  public MIN_PLAYER: number = 4;

  public players: any = [];
  public realPlayers: any = [];
  public spectators: any = [];
  public defaultPlayer = { user_id: 0, name: 'empty', src: 'assets/images/games/iNever.jpeg' };
  public audio = new Audio('assets/music/song1.mp3');

  public turn: number = 0;
  public currentPlayerName: string = '';
  public sysdate: string = '';
  public page: any = {};
  public askMode: boolean = false;
  public gameError: string = '';
  public numPlayers: number = 0;
  public currentGameStatus: string = 'Waiting';
  public currentGamePhase: string = 'Asking';
  public currentNumPlayers: number = 0;
  public gameStartedFlg: boolean = false;
  public timerSeconds: number = 60;
  public myTurnToAskFlg: boolean = false;
  public myTurnToAskFlg2: boolean = false;
  public winner: any = { user_id: 53, profilePic: 1 };
  public emojis = [
    'assets/images/emojis/ban.png',
    'assets/images/emojis/shocked.png',
    'assets/images/emojis/laugh.png',
    'assets/images/emojis/hmm.png',
    'assets/images/emojis/thumbsUp.png',
    'assets/images/emojis/emoji8.png',
    'assets/images/emojis/emoji3.png',
    'assets/images/emojis/emoji2.png',
    'assets/images/emojis/emoji15.png',
    'assets/images/emojis/emoji17.png',
    'assets/images/emojis/emoji4.png',
    'assets/images/emojis/scared.png',
  ];
  public questions: any = [
    'Never have I ever faked sick from work.',
    'Never have I ever gone skinny dipping.',
    'Never have I ever cheated on a partner.',
    'Never have I ever cheated on a test.',
    'Never have I ever marched in a protest.',
    'Never have I ever overdrafted my bank account.',
    'Never have I ever eaten someone else\'s lunch from the office fridge.',
    'Never have I ever played strip poker.',
    'Never have I ever smoked a joint.',
    'Never have I ever peed in a pool.',
    'Never have I ever tried hard drugs.',
    'Never have I ever fallen asleep in public.',
    'Never have I ever fallen asleep at work.',
    'Never have I ever lied on my resume.',
    'Never have I ever drunk-dialed my ex.',
    'Never have I ever dropped acid.',
    'Never have I ever had a one-night stand.',
    'Never have I ever read a partner\'s text messages.',
    'Never have I ever read a partner\'s emails.',
    'Never have I ever been hospitalized over night',
    'Never have I ever played a musical instrument.',
    'Never have I ever gone snowboarding.',
    'Never have I ever gone skiing.',
    'Never have I ever traveled to a foreign country.',
    'Never have I ever learned a foreign language.',
    'Never have I ever bought a stranger a drink.',
    'Never have I ever lied about my income.',
    'Never have I ever had sex on camera.',
    'Never have I ever been nude in public.',
    'Never have I ever dated or hooked up with someone 10 years older.',
    'Never have I ever dated or hooked up with someone 10 years younger.',
    'Never have I ever been a maid of honor or best man at a wedding.',
    'Never have I ever won more than $100 gambling.',
    'Never have I ever lost more than $100 gambling.',
    'Never have I ever gone vegan.',
    'Never have I ever used a fake ID.',
    'Never have I ever lied about my age.',
    'Never have I ever chipped a tooth.',
    'Never have I ever fasted from food for a day.',
    'Never have I ever been awake for 24 straight hours.',
    'Never have I ever had sex in a car.',
    'Never have I ever had a friend with benefits.',
    'Never have I ever sent nudes.',
    'Never have I ever gotten a bedroom-related injury.',
    'Never have I ever tried moonshine.',
    'Never have I ever been to a funeral.',
    'Never have I ever gotten stitches.',
    'Never have I ever paid for adult content.',
    'Never have I ever been scuba diving.',
    'Never have I ever hooked up with someone of the same sex.',
    'Never have I ever gone commando.',
    'Never have I ever shaved all my public hair.',
    'Never have I ever taken nude pictures of another person.',
    'Never have I ever had someone take nude pictures of me.',
    'Never have I ever tried "69".',
    'Never have I ever had sex in front of others.',
    'Never have I ever gotten a piecing in my privates.',
    'Never have I ever played strip poker.',
    'Never have I ever skinny dipped with at least 3 people.',
    'Never have I ever made a sex video.',
    'Never have I ever been to a strip club.',
    'Never have I ever paid for an erotic massage.',
    'Never have I ever gotten naked on a web cam.',
    'Never have I ever given oral sex.',
    'Never have I ever received oral sex.',
  ];
  public randomQuestionStr: string = '';

  constructor(private router: Router, databaseService: DatabaseService, private wsService: WebsocketService) {
    super(databaseService);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.audio.loop = true;
    this.audio.volume = 0.2;
    //this.audio.play();

    setTimeout(() => {
      this.registerUser();
    }, 150);

    this.startTimer();
    //setInterval(this.startTimer, 1000);
  }

  skipPlayer() {
    this.getDataFromServer('skipPlayer', 'iNever.php', { turn: this.turn });
  }

  emitEmoji(num: number) {
    console.log(num);
    this.getDataFromServer('emitEmoji', 'iNever.php', { num: num });
  }

  randomQuestion() {
    var num = Math.floor(Math.random() * this.questions.length);
    this.randomQuestionStr = this.questions[num];
    console.log(num, this.randomQuestionStr);
  }

  startTimer() {
    if (this.timerSeconds > 0)
      this.timerSeconds--;
    setTimeout(() => {
      this.startTimer();
    }, 1000);
  }

  playSound(num: number) {
    var sounds = [
      'assets/sounds/doorBell.mp3', //0
      'assets/sounds/Blop.mp3',
      'assets/sounds/doorClose.mp3',
      'assets/sounds/counting.mp3', //3
      'assets/sounds/applause.mp3',
      'assets/sounds/doorClose.mp3',  //5
      'assets/sounds/ahh.mp3',  //6
      'assets/sounds/typing.mp3',  //7
      'assets/sounds/boo.mp3',  //8
    ];
    var audio = new Audio(sounds[num]);
    audio.loop = false;
    audio.play();
  }

  textValueSubmitted(message: string) {
    var substr = message.substring(0, 17);
    this.gameError = '';
    if (substr != 'Never have I ever') {
      //      this.gameError = 'Your question must start with Never have I ever';
      //      return;
    }
    if (message.length <= 20) {
      this.gameError = 'Please type a real question.';
      return;
    }
    this.getDataFromServer('askQuestion', 'iNever.php', { message: message });
  }

  registerAnswer(num: number) {
    this.page.myChoice = num;
    this.getDataFromServer('registerAnswer', 'iNever.php', { num: num });
  }

  chatMessageSubmitted(message: string) {
    //   $('#chat').val("fgg");
    this.playSound(1);
    this.getDataFromServer('chatMessageSubmitted', 'iNever.php', { message: message });
  }

  exitGame() {
    this.playSound(2);
    this.getDataFromServer('exitGame', 'iNever.php', {});
    this.router.navigate(['']);
  }

  registerUser() {
    var e = document.getElementById('exitGameButton');
    if (e) {
      this.getDataFromServer('registerUser', 'iNever.php', { sysdate: this.sysdate });
      setTimeout(() => {
        this.registerUser();
      }, 10000);
    } else
      this.getDataFromServer('exitGame', 'iNever.php', {});

  }

  startGame() {
    console.log('here!! startGame');
    this.getDataFromServer('startGame', 'iNever.php', {});
  }

  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);
    if (responseJson.action != "logUser") {
      this.winner.user_id = responseJson.winner;
      this.winner.profilePic = responseJson.winnerProfilePic;
      this.winner.winnerName = responseJson.winnerName;
      this.MIN_PLAYER = responseJson.MIN_PLAYER;
      this.page = responseJson;
      this.turn = responseJson.turn;

      var lastMessageByUser: any = {};
      this.responseJson.messages.forEach((element: any) => {
        if (!lastMessageByUser[element.user_id])
          lastMessageByUser[element.user_id] = element.message;
      });

      this.timerSeconds = 60 - responseJson.secondsSince;
      if (this.timerSeconds < 0)
        this.timerSeconds = 0;

      if (responseJson.gameStatus != 'Playing')
        this.turn = 0;

      this.myTurnToAskFlg = (this.turn == this.user.user_id);
      if (this.myTurnToAskFlg && !this.myTurnToAskFlg2) {
        this.myTurnToAskFlg2 = true;
        this.randomQuestionStr = 'Never have I ever ';
      }
      if (!this.myTurnToAskFlg)
        this.myTurnToAskFlg2 = false;
      if (this.myTurnToAskFlg && this.randomQuestionStr == '')
        this.randomQuestionStr = 'Never have I ever ';
      //      else
      //      this.randomQuestionStr = '';
      this.players = [];
      this.realPlayers = [];
      this.numPlayers = 0;

      responseJson.players.forEach((element: any) => {
        element.src = betraImageFromId(element.user_id, element.profilePic);
        element.lastMessageByUser = lastMessageByUser[element.user_id];
        if (this.turn == element.user_id)
          this.currentPlayerName = element.firstName;

        if (element.activeFlg = 'Y') {
          this.numPlayers++;
          this.players.push(element);
          this.realPlayers.push(element);
        }
        else
          this.spectators.push(element);

      });

      //-----------------
      if (this.currentNumPlayers != this.players.length) {
        if (this.players.length < this.currentNumPlayers) {
          this.playSound(2);
          console.log('player left');
        }
        if (this.players.length > this.currentNumPlayers) {
          this.playSound(0);
          console.log('player joined');
        }
        this.currentNumPlayers = this.players.length;
      }
      //-----------------
      if (responseJson.gameStatus == 'Playing')
        this.gameStartedFlg = true;

      if (this.currentGameStatus != responseJson.gameStatus) {
        if (responseJson.gameStatus == 'Playing') {
          this.playSound(3);
          console.log('game started');
        }
        if (responseJson.gameStatus == 'Waiting') {
          this.playSound(8);
          console.log('game ended');
        }
        if (responseJson.gameStatus == 'Completed') {
          this.playSound(4);
          console.log('game ended');
        }
        this.currentGameStatus = responseJson.gameStatus;
      } else if (this.currentGamePhase != responseJson.phase) {
        if (responseJson.phase == 'Asking') {
          this.playSound(6);
          console.log('everyone voted');
        }
        if (responseJson.phase == 'Answering') {
          this.playSound(7);
          console.log('question asked');
        }
        this.currentGamePhase = responseJson.phase;
      }

      this.players.push(this.defaultPlayer);
      this.players.push(this.defaultPlayer);
      this.players.push(this.defaultPlayer);
      this.players.push(this.defaultPlayer);
      this.players.push(this.defaultPlayer);
      this.players.push(this.defaultPlayer);

    }
  }

}
