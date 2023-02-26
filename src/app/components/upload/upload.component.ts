import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CameraService } from 'src/app/camera.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  // FORM AND DISPLAY COMPONENTS
  form!: FormGroup
  imageData = ""
  blob!: Blob

  // CONSTRUCTOR
  constructor(private fb: FormBuilder, private router: Router, public cameraSvc: CameraService) { }

  // ON INITIALIZATION
  ngOnInit(): void {
    // If attempted to navigate to this page (via. link), will be redirected to home page since imageData is empty
    if (!this.cameraSvc.imageData) {
      this.router.navigate(['/'])
      return
    }
    // If navigated to after image captured, imageData is not empty. Pass imageData to UploadComponent
    this.imageData = this.cameraSvc.imageData
    this.form = this.fb.group({
      title: this.fb.control<string>(''),
      comment: this.fb.control<string>('')
    })
    // Convert imageData to BLOB
    this.blob = this.dataURIToBlob(this.imageData)
    console.info('>>> BLOB:', this.blob)
  }

  dataURIToBlob(dataURI:string) {
    var byteString = atob(dataURI.split(',')[1])
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var arrayBuffer = new ArrayBuffer(byteString.length)
    var intArray = new Uint8Array(arrayBuffer)
    for (var i=0; i<byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i)
    }
    return new Blob([arrayBuffer], {type:mimeString})
  }

  // Upon upload
  upload() {
    const formValue = this.form.value
    console.info('>>> Value: ', formValue)
    // Takes Form values and Blob from UploadComponent
    this.cameraSvc.upload(formValue, this.blob)
                  .then(result => {
                    console.info('>>> Key: ', result.imageKey)
                    this.router.navigate(['/'])
                  })
                  .catch(error => {
                    console.error('>>> Error: ', error)
                  })
  }
}
