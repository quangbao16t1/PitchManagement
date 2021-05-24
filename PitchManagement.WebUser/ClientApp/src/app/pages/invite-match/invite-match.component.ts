import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CURRENT_USER } from 'src/app/constants/db.keys';
import { MatchForUpdate } from 'src/app/models/match/matchForUpdate.model';
import { UserUpdate } from 'src/app/models/user/userUpdate.model';
import { MatchService } from 'src/app/services/match.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invite-match',
  templateUrl: './invite-match.component.html',
})
export class InviteMatchComponent implements OnInit {

  match: MatchForUpdate;
  userInvite: any;
  userRevive: any;
  listUserInvite: any[];
  listUserRevive: any[];
  keyword: string;
  pitchId: number;
  itemsAsync: Observable<any[]>;
  modalRef: BsModalRef;
  page: number;
  pageSize: number;
  total: number;
  status: any = -1;
  constructor(
    public matchService: MatchService,
    public userService: UserService,
    private router: Router,
    private modalService: BsModalService,
    private modalService1: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.keyword = '';
    this.page = 1;
    this.pageSize = 10;
    this.getMatchByStatus(this.status, this.page);
    console.log(this.getId);
  }

  getMatchByStatus(status: number, page: number) {
    this.itemsAsync = this.matchService.getMatchByStatus(status, this.keyword, page, this.pageSize)
      .pipe(
        tap(response => {
          this.total = response.total;
          this.page = page;
        }),
        map( response =>  response.items)
        );
      console.log(this.itemsAsync, 444);
  }

  search() {
    this.getMatchByStatus(this.status, this.page);
}

  cancleCatchMatch(id: any, match: MatchForUpdate) {
    Swal.fire({
      title: 'Bạn có chắc chắn từ chối đối này?',
      text: 'Bạn sẽ không thể hoàn tác khi đã xác nhận !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Từ chối',
      cancelButtonText: 'Hủy'
    }).then(result => {
      if (result.value) {
        this.matchService.destroyCatchMatch(id, match).subscribe(
          () => {
           {
            Swal.fire('Từ chối thành công!', 'Trận đấu của bạn đã chuyển sang trạng thái chờ đối !', 'success');
            this.getMatchByStatus(this.status, this.page);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Từ chối thất bại', 'Bạn không có quyền từ chối trận đấu !', 'error');
      }
    });
  }
  confirmCatchMatch(id: any, match: MatchForUpdate) {
    Swal.fire({
      title: 'Bạn có chắc chắn xác nhận đối này?',
      text: 'Bạn sẽ không thể hoàn tác khi đã xác nhận !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy'
    }).then(result => {
      if (result.value) {
        this.matchService.confirmCatchMatch(id, match).subscribe(
          () => {
            Swal.fire('Xác nhận thành công!', 'Hai đội đã kết nối thành công !', 'success');
            this.getMatchByStatus(this.status, this.page);
        },
        (_error: HttpErrorResponse) =>
            this.toastr.error('Hủy trận đấu không thành công!')
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }
  deleteConfirm(template: TemplateRef<any>, data: any) {
    this.match = Object.assign({}, data);
    this.modalRef = this.modalService.show(template);
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
          inviteeId: this.getId,
          receiverId: match.receiverId,
          area: match.area ,
          note: match.note,
        };
        this.matchService.cancelMatch(id, matchUpdate).subscribe(
          () => {
            this.getMatchByStatus(this.status, this.page);
            this.toastr.success('Hủy trận đấu thành công!');
        },
        (_error: HttpErrorResponse) =>
            this.toastr.error('Hủy trận đấu không thành công!')
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  get getId() {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (user != null) {
      return user.id;
    }
    return 0;
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
            this.getMatchByStatus(this.status, this.page);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Hủy mời trận không thành công!', 'error');
      }
    });
  }
}
