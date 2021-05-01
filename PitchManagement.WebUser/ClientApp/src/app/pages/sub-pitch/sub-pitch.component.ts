import { NgForOf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { CURRENT_USER } from 'src/app/constants/db.keys';
import { Pitch } from 'src/app/models/pitch/pitch.model';
import { SubPitch } from 'src/app/models/sub-pitch/sub-pitch.model';
import { PitchService } from 'src/app/services/pitch.service';
import { SubPitchService } from 'src/app/services/sub-pitch.service';

@Component({
  selector: 'app-sub-pitch',
  templateUrl: './sub-pitch.component.html',
})
export class SubPitchComponent implements OnInit {

  subPitch: SubPitch;
  pitch: Pitch;
  keyword: string;
  pitchId: number;
  itemsAsync: Observable<any[]>;
  modalRef: BsModalRef;
  page: number;
  pageSize: number;
  total: number;

  constructor(
    public subPitchService: SubPitchService,
    public pitchService: PitchService,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    // console.log(this.getId);
    this.keyword = '';
    this.page = 1;
    this.pageSize = 10;
    // this.getSubPitchByPitchId(this.getId, this.page);
    this.getPitchId();
  }

  getPitchId() {
    this.pitchService.getPitchId(this.getId).subscribe((res: number) => {
      this.pitchId = res;
      this.getSubPitchByPitchId(this.pitchId, this.page);
    });
  }

  get getId() {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (user != null) {
      return user.id;
    }
  }
  getSubPitchByPitchId(pitchId: number, page: number) {
    this.itemsAsync = this.subPitchService.getAllSubPitchByPitchId(this.pitchId, this.keyword, page, this.pageSize)
      .pipe(
        tap(response => {
          this.total = response.total;
          this.page = page;
        }),
        map(response => response.items)
      );
  }

  add() {
    this.router.navigate(['/sub-pitch/add']);
  }

  edit(id: any) {
    this.router.navigate(['/sub-pitch/edit/' + id]);
  }

  deleteConfirm(template: TemplateRef<any>, data: any) {
    this.subPitch = Object.assign({}, data);
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {
    if (this.subPitch) {
      this.subPitchService.deleteSubPitch(this.subPitch.id)
      .subscribe(
        () => {
          this.getSubPitchByPitchId(this.pitchId, this.page);
          this.toastr.success(`Xóa sân con thành công`);
        },
        (_error: HttpErrorResponse) => {
          this.toastr.error(`Xóa sân con không thành công`);
        }
      );
    }
    this.subPitch = undefined;
    this.modalRef.hide();
  }

  close(): void {
    this.subPitch = undefined;
    this.modalRef.hide();
}

search() {
    this.getPitchId();
}

searchCharacter() {
  this.itemsAsync = this.subPitchService.getAllSubPitchByPitchId(this.pitchId, this.keyword, this.page, this.pageSize)
      .pipe(
          debounceTime(1000),
          tap(response => {
              this.total = response.total;
          }),
          map(response => response.items)
      );
}

refresh() {
    this.keyword = '';
    this.getSubPitchByPitchId(this.pitchId, this.page);
}

}
