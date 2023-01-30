import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Blog } from '../classes/blog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-landing-content',
  templateUrl: './landing-content.component.html',
  styleUrls: ['./landing-content.component.scss']
})
export class LandingContentComponent extends BaseComponent implements OnInit {
  public adsbygoogle: any;
  public blogList: any = [];
  public blogs: any = [
    {commentCount: 2, created: '2023-01-20 00:15:20', firstName: 'Karen', likes: 1, pic1: 'Y', profilePic: '1', row_id: '1', 
    section1: 'With the ongoing pandemic and social distancing measures still in place, dating in 2023 may look a bit different than it did in the past. However, just because things are different doesnt mean that good manners and etiquette should be thrown out the window. In fact, now more than ever, its important to be mindful of how you interact with potential partners.', 
    title: 'Dating Etiquette for 2023 navigating the new normal', user_id: '109'},
    {commentCount: 2, created: '2023-01-22 00:15:20', firstName: 'Karen', likes: 3, pic1: 'Y', profilePic: '1', row_id: '3', 
    section1: 'When it comes to dating, this generation of college students is writing its own rules, and often deleting them as quickly as they are written. With so much influence by social media and ever-changing attitudes, todays dating world can be a perplexed place. BUs Charles River Campus is in some ways more confusing than most! As is revealed in a BU Today survey answered by more than 4,000 students, its not always clear that a date is a date', 
    title: 'Dating reality at BU', user_id: '109'},
    {commentCount: 2, created: '2023-01-23 00:15:20', firstName: 'Karen', likes: 2, pic1: 'Y', profilePic: '1', row_id: '4', 
    section1: 'When it comes to dating, this generation of college students is writing its own rules, and often deleting them as quickly as they are written. With so much influence by social media and ever-changing attitudes, todays dating world can be a perplexed place. BUs Charles River Campus is in some ways more confusing than most! As is revealed in a BU Today survey answered by more than 4,000 ', 
    title: 'Modern romance is dead, and Tinder killed it', user_id: '109'},
    {commentCount: 0, created: '2023-01-24 00:15:20', firstName: 'Karen', likes: 1, pic1: 'Y', profilePic: '1', row_id: '5', 
    section1: 'Speed dating is a popular event at Boston University, where students have the opportunity to meet and interact with a large number of their peers in a short amount of time. What exactly is speed dating? Speed dating allows for quick introductions and conversations, making it a fun and efficient way for students to connect with others.Many people have mixed opinions on speed dating. ', 
    title: 'Students thoughts on Speed dating at BU', user_id: '109'},
  ];
  public topDatingSites:any = [
    {name: 'Tinder', amount: '530 Million', url: 'https://tinder.com/'},
    {name: 'Badoo', amount: '318 Million', url: 'https://play.google.com/store/apps/details?id=com.badoo.mobile&gl=US'},
    {name: 'Plenty of Fish', amount: '150 Million', url: 'https://www.pof.com/'},
    {name: 'Bumble', amount: '100 Million', url: 'https://bumble.com/'},
    {name: 'Happn', amount: '100 Million', url: 'https://www.happn.com/en/'},
    {name: 'Adult Friend Finder', amount: '99 Million', url: 'https://adultfriendfinder.com/'},
    {name: 'MenNation', amount: '99 Million', url: 'https://mennation.com/'},
    {name: 'Match', amount: '96 Million', url: 'https://match.com/'},
    {name: 'Ashley Madison', amount: '70 Million', url: 'https://www.ashleymadison.com'},
    {name: 'Zoosk', amount: '40 Million', url: 'https://www.zoosk.com/'},
    {name: 'eharmony', amount: '37 Million', url: 'https://www.eharmony.com/'},
    {name: 'OkCupid', amount: '30 Million', url: 'https://www.okcupid.com/'},
    {name: 'Grindr', amount: '27 Million', url: 'https://www.grindr.com/'},
    {name: 'Coffee Meets Bagel', amount: '21 Million', url: 'https://coffeemeetsbagel.com/'},
    {name: 'Christian Mingle', amount: '16 Million', url: 'https://www.christianmingle.com/'},
    {name: 'BeNaughty', amount: '13.3 Million', url: 'https://www.benaughty.com/'},
    {name: 'EliteSingles', amount: '13 Million', url: 'https://www.elitesingles.com/'},
    {name: 'HER', amount: '10 Million', url: 'https://apps.apple.com/us/app/her-lesbian-queer-bi-dating/id573328837'},
    {name: 'OurTime', amount: '8.9 Million', url: 'https://www.ourtime.com/'},
    {name: 'Hinge', amount: '6 Million', url: 'https://hinge.co/'},
    {name: 'BlackPeopleMeet', amount: '5.7 Million', url: 'https://www.blackpeoplemeet.com/'},
    {name: 'SilverSingles', amount: '800,000', url: 'https://www.silversingles.com/'},
    {name: 'LesbianPersonals', amount: '500,000', url: 'https://www.lesbianpersonals.com/'},
    {name: 'FriendFinderX', amount: '40,000', url: 'https://www.friendfinder-x.com'},
  ];

