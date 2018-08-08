import {NgModule} from '@angular/core';
import {TrainingComponent} from './training.component';
import {NewTrainingComponent} from './new-training/new-training.component';
import {CurrentTrainingComponent} from './current-training/current-training.component';
import {PastTrainingComponent} from './past-training/past-training.component';
import {SharedModule} from '../shared/shared.module';
import {TrainingRoutingModule} from './training.routing.module';
import {StopTrainingComponent} from './current-training/stop-training/stop-training.component';

@NgModule({
  declarations: [
    TrainingComponent,
    NewTrainingComponent,
    CurrentTrainingComponent,
    PastTrainingComponent,
    StopTrainingComponent
  ],
  imports: [
    SharedModule,
    TrainingRoutingModule
  ],
  entryComponents: [StopTrainingComponent]
})

export class TrainingModule {

}
