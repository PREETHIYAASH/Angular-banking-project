import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import moment from 'moment';
// import * as moment from 'moment';
AbortController

@Component({
  selector: 'app-account-information',
  templateUrl: './account-information.component.html',
  styleUrl: './account-information.component.css'
})
export class AccountInformationComponent {
  transactionHistory: Array<any> = [];
  constructor(
    public dialogRef: MatDialogRef<AccountInformationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('>>>>>', data);
    if (data?.transactionHistory && Array.isArray(data?.transactionHistory) && data?.transactionHistory.length > 0) {
      this.transactionHistory = data?.transactionHistory.map((item: any) => {
        item.timestamp = moment(new Date(item.timestamp[0], item.timestamp[1] - 1, item.timestamp[2], item.timestamp[3], item.timestamp[4], item.timestamp[5])).format('MMMM Do YYYY, h:mm:ss a');
        return item;
      });;
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  download(): void {
    const doc = new jsPDF();
    doc.text("Bhart Bank", 80, 10,);
    const header = [["ID", "Amount", "Type", "Date", "Remark"]];
    const transactionData: any[] = [];
    this.transactionHistory.forEach((item: any) => {
      transactionData.push([item?.id, item?.amount, item?.type, item?.timestamp, item?.remark !== null ? item?.remark : '']);
    });

    autoTable(doc, {
      head: header,
      body: transactionData
    });
    const accountNumber = this.data?.accountNum;
    doc.save(accountNumber+".pdf");
  }

  print(): void {
    const doc = new jsPDF();
    doc.text("Bhart Bank", 80, 10,);
    const header = [["ID", "Amount", "Type", "Date", "Remark"]];
    const transactionData: any[] = [];
    this.transactionHistory.forEach((item: any) => {
      transactionData.push([item?.id, item?.amount, item?.type, item?.timestamp, item?.remark]);
    });

    autoTable(doc, {
      head: header,
      body: transactionData
    });
    const accountNumber = localStorage.getItem("accountNumber");
    doc.autoPrint();
    window.open(doc.output('bloburl'), '_blank');
  
  }
}
