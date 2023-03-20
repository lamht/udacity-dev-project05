import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FeedItem } from '../models/feed-item.model';
import { FeedProviderService } from '../services/feed.provider.service';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css']
})
export class FeedListComponent implements OnInit{
  feeds: FeedItem[] = [];
  isLoaded:boolean=false;
  constructor(private svc: FeedProviderService){
    
  }

  ngOnInit() {    
    this.svc.getFeed().then(items =>{
      this.feeds = items;
      this.feeds.sort((a, b) => {
        let fa = a.createdAt,
        fb = b.createdAt;
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    }).reverse();
      this.isLoaded = true;
    })
  }
}
