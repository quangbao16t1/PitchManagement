import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubPitchForEdit } from 'src/app/models/sub-pitch/subPitchForEdit.model';
import { SubPitchService } from 'src/app/services/sub-pitch.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-edit-sub-pitch',
  templateUrl: './edit-sub-pitch.component.html',
})
export class EditSubPitchComponent implements OnInit {

  editSubPitchForm: FormGroup;
  subPitch: SubPitchForEdit;
  id: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private subPitchService: SubPitchService,
    private toastr: ToastrService,
  ) {
    this.editSubPitchForm = this.fb.group({
      name: ['', [Validators.required, ValidationService.requireValue]],
      type: ['', [Validators.required, ValidationService.requireValue]],
      status: ['', [Validators.required, ValidationService.numberValidator]],
      pitchId: ['', [Validators.required, ValidationService.numberValidator]],
      createTime: ['', [Validators.required]],
    });
  }
  ngOnInit() {
  this.route.params.subscribe(params => {
    this.id = params.id;
    if (this.id) {
      this.subPitchService.getSubPitchById(this.id).subscribe(
        result => {
          console.log(result);
          this.subPitch = result;
          this.editSubPitchForm.controls.name.setValue(result.name);
          this.editSubPitchForm.controls.pitchId.setValue(result.pitchName);
          this.editSubPitchForm.controls.type.setValue(result.type);
          this.editSubPitchForm.controls.status.setValue(result.status);
          this.editSubPitchForm.controls.createTime.setValue(result.createTime);
        },
        () => {
          this.toastr.error(`Không tìm thấy sân con này`);
        });
    }
  });
}

editSubPitch() {
  this.subPitch = Object.assign({}, this.editSubPitchForm.value);
  this.subPitchService.editSubPitch(this.id, this.subPitch).subscribe(
    () => {
      this.router.navigate(['/sub-pitch']).then(() => {
        this.toastr.success('Cập nhật sân con thành công');
      });
    },
    (_error: HttpErrorResponse) => {
      this.toastr.error('Cập nhật sân con không thành công!');
    }
  );
}

get f() { return this.editSubPitchForm.controls; }

}
