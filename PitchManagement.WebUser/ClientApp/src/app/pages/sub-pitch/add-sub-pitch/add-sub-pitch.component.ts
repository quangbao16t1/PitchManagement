import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CURRENT_USER } from 'src/app/constants/db.keys';
import { PitchService } from 'src/app/services/pitch.service';
import { SubPitchService } from 'src/app/services/sub-pitch.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-add-sub-pitch',
  templateUrl: './add-sub-pitch.component.html',
})
export class AddSubPitchComponent implements OnInit {

  addSubPitchForm: FormGroup;
  subPitch: any;
  pitch: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private subPitchService: SubPitchService,
    private pitchService: PitchService,
    private toastr: ToastrService
  ) {
    this.addSubPitchForm = this.fb.group({
      name: ['', [Validators.required]],
      // pitchId: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.getPitchId();
  }

  getPitchId() {
    this.pitchService.getPitchId(this.getId).subscribe((res: number) => {
      this.pitch = res;
      console.log(res);
      // this.addSubPitchForm.controls.pitchId.setValue(this.pitch);
    });
  }

  addSubPitch() {
    this.subPitch = Object.assign({}, this.addSubPitchForm.value);
    this.subPitch.pitchId = this.pitch;
    this.subPitchService.createSubPitch(this.subPitch).subscribe(
      () => {
        this.router.navigate(['/sub-pitch']).then(() => {
          this.toastr.success('Thêm sân bóng con thành công');
        });
      },
      (_error: HttpErrorResponse) =>
        this.toastr.error('Thêm sân mới không thành công!')
      );
  }

  get getId() {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (user != null) {
      return user.id;
    }
  }
  get f() { return this.addSubPitchForm.controls; }

}
