import { Component, Input, EventEmitter, Output } from "@angular/core";
import { ISession } from "..";

@Component({
    selector: "upvote",
    template: `
        <div class="votingWidgetContainer pointable" (click)="onClick()">
            <div class="votingWidget well">
                <div class="votingButton">
                    <i class="glyphicon glyphicon-heart" [style.color]="iconColor"></i>
                </div>
                <div class="badge badge-inverse votingCount">
                    <div>{{count}}</div>
                </div>
            </div>        
        </div>
    `,
    styles: ['/app/events/event-details/upvote.component.css']
})
export class UpvoteComponent {
    @Input() set voted(val) {
        this.iconColor = val ? 'red' : 'white '
    }     
    @Input() count: number
    @Output() vote = new EventEmitter()
    iconColor: string
    
    userHasVoted(session: ISession) {

    }

    onClick() {
        this.vote.emit({}) 
    }
}