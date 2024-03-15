import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../account.service';
import jsPDF from 'jspdf';
// import * as moment from 'moment';
import autoTable from 'jspdf-autotable'
import moment from 'moment';

@Component({
  selector: 'app-transactionhistory',
  templateUrl: './transactionhistory.component.html',
  styleUrl: './transactionhistory.component.css'
})


export class TransactionhistoryComponent implements OnInit {

  transactionHistory: any;
  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {

    const accountNum = localStorage.getItem('accountNumber');
    this.accountService.getTransactionHistory(accountNum)
      .subscribe(
        (data: any[]) => {
          console.log('###', data);
          this.transactionHistory = data.map((item: any) => {
            item.timestamp = moment(new Date(item.timestamp[0], item.timestamp[1] - 1, item.timestamp[2], item.timestamp[3], item.timestamp[4], item.timestamp[5])).format('MMMM Do YYYY, h:mm:ss a');
            return item;
          });
          console.log('>>>>>>', this.transactionHistory);
        },
        (error: any) => {
          console.log('Error fetching transaction history:', error);
        }
      );
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
    const accountNumber = localStorage.getItem("accountNumber");
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
