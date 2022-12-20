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
import { SettingsComponent } from './settings/settings.component';
import { MessagesComponent } from './messages/messages.component';
import { TopListsComponent } from './top-lists/top-lists.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { UpgradeMemberComponent } from './upgrade-member/upgrade-member.component';
import { JoinTeamComponent } from './join-team/join-team.component';
import { RegionsComponent } from './regions/regions.component';
import { OwnersComponent } from './owners/owners.component';
import { OwnerUsersComponent } from './owner-users/owner-users.component';
import { OwnerStatsComponent } from './owner-stats/owner-stats.component';
import { OwnerBugsComponent } from './owner-bugs/owner-bugs.component';

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
  { path: 'settings', component: SettingsComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'top-lists', component: TopListsComponent },
  { path: 'documentation', component: DocumentationComponent },
  { path: 'upgrade-member', component: UpgradeMemberComponent },
  { path: 'join-team', component: JoinTeamComponent },
  { path: 'regions', component: RegionsComponent },
  { path: 'owners', component: OwnersComponent },
  { path: 'owner-users', component: OwnerUsersComponent },
  { path: 'owner-stats', component: OwnerStatsComponent },
  { path: 'owner-bugs', component: OwnerBugsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
