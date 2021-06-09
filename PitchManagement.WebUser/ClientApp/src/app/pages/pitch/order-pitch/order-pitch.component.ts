import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CURRENT_USER } from 'src/app/constants/db.keys';
import { UserUpdate } from 'src/app/models/user/userUpdate.model';
import { OrderPitchService } from 'src/app/services/order-pitch.service';
import { SubPitchDetailService } from 'src/app/services/sub-pitch-detail.service';
import { SubPitchService } from 'src/app/services/sub-pitch.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-pitch',
  templateUrl: './order-pitch.component.html',
  styleUrls: ['./order-pitch.component.scss']
})
export class OrderPitchComponent implements OnInit {
  userOrderPitch: UserUpdate;
  subPitchDetail: any;
  listSubPitchDetail: any = [];
  subPitchSelected: number;
  pitch?: any;
  dateSelected: any;
  spdSelected?: any;
  subPitch: any;
  itemsAsync: Observable<any[]>;
  listSubPitch: any = [];
  formData?: any = {
    userOrder: '',
    phoneOrder: '',
    contentOrder: ''
  };
  subPitchDetailEmpty: any[];
  page: number;
  pageSize: number;
  total: number;
  keyword: string;
  id: number;
  dateForm: FormGroup;
  minDate = {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()};


  constructor(
    private orderPitchService: OrderPitchService,
    private subPitchService: SubPitchService,
    private subPitchDetailService: SubPitchDetailService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.dateForm = this.fb.group({
      date: ['', [Validators.required]],
      subPitchId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    console.log(this.minDate, 55331);
    this.keyword = '';
    this.page = 1;
    this.pageSize = 10;
    this.route.params.subscribe(params => {
      this.id = params.id;
      console.log(this.id);
      if (this.id) {
       this.getSubPitchByPitchId(this.id);
      }
    });
    this.getUserOrder();
  }

  dateSelectedEvt(event?: any) {
    this.dateSelected = event;
    const date = this.dateSelected.year + '-' + this.dateSelected.month + '-' + this.dateSelected.day;
    // const date = new Date();
    this.dateSelected = date;
    console.log(this.dateSelected, 123);
  }

  getSubPitchByPitchId(pitchId: number) {
    this.subPitchService.getSbByPitchId(pitchId, this.keyword).subscribe(
      res => {
        this.listSubPitch = res;
        console.log(this.listSubPitch, 4444);
      });
  }

  // getSubPitchDetailBySpId(subPitchId: number, page: number) {
  //   this.itemsAsync = this.subPitchDetailService.getSubPitchDetailBySpId(subPitchId, page, this.pageSize)
  //     .pipe(
  //       tap(response => {
  //         this.total = response.total;
  //         this.page = page;
  //       }),
  //       map(response => response.items)
  //       );
  //       console.log(this.itemsAsync, 88888);
  //       this.itemsAsync.subscribe(res => {
  //         if (res) {
  //           this.listSubPitchDetail = res;
  //           console.log(this.listSubPitchDetail, 4444);
  //         }
  //       });
  // }

  orderPitch() {
    Swal.fire({
      title: 'Xác nhận đặt sân này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy'
    }).then(result => {
      if (result.value) {
        // if (this.formData.userOrder === '' || this.formData.phoneOrder === '') {
        //   this.toaStr.error('Vui lòng nhập đầy đủ thông tin !', 'Lỗi');
        //   return;
        // }
        this.orderPitchService
          .createOrderPitch({
            subPitchDetailId: this.spdSelected.id,
            userId: this.getId,
            // dateOrder: new Date(this.dateSelected.year, this.dateSelected.month - 1, this.dateSelected.day),
            dateOrder: this.dateSelected,
            note: this.formData.contentOrder,
            userOrder: this.userOrderPitch.firstName + ' ' + this.userOrderPitch.lastName,
            phoneOrder: this.userOrderPitch.phoneNumber
          }).subscribe(
            () => {
              this.toastr.success('Đặt sân thành công');
              this.loadSpdEmpty(this.dateSelected, this.subPitchSelected);
            },
            (_error: HttpErrorResponse) =>
              this.toastr.error('Thông tin không hợp lệ, đặt sân không thành công!')
          );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  open(content?: any, spdId?: any) {
    this.subPitchDetailService.getSubPitchDetailById(spdId).subscribe(
      res => {
        this.spdSelected = res;
        console.log(this.spdSelected, 99999);
      }
    );
    // @ts-ignore
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then(
      result => {},
      reason => {}
    );
  }

  loadSpdEmpty(dateOrder: any, subPitchId: any) {
    this.subPitchDetailService.getSubPitchDetailEmpty(dateOrder, subPitchId).subscribe(res => {
      if (res) {
        this.subPitchDetailEmpty = res;
      }
      console.log(this.subPitchDetailEmpty, 11111);
    });
  }
  get getId() {
    const use = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (use !== null) {
      return use.id;
    }
    return 0;
  }
  getUserOrder() {
    this.userService.getUserById(this.getId).subscribe(
      res => {
        this.userOrderPitch = res;
        console.log(this.userOrderPitch, 8888);
      });
  }
}
