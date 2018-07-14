import { Component, OnInit } from '@angular/core'
import { AuthService } from '../user/auth.service';
import { ISession, EventService, IEvent } from '../events';
import { Router } from '@angular/router';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styles: [`
    .nav.navbar-nav {font-size: 15px;}
    #searchForm {margin-right: 100px;}
    @media (max-width: 1200px) {#searchForm { display: none }}
    li > a.active {color: #F97924}
    `]
})
export class NavBarComponent implements OnInit {
    events: IEvent[]

    
    searchTerm:string = ""
    foundSessions:ISession[]
    constructor(private auth: AuthService, private eventService:EventService, private router: Router) {
        
    }
    
    searchSessions(searchTerm:string) {
        this.eventService.searchSessions(searchTerm).subscribe(sessions => {
            this.foundSessions = sessions;
        })
    }


    ngOnInit() {
        this.eventService.getEvents().subscribe((events) => {
            this.events = events;
        })
    }
}