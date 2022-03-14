import { Injectable } from '@angular/core';

@Injectable()
export abstract class ZoneTrackingConfig {
  /** Delay before printing tasks to the console */
  abstract printTasksDelay: number;
}
