import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CURRENT_USER } from 'src/app/constants/db.keys';
import { User } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
})
export class UserManagementComponent implements OnInit {
  user: User;
  keyword: string;
  itemsAsync: Observable<any[]>;
  modalRef: BsModalRef;

  constructor(
    public userService: UserService,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    // if (this.getId !== 1) {
    //   this.router.navigate(['/home']);
    // }
    this.keyword = '';
    this.getAllUsers();
  }

  getAllUsers() {
    this.itemsAsync = this.userService.getAllUsers(this.keyword);
  }

  add() {
    this.router.navigate(['/users/add']);
  }

  edit(id: any) {
    this.router.navigate(['/users/edit/' + id]);
  }

  deleteConfirm(template: TemplateRef<any>, data: any) {
    this.user = Object.assign({}, data);
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {
    if (this.user) {
      this.userService.deleteUser(this.user.id)
        .subscribe(
          () => {
            this.getAllUsers();
            this.toastr.success(`Xóa tài khoản thành công`);
          },
          (_error: HttpErrorResponse) => {
            // tslint:disable-next-line:prefer-const
            let _errors: any;

            if (!_errors.length) {
              _errors.push(`Xóa tài khoản không thành công!`);
            }

            this.toastr.error(_errors.join(','));
          }
        );
    }
    this.user = undefined;
    this.modalRef.hide();
  }

  close(): void {
    this.user = undefined;
    this.modalRef.hide();
  }

  search() {
    this.getAllUsers();
  }

  refresh() {
    this.keyword = '';
    this.getAllUsers();
  }

  get getId() {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (user != null) {
      return user.id;
    }

    return 0;
  }
}
