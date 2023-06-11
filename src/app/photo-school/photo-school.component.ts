import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';
import { BetraPopupComponent } from '../popups/betra-popup/betra-popup.component';
import { PicturePopupComponent } from '../popups/picture-popup/picture-popup.component';
import { Photographer } from '../classes/photographer';
import { ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-photo-school',
  templateUrl: './photo-school.component.html',
  styleUrls: ['./photo-school.component.scss']
})
export class PhotoSchoolComponent extends BaseComponent implements OnInit {
  public createClassNum: number = 0;
  public page: any = {};

  constructor(private route: ActivatedRoute, databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getDataFromServer('getClasses', 'betraClasses.php', {});
  }

  createClass() {
    var classType = $('#classType').val();
    var cost = $('#cost').val();
    var intro = $('#intro').val();
    var description = $('#description').val();
    var tips = $('#tips').val();
    var params = {
      name: classType,
      cost: cost,
      intro: intro,
      description: description,
      tips: tips
    }
    console.log(params);
    if(intro == "") {
      this.errorMessage = 'Describe your class';
      return;
    }
    if(description == "") {
      this.errorMessage = 'Add details for your class';
      return;
    }
    if(tips == "") {
      this.errorMessage = 'Include some tips for your class';
      return;
    }

    this.getDataFromServer('createClass', 'betraClasses.php', params);
    this.createClassNum = 0;
  }

  deleteClass(betraClass: any) {
    this.getDataFromServer('deleteClass', 'betraClasses.php', {classId: betraClass.row_id});
  }

  joinClass(betraClass: any) {
    if(betraClass.cost > parseInt(this.user.points)) {
      this.errorMessage = 'Too Expensive!';
      return;

    }
    this.getDataFromServer('joinClass', 'betraClasses.php', {classId: betraClass.row_id});
  }

  dropClass(betraClass: any) {
    this.getDataFromServer('dropClass', 'betraClasses.php', {classId: betraClass.row_id});
  }

  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);

    if (responseJson.action != 'logUser') {
      this.page = responseJson;
      this.page.classes.forEach((element: any) => {
        var dt = this.getDateObjFromJSDate(element.startDt);
         element.startDay = dt.localDate;
      });
    }
  }

}
