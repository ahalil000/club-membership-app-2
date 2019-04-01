import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({ selector: 'ngbd-carousel-basic', templateUrl: './carousel-basic.html' })
export class NgbdCarouselBasic {
    images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

    constructor() {
        console.log("NgbdCarouselBasic instantiated ..");
    }
}