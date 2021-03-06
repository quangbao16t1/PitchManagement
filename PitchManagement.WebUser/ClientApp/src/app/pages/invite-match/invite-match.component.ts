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
  matchSelected: any[];
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
        this.itemsAsync.subscribe(res => {
          this.matchSelected = res;
        });
      console.log(this.matchSelected, 444);
  }

  search() {
    this.getMatchByStatus(this.status, this.page);
}

  cancleCatchMatch(id: any, match: MatchForUpdate) {
    Swal.fire({
      title: 'B???n c?? ch???c ch???n t??? ch???i ?????i n??y?',
      text: 'B???n s??? kh??ng th??? ho??n t??c khi ???? x??c nh???n !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'T??? ch???i',
      cancelButtonText: 'H???y'
    }).then(result => {
      if (result.value) {
        this.matchService.destroyCatchMatch(id, match).subscribe(
          () => {
           {
            Swal.fire('T??? ch???i th??nh c??ng!', 'Tr???n ?????u c???a b???n ???? chuy???n sang tr???ng th??i ch??? ?????i !', 'success');
            this.getMatchByStatus(this.status, this.page);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('T??? ch???i th???t b???i', 'B???n kh??ng c?? quy???n t??? ch???i tr???n ?????u !', 'error');
      }
    });
  }
  confirmCatchMatch(id: any, match: MatchForUpdate) {
    Swal.fire({
      title: 'B???n c?? ch???c ch???n x??c nh???n ?????i n??y?',
      text: 'B???n s??? kh??ng th??? ho??n t??c khi ???? x??c nh???n !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'X??c nh???n',
      cancelButtonText: 'H???y'
    }).then(result => {
      if (result.value) {
        this.matchService.confirmCatchMatch(id, match).subscribe(
          () => {
            Swal.fire('X??c nh???n th??nh c??ng!', 'Hai ?????i ???? k???t n???i th??nh c??ng !', 'success');
            this.getMatchByStatus(this.status, this.page);
        },
        (_error: HttpErrorResponse) =>
            this.toastr.error('H???y tr???n ?????u kh??ng tha??nh c??ng!')
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
      title: 'B???n c?? ch???c ch???n h???y tr???n?',
      text: 'D??? li???u s??? kh??ng th??? ho??n t??c sau khi b???n x??a !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'X??a',
      cancelButtonText: 'H???y'
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
            this.toastr.success('H???y tr???n ?????u tha??nh c??ng!');
        },
        (_error: HttpErrorResponse) =>
            this.toastr.error('H???y tr???n ?????u kh??ng tha??nh c??ng!')
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
      title: 'B???n c?? ch???c ch???n mu???n h???y l???i m???i tr???n n??y kh??ng?',
      text: 'B???n s??? kh??ng th??? ho??n t??c khi ???? x??c nh???n !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'X??a l???i m???i',
      cancelButtonText: 'H???y'
    }).then(result => {
      if (result.value) {
        this.matchService.deleteMatch(id).subscribe(
          () => {
           {
            Swal.fire('H???y m???i tr???n th??nh c??ng!', 'success');
            this.getMatchByStatus(this.status, this.page);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('H???y m???i tr???n kh??ng th??nh c??ng!', 'error');
      }
    });
  }
}
