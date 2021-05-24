import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  user: any;
  error = false;
  success = false;
  roles: any[] = [
    { key: 2, value: ['Pitcher'] },
    { key: 3, value: ['User'] },
  ];

  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    public authService: AuthService,
    private router: Router,
   private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, ValidationService.passwordValidator]],
      passwordAgain: ['', [Validators.required, ValidationService.passwordMatch]],
      groupUserId: ['', [Validators.required]],
    });

  }

  createUser() {
    this.user = Object.assign({}, this.registerForm.value);
    this.authService.save(this.user).subscribe(
      () => {
        this.router.navigate(['/login']).then(() => {
          this.toastr.success('Đăng ký tài khoản thành công');
        });
      },
      (_error: HttpErrorResponse) =>
        this.toastr.error('Tên đăng nhập đã tồn tại! Đăng ký tài khoản không thành công!')
      );
  }

  get f() { return this.registerForm.controls; }

}
