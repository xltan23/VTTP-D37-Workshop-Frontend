import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebcamImage } from 'ngx-webcam';
import { Subject } from 'rxjs';
import { CameraService } from './camera.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  // EVENT
  trigger = new Subject<void>()

  // CONSTRUCTOR
  constructor(private router:Router, private cameraSvc:CameraService) {}

  snap() {
    this.trigger.next()
  }

  snapshot(webcamImage:WebcamImage) {
    console.info('Base 64: ', webcamImage.imageAsBase64)
    console.info('Data URL: ', webcamImage.imageAsDataUrl)
    console.info('Image Data: ', webcamImage.imageData)
    this.cameraSvc.imageData = webcamImage.imageAsDataUrl
    this.router.navigate(['/upload-page'])
  }
}
