import { Injectable } from '@angular/core';

@Injectable()
export abstract class ZoneTrackingConfig {
  /** Delay in seconds before printing the pending tasks */
  abstract printWithDelay: number;
}
