import { NgModule } from '@angular/core';
import { ControlMessagesComponent } from './control-message.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    ControlMessagesComponent
  ],
  exports: [
    ControlMessagesComponent
  ]
})
export class ControlModule { }
