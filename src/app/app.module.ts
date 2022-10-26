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
    JournalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
