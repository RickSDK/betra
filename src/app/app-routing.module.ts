import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { MyMatchesComponent } from './my-matches/my-matches.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { JournalComponent } from './journal/journal.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  { path: '', component: MainMenuComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'about', component: AboutComponent },
  { path: 'users', component: UsersComponent },
  { path: 'matches', component: MyMatchesComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'journal', component: JournalComponent },
  { path: 'user-detail', component: UserDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
