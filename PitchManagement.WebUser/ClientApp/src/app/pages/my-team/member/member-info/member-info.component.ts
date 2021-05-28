import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CURRENT_USER } from 'src/app/constants/db.keys';
import { UserService } from 'src/app/services/user.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
})
export class MemberInfoComponent implements OnInit {

  profileForm: FormGroup;
  user: any;
  teamId: any;
  userId: number;
  keyword: string;
  modalRef: BsModalRef;
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
      email: [{value: '', disabled: true}],
      firstName: [{value: '', disabled: true}],
      lastName: [{value: '', disabled: true}],
      address: [{value: '', disabled: true}],
      phoneNumber: [{value: '', disabled: true}],
      imageUrl: [{value: '', disabled: true}],
      gender: [{value: '', disabled: true}],
      // groupUserId: []
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params.userId;
      this.teamId = params.pId;
      if (this.userId) {
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
                // this.profileForm.controls.groupUserId.setValue(this.getGroupUserIdByName(result.groupRole));
              },
              () => {
                this.toastr.error(`Không tìm thấy tài khoản này`);
              });
      }
    });
}
member() {
  this.router.navigate([`/team/${this.teamId}/member`]);
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
