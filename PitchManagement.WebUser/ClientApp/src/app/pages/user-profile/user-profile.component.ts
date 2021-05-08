import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ActionSequence } from 'selenium-webdriver';
import { CURRENT_USER } from 'src/app/constants/db.keys';
import { User, UserForList } from 'src/app/models/user/user.model';
import { UserUpdate } from 'src/app/models/user/userUpdate.model';
import { UserService } from 'src/app/services/user.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  isOpenChangePassForm: any = false;
  profileForm: FormGroup;
  user: UserUpdate;
  userId: number;
  keyword: string;
  itemsAsync: Observable<any[]>;
  modalRef: BsModalRef;
  groupUser: Observable<any[]>;
  roles1: any[] = [
    { key: 1, value: ['Admin'] },
    { key: 2, value: ['Pitcher'] },
    { key: 3, value: ['User'] },
  ];
  genders: any[] = [
    { key: false, value: ['Nữ'] },
    { key: true, value: ['Nam'] }
  ];

  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {
    this.profileForm = this.fb.group({
      email: ['', [ValidationService.emailValidator]],
      firstName: [''],
      lastName: [''],
      address: [''],
      phoneNumber: ['', ValidationService.phonenumberValidator],
      imageUrl: [''],
      gender: [''],
      groupUserId: []
    });
  }

  ngOnInit() {
    this.userService.getUserById(this.getId).subscribe(
      result => {
            console.log(result);
            this.user = result;
            this.profileForm.controls.email.setValue(result.email);
            this.profileForm.controls.firstName.setValue(result.firstName);
            this.profileForm.controls.lastName.setValue(result.lastName);
            this.profileForm.controls.address.setValue(result.address);
            this.profileForm.controls.phoneNumber.setValue(result.phoneNumber);
            this.profileForm.controls.imageUrl.setValue(result.imageUrl);
            this.profileForm.controls.gender.setValue(Boolean(result.gender));
            this.profileForm.controls.groupUserId.setValue(this.getGroupUserIdByName(result.groupRole));
          },
          () => {
            this.toastr.error(`Không tìm thấy tài khoản này`);
          });
      }

  getUserById(userId: number) {
    this.itemsAsync = this.userService.getUserById(this.getId);
  }

  edit(id: any) {
    this.router.navigate(['/user-profile/edit/' + id]);
  }

  get getId() {
  const user = JSON.parse(localStorage.getItem(CURRENT_USER));
  if (user != null) {
    return user.id;
  }

  return 0;
}

 getGroupUserIdByName(name: string) {
  if (name === 'Admin') { return 1; }
  if (name === 'Pitcher') { return 2; }
  if (name === 'User') { return 3; }
}
  get f() {
    return this.profileForm.controls;
  }

}
