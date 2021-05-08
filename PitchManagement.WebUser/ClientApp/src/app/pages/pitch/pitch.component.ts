import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
  page: number;
  pageSize: number;
  total: number;

  constructor(
    public pitchService: PitchService,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.keyword = '';
    this.page = 1;
    this.pageSize = 10;
    this.getAllPitches(this.page);
  }

  getAllPitches(page: number) {
    this.itemsAsync = this.pitchService.getAllPitches(this.keyword, page, this.pageSize)
      .pipe(
        tap(response => {
          this.total = response.total;
          this.page = page;
        }),
        map(response => response.items)
      );
  }

  add() {
    this.router.navigate(['/pitch/add']);
  }

  edit(id: any) {
    this.router.navigate(['/pitch/edit/' + id]);
  }

  getSybPitch(id: any) {
    this.router.navigate(['/pitch/sub-pitch/' + id]);
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
          this.getAllPitches(this.page);
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
    this.getAllPitches(this.page);
}

refresh() {
    this.keyword = '';
    this.getAllPitches(this.page);
}

}
