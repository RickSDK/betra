import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-match-dating-pool',
  templateUrl: './match-dating-pool.component.html',
  styleUrls: ['./match-dating-pool.component.scss']
})
export class MatchDatingPoolComponent implements OnInit {
  @Input('datingPool') datingPool: string = '';
  @Input('firstName') firstName: string = '';
  @Input('uid') uid: string = '';

  public datingPoolList: any = [];

  constructor() { }

  ngOnInit(): void {
    var dpList = this.datingPool.split('+');
    var datingPool: any = [];
    dpList.forEach((element: string) => {
      var items = element.split(':');
      if (items.length >= 3) {
        var name = items[1];
        var user_id = parseInt(items[0]);
        var src = betraImageFromId(user_id, parseInt(items[2]));
        var heardFlg = (items.length >= 4 && items[3] == this.uid);
        var level = (items.length >= 5) ? items[4] : '0';
        datingPool.push({ name: name, src: src, user_id: user_id, heardFlg: heardFlg, level: level });
      }

    });
    this.datingPoolList = datingPool;
  }

}
function betraImageFromId(user_id: number, profilePic: number) {
  if (user_id > 0 && profilePic > 0)
    return 'https://www.appdigity.com/betraPhp/profileImages/profile' + user_id.toString() + '_' + profilePic.toString() + '.jpg';
  else
    return 'assets/images/theRock.png';
}