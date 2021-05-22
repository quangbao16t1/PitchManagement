import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PitchForEdit } from 'src/app/models/pitch/pitchForEdit.model';
import { DistrictService } from 'src/app/services/district.service';
import { PitchService } from 'src/app/services/pitch.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-edit-pitch',
  templateUrl: './edit-pitch.component.html',
})
export class EditPitchComponent implements OnInit {

  districtName: any;
  keyword = '';
  district: any[];
  editPitchForm: FormGroup;
  pitch: PitchForEdit;
  id: any;
  status: any [] = [
    {key: 1 , value: ['Đang hoạt động']},
    {key: 0, value: ['Dừng hoạt động']}
  ];
  stt: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private pitchService: PitchService,
    private toastr: ToastrService,
    private districtService: DistrictService,
  ) {
    this.editPitchForm = this.fb.group({
      name: ['', [Validators.required, ValidationService.requireValue]],
      decription: ['', [Validators.required, ValidationService.requireValue]],
      phoneNumber: ['', [Validators.required, ValidationService.numberValidator]],
      address: ['', [Validators.required, ValidationService.requireValue]],
      district: ['', [Validators.required, ValidationService.requireValue]],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      webSite: ['', [Validators.required, ValidationService.requireValue]],
      status: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        this.pitchService.getPitchById(this.id).subscribe(
          result => {
            this.pitch = result;
            this.districtName = result.districtId;
            this.stt = result.status;
            console.log(this.districtName, 11);
            this.editPitchForm.controls.name.setValue(result.name);
            this.editPitchForm.controls.decription.setValue(result.decription);
            this.editPitchForm.controls.phoneNumber.setValue(result.phoneNumber);
            this.editPitchForm.controls.address.setValue(result.address);
            this.editPitchForm.controls.email.setValue(result.email);
            this.editPitchForm.controls.webSite.setValue(result.webSite);
            // this.editPitchForm.controls.avatar.setValue(result.avatar);
            // this.editPitchForm.controls.status.setValue(result.status);
          },
          () => {
            this.toastr.error('Không tìm thấy sân bóng này');
          });
      }
    });
    this.districtService.getAllDistricts(this.keyword).subscribe((dis: any) => {
      this.district = dis;
      console.log(this.district);
    });
  }

  editPitch() {
    this.pitch = Object.assign({}, this.editPitchForm.value);

    this.pitchService.editPitch(this.id, this.pitch).subscribe(
      () => {
        this.router.navigate(['/pitch-detail']).then(() => {
          this.toastr.success('Cập nhật sân bóng thành công');
        });
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Cập nhật sân bóng không thành công!');
      }
    );
  }

  get f() { return this.editPitchForm.controls; }

}
