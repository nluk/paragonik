import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule, NavParams } from '@ionic/angular';

import { ReceiptDetailsPage } from './receipt-details.page';

const routes: Routes = [
  {
    path: '',
    component: ReceiptDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReceiptDetailsPage]
})
export class ReceiptDetailsPageModule { }
