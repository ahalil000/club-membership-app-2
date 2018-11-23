import {Component} from "@angular/core";
import {Router} from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent { 

    title = "Club Membership Home";

    constructor(public router: Router) { }

    isActive(data: any[]): boolean {
        return this.router.isActive(
            this.router.createUrlTree(data),
            true);
    }
}
