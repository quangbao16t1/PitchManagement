import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CURRENT_USER } from 'src/app/constants/db.keys';
import { PitchService } from 'src/app/services/pitch.service';
import { SubPitchService } from 'src/app/services/sub-pitch.service';

@Component({
  selector: 'app-add-sub-pitch',
  templateUrl: './add-sub-pitch.component.html',
})
export class AddSubPitchComponent implements OnInit {

  addSubPitchForm: FormGroup;
  subPitch: any;
  pitchId: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private subPitchService: SubPitchService,
    private pitchService: PitchService,
    private toastr: ToastrService,
    private route: ActivatedRoute
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
    this.route.params.subscribe( prams => {
      this.pitchId = prams.id;
      console.log(this.pitchId, 4444);
    });
  }
  close() {
    this.router.navigate([`/pitch-detail/${this.pitchId}/sub-pitch`]);
  }
  addSubPitch() {
    this.subPitch = Object.assign({}, this.addSubPitchForm.value);
    this.subPitch.pitchId = this.pitchId;
    this.subPitchService.createSubPitch(this.subPitch).subscribe(
      () => {
        this.router.navigate([`/pitch-detail/${this.pitchId}/sub-pitch`]).then(() => {
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
