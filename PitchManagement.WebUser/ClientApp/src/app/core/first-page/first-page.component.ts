import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CURRENT_USER } from 'src/app/constants/db.keys';

@Component({
  selector: 'app-first-page',
  template: '<div></div>'
})
export class FirstPageComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if (this.isAuthenticated()) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  isAuthenticated(): boolean {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (user != null) {
      return true;
    }

    return false;
  }
}
