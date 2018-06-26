import { Component, Input, OnChanges } from "@angular/core"
import { ISession } from ".."
import { AuthService } from "../../user/auth.service";
import { VoterService } from "./voter.service";

@Component({
    templateUrl: "./session-list.component.html",
    selector: 'session-list'
})
export class SessionListComponent implements OnChanges {

    @Input() sessions: ISession[]
    @Input() filterBy: string
    @Input() sortBy: string
    visibleSessions: ISession[] = []

    constructor(private auth: AuthService, private voterService: VoterService) {}


    filterSessions(filterBy:string) {
        if(filterBy === 'all') {
            this.visibleSessions = this.sessions.slice(0)
        } else {
            this.visibleSessions = this.sessions.filter( session => {
                return session.level.toLocaleLowerCase() === filterBy
            })
        }
    }

    toggleVote(session: ISession) {
        if(this.userHasVoted(session)) {
            this.voterService.deleteVoter(session, this.auth.currentUser.userName)
        } else {
            this.voterService.addVoter(session, this.auth.currentUser.userName)
        }
        if(this.sortBy === 'votes')
            this.visibleSessions.sort(sortByVotesDesc)
    }

    userHasVoted(session: ISession) {
        return this.voterService.userHasVoted(session, this.auth.currentUser.userName)
    }

    
    
    ngOnChanges(changes) {
        if(this.sessions) {
            this.filterSessions(this.filterBy)
            console.log(this.sortBy)
            this.sortBy === 'name' ? this.visibleSessions.sort(sortByNameAsc) : this.visibleSessions.sort(sortByVotesDesc)
        }
    }
    
}

function sortByNameAsc(a: ISession, b: ISession) {
    if(a.name > b.name) return 1;
    else if(a.name === b.name ) return 0;
    else return -1
}

function sortByVotesDesc(a: ISession, b: ISession) {
    return b.voters.length - a.voters.length
}