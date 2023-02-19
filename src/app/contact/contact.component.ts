import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

declare var $: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends BaseComponent implements OnInit {
  public showFormFlg: boolean = true;
  public staff: any = [
    { name: 'Rick Medved', email: 'rick@betradating.com', title: 'Founder', src: 'assets/images/team/rick.jpg', desc: '' },
    { name: 'Shawn Duncan', email: 'shawn@betradating.com', title: 'Vice President', src: 'assets/images/team/shawn.jpg', desc: '' },
    { name: 'James Poli', email: 'james@betradating.com', title: 'Technical Director', src: 'assets/images/team/james.jpg', desc: '' },
    { name: 'Shubha Maihar', email: 'shubha@betradating.com', title: 'Marketing Director', src: 'assets/images/team/shubha.jpg', desc: '' },
    { name: 'Anil Shah', email: 'anil@betradating.com', title: 'Dev Manager', src: 'assets/images/team/anil.jpg', desc: '' },
    { name: 'Sandeep K', email: 'sandeep@betradating.com', title: 'Dev Manager', src: 'assets/images/team/sandeep.png', desc: 'My name is Sandeep and located in India. I am working in Betra as Dev Lead . I am very passionate about  work. ( You can edit as per your best)' },
    { name: 'Karen Bahri', email: 'karen@betradating.com', title: 'Social Media Manager', src: 'assets/images/team/karen2.jpg', desc: 'Hi! I\'m a New York based Marketing Manager by day, by night I\'m your Betra Blogist :) My key hobbies include travel, beauty & fashion. I am in charge of all things social for Betra, including Betra Blogs - go check them out and leave a comment! ' },
    { name: 'Khalif Fjorden', email: 'khalif@betradating.com', title: 'Marketing Manager', src: 'assets/images/team/khalif.jpg', desc: '' },
  ];
  public qualityTeam: any = [
    { name: 'Brittany LoCurto', email: 'brittany@betradating.com', title: '', src: 'assets/images/team/brittany.jpg', desc: '' },
    { name: 'Dana Dela Fuente', email: 'dana@betradating.com', title: '', src: 'assets/images/team/dana.jpg', desc: '' },
    { name: 'Randolfo Montalvo', email: 'randy@betradating.com', title: '', src: 'assets/images/team/randy.jpg', desc: 'Randolfo montalvo is a team member at Betra to revolutionize the way others see dating apps. He works in the outreach and creative department and has a passion for connecting with the local community of New York city to gather opinions and constantly look for ways to improve the site.' },
    { name: 'Baltazar', email: 'baltazar@betradating.com', title: 'Head of Sales', src: 'assets/images/team/baltazar.jpg', desc: '' },
    { name: 'Disha Mehrotra', email: 'disha@betradating.com', title: '', src: 'assets/images/team/disha.jpg', desc: '' },
    { name: 'Tammy Otsubo', email: 'tammy@betradating.com', title: '', src: 'assets/images/team/tammy.jpg', desc: '' },
  ];

  constructor() { super(); }

  //  ngOnInit(): void {
  //}

  submitQuery() {
    var email = $('#email').val();
    var message = $('#message').val();
    if (!email || !message) {
      this.errorMessage = 'Fill out form';
      return;
    }
    this.showFormFlg = false;
    this.getDataFromServer('submitQuery', 'appApiCode.php', { email: email, message: message });
  }
}
