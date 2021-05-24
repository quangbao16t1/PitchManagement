import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { Match } from 'src/app/models/match/match.model';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-list-catch',
  templateUrl: './list-catch.component.html',
  styleUrls: ['./list-catch.component.css']
})
export class ListCatchComponent implements OnInit {

  match: Match;
  keyword: string;
  pitchId: number;
  itemsAsync: Observable<any[]>;
  modalRef: BsModalRef;
  page: number;
  pageSize: number;
  total: number;

  constructor(
    public matchService: MatchService,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.keyword = '';
    this.page = 1;
    this.pageSize = 10;
    this.getListCatches(this.page);
  }

  getListCatches(page: number) {
    this.itemsAsync = this.matchService.getListCacthes(this.keyword, page, this.pageSize)
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
    this.match = Object.assign({}, data);
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {
    if (this.match) {
      this.matchService.deleteMatch(this.match.id)
      .subscribe(
        () => {
          this.getListCatches(this.page);
          this.toastr.success(`Xóa sân con thành công`);
        },
        (_error: HttpErrorResponse) => {
          this.toastr.error(`Xóa sân con không thành công`);
        }
      );
    }
    this.match = undefined;
    this.modalRef.hide();
  }

  close(): void {
    this.match = undefined;
    this.modalRef.hide();
}

search() {
    this.getListCatches(this.page);
}

searchCharacter() {
  this.itemsAsync = this.matchService.getListCacthes(this.keyword, this.page, this.pageSize)
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
    this.getListCatches(this.page);
}


}