  public topRevenueSites:any = [
    {name: 'Match', amount: '$2.4 Billion', url: 'https://match.com/'},
    {name: 'Tinder', amount: '$1.4 Billion', url: 'https://tinder.com/'},
    {name: 'eharmony', amount: '$200 Million', url: 'https://www.eharmony.com/'},
    {name: 'Tantan', amount: '$200 Million', url: 'https://www.eharmony.com/'},
    {name: 'Bumble', amount: '$337 Million', url: 'https://bumble.com/'},
    {name: 'Plenty of Fish', amount: '$80 Million', url: 'https://www.pof.com/'},
    {name: 'Grindr', amount: '$78 Million', url: 'https://www.grindr.com/'},
    {name: 'OkCupid', amount: '$50 Million', url: 'https://www.okcupid.com/'},
    {name: 'Hinge', amount: '$16 Million', url: 'https://hinge.co/'},
    {name: 'Happn', amount: '$15 Million', url: 'https://www.happn.com/en/'},
  ];

  public topTraitsOfWomen:any = [
    'Sexy femininity',
    'A sense of humor',
    'Confidence',
    'Adventurous',
    'Beautiful Smile',
    'Caring',
    'Playful',
  ];
  //https://hackspirit.com/what-guys-like-in-a-woman/

  public topTraitsOfMen:any = [
    'Assertive',
    'Stable',
    'Treat women as equals',
    'Good Conversationalist',
    'Have a Passion',
    'Compassionate',
    'Open to Improving',
  ];
//https://www.powerofpositivity.com/what-women-look-for-in-men/

public thingsToAvoid:any = [
  'Don’t be late.',
  'Don’t talk about past relationships.',
  'Don’t get drunk.',
  'Don’t focus on yourself too much.',
  'Do: Dress for the occasaion.',
  'Do: Offer to pay.',
  'Do: Smile and relax.',
  'Do: Have fun.',
]

  constructor(private router: Router) { super(); }

  override ngOnInit(): void {
    this.userId = localStorage['user_id'];

    this.blogList = [];
    this.blogs.forEach((element: any) => {
      this.blogList.push(new Blog(element));
    });
    console.log(this.blogList);
/*
    setTimeout(() => {
      (this.adsbygoogle = (window as any).adsbygoogle || []).push({});
    }, 1000);
*/
    if (this.userId > 0)
      this.router.navigate(['home']);
    else {
//      this.getDataFromServer('getBlogs', 'blog.php', []);
    }
  }
  override postSuccessApi(file: string, responseJson: any) {
    this.blogList = [];
    if (responseJson.action == "getBlogs") {
      console.log(responseJson);
      responseJson.blogList.forEach((element: any) => {
        this.blogList.push(new Blog(element));
      });
    }
  }

}
