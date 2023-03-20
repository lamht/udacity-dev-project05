import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { FeedDetailComponent } from './feed/feed-detail/feed-detail.component';
import { FeedListComponent } from './feed/feed-list/feed-list.component';
import { FeedNewComponent } from './feed/feed-new/feed-new.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'feed', component: FeedListComponent, canActivate: [AuthGuard] },
  { path: 'feed/:feedId', component: FeedDetailComponent, canActivate: [AuthGuard]},
  { path: 'feed-new', component: FeedNewComponent,canActivate: [AuthGuard]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
