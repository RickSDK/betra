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

    var params = {
      name: classType,
      cost: cost,
      intro: intro,
      description: description,
      genre: classGenre,
      instructor: instructor,
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
      return;

    }
    this.getDataFromServer('joinClass', 'betraClasses.php', { classId: betraClass.row_id });
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
      this.page.classes.forEach((element: any) => {
        var dt = this.getDateObjFromJSDate(element.startDt);
        element.startDay = dt.localDate;
        if (element.workTodo > 0)
          workTodo = true;
      });

      if (workTodo && this.betraPopupComponent)
        this.betraPopupComponent.showPopup('An Assignment is due!', 'Check your classes and see what work is due.');
    }
  }

}
