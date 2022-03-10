import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-zone-tracking-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app';
  ngOnInit() {
    setInterval(() => {
      console.log('x');
    }, 1000);
  }
}
