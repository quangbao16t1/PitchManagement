import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { CURRENT_USER } from 'src/app/constants/db.keys';
import { TeamUser } from 'src/app/models/team/teamUser.model';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
})
export class MyTeamComponent implements OnInit {

  myTeamForm: FormGroup;
  team: TeamUser;
  userId: number;
  keyword: string;
  itemsAsync: Observable<any[]>;
  modalRef: BsModalRef;

  constructor(
    private fb: FormBuilder,
    public teamService: TeamService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {
    this.myTeamForm = this.fb.group({
      teamName: ['', [Validators.required]],
      createBy: ['', [Validators.required]],
      description: ['', [Validators.required]],
      level: ['', [Validators.required]],
      dateOfWeek: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      ageFrom: ['', [Validators.required]],
      ageTo: ['', [Validators.required]]
   });
  }

  ngOnInit() {
    this.teamService.getTeamByUserId(this.getId).subscribe(
          result => {
            console.log(result);
            this.team = result;
            console.log(result.teamName);
            this.myTeamForm.controls.teamName.setValue(result.teamName);
            this.myTeamForm.controls.createBy.setValue(result.createBy);
            this.myTeamForm.controls.level.setValue(result.level);
            this.myTeamForm.controls.ageFrom.setValue(result.ageFrom);
            this.myTeamForm.controls.ageTo.setValue(result.ageTo);
            this.myTeamForm.controls.dateOfWeek.setValue(result.dateOfWeek);
            this.myTeamForm.controls.description.setValue(result.description);
            if (this.team.logo) {
              // this.team.logo = this.loadImage(this.team.logo);
            } else {
              this.team.logo = 'assets/images/sport.png';
            }
          },
          () => {
            this.toastr.error(`Không tìm thấy sân con này`);
          });
      }

  getTeamByUserId(userId: number) {
    this.itemsAsync = this.teamService.getTeamByUserId(this.getId);
  }

  add() {
    this.router.navigate(['/my-team/add']);
  }

  edit(id: any) {
    this.router.navigate(['/my-team/edit' + id]);
  }

  deleteConfirm(template: TemplateRef<any>, data: any) {
    this.team = Object.assign({}, data);
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {
    if (this.team) {
      this.teamService.deleteTeam(this.team.id)
      .subscribe(
        () => {
          this.getTeamByUserId(this.getId);
          this.toastr.success(`Xóa đội bóng thành công`);
        },
        (_error: HttpErrorResponse) => {
          this.toastr.error(`Xóa đội bóng không thành công`);
        }
      );
    }
    this.team = undefined;
    this.modalRef.hide();
  }

  close(): void {
    this.team = undefined;
    this.modalRef.hide();
}

  get getId() {
  const user = JSON.parse(localStorage.getItem(CURRENT_USER));
  if (user != null) {
    return user.id;
  }

  return 0;
}

  get f() { return this.myTeamForm.controls; }

}
