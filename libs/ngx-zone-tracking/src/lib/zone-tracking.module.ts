import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import 'zone.js/plugins/task-tracking';
import { ZoneTrackingConfig } from './zone-tracking.config';
import { ZoneTrackingService } from './zone-tracking.service';

@NgModule({})
export class ZoneTrackingModule {
  static forRoot(
    config: ZoneTrackingConfig
  ): ModuleWithProviders<ZoneTrackingModule> {
    return {
      ngModule: ZoneTrackingModule,
      providers: [
        { provide: ZoneTrackingConfig, useValue: config },
        {
          provide: APP_INITIALIZER,
          multi: true,
          deps: [ZoneTrackingService],
          useFactory: (service: ZoneTrackingService) => () =>
            service.printWithDelay(),
        },
      ],
    };
  }
}
