import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CURRENT_USER } from 'src/app/constants/db.keys';
import { UserUpdate } from 'src/app/models/user/userUpdate.model';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  get name() {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));

    if (user != null) {
      return user.username;
    }

    return '';
  }

  get getId() {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (user != null) {
      return user.id;
    }

    return 0;
  }

  get isAdmin() {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (user != null) {
      return user.groupRole === 'Admin';
    }

    return false;
  }
}
