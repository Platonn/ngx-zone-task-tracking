import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { ZoneTaskTrackingConfig } from './zone-tracking.config';
import { ZoneTaskTrackingService } from './zone-tracking.service';

@NgModule({})
export class ZoneTaskTrackingModule {
  static printTasksWithDelay(
    delay?: number
  ): ModuleWithProviders<ZoneTaskTrackingModule> {
    return {
      ngModule: ZoneTaskTrackingModule,
      providers: [
        {
          provide: ZoneTaskTrackingConfig,
          useValue: { printTasksDelay: delay ?? 3000 },
        },
        {
          provide: APP_INITIALIZER,
          multi: true,
          deps: [ZoneTaskTrackingService],
          useFactory: (service: ZoneTaskTrackingService) => () =>
            service.printTasksWithDelay(),
        },
      ],
    };
  }
}
