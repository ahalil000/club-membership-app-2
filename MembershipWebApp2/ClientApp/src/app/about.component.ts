import {Component} from "@angular/core";

@Component({
    selector: "about",
    template: `
        <h2>{{title}}</h2>
        <div>
            Club Membership: a fully-featured SPA demo powered by ASP.NET Core Web API and Angular5.
            Authored by Andrew Halil. 
        </div>
    `
})

export class AboutComponent {
    title = "About";
}
