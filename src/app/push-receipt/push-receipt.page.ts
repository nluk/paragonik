import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx"

@Component({
  selector: 'app-push-receipt',
  templateUrl: './push-receipt.page.html',
  styleUrls: ['./push-receipt.page.scss'],
})
export class PushReceiptPage implements OnInit {
  public base64image: string = null;

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(private camera: Camera) { }

  ngOnInit() {
  }

  takePicture() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });
  }

  sendToFirebase() {

  }

}
