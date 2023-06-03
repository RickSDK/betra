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
  public realPlayers:any = [];
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
  public winner:any = {user_id: 1, profilePic: 16};
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
      this.gameError = 'Your question must start with Never have I ever';
      return;
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
    this.getDataFromServer('startGame', 'iNever.php', {});
  }

  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);
    if (responseJson.action != "logUser") {
      this.winner.user_id = responseJson.winner;
      this.winner.profilePic = responseJson.winnerProfilePic;
      this.MIN_PLAYER = responseJson.MIN_PLAYER;
      this.page = responseJson;
      this.turn = responseJson.turn;

      this.timerSeconds = 60 - responseJson.secondsSince;
      if (this.timerSeconds < 0)
        this.timerSeconds = 0;

      if (responseJson.gameStatus != 'Playing')
        this.turn = 0;

      this.myTurnToAskFlg = (this.turn == this.user.user_id);
      this.players = [];
      this.realPlayers = [];
      this.numPlayers = 0;

      responseJson.players.forEach((element: any) => {
        element.src = betraImageFromId(element.user_id, element.profilePic);
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
