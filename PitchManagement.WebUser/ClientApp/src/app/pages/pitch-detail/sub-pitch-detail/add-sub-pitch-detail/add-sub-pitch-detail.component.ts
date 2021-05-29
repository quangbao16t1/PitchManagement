import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CURRENT_USER } from 'src/app/constants/db.keys';
import { Pitch } from 'src/app/models/pitch/pitch.model';
import { SubPitchDetail } from 'src/app/models/sub-pitch-detail/sub-pitch-detail.model';
import { SubPitch } from 'src/app/models/sub-pitch/sub-pitch.model';
import { SubPitchDetailService } from 'src/app/services/sub-pitch-detail.service';
import { SubPitchService } from 'src/app/services/sub-pitch.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-add-sub-pitch-detail',
  templateUrl: './add-sub-pitch-detail.component.html',
})
export class AddSubPitchDetailComponent implements OnInit {

  subPitch: SubPitch;
  pitch: Pitch;
  subPitchDetail: SubPitchDetail;
  keyword: string;
  subPitchId: number;
  pitchId: any;
  addSpdForm: FormGroup;
  itemsAsync: Observable<any[]>;
  modalRef: BsModalRef;
  page: number;
  pageSize: number;
  total: number;
  subPitchSelect?: any;
  listSubPitch: any = [];
  listSubPitchDetail: any = [];
  startTime = { hour: 0 , minute: 0 };
  endTime = { hour: 23 , minute: 59 };
  newStartTime: string;
  newEndTime: string;

  constructor(
    public subPitchService: SubPitchService,
    private route: ActivatedRoute,
    private subPitchDetailService: SubPitchDetailService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private toastr: ToastrService,
  ) {
    this.addSpdForm = this.fb.group({
      subPitchId: ['', [Validators.required]],
      cost: ['', ValidationService.numberValidator],
    });
  }

  ngOnInit() {
    this.keyword = '';
    this.page = 1;
    this.pageSize = 10;
    this.route.paramMap.subscribe( params => {
      this.pitchId = params.get('pId');
      console.log(this.pitchId, 444);
     if (this.pitchId) {
       this.getSubPitchByPitchId(this.pitchId);
     }
    });
  }

  onTimeChangeStartTime(value: {hour: string, minute: string}) {
     console.log(value, 12346);
     this.newStartTime = value.hour + ':' + value.minute ;
  }

  onTimeChangeEndTime(value: {hour: string, minute: string}) {
    console.log(value, 12346);
    this.newEndTime = value.hour + ':' + value.minute ;
 }

  getSubPitchByPitchId(pitchId: number) {
    this.subPitchService.getSbByPitchId(pitchId, this.keyword).subscribe(
      res => {
        this.listSubPitch = res;
        console.log(this.listSubPitch, 4444);
      });
  }

  get getId() {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (user != null) {
      return user.id;
    }
  }

  getSubPitchDetailBySpId(subPitchId: number, page: number) {
    this.subPitchSelect = this.listSubPitch.find(i => i.id === subPitchId);
    this.itemsAsync = this.subPitchDetailService.getSubPitchDetailBySpId(subPitchId, page, this.pageSize)
      .pipe(
        tap(response => {
          this.total = response.total;
          this.page = page;
        }),
        map(response => response.items)
        );
        console.log(this.itemsAsync, 88888);
        this.itemsAsync.subscribe(res => {
          if (res) {
            this.listSubPitchDetail = res;
            console.log(this.listSubPitchDetail, 4444);
          }
        });
  }

  addSubPitchDetail() {
    this.subPitchDetail = Object.assign({}, this.addSpdForm.value);
    this.subPitchDetail.startTime = this.newStartTime;
    this.subPitchDetail.endTime = this.newEndTime;
    this.subPitchDetailService.createSubPitchDetail(this.subPitchDetail).subscribe(
      () => {
        this.router.navigate([`/pitch-detail/${this.pitchId}/sub-pitch/sub-detail`]).then(() => {
          this.toastr.success('Thêm khung giờ thành công');
        });
      },
      (_error: HttpErrorResponse) =>
        this.toastr.error('Khung giờ đã tồn tại!Thêm khung giờ không thành công!')
      );
  }

isPitcher(): boolean {
  const user = JSON.parse(localStorage.getItem(CURRENT_USER));
  if (user != null) {
    return user.groupRole === 'Pitcher';
  }
  return false;
}
}
