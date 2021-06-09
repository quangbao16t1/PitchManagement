import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CURRENT_USER } from 'src/app/constants/db.keys';
import { OrderPitchService } from 'src/app/services/order-pitch.service';
import { PitchService } from 'src/app/services/pitch.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
})
export class ManageOrderComponent implements OnInit {

  pitchSelected: any;
  listPitch: any[];
  itemsAsync: Observable<any[]>;
  page: number;
  pageSize: number;
  total: number;
  keyword: string;
  id: number;
  searchForm: FormGroup;
  orderPitch: any;
  modalRef: BsModalRef;

  constructor(
    private orderPitchService: OrderPitchService,
    private pitchService: PitchService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {
    this.searchForm = this.fb.group({
      date: ['', [Validators.required]],
      pitchId: ['']
    });
  }

  ngOnInit(): void {
    this.keyword = '';
    this.page = 1;
    this.pageSize = 10;
    console.log(this.getId);
    this.getPitchId();
  }

  getPitchId() {
    this.pitchService.getPitchByUserId(this.getId).subscribe( res => {
      this.listPitch = res;
    });
  }

  getOrderPitchByPitchId(pitchId: number, page: number) {
    this.itemsAsync = this.orderPitchService.getOrderPitchByPitchId(pitchId, 0, page, this.pageSize)
      .pipe(
        tap(response => {
          this.total = response.total;
          this.page = page;
        }),
        map(response => response.items)
      );
  }

  updateStatus(orderId: number, orderPitch: any) {
    Swal.fire({
      title: 'Chắc chắn thực hiện thao tác này??',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Chắc chắn',
      cancelButtonText: 'Hủy'
    }).then(result => {
      if (result.value) {
        this.orderPitchService.editOrderPitch(orderId, orderPitch).subscribe(
          () => {
            this.getOrderPitchByPitchId(this.pitchSelected, this.page);
            this.toastr.success('Xác nhận yêu cầu đặt sân thành công!');
        },
        (_error: HttpErrorResponse) =>
          this.toastr.error('Xác nhận yêu cầu không thành công!'));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  deleteConfirm(template: TemplateRef<any>, data: any) {
    this.orderPitch = Object.assign({}, data);
    this.modalRef = this.modalService.show(template);
  }

  close(): void {
    this.orderPitch = undefined;
    this.modalRef.hide();
}
  // confirm(): void {
  //   if (this.orderPitch) {
  //     this.orderPitchService.deleteOrderPitch(this.orderPitch.id)
  //     .subscribe(
  //       () => {
  //         this.toastr.success(`Xóa khung giờ thành công`);
  //         this.getOrderPitchByPitchId(this.pitchId, this.page);
  //       },
  //       (_error: HttpErrorResponse) => {
  //         this.toastr.error(`Xóa khung giờ không thành công`);
  //       }
  //     );
  //   }
  //   this.orderPitch = undefined;
  //   this.modalRef.hide();
  // }

  get getId() {
    const use = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (use !== null) {
      return use.id;
    }
    return 0;
  }

}
