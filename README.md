

# ngx-zone-task-tracking
`ngx-zone-task-tracking` helps you figuring out all pending async tasks in your Angular application at a given moment. This proves useful for debugging a hanging Angular SSR (Server Side Rendered) app, which likely hangs due to _some_ never-ending async task.

## Usage
In your app module, import the module `ZoneTaskTrackingModule.printWithDelay()`:

```ts
import { ZoneTaskTrackingModule } from 'ngx-zone-task-tracking';
/* ... */

@NgModule({
  imports: [
    /* ... */
    ZoneTaskTrackingModule.printWithDelay(),
  ],
  /* ... */
})
export class AppModule {}
```

**Result**: After 3 seconds from the start of the rendering, all the pending async tasks will be printed to the console, even pointing with a stacktrace to an exact line in the code that caused an async task.

**Example console output**:
```
⏳ Wait 3000ms to dump pending tasks 

👀 Pending tasks in NgZone:
 {
  macroTasks: [
    {
      stacktrace: Error: Task 'macroTask' from 'setInterval'.
          at TaskTrackingZoneSpec.onScheduleTask (PATH_TO_YOUR_PROJECT/dist/app/server/main.js:90385:36)
          at _ZoneDelegate.scheduleTask (PATH_TO_YOUR_PROJECT/dist/app/server/main.js:87743:45)
          at Object.onScheduleTask (PATH_TO_YOUR_PROJECT/dist/app/server/main.js:87641:25)
          at _ZoneDelegate.scheduleTask (PATH_TO_YOUR_PROJECT/dist/app/server/main.js:87743:45)
          at Zone.scheduleTask (PATH_TO_YOUR_PROJECT/dist/app/server/main.js:87558:37)
          at Zone.scheduleMacroTask (PATH_TO_YOUR_PROJECT/dist/app/server/main.js:87587:21)
          at scheduleMacroTaskWithCurrentZone (PATH_TO_YOUR_PROJECT/dist/app/server/main.js:88149:25)
          at PATH_TO_YOUR_PROJECT/dist/app/server/main.js:90113:22
          at proto.<computed> (PATH_TO_YOUR_PROJECT/dist/app/server/main.js:88431:18)
          at AppComponent.ngOnInit (PATH_TO_YOUR_PROJECT/dist/app/server/main.js:22:9),
      _task: [ZoneTask]
    }
  ],
  microTasks: []
}
```

## Configure the delay
Pass the time (in milliseconds) in the argument of the module's method to change the time after which the async tasks will be dumped. See the following example:

```ts
// Async tasks will be printed after 5 seconds:
ZoneTaskTrackingModule.printWithDelay(5000)
```
## Limitations
Angular apps without `zone.js` are not supported. It's because `ngx-zone-task-tracking` library leverages  under the hood the plugin of `zone.js`: `zone.js/plugins/tasks-tracking`.
