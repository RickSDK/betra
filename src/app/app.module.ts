import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponent } from './base/base.component';
import { PageShellComponent } from './page-shell/page-shell.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SignUpPopupComponent } from './sign-up-popup/sign-up-popup.component';
import { LoginPopupComponent } from './popups/login-popup/login-popup.component';
import { ConfirmationPopupComponent } from './confirmation-popup/confirmation-popup.component';
import { InfoPopupComponent } from './popups/info-popup/info-popup.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
import { WelcomePopupComponent } from './popups/welcome-popup/welcome-popup.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { UsersComponent } from './users/users.component';
import { ProfileSnapshotComponent } from './profile-snapshot/profile-snapshot.component';
import { MatchSnapshotComponent } from './match-snapshot/match-snapshot.component';
import { GreenCheckComponent } from './green-check/green-check.component';
import { MyMatchesComponent } from './my-matches/my-matches.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { JournalComponent } from './journal/journal.component';
import { ProfileTopComponent } from './profile-top/profile-top.component';
import { DatingPoolComponent } from './dating-pool/dating-pool.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { SettingsComponent } from './settings/settings.component';
import { MessagesComponent } from './messages/messages.component';
import { PercentTextComponent } from './percent-text/percent-text.component';
import { UserCommunicationComponent } from './user-communication/user-communication.component';
import { FirstNameInputComponent } from './input/first-name-input/first-name-input.component';
import { PhoneInputComponent } from './input/phone-input/phone-input.component';
import { MatchDatingPoolComponent } from './match-dating-pool/match-dating-pool.component';
import { MessageInputComponent } from './input/message-input/message-input.component';
import { UserRequestInfoComponent } from './user-request-info/user-request-info.component';
import { UserReviewsComponent } from './user-reviews/user-reviews.component';
import { TextAreaInputComponent } from './input/text-area-input/text-area-input.component';
import { ReviewCellComponent } from './review-cell/review-cell.component';
import { JournalCellComponent } from './journal-cell/journal-cell.component';
import { TopListsComponent } from './top-lists/top-lists.component';
import { ProfilePicComponent } from './profile-pic/profile-pic.component';
import { TextInputComponent } from './input/text-input/text-input.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { DateLocalComponent } from './date-local/date-local.component';
import { UserRequestPicComponent } from './user-request-pic/user-request-pic.component';
import { UserRequestDateComponent } from './user-request-date/user-request-date.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { UserPrivatePicsComponent } from './user-private-pics/user-private-pics.component';
import { DateDisplayComponent } from './date-display/date-display.component';
import { UserRequestsComponent } from './user-requests/user-requests.component';
import { DateFormComponent } from './date-form/date-form.component';
import { FacebookLoginProvider, SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { BirthdayInputComponent } from './birthday-input/birthday-input.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    PageShellComponent,
    MainMenuComponent,
    SignUpPopupComponent,
    LoginPopupComponent,
    ConfirmationPopupComponent,
    InfoPopupComponent,
    ProfileComponent,
    AboutComponent,
    WelcomePopupComponent,
    SpinnerComponent,
    UsersComponent,
    ProfileSnapshotComponent,
    MatchSnapshotComponent,
    GreenCheckComponent,
    MyMatchesComponent,
    NotificationsComponent,
    ReviewsComponent,
    JournalComponent,
    ProfileTopComponent,
    DatingPoolComponent,
    UserDetailComponent,
    SideMenuComponent,
    SettingsComponent,
    MessagesComponent,
    PercentTextComponent,
    UserCommunicationComponent,
    FirstNameInputComponent,
    PhoneInputComponent,
    MatchDatingPoolComponent,
    MessageInputComponent,
    UserRequestInfoComponent,
    UserReviewsComponent,
    TextAreaInputComponent,
    ReviewCellComponent,
    JournalCellComponent,
    TopListsComponent,
    ProfilePicComponent,
    TextInputComponent,
    DocumentationComponent,
    DateLocalComponent,
    UserRequestPicComponent,
    UserRequestDateComponent,
    UploadImageComponent,
    UserPrivatePicsComponent,
    DateDisplayComponent,
    UserRequestsComponent,
    DateFormComponent,
    BirthdayInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '3399067146824355'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
