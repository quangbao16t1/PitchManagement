import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CURRENT_USER } from 'src/app/constants/db.keys';
import { UserLogin } from 'src/app/models/user/user-login.model';
import { User } from 'src/app/models/user/user.model';
import { UserUpdate } from 'src/app/models/user/userUpdate.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loginModel: UserLogin = new UserLogin();
  user: User;
  itemsAsync: Observable<any[]>;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.loginModel).subscribe(
      response => {
        this.router.navigate(['/home']).then(() => {
          this.toastr.success('Đăng nhập thành công!');
        });
      },
      error => {
        console.log(error);
        this.toastr.error('Tên đăng nhập hoặc mật khẩu không đúng!');
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']).then(() => {
        this.toastr.success('Đăng xuất thành công!');
    });
  }
  get name() {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));

    if (user != null) {
      return user.username;
    }

    return '';
  }

  isAuthenticated(): boolean {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (user != null) {
      return true;
    }

    return false;
  }
  isPitcher(): boolean {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (user != null) {
      return user.groupRole === 'Pitcher';
    }
  }
  isUser(): boolean {
      const user = JSON.parse(localStorage.getItem(CURRENT_USER));
      if (user != null) {
        return user.groupRole === 'User';
      }
    return false;
  }
}
