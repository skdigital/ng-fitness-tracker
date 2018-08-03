import { Component, OnInit, Output, EventEmitter } from '@angular/core';

export interface Exercise {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output() trainingStart = new EventEmitter<void>();

  exercises: Exercise[] = [
    { value: 'crunches-0', viewValue: 'Steak' },
    { value: 'touchToes-1', viewValue: 'Pizza' },
    { value: 'sideLunges-2', viewValue: 'Tacos' },
    { value: 'burpees-3', viewValue: 'Burpees' }
  ];

  constructor() { }

  ngOnInit() {
  }

  onStartTraining () {
    this.trainingStart.emit();
  }

}
