import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Feature Modules
import {AuthModule} from './auth/auth.module';
import {TrainingModule} from './training/training.module';

// Backend As A Service Firebase (angular fire 2)
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from 'angularfire2/auth';

// UI
import {MaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';

// Routing
import {AppRoutingModule} from './app-routing.module';

// Components
import {AppComponent} from './app.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {HeaderComponent} from './navigation/header/header.component';
import {SidenavListComponent} from './navigation/sidenav-list/sidenav-list.component';

// Sub components
import {StopTrainingComponent} from './training/current-training/stop-training/stop-training.component';

// Services
import {AuthService} from './auth/auth.service';
import {TrainingService} from './training/training.service';
import {TextToSpeechService} from './shared/text-speech/text-speech.service';
import {UIService} from './shared/global-ui/ui.service';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    StopTrainingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    // Feature Module Imports
    AuthModule,
    TrainingModule
  ],
  providers: [
    AuthService,
    TrainingService,
    TextToSpeechService,
    UIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
