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
    FormsModule,
    CoreModule,
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
    TeamService
  ],
  bootstrap: [AppComponent
  ],
})
export class AppModule {}
