import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-zone-tracking-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  time = 0;
  ngOnInit() {
    setInterval(() => {
      this.time++;
    }, 1000);
  }
}
