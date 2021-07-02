import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { MatchService } from 'src/app/services/match.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CURRENT_USER } from 'src/app/constants/db.keys';
import { UserService } from 'src/app/services/user.service';
import { UserUpdate } from 'src/app/models/user/userUpdate.model';
import { MatchForUpdate } from 'src/app/models/match/matchForUpdate.model';
import { HttpErrorResponse } from '@angular/common/http';
import { TeamUser } from 'src/app/models/team/teamUser.model';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-find-match',
  templateUrl: './find-match.component.html',
})
export class FindMatchComponent implements OnInit {

  match: MatchForUpdate;
  teamUser: Observable<any[]>;
  user: UserUpdate;
  keyword: string;
  pitchId: number;
  itemsAsync: Observable<any[]>;
  itemsAsync1: Observable<any[]>;
  modalRef: BsModalRef;
  page: number;
  pageSize: number;
  total: number;
  type?: string;
  level?: string;
  listLevel?: any[] = [];
  listType?: any[] = [];
  listDistrict?: any[] = [];
  loadingCatch = false;
  listTeamUser: any[];

  // level: any[] = [
  //   { key: 'yếu', value: ['Yếu'] },
  //   { key: 'Trung bình yếu', value: ['Trung bình yếu'] },
  //   { key: 'Trung bình', value: ['Trung bình'] },
  //   { key: 'Khá', value: ['Khá'] },
  //   { key: 'Khá', value: ['Mạnh'] }
  // ];

  constructor(
    public matchService: MatchService,
    public userService: UserService,
    private router: Router,
    private modalService: BsModalService,
    private modalService1: NgbModal,
    private toastr: ToastrService,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.keyword = '';
    this.page = 1;
    this.pageSize = 10;
    if(this.isUser()) {
      this.getListCatches(this.page);
    }
    console.log(this.getId);
    this.getUserById(this.getId);
    this.teamService.getTeamByUser(this.getId).subscribe((res: any) => {
      this.listTeamUser = res;
      console.log(this.listTeamUser, 1111);
    });
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
      console.log(this.itemsAsync, 444);
  }

  search() {
    this.getListCatches(this.page);
}

deleteMatch(id: any) {
  Swal.fire({
    title: 'Bạn có chắc chắn muốn hủy lời mời trận này không?',
    text: 'Bạn sẽ không thể hoàn tác khi đã xác nhận !',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Xóa lời mời',
    cancelButtonText: 'Hủy'
  }).then(result => {
    if (result.value) {
      this.matchService.deleteMatch(id).subscribe(
        () => {
         {
          Swal.fire('Hủy mời trận thành công!', 'success');
          this.getListCatches(this.page);
        }
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Hủy mời trận không thành công!', 'error');
    }
  });
}

cancelMatch(id: any, match: MatchForUpdate) {
  Swal.fire({
    title: 'Bạn có chắc chắn hủy trận?',
    text: 'Dữ liệu sẽ không thể hoàn tác sau khi bạn xóa !',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy'
  }).then(result => {
    if (result.value) {
      const matchUpdate = {
        setUpTime: match.setupTime ,
        teamId: match.teamId,
        type: match.type,
        pitchId: match.pitchId,
        covenant: match.covenant,
        level: match.level,
        invitation: match.invitation,
        inviteeId: match.inviteeId,
        receiverId: match.receiverId,
        area: match.area ,
        note: match.note,
      };
      this.matchService.cancelMatch(id, matchUpdate).subscribe(
        () => {
          this.getListCatches(this.page);
          this.toastr.success('Hủy trận đấu thành công!');
      },
      (_error: HttpErrorResponse) =>
          this.toastr.error('Hủy trận đấu không thành công!')
      );
    } else if (result.dismiss === Swal.DismissReason.cancel) {
    }
  });
}

open(content: any, m: any) {
  this.modalService1.open(content, { centered: true });
  this.match = m;
}

catchMatch() {
  if (this.match) {
    this.match.receiverId = this.getId;
    console.log(this.match);
    this.matchService.catchMatch(this.match.id, this.match).subscribe(
      () => {
        this.loadingCatch = false;
        this.modalService1.dismissAll();
        this.toastr.success('Bắt đối thành công ! Vui lòng chờ xác nhận', 'Thành công');
        this.search();
    },
    (_error: HttpErrorResponse) =>
        this.toastr.error('Lỗi trong quá trình xử lý bắt đối', 'Thất bai')
    );
  }
}

  checkOverTime(setupTime: any) {
    if (new Date(setupTime).getTime() < new Date().getTime()) {
      // quá hạn
      return false;
      } else {
        return true;
      }
  }

  get getId() {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (user != null) {
      return user.id;
    }
    return 0;
  }
  getUserById(id: any) {
    this.userService.getUserById(id).subscribe(res => {
      this.user = res;
      console.log(this.user);
    });
  }
  getTeamByUserId() {
    this.teamUser = this.teamService.getTeamByUserId(this.getId);
  }
  isUser(): boolean {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (user != null) {
      return user.groupRole === 'User';
    }
  return false;
  }
}
