import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { NavParamsService } from '../nav-params.service';
import { ReceiptService } from './../services/receipt.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-receipt-details',
  templateUrl: './receipt-details.page.html',
  styleUrls: ['./receipt-details.page.scss'],
})
export class ReceiptDetailsPage implements OnInit {

  receipt: any;

  constructor(
    public navCtrl: NavController,
    public navParamsService: NavParamsService,
    public receiptService: ReceiptService) {
  }

  ngOnInit() {
    this.receipt = this.navParamsService.receipt;
  }

  goToDashboard() {
    this.navCtrl.navigateForward('dashboard');
  }

  deleteReceipt() {
    this.receiptService.delete_Receipt(this.receipt, firebase.auth().currentUser.email);
    this.goToDashboard();
  }

}
