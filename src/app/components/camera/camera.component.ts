import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WebcamComponent, WebcamImage } from 'ngx-webcam';
import { Subject, Subscription } from 'rxjs';
import { CameraService } from 'src/app/camera.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(WebcamComponent)
  webcam!:WebcamComponent

  // EVENTS AND DISPLAY COMPONENTS
  trigger = new Subject<void>()
  pics:string[] = []
  sub$!:Subscription

  // CONSTRUCTOR
  constructor(private router:Router, private cameraSvc:CameraService) {}

  // ON INITIALIZATION
  ngOnInit(): void {
      console.info('>>> On Init:', this.webcam)
  }

  // ON TERMINATION
  ngOnDestroy(): void {
      console.info('>>> On Destroy...')
      this.sub$.unsubscribe()
  }

  // ON AFTER VIEW INITIALIZATION
  ngAfterViewInit(): void {
      console.info('>>> After View Init:', this.webcam)
      // Register the activation of webcam as an event
      this.webcam.trigger = this.trigger
      this.webcam.width = 400
      this.webcam.height = 400
      this.sub$ = this.webcam.imageCapture.subscribe(this.snapshot.bind(this))
  }

  // Upon snap, trigger event ImageCapture
  snap() {
    this.trigger.next()
  }
  
  snapshot(webcamImage:WebcamImage) {
    console.info('As Base64:', webcamImage.imageAsBase64)
    console.info('Data URL:', webcamImage.imageAsDataUrl)
    console.info('Image Data:', webcamImage.imageData)
    // Set imageData in CameraService as DataURL of image
    this.cameraSvc.imageData = webcamImage.imageAsDataUrl
    // Add image into the array to be displayed
    this.pics.push(webcamImage.imageAsDataUrl)
    // Navigate to UploadComponent
    this.router.navigate(['/upload-page'])
  }
}
