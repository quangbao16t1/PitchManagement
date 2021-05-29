import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FirstPageComponent } from './first-page/first-page.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        FirstPageComponent
    ],
    exports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HeaderComponent,
        FooterComponent,
        FirstPageComponent
      ]
})
export class CoreModule { }
