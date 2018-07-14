import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EventService, IEvent } from "./shared";

@Component({
    templateUrl: 'create-event.component.html',
    styles: [`
    em { float:right; color:#E05c65; padding-left: 10px;}
    .error input{ background-color:#E3C3C5; }
    .error ::webkit-input-placeholder {color: #999; }
    .error ::webkit-moz-placeholder { color: #999; }
    .error :webkit-moz-placeholder { color: #999; }
    .error ::ms-input-placeholder { color: #999; }
  `]
})
export class CreateEventComponent implements OnInit {
    isDirty: boolean = true;
    public newEvent: any;

    constructor(private router: Router, private eventService: EventService) {
        
    }

    saveEvent(formValues) {
        this.eventService.saveEvent(formValues).subscribe(() => {
            this.isDirty = false
            this.router.navigate(['/events']);
        })
    }

    cancel() {
        this.router.navigate(['/events']);
    }

    ngOnInit() {
    }
}