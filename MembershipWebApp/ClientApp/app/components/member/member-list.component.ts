import {Component, Input, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Member} from "../../interfaces/member";
import {MemberService} from "../services/member.service";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: "member-list",
    templateUrl: "./member-list.component.html",
    styles: ['./member-list.component.css']
})

export class MemberListComponent implements OnInit {
    @Input() class: string;
    title: string;
    selectedItem: Member;
    items: any = [];
    errorMessage: string;
    columns: string[];

    constructor(private memberService: MemberService, private router: Router) { }

    ngOnInit() {
        console.log("MemberListComponent instantiated with the following type: " + this.class);
        var s: any = null;
        switch (this.class) {
            case "current":
            default:
                this.title = "Member List";
                s = this.memberService.getList();
                break;
        }
        s.subscribe(
            (items: any) => this.items = items, //.json(),
            (Error: string) => this.errorMessage = <any>Error
        );
        this.columns = this.memberService.getColumns();
    }

    onSelect(item: Member) {
        this.selectedItem = item;
        console.log("Member " + this.selectedItem.ID + " has been clicked: loading item viewer...");
        this.router.navigate(["member-view", this.selectedItem.ID]);
    }
}
