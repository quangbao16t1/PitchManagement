import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { ACCESS_TOKEN } from './constants/db.keys';
import { ToastrModule } from 'ngx-toastr';
import { CoreModule } from './core/core.module';
import { PitchService } from './services/pitch.service';
import { UserService } from './services/user.service';
import { TeamService } from './services/team.service';
import { SubPitchService } from './services/sub-pitch.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { MatchService } from './services/match.service';
import { DistrictService } from './services/district.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { SubPitchDetailService } from './services/sub-pitch-detail.service';
import { OrderPitchComponent } from './pages/pitch/order-pitch/order-pitch.component';
import { OrderPitchService } from './services/order-pitch.service';

export function tokenGetter() {
  return localStorage.getItem(ACCESS_TOKEN);
}

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    CoreModule,
    NgSelectModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:44361'],
        disallowedRoutes: ['localhost:44361/api/auth/login'],
      },
    }),
    ModalModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    AuthService,
    PitchService,
    UserService,
    TeamService,
    SubPitchService,
    MatchService,
    DistrictService,
    SubPitchDetailService,
    OrderPitchService,
  ],
  bootstrap: [AppComponent
  ],
})
export class AppModule {}
