import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Exercise } from '../exercise.model';
import {TrainingService} from '../training.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {

  finishedExercises: Subscription;

  // displayedColumns array used for ordering for column headers in table.
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _trainingService: TrainingService) { }

  ngOnInit() {
    this.finishedExercises = this._trainingService.finishedExerciseChanged
      .subscribe((exercises: Exercise[]) => {
      this.dataSource.data = exercises;
    });
    this._trainingService.fetchFinishedExercises();
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  ngOnDestroy() {
    if ( this.finishedExercises ) {
      this.finishedExercises.unsubscribe();
    }
  }
}
