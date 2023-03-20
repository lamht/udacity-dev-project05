import { Component, Input } from '@angular/core';
import { FeedItem } from '../models/feed-item.model';

@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.css']
})
export class FeedItemComponent {
  @Input() feedItem: FeedItem= {
    userId: 'cc',
    feedId: 'xx',
    url: '/assets/mock/xander0.jpg',
    caption: 'Such a cute pup',
    createdAt: '2022-01-01'
  }

  constructor(){
  }
}
