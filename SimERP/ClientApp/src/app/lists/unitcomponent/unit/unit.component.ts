import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  objModel: Unit;
  isNewModel: boolean;

  total = 10;
  page = 1;
  limit = 15;

  @ViewChild(PaginationComponent, { static: true }) pagingComponent: PaginationComponent;
  @ViewChild('closeAddExpenseModal', { static: true }) closeAddExpenseModal: ElementRef;


  constructor(private UnitService: UnitService, private spinnerService: Ng4LoadingSpinnerService, private modalService: NgbModal, private toastr: ToastrService) {
    this.objModel = new Unit();
  }

  ngOnInit() {
  }

  SerachAction() {
    this.page = 1;
    this.LoadData(0);
  }

  deleteRowGird_Unit(UnitCode: number) {

    this.UnitService.DeleteUnit(UnitCode).subscribe(res => {
      if (res !== undefined) {
        if (!res.IsOk) {
          this.toastr.error(res.MessageText, 'Thông báo!');
        } else {
          this.toastr.warning('Dữ liệu đã được xóa', 'Thông báo!');
          this.SearchData();
        }
      } else {
        this.toastr.error("Lỗi xử lý hệ thống", 'Thông báo!');
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

  clearModel() {
    this.objModel = new Unit();
  }

  actionUp(index: number) {
    if (index == 0) return;
    var objcusr: number = this.ListUnit[index].UnitId;
    var objUp: number = this.ListUnit[index - 1].UnitId;

    this.UnitService.SortUnit(objcusr, objUp).subscribe(res => {
      if (res !== undefined) {
        if (!res.IsOk) {
          this.toastr.error(res.MessageText, 'Thông báo!');
        } else {
          this.SearchData();
        }
      } else {
        this.toastr.error("Lỗi xử lý hệ thống", 'Thông báo!');
      }
    }, err => {
      console.log(err);
    });

  }

  actionDow(index: number) {
    if (index == this.limit - 1) return;

    var objcusr: number = this.ListUnit[index].UnitId;
    var objDow: number = this.ListUnit[index + 1].UnitId;
   
    this.UnitService.SortUnit(objDow, objcusr).subscribe(res => {
      if (res !== undefined) {
        if (!res.IsOk) {
          this.toastr.error(res.MessageText, 'Thông báo!');
        } else {
          this.SearchData();
        }
      } else {
        this.toastr.error("Lỗi xử lý hệ thống", 'Thông báo!');
      }
    }, err => {
      console.log(err);
    });
    
  }

  saveDataModel(isclose: boolean) {
    this.UnitService.InsertUnit(this.objModel, this.isNewModel).subscribe(res => {
      if (res !== undefined) {
        if (!res.IsOk) {
          this.toastr.error(res.MessageText, 'Thông báo!');
        } else {
          this.SearchData();
          this.clearModel();
          this.toastr.success(this.isNewModel ? 'Thêm dữ liệu thành công' : 'Dữ liệu đã được chỉnh sửa', 'Thông báo!');
          if (isclose) {
            this.closeAddExpenseModal.nativeElement.click();
          }
        }
      } else {
        this.toastr.error("Lỗi xử lý hệ thống", 'Thông báo!');
      }
    }, err => {
      console.log(err);
    });
  }

  AddModel() {
    this.isNewModel = true;
  }

  EditModel(index: number) {
    this.isNewModel = false;
    this.objModel.UnitId = this.ListUnit[index].UnitId;
    this.objModel.UnitCode = this.ListUnit[index].UnitCode;
    this.objModel.UnitName = this.ListUnit[index].UnitName;
    this.objModel.Notes = this.ListUnit[index].Notes;
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
