import { Injectable } from '@angular/core';

@Injectable()
export abstract class ZoneTaskTrackingConfig {
  /** Delay before printing tasks to the console */
  abstract printTasksDelay: number;
}
