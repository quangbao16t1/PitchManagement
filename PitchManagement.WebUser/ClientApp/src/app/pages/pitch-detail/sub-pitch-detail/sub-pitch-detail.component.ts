import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { CURRENT_USER } from 'src/app/constants/db.keys';
import { Pitch } from 'src/app/models/pitch/pitch.model';
import { SubPitch } from 'src/app/models/sub-pitch/sub-pitch.model';
import { PitchService } from 'src/app/services/pitch.service';
import { SubPitchDetailService } from 'src/app/services/sub-pitch-detail.service';
import { SubPitchService } from 'src/app/services/sub-pitch.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-sub-pitch-detail',
  templateUrl: './sub-pitch-detail.component.html',
})
export class SubPitchDetailComponent implements OnInit {

  subPitch: SubPitch;
  pitch: Pitch;
  subPitchDetail: any;
  keyword: string;
  subPitchId: number;
  pitchId: any;
  spId: any;
  spdForm: FormGroup;
  itemsAsync: Observable<any[]>;
  modalRef: BsModalRef;
  page: number;
  pageSize: number;
  total: number;
  subPitchSelect?: any;
  listSubPitch: any = [];
  listSubPitchDetail: any = [];
  itemCostSelected: any;

  constructor(
    public subPitchService: SubPitchService,
    private pitchService: PitchService,
    private subPitchDetailService: SubPitchDetailService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {
    this.spdForm = this.fb.group({
      subPitchId: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.keyword = '';
    this.page = 1;
    this.pageSize = 10;
    this.route.paramMap.subscribe( params => {
      this.pitchId = params.get('pId');
      this.spId = params.get('spId');
      console.log(this.pitchId, 444);
     if (this.pitchId) {
       this.getSubPitchByPitchId(this.pitchId);
       this.getSubPitchDetailBySpId1(this.spId, this.page);
     }
    });
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

  getSubPitchDetailBySpId1(subPitchId: number, page: number) {
    this.itemsAsync = this.subPitchDetailService.getSubPitchDetailBySpId(subPitchId, page, this.pageSize)
      .pipe(
        tap(response => {
          this.total = response.total;
          this.page = page;
        }),
        map(response => response.items)
        );
  }

  // getSubPitchDetailBySpId(subPitchId: number, page: number) {
  //   this.subPitchSelect = this.listSubPitch.find(i => i.id === subPitchId);
  //   this.subPitchId = subPitchId;
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

  add(id: any) {
    this.router.navigate([`/pitch-detail/${this.pitchId}/sub-pitch/${id}/sub-detail/add`]);
  }
  detail() {
    this.router.navigate([`/pitch-detail/${this.pitchId}/sub-pitch/sub-detail`]);
  }
  
  edit(id: any) {
    this.router.navigate([`/pitch-detail/${this.pitchId}/sub-pitch/${this.spId}/sub-detail/${id}/edit`]);
  }
  deleteConfirm(template: TemplateRef<any>, data: any) {
    this.subPitchDetail = Object.assign({}, data);
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {
    if (this.subPitchDetail) {
      this.subPitchDetailService.deleteSubPitchDetail(this.subPitchDetail.id)
      .subscribe(
        () => {
          this.toastr.success('Xóa khung giờ thành công!');
          this.getSubPitchDetailBySpId1(this.spId, this.page);
        },
        (_error: HttpErrorResponse) => {
          this.toastr.error(`Xóa khung giờ không thành công`);
        }
      );
    }
    this.subPitchDetail = undefined;
    this.modalRef.hide();
  }

  close(): void {
    this.subPitchDetail = undefined;
    this.modalRef.hide();
}

// search() {
//     this.getPitchId();
// }

searchCharacter() {
  this.itemsAsync = this.subPitchService.getAllSubPitchByPitchId(this.subPitchId, this.keyword, this.page, this.pageSize)
      .pipe(
          debounceTime(1000),
          tap(response => {
              this.total = response.total;
          }),
          map(response => response.items)
      );
}

// refresh() {
//     this.keyword = '';
//     this.getSubPitchByPitchId(this.pitchId, this.page);
// }

isPitcher(): boolean {
  const user = JSON.parse(localStorage.getItem(CURRENT_USER));
  if (user != null) {
    return user.groupRole === 'Pitcher';
  }
return false;
}
}
