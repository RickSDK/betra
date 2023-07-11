import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild(BetraPopupComponent, { static: true })
  betraPopupComponent!: BetraPopupComponent;

  public createClassNum: number = 0;
  public page: any = {};
  public selectedClass: any = null;
  public classType: string = '';
  public notEnoughCoinsFlg: boolean = false;
  public openClasses: any = [];
  public inProgressClasses: any = [];
  public completedClasses: any = [];
  public showMoreInfoFlg: boolean = false;

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
    var classGenre = $('#classGenre').val();
    var instructor = $('#instructor').val();
    var item1 = $('#item1').val();
    var item2 = $('#item2').val();

    var params = {
      name: classType,
      cost: cost,
      intro: intro,
      description: description,
      genre: classGenre,
      instructor: instructor,
      item1: item1,
      item2: item2,
      tips: tips
    }
    console.log(params);
    if (intro == "") {
      this.errorMessage = 'Describe your class';
      return;
    }
    if (description == "") {
      this.errorMessage = 'Add details for your class';
      return;
    }
    if (tips == "") {
      this.errorMessage = 'Include some tips for your class';
      return;
    }
    if (item1 == "") {
      this.errorMessage = 'Include item1';
      return;
    }
    if (item2 == "") {
      this.errorMessage = 'Include item2';
      return;
    }

    this.getDataFromServer('createClass', 'betraClasses.php', params);
    this.createClassNum = 0;
  }

  selectCategory() {
    this.classType = $('#classType').val();
    this.createClassNum = 2;
  }

  editClass() {
    var intro = $('#introEdit').val();
    var description = $('#descriptionEdit').val();
    var instructor = $('#instructorEdit').val();
    var tips = $('#tipsEdit').val();
    var params = {
      classId: this.selectedClass.row_id,
      intro: intro,
      description: description,
      instructor: instructor,
      tips: tips
    }
    console.log(params);
    this.getDataFromServer('editClass', 'betraClasses.php', params);
    this.selectedClass = null;
  }

  editThisClass(betraClass: any) {
    this.selectedClass = betraClass;
    console.log(betraClass);
  }

  deleteClass(betraClass: any) {
    this.getDataFromServer('deleteClass', 'betraClasses.php', { classId: betraClass.row_id });
  }

  startThisClass(betraClass: any) {
    this.getDataFromServer('startClass', 'betraClasses.php', { classId: betraClass.row_id });
  }

  joinClass(betraClass: any) {
    if (betraClass.cost > parseInt(this.user.points)) {
      this.errorMessage = 'Too Expensive!';
      betraClass.tooExpensiveFlg = true;
      return;

    }
    this.getDataFromServer('joinClass', 'betraClasses.php', { classId: betraClass.row_id });
  }

  createClassPressed() {
    if (this.user.points < 5) {
      this.notEnoughCoinsFlg = true;
    } else {
      this.createClassNum = 1;
    }
  }

  startVoting(betraClass: any) {
    this.getDataFromServer('startVoting', 'betraClasses.php', { classId: betraClass.row_id });

  }

  extendClass(betraClass: any) {
    this.getDataFromServer('extendClass', 'betraClasses.php', { classId: betraClass.row_id });
  }

  dropClass(betraClass: any) {
    this.getDataFromServer('dropClass', 'betraClasses.php', { classId: betraClass.row_id });
  }

  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);

    if (responseJson.action != 'logUser') {
      var workTodo = false;
      this.page = responseJson;
      this.openClasses = [];
      this.inProgressClasses = [];
      this.completedClasses = [];

      this.page.classes.forEach((element: any) => {
        var dt = this.getDateObjFromJSDate(element.startDt);
        element.startDay = dt.localDate;
        if (element.daysTillEnd < 0)
          element.daysTillEnd = 0;
        if (element.workTodo > 0)
          workTodo = true;
        if (element.status == 'Open')
          this.openClasses.push(element);
        if (element.status == 'Completed')
          this.completedClasses.push(element);
        if ((element.status == 'Started' || element.status == 'Voting') && (this.user.user_id == 1 || element.isEnrolled > 0 || element.isInstructor))
          this.inProgressClasses.push(element);
      });

      if (workTodo && this.betraPopupComponent)
        this.betraPopupComponent.showPopup('An Assignment is due!', 'Check your classes and see what work is due.');
    }
  }

}
