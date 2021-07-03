import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CURRENT_USER } from 'src/app/constants/db.keys';
import { TeamService } from 'src/app/services/team.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
})
export class CreateTeamComponent implements OnInit {

  teamId: any;
  teamAdd: any;
  itemsAsync: Observable<any[]>;
  addTeamForm: FormGroup;
  userCreate: any;
  level: any[] = [
    { key: 'Yếu', value: ['Yếu'] },
    { key: 'Trung bình yếu', value: ['Trung bình yếu'] },
    { key: 'Trung bình', value: ['Trung bình'] },
    { key: 'Khá', value: ['Khá'] },
    { key: 'Mạnh', value: ['Mạnh'] }
  ];

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.addTeamForm = this.fb.group({
      name: ['', [Validators.required, ValidationService.requireValue]],
      level: [''],
      ageFrom: ['', [Validators.required, ValidationService.numberValidator]],
      ageTo: ['', [Validators.required, ValidationService.numberValidator]],
      dateOfWeek: ['', [Validators.required, ValidationService.requireValue]],
      startTime: ['', [Validators.required, ValidationService.requireValue]],
      description: ['', [Validators.required, ValidationService.requireValue]],
    });
   }

  ngOnInit() {
    
  }

  createTeam() {
    this.teamAdd = Object.assign({}, this.addTeamForm.value);
    this.teamAdd.createBy = this.getId;
    this.teamAdd.logo = 'https://mondaycareer.com/wp-content/uploads/2020/10/26.-Logo-Bong-Da-Doc.png';
    this.teamService.createMyTeam(this.teamAdd).subscribe(
      () => {
        this.router.navigate(['/team']).then(() => {
          this.toastr.success('Tạo đội bóng thành công');
        });
      },
      (_error: HttpErrorResponse) => {
        this.toastr.error('Tạo đội bóng không thành công!');
      }
    );
  }

  get getId() {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (user != null) {
      return user.id;
    }

    return 0;
  }

  get f() { return this.addTeamForm.controls; }
}

