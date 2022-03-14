import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { ZoneTrackingConfig } from './zone-tracking.config';
import { ZoneTrackingService } from './zone-tracking.service';

@NgModule({})
export class ZoneTrackingModule {
  static printTasksWithDelay(
    delay?: number
  ): ModuleWithProviders<ZoneTrackingModule> {
    return {
      ngModule: ZoneTrackingModule,
      providers: [
        {
          provide: ZoneTrackingConfig,
          useValue: { printTasksDelay: delay ?? 3000 },
        },
        {
          provide: APP_INITIALIZER,
          multi: true,
          deps: [ZoneTrackingService],
          useFactory: (service: ZoneTrackingService) => () =>
            service.printTasksWithDelay(),
        },
      ],
    };
  }
}
