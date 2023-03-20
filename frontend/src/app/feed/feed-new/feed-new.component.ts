import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedProviderService } from '../services/feed.provider.service';

@Component({
  selector: 'app-feed-new',
  templateUrl: './feed-new.component.html',
  styleUrls: ['./feed-new.component.css']
})
export class FeedNewComponent {
  myForm = new FormGroup({
    caption: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  previewDataUrl: string | ArrayBuffer | null = null;

  constructor(
    private feed: FeedProviderService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  setPreviewDataUrl(file: Blob) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.previewDataUrl = reader.result;
    };

    reader.readAsDataURL(file);
  }

  get f() {
    return this.myForm.controls;
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  onFileChange(event: any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });

      this.setPreviewDataUrl(file);
    }
  }

  submit() {
    let caption = this.myForm.get('caption')?.value;
    let file = this.myForm.get('fileSource')?.value;
    if (caption && file) {
      this.feed.uploadFeedItem(caption, this.myForm.get('fileSource')?.value)
        .then((result) => {
          //redirect to feed list
          this.router.navigate(['feed']);
        });
    }
  }

}
