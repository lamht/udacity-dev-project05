import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/services/auth.guard.service';
import { FeedDetailComponent } from './feed/feed-detail/feed-detail.component';
import { FeedListComponent } from './feed/feed-list/feed-list.component';
import { FeedNewComponent } from './feed/feed-new/feed-new.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: FeedListComponent },
  { path: 'home', component: HomeComponent },
  { path: 'feed', component: FeedListComponent, canActivate: [AuthGuardService] },
  { path: 'feed/:feedId', component: FeedDetailComponent, canActivate: [AuthGuardService]},
  { path: 'feed-new', component: FeedNewComponent,canActivate: [AuthGuardService]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
