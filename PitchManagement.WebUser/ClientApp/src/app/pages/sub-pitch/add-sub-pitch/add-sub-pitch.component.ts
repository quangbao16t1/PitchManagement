import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubPitchService } from 'src/app/services/sub-pitch.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-add-sub-pitch',
  templateUrl: './add-sub-pitch.component.html',
})
export class AddSubPitchComponent implements OnInit {

  addSubPitchForm: FormGroup;
  subPitch: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private subPitchService: SubPitchService,
    private toastr: ToastrService
  ) {
    this.addSubPitchForm = this.fb.group({
      name: ['', [Validators.required]],
      pitchId: ['', [Validators.required]],
      type: ['', [Validators.required]],
      status: ['', [Validators.required]],
      createTime: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  addSubPitch() {
    this.subPitch = Object.assign({}, this.addSubPitchForm.value);
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

  get f() { return this.addSubPitchForm.controls; }

}
