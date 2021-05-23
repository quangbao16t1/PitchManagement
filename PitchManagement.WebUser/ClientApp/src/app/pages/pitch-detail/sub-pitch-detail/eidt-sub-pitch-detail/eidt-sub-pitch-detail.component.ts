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
import { PitchService } from 'src/app/services/pitch.service';
import { SubPitchDetailService } from 'src/app/services/sub-pitch-detail.service';
import { SubPitchService } from 'src/app/services/sub-pitch.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-eidt-sub-pitch-detail',
  templateUrl: './eidt-sub-pitch-detail.component.html',
})
export class EidtSubPitchDetailComponent implements OnInit {

  subPitch: SubPitch;
  subPitchDetail: SubPitchDetail;
  keyword: string;
  subPitchId: number;
  pitchId: any;
  spdId: any;
  editSpdForm: FormGroup;
  itemsAsync: Observable<any[]>;
  modalRef: BsModalRef;
  page: number;
  pageSize: number;
  total: number;
  subPitchSelect?: any;
  listSubPitch: any = [];
  listSubPitchDetail: any = [];
  startTime: { hour: number , minute: number };
  endTime: { hour: number , minute: number };
  newStartTime: string;
  newEndTime: string;
  timestartArray: any[];
  timesendArray: any[];
  constructor(
    public subPitchService: SubPitchService,
    private subPitchDetailService: SubPitchDetailService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private toastr: ToastrService,
  ) {
    this.editSpdForm = this.fb.group({
      subPitchId: ['', [Validators.required]],
      cost: ['', ValidationService.numberValidator],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe( params => {
      this.pitchId = params.get('pId');
      this.spdId = params.get('spdId');
      console.log(this.pitchId, 444);
      if (this.spdId) {
        this.subPitchDetailService.getSubPitchDetailById(this.spdId).subscribe(
          result => {
            console.log(result, 123456  );
            this.subPitchDetail = result;
            this.editSpdForm.controls.subPitchId.setValue(result.subPitchId);
            this.editSpdForm.controls.cost.setValue(result.cost);
            this.timestartArray = result.startTime.split(':').map((time) => +time);
            this.startTime = {hour: this.timestartArray[0], minute: this.timestartArray[1]};
            this.timesendArray = result.endTime.split(':').map((time) => +time);
            this.endTime = {hour: this.timesendArray[0], minute: this.timesendArray[1]};
          },
          () => {
            this.toastr.error(`Không tìm thấy khung giờ!`);
          });
          }
    });
  }

  onTimeChangeStartTime(value: {hour: string, minute: string}) {
     this.newStartTime = value.hour + ':' + value.minute ;
     console.log(this.newStartTime, 12346);
  }

  onTimeChangeEndTime(value: {hour: string, minute: string}) {
    console.log(value, 1111);
    this.newEndTime = value.hour + ':' + value.minute ;
    console.log(this.newEndTime, 2222);
 }

  getSubPitchByPitchId(pitchId: number) {
    this.subPitchService.getSbByPitchId(pitchId, this.keyword).subscribe(
      res => {
        this.listSubPitch = res;
        console.log(this.listSubPitch, 444455555);
      });
  }

  get getId() {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (user != null) {
      return user.id;
    }
  }

  editSubPitchDetail() {
    this.subPitchDetail = Object.assign({}, this.editSpdForm.value);
    // this.subPitchDetail.startTime = this.newStartTime;
    // this.subPitchDetail.endTime = this.newEndTime;
    this.subPitchDetailService.editSubPitchDetail(this.spdId, this.subPitchDetail).subscribe(
      () => {
        this.router.navigate([`/pitch-detail/${this.pitchId}/sub-pitch/sub-detail`]).then(() => {
          this.toastr.success('Cập nhật khung giờ thành công');
        });
      },
      (_error: HttpErrorResponse) => {
        this.toastr.error('Cập nhật khung giờ không thành công!');
      }
    );
  }

isPitcher(): boolean {
  const user = JSON.parse(localStorage.getItem(CURRENT_USER));
  if (user != null) {
    return user.groupRole === 'Pitcher';
  }
  return false;
}
get f() { return this.editSpdForm.controls; }
}
