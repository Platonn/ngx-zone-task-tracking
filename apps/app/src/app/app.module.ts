import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ZoneTaskTrackingModule } from 'ngx-zone-task-tracking';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    ZoneTaskTrackingModule.printWithDelay(2000),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
