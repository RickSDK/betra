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
 
  constructor() { }

  ngOnInit(): void {
  }

}
