import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ScrollItem } from '../classes/scroll-item';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent extends BaseComponent implements OnInit {
  public scrollItems: any = [];
  public banItemList: any = [];
  public displayItems: any = [];
  public currentIndex: number = 0;
  public showLoadMoreButton: boolean = false;

  constructor() { super(); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getDataFromServer('getScrollData', 'scroll.php', {});

    document.addEventListener('scroll', () => {
      this.checkIsVisible();
    })
    window.scrollTo(0, 0);
  }

  override postSuccessApi(file: string, responseJson: any) {
    this.responseJson = responseJson;


    if (responseJson.action == "getScrollData") {
      //this.blog1 = new Blog(responseJson.blogList[0]);
      //this.blog2 = new Blog(responseJson.blogList[1]);
      this.scrollItems = [];
      this.responseJson.userItems.forEach((element: any) => {
        this.scrollItems.push(element);
        if (this.responseJson.blogItems.length > 0)
          this.scrollItems.push(this.responseJson.blogItems.shift());
        if (this.responseJson.matchItems.length > 0)
          this.scrollItems.push(this.responseJson.matchItems.shift());
        if (this.responseJson.roseItems.length > 0)
          this.scrollItems.push(this.responseJson.roseItems.shift());
        if (this.responseJson.dateItems.length > 0)
          this.scrollItems.push(this.responseJson.dateItems.shift());
        if (this.responseJson.reviewItems.length > 0)
          this.scrollItems.push(this.responseJson.reviewItems.shift());
        if (this.responseJson.journalItems.length > 0)
          this.scrollItems.push(this.responseJson.journalItems.shift());

      });
      this.scrollItems.sort((a: any, b: any) => {
        return (a.created < b.created) ? 1 : (a.created > b.created) ? -1 : 0;
      });
      //console.log(this.scrollItems);

      for (var i = 0; i < 12; i++)
        this.addScrollItem();
    }

  }
  getBanItemList() {
    if (localStorage['banItemList'])
      return JSON.parse(localStorage['banItemList']);
    else
      return [];
  }
  setBanItemList(banItemList: any) {
    localStorage['banItemList'] = JSON.stringify(banItemList);
  }
  getBanItemListHash() {
    var banItemList = this.getBanItemList();
    var banItemListHash: any = {};
    banItemList.forEach((element: any) => {
      banItemListHash[element] = true;
    });
    console.log('banItemListHash', banItemListHash);
    return banItemListHash;
  }
  clearItem(item: any) {
    this.banItemList = this.getBanItemList();
    this.banItemList.push(item.name);
    this.setBanItemList(this.banItemList);
    var displayItems: any = [];
    this.displayItems.forEach((element: any) => {
      if (element.name != item.name)
        displayItems.push(element);
    });
    this.displayItems = displayItems;
    this.addScrollItem();
  }
  addScrollItem() {
    if (this.scrollItems.length <= this.currentIndex)
      return false;
    var banItemListHash = this.getBanItemListHash();

    var scrollItem = new ScrollItem(this.scrollItems[this.currentIndex], this.currentIndex);
    this.currentIndex++;
    if (banItemListHash[scrollItem.name]) {
      this.addScrollItem();
      console.log('banned item!', scrollItem.name);
      return false;
    } else {
      this.displayItems.push(scrollItem);
      return true;
    }
  }
  loadMoreScrollCards() {
    for (var i = 0; i < 12; i++)
      this.showLoadMoreButton = this.addScrollItem();
  }
  checkIsVisible() {
    if (!this.displayItems)
      return;
    if (this.displayItems.length == this.scrollItems.length) {
      console.log('done.');
      return;
    }
    var lastId = this.displayItems[this.displayItems.length - 1].id;
    const element = document.getElementById(lastId);
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.bottom <= window.innerHeight) {
        console.log("adding 3 items");
        this.addScrollItem();
        this.addScrollItem();
        this.addScrollItem();
      }

    }

  }

}