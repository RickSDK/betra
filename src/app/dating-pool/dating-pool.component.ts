import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dating-pool',
  templateUrl: './dating-pool.component.html',
  styleUrls: ['./dating-pool.component.scss']
})
export class DatingPoolComponent implements OnInit {
  @Input('user') user: any = null;
  @Input('largeFlg') largeFlg: boolean = false;
  @Output() messageEvent = new EventEmitter<string>();

  public datingPoolLimit: number = 8;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.datingPoolLimit = (this.user.memberFlg) ? 12 : 8;
  }

  ngOnChanges(changes: any) {
    console.log('dating pool', this.user.datingPool);
    this.ngOnInit();
  }

  userClicked(person: any) {
    if(person.match && person.alerts>0) {
      this.router.navigate(['/user-detail'], { queryParams: { uid: person.user_id } });
    } else
      this.messageEvent.emit(person.user_id.toString());
  }

}
