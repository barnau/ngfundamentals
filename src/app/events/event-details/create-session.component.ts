import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EventService, IEvent, ISession } from "..";
import { restrictedWords } from '../shared/restricted-words.validator';

@Component({
    selector: 'create-session',
    templateUrl: './create-session.component.html',
    styles: [`
    em { float:right; color:#E05c65; padding-left: 10px;}
    .error input{ background-color:#E3C3C5; }
    .error ::webkit-input-placeholder {color: #999; }
    .error ::webkit-moz-placeholder { color: #999; }
    .error :webkit-moz-placeholder { color: #999; }
    .error ::ms-input-placeholder { color: #999; }
    a {cursor:pointer}
  `]
})
export class CreateSessionComponent implements OnInit {
    @Output() saveNewSession = new EventEmitter()
    @Output() cancelAddSession = new EventEmitter()
    name: FormControl
    presenter: FormControl
    duration: FormControl
    level: FormControl
    abstract: FormControl
    newSessionForm: FormGroup
    
    saveSession(formValues): void {
        let session: ISession = {
            id: undefined,
            name: formValues.name,
            abstract: formValues.abstract,
            duration: +formValues.duration,
            presenter: formValues.presenter,
            level: formValues.level,
            voters: []
        }
        this.saveNewSession.emit(session);
    }

    cancel() {
        this.cancelAddSession.emit()
    }

    ngOnInit(): void {
        this.name = new FormControl('', Validators.required)
        this.presenter = new FormControl('', Validators.required)
        this.duration = new FormControl('', Validators.required)
        this.level = new FormControl('', Validators.required)
        this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400), restrictedWords(['foo', 'bar'])])
        this.newSessionForm = new FormGroup({
            name: this.name,
            presenter: this.presenter,
            duration: this.duration,
            level: this.level,
            abstract: this.abstract
        })
    }

    constructor(private eventService: EventService) {

    }
}