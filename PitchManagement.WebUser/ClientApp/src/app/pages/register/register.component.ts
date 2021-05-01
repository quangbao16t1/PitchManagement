import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
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

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
   private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, ValidationService.passwordValidator]],
      passwordAgain: ['', [Validators.required, ValidationService.passwordMatch]],
    });

  }
  // login() {
  //   this.authService.login(this.loginModel).subscribe(
  //     response => {
  //       this.router.navigate(['/home']).then(() => {
  //         this.toastr.success('Đăng nhập thành công!');
  //       });
  //     },
  //     error => {
  //       console.log(error);
  //       this.toastr.error('Tên đăng nhập hoặc mật khẩu không đúng!');
  //     }
  //   );
  // }
  createUser() {
    this.user = Object.assign({}, this.registerForm.value);
    this.authService.save(this.user).subscribe(
      () => {
        this.router.navigate(['/login']).then(() => {
          this.toastr.success('Đăng ký tài khoản thành công');
        });
      },
      (_error: HttpErrorResponse) =>
        this.toastr.error('Đăng ký tài khoản không thành công!')
      );
  }

  get f() { return this.registerForm.controls; }

}
