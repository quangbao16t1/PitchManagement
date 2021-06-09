import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { CURRENT_USER } from 'src/app/constants/db.keys';
import { OrderPitchService } from 'src/app/services/order-pitch.service';
import { PitchService } from 'src/app/services/pitch.service';

@Component({
  selector: 'app-chartdemo',
  templateUrl: './chartdemo.component.html',
})
export class ChartdemoComponent implements OnInit {

  dateForm: FormGroup;
  checkData = false;
  pitchSelected: any;
  listPitch: any[];
  pitchId: number;
  total1: any;
  total2: any;

  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true
  };

  public barChartLabels = [];
  public barChartType = 'line';
  public barChartLegend = true;

  public barChartData = [];


  maxDate: Date;
  // datePre: Date;
  dateTruoc: any;
  dateSau: any;
  // dateAfter: Date;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderPitchService,
    private pitchService: PitchService,
    private router: Router
    ) {
    this.maxDate = new Date();
    this.dateForm = this.fb.group({
      datePre: ['', Validators.required],
      dateAfter: ['', Validators.required],
      pitchId: ['', [Validators.required]]
    });
  }

  bsValue: Date = new Date(2020, 3);
  minMode: BsDatepickerViewMode = 'month'; // change for month:year

  bsConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  ngOnInit() {
    if (this.isPitcher()) {
      this.pitchService.getPitchByUserId(this.getId).subscribe(res => {
        this.listPitch = res;
        console.log(this.listPitch, 11111);
      });
    }
  }
  getPitchId(pitchId: number) {
    this.bsConfig = Object.assign({}, {
      minMode: this.minMode,
      dateInputFormat: 'MM/YYYY',
      containerClass: 'theme-green'
    });
    for (let i = 1; i <= 31; i++) {
      this.barChartLabels[i - 1] = '' + i;
    }
    this.drawChartByDate(new Date(Date.now()));
  }
  drawChart() {
    const date = new Date(this.dateForm.value.datePre);
    this.dateTruoc = date.getMonth() + 1;
    const dateCompare = new Date(this.dateForm.value.dateAfter);
    this.dateSau = dateCompare.getMonth() + 1;
    this.barChartData = [];
    this.orderService.getRevenue(this.pitchId, date).subscribe(data => {
      this.total1 = data.total;
      console.log(this.total1, 9999);
      const items: any[] = data['revenues'];

      const dataChart = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      for (let i = 1; i <= items.length; i++) {

        dataChart[i - 1] = items[i - 1]['totalRevenue'];
      }
      this.barChartData = [{ data: dataChart, label: 'Tháng ' + (date.getMonth() + 1) }];

      this.orderService.getRevenue(this.pitchId, dateCompare).subscribe(data1 => {
        this.total2 = data1.total;
        const items1: any[] = data1['revenues'];

        const dataChart1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (let i = 1; i <= items1.length; i++) {

          dataChart1[i - 1] = items1[i - 1]['totalRevenue'];
        }
        this.barChartData.push({ data: dataChart1, label: 'Tháng ' + (dateCompare.getMonth() + 1) });
      });

    });


  }
  get f() { return this.dateForm.controls; }

  drawChartByDate(date: Date) {
    this.orderService.getRevenue(this.pitchId, date).subscribe(data => {
      if (data != null) {
        const items: any[] = data['revenues'];

        const data1 = [];

        for (let i = 1; i <= items.length; i++) {
          this.barChartLabels[i - 1] = '' + i;
          data1[i - 1] = items[i - 1]['totalRevenue'];
        }

        this.barChartData = [{ data: data1, label: 'Tháng ' + (date.getMonth() + 1) }];
        this.checkData = true;
      }
    });
  }
 get getId() {
    const use = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (use !== null) {
      return use.id;
    }
    return 0;
  }
  isPitcher(): boolean {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    if (user != null) {
      return user.groupRole === 'Pitcher';
    }
  return false;
  }
}
