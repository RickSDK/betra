import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatabaseService } from '../services/database.service';
import { BetraPopupComponent } from '../popups/betra-popup/betra-popup.component';
import { PicturePopupComponent } from '../popups/picture-popup/picture-popup.component';
import { Photographer } from '../classes/photographer';
import { ActivatedRoute } from '@angular/router';
import { BetraPopup2Component } from '../betra-popup2/betra-popup2.component';

declare var $: any;

@Component({
  selector: 'app-photo-class',
  templateUrl: './photo-class.component.html',
  styleUrls: ['./photo-class.component.scss']
})
export class PhotoClassComponent extends BaseComponent implements OnInit {
  @ViewChild(BetraPopupComponent, { static: true })
  betraPopupComponent!: BetraPopupComponent;

  @ViewChild(PicturePopupComponent, { static: true })
  picturePopupComponent!: PicturePopupComponent;

  @ViewChild(BetraPopup2Component, { static: true })
  betraPopup2Component!: BetraPopup2Component;

  public classId: number = 0;
  public betraClass: any = null;
  public prize: number = 0;
  public uploadPhotoFlg: boolean = false;
  public selectedStudent: any = null;
  public showInstructorFeedbackFlg: boolean = false;
  public emailList: any = [];

  constructor(private route: ActivatedRoute, databaseService: DatabaseService) { super(databaseService); }

  override ngOnInit(): void {
    super.ngOnInit();

    this.route.queryParams.subscribe(params => {
      this.classId = params['id'] || 0;
      this.getDataFromServer('loadClass', 'betraClasses.php', { classId: this.classId });
    });
  }

  uploadPortfilioPicButtonClicked() {
    this.getDataFromServer('uploadClassImage', 'betraClasses.php', { classId: this.classId, image: $('#Image1').attr('src') });
    this.uploadPhotoFlg = false;

  }

  viewImage(src: string) {
    if (this.picturePopupComponent)
      this.picturePopupComponent.showPopup(src);
  }

  leaveFeedbackClicked(student: any) {
    this.selectedStudent = student;
    this.betraPopup2Component.showPopup('Feedback for ' + student.firstName);
    //  console.log(student);
  }

  sumbitChat(message: string) {
    this.getDataFromServer('chatMessage', 'betraClasses.php', { classId: this.classId, message: message });
  }

  sumbitFeedback() {
    var feedback = $('#feedback').val();
    console.log('sumbitFeedback', feedback, this.selectedStudent);
    this.getDataFromServer('feedbackMessage', 'betraClasses.php', { classId: this.classId, message: feedback, uid: this.selectedStudent.user_id });
    this.betraPopup2Component.hidePopup();
  }

  override postSuccessApi(file: string, responseJson: any) {
    super.postSuccessApi(file, responseJson);

    if (responseJson.action != 'logUser') {
      if (responseJson.classes && responseJson.classes.length == 1) {
        this.betraClass = responseJson.classes[0];
        this.prize = this.betraClass.cost * 2;

        var dt2 = this.getDateObjFromJSDate(this.betraClass.endDt);
        this.betraClass.submitDt = dt2.localDate;
        this.emailList = [];
        this.emailList.push(this.betraClass.email);
        this.betraClass.students.forEach((element: any) => {
          this.emailList.push(element.email);
          element.src = 'https://www.betradating.com/betraPhp/classPics/pic' + element.user_id + '_' + this.betraClass.row_id + '_' + element.row_id + '.jpg';
        });
      }
      console.log('xxx', this.betraClass);
    }
  }

}
