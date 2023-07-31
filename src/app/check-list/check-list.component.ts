import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.scss']
})
export class CheckListComponent extends BaseComponent implements OnInit {
  public page: any = {};
  public levelItems: any = [];
  public successMessage: boolean = false;
  public level: number = 0;

  constructor(databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getDataFromServer('checkLevels', 'levelUp.php', {});
  }

  levelUp() {
    var passGoals = true;
    this.levelItems.forEach((element: any) => {
      if (element.amount < element.goal)
        passGoals = false;
    });
    if (!passGoals) {
      this.errorMessage = 'You need to pass all your goals first!';
      return;
    }
    var audio = new Audio('assets/sounds/coins.mp3');
    audio.loop = false;
    audio.play();
    this.levelItems = [];
    this.getDataFromServer('levelUp', 'levelUp.php', {});
  }

  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);
    if (responseJson.action == "levelUp") {
      this.successMessage = true;
      this.syncUserWithLocalStorage(responseJson);
    }
    if (responseJson.action == "checkLevels" || responseJson.action == "levelUp") {
      this.page = responseJson;
      if (!this.page.level)
        this.page.level = 1;

      this.level = parseInt(this.page.level);
 
      if (this.page.level == 1) {
        this.levelItems.push({ name: 'Consecutive days on app', amount: responseJson.consecutiveDays, goal: 3 });
        this.levelItems.push({ name: 'Messages sent to users', amount: responseJson.messageCount, goal: 20 });
        this.levelItems.push({ name: 'Gifts given to users', amount: responseJson.giftsGiven, goal: 2 });
      }
      if (this.page.level == 2) {
        this.levelItems.push({ name: 'Consecutive days on app', amount: responseJson.consecutiveDays, goal: 6 });
        this.levelItems.push({ name: 'Messages sent to users', amount: responseJson.messageCount, goal: 50 });
        this.levelItems.push({ name: 'Gifts given to users', amount: responseJson.giftsGiven, goal: 4 });
        this.levelItems.push({ name: 'Pictures requested from Photo Club', amount: responseJson.picsRequested, goal: 4 });
      }
      if (this.page.level == 3) {
        this.levelItems.push({ name: 'Consecutive days on app', amount: responseJson.consecutiveDays, goal: 8 });
        this.levelItems.push({ name: 'Messages sent to users', amount: responseJson.messageCount, goal: 100 });
        this.levelItems.push({ name: 'Gifts given to users', amount: responseJson.giftsGiven, goal: 6 });
        this.levelItems.push({ name: 'Pictures requested from Photo Club', amount: responseJson.picsRequested, goal: 12 });
        this.levelItems.push({ name: 'Games Played at Game Room', amount: responseJson.gamesINever, goal: 4 });
      }
      if (this.page.level == 4) {
        this.levelItems.push({ name: 'Consecutive days on app', amount: responseJson.consecutiveDays, goal: 10 });
        this.levelItems.push({ name: 'Messages sent to users', amount: responseJson.messageCount, goal: 200 });
        this.levelItems.push({ name: 'Gifts given to users', amount: responseJson.giftsGiven, goal: 12 });
        this.levelItems.push({ name: 'Pictures requested from Photo Club', amount: responseJson.picsRequested, goal: 25 });
        this.levelItems.push({ name: 'Games Played at Game Room', amount: responseJson.gamesINever, goal: 8 });
      }

    }
  }
}
