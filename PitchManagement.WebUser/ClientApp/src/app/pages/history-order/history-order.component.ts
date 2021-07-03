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
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-history-order',
  templateUrl: './history-order.component.html',
})
export class HistoryOrderComponent implements OnInit {
  pitchId: number;
  itemsAsync: Observable<any[]>;
  itemsAsync1: Observable<any[]>;
  page: number;
  pageSize: number;
  total: number;
  keyword: string;
  id: number;
  searchForm: FormGroup;
  orderPitch: any;
  modalRef: BsModalRef;
  userLogin: any;
  pitchSelected: any;
  listPitch: any[];
  dateSelected: any;

  constructor(
    private orderPitchService: OrderPitchService,
    private pitchService: PitchService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {
    this.searchForm = this.fb.group({
      date: ['', [Validators.required]],
      pitchId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.keyword = '';
    this.page = 1;
    this.pageSize = 10;
    console.log(this.getId);
    if (this.isPitcher()) {
      this.pitchService.getPitchByUserId(this.getId).subscribe(res => {
        this.listPitch = res;
      });
    }
    if (this.isUser()) {
      this.getOrderPitchByUserId(this.getId, this.page);
    }
  }

  getOrderPitchByUserId(userId: number, page: number) {
    this.itemsAsync = this.orderPitchService.getAllOrderPitchByUserId(userId, page, this.pageSize)
      .pipe(
        tap(response => {
          this.total = response.total;
          this.page = page;
        }),
        map(response => response.items)
      );
  }
  getOrderPitchByPitchId(pitchId: number, page: number) {
    this.itemsAsync1 = this.orderPitchService.getHistoryOrderpitcher(pitchId, page, this.pageSize)
      .pipe(
        tap(response => {
          this.total = response.total;
          this.page = page;
        }),
        map(response => response.items)
      );
  }

  getOrderPitchByDateUserId(dateOrder: any, userId: any, page: number) {
    console.log(123);
    this.itemsAsync = this.orderPitchService.getOrderPitchByDateUserId(dateOrder, userId, page, this.pageSize)
      .pipe(
        tap(response => {
          this.total = response.total;
          this.page = page;
        }),
        map(response => response.items)
      );
  }

  getOrderPitchByDatePitchId(dateOrder: any, pitchId: any, page: number) {
    console.log(this.pitchSelected);
    this.itemsAsync1 = this.orderPitchService.getOrderPitchByDatePitchId(dateOrder, pitchId, page, this.pageSize)
      .pipe(
        tap(response => {
          this.total = response.total;
          this.page = page;
        }),
        map(response => response.items)
      );
  }

  dateSelectedEvt(event?: any) {
    this.dateSelected = event;
    const date = this.dateSelected.year + '-' + this.dateSelected.month + '-' + this.dateSelected.day;
    // const date = new Date();
    this.dateSelected = date;
    console.log(this.dateSelected, 123);
  }

  deleteConfirm(template: TemplateRef<any>, data: any) {
    this.orderPitch = Object.assign({}, data);
    this.modalRef = this.modalService.show(template);
  }

  close(): void {
    this.orderPitch = undefined;
    this.modalRef.hide();
}
  confirm(): void {
    if (this.orderPitch) {
      this.orderPitchService.deleteOrderPitch(this.orderPitch.id)
      .subscribe(
        () => {
          this.toastr.success(`Xóa yêu cầu đặt sân thành công!`);
          this.getOrderPitchByUserId(this.getId, this.page);
        },
        (_error: HttpErrorResponse) => {
          this.toastr.error(`Xóa yêu cầu đặt sân không thành công!`);
        }
      );
    }
    this.orderPitch = undefined;
    this.modalRef.hide();
  }
  get getId() {
    const use = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (use !== null) {
      return use.id;
    }
    return 0;
  }

  isPitcher(): boolean {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (user != null) {
      return user.groupRole === 'Pitcher';
    }
  return false;
  }

  isUser(): boolean {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (user != null) {
      return user.groupRole === 'User';
    }
  return false;
  }
}
