import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable, pipe } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { Match } from 'src/app/models/match/match.model';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-list-match',
  templateUrl: './list-match.component.html',
})
export class ListMatchComponent implements OnInit {

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
    this.getAllMatches(this.page);
  }

  getAllMatches(page: number) {
    this.itemsAsync = this.matchService.getAllMatches(this.keyword, page, this.pageSize)
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
          this.getAllMatches(this.page);
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
    this.getAllMatches(this.page);
}

searchCharacter() {
  this.itemsAsync = this.matchService.getAllMatches(this.keyword, this.page, this.pageSize)
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
    this.getAllMatches(this.page);
}

}
