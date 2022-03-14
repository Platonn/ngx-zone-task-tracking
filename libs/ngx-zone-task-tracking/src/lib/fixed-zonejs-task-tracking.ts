import 'zone.js/plugins/task-tracking';

// This file fixes the Angular Zone.js bug: https://github.com/angular/angular/issues/45350

const TaskTrackingZoneSpec = (globalThis as any)['Zone'][
  'TaskTrackingZoneSpec'
];

TaskTrackingZoneSpec.prototype.onInvokeTask = function (
  parentZoneDelegate: any,
  _currentZone: any,
  targetZone: any,
  task: any,
  applyThis: any,
  applyArgs: any
): any {
  // the actual fix is checking `isPeriodic`:
  if (task.type === 'eventTask' || task.data?.isPeriodic)
    return parentZoneDelegate.invokeTask(
      targetZone,
      task,
      applyThis,
      applyArgs
    );
  const tasks = this.getTasksFor(task.type);
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i] == task) {
      tasks.splice(i, 1);
      break;
    }
  }
  return parentZoneDelegate.invokeTask(targetZone, task, applyThis, applyArgs);
};
