import {Component, OnDestroy, OnInit} from '@angular/core';
import { TrainingService } from './training.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {

  ongoingTraining = false;
  exerciseSubscription: Subscription;

  constructor(private _trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciseSubscription = this._trainingService.exerciseChanged.subscribe(res => {
      if (res) {
        this.ongoingTraining = true;
      } else {
        this.ongoingTraining = false;
      }
    });
  }

  ngOnDestroy() {
    if ( this.exerciseSubscription ) {
      this.exerciseSubscription.unsubscribe();
    }
  }
}
