import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  public people:any = [
    {name: 'Nebuchadnezzar', born: 642, death: 562, color: 'orange', top: '70px', reign: '344px', startReign: 605},
    {name: 'Cyrus', born: 600, death: 530, color: 'orange', top: '100px', reign: '232px', startReign: 559},
    {name: 'Cambyses II', born: 565, death: 522, color: 'red', top: '130px', reign: '64px', startReign: 530},
    {name: 'Darius', born: 550, death: 486, color: 'orange', top: '160px', reign: '288px', startReign: 522},
    {name: 'Xerxes', born: 518, death: 465, color: 'orange', top: '190px', reign: '168px', startReign: 486},
    {name: 'Artaxerxes', born: 500, death: 424, color: 'orange', top: '220px', reign: '328px', startReign: 465},
    {name: 'King Jehoiakim of Judah', born: 650, death: 598, color: 'yellow', top: '300px'},
    {name: 'Jeremiah', born: 650, death: 570, color: '#cfc', top: '330px'},
    {name: 'Ezekiel', born: 622, death: 570, color: '#cfc', top: '360px'},
    {name: 'Daniel', born: 590, death: 498, color: '#cfc', top: '390px'},
    {name: 'Ezra', born: 520, death: 440, color: '#cfc', top: '330px'},
    {name: 'Nehemiah', born: 500, death: 420, color: '#cfc', top: '360px'},
    {name: 'Haggai', born: 570, death: 500, color: '#cfc', top: '450px'},
    {name: 'Zechariah', born: 550, death: 470, color: '#cfc', top: '420px'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

  ngStylePerson(person: any) {
    // calculate left: (650-year) * 8
    var age = person.born - person.death;
    var width = age * 2000 / 250;
    var birth = 650-person.born;
    var left = birth * 2000 / 250;
    return {'background-color' : person.color, top: person.top, width: width+'px', left: left+'px'};
  }
}
