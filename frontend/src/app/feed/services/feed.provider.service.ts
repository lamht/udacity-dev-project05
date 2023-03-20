import { Injectable } from '@angular/core';
import { FeedItem, } from '../models/feed-item.model';

import { ApiAxiosClient } from 'src/app/api/api.axios';

@Injectable({
  providedIn: 'root'
})
export class FeedProviderService {

  constructor(private api: ApiAxiosClient) { }

  async getFeed(): Promise<FeedItem[]> {

    const resp = await this.api.get({ endPoint: '/feed' });
    return resp.items;
  }

  async uploadFeedItem(caption: string, file: any): Promise<any> {
    const res = await this.api.upload('/feed', file, { caption: caption, url: file.name });
    return res;
  }

}