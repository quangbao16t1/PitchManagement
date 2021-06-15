import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Pitch } from 'src/app/models/pitch/pitch.model';
import { DistrictService } from 'src/app/services/district.service';
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
  listDistrict: any[];
  listStadium: any = [];
  districtSelect: any;
  districtId: number;

  constructor(
    public pitchService: PitchService,
    private districtService: DistrictService,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.keyword = '';
    this.page = 1;
    this.pageSize = 5;
    this.getAllPitches(this.page);
    this.districtService.getAllDistricts(this.keyword).subscribe((dis: any) => {
      this.listDistrict = dis;
      // console.log(this.listDistrict);
    });
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

  getSybPitch(id: any) {
    this.router.navigate([`/pitch/${id}/sub-pitch/`]);
  }

  // deleteConfirm(template: TemplateRef<any>, data: any) {
  //   this.pitch = Object.assign({}, data);
  //   this.modalRef = this.modalService.show(template);
  // }

  // confirm(): void {
  //   if (this.pitch) {
  //     this.pitchService.deletePitch(this.pitch.id)
  //     .subscribe(
  //       () => {
  //         this.getAllPitches(this.page);
  //         this.toastr.success(`Xóa sân thành công`);
  //       },
  //       (_error: HttpErrorResponse) => {
  //         this.toastr.error(`Xóa sân không thành công`);
  //       }
  //     );
  //   }
  //   this.pitch = undefined;
  //   this.modalRef.hide();
  // }

  close(): void {
    this.pitch = undefined;
    this.modalRef.hide();
}

search() {
    this.getAllPitches(this.page);
    if (this.districtId) {
      this.getPitchByDistrict(this.districtId, this.page);
    }
}

refresh() {
    this.keyword = '';
    this.districtId = null;
    this.getAllPitches(this.page);
}
getPitchByDistrict(districtId: number, page: number) {
  // this.districtSelect = this.listDistrict.find(i => i.id === districtId);
  if (this.districtId) {
    this.itemsAsync = this.pitchService.getPitchByDistrictPage(this.districtId, this.keyword, page, this.pageSize)
      .pipe(
        tap(response => {
          this.total = response.total;
          this.page = page;
        }),
        map(response => response.items)
      );
    }
}
choseCheckBox(event?: any) {
  this.districtId = event;
 this.search();
}
}
