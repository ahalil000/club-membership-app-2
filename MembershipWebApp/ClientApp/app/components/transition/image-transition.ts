import { Component, HostBinding } from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    // ...
} from '@angular/animations';

@Component({
    selector: 'image-transition',
    animations: [
        trigger('openClose', [
            // ...
            state('open', style({
                height: '200px',
                opacity: 1,
                backgroundColor: 'yellow'
            })),
            state('closed', style({
                height: '100px',
                opacity: 0.5,
                backgroundColor: 'green'
            })),
            transition('open => closed', [
                animate('1s')
            ]),
            transition('closed => open', [
                animate('0.5s')
            ]),
        ]),
    ],
    templateUrl: 'image-transition.html',
    styleUrls: ['image-transition.css']
})
export class ImageTransitionComponent {
    isOpen = true;

    toggle() {
        this.isOpen = !this.isOpen;
    }

}