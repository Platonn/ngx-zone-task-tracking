import { Injectable, NgZone } from '@angular/core';
import './fixed-zonejs-task-tracking';
import { ZoneTaskTrackingConfig } from './zone-tracking.config';

export type ZoneTask = unknown;

export enum TaskType {
  microTask = 'microTask',
  macroTask = 'macroTask',
  eventTask = 'eventTask',
}

export interface Task {
  stacktrace: Error;
  _task: ZoneTask;
}

export interface AllTasks {
  microTasks: Task[];
  macroTasks: Task[];
}

@Injectable({
  providedIn: 'root',
})
export class ZoneTaskTrackingService {
  constructor(
    protected readonly ngZone: NgZone,
    protected readonly config: ZoneTaskTrackingConfig
  ) {}

  // Access the NgZone's internals - TaskTrackingZone:
  protected readonly taskTrackingZone = (this.ngZone as any)._inner._parent
    ._properties.TaskTrackingZone;

  printTasksWithDelay() {
    const waitSeconds = this.config.printTasksDelay;

    console.log(`⏳ Wait ${waitSeconds}ms to dump pending tasks `);
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.printTasks();
      }, waitSeconds);
    });
  }

  printTasks() {
    console.log(`👀 Pending tasks in NgZone:\n`, this.getTasks());
  }

  /**
   * Returns all pending tasks divided into 3 groups: microTasks, macroTasks, eventTasks
   */
  getTasks(): AllTasks {
    return {
      macroTasks: this.getTasksFor(TaskType.macroTask),
      microTasks: this.getTasksFor(TaskType.microTask),
    };
  }

  getTasksFor(taskType: TaskType): Task[] {
    const tasks = this.taskTrackingZone.getTasksFor(taskType);

    return tasks.map((task: ZoneTask) => {
      // `task.creationLocation` is an `Error` object containing the stacktrace
      // see source code https://github.com/angular/angular/blob/d1ea1f4c7f3358b730b0d94e65b00bc28cae279c/packages/zone.js/lib/zone-spec/task-tracking.ts#L40
      const creationLocation: Error = (task as any).creationLocation;

      return {
        stacktrace: creationLocation,
        _task: task,
      } as Task;
    });
  }
}
