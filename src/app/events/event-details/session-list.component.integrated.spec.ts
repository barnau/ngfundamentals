import { TestBed, async, ComponentFixture} from '@angular/core/testing'
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core'
import {SessionListComponent} from './session-list.component'
import {AuthService} from '../../user/auth.service'
import {VoterService} from './voter.service'
import {ISession} from '../shared/event.model'
import {By} from '@angular/platform-browser'
import { Session } from 'protractor';
import { debug } from 'util';
import { UpvoteComponent } from '.';
import { DurationPipe } from '..';
import { CollapsibleWellComponent } from '../../common';

describe('SessionListComponent', () => {
    //wrapper around component that gives options such as change detection, dependency injector
    let fixture: ComponentFixture<SessionListComponent>,
        component: SessionListComponent,
        element: HTMLElement,
        debugEl: DebugElement

        // In order to see detailed error messages add --sourcemaps=false to package.json

        // "scripts": {
        //     "ng": "ng",
        //     "start": "ng serve --proxy-config proxy.conf.json", 
        //     "build": "ng build --prod",
        //     "test": "ng test --sourcemaps=false",
        //     "lint": "ng lint",
        //     "server": "node node_modules/ngf-server/server.js",
        //     "e2e": "ng e2e"
        //   },

        
        // add NO_ERRORS_SCHEMA to schemas so you don't have to include child components
        // notice you commented out UpvoteComp and CollapsibleWellComp and it still works with out complaining
        // be careful when using because it can hide usefule errors
        beforeEach(async(() => {
            let mockAuthService = { 
                isAuthenticated: () => true, 
                currentUser: {userName: 'Joe'}}
            let mockVoterService = {
                userHasVoted: () => true
            }

             TestBed.configureTestingModule({
                 imports: [],
                 declarations: [
                     SessionListComponent,
                    //  UpvoteComponent,
                     DurationPipe
                    //  CollapsibleWellComponent
                 ],
                 providers: [
                     {provide: AuthService, useValue: mockAuthService },
                     {provide: VoterService, useValue: mockVoterService}
                    ],
                    schemas: [NO_ERRORS_SCHEMA]
             })
        }))

        beforeEach(() => {
            fixture = TestBed.createComponent(SessionListComponent);
            component = fixture.componentInstance
            debugEl = fixture.debugElement
            element = fixture.nativeElement
        })

        describe('initial display', () => {


            it('should have the correct session title', () => {
                component.sessions = [
                    {id: 3, name: 'Session 1', presenter: 'Joe', duration: 1, level: 'beginner', abstract: 'abstract', voters: ['john', 'bob']}]
                    component.filterBy = 'all'
                    component.sortBy = 'name'
                    component.eventId = 4
                    component.ngOnChanges();
                    fixture.detectChanges();

                    //expect(element.querySelector('[well-title]').textContent).toContain('Session 1')
                    expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent).toContain('Session 1')
                    // allows for query off debug element. using by can allow you to query with more options. You could query by directive for example
            })
        })
})