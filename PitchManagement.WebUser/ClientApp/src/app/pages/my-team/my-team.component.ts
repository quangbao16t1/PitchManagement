import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { TeamUser } from 'src/app/models/team/teamUser.model';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
})
export class MyTeamComponent implements OnInit {

  team: TeamUser;
  keyword: string;
  itemsAsync: Observable<any[]>;
  modalRef: BsModalRef;
  page: number;
  pageSize: number;
  total: number;

  constructor(
    public teamService: TeamService,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.keyword = '';
    this.page = 1;
    this.pageSize = 10;
    this.getAllTeames(this.page);
  }

  getAllTeames(page: number) {
    this.itemsAsync = this.teamService.getAllTeames(this.keyword, page, this.pageSize)
      .pipe(
        tap(response => {
          this.total = response.total;
          this.page = page;
        }),
        map(response => response.items)
      );
  }

  add() {
    this.router.navigate(['/team/add']);
  }

  edit(id: any) {
    this.router.navigate(['/team/edit' + id]);
  }

  deleteConfirm(template: TemplateRef<any>, data: any) {
    this.team = Object.assign({}, data);
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {
    if (this.team) {
      this.teamService.deleteTeam(this.team.id)
      .subscribe(
        () => {
          this.getAllTeames(this.page);
          this.toastr.success(`Xóa đội bóng thành công`);
        },
        (_error: HttpErrorResponse) => {
          this.toastr.error(`Xóa đội bóng không thành công`);
        }
      );
    }
    this.team = undefined;
    this.modalRef.hide();
  }

  close(): void {
    this.team = undefined;
    this.modalRef.hide();
}

search() {
    this.getAllTeames(this.page);
}

searchCharacter() {
  this.itemsAsync = this.teamService.getAllTeames(this.keyword, this.page, this.pageSize)
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
    this.getAllTeames(this.page);
}

}
