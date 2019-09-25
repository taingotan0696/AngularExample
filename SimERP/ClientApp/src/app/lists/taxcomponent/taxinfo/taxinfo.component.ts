import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaxService } from '../services.service';
import { Tax } from '../models/Tax';

@Component({
  selector: 'app-taxinfo',
  templateUrl: './taxinfo.component.html',
  styleUrls: ['./taxinfo.component.css']
})
export class TaxinfoComponent implements OnInit {
  taxForm: FormGroup; // thể hiện của Form quản lý các control
  @Input() isAddState = true; // biến thể hiện trạng thái của Form (insert || update)
  @Input() rowSelected: Tax; // dữ liệu được chọn ở lưới truyền qua
  tax: Tax; // đối tượng lưu trữ tạm

  constructor(public activeModal: NgbActiveModal, private taxService: TaxService) { }

  ngOnInit() {
    // khởi tạo các control của màn hình
    this.taxForm = new FormGroup({
      TaxCode: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      TaxName: new FormControl('', [Validators.required, Validators.maxLength(125)]),
      TaxPercent: new FormControl(0, [Validators.required, Validators.maxLength(50)]),
      Notes: new FormControl(''),
      TaxId: new FormControl(0), // default value
      IsActive: new FormControl(true),
    });

    // chế độ update state
    if (!this.isAddState) {
      // disable control TaxCode
      const control = this.taxForm.get('TaxCode');
      control.disable();

      // cập nhật lại dữ liệu lên giao diện
      this.taxForm.patchValue(this.rowSelected);
    }
  }

  getActionText() {
    return this.isAddState ? 'Thêm mới' : 'Cập nhật';
  }

  // xử lý lưu dữ liệu
  saveData(isContinue: boolean) {
    const isNew = this.isAddState;
    this.tax = Object.assign({}, this.taxForm.getRawValue());
    console.log(this.tax);
    if (this.tax != undefined) {
      this.taxService.SaveTax(this.tax, isNew).subscribe(res => {
        if (res != undefined) {
          if (res.IsOk) {
            alert(this.getActionText() + ' thành công');
            if (isContinue) {
              this.isAddState = true;
              this.taxForm.get('TaxCode').enable();
              this.taxForm.reset();
            } else {
              this.activeModal.close(true);
            }
          } else {
            alert(this.getActionText() + ' thất bại. Lỗi: \r\n' + res.MessageCode);
          }
        } else {
          alert(this.getActionText() + ' thất bại');
        }
      });
    }
  }

}
