import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CURRENT_USER } from 'src/app/constants/db.keys';
import { UserUpdate } from 'src/app/models/user/userUpdate.model';
import { UserService } from 'src/app/services/user.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-edit-user-proflie',
  templateUrl: './edit-user-proflie.component.html',
})
export class EditUserProflieComponent implements OnInit {

  editUserForm: FormGroup;
  user: UserUpdate;
  id: any;
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
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.editUserForm = this.fb.group({
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
    this.route.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        this.userService.getUserById(this.getId).subscribe(
          result => {
            console.log(result);
            this.user = result;
            this.editUserForm.controls.email.setValue(result.email);
            this.editUserForm.controls.firstName.setValue(result.firstName);
            this.editUserForm.controls.lastName.setValue(result.lastName);
            this.editUserForm.controls.address.setValue(result.address);
            this.editUserForm.controls.phoneNumber.setValue(result.phoneNumber);
            this.editUserForm.controls.imageUrl.setValue(result.imageUrl);
            this.editUserForm.controls.gender.setValue(Boolean(result.gender));
            this.editUserForm.controls.groupUserId.setValue(this.getGroupUserIdByName(result.groupRole));
          },
          () => {
            this.toastr.error(`Không tìm thấy tài khoản này`);
          });
      }
    });
  }

  editUser() {
    this.user = Object.assign({}, this.editUserForm.value);
    this.user.gender = this.editUserForm.value.gender === 'true';
    this.user.groupUserId = Number(this.user.groupUserId);
    this.userService.editUser(this.id, this.user).subscribe(
      () => {
        this.router.navigate(['/user-profile']).then(() => {
          this.toastr.success('Cập nhật tài khoản thành công');
        });
      },
      (_error: HttpErrorResponse) => {
        this.toastr.error('Cập nhật tài khoản không thành công!');
      }
    );
  }

  get f() { return this.editUserForm.controls; }

  getGroupUserIdByName(name: string) {
    if (name === 'Admin') { return 1; }
    if (name === 'Pitcher') { return 2; }
    if (name === 'User') { return 3; }
  }

  get getId() {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (user != null) {
      return user.id;
    }

    return 0;
  }

}
