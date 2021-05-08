import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { CURRENT_USER } from 'src/app/constants/db.keys';
import { TeamUser } from 'src/app/models/team/teamUser.model';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
})
export class MemberComponent implements OnInit {

  team: TeamUser;
  teamId: number;
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
    this.getTeamId();
  }

  getTeamId() {
    this.teamService.getTeamByUserId(this.getId).subscribe((res: any) => {
      this.teamId = res.id;
      console.log(this.teamId, 555);
      console.log(res.id, 777);
      this.getMember(this.teamId, this.page);
    });
  }

  get getId() {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (user != null) {
      return user.id;
    }
  }
  getMember(teamId: number, page: number) {
    this.itemsAsync = this.teamService.getMember(teamId, this.keyword, page, this.pageSize)
      .pipe(
        tap(response => {
          this.total = response.total;
          this.page = page;
        }),
        map(response => response.items)
      );
  }

  addMember() {
    this.router.navigate(['/team/member/add']);
  }

  edit(id: any) {
    this.router.navigate(['/sub-pitch/edit/' + id]);
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
          this.getMember(this.teamId, this.page);
          this.toastr.success(`Xóa thành viên thành công`);
        },
        (_error: HttpErrorResponse) => {
          this.toastr.error(`Xóa thành viên không thành công`);
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
    this.getMember(this.teamId, this.page);
}

searchCharacter() {
  this.itemsAsync = this.teamService.getMember(this.teamId, this.keyword, this.page, this.pageSize)
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
    this.getMember(this.teamId, this.page);
}


}
