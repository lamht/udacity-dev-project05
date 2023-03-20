import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-feed-detail',
  templateUrl: './feed-detail.component.html',
  styleUrls: ['./feed-detail.component.css']
})
export class FeedDetailComponent implements OnInit {
  feedId: string = "";

  constructor(private route: ActivatedRoute) {}
 
  ngOnInit(): void {
    this.route.params.subscribe( params => console.log(params));
  }
}
