import { AbsoluteSourceSpan } from '@angular/compiler';
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
  @Input('position') position: number = 0;

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

  public lefts: any = ['100px', 'auto', 'auto', 'auto', '100px', '35px'];
  public tops: any = ['50px', '50px', '160px', '280px', '280px', '160px'];
  public rights: any = ['auto', '180px', '125px', '175px', 'auto', 'auto'];

  constructor() { }

  ngOnInit(): void {
  }

  ngStyleChair() {
    return { position: 'absolute', top: this.tops[this.position], left: this.lefts[this.position], right: this.rights[this.position] };
  }

}
