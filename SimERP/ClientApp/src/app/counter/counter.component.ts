import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent implements OnInit {

  constructor(private routeParams: ActivatedRoute) {

  }

  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }
  ngOnInit(): void {

    this.routeParams.params.subscribe(params => {
      console.log(params);
    });
  }
}
