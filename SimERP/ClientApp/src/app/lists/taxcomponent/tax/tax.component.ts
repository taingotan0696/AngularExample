import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TaxService } from '../services.service';
import { Tax } from '../models/Tax';
import { PaginationComponent } from 'src/app/pagination/pagination.component';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TaxinfoComponent } from '../taxinfo/taxinfo.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DelTaxParams } from '../models/DelTaxParams';

@Component({
  selector: 'app-stock',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.css']
})
export class TaxComponent implements OnInit, AfterViewInit {

  formSearch: FormGroup;
  headElements = ['#', 'Mã', 'Tên thuế', 'Thuế suất', 'Ghi chú', 'Sử dụng', ''];
  @ViewChild(PaginationComponent, { static: true }) pagingComponent: PaginationComponent;
  taxList: Tax[];
  loading = false;
  total = 10;
  page = 1;
  limit = 10;

  constructor(private cdRef: ChangeDetectorRef, private stockService: TaxService, private modalService: NgbModal, private spinnerService: Ng4LoadingSpinnerService) {
  }

  ngOnInit() {
    this.formSearch = new FormGroup({
      searchString: new FormControl(),
    });
  }

  getStartRow(): number {
    const startRow = (this.page - 1) * this.pagingComponent.getLimit();
    return startRow;
  }

  ngAfterViewInit(): void {
    this.SearchData();
  }

  SearchData() {
    this.page = 1;
    this.LoadData(0);
  }

  goToPage(n: number): void {
    this.page = n;
    const startRow = this.getStartRow();
    this.LoadData(startRow);
  }

  changeLimit() {
    this.page = 1;
    const startRow = this.getStartRow();
    this.LoadData(startRow);
  }

  onNext(): void {
    this.page++;
    const startRow = this.getStartRow();
    this.LoadData(startRow);
  }

  onPrev(): void {
    this.page--;
    const startRow = this.getStartRow();
    this.LoadData(startRow);
  }

  LoadData(startRow: number) {
    const limit = this.pagingComponent.getLimit();
    this.spinnerService.show();
    this.stockService.getData(this.formSearch.getRawValue().searchString, startRow, limit).subscribe(
      {
        next: (res) => {
          if (!res.IsOk) {
            alert('Lỗi ' + res.MessageText);;
          } else {
            this.taxList = res.RepData;
            this.total = res.TotalRow;
          }
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.spinnerService.hide();
        }
      }
    );
  }
  Delete(taxData) {
    if (confirm('Bạn có chắc chắn muốn xoá dữ liệu đang chọn?')) {
      this.stockService.DeleteTax(taxData).subscribe(res => {
        if (res !== undefined) {
          if (!res.IsOk) {
            alert(res.MessageText);
          } else {
            alert('Xoá thành công!');
            this.SearchData();
          }
        } else {
          alert('Lỗi xoá thông tin');
        }
      }, err => {
        console.log(err);
      });
    }
  }

  openDialog(rowSelected?: any) {
    const modalRef = this.modalService.open(TaxinfoComponent, {
      backdrop: false, scrollable: true
    });

    if (rowSelected == undefined) {
      modalRef.componentInstance.isAddState = true;
    } else {
      modalRef.componentInstance.rowSelected = rowSelected;
      modalRef.componentInstance.isAddState = false;
    }

    // xử lý sau khi đóng dialog, thực hiện load lại dữ liệu nếu muốn
    modalRef.result.then((result) => {
      if (result != undefined && result == true) {
        this.SearchData();
      }
    }, (reason) => {
    });
  }
}
