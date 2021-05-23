import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CURRENT_USER } from 'src/app/constants/db.keys';
import { PitchForAdd } from 'src/app/models/pitch/pitchForAdd.model';
import { DistrictService } from 'src/app/services/district.service';
import { PitchService } from 'src/app/services/pitch.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-add-pitch',
  templateUrl: './add-pitch.component.html',
})
export class AddPitchComponent implements OnInit {

  addPitchForm: FormGroup;
  pitch: any;
  districtName: any;
  keyword = '';
  district: any[];
  editPitchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pitchService: PitchService,
    private toastr: ToastrService,
    private districtService: DistrictService
  ) {
    this.addPitchForm = this.fb.group({
      name: ['', [Validators.required]],
      decription: ['', [Validators.required]],
      districtId: [''],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      address: [''],
      phoneNumber: ['', ValidationService.phonenumberValidator],
      webSite: [''],
      avatar: [''],
      createBy: [''],
    });
  }

  ngOnInit() {
    this.districtService.getAllDistricts(this.keyword).subscribe((dis: any) => {
      this.district = dis;
      console.log(this.district);
    });
  }

  addPitch() {
    this.pitch = Object.assign({}, this.addPitchForm.value);
    this.pitch.createBy = this.getId;
    console.log(this.pitch.districtId, 888);
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
  isAdmin() {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (user != null) {
      return user.groupRole === 'Admin';
    }

    return false;
  }

  isPitcher() {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (user != null) {
      return user.groupRole === 'Pitcher';
    }

    return false;
}
get getId() {
  const user = JSON.parse(localStorage.getItem(CURRENT_USER));
  if (user !== null) {
    return user.id;
  }
  return 0;
}
  get f() { return this.addPitchForm.controls; }

}
