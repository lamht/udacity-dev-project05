import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './auth/auth-button.component';
import { UserProfileComponent } from './auth/user-profile.component';
import { FeedListComponent } from './feed/feed-list/feed-list.component';
import { FeedDetailComponent } from './feed/feed-detail/feed-detail.component';
import { HomeComponent } from './home/home.component';
import { FeedNewComponent } from './feed/feed-new/feed-new.component';
import { FeedItemComponent } from './feed/feed-item/feed-item.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AuthButtonComponent,
    UserProfileComponent,
    FeedListComponent,
    FeedDetailComponent,
    HomeComponent,
    FeedNewComponent,
    FeedItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AuthModule.forRoot({
      domain: 'dev-xkdox7v8jiqc317u.us.auth0.com',
      clientId: 'n2pNajitIFydRl1RxCDeVn8gtbIw3QVy',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
