import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Pitch } from 'src/app/models/pitch/pitch.model';
import { PitchService } from 'src/app/services/pitch.service';

@Component({
  selector: 'app-pitch',
  templateUrl: './pitch.component.html',
})
export class PitchComponent implements OnInit {
  pitch: Pitch;
  keyword: string;
  itemsAsync: Observable<any[]>;
  modalRef: BsModalRef;

  constructor(
    public pitchService: PitchService,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.keyword = '';
    this.getAllPitches();
  }

  getAllPitches() {
    this.itemsAsync = this.pitchService.getAllPitches(this.keyword);
  }

  add() {
    this.router.navigate(['/pitch/add']);
  }

  edit(id: any) {
    this.router.navigate(['/pitch/edit' + id]);
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
          this.getAllPitches();
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

search() {
    this.getAllPitches();
}

refresh() {
    this.keyword = '';
    this.getAllPitches();
}

}
