import {NgModule} from '@angular/core';
import {TrainingComponent} from './training.component';
import {NewTrainingComponent} from './new-training/new-training.component';
import {CurrentTrainingComponent} from './current-training/current-training.component';
import {PastTrainingComponent} from './past-training/past-training.component';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {StopTrainingComponent} from './current-training/stop-training/stop-training.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    TrainingComponent,
    NewTrainingComponent,
    CurrentTrainingComponent,
    PastTrainingComponent
  ],
  imports: [
    SharedModule,
    AngularFirestoreModule,
  ],
  entryComponents: [StopTrainingComponent]
})

export class TrainingModule {

}
