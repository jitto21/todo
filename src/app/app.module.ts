import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoComponent } from './todo/todo.component';
import { MaterialModule } from './material.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './store/effects/todo.effects';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({
      name: "bus-booking-app",
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([TodoEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
