import { Component, OnInit } from '@angular/core'
import { EventService } from './shared/event.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from './shared/event.model';

@Component({
    template: `
    <div> 
        <h1>Upcoming Angular Events</h1>
        <hr>
        <div class="row">
            <div class="col-md-5" *ngFor="let event of events">
                <event-thumbnail [event]="event" (click)="handleThumbnailClick(event.name)"></event-thumbnail>
            </div>
        </div>    
    </div>`
})
export class EventsListComponent implements OnInit {
  events: IEvent[];
  constructor(private eventService: EventService, private toastr: ToastrService, private route: ActivatedRoute) {}

  handleThumbnailClick(eventName) {
    console.log(eventName);
    this.toastr.success(eventName)
  }

  ngOnInit() {
      this.events = this.route.snapshot.data.events;
  }
}