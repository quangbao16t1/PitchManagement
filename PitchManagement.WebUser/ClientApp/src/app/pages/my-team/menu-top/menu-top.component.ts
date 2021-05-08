import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
})
export class MenuTopComponent implements OnInit {
  @Input() team?: any;
  @Input() logoUrl?: string;
  constructor() { }

  ngOnInit() {
  }

}
