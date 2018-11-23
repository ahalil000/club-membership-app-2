import {Component} from "@angular/core";

@Component({
    selector: "home",
    template: `
<h2>
    List of existing club members 
</h2>
<div class="col-md-4">
    <item-list class="current"></item-list>
</div>
    `,
    styles: []
})

export class HomeComponent {
    title = "Welcome View";
}
