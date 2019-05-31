import { Injectable } from '@angular/core';
import { Receipt } from 'src/app/push-receipt/receipt'
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { PushReceiptPage } from 'src/app/push-receipt/push-receipt.page'

@Injectable({
    providedIn: 'root'
})
export class ReceiptService {


    constructor(
        private firestore: AngularFirestore
    ) {
    }


    create_Receipt(receipt: Receipt, userEmail: string) {
        console.log("sending receipt through service")
        return this.firestore
            .collection('user_receipts')
            .doc(userEmail)
            .collection('receipts')
            .add(receipt.getData())

    }

    read_Receipts(userEmail: string) {
        return this.firestore
            .collection('user_receipts')
            .doc(userEmail)
            .collection('receipts')
            .snapshotChanges();
    }

    // update_Student(recordID, record) {
    //     this.firestore.doc('Students/' + recordID).update(record);
    // }

    // delete_Student(record_id) {
    //     this.firestore.doc('Students/' + record_id).delete();
    // }
}