import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PitchForEdit } from 'src/app/models/pitch/pitchForEdit.model';
import { AuthService } from 'src/app/services/auth.service';
import { PitchService } from 'src/app/services/pitch.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-edit-pitch',
  templateUrl: './edit-pitch.component.html',
})
export class EditPitchComponent implements OnInit {

  editPitchForm: FormGroup;
  pitcher: PitchForEdit;
  id: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private pitchService: PitchService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.editPitchForm = this.fb.group({
      name: ['', [Validators.required, ValidationService.requireValue]],
      description: ['', [Validators.required, ValidationService.requireValue]],
      phonenumber: ['', [Validators.required, ValidationService.numberValidator]],
      address: ['', [Validators.required, ValidationService.requireValue]],
    });
  }

  ngOnInit() {
    if (this.authService.getRoles().filter(x => x.includes('UPDATE_pitcher')).length === 0) {
      this.router.navigate(['/pitchers']);
    }

    this.route.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        this.pitchService.getPitchById(this.id).subscribe(
          result => {
            this.pitcher = result;
            this.editPitchForm.controls.name.setValue(result.name);
            this.editPitchForm.controls.description.setValue(result.description);
            this.editPitchForm.controls.phonenumber.setValue(result.phoneNumber);
            this.editPitchForm.controls.address.setValue(result.address);
          },
          () => {
            this.toastr.error('Không tìm thấy nhà cung cấp này');
          });
      }
    });
  }

  editpitcher() {
    this.pitcher = Object.assign({}, this.editPitchForm.value);

    this.pitchService.editPitch(this.id, this.pitcher).subscribe(
      () => {
        this.router.navigate(['/pitchers']).then(() => {
          this.toastr.success('Cập nhật nhà cung cấp thành công');
        });
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Cập nhật nhà cung cấp không thành công!');
      }
    );
  }

  get f() { return this.editPitchForm.controls; }

}
