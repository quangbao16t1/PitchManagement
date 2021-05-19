import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CURRENT_USER } from 'src/app/constants/db.keys';
import { PitchService } from 'src/app/services/pitch.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-add-pitch',
  templateUrl: './add-pitch.component.html',
})
export class AddPitchComponent implements OnInit {

  addPitchForm: FormGroup;
  pitch: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pitchService: PitchService,
    private toastr: ToastrService
  ) {
    this.addPitchForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      district: ['1'],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      address: [''],
      phoneNumber: ['', ValidationService.phonenumberValidator],
      website: [''],
      avatar: [''],
      createBy: [''],
      status: ['true'],
      updateTime: ['']
    });
  }

  ngOnInit() {
    // if (this.authService.getRoles().filter(x => x.includes('CREATE_BRANCH')).length === 0) {
    //   this.router.navigate(['/pitch']);
    // }
  }

  addPitch() {
    this.pitch = Object.assign({}, this.addPitchForm.value);
    this.pitchService.createPitch(this.pitch).subscribe(
      () => {
        this.router.navigate(['/pitch-detail']).then(() => {
          this.toastr.success('Tạo sân bóng thành công');
        });
      },
      (_error: HttpErrorResponse) =>
        this.toastr.error('Tạo sân bóng không thành công!')
      );
  }

  get f() { return this.addPitchForm.controls; }

  get isAdmin() {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (user != null) {
      return user.groupRole === 'Admin';
    }

    return false;
  }

  get isPitcher() {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (user != null) {
      return user.groupRole === 'Pitcher';
    }

    return false;
  }

}
