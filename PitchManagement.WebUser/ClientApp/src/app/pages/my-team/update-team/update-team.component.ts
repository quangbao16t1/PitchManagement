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
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
})
export class UpdateTeamComponent implements OnInit {
  teamId: any;
  keyword: string;
  teamUpdate: any;
  itemsAsync: Observable<any[]>;
  updateForm: FormGroup;
  listMember: any[];
  page: number;
  userCreate: any;
  pageSize: number;
  total: number;
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
    this.updateForm = this.fb.group({
      name: ['', [Validators.required, ValidationService.requireValue]],
      createBy: [''],
      description: ['', [Validators.required, ValidationService.requireValue]],
      level: ['', [Validators.required]],
      dateOfWeek: ['', [Validators.required, ValidationService.requireValue]],
      startTime: ['', [Validators.required]],
      ageFrom: ['', [Validators.required, ValidationService.numberValidator]],
      ageTo: ['', [Validators.required, ValidationService.numberValidator]],
    });
   }

  ngOnInit() {
    this.keyword = '';
    this.page = 1;
    this.pageSize = 10;
    this.route.params.subscribe( params => {
      this.teamId = params.pId;
      console.log(this.teamId, 4444);
      if (this.teamId) {
        this.teamService.getTeamById(this.teamId).subscribe(result => {
          this.teamUpdate = result;
          this.userCreate = result.userCreate.lastName;
          if (result) {
            this.updateForm.controls.name.setValue(result.name);
            this.updateForm.controls.createBy.setValue(result.userCreate.lastName);
            this.updateForm.controls.level.setValue(result.level);
            this.updateForm.controls.ageFrom.setValue(result.ageFrom);
            this.updateForm.controls.ageTo.setValue(result.ageTo);
            this.updateForm.controls.dateOfWeek.setValue(result.dateOfWeek);
            this.updateForm.controls.description.setValue(result.description);
            this.updateForm.controls.startTime.setValue(result.startTime);
          }
        });
      }
    });
    this.getMember(this.teamId, this.page);
  }
  getMember(teamId: number, page: number) {
    this.itemsAsync = this.teamService.getMember(teamId, this.keyword, page, this.pageSize)
      .pipe(
        tap(response => {
          this.total = response.total;
          this.page = page;
        }),
        map(response => response.items)
      );
      this.itemsAsync.subscribe(res => {
        this.listMember = res;
        console.log(this.listMember, 3333);
      });
  }
  editTeam(id: any, team: any) {
    this.teamUpdate = Object.assign({}, this.updateForm.value);

    this.teamService.editTeam(this.teamId, this.teamUpdate).subscribe(
      () => {
        this.router.navigate(['/team']).then(() => {
          this.toastr.success('Cập nhật đội bóng thành công');
        });
      },
      (_error: HttpErrorResponse) => {
        this.toastr.error('Cập nhật đội bóng không thành công!');
      }
    );
  }

  // onImageChange(event?: any, id?: string, type?: number) {
  //   let error = '';
  //   let selected: null;
  //   let url = null;
  //   if (event.target.files && event.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0]);
  //     reader.onload = (_event: any) => {
  //       url = _event.target.result;
  //       if (type === 1) {
  //         // @ts-ignore
  //         this.imageUrl = url;
  //       } else if (type === 2) {
  //         // @ts-ignore
  //         this.logoUrl = url;
  //       }
  //     };
  //   }
  //   if (
  //     event.target.files[0].name.endsWith('.jpg') ||
  //     event.target.files[0].name.endsWith('.png') ||
  //     event.target.files[0].name.endsWith('.JPG') ||
  //     event.target.files[0].name.endsWith('.PNG') ||
  //     event.target.files[0].name.endsWith('.JPEG') ||
  //     event.target.files[0].name.endsWith('.jpeg')
  //   ) {
  //     selected = event.target.files;
  //   } else {
  //     const element = this.elRef.nativeElement.querySelector('#' + id);
  //     element.value = '';
  //     error = 'Chỉ tải file với đuôi (jpg|png|jpeg)';
  //     selected = null;
  //   }
  //   if (type === 1) {
  //     // @ts-ignore
  //     this.selectedImage = selected;
  //     this.selectedImageError = error;
  //   }
  //   if (type === 2) {
  //     // @ts-ignore
  //     this.selectedLogo = selected;
  //     this.selectedLogoError = error;
  //   }
  // }
  // loadImage(name?: string) {
  //   // @ts-ignore
  //   return SERVER_API_URL + 'api/get-image?name=' + encodeURIComponent(name);
  // }

  get getId() {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (user != null) {
      return user.id;
    }

    return 0;
  }

  get f() { return this.updateForm.controls; }
}
