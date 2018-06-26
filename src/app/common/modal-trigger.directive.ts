import { Directive, OnInit, Inject, ElementRef, Input } from "@angular/core";
import { JQ_TOKEN } from ".";

@Directive({
    selector: '[modal-trigger]'
})
export class ModalTriggerDirective implements OnInit {
    @Input('modal-trigger') modalId: string // example of aliasing
    el: HTMLElement

    constructor(ref: ElementRef, @Inject(JQ_TOKEN) private $ : any) {
        this.el =ref.nativeElement
    }

    ngOnInit() {
        this.el.addEventListener('click', e => {
            this.$(`#${this.modalId}`).modal({})
        })
    }
}