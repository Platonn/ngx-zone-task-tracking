import { Injectable, NgZone } from '@angular/core';
import { ZoneTrackingConfig } from './zone-tracking.config';

export enum TaskType {
  microTask = 'microTask',
  macroTask = 'macroTask',
  eventTask = 'eventTask',
}

export interface Task {
  type: TaskType;
  name: string;
  stacktrace: string;
}

export interface AllTasks {
  microTasks: Task[];
  macroTasks: Task[];
  eventTasks: Task[];
}

@Injectable({
  providedIn: 'root',
})
export class ZoneTrackingService {
  constructor(
    protected readonly ngZone: NgZone,
    protected readonly config: ZoneTrackingConfig
  ) {}

  // Access the NgZone's internals - TaskTrackingZone:
  protected readonly taskTrackingZone = (this.ngZone as any)._inner._parent
    ._properties.TaskTrackingZone;

  printWithDelay() {
    const waitSeconds = this.config.printWithDelay;
    console.log(
      `⏳ ... Wait ${waitSeconds} seconds to dump pending tasks ... ⏳`
    );

    // Run the debugging `setTimeout` code outside of
    // the Angular Zone, so it's not considered as
    // yet another pending Zone Task:
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.printTasks();
      }, 1000 * waitSeconds);
    });
  }

  printTasks() {
    console.log(`👀 Pending tasks in NgZone: 👀\n`, this.getTasks());
  }

  /**
   * Returns all pending tasks divided into 3 groups: microTasks, macroTasks, eventTasks
   */
  getTasks(): AllTasks {
    return {
      microTasks: this.getTasksFor(TaskType.microTask),
      macroTasks: this.getTasksFor(TaskType.macroTask),
      eventTasks: this.getTasksFor(TaskType.eventTask),
    };
  }

  getTasksFor(taskType: TaskType): Task[] {
    const tasks = this.taskTrackingZone.getTasksFor(taskType);

    return tasks.map((task: any) => {
      // `task.creationLocation` is an `Error` object containing the stacktrace
      // see source code https://github.com/angular/angular/blob/d1ea1f4c7f3358b730b0d94e65b00bc28cae279c/packages/zone.js/lib/zone-spec/task-tracking.ts#L40
      const creationLocation: Error = task.creationLocation;

      return {
        type: taskType,
        name: creationLocation.message,
        stacktrace: creationLocation.stack,
      } as Task;
    });
  }
}
