import { Component, OnInit, ViewChild } from '@angular/core';
import { Unit } from '../model/Unit';
import { PaginationComponent } from 'src/app/pagination/pagination.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UnitService } from '../unit.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComfirmDialogComponent } from '../../../common/comfirm-dialog/comfirm-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

  dataSerach: string;
  ListUnit: Unit[] = [];

  total = 10;
  page = 1;
  limit = 15;

  @ViewChild(PaginationComponent, { static: true }) pagingComponent: PaginationComponent;

  constructor(private UnitService: UnitService, private spinnerService: Ng4LoadingSpinnerService, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit() {
  }

  SerachAction() {
    this.page = 1;
    this.LoadData(0);
    this.toastr.success('Hello world!', 'Toastr fun!');
    // var row = new Unit();
    // row.UnitCode = "HOP";
    // row.UnitName = "Hợp";
    // row.Notes = "";

    // this.ListUnit.push(row);
  }

  deleteRowGird_Unit(UnitCode: number) {

    this.UnitService.DeleteUnit(UnitCode).subscribe(res => {
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

  openDialog(UnitCode: number) {
    const modalRef = this.modalService.open(ComfirmDialogComponent, {
      backdrop: false, scrollable: true, centered: true
    });
    // xử lý sau khi đóng dialog, thực hiện load lại dữ liệu nếu muốn
    modalRef.result.then((result) => {
      if (result != undefined && result == true) {
        this.deleteRowGird_Unit(UnitCode);
      }
    });
  }

  LoadData(startRow: number) {
    const limit = this.pagingComponent.getLimit();
    this.spinnerService.show();
    this.UnitService.getData(this.dataSerach, startRow, limit).subscribe(
      {
        next: (res) => {
          if (!res.IsOk) {
            alert('Lỗi ' + res.MessageText);;
          } else {
            this.ListUnit = res.RepData;
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

}
