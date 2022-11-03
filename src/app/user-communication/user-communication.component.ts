import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-communication',
  templateUrl: './user-communication.component.html',
  styleUrls: ['./user-communication.component.scss']
})
export class UserCommunicationComponent implements OnInit {
  public questions = [
    'What is your favorite animal?',
    'How is the dating world?',
    'What is the last movie you saw?',
    'What is your favorite sports team?',
    'What is your favorite restaurant?',
    'What do you like to do for fun?',
  ];
  public messageSentFlg: boolean = false;
  public disabledButtonFlg: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
