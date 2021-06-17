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
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
})
export class MyTeamComponent implements OnInit {

  myTeamForm: FormGroup;
  teamIdForm: FormGroup;
  team: TeamUser;
  userId: any;
  id: any;
  keyword: string;
  itemsAsync: Observable<any[]>;
  modalRef: BsModalRef;
  teamSelected: any;
  listTeamUser: any[];
  name: any;
  description: string;

  constructor(
    private fb: FormBuilder,
    public teamService: TeamService,
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {
    this.myTeamForm = this.fb.group({
      teamId: [{value:'',disable: true}, [Validators.required]],
      createBy: ['', [Validators.required]],
      description: ['', [Validators.required]],
      level: ['', [Validators.required]],
      dateOfWeek: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      ageFrom: ['', [Validators.required]],
      ageTo: ['', [Validators.required]],
      logo: ['']
   });
  }

  ngOnInit() {
    this.teamService.getTeamByUser(this.getId).subscribe((res: any) => {
      this.listTeamUser = res;
      console.log(this.listTeamUser, 1111);
    });
      }

  getTeamByUserId(userId: number) {
    this.itemsAsync = this.teamService.getTeamByUserId(this.getId);
  }

  getTeamById(id: any) {
    this.teamService.getTeamById(id).subscribe(
      result => {
        this.teamSelected = result;
        console.log(result);
        this.userId = result.userCreate.id;
        this.id = result.id;
        console.log(this.id, 4444);
        this.myTeamForm.controls.createBy.setValue(result.userCreate.lastName);
        this.myTeamForm.controls.level.setValue(result.level);
        this.myTeamForm.controls.ageFrom.setValue(result.ageFrom);
        this.myTeamForm.controls.ageTo.setValue(result.ageTo);
        this.myTeamForm.controls.dateOfWeek.setValue(result.dateOfWeek);
        this.myTeamForm.controls.description.setValue(result.description);
        this.myTeamForm.controls.startTime.setValue(result.startTime);
        this.myTeamForm.controls.logo.setValue(result.logo);
        // if (this.team.logo) {
        //   // this.team.logo = this.loadImage(this.team.logo);
        // } else {
        //   this.team.logo = 'assets/images/sport.png';
        // }
      },
      () => {
        this.toastr.error(`Xem đội bóng không thành công!`);
      });
  }

add() {
    this.router.navigate(['/team/add']);
  }
member() {
  console.log(this.id, 7777);
  this.router.navigate([`/team/${this.id}/member`]);
}
  edit() {
    this.router.navigate([`/team/${this.id}/update-team`]);
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
