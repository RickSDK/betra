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
//import { UserReviewsComponent } from './user-reviews/user-reviews.component';
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
import { UpgradeMemberComponent } from './upgrade-member/upgrade-member.component';
import { JoinTeamComponent } from './join-team/join-team.component';
import { RegionsComponent } from './regions/regions.component';
import { OwnersComponent } from './owners/owners.component';
import { OwnersMenuComponent } from './owners-menu/owners-menu.component';
import { OwnerUsersComponent } from './owner-users/owner-users.component';
import { OwnerStatsComponent } from './owner-stats/owner-stats.component';
import { OwnersTableCellComponent } from './owners-table-cell/owners-table-cell.component';
import { OwnerBugsComponent } from './owner-bugs/owner-bugs.component';
import { ProfileEditPicsComponent } from './profile-edit-pics/profile-edit-pics.component';
import { VerifyPicsComponent } from './verify-pics/verify-pics.component';
import { AdvancedFiltersComponent } from './advanced-filters/advanced-filters.component';
import { OwnerActivityComponent } from './owner-activity/owner-activity.component';
import { OwnerActivityUserComponent } from './owner-activity-user/owner-activity-user.component';
import { BetraFeaturesComponent } from './betra-features/betra-features.component';
import { UploadImageCropComponent } from './upload-image-crop/upload-image-crop.component';
import { FlaggedUsersComponent } from './flagged-users/flagged-users.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { OwnerTeamsComponent } from './owner-teams/owner-teams.component';
import { OwnerCellComponent } from './owner-cell/owner-cell.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserDatesComponent } from './user-dates/user-dates.component';
import { OwnerAdminComponent } from './owner-admin/owner-admin.component';
import { OwnerOrgChartCellComponent } from './owner-org-chart-cell/owner-org-chart-cell.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { BetraBlogsComponent } from './betra-blogs/betra-blogs.component';
import { BlogCellComponent } from './blog-cell/blog-cell.component';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { BlogManageComponent } from './blog-manage/blog-manage.component';
//import { AdsenseModule } from 'ng2-adsense';

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
    BirthdayInputComponent,
    UpgradeMemberComponent,
    JoinTeamComponent,
    RegionsComponent,
    OwnersComponent,
    OwnersMenuComponent,
    OwnerUsersComponent,
    OwnerStatsComponent,
    OwnersTableCellComponent,
    OwnerBugsComponent,
    ProfileEditPicsComponent,
    VerifyPicsComponent,
    AdvancedFiltersComponent,
    OwnerActivityComponent,
    OwnerActivityUserComponent,
    BetraFeaturesComponent,
    UploadImageCropComponent,
    FlaggedUsersComponent,
    TermsConditionsComponent,
    PrivacyPolicyComponent,
    OwnerTeamsComponent,
    OwnerCellComponent,
    LandingPageComponent,
    UserDatesComponent,
    OwnerAdminComponent,
    OwnerOrgChartCellComponent,
    BottomBarComponent,
    BetraBlogsComponent,
    BlogCellComponent,
    BlogCreateComponent,
    BlogManageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
  //  AdsenseModule.forRoot()
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
              '1585571315226162'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
