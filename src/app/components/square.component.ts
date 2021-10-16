import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-square',
    template: `
    <div [ngStyle]="getStyle()">
        <ng-content></ng-content>
    </div>
    `,
    styles: [`
    :host, div {
        display: inherit;
        flex-direction: inherit;
        align-items: inherit;
        justify-content: inherit;
        border: inherit;
        text-align: inherit;
        height: 100%;
        width: 100%;
    }
    `]
})
export class SquareComponent {
    @Input() black: boolean;

    getStyle() {
        return this.black
            ? { backgroundColor: 'black', color: 'white' }
            : { backgroundColor: 'white', color: 'black' };
    }
}