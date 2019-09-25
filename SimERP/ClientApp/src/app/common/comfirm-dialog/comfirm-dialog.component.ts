import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-comfirm-dialog',
  templateUrl: './comfirm-dialog.component.html',
  styleUrls: ['./comfirm-dialog.component.css']
})
export class ComfirmDialogComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

  saveData(flag: boolean) {
    this.activeModal.close(flag);
    
  }
}
