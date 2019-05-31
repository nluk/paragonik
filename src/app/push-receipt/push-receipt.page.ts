import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx"
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController, ModalController } from '@ionic/angular';
import * as firebase from 'firebase';
import { ReceiptService } from './../services/receipt.service';
import { Receipt } from 'src/app/push-receipt/receipt'
import { DocumentReference } from '@angular/fire/firestore'

@Component({
  selector: 'app-push-receipt',
  templateUrl: './push-receipt.page.html',
  styleUrls: ['./push-receipt.page.scss'],
})

export class PushReceiptPage implements OnInit {

  base64image = null;
  receiptTitle: string = null;
  receiptDescription: string = null;
  userEmail: string = null;
  status: string = ""


  options: CameraOptions = {
    quality: 75,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(
    private camera: Camera,
    private receiptService: ReceiptService,
    private navCtrl: NavController) {

  }

  ngOnInit() {
    this.userEmail = firebase.auth().currentUser.email;

  }

  takePicture() {


    this.camera.getPicture(this.options).then((imageData) => {
      this.base64image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });

  }

  upload() {
    if (this.base64image != null) {
      let photoBlob = this.dataURItoBlob(this.base64image);
      let uploadTask = firebase.storage()
        .ref()
        .child(this.userEmail + '/' + this.dateString())
        .put(photoBlob);
      this.status = "Storing your image"
      uploadTask
        .then(this.onImageUploadSuccess, this.onError)
        .then(this.storeReceipt, this.onError)
        .then(this.gotDocument, this.onError)


    }
  }


  storeReceipt = receipt => {
    this.status = "creating receipt"
    return this.receiptService.create_Receipt(receipt, this.userEmail)
  }


  onImageUploadSuccess = snapshot => {
    this.status = "Storing your receipt"
    return snapshot.ref.getDownloadURL().then(url => {
      let receipt = new Receipt(this.receiptTitle, this.receiptDescription, url);
      return receipt
    }, this.onError)
  };

  onError = error => {
    this.status = "Error occured"
    console.log(error)
  };


  gotDocument = documentReference => {
    this.status = "Receipt stored successfully"
  }


  dataURItoBlob(dataURI) {
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  };


  dateString() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + '_' + time;
    return dateTime;
  }





}
