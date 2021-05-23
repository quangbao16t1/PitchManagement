import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CURRENT_USER } from 'src/app/constants/db.keys';
import { Pitch } from 'src/app/models/pitch/pitch.model';
import { PitchService } from 'src/app/services/pitch.service';

@Component({
  selector: 'app-pitch-detail',
  templateUrl: './pitch-detail.component.html',
})
export class PitchDetailComponent implements OnInit {
  isOpenListPitch: any = true;
  pitch: Pitch;
  userId: any;
  itemsAsync: Observable<any[]>;
  modalRef: BsModalRef;

  constructor(
    public pitchService: PitchService,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    console.log(this.getId);
    this.getPitchByUserId(this.getId);
  }

  getPitchByUserId(userId: any) {
    this.itemsAsync = this.pitchService.getPitchByUserId(this.getId);
  }
  add() {
    this.router.navigate(['/pitch-detail/add']);
  }
  edit(id: any) {
    this.router.navigate(['/pitch-detail/edit' + id]);
  }

  orderPitch(pitchId: any) {
    console.log('qua chưa?', 123213);
    this.router.navigate([`/pitch-detail${pitchId}/sub-pitch`]);
  }

  deleteConfirm(template: TemplateRef<any>, data: any) {
    this.pitch = Object.assign({}, data);
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {
    if (this.pitch) {
      this.pitchService.deletePitch(this.pitch.id)
      .subscribe(
        () => {
          this.getPitchByUserId(this.userId);
          this.toastr.success(`Xóa sân thành công`);
        },
        (_error: HttpErrorResponse) => {
          this.toastr.error(`Xóa sân không thành công`);
        }
      );
    }
    this.pitch = undefined;
    this.modalRef.hide();
  }

  close(): void {
    this.pitch = undefined;
    this.modalRef.hide();
}
get getId() {
  const user = JSON.parse(localStorage.getItem(CURRENT_USER));
  if (user != null) {
    return user.id;
  }

  return 0;
}
}
