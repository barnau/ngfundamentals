import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  EventsListComponent,
  EventService,
  CreateEventComponent,
  EventRouteActivator,
  EventListResolver,
  EventDetailsComponent,
  CreateSessionComponent,
  SessionListComponent,
  DurationPipe,
  UpvoteComponent,
  VoterService,
  LocationValidator,
} from './events/index'


import { EventsAppComponent } from './events-app.component';
import { EventThumbnailComponent } from './events/event-thumbnail.component';
import { NavBarComponent } from './nav/navbar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { JQ_TOKEN, CollapsibleWellComponent, SimpleModalComponent, ModalTriggerDirective } from './common/index'

import { appRoutes } from './routes'
import { Error404Component } from './errors/404.component';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

let jQuery = window['$']

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    CollapsibleWellComponent,
    CreateEventComponent,
    CreateSessionComponent,
    DurationPipe,
    Error404Component,
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    LocationValidator,
    NavBarComponent,
    ModalTriggerDirective,
    SessionListComponent,
    SimpleModalComponent,
    UpvoteComponent 
  ],
  providers: [
    AuthService,
    EventRouteActivator,
    EventService,
    {
      provide: 'canDeactivateCreateEvent', 
      useValue: checkDirtyState
    },
    {
      provide: JQ_TOKEN, useValue: jQuery
    },
    EventListResolver,
    VoterService
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component: CreateEventComponent) {
  if(component.isDirty)
    return window.confirm('You have not saved this event, do you really want to cancel?');
  return true;
}
