import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ZoneTrackingModule } from 'ngx-zone-tracking';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    ZoneTrackingModule.printTasksWithDelay(2000),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
