import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CURRENT_USER } from 'src/app/constants/db.keys';
import { MatchForAdd } from 'src/app/models/match/matchForAdd.model';
import { Pitch } from 'src/app/models/pitch/pitch.model';
import { TeamUser } from 'src/app/models/team/teamUser.model';
import { DistrictService } from 'src/app/services/district.service';
import { MatchService } from 'src/app/services/match.service';
import { PitchService } from 'src/app/services/pitch.service';
import { TeamService } from 'src/app/services/team.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.scss']
})
export class CreateMatchComponent implements OnInit {

  match: MatchForAdd;
  pitch: Pitch;
  listTeamUser: any[];
  district?: any[];
  districtSelect?: any;
  itemsAsync1: Observable<any[]>;
  itemsAsync: Observable<any[]>;
  listWard: any[];
  addMatchForm: FormGroup;
  keyword = '';

  type?: number;

  level: any[] = [
    { key: 'Yếu', value: ['Yếu'] },
    { key: 'Trung bình yếu', value: ['Trung bình yếu'] },
    { key: 'Trung bình', value: ['Trung bình'] },
    { key: 'Khá', value: ['Khá'] },
    { key: 'Mạnh', value: ['Mạnh'] }
  ];

  listStadium: any = [];
  listDistrict?: any = [];
  listAreaSelected?: any = [];
  listAreaSelected2?: any = [];
  listAreaSelectedName?: any = [];
  itemStadiumSelected: any;

  constructor(
    private toastr: ToastrService,
    private matchService: MatchService,
    private fb: FormBuilder,
    private pitchService: PitchService,
    private teamService: TeamService,
    private districtService: DistrictService,
    private router: Router,
    public modalService: NgbModal
  ) {
    this.addMatchForm = this.fb.group({
      type: ['', [Validators.required]],
      setupTime: ['', [Validators.required]],
      level: ['', [Validators.required]],
      invitation: ['', [Validators.required]],
      covenant: ['', [Validators.required]],
      pitchName: [''],
      teamId: [''],
      district: [''],
      area: ['']
    });
  }
  ngOnInit() {
    this.teamService.getTeamByUser(this.getId).subscribe((res: any) => {
      this.listTeamUser = res;
      console.log(this.listTeamUser, 1111);
    });

    this.districtService.getAllDistricts(this.keyword).subscribe((dis: any) => {
      this.district = dis;
      console.log(this.district);
    });
  }

  getPitchByDistrict(districtId: number) {
    this.districtSelect = this.district.find(i => i.id === districtId);
    if (this.type === 0) {
      this.pitchService.getPitchByDistrict(districtId).subscribe(res => {
        if (res) {
          this.listStadium = res;
          console.log(this.listStadium, 4444);
        }
      });
      } else if (this.type === 1) {
      this.listAreaSelected = [];
      this.listAreaSelected2 = [];
      this.listAreaSelectedName = [];
      this.districtService.getAllDistricts(this.keyword).subscribe(res => {
        if (res) {
          this.listDistrict = res;
        } else {
          this.listDistrict = [];
        }
      });
    }
  }

  getWardByDistrictId(districtId: number) {
     this.districtSelect = this.district.find(i => i.id === districtId);
      this.districtService.getWardByDistrictId(districtId).subscribe(res => {
        if (res) {
          this.listWard = res;
          console.log(this.listWard, 4444);
        }
      });
  }

  // selectedDistrict(districtId: any, districtName: any, districtType: any) {
  //   if (this.listAreaSelected.some((d: any) => d.id === districtId)) {
  //     const index = this.listAreaSelected.findIndex((d: any) => d.id === districtId);
  //     if (index > -1) {
  //       this.listAreaSelected.splice(index, 1);
  //       this.listAreaSelected2.splice(index, 1);
  //       this.listAreaSelectedName.splice(index, 1);
  //     }
  //   } else {
  //     this.listAreaSelected.push({ id: districtId, name: districtName, provinceId: null, type: districtType });
  //     this.listAreaSelected2.push(districtId);
  //     this.listAreaSelectedName.push(districtName);
  //   }
  // }
  // removeDistrict(districtId: any) {
  //   if (this.listAreaSelected.some((d: any) => d.id === districtId)) {
  //     const index = this.listAreaSelected.findIndex((d: any) => d.id === districtId);
  //     if (index > -1) {
  //       this.listAreaSelected.splice(index, 1);
  //       this.listAreaSelected2.splice(index, 1);
  //       this.listAreaSelectedName.splice(index, 1);
  //     }
  //   }
  // }

  open(content: any) {
    this.modalService.open(content, { centered: true });
  }

  createMatch() {
    this.match = Object.assign({}, this.addMatchForm.value);
    console.log(this.itemStadiumSelected);
   this.match.pitchId = this.itemStadiumSelected;
   console.log(this.match);
    this.match.inviteeId = Number(this.getId);
    this.matchService.createMatch(this.match).subscribe(
      () => {
        this.router.navigate(['/find-match']).then(() => {
          this.toastr.success('Tạo trận đấu thành công');
        });
      },
      (_error: HttpErrorResponse) =>
        this.toastr.error('Tạo trận đấu không thành công!')
      );
  }

  // getPitchByDistrict(districId: number) {
  //   this.itemsAsync1 = this.pitchService.getPitchByDistrict(districId);
  // }

  getTeamByUserId(userId: number) {
    this.itemsAsync = this.teamService.getTeamByUserId(this.getId);
  }

  get getId() {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (user != null) {
      return user.id;
    }
    return 0;
  }

  get getName() {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (user != null) {
      return user.userName;
    }
    return 0;
  }
  get f() { return this.addMatchForm.controls; }
}
