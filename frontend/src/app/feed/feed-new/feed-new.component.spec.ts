import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedNewComponent } from './feed-new.component';

describe('FeedNewComponent', () => {
  let component: FeedNewComponent;
  let fixture: ComponentFixture<FeedNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
