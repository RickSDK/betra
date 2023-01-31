import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-thumbnail',
  templateUrl: './profile-thumbnail.component.html',
  styleUrls: ['./profile-thumbnail.component.scss']
})
export class ProfileThumbnailComponent implements OnInit {
  @Input('person') person: any = null;

  constructor() { }

  ngOnInit(): void {
  }

}
