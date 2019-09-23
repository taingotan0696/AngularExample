import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-purchasedetailinfo',
  templateUrl: './purchasedetailinfo.component.html',
  styleUrls: ['./purchasedetailinfo.component.css']
})
export class PurchasedetailinfoComponent implements OnInit {
  @ViewChild('fileInput', { static: true }) fileInput: ElementRef;
  constructor() { }


  chooseFile() {
    let event = new MouseEvent('click', { bubbles: false });
    this.fileInput.nativeElement.dispatchEvent(event);
  }

  ngOnInit() {
  }

  onChangeFile($event) {

  }
}
