import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { ReceiptService } from './../services/receipt.service';
import { Receipt } from 'src/app/push-receipt/receipt'
import { NavParamsService } from '../nav-params.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {


  userEmail: string;
  receipts: any;

  constructor(
    private navCtrl: NavController,
    private receiptService: ReceiptService,
    private navParamsService: NavParamsService,
    private authService: AuthenticateService
  ) { }

  ngOnInit() {

    if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;

      this.receiptService.read_Receipts(this.userEmail).subscribe(data => {

        this.receipts = data.map(e => {
          return {
            id: e.payload.doc.id,
            title: e.payload.doc.data()['title'],
            description: e.payload.doc.data()['description'],
            imageURL: e.payload.doc.data()['imageURL'],
          };
        })
        console.log(this.receipts);

      });



    } else {
      this.navCtrl.navigateBack('');
    }



  }

  addItem() {
    this.navCtrl.navigateForward('push-receipt');
  }

  goToDetails(receipt: object) {
    this.navParamsService.receipt = receipt;
    this.navCtrl.navigateForward('receipt-details');
  }

  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
  }
}