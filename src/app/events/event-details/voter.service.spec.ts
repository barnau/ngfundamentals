import { VoterService } from './voter.service'
import { Observable } from 'rxjs/Rx'
import { ISession } from '../shared/event.model'
import { of } from 'rxjs/observable/of';

describe('Voter Service', () => {
    let voterService: VoterService, mockHttp;

    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post'])
        voterService = new VoterService(mockHttp)
    })

    describe('delete voter', () => {

        it('should remove the voter from the list of voters', () => {
            var session = { id: 6, voters: ['joe', 'john']}
            //make mockHttp delete method return observable of false;
            mockHttp.delete.and.returnValue(of(false))
            voterService.deleteVoter(3, <ISession>session, 'joe')

            expect(session.voters.length).toBe(1)
            expect(session.voters[0]).toBe('john')

        })

        it('should call http.delete with the right URL', () => {
            var session = { id: 6, voters: ['joe', 'john']}
            //make mockHttp delete method return observable of false;
            mockHttp.delete.and.returnValue(of(false))
            voterService.deleteVoter(3, <ISession>session, 'joe')

            expect(mockHttp.delete).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/joe', {})

        })
    })

    describe('add voter', () => {
        it('should call http.post with the right URL', () => {
            var session = { id: 6, voters: [ 'john']}
            //make mockHttp delete method return observable of false;
            mockHttp.post.and.returnValue(of(false))
            voterService.addVoter(3, <ISession>session, 'joe')

            expect(mockHttp.post).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/joe', {}, jasmine.any(Object))

        })
    })
})