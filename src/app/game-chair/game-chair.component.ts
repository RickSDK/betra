import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game-chair',
  templateUrl: './game-chair.component.html',
  styleUrls: ['./game-chair.component.scss']
})
export class GameChairComponent implements OnInit {
  @Input('player') player: any = {};
  @Input('width') width: number = 80;
  @Input('turn') turn: number = 0;
  @Input('chair') chair: string = '';
 
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

  constructor() { }

  ngOnInit(): void {
  }

}
