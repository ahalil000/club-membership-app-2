import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbModule, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'ngbd-carousel-navigation',
    templateUrl: './carousel-navigation.html',
    providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})
export class NgbdCarouselNavigation {
    showNavigationArrows = true;
    showNavigationIndicators = true;
    images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

    constructor(config: NgbCarouselConfig, private _http: HttpClient) {
        // customize default values of carousels used by this component tree
        //config.showNavigationArrows = true;
        //config.showNavigationIndicators = true;
        config.interval = 10000;
        config.wrap = false;
        config.keyboard = false;
        //config.pauseOnHover = false;
        console.log("NgbdCarouselNavigation instantiated ..");

    }
}