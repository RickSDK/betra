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
  public players: any = [];
  public spectators: any = [];
  public defaultPlayer = { user_id: 0, name: 'empty', src: 'assets/images/games/iNever.jpeg' };

  public turn: number = 0;
  public currentPlayerName: string = '';
  public page: any = {};
  public askMode: boolean = false;
  public gameError: string = '';
  public numPlayers: number = 0;
  public minPlayers: number = 4;

  constructor(private router: Router, databaseService: DatabaseService, private wsService: WebsocketService) {
    super(databaseService);
    this.wsService.messages.subscribe((msg: any) => {
      console.log('Response: ', msg)
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();

    setTimeout(() => {
      this.registerUser();

    }, 150);
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
    this.getDataFromServer('chatMessageSubmitted', 'iNever.php', { message: message });
  }

  exitGame() {
    this.getDataFromServer('exitGame', 'iNever.php', {});
    this.router.navigate(['']);
  }

  registerUser() {
    var e = document.getElementById('exitGameButton');
    console.log('e', e);
    if (e) {
      this.getDataFromServer('registerUser', 'iNever.php', {});
      setTimeout(() => {
        this.registerUser();
      }, 10000);
    } else
      this.exitGame();
  }

  startGame() {
    this.getDataFromServer('startGame', 'iNever.php', {});
  }

  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);
    if (responseJson.action != "logUser") {
      this.page = responseJson;
      this.turn = responseJson.turn;
      this.players = [];
      this.numPlayers = 0;

      responseJson.players.forEach((element: any) => {
        element.src = betraImageFromId(element.user_id, element.profilePic);
        if (this.turn == element.user_id)
          this.currentPlayerName = element.firstName;

        if (element.activeFlg = 'Y') {
          this.numPlayers++;
          this.players.push(element);
        }
        else
          this.spectators.push(element);

      });
      this.players.push(this.defaultPlayer);
      this.players.push(this.defaultPlayer);
      this.players.push(this.defaultPlayer);
      this.players.push(this.defaultPlayer);
      this.players.push(this.defaultPlayer);
      this.players.push(this.defaultPlayer);

    }
  }

}
