import { Component, Input, ViewChild, ElementRef, Inject } from "@angular/core";
import { JQ_TOKEN } from './jQuery.service'

@Component({
    selector: 'simple-modal',
    template: `
        <div #modalcontainer class="modal fade" id="{{elementId}}" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" data-dismiss="modal" type="button">
                            <span >&times;</span>
                        </button>
                        <h4 class="modal-title">{{title}}</h4>
                    </div>
                    <div class="modal-body" (click)="closeModal()">
                        <ng-content></ng-content>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .modal-body { height: 250px; overflow-y: scroll; }
    `]
})
export class SimpleModalComponent {
    @Input() title: string
    @Input() elementId: string
    @ViewChild('modalcontainer') containerEl: ElementRef // references variable name created in html: #modalcontainer
    @Input() closeOnBodyClick: string

    constructor(@Inject(JQ_TOKEN) private $ : any) {

    }
    closeModal() {
        if(this.closeOnBodyClick.toLocaleLowerCase() === 'true')
            this.$(this.containerEl.nativeElement).modal('hide');
    }
}