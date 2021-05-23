import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
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
  pitchId: any;
  spId: any;
  status: any[] = [
    { key: 1, value: ['Đang hoạt động'] },
    {key: 0, value: ['Dừng hoạt động']}
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private subPitchService: SubPitchService,
    private toastr: ToastrService,
  ) {
    this.editSubPitchForm = this.fb.group({
      name: ['', [Validators.required, ValidationService.requireValue]],
      type: ['', [Validators.required, ValidationService.numberValidator]],
      status: ['', [Validators.required, ValidationService.numberValidator]],
    });
  }
  ngOnInit() {
    this.route.paramMap.subscribe( params => {
      this.pitchId = params.get('pId');
      this.spId = params.get('spId');
      console.log(this.pitchId, 444);
      if (this.spId) {
            this.subPitchService.getSubPitchById(this.spId).subscribe(
              result => {
                console.log(result);
                this.subPitch = result;
                this.editSubPitchForm.controls.name.setValue(result.name);
                this.editSubPitchForm.controls.type.setValue(result.type);
                this.editSubPitchForm.controls.status.setValue(result.status);
              },
              () => {
                this.toastr.error(`Không tìm thấy sân con này`);
              });
          }
    });
  // this.route.params.subscribe(params => {
  //   this.pitchId = params.id;
  //   if (this.spId) {
  //     this.subPitchService.getSubPitchById(this.spId).subscribe(
  //       result => {
  //         console.log(result);
  //         this.subPitch = result;
  //         this.editSubPitchForm.controls.name.setValue(result.name);
  //         this.editSubPitchForm.controls.type.setValue(result.type);
  //         this.editSubPitchForm.controls.status.setValue(result.status);
  //       },
  //       () => {
  //         this.toastr.error(`Không tìm thấy sân con này`);
  //       });
  //   }
  // });
}

editSubPitch() {
  this.subPitch = Object.assign({}, this.editSubPitchForm.value);
  this.subPitchService.editSubPitch(this.spId, this.subPitch).subscribe(
    () => {
      this.router.navigate([`/pitch-detail/${this.pitchId}/sub-pitch`]).then(() => {
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
