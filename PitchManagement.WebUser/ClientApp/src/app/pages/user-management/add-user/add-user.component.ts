import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CURRENT_USER } from 'src/app/constants/db.keys';
import { UserService } from 'src/app/services/user.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;
  user: any;
  roles1: any[] = [
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
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.addUserForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, ValidationService.passwordValidator]],
      passwordAgain: ['', [Validators.required, ValidationService.passwordMatch]],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: ['', ValidationService.phonenumberValidator],
      gender: [true],
      imageUrl: [''],
      groupUserId: [3]
    });
  }

  ngOnInit() {
    if (this.getId !== 1) {
      this.router.navigate(['/home']);
    }
  }

  addUser() {
    this.user = Object.assign({}, this.addUserForm.value);
    this.user.groupUserId = Number(this.user.groupUserId);
    this.userService.createUser(this.user).subscribe(
      () => {
        this.router.navigate(['/users']).then(() => {
          this.toastr.success('Tạo tài khoản thành công');
        });
      },
      (_error: HttpErrorResponse) =>
        this.toastr.error('Tạo tài khoản không thành công!')
      );
  }

  get f() { return this.addUserForm.controls; }

  get getId() {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (user != null) {
      return user.id;
    }

    return 0;
  }
}
